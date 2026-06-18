/* =========================================================
   level2.js  —  "The Comic"

   12 panels retelling the same chapter as Level 1, shown as
   a comic book: 6 panels on the left page, 6 on the
   right.

   On load, ALL 12 panels are shuffled together into a single
   pool and distributed across all 12 slots (both pages) --
   a panel that belongs on page 1 can randomly start on page
   2 and must be moved across. The player taps two panels
   (on either page) to swap their places.

   Scoring: efficiency-based (see pageScore below). Humanity
   is based on how close the player's total swap count is to
   the theoretical minimum for the whole 12-slot shuffle.

  ========================================================= */

const PANELS_PER_PAGE = 6;
const TOTAL_PANELS    = 12;

/* ---------------------------------------------------------
   Panel definitions.
   "correctSlot" = 0..11, this panel's correct slot in the
                   COMBINED 12-slot layout:
                     slots 0-5  -> left page,  positions 0-5
                     slots 6-11 -> right page, positions 0-5
   "file"        = expected image filename (flat folder)
   --------------------------------------------------------- */
const allPanels = [
  { id: "p1",  correctSlot: 0,  file: "../images/Panel_1.jpg", alt: "Panel 1"  },
  { id: "p2",  correctSlot: 1,  file: "../images/Panel_2.jpg", alt: "Panel 2"  },
  { id: "p3",  correctSlot: 2,  file: "../images/Panel_3.jpg", alt: "Panel 3"  },
  { id: "p4",  correctSlot: 3,  file: "../images/Panel_4.jpg", alt: "Panel 4"  },
  { id: "p5",  correctSlot: 4,  file: "../images/Panel_5.jpg", alt: "Panel 5"  },
  { id: "p6",  correctSlot: 5,  file: "../images/Panel_6.jpg", alt: "Panel 6"  },
  { id: "p7",  correctSlot: 6,  file: "../images/Panel_7.jpg", alt: "Panel 7"  },
  { id: "p8",  correctSlot: 7,  file: "../images/panel_8.jpg", alt: "Panel 8"  },
  { id: "p9",  correctSlot: 8,  file: "../images/Panel_9.jpg", alt: "Panel 9"  },
  { id: "p10", correctSlot: 9,  file: "../images/Panel_10.jpg", alt: "Panel 10" },
  { id: "p11", correctSlot: 10, file: "../images/Panel_11.jpg", alt: "Panel 11" },
  { id: "p12", correctSlot: 11, file: "../images/Panel_12.jpg", alt: "Panel 12" }
];

/* ---------------------------------------------------------
   DOM
   --------------------------------------------------------- */
const leftGrid   = document.getElementById("leftGrid");
const rightGrid  = document.getElementById("rightGrid");
const leftStatus = document.getElementById("leftStatus");
const rightStatus= document.getElementById("rightStatus");

const feedbackEl  = document.getElementById("feedback");
const continueBtn = document.getElementById("continueBtn");

const startOverlay    = document.getElementById("startOverlay");
const pauseOverlay    = document.getElementById("pauseOverlay");
const doneOverlay     = document.getElementById("doneOverlay");
const doneText        = document.getElementById("doneText");
const overlayStartBtn = document.getElementById("overlayStartBtn");
const resumeBtn       = document.getElementById("resumeBtn");
const startBtn        = document.getElementById("startBtn");
const stopBtn         = document.getElementById("stopBtn");
const backBtn         = document.getElementById("backBtn");

const timer = new GameTimer("timerDisplay");
renderHumanityBadge("humanityBadge");

/* ---------------------------------------------------------
   State
   currentOrder = array of 12 panel objects, in the ORDER
   THEY CURRENTLY APPEAR across both pages:
     slots 0-5  -> left page,  positions 0-5
     slots 6-11 -> right page, positions 0-5
   --------------------------------------------------------- */
let paused      = true;
let gameStarted = false;
let finished    = false;

let currentOrder = null;

/* currently selected slot index (0-11) for swapping, or null */
let selection = null;

/* total swap counter, reset on start */
let swapCount = 0;
/* theoretical minimum swaps for the initial shuffle */
let minSwapsTotal = 0;

