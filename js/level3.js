/* =========================================================
   level3.js  —  "The Audiobook"

   One continuous audio recording of the same chapter as Level 1.
   The recording just plays, in real time, once.

   At six moments (the same six story beats as Level 1's blanks)
   the recording pauses and asks which single word you just
   heard, with only DECISION_SECONDS to answer — much shorter
   than Level 1's 30s, because you can't reread a sentence you
   just listened to.

   Scoring: 10 Humanity per correct checkpoint (max 60), same
   budget as Level 1's six blanks.
   ========================================================= */

const DECISION_SECONDS   = 5;
const CHECKPOINT_POINTS  = 10;

/* ---------------------------------------------------------
   Checkpoint definitions.
   --------------------------------------------------------- */
/* Ändern der time, Ändern der Antworten/Auswahlmöglichkeiten*/
   const checkpoints = [
  {
    id: "cp0", time: 30,
    prompt: "Which word did you just hear?",
    options: [
      { text: "Assassins", correct: true },
      { text: "Puppeteers", correct: false },
      { text: "Fishermen", correct: false }
    ]
  },
  {
    id: "cp1", time: 65,
    prompt: "Which word did you just hear?",
    options: [
      { text: "Longer", correct: true },
      { text: "Shorter", correct: false },
      { text: "Wider", correct: false }
    ]
  },
  {
    id: "cp2", time: 100,
    prompt: "Which word did you just hear?",
    options: [
      { text: "Wood", correct: true },
      { text: "Town", correct: false },
      { text: "River", correct: false }
    ]
  },
  {
    id: "cp3", time: 135,
    prompt: "Which word did you just hear?",
    options: [
      { text: "Medicine", correct: true },
      { text: "Water", correct: false },
      { text: "Soup", correct: false }
    ]
  },
  {
    id: "cp4", time: 170,
    prompt: "Which word did you just hear?",
    options: [
      { text: "Noses", correct: true },
      { text: "Ears", correct: false },
      { text: "Tails", correct: false }
    ]
  },
  {
    id: "cp5", time: 200,
    prompt: "Which word did you just hear?",
    options: [
      { text: "Woodpeckers", correct: true },
      { text: "Sparrows", correct: false },
      { text: "Butterflies", correct: false }
    ]
  }
];

/* ---------------------------------------------------------
   Transcript, one caption line at a time.
   --------------------------------------------------------- */
