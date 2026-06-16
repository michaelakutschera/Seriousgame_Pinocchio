/* =========================================================
   level1.js  —  "The Book"

   4 pages, shown as 2 spreads (1+2, then 3+4). Every page
   STARTS WITH NARRATIVE TEXT, so there is
   always context before a question appears.

   Within a spread, the LEFT page types out first, then the RIGHT page. 
   Whenever a "blank" block is reached, typing pauses and a decision
   box (3 plain-text options + 30s bar) appears right there
   in the text; typing only continues once it is answered.

   Page-turn ("Next") is enabled only once every blank on
   the current spread has been answered.

   Scoring: 10 Humanity per correct blank (max 50).
   ========================================================= */

const TYPE_SPEED_MS    = 28;   // ~36 chars/sec
const DECISION_SECONDS = 20;
const POINTS_PER_BLANK = 10;

/* ---------------------------------------------------------
   Page content definitions.
   Each page is an array of "blocks", rendered in order:
     { type: "text",  text: "...plain text, \n\n = paragraph break" }
     { type: "illus", id, file, alt }
     { type: "blank", id, options: [...] }

   Every page's FIRST block is "text" -- a blank never opens
   a page, so there's always context before a question.
   --------------------------------------------------------- */
const pages = [

  /* ============ PAGE 1 ============
     Pinocchio's full account of the Assassins -- one
     continuous narration, plus the first illustration. */

  /*Frage einbauen hier! 
  Ändern der Anführungszeichen auf französsische.
  Text in vier gleichgroße Teile teilen, damit die Seiten tatsächlich voll sind.*/
  [
    { type: "text", text:
      "In a twinkling, Pinocchio felt fine. With one leap he was out of bed and into his clothes."
      + "The Fairy, seeing him run and jump around the room gay as a bird on wing, said to him:\n\n"
      + "\u201cCome here now and tell me how it came about that you found yourself in the hands of the Assassins.\u201d\n\n"
      + "\u201cIt happened that Fire\u2011Eater gave me five gold pieces to give to my Father, but on the way, "
      + "I met a Fox and a Cat, who asked me, \u2018Do you want the five pieces to become two thousand?\u2019 "
      + "And I said, \u2018Yes.\u2019 And they said, \u2018Come with us to the Field of Wonders.\u2019 And I said, "
      + "\u2018Let\u2019s go.\u2019 Then they said, \u2018Let us stop at the Inn of the Red Lobster for dinner and "
      + "after midnight we\u2019ll set out again.\u2019 We ate and went to sleep. When I awoke they were gone "
      + "and I started out in the darkness all alone. On the road I met two Assassins dressed in black coal "
      + "sacks, who said to me, \u2018Your money or your life!\u2019 and I said, \u2018I haven\u2019t any money\u2019; "
      + "for, you see, I had put the money under my tongue. One of them tried to put his hand in my mouth and "
      + "I bit it off and spat it out; but it wasn\u2019t a hand, it was a cat\u2019s paw."
    },
    {type: "blank", id: "blank0", options: [
      {text: "And they ran after me and I ran and ran, till at last they caught me and tied my neck with a rope and hanged me to a tree.", correct: true},
      {text: "Comming soon", correct: false},
      {text: "Coming soon", correct: false}
      ]},
    ],  
  /* ============ PAGE 2 ============
     The first two lies -- both blanks come after their own
     bit of dialogue, never at the very start of the page. */
  [
    { type: "text", text:
        "Saying, \u2018Tomorrow we\u2019ll come back for you and you\u2019ll be dead and your mouth will be open, "
      + "and then we\u2019ll take the gold pieces that you have hidden under your tongue.\u2019\u201d\n\n"
      + "\u201cWhere are the gold pieces now?\u201d the Fairy asked.\n\n"
      + "\u201cI lost them,\u201d answered Pinocchio, but he told a lie, for he had them in his pocket."
    },
    { type: "blank", id: "blank1", options: [
      { text: "As he spoke, his nose, long though it was, became at least two inches longer.", correct: true },
      { text: "As he spoke, his nose stayed exactly the same length as before.",              correct: false },
      { text: "As he spoke, he began to cry softly, without saying another word.",            correct: false }
    ]},
    { type: "text", text:
        "\n\n\u201cAnd where did you lose them?\u201d\n\n\u201cIn the wood near by.\u201d"
    },
    { type: "blank", id: "blank2", options: [
      { text: "At this second lie, his nose grew a few more inches.",     correct: true },
      { text: "At this second lie, his nose shrank back a little.",       correct: false },
      { text: "At this second lie, both of his shoes fell off his feet.", correct: false }
    ]},
    { type: "illus", id: "illus1", file: "Mazzanti_1.jpg",
      alt: "Enrico Mazzanti, 1883" },
    { type: "text", text:
        "\u201cIf you lost them in the near\u2011by wood,\u201d said the Fairy, "
      + "\u201cwe\u2019ll look for them and find them, for everything that is lost there is always found.\u201d\n\n"
    }  
  ],

  /* ============ PAGE 3 ============
     The third lie and the Fairy's lesson about lying --
     again, both blanks are preceded by their own text. */
  [
    { type: "text", text:
      "\u201cAh, now I remember,\u201d replied the Marionette, becoming more and more confused. "
      + "\u201cI did not lose the gold pieces, but I swallowed them when I drank the medicine.\u201d"
    },
    { type: "blank", id: "blank3", options: [
      { text: "At this third lie, his nose became longer than ever, so long that he could not even turn around. ",
        correct: true },
      { text: "At this third lie, nothing at all happened \u2014 his nose stayed normal.",
        correct: false },
      { text: "At this third lie, his nose turned bright red and began to itch terribly.",
        correct: false }
    ]},
    { type: "text", text:
       "If he turned to the right, he knocked it against the bed or into the windowpanes; if he turned "
      + "to the left, he struck the walls or the door; if he raised it a bit, he almost put the Fairy\u2019s eyes out."
      +  "\n\nThe Fairy sat looking at him and laughing.\n\n"
      + "\u201cWhy do you laugh?\u201d the Marionette asked her, worried now at the sight of his growing nose.\n\n"
      + "\u201cI am laughing at your lies.\u201d\n\n"
      + "\u201cHow do you know I am lying?\u201d"
    },
    { type: "blank", id: "blank4", options: [
      { text: "\u201cLies, my boy, are known in a moment. There are two kinds of lies, "
            + "lies with short legs and lies with long noses. Yours, just now, happen to have long noses.\u201d",
        correct: true },
      { text: "\u201cLies, my boy, can never be discovered, no matter how hard anyone tries.\u201d",
        correct: false },
      { text: "\u201cLies, my boy, only matter if somebody else hears them and believes them.\u201d",
        correct: false }
    ]},
    { type: "text", text:
        "Pinocchio, not knowing where to hide his shame, tried to escape from the room, "
      + "but his nose had become so long that he could not get it out of the door. "
    }
  ],

  /* ============ PAGE 4 ============
     Pinocchio's shame, the woodpeckers, and the ending. */
  [
    { type: "text", text:
        "Crying as if his heart would break, the Marionette mourned for hours over the length of his nose. "
      + "No matter how he tried, it would not go through the door. The Fairy showed no pity toward him, "
      + "as she was trying to teach him a good lesson, so that he would stop telling lies, "
      + "the worst habit any boy may acquire. But when she saw him, pale with fright and with his eyes "
      + "half out of his head from terror, she began to feel sorry for him and clapped her hands together."
    },
    
    { type: "blank", id: "blank5", options: [
      { text: "A thousand woodpeckers flew in through the window and settled themselves on Pinocchio\u2019s nose. "
            + "They pecked and pecked so hard at that enormous nose that in a few moments, it was the same size as before.",
        correct: true },
      { text: "A gentle wind blew in through the window, and the nose slowly shrank back to normal all by itself.",
        correct: false },
      { text: "The Fairy touched the nose with her wand, and it disappeared completely, leaving no nose at all.",
        correct: false }
    ]},
    { type: "illus", id: "illus2", file: "Mazzanti_2.jpg",
      alt: "Enrico Mazzanti, 1883" },
      
    { type: "text", text:
        "\n\n\u201cHow good you are, my Fairy,\u201d said Pinocchio, drying his eyes, "
      + "\u201cand how much I love you!\u201d\n\n"
      + "\u201cI love you, too,\u201d answered the Fairy, \u201cand if you wish to stay with me, "
      + "you may be my little brother and I\u2019ll be your good little sister.\u201d"
    }
  ]

];

