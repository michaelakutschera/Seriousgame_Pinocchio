/* =========================================================
   level3.js  —  "The Audiobook"

   One continuous audio recording of the same chapter as Level 1.
   The recording just plays, in real time, once.

   At six moments the recording pauses and asks which single word you just
   heard, with only 5 seconds to answer.

   Scoring: 10 Humanity per correct checkpoint (max. 60).
   ========================================================= */

const DECISION_SECONDS   = 5;
const CHECKPOINT_POINTS  = 10;

/* ---------------------------------------------------------
   Checkpoint definitions.
   --------------------------------------------------------- */
  const checkpoints = [
  {
    id: "cp0", time: 46.75,
    prompt: "Which word did you just hear?",
    options: [
      { text: "Assassins", correct: true },
      { text: "Partisans", correct: false },
      { text: "Artisans", correct: false }
    ]
  },
  {
    id: "cp1", time: 95.3,
    prompt: "Which word did you just hear?",
    options: [
      { text: "inches", correct: true },
      { text: "itches", correct: false },
      { text: "stitches", correct: false }
    ]
  },
  {
    id: "cp2", time: 116.3,
    prompt: "Which word did you just hear?",
    options: [
      { text: "gold pieces", correct: true },
      { text: "gold peace", correct: false },
      { text: "gold creases", correct: false }
    ]
  },
  {
    id: "cp3", time: 157.11,
    prompt: "Which word did you just hear?",
    options: [
      { text: "noses", correct: true },
      { text: "roses", correct: false },
      { text: "doses", correct: false }
    ]
  },
  {
    id: "cp4", time: 182.745,
    prompt: "Which word did you just hear?",
    options: [
      { text: "good lesson", correct: true },
      { text: "good blessing", correct: false },
      { text: "good reason", correct: false }
    ]
  },
  {
    id: "cp5", time: 198.85,
    prompt: "Which word did you just hear?",
    options: [
      { text: "Woodpeckers", correct: true },
      { text: "Would pick her", correct: false },
      { text: "Wood pickers", correct: false }
    ]
  }
];

/* ---------------------------------------------------------
   Transcript, one caption line at a time.

   `time` = the moment (into the recording) at which this line
   starts being spoken, written as "m:ss" or "m:ss.s".
   --------------------------------------------------------- */
function T(mmss) {
  const [m, s] = String(mmss).split(":");
  return Number(m) * 60 + Number(s);
}

const transcriptLines = [
  { time: T("0:00"),    text: "In a twinkling, Pinocchio felt fine. With one leap he was out of bed and into his clothes." },
  { time: T("0:05.2"),  text: "The Fairy, seeing him run and jump around the room gay as a bird on wing, said to him:" },
  { time: T("0:10.2"),  text: "“Come here now and tell me how it came about that you found yourself in the hands of the Assassins.”" },
  { time: T("0:15.2"),  text: "“It happened that Fire-Eater gave me five gold pieces to give to my Father, but on the way, I met a Fox and a Cat, who asked me," },
  { time: T("0:23.7"),  text: "‘Do you want the five pieces to become two thousand?’ And I said, ‘Yes.’ And they said, ‘Come with us to the Field of Wonders.’ And I said, ‘Let’s go.’" },
  { time: T("0:32.3"),  text: "Then they said, ‘Let us stop at the Inn of the Red Lobster for dinner and after midnight we’ll set out again.’ We ate and went to sleep. When I awoke" },
  { time: T("0:41.3"),  text: "they were gone and I started out in the darkness all alone. On the road I met two Assassins dressed in black coal sacks, who said to me," },
  { time: T("0:49.8"),  text: "‘Your money or your life!’ and I said, ‘I haven’t any money’; for, you see, I had put the money under my tongue. One of them tried to put" },
  { time: T("0:57.9"),  text: "his hand in my mouth and I bit it off and spat it out; but it wasn’t a hand, it was a cat’s paw. And they ran after me and I ran and ran," },
  { time: T("1:08.2"),  text: "till at last they caught me and tied my neck with a rope and hanged me to a tree, saying, ‘Tomorrow we’ll come back for you and you’ll be" },
  { time: T("1:15.5"),  text: "dead and your mouth will be open, and then we’ll take the gold pieces that you have hidden under your tongue.’”" },
  { time: T("1:24"),    text: "“Where are the gold pieces now?” the Fairy asked." },
  { time: T("1:27"),    text: "“I lost them,” answered Pinocchio, but he told a lie, for he had them in his pocket." },
  { time: T("1:31"),    text: "As he spoke, his nose, long though it was, became at least two inches longer." },
  { time: T("1:36.6"),  text: "“And where did you lose them?” “In the wood near by.”" },
  { time: T("1:39.7"),  text: "At this second lie, his nose grew a few more inches." },
  { time: T("1:42.8"),  text: "“If you lost them in the near-by wood,” said the Fairy, “we’ll look for them and find them, for everything that is lost there is always found.”" },
  { time: T("1:50.2"),  text: "“Ah, now I remember,” replied the Marionette, becoming more and more confused. “I did not lose the gold pieces, but I swallowed them when I drank the medicine.”" },
  { time: T("1:59"),    text: "At this third lie, his nose became longer than ever, so long that he could not even turn around. If he turned to the right, he knocked" },
  { time: T("2:06.6"),  text: "it against the bed or into the windowpanes; if he turned to the left, he struck the walls or the door; if he raised it a bit, he almost put the Fairy’s eyes out." },
  { time: T("2:18"),    text: "The Fairy sat looking at him and laughing." },
  { time: T("2:20.1"),  text: "“Why do you laugh?” the Marionette asked her, worried now at the sight of his growing nose. “I am laughing at your lies.” “How do you know I am lying?”" },
  { time: T("2:28.5"),  text: "“Lies, my boy, are known in a moment. There are two kinds of lies, lies with short legs and lies with long noses. Yours, just now, happen to have long noses.”" },
  { time: T("2:40.8"),  text: "Pinocchio, not knowing where to hide his shame, tried to escape from the room, but his nose had become so long that he could not get it out of the door." },
  { time: T("2:49.7"),  text: "Crying as if his heart would break, the Marionette mourned for hours over the length of his nose. No matter how he tried, it would not go through the door." },
  { time: T("2:57.3"),  text: "The Fairy showed no pity toward him, as she was trying to teach him a good lesson, so that he would stop telling lies, the worst habit any boy may acquire." },
  { time: T("3:07.7"),  text: "But when she saw him, pale with fright and with his eyes half out of his head from terror, she began to feel sorry for him and clapped her hands together." },
  { time: T("3:17"),    text: "A thousand woodpeckers flew in through the window and settled themselves on Pinocchio’s nose. They pecked and pecked so hard at that enormous nose" },
  { time: T("3:26.3"),  text: "that in a few moments, it was the same size as before." },
  { time: T("3:29"),    text: "“How good you are, my Fairy,” said Pinocchio, drying his eyes, “and how much I love you!”" },
  { time: T("3:34.2"),  text: "“I love you, too,” answered the Fairy, “and if you wish to stay with me, you may be my little brother and I’ll be your good little sister.”" }
];