/*Transkript richtig anpassen.*/
   const transcriptLines = [
  "In a twinkling, Pinocchio felt fine. With one leap he was out of bed and into his clothes.",
  "The Fairy, seeing him run and jump around the room gay as a bird on wing, said to him:",
  "“Come here now and tell me how it came about that you found yourself in the hands of the Assassins.”",
  "“It happened that Fire-Eater gave me five gold pieces to give to my Father, but on the way, I met a Fox and a Cat, who asked me, ‘Do you want the five pieces to become two thousand?’ And I said, ‘Yes.’ And they said, ‘Come with us to the Field of Wonders.’ And I said, ‘Let’s go.’ Then they said, ‘Let us stop at the Inn of the Red Lobster for dinner and after midnight we’ll set out again.’ We ate and went to sleep. When I awoke they were gone and I started out in the darkness all alone.",
  "On the road I met two Assassins dressed in black coal sacks, who said to me, ‘Your money or your life!’ and I said, ‘I haven’t any money’; for, you see, I had put the money under my tongue. One of them tried to put his hand in my mouth and I bit it off and spat it out; but it wasn’t a hand, it was a cat’s paw.",
  "And they ran after me and I ran and ran, till at last they caught me and tied my neck with a rope and hanged me to a tree, saying, ‘Tomorrow we’ll come back for you and you’ll be dead and your mouth will be open, and then we’ll take the gold pieces that you have hidden under your tongue.’”",
  "“Where are the gold pieces now?” the Fairy asked.",
  "“I lost them,” answered Pinocchio, but he told a lie, for he had them in his pocket.",
  "As he spoke, his nose, long though it was, became at least two inches longer.",
  "“And where did you lose them?” “In the wood near by.”",
  "At this second lie, his nose grew a few more inches.",
  "“If you lost them in the near-by wood,” said the Fairy, “we’ll look for them and find them, for everything that is lost there is always found.”",
  "“Ah, now I remember,” replied the Marionette, becoming more and more confused. “I did not lose the gold pieces, but I swallowed them when I drank the medicine.”",
  "At this third lie, his nose became longer than ever, so long that he could not even turn around. If he turned to the right, he knocked it against the bed or into the windowpanes; if he turned to the left, he struck the walls or the door; if he raised it a bit, he almost put the Fairy’s eyes out.",
  "The Fairy sat looking at him and laughing.",
  "“Why do you laugh?” the Marionette asked her, worried now at the sight of his growing nose. “I am laughing at your lies.” “How do you know I am lying?”",
  "“Lies, my boy, are known in a moment. There are two kinds of lies, lies with short legs and lies with long noses. Yours, just now, happen to have long noses.”",
  "Pinocchio, not knowing where to hide his shame, tried to escape from the room, but his nose had become so long that he could not get it out of the door.",
  "Crying as if his heart would break, the Marionette mourned for hours over the length of his nose. No matter how he tried, it would not go through the door.",
  "The Fairy showed no pity toward him, as she was trying to teach him a good lesson, so that he would stop telling lies, the worst habit any boy may acquire. But when she saw him, pale with fright and with his eyes half out of his head from terror, she began to feel sorry for him and clapped her hands together.",
  "A thousand woodpeckers flew in through the window and settled themselves on Pinocchio’s nose. They pecked and pecked so hard at that enormous nose that in a few moments, it was the same size as before.",
  "“How good you are, my Fairy,” said Pinocchio, drying his eyes, “and how much I love you!”",
  "“I love you, too,” answered the Fairy, “and if you wish to stay with me, you may be my little brother and I’ll be your good little sister.”"
];

/* ---------------------------------------------------------
   DOM
   --------------------------------------------------------- */
const audio             = document.getElementById("levelAudio");
const progressFill      = document.getElementById("audioProgressFill");
const timeLabel         = document.getElementById("audioTime");
const checkpointZone    = document.getElementById("checkpointZone");
const transcriptToggle  = document.getElementById("transcriptToggleBtn");
const transcriptPanel   = document.getElementById("transcriptPanel");
const transcriptLineEl  = document.getElementById("transcriptLine");

const finishOverlay = document.getElementById("finishOverlay");
const finishText     = document.getElementById("finishText");

const startOverlay    = document.getElementById("startOverlay");
const pauseOverlay    = document.getElementById("pauseOverlay");
const doneOverlay     = document.getElementById("doneOverlay");
const doneText        = document.getElementById("doneText");
const overlayStartBtn = document.getElementById("overlayStartBtn");
const resumeBtn       = document.getElementById("resumeBtn");
const startBtn        = document.getElementById("startBtn");
const stopBtn         = document.getElementById("stopBtn");
const backBtn         = document.getElementById("backBtn");

renderHumanityBadge("humanityBadge");

/* ---------------------------------------------------------
   State
   --------------------------------------------------------- */
let paused      = true;
let gameStarted = false;
let finished    = false;

let puzzleScore  = 0;
let correctCount = 0;

/* answers[checkpointId] = { isCorrect } */
const answers = {};

let nextCheckpointIndex = 0;
let activeCheckpoint     = null;
let activeCountdownId    = null;

/* [{ text, start, end }], built once the recording's duration is known */
let transcriptBoundaries = [];
let currentLineIndex     = -1;

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

/* ---------------------------------------------------------
   Progress bar + time display
   --------------------------------------------------------- */
function formatTime(seconds) {
  if (!isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60).toString().padStart(2, "0");
  return m + ":" + s;
}