/* ---------------------------------------------------------
   State
   --------------------------------------------------------- */
let currentSpread  = 0;            // 0 -> pages 1+2, 1 -> pages 3+4
const TOTAL_SPREADS = 2;

let paused      = true;
let gameStarted = false;
let puzzleScore = 0;
let correctCount = 0;

/* answers[blankId] = { isCorrect, correctChoice } */
const answers = {};

/* tracks which slot index (0,1,2) the CORRECT answer landed
   on for the previous question, so we can avoid repeating
   the same slot too often (anti-pattern safeguard) */
let lastCorrectSlot = null;

/* per-blank countdown interval id */
let activeCountdownId = null;

/* typewriter run token — bumped whenever we re-render a spread,
   so any in-flight typing loop from a previous render stops */
let runToken = 0;

/* ---------------------------------------------------------
   DOM
   --------------------------------------------------------- */
const leftPageContent  = document.getElementById("leftPageContent");
const rightPageContent = document.getElementById("rightPageContent");
const leftPageNum      = document.getElementById("leftPageNum");
const rightPageNum     = document.getElementById("rightPageNum");
const bookSpreadEl     = document.querySelector(".book-spread");

const prevBtn = document.getElementById("prevSpreadBtn");
const nextBtn = document.getElementById("nextSpreadBtn");
const spreadIndicator = document.getElementById("spreadIndicator");
const spreadNavEl = document.querySelector(".spread-nav");

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
   Shuffle helpers
   --------------------------------------------------------- */

