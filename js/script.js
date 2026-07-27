/* =========================================================
   script.js
   Shared logic for the Pinocchio Serious Game:
   - "Humanity" reward system (saved across all 4 levels)
   - Reusable timer for level pages
   - Small header helpers
   ========================================================= */

/* =========================================================
   Dev mode
   While true: every level/quiz page is reachable directly and
   replayable, ignoring lock state and "already completed"
   guards. Set to false before deploying to restore the normal,
   strict one-time, in-order progression.
   ========================================================= */
   
/* ============= DEV-MODE =============*/
const DEV_MODE = true; /*Dev-Mode beenden --> FALSE setzen*/

const HUMANITY_KEY = "pinocchio_totalHumanity";


 /* Approximate maximum humanity obtainable per level (puzzle + quiz).*/
const HUMANITY_MAX_PER_LEVEL = 70;
const TOTAL_LEVELS = 4;
const HUMANITY_MAX = HUMANITY_MAX_PER_LEVEL * TOTAL_LEVELS; // 320
const STAGE_1_THRESHOLD = Math.round(HUMANITY_MAX * 0.33); //from here: hybrid
const STAGE_2_THRESHOLD = Math.round(HUMANITY_MAX * 0.66); //from here: human

function getFinalStage() {
  const total = getTotalHumanity();

  if(total < STAGE_1_THRESHOLD) {
    return "puppet";
  } else if (total < STAGE_2_THRESHOLD) {
    return "hybrid";
  } else {
    return "human";
  }
}

/** Read the player's total humanity collected so far. */
function getTotalHumanity() {
  return parseInt(localStorage.getItem(HUMANITY_KEY) || "0", 10);
}

/** Add (or subtract) humanity points and persist the new total. */
function addHumanity(amount) {
  const updated = Math.max(0, getTotalHumanity() + amount);
  localStorage.setItem(HUMANITY_KEY, updated.toString());
  return updated;
}

/** Clear all saved progress (used by "Reset progress" on the start page). */
function resetAllProgress() {
  localStorage.removeItem(HUMANITY_KEY);
  [1, 2, 3, 4].forEach(n => {
    localStorage.removeItem("pinocchio_level" + n + "Completed");
    localStorage.removeItem("pinocchio_level" + n + "Score");
    localStorage.removeItem("pinocchio_level" + n + "PuzzleScore");
  });
}

/* Write the current humanity total into a badge element. */
function renderHumanityBadge(elementId) {
  const el = document.getElementById(elementId);
  if (el) el.textContent = "Humanity: " + getTotalHumanity();
}

/* Collect the level scores for the final page.*/
function renderSummaryTable() {
  [1, 2, 3, 4].forEach(n => {
  const puzzleScore = parseInt(localStorage.getItem("pinocchio_level" + n + "PuzzleScore") || "0", 10);
  const quizScore = parseInt(localStorage.getItem("pinocchio_level" + n + "Score") || "0", 10);
  document.getElementById("l" + n + "-puzzle").textContent = puzzleScore;
  document.getElementById("l" + n + "-quiz").textContent = quizScore;
  });
  document.getElementById("total-score").textContent = getTotalHumanity();
}

/* Image selection for the final page */
function renderFinalStage() {
  const stage = getFinalStage(); //"puppet"|"hybrid"|"human"

  document.querySelectorAll(".stage-caption, .stage-img-wrap").forEach(el => {
    el.classList.remove("active");
  });
  document.querySelectorAll(".stage-" + stage).forEach(el => {
    el.classList.add("active");
  });
}