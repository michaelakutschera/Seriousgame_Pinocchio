/* =========================================================
   quiz.js
   Step-based evaluation for Level 1 ("The Book").

   - 4 multiple-choice questions about the BOOK as a medium
     (5 Humanity Points each if correct)
   - combined with the puzzle score from level_1.html
   ========================================================= */

const evalAnswerKey = { q1: "b", q2: "c", q3: "a", q4: "c" };
const POINTS_PER_MC = 5;

renderHumanityBadge("humanityBadge");

const steps = Array.from(document.querySelectorAll(".quiz-step"));
const resultsStepIndex = steps.findIndex((s) => s.dataset.qid === "results");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const quizNav = document.getElementById("quizNav");
const progressText = document.getElementById("progressText");
const resultsContent = document.getElementById("resultsContent");

const selected = { q1: null, q2: null, q3: null, q4: null };
let currentStep = 0;

const completed = localStorage.getItem("pinocchio_level1Completed") === "true";
const puzzleScoreRaw = localStorage.getItem("pinocchio_level1PuzzleScore");

/* If someone lands here without having played the puzzle yet,
   send them back to start it (skipped in DEV_MODE). */
if (!DEV_MODE && !completed && puzzleScoreRaw === null) {
  window.location.href = "../html/level_1.html";
}

if (completed && !DEV_MODE) {
  showResultsOnly();
} else {
  initQuiz();
}

/* ---------------------------------------------------------
   Normal flow
   --------------------------------------------------------- */
function initQuiz() {
  steps.forEach((step) => {
    const qid = step.dataset.qid;
    if (qid === "results") return;
    step.querySelectorAll(".option-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        selected[qid] = btn.dataset.value;
        step.querySelectorAll(".option-btn").forEach((b) => b.classList.remove("selected"));
        btn.classList.add("selected");
        updateNav();
      });
    });
  });

  prevBtn.addEventListener("click", () => {
    if (DEV_MODE && currentStep > 0) showStep(currentStep - 1);
  });

  nextBtn.addEventListener("click", () => {
    if (currentStep < 3) {
      showStep(currentStep + 1);
    } else {
      finishEvaluation();
    }
  });

  showStep(0);
}

function showStep(i) {
  steps.forEach((s, idx) => s.classList.toggle("active", idx === i));
  currentStep = i;
  updateProgress();
  updateNav();
}

function updateProgress() {
  if (currentStep < 4) {
    progressText.textContent = `Question ${currentStep + 1} of 4`;
  } else {
    progressText.textContent = "Result";
  }
}

function updateNav() {
  if (currentStep === resultsStepIndex) {
    quizNav.style.display = "none";
    return;
  }
  quizNav.style.display = "flex";
  /* going back to an earlier question isn't allowed during normal
     play -- only in DEV_MODE, for testing */
  prevBtn.style.visibility = (DEV_MODE && currentStep !== 0) ? "visible" : "hidden";

  const qid = steps[currentStep].dataset.qid;
  nextBtn.disabled = selected[qid] === null;
  nextBtn.textContent = currentStep === 3 ? "Finish" : "Next \u2192";
}

/* ---------------------------------------------------------
   Finish: score, save, show results
   --------------------------------------------------------- */
function finishEvaluation() {
  let mcCorrect = 0;
  ["q1", "q2", "q3", "q4"].forEach((qid) => {
    if (selected[qid] === evalAnswerKey[qid]) mcCorrect++;
  });

  const evalScore = mcCorrect * POINTS_PER_MC;
  const puzzleScore = parseInt(puzzleScoreRaw, 10) || 0;
  const levelTotal = puzzleScore + evalScore;
  const newTotal = addHumanity(levelTotal);

  localStorage.setItem("pinocchio_level1Completed", "true");
  localStorage.setItem("pinocchio_level1Score", levelTotal.toString());
  renderHumanityBadge("humanityBadge");

  resultsContent.innerHTML = buildResultsHTML({
    puzzleScore,
    mcCorrect,
    evalScore,
    levelTotal,
    newTotal
  });

  showStep(resultsStepIndex);
}

function showResultsOnly() {
  const storedScore = parseInt(localStorage.getItem("pinocchio_level1Score") || "0", 10);
  resultsContent.innerHTML = buildResultsHTML({
    puzzleScore: null,
    mcCorrect: null,
    evalScore: null,
    levelTotal: storedScore,
    newTotal: getTotalHumanity(),
    alreadyDone: true
  });
  steps.forEach((s, idx) => s.classList.toggle("active", idx === resultsStepIndex));
  quizNav.style.display = "none";
  progressText.textContent = "Result";
}

function buildResultsHTML({ puzzleScore, mcCorrect, evalScore, levelTotal, newTotal, alreadyDone }) {
  const breakdown = alreadyDone
    ? `This chapter has already been completed.`
    : `Story puzzle: ${puzzleScore} &middot; Medium questions: ${mcCorrect}/4 correct (+${(mcCorrect || 0) * POINTS_PER_MC})`;

  return `
    <p class="quiz-eyebrow">Level 1 complete</p>
    <p class="humanity-earned">+${levelTotal} Humanity</p>
    <p class="breakdown">${breakdown}</p>
    <p>Total Humanity so far: <strong>${newTotal}</strong></p>
    <p style="margin-top:14px; display:flex; gap:10px; justify-content:center; flex-wrap:wrap;">
      <a class="btn btn-primary" href="../html/level_2.html">Continue to Level 2: The Comic &rarr;</a>
      <a class="btn btn-light" href="../index.html">Back to Start</a>
    </p>
  `;
}