/* Fisher-Yates, but reshuffles in place using a fresh random
   draw each time -- already unbiased on its own. */
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* Shuffle a question's 3 options, then -- if the correct
   answer would land in the SAME slot as the previous
   question's correct answer -- reshuffle (a few tries max).
   This avoids the "correct answer is always A" / "always B"
   pattern across a playthrough without sacrificing fairness
   (each individual shuffle is still a uniform permutation;
   we're just rejecting a streak). */
function shuffleOptionsAvoidingRepeat(options) {
  let attempt = shuffle(options);
  let tries = 0;
  while (
    lastCorrectSlot !== null &&
    attempt.findIndex(o => o.correct) === lastCorrectSlot &&
    tries < 6
  ) {
    attempt = shuffle(options);
    tries++;
  }
  lastCorrectSlot = attempt.findIndex(o => o.correct);
  return attempt;
}

/* ---------------------------------------------------------
   Render a fully-typed spread instantly (used when re-opening
   a spread whose blanks are already answered, e.g. going back)
   --------------------------------------------------------- */
function renderStaticPage(pageIndex, container) {
  container.innerHTML = "";
  pages[pageIndex].forEach((block) => {
    if (block.type === "text") {
      appendTextInstant(container, block.text);
    } else if (block.type === "illus") {
      container.appendChild(buildIllustration(block));
    } else if (block.type === "blank") {
      container.appendChild(buildBlankResolved(block));
    }
  });
}

function appendTextInstant(container, text) {
  const parts = text.split("\n\n");
  parts.forEach((part) => {
    if (part === "") return;
    const p = document.createElement("p");
    p.textContent = part;
    container.appendChild(p);
  });
}

function buildIllustration(block) {
  const figure = document.createElement("figure");
  figure.className = "inline-illustration";
  figure.id = block.id;

  const img = document.createElement("img");
  img.src = block.file;
  img.alt = block.alt;
  img.addEventListener("load",  () => img.classList.add("loaded"));
  img.addEventListener("error", () => img.classList.remove("loaded"));

  const caption = document.createElement("figcaption");
  caption.innerHTML =
    `Illustration by Enrico Mazzanti, 1883<br>`;
  figure.appendChild(img);
  figure.appendChild(caption);
  return figure;
}

function buildBlankResolved(block) {
  const wrap = document.createElement("div");
  wrap.className = "blank-block";
  const existing = answers[block.id];
  const p = document.createElement("p");
  p.className = "blank-result " + (existing && existing.isCorrect ? "correct" : "incorrect");
  p.textContent = existing ? existing.correctChoice.text
                            : block.options.find(o => o.correct).text;
  wrap.appendChild(p);
  return wrap;
}

/* ---------------------------------------------------------
   Typewriter rendering of a page, block by block.
   Calls onDone() once the whole page has finished (including
   any blanks being answered).
   --------------------------------------------------------- */
function typePage(pageIndex, container, myToken, onDone) {
  const blocks = pages[pageIndex];
  let blockIndex = 0;

  function nextBlock() {
    if (myToken !== runToken) return;          // a re-render happened, stop
    if (blockIndex >= blocks.length) { onDone(); return; }

    const block = blocks[blockIndex++];

    if (block.type === "text") {
      typeTextBlock(container, block.text, myToken, nextBlock);
    } else if (block.type === "illus") {
      container.appendChild(buildIllustration(block));
      setTimeout(nextBlock, 150);
    } else if (block.type === "blank") {
      if (answers[block.id]) {
        /* already answered (e.g. revisiting) -> show resolved text */
        container.appendChild(buildBlankResolved(block));
        nextBlock();
      } else {
        showDecisionInline(container, block, myToken, nextBlock);
      }
    }
  }

  nextBlock();
}

/* type a single text block (which may contain multiple
   paragraphs, separated by \n\n) character by character */
function typeTextBlock(container, text, myToken, onDone) {
  const paragraphs = text.split("\n\n").filter(p => p !== "");
  let pi = 0;

  function nextParagraph() {
    if (myToken !== runToken) return;
    if (pi >= paragraphs.length) { onDone(); return; }

    const para = paragraphs[pi++];
    const p = document.createElement("p");
    container.appendChild(p);

    const cursor = document.createElement("span");
    cursor.className = "typedCursor";
    p.appendChild(cursor);

    const chars = [...para];
    let ci = 0;

    function step() {
      if (myToken !== runToken) return;
      if (paused) { setTimeout(step, 150); return; }
      if (ci >= chars.length) {
        cursor.remove();
        nextParagraph();
        return;
      }
      p.insertBefore(document.createTextNode(chars[ci++]), cursor);
      setTimeout(step, TYPE_SPEED_MS);
    }
    step();
  }

  nextParagraph();
}

/* ---------------------------------------------------------
   Inline decision box for a blank — typing pauses until
   this is answered.
   --------------------------------------------------------- */
function showDecisionInline(container, block, myToken, onDone) {
  const wrap = document.createElement("div");
  wrap.className = "blank-block";

  const box = document.createElement("div");
  box.className = "decision-box";

  const header = document.createElement("div");
  header.className = "decision-header";
  const h3 = document.createElement("h3");
  h3.textContent = "What happens next?";
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
  wrap.appendChild(box);
  container.appendChild(wrap);

  wrap.scrollIntoView({ behavior: "smooth", block: "nearest" });

  const choices = shuffleOptionsAvoidingRepeat(block.options);
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

    const correctChoice = block.options.find(o => o.correct);
    const isCorrect = !!(chosen && chosen.correct);

    buttons.forEach(b => (b.disabled = true));
    if (chosenBtn) chosenBtn.classList.add(isCorrect ? "chosen-correct" : "chosen-incorrect");
    if (!isCorrect) {
      const ci = choices.indexOf(correctChoice);
      if (buttons[ci]) buttons[ci].classList.add("chosen-correct");
    }

    if (isCorrect) { puzzleScore += POINTS_PER_BLANK; correctCount++; }

    answers[block.id] = { isCorrect, correctChoice };

    setTimeout(() => {
      if (myToken !== runToken) return;
      wrap.innerHTML = "";
      wrap.appendChild(buildBlankResolved(block));
      updateNextButton();
      checkAllAnswered();
      onDone();
    }, 900);
  }

  activeCountdownId = setInterval(() => {
    if (myToken !== runToken) { clearInterval(activeCountdownId); activeCountdownId = null; return; }
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
    if (remaining <= 10) fill.classList.add("low");
  }, 1000);
}