function updateProgressUI() {
  const dur = audio.duration || 0;
  const pct = dur ? (audio.currentTime / dur) * 100 : 0;
  progressFill.style.width = pct + "%";
  timeLabel.textContent = formatTime(audio.currentTime) + " / " + formatTime(dur);
}

/* ---------------------------------------------------------
   Transcript sync — one line at a time.
   --------------------------------------------------------- */
function buildTranscriptBoundaries() {
  const dur = audio.duration;
  if (!dur || !isFinite(dur)) return;

  const wordCounts = transcriptLines.map(line => line.split(/\s+/).filter(Boolean).length);
  const totalWords = wordCounts.reduce((sum, n) => sum + n, 0);

  let wordsSoFar = 0;
  transcriptBoundaries = transcriptLines.map((text, i) => {
    const start = (wordsSoFar / totalWords) * dur;
    wordsSoFar += wordCounts[i];
    const end = (wordsSoFar / totalWords) * dur;
    return { text, start, end };
  });
}

function updateTranscriptLine() {
  if (!transcriptBoundaries.length) return;

  const t = audio.currentTime;
  let idx = transcriptBoundaries.findIndex(b => t >= b.start && t < b.end);
  if (idx === -1) idx = t <= 0 ? 0 : transcriptBoundaries.length - 1;

  if (idx !== currentLineIndex) {
    currentLineIndex = idx;
    transcriptLineEl.textContent = transcriptBoundaries[idx].text;
  }
}

/* ---------------------------------------------------------
   Word checkpoints — audio pauses, DECISION_SECONDS to answer.
   --------------------------------------------------------- */
function activateCheckpoint(cp) {
  activeCheckpoint = cp;
  audio.pause();
  checkpointZone.innerHTML = "";

  const box = document.createElement("div");
  box.className = "decision-box";

  const header = document.createElement("div");
  header.className = "decision-header";
  const h3 = document.createElement("h3");
  h3.textContent = cp.prompt;
  const timeSpan = document.createElement("span");
  timeSpan.className = "decision-time";
  timeSpan.textContent = DECISION_SECONDS + " s";
  header.appendChild(h3);
  header.appendChild(timeSpan);

  const bar = document.createElement("div");
  bar.className = "countdown-bar";
  const fill = document.createElement("div");
  fill.className = "countdown-fill";
  bar.appendChild(fill);

  const optionsWrap = document.createElement("div");
  optionsWrap.className = "decision-options";

  box.appendChild(header);
  box.appendChild(bar);
  box.appendChild(optionsWrap);
  checkpointZone.appendChild(box);

  const choices = shuffle(cp.options);
  let remaining = DECISION_SECONDS;
  let resolved  = false;

  const buttons = choices.map((choice) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "decision-btn";
    btn.textContent = choice.text;
    btn.addEventListener("click", () => resolve(choice, btn));
    optionsWrap.appendChild(btn);
    return btn;
  });

  function resolve(chosen, chosenBtn) {
    if (resolved) return;
    resolved = true;
    if (activeCountdownId) clearInterval(activeCountdownId);
    activeCountdownId = null;

    const correctChoice = cp.options.find(o => o.correct);
    const isCorrect = !!(chosen && chosen.correct);

    buttons.forEach(b => (b.disabled = true));
    if (chosenBtn) chosenBtn.classList.add(isCorrect ? "chosen-correct" : "chosen-incorrect");
    if (!isCorrect) {
      const ci = choices.indexOf(correctChoice);
      if (buttons[ci]) buttons[ci].classList.add("chosen-correct");
    }

    if (isCorrect) { puzzleScore += CHECKPOINT_POINTS; correctCount++; }
    answers[cp.id] = { isCorrect };

    setTimeout(() => {
      checkpointZone.innerHTML = "";
      activeCheckpoint = null;
      nextCheckpointIndex++;
      if (!paused && gameStarted && !finished) audio.play();
    }, 900);
  }

  activeCountdownId = setInterval(() => {
    if (paused) return;
    remaining--;
    if (remaining <= 0) {
      timeSpan.textContent = "0 s";
      fill.style.width = "0%";
      resolve(null, null);
      return;
    }
    timeSpan.textContent = remaining + " s";
    fill.style.width = (remaining / DECISION_SECONDS) * 100 + "%";
    if (remaining <= 2) fill.classList.add("low");
  }, 1000);
}