/* ---------------------------------------------------------
   DOM
   --------------------------------------------------------- */
const audio             = document.getElementById("levelAudio");
const progressBar       = document.getElementById("audioProgressBar");
const progressFill      = document.getElementById("audioProgressFill");
const progressThumb     = document.getElementById("audioProgressThumb");
const devPlayPauseBtn   = document.getElementById("devPlayPauseBtn");
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
  progressThumb.style.left = pct + "%";
  timeLabel.textContent = formatTime(audio.currentTime) + " / " + formatTime(dur);
}

/* ---------------------------------------------------------
   Transcript sync — one line at a time.
   --------------------------------------------------------- */
function buildTranscriptBoundaries() {
  const dur = audio.duration;

  transcriptBoundaries = transcriptLines.map((line, i) => {
    const start = line.time;
    const end = i + 1 < transcriptLines.length
      ? transcriptLines[i + 1].time
      : (isFinite(dur) ? dur : Infinity);
    return { text: line.text, start, end };
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

    const isCorrect = !!(chosen && chosen.correct);

    buttons.forEach(b => (b.disabled = true));
    if (chosenBtn) chosenBtn.classList.add(isCorrect ? "chosen-correct" : "chosen-incorrect");

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
  const isCollapsed = transcriptPanel.classList.toggle("collapsed");
  transcriptToggle.textContent = isCollapsed ? "Show Transcript" : "Hide Transcript";
});

/* ---------------------------------------------------------
   Dev-only scrubbing — drag the progress bar like a music-app
   seek bar, to jump around and test transcript timing and
   checkpoints without waiting through the whole track.
   --------------------------------------------------------- */
if (DEV_MODE) {
  progressBar.classList.add("dev-scrubbable");
  progressThumb.classList.remove("hidden");

  let scrubbing = false;

  function timeFromPointer(e) {
    const dur = isFinite(audio.duration) ? audio.duration : 0;
    const rect = progressBar.getBoundingClientRect();
    const ratio = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    return ratio * dur;
  }

  function scrubToPointer(e) {
    audio.currentTime = timeFromPointer(e);
    updateProgressUI();
    updateTranscriptLine();
  }

  progressBar.addEventListener("pointerdown", (e) => {
    scrubbing = true;
    progressBar.classList.add("dragging");
    progressBar.setPointerCapture(e.pointerId);
    scrubToPointer(e);
  });

  progressBar.addEventListener("pointermove", (e) => {
    if (scrubbing) scrubToPointer(e);
  });

  function stopScrub() {
    scrubbing = false;
    progressBar.classList.remove("dragging");
  }
  progressBar.addEventListener("pointerup", stopScrub);
  progressBar.addEventListener("pointercancel", stopScrub);

  /* Dev play/pause — bypasses pauseOverlay, which otherwise covers
     #audioTime and makes the seconds unreadable while timing lines. */
  devPlayPauseBtn.classList.remove("hidden");
  devPlayPauseBtn.textContent = audio.paused ? "Dev: Play" : "Dev: Pause";

  devPlayPauseBtn.addEventListener("click", () => {
    if (audio.paused) audio.play(); else audio.pause();
  });
  audio.addEventListener("play",  () => { devPlayPauseBtn.textContent = "Dev: Pause"; });
  audio.addEventListener("pause", () => { devPlayPauseBtn.textContent = "Dev: Play"; });
}

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