/* ---------------------------------------------------------
   Render the current spread: left page types first, then
   right page. If a page's blanks are already answered (e.g.
   navigating back to a finished spread), it renders instantly.
   --------------------------------------------------------- */
function renderSpread() {
  runToken++;
  const myToken = runToken;

  if (activeCountdownId) { clearInterval(activeCountdownId); activeCountdownId = null; }

  const leftPageIndex  = currentSpread * 2;
  const rightPageIndex = currentSpread * 2 + 1;

  leftPageContent.innerHTML  = "";
  rightPageContent.innerHTML = "";

  /* fixed-height class so the page already has its final size
     before any text/decision boxes are typed in */
  bookSpreadEl.classList.remove("spread-0", "spread-1");
  bookSpreadEl.classList.add("spread-" + currentSpread);

  /* always start a new spread at the top of the book, so the
     beginning of each page is visible without scrolling */
  bookSpreadEl.scrollIntoView({ behavior: "smooth", block: "start" });

  leftPageNum.textContent  = "\u2014 " + (leftPageIndex + 1)  + " \u2014";
  rightPageNum.textContent = "\u2014 " + (rightPageIndex + 1) + " \u2014";

  spreadIndicator.textContent =
    `Pages ${leftPageIndex + 1}\u2013${rightPageIndex + 1} of 4`;

  prevBtn.disabled = currentSpread === 0;
  updateNextButton();

  const leftAnswered  = pages[leftPageIndex].every(b => b.type !== "blank" || answers[b.id]);
  const rightAnswered = pages[rightPageIndex].every(b => b.type !== "blank" || answers[b.id]);

  if (leftAnswered && rightAnswered) {
    /* spread already completed earlier -> show instantly */
    renderStaticPage(leftPageIndex,  leftPageContent);
    renderStaticPage(rightPageIndex, rightPageContent);
    updateNextButton();
    return;
  }

  /* type left page, then right page */
  typePage(leftPageIndex, leftPageContent, myToken, () => {
    if (myToken !== runToken) return;
    typePage(rightPageIndex, rightPageContent, myToken, () => {
      if (myToken !== runToken) return;
      checkAllAnswered();
    });
  });
}