/* ---------------------------------------------------------
   Main playback loop — advances the progress bar and fires
   checkpoints as the recording reaches them.
   --------------------------------------------------------- */
function onTimeUpdate() {
  updateProgressUI();
  updateTranscriptLine();

  if (activeCheckpoint) return; // a checkpoint is already awaiting an answer

  const next = checkpoints[nextCheckpointIndex];
  if (next && audio.currentTime >= next.time) activateCheckpoint(next);
}

audio.addEventListener("timeupdate", onTimeUpdate);
audio.addEventListener("loadedmetadata", () => {
  updateProgressUI();
  buildTranscriptBoundaries();
});

/* ---------------------------------------------------------
   Finish
   --------------------------------------------------------- */
audio.addEventListener("ended", () => {
  if (finished) return;
  finished = true;

  localStorage.setItem("pinocchio_level3PuzzleScore", puzzleScore.toString());

  finishText.innerHTML =
      `You caught <strong>${correctCount} of ${checkpoints.length}</strong> words in time — `
    + `<strong>+${puzzleScore} Humanity</strong> earned for this chapter.<br>`
    + `Continue to the evaluation to collect more.`;
  finishOverlay.classList.remove("hidden");

  startBtn.disabled = true;
  stopBtn.disabled  = true;
});

/* ---------------------------------------------------------
   Controls
   --------------------------------------------------------- */
function startGame() {
  startOverlay.classList.add("hidden");
  paused = false; gameStarted = true;
  startBtn.disabled = true; stopBtn.disabled = false;
  audio.play();
}

function pauseGame() {
  if (paused || !gameStarted || finished) return;
  paused = true;
  audio.pause();
  pauseOverlay.classList.remove("hidden");
  startBtn.disabled = false; stopBtn.disabled = true;
}

function resumeGame() {
  pauseOverlay.classList.add("hidden");
  paused = false;
  startBtn.disabled = true; stopBtn.disabled = false;
  /* don't resume playback if a checkpoint is still waiting for an answer */
  if (!activeCheckpoint) audio.play();
}

overlayStartBtn.addEventListener("click", startGame);
resumeBtn.addEventListener("click", resumeGame);
startBtn.addEventListener("click", () => {
  if (!startOverlay.classList.contains("hidden")) startGame();
  else if (paused && gameStarted) resumeGame();
});
stopBtn.addEventListener("click", pauseGame);

backBtn.addEventListener("click", e => {
  const done = localStorage.getItem("pinocchio_level3Completed") === "true";
  if (!done && gameStarted)
    if (!confirm("Leave this chapter?\n\nIt can only be completed once.")) e.preventDefault();
});

/* Transcript show/hide (accessibility) */
transcriptToggle.addEventListener("click", () => {
  const isHidden = transcriptPanel.classList.toggle("hidden");
  transcriptToggle.textContent = isHidden ? "Show Transcript" : "Hide Transcript";
});

/* ---------------------------------------------------------
   Level already completed - not possible to play it again, without reset.
   (skipped in DEV_MODE, so a level can be replayed freely)
   --------------------------------------------------------- */
if (!DEV_MODE && localStorage.getItem("pinocchio_level3Completed") === "true") {
  startOverlay.classList.add("hidden");
  startBtn.disabled = stopBtn.disabled = true;
  const s = localStorage.getItem("pinocchio_level3Score");
  if (s) doneText.textContent =
    `You have already played through this chapter and earned +${s} Humanity. It can't be played again.`;
  doneOverlay.classList.remove("hidden");
}