/* ---------------------------------------------------------
   Minimum-swaps calculation
   For a permutation, the minimum number of swaps needed to
   sort it equals (number of elements) - (number of cycles).
   --------------------------------------------------------- */
function computeMinSwaps(order) {
  const n = order.length;
  const visited = new Array(n).fill(false);
  let cycles = 0;

  for (let i = 0; i < n; i++) {
    if (visited[i]) continue;
    cycles++;
    let j = i;
    while (!visited[j]) {
      visited[j] = true;
      j = order[j].correctSlot;
    }
  }
  return n - cycles;
}

/* ---------------------------------------------------------
   Shuffle helper
   --------------------------------------------------------- */
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* keep shuffling until the order is not already fully solved,
   and until at least a few panels start on the "wrong" page
   (so the puzzle isn't trivially page-local) */
function shuffledLayout() {
  let attempt;
  let tries = 0;
  do {
    attempt = shuffle(allPanels);
    tries++;
  } while (
    tries < 30 &&
    (
      attempt.every((p, i) => p.correctSlot === i) ||
      attempt.filter((p, i) => Math.floor(p.correctSlot / PANELS_PER_PAGE) !== Math.floor(i / PANELS_PER_PAGE)).length < 2
    )
  );
  return attempt;
}

/* ---------------------------------------------------------
   Rendering
   --------------------------------------------------------- */
function slotToPage(slot)  { return slot < PANELS_PER_PAGE ? "left" : "right"; }
function slotToLocal(slot) { return slot < PANELS_PER_PAGE ? slot : slot - PANELS_PER_PAGE; }

function renderAll() {
  renderGrid("left",  leftGrid,  leftStatus,  0);
  renderGrid("right", rightGrid, rightStatus, PANELS_PER_PAGE);
}

function renderGrid(pageKey, gridEl, statusEl, slotOffset) {
  gridEl.innerHTML = "";

  for (let local = 0; local < PANELS_PER_PAGE; local++) {
    const slot  = slotOffset + local;
    const panel = currentOrder[slot];

    const cell = document.createElement("div");
    cell.className = "panel";
    cell.dataset.slot = String(slot);

    const isCorrect = panel.correctSlot === slot;
    if (isCorrect) cell.classList.add("correct");
    if (selection === slot) cell.classList.add("selected");

    const img = document.createElement("img");
    img.src = panel.file;
    img.alt = panel.alt;
    img.addEventListener("error", () => {
      img.remove();
      cell.appendChild(buildPlaceholder(panel));
    });
    cell.appendChild(img);

    cell.addEventListener("click", () => handlePanelClick(slot));
    gridEl.appendChild(cell);
  }

  updateStatus(pageKey, statusEl, slotOffset);
}

function buildPlaceholder(panel) {
  const wrap = document.createElement("div");
  wrap.className = "panel-placeholder";

  const num = document.createElement("span");
  num.className = "panel-number";
  num.textContent = "#" + panel.id.replace("p", "");

  const fname = document.createElement("span");
  fname.className = "panel-filename";
  fname.textContent = panel.file;

  wrap.appendChild(num);
  wrap.appendChild(fname);
  return wrap;
}

function updateStatus(pageKey, statusEl, slotOffset) {
  let correctCount = 0;
  for (let local = 0; local < PANELS_PER_PAGE; local++) {
    const slot = slotOffset + local;
    if (currentOrder[slot].correctSlot === slot) correctCount++;
  }
  statusEl.textContent = `${correctCount} / ${PANELS_PER_PAGE} correct`;
  statusEl.classList.toggle("complete", correctCount === PANELS_PER_PAGE);
}

/* ---------------------------------------------------------
   Click-to-swap interaction (works across both pages)
   --------------------------------------------------------- */
function handlePanelClick(slot) {
  if (paused || !gameStarted || finished) return;

  /* clicking an already-correct panel does nothing (locked in place) */
  if (currentOrder[slot].correctSlot === slot) return;

  if (selection === null) {
    selection = slot;
    renderAll();
    return;
  }

  if (selection === slot) {
    /* clicked the same panel again -> deselect */
    selection = null;
    renderAll();
    return;
  }

  /* swap the two panels, possibly across pages */
  const a = selection;
  const b = slot;
  const tmp = currentOrder[a];
  currentOrder[a] = currentOrder[b];
  currentOrder[b] = tmp;
  swapCount++;

  selection = null;
  renderAll();

  checkCompletion();
}

/* ---------------------------------------------------------
   Completion check
   --------------------------------------------------------- */
function checkCompletion() {
  if (currentOrder.every((p, i) => p.correctSlot === i)) {
    finishPuzzle();
  }
}

/* ---------------------------------------------------------
   Scoring
   ---------------------------------------------------------
   Correctness alone isn't a good measure here: with click-to-
   swap, the player will EVENTUALLY reach the correct order no
   matter what. What matters is HOW DIRECTLY they got there --
   i.e. whether they recognised the right reading order quickly,
   or had to try many combinations.

   minSwapsTotal = theoretical minimum number of swaps needed
                   to go from the initial 12-slot shuffle to
                   "solved" (computed once, right after shuffling)
   extraSwaps    = max(0, actualSwaps - minSwapsTotal)

   Humanity = max(FLOOR, BASE_POINTS - extraSwaps * PENALTY)
   BASE_POINTS = 60 (same ceiling as before).
   --------------------------------------------------------- */
const BASE_POINTS    = 60;
const PENALTY_PER_EXTRA_SWAP = 3;
const FLOOR_POINTS   = 15;

function computeScore() {
  const extra = Math.max(0, swapCount - minSwapsTotal);
  return Math.max(FLOOR_POINTS, BASE_POINTS - extra * PENALTY_PER_EXTRA_SWAP);
}

function finishPuzzle() {
  if (finished) return;
  finished = true;

  const score = computeScore();
  localStorage.setItem("pinocchio_level2PuzzleScore", score.toString());

  feedbackEl.classList.add("show");
  feedbackEl.innerHTML =
      `You solved the whole comic in <strong>${swapCount}</strong> swap${swapCount === 1 ? "" : "s"} `
    + `(best possible: ${minSwapsTotal}).<br>`
    + `<strong>+${score} Humanity</strong> earned for this chapter. `
    + `Continue to the evaluation to collect more.`;

  continueBtn.classList.add("visible");

  timer.stop();
  startBtn.disabled = true;
  stopBtn.disabled  = true;
}

/* ---------------------------------------------------------
   Controls
   --------------------------------------------------------- */
function startGame() {
  startOverlay.classList.add("hidden");
  timer.start();
  paused = false; gameStarted = true;
  startBtn.disabled = true; stopBtn.disabled = false;

  currentOrder = shuffledLayout();
  minSwapsTotal = computeMinSwaps(currentOrder);

  renderAll();
}

function pauseGame() {
  if (paused || !gameStarted || finished) return;
  timer.stop(); paused = true;
  pauseOverlay.classList.remove("hidden");
  startBtn.disabled = false; stopBtn.disabled = true;
}

function resumeGame() {
  pauseOverlay.classList.add("hidden");
  timer.start(); paused = false;
  startBtn.disabled = true; stopBtn.disabled = false;
}

overlayStartBtn.addEventListener("click", startGame);
resumeBtn.addEventListener("click", resumeGame);
startBtn.addEventListener("click", () => {
  if (!startOverlay.classList.contains("hidden")) startGame();
  else if (paused && gameStarted) resumeGame();
});
stopBtn.addEventListener("click", pauseGame);

backBtn.addEventListener("click", e => {
  const done = localStorage.getItem("pinocchio_level2Completed") === "true";
  if (!done && timer.seconds > 0)
    if (!confirm("Leave this chapter?\n\nIt can only be completed once.")) e.preventDefault();
});

/* ---------------------------------------------------------
   Already completed?
   --------------------------------------------------------- */
if (localStorage.getItem("pinocchio_level2Completed") === "true") {
  startOverlay.classList.add("hidden");
  startBtn.disabled = stopBtn.disabled = true;
  const s = localStorage.getItem("pinocchio_level2Score");
  if (s) doneText.textContent =
    `You have already played through this chapter and earned +${s} Humanity. It can't be played again.`;
  doneOverlay.classList.remove("hidden");
}