/* ---------------------------------------------------------
   Page-turning logic
   --------------------------------------------------------- */
function allBlanksAnsweredOnSpread() {
  const leftPageIndex  = currentSpread * 2;
  const rightPageIndex = currentSpread * 2 + 1;
  const ids = [];
  pages[leftPageIndex].forEach(b => { if (b.type === "blank") ids.push(b.id); });
  pages[rightPageIndex].forEach(b => { if (b.type === "blank") ids.push(b.id); });
  return ids.every(id => answers[id]);
}

function updateNextButton() {
  const wasDisabled = nextBtn.disabled;

  if (currentSpread < TOTAL_SPREADS - 1) {
    nextBtn.disabled = !allBlanksAnsweredOnSpread();
    nextBtn.textContent = "Next \u203a";
  } else {
    nextBtn.disabled = true;
    nextBtn.textContent = "\u203a";
  }

  /* if the button just became enabled, draw attention to it */
  if (wasDisabled && !nextBtn.disabled) {
    nextBtn.classList.add("ready");
    spreadNavEl.scrollIntoView({ behavior: "smooth", block: "center" });
  } else if (nextBtn.disabled) {
    nextBtn.classList.remove("ready");
  }
}

function checkAllAnswered() {
  updateNextButton();

  const allIds = [];
  pages.forEach(p => p.forEach(b => { if (b.type === "blank") allIds.push(b.id); }));
  if (allIds.every(id => answers[id])) {
    finishPuzzle();
  }
}

prevBtn.addEventListener("click", () => {
  if (currentSpread > 0) {
    currentSpread--;
    renderSpread();
  }
});

nextBtn.addEventListener("click", () => {
  if (currentSpread < TOTAL_SPREADS - 1 && allBlanksAnsweredOnSpread()) {
    nextBtn.classList.remove("ready");
    currentSpread++;
    renderSpread();
  }
});

/* ---------------------------------------------------------
   Finish
   --------------------------------------------------------- */
function finishPuzzle() {
  localStorage.setItem("pinocchio_level1PuzzleScore", puzzleScore.toString());

  feedbackEl.classList.add("show");
  feedbackEl.innerHTML =
      `You answered <strong>${correctCount} of 6</strong> moments correctly in time \u2014 `
    + `<strong>+${puzzleScore} Humanity</strong> earned for this chapter.<br>`
    + `Continue to the evaluation to collect more.`;

  continueBtn.classList.add("visible", "ready");
  continueBtn.scrollIntoView({ behavior: "smooth", block: "center" });

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
  renderSpread();
}

function pauseGame() {
  if (paused || !gameStarted) return;
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
  const done = localStorage.getItem("pinocchio_level1Completed") === "true";
  if (!done && timer.seconds > 0)
    if (!confirm("Leave this chapter?\n\nIt can only be completed once.")) e.preventDefault();
});

/* ---------------------------------------------------------
   Already completed?
   --------------------------------------------------------- */
if (localStorage.getItem("pinocchio_level1Completed") === "true") {
  startOverlay.classList.add("hidden");
  startBtn.disabled = stopBtn.disabled = true;
  const s = localStorage.getItem("pinocchio_level1Score");
  if (s) doneText.textContent =
    `You have already played through this chapter and earned +${s} Humanity. It can't be played again.`;
  doneOverlay.classList.remove("hidden");
}
