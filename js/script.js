/* =========================================================
   script.js
   Shared logic for the Pinocchio Serious Game:
   - "Humanity" reward system (saved across all 4 levels)
   - Reusable timer for level pages
   - Small header helpers
   ========================================================= */

const HUMANITY_KEY = "pinocchio_totalHumanity";

/**
 * Approximate maximum humanity obtainable per level (puzzle + evaluation).
 * Levels 2-4 are not built yet, but this constant is used by the
 * index page to explain the ending logic and can be reused later.
 */
const HUMANITY_MAX_PER_LEVEL = 70;
const TOTAL_LEVELS = 4;
const HUMANITY_MAX = HUMANITY_MAX_PER_LEVEL * TOTAL_LEVELS; // 280
const HUMANITY_THRESHOLD = Math.round(HUMANITY_MAX * 0.6); // 60% -> becomes a real boy

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

/** Write the current humanity total into a badge element. */
function renderHumanityBadge(elementId) {
  const el = document.getElementById(elementId);
  if (el) el.textContent = "Humanity: " + getTotalHumanity();
}

/* =========================================================
   Timer
   A simple count-up timer used on every level page.
   ========================================================= */
class GameTimer {
  constructor(displayElementId) {
    this.seconds = 0;
    this.intervalId = null;
    this.displayEl = document.getElementById(displayElementId);
    this._render();
  }

  start() {
    if (this.intervalId) return;
    this.intervalId = setInterval(() => {
      this.seconds += 1;
      this._render();
    }, 1000);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  get isRunning() {
    return this.intervalId !== null;
  }

  _render() {
    if (!this.displayEl) return;
    const m = Math.floor(this.seconds / 60).toString().padStart(2, "0");
    const s = (this.seconds % 60).toString().padStart(2, "0");
    this.displayEl.textContent = m + ":" + s;
  }
}
