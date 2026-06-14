/* =========================================================
   level2.js  —  "The Comic"

   12 panels (6 per page) retelling the same chapter as
   Level 1, but as a comic. On load, each page's 6 panels
   are shuffled into random grid positions. The player taps
   two panels to swap them, trying to restore the correct
   reading order (left-to-right, top-to-bottom).

   Scoring: every panel that is in its correct slot when the
   puzzle ends earns Humanity. Humanity is recalculated live
   as panels move; the level "finishes" once both pages are
   fully correct, or the player can stop early (handled via
   the Stop/pause flow, same as Level 1).

   IMAGES: place your own panel artwork in this same folder,
   named panel_01.jpg .. panel_12.jpg (panels 1-6 = left page,
   7-12 = right page, in correct reading order). Until then,
   numbered placeholders are shown.
   ========================================================= */

const PANELS_PER_PAGE  = 6;
const TOTAL_PANELS     = 12;

/* ---------------------------------------------------------
   Panel definitions.
   "correctIndex" = 0..5 (this panel's correct slot on its page)
   "file"         = expected image filename (flat folder)
   --------------------------------------------------------- */
const leftPanels = [
  { id: "p1",  correctIndex: 0, file: "panel_01.jpg", alt: "Panel 1" },
  { id: "p2",  correctIndex: 1, file: "panel_02.jpg", alt: "Panel 2" },
  { id: "p3",  correctIndex: 2, file: "panel_03.jpg", alt: "Panel 3" },
  { id: "p4",  correctIndex: 3, file: "panel_04.jpg", alt: "Panel 4" },
  { id: "p5",  correctIndex: 4, file: "panel_05.jpg", alt: "Panel 5" },
  { id: "p6",  correctIndex: 5, file: "panel_06.jpg", alt: "Panel 6" }
];

const rightPanels = [
  { id: "p7",  correctIndex: 0, file: "panel_07.jpg", alt: "Panel 7" },
  { id: "p8",  correctIndex: 1, file: "panel_08.jpg", alt: "Panel 8" },
  { id: "p9",  correctIndex: 2, file: "panel_09.jpg", alt: "Panel 9" },
  { id: "p10", correctIndex: 3, file: "panel_10.jpg", alt: "Panel 10" },
  { id: "p11", correctIndex: 4, file: "panel_11.jpg", alt: "Panel 11" },
  { id: "p12", correctIndex: 5, file: "panel_12.jpg", alt: "Panel 12" }
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
   currentOrder[pageKey] = array of panel objects, in the
   ORDER THEY CURRENTLY APPEAR in the grid (index = slot)
   --------------------------------------------------------- */
let paused      = true;
let gameStarted = false;
let finished    = false;

const currentOrder = {
  left:  null,
  right: null
};

/* currently selected slot for swapping: { pageKey, slotIndex } | null */
let selection = null;

/* swap counters, reset on start */
const swapCount = { left: 0, right: 0 };
/* minimum swaps required from the initial shuffle to a solved
   page (computed once, right after shuffling) */
const minSwaps = { left: 0, right: 0 };

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
      j = order[j].correctIndex; // follow where this panel needs to go
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

/* keep shuffling until the order is not already fully solved
   (so the puzzle is never trivially "done" on load) */
function shuffledNonSolved(panels) {
  let attempt = shuffle(panels);
  let tries = 0;
  while (attempt.every((p, i) => p.correctIndex === i) && tries < 10) {
    attempt = shuffle(panels);
    tries++;
  }
  return attempt;
}

/* ---------------------------------------------------------
   Rendering
   --------------------------------------------------------- */
function renderGrid(pageKey, gridEl, statusEl) {
  gridEl.innerHTML = "";
  const order = currentOrder[pageKey];

  order.forEach((panel, slotIndex) => {
    const cell = document.createElement("div");
    cell.className = "panel";
    cell.dataset.page = pageKey;
    cell.dataset.slot = String(slotIndex);

    const isCorrect = panel.correctIndex === slotIndex;
    if (isCorrect) cell.classList.add("correct");

    if (selection && selection.pageKey === pageKey && selection.slotIndex === slotIndex) {
      cell.classList.add("selected");
    }

    const img = document.createElement("img");
    img.src = panel.file;
    img.alt = panel.alt;
    img.addEventListener("error", () => {
      img.remove();
      cell.appendChild(buildPlaceholder(panel));
    });
    cell.appendChild(img);

    cell.addEventListener("click", () => handlePanelClick(pageKey, slotIndex));
    gridEl.appendChild(cell);
  });

  updateStatus(pageKey, statusEl);
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

function updateStatus(pageKey, statusEl) {
  const order = currentOrder[pageKey];
  const correctCount = order.filter((p, i) => p.correctIndex === i).length;
  statusEl.textContent = `${correctCount} / ${PANELS_PER_PAGE} correct`;
  statusEl.classList.toggle("complete", correctCount === PANELS_PER_PAGE);
}

/* ---------------------------------------------------------
   Click-to-swap interaction
   --------------------------------------------------------- */
function handlePanelClick(pageKey, slotIndex) {
  if (paused || !gameStarted || finished) return;

  const order = currentOrder[pageKey];

  /* clicking an already-correct panel does nothing (locked in place) */
  if (order[slotIndex].correctIndex === slotIndex) return;

  if (!selection) {
    selection = { pageKey, slotIndex };
    renderGrid(pageKey, pageKey === "left" ? leftGrid : rightGrid,
                         pageKey === "left" ? leftStatus : rightStatus);
    return;
  }

  if (selection.pageKey === pageKey && selection.slotIndex === slotIndex) {
    /* clicked the same panel again -> deselect */
    selection = null;
    renderGrid(pageKey, pageKey === "left" ? leftGrid : rightGrid,
                         pageKey === "left" ? leftStatus : rightStatus);
    return;
  }

  if (selection.pageKey !== pageKey) {
    /* swapping across pages is not allowed -> move selection instead */
    const oldPageKey = selection.pageKey;
    selection = { pageKey, slotIndex };
    renderGrid(oldPageKey, oldPageKey === "left" ? leftGrid : rightGrid,
                            oldPageKey === "left" ? leftStatus : rightStatus);
    renderGrid(pageKey, pageKey === "left" ? leftGrid : rightGrid,
                         pageKey === "left" ? leftStatus : rightStatus);
    return;
  }

  /* swap the two panels on the same page */
  const a = selection.slotIndex;
  const b = slotIndex;
  const tmp = order[a];
  order[a] = order[b];
  order[b] = tmp;
  swapCount[pageKey]++;

  selection = null;
  renderGrid(pageKey, pageKey === "left" ? leftGrid : rightGrid,
                       pageKey === "left" ? leftStatus : rightStatus);

  checkCompletion();
}

/* ---------------------------------------------------------
   Completion check
   --------------------------------------------------------- */
function checkCompletion() {
  const leftDone  = currentOrder.left.every((p, i) => p.correctIndex === i);
  const rightDone = currentOrder.right.every((p, i) => p.correctIndex === i);

  if (leftDone && rightDone) {
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

   For each page:
     minSwaps  = theoretical minimum number of swaps needed
                 to go from the initial shuffle to "solved"
                 (computed once, right after shuffling)
     extraSwaps = max(0, actualSwaps - minSwaps)

   Per page, Humanity = BASE_POINTS, reduced by a penalty for
   each "extra" swap beyond the minimum, down to a floor so a
   completed page is never worth zero.

     pageScore = max(FLOOR, BASE_POINTS - extraSwaps * PENALTY)

   Both pages together: max 2 x BASE_POINTS = 60 (same ceiling
   as before). A player who solves a page in exactly minSwaps
   moves gets the full 30 points for that page; someone who
   needed many extra tries still gets at least 10.
   --------------------------------------------------------- */
const BASE_POINTS_PER_PAGE = 30;
const PENALTY_PER_EXTRA_SWAP = 3;
const FLOOR_PER_PAGE = 10;

function pageScore(pageKey) {
  const order = currentOrder[pageKey];
  const solved = order.every((p, i) => p.correctIndex === i);
  if (!solved) return 0; // unfinished page earns nothing

  const extra = Math.max(0, swapCount[pageKey] - minSwaps[pageKey]);
  return Math.max(FLOOR_PER_PAGE, BASE_POINTS_PER_PAGE - extra * PENALTY_PER_EXTRA_SWAP);
}

function computeScore() {
  return pageScore("left") + pageScore("right");
}


function finishPuzzle() {
  if (finished) return;
  finished = true;

  const leftPts  = pageScore("left");
  const rightPts = pageScore("right");
  const score = leftPts + rightPts;
  localStorage.setItem("pinocchio_level2PuzzleScore", score.toString());

  feedbackEl.classList.add("show");
  feedbackEl.innerHTML =
      `Page 1 solved in ${swapCount.left} swap${swapCount.left === 1 ? "" : "s"} `
    + `(best possible: ${minSwaps.left}) &mdash; <strong>+${leftPts} Humanity</strong>.<br>`
    + `Page 2 solved in ${swapCount.right} swap${swapCount.right === 1 ? "" : "s"} `
    + `(best possible: ${minSwaps.right}) &mdash; <strong>+${rightPts} Humanity</strong>.<br>`
    + `Total: <strong>+${score} Humanity</strong> earned for this chapter. `
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

  currentOrder.left  = shuffledNonSolved(leftPanels);
  currentOrder.right = shuffledNonSolved(rightPanels);

  minSwaps.left  = computeMinSwaps(currentOrder.left);
  minSwaps.right = computeMinSwaps(currentOrder.right);

  renderGrid("left",  leftGrid,  leftStatus);
  renderGrid("right", rightGrid, rightStatus);
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
