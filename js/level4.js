/* =========================================================
   level4.js — "Social Media"
   ========================================================= */

/* ---------------------------------------------------------
   AUTHORS — every account that can post/reply, in one place.
   "kind" is just for your own orientation - helps you see who's who at a glance.
   --------------------------------------------------------- */
const authors = {
  pinocchio:    { name: "Pinocchio",        handle: "@wooden_puppet",  avatar: "p", kind: "main character" },
  fairy:        { name: "The Blue Fairy",   handle: "@bluehair_fairy", avatar: "f", kind: "main character" },
  
  fox:          { name: "Fox",              handle: "@red_fox",        avatar: "fo", kind: "trickster" },
  cat:          { name: "Cat",              handle: "@black_cat",      avatar: "ca", kind: "trickster" },
  assassin_1:   {name: "Assassin_Fox",      handle: "@assa_f",        avatar: "a1", kind:"assassin"},
  assassin_2:   {name: "Assassin_Cat",      handle: "@black_coal_sack",avatar: "a2", kind:"assassin"},
  
  geppetto:     {name: "Geppetto",          handle: "@polendina",        avatar: "g",   kind: "ambient" },
  medoro:       {name: "Medoro",            handle: "@best_coachman",    avatar: "m",   kind: "ambient" },
  mangiafuoco:  {name:"Mangiafuoco",        handle: "Fire_eater_circus", avatar: "ma",  kind:" ambient"},
  candlewick:   {name: "Candlewick",        handle:"@thin_candlewick",   avatar:"c",    kind:"ambient"},
  
  troll_1:      { name: "Black Rabbit 1", handle: "@rabbit4321",            avatar: "r1", kind: "troll" },
  troll_2:      { name: "Black Rabbit 2", handle: "@dead_rabbit",           avatar: "r2", kind: "troll"},
  troll_3:      { name: "Black Rabbit 3", handle: "@eldest_rabbit1234",     avatar: "r3", kind: "troll"},
  troll_4:      { name: "Black Rabbit 4", handle: "@black_rabbit_immortal", avatar: "r4", kind: "troll"}
};

/* ---------------------------------------------------------
   FEED SCRIPT — the whole level, top to bottom, as one
   ordered list. Each entry is either:

     type: "post"               -> a normal post/reply, just
                                    shown, not interactive
     type: "sockpuppet-round"   -> ACTION 1: spot the disguised
                                    accounts among the replies
     type: "communitynote-round"-> ACTIONS 2-4: pick the most
                                    helpful Community Note for
                                    one of Pinocchio's 3 lies
     type: "troll-round"        -> ACTION 5: report/downvote an
                                    unfair comment
     type: "boost-round"        -> ACTION 6: repost the Fairy's
                                    closing line at the very end

   --------------------------------------------------------- */
const feedScript = [

  /* ===================================================
     OPENING: Pinocchio's dramatic (but true) thread about
     the night with the Assassins -- sets the tone: not
     every over-the-top post is automatically a lie.
     =================================================== */
  {
    type: "post",
    id: "post_thread_1",
    author: "Pinocchio",
    text: "Woke up FINE this morning, out of bed in one leap. Feels good to be alive after last night. #longstory",
    likes: 56, reposts: 53
  },
  {
    type: "post",
    id: "post_thread_2",
    author: "Pinocchio",
    text: "Short version: Fox & Cat convinced me my 5 gold coins could become 2000 at the Field of Wonders. We never got there. Two guys in coal sacks robbed me instead. Nearly hanged me from a tree. #wonder",
    likes: 99, reposts: 120
  },
  {
    type: "post",
    id: "post_reply_fox",
    author: "Fox",
    replyTo: "post_thread_2",
    text: "Wow, sounds rough buddy glad you're ok!",
    likes: 34, reposts: 45
  },
  {
    type: "post",
    id: "post_reply_medoro",
    replyTo: "post_thread_2",
    author: "Medoro",
    text: "The woods are not safe these days...",
    likes: 44, reposts: 29
  },
  {
    type: "post",
    id: "post_reply_cat",
    author: "Cat",
    replyTo: "post_thread_2",
    text: "Terrible what some people do these days. Trust no one. #staysave",
    likes: 85, reposts: 13
  },
  {
    type: "post",
    id: "post_reply_geppetto",
    replyTo: "post_thread_2",
    author: "Geppetto",
    replyTo: "post_thread_2",
    text: "@wooden_puppet, where are you? ARE YOU OKAY? Come home immediately!",
    likes: 3, reposts: 0
  },

  /* ===================================================
     ACTION 1 — Sockpuppet round.
     Among the masked "assassin" accounts replying deeper in
     the thread, 2 are Fox & Cat in disguise. Everything else
     is ambient noise. correctIds = the ones the player should
     tap.
     =================================================== */
  {
    type: "sockpuppet-round",
    id: "round_sockpuppets",
    prompt: "A few anonymous accounts jump into the thread, dressed up as \"the Assassins.\" Two of them are not who they pretend to be. Tap the ones you suspect are Fox & Cat in disguise.",
    accounts: [
      { id: "sock_1", handle: "@assa_f", text: "Your money or your life!", isDisguise: true,  revealAs: "Fox"   },
      { id: "sock_2", handle: "@assa_cf", text: "Did anyone else hear screaming near the oak tree?!", isDisguise: false },
      { id: "sock_3", handle: "@black_coal_sack", text: "Hehe, tongue tricks won't save your paw— i mean, your gold", isDisguise: true,  revealAs: "Cat"   },
      { id: "sock_4", handle: "@black_coal_sack_forever", text: "reporting this to the constable in the morning", isDisguise: false }
    ]
  },

  {
    type: "post",
    id: "post_candlewick",
    replyTo: "round_sockpuppets",
    author: "Candlewick",
    text: "Can we get for once more inforamtion about the incident? Seems interessting",
    likes: 21, reposts: 1
  },
  {
    type: "post",
    id: "post_medoro",
    author: "Medoro",
    replyTo: "post_candlewick",
    text: "@thin_candlewick this is your only concern? What is wrong with you? ",
    likes: 32, reposts: 7
  },
  {
    type: "post",
    id: "post_reply_fairy",
    author: "Mangiafuoco",
    replyTo: "post_fairy_question",
    text: "You lost my gold pieces?!",
    likes: 55, reposts: 43
  },

  /* ===================================================
     The Fairy asks the question that sets up all 3 lies
     =================================================== */
  {
    type: "post",
    id: "post_fairy_question",
    author: "The Blue Fairy",
    replyTo: "post_thread_2",
    text: "Glad you're safe. So – where are the gold pieces now?",
    likes: 156, reposts: 4
  },

  /* ===================================================
     LIE #1 + ACTION 2 (Community Note round)
     =================================================== */
  {
    type: "post",
    id: "post_lie_1",
    author: "Pinocchio",
    replyTo: "post_fairy_question",
    text: "I lost them.",
    likes: 45, reposts: 0
  },
  {
    type: "communitynote-round",
    id: "round_note_1",
    onPostId: "post_lie_1",
    prompt: "Add a Community Note. Which one is actually accurate?",
    notes: [
      { id: "n1a", text: "Readers added context: he still has the coins in his pocket. He never lost them.", correct: true },
      { id: "n1b", text: "Readers added context: the coins were likely stolen by the Assassins after all.", correct: false },
      { id: "n1c", text: "Sure puppet, nose don't lie", correct: false }
    ]
  },
  
  /* ===================================================
     ACTION 5 (troll round) — placed between lie 1 and 2
     =================================================== */
  {
    type: "troll-round",
    id: "round_troll_1",
    post: {
      author: "Black Rabbit 1",
      replyTo: "post_lie_1",
      text: "typical puppet, can't even hold onto a job, no wonder nobody trusts wood-people"
    },
    prompt: "This reply isn't a fact-check – it's just unfair to Pinocchio. Report it."
  },

  /* ===================================================
     LIE #2 + ACTION 3 (Community Note round)
     =================================================== */
  {
    type: "post",
    id: "post_lie_2",
    author: "Pinocchio",
    replyTo: "post_lie_1",
    text: "...in the wood nearby. That's where I lost them.",
    likes: 38, reposts: 0
  },
  {
    type: "post",
    replyTo: "post_lie_2",
    author: "Geppetto",
    text: "You weren't allowed to leave your home!",
    likes: 0, reposts: 1
  },
  {
    type: "communitynote-round",
    id: "round_note_2",
    onPostId: "post_lie_2",
    prompt: "Another Community Note is needed here. Which one holds up?",
    notes: [
      { id: "n2a", text: "This contradicts his first story and still doesn't match what actually happened.", correct: true },
      { id: "n2b", text: "Search parties confirm gold coins were indeed found scattered in the woods.", correct: false },
      { id: "n2c", text: "Sounds like a wood joke, get it, WOOD-ed", correct: false }
    ]
  },

  /* ===================================================
     LIE #3 + ACTION 4 (Community Note round, harder --
     two notes should feel close/plausible)
     =================================================== */
  {
    type: "post",
    id: "post_lie_3",
    author: "Pinocchio",
    replyTo: "post_lie_2",
    text: "Actually – now I remember. I swallowed them. While drinking the medicine.",
    likes: 29, reposts: 0
  },
  {
    type: "post",
    id: "post_reply_mangiafuoco_2",
    author: "Mangiafuoco",
    replyTo: "post_lie_3",
    text: "For real, where are the coins?",
    likes: 58, reposts: 0
  },

  {
    type: "post",
    id: "post_reply_candlewick",
    author: "Candlewick",
    replyTo: "post_lie_3",
    text: "Are you okay my friend @wooden_puppet? Are you free to meet and play?",
    likes: 49, reposts: 38
  },

  {
    type: "communitynote-round",
    id: "round_note_3",
    onPostId: "post_lie_3",
    prompt: "Community Note of the thread. Which one holds up?",
    notes: [
      { id: "n3a", text: "This is the third, contradictory version of the same story in a row – a clear pattern of lying, not a memory issue.", correct: true },
      { id: "n3b", text: "Swallowing coins with medicine is medically plausible and should be taken at face value.", correct: false },
      { id: "n3c", text: "Nose so big it's now blocking the view for 3 neighboring accounts", correct: false }
    ]
  },

  {
    type: "post",
    id: "post_reply_fairy_worried",
    author: "The Blue Fairy",
    replyTo: "post_lie_3",
    text: "... I am not sure what to do with this boy.",
    likes: 2, reposts: 0
  },

/*Einfügen von mehr Content und Posts von den anderen Figuren und Pinocchio"*/

  /* ===================================================
     The Fairy's closing line -- the "moral" post
     =================================================== */
  {
    type: "post",
    id: "post_fairy_moral",
    author: "fairy",
    replyTo: "post_lie_3",
    text: "Lies, my boy, are known in a moment. There are two kinds: lies with short legs, and lies with long noses. Yours, just now, happen to have long noses.",
    likes: 2400, reposts: 610
  },

  /* ===================================================
     ACTION 6 — Boost the truth (finale)
     =================================================== */
  {
    type: "boost-round",
    id: "round_boost",
    onPostId: "post_fairy_moral",
    prompt: "Help the truth trend. Repost the Fairy's reply so it outranks the lies."
  },

  /* ===================================================
     Resolution -- comedic wrap-up post
     =================================================== */
  {
    type: "post",
    id: "post_resolution",
    author: "fairy",
    text: "Update: a flock of woodpeckers has resolved the nose situation. Everything's back to normal. Some lessons you really do feel in your face.",
    likes: 3100, reposts: 890
  }

];

/* =========================================================
   ENGINE — walks feedScript top to bottom, appending one card
   at a time to #feedList. Plain posts auto-advance after a
   short delay; rounds pause the feed until the player acts,
   then resume it (same start/pause/resume shape as the other
   levels).

   Scoring: puzzleScore is Humanity for this chapter (max 60 --
   2 sockpuppets + 3 notes + 1 report + 1 boost, 10 pts each).
   trendingValue is a purely cosmetic "reach" counter shown in
   the platform bar, so correct actions feel like they matter.
   ========================================================= */

const SOCKPUPPET_POINTS = 5;   // x2 correct  = 10
const NOTE_POINTS       = 10;  // x3 rounds   = 30
const TROLL_POINTS      = 10;  // x1
const BOOST_POINTS      = 10;  // x1

const TREND_SOCKPUPPET = 25;
const TREND_NOTE       = 60;
const TREND_TROLL      = 40;
const TREND_BOOST      = 400;

const REVEAL_DELAY_MS        = 1400; // gap between plain posts
const ROUND_RESOLVE_DELAY_MS = 900;  // pause after a round is answered
const START_DELAY_MS         = 400;  // gap before the very first / resumed post

/* ---------------------------------------------------------
   DOM
   --------------------------------------------------------- */
const feedList        = document.getElementById("feedList");
const trendingValueEl = document.getElementById("trendingValue");

const finishOverlay = document.getElementById("finishOverlay");
const finishText    = document.getElementById("finishText");

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
let paused        = true;
let gameStarted   = false;
let finished      = false;
let awaitingInput = false; // true while a round is on screen, waiting for a tap

let nextIndex      = 0;
let advanceTimerId = null;

let puzzleScore   = 0;
let trendingValue = 0;

/* postsById[id] = { authorName, text } — filled in as posts are
   rendered, so later rounds/replies can quote/link back to them */
const postsById = {};

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
   Author lookup — item.author is sometimes an authors{} key
   ("pinocchio"), sometimes a display name ("Pinocchio"/"fairy"),
   with inconsistent casing. Resolve all of those the same way.
   --------------------------------------------------------- */
function resolveAuthor(nameOrKey) {
  if (!nameOrKey) return { name: "Unknown", handle: "", avatar: "?" };
  const key   = String(nameOrKey).trim();
  const lower = key.toLowerCase();

  if (authors[key]) return authors[key];

  const byKey = Object.keys(authors).find(k => k.toLowerCase() === lower);
  if (byKey) return authors[byKey];

  const byName = Object.values(authors).find(a => a.name.toLowerCase() === lower);
  if (byName) return byName;

  return { name: key, handle: "", avatar: key.charAt(0).toUpperCase() };
}

/* Twitter-style compact counts: 2400 -> "2.4K" */
function formatCount(n) {
  n = Number(n) || 0;
  if (n < 1000) return String(n);
  const k = n / 1000;
  return (k >= 10 ? Math.round(k) : Math.round(k * 10) / 10) + "K";
}

function rememberPost(id, item) {
  if (!id) return;
  postsById[id] = { authorName: resolveAuthor(item.author).name, text: item.text };
}

function scrollFeedToBottom() {
  feedList.scrollTop = feedList.scrollHeight;
}

function bumpTrending(amount) {
  trendingValue += amount;
  if (!trendingValueEl) return;
  trendingValueEl.textContent = formatCount(trendingValue);
  trendingValueEl.classList.remove("bump");
  void trendingValueEl.offsetWidth; // restart the CSS animation
  trendingValueEl.classList.add("bump");
}

/* ---------------------------------------------------------
   Post card — shared by plain posts, the troll-round's post
   and any post re-shown as context above a round.
   --------------------------------------------------------- */
function buildPostCard(post, extraClass) {
  const author = resolveAuthor(post.author);

  const card = document.createElement("div");
  card.className = "feed-post" + (extraClass ? " " + extraClass : "");

  if (post.replyTo && postsById[post.replyTo]) {
    const ctx = document.createElement("p");
    ctx.className = "feed-reply-context";
    ctx.textContent = "Replying to " + postsById[post.replyTo].authorName;
    card.appendChild(ctx);
  }

  const header = document.createElement("div");
  header.className = "feed-post-header";

  const avatar = document.createElement("div");
  avatar.className = "feed-avatar";
  avatar.textContent = author.avatar || author.name.charAt(0);
  header.appendChild(avatar);

  const names = document.createElement("div");
  names.className = "feed-post-names";
  const nameEl = document.createElement("span");
  nameEl.className = "feed-post-name";
  nameEl.textContent = author.name;
  const handleEl = document.createElement("span");
  handleEl.className = "feed-post-handle";
  handleEl.textContent = author.handle || "";
  names.appendChild(nameEl);
  names.appendChild(handleEl);
  header.appendChild(names);
  card.appendChild(header);

  const textEl = document.createElement("p");
  textEl.className = "feed-post-text";
  textEl.textContent = post.text;
  card.appendChild(textEl);

  const stats = document.createElement("div");
  stats.className = "feed-post-stats";
  const likeSpan = document.createElement("span");
  likeSpan.className = "feed-stat";
  likeSpan.textContent = "♥ " + formatCount(post.likes);
  const repostSpan = document.createElement("span");
  repostSpan.className = "feed-stat";
  repostSpan.textContent = "⟲ " + formatCount(post.reposts);
  stats.appendChild(likeSpan);
  stats.appendChild(repostSpan);
  card.appendChild(stats);

  return card;
}

function renderPost(item) {
  const card = buildPostCard(item);
  card.classList.add("feed-item-in");
  feedList.appendChild(card);
  rememberPost(item.id, item);
  scrollFeedToBottom();
}

/* Called by every round once the player has answered it, to
   un-pause the auto-advance and move on to the next item. */
function resolveRoundAndAdvance() {
  awaitingInput = false;
  scheduleNext(ROUND_RESOLVE_DELAY_MS);
}

/* ---------------------------------------------------------
   ACTION 1 — Sockpuppet round: tap the disguised accounts.
   Ends once both disguised accounts have been found; tapping
   a genuine account just dismisses that one row.
   --------------------------------------------------------- */
function renderSockpuppetRound(item) {
  const card = document.createElement("div");
  card.className = "feed-round-card sockpuppet-round feed-item-in";

  const prompt = document.createElement("p");
  prompt.className = "round-prompt";
  prompt.textContent = item.prompt;
  card.appendChild(prompt);

  const list = document.createElement("div");
  list.className = "sockpuppet-list";
  card.appendChild(list);

  const totalCorrect = item.accounts.filter(a => a.isDisguise).length;
  let foundCorrect = 0;

  item.accounts.forEach(acc => {
    const row = document.createElement("button");
    row.type = "button";
    row.className = "sockpuppet-account";

    const handle = document.createElement("span");
    handle.className = "sockpuppet-handle";
    handle.textContent = acc.handle;

    const text = document.createElement("span");
    text.className = "sockpuppet-text";
    text.textContent = acc.text;

    row.appendChild(handle);
    row.appendChild(text);
    list.appendChild(row);

    row.addEventListener("click", () => {
      if (paused || !gameStarted || finished || row.disabled) return;
      row.disabled = true;

      if (acc.isDisguise) {
        row.classList.add("unmasked");
        const tag = document.createElement("span");
        tag.className = "sockpuppet-reveal";
        tag.textContent = "Unmasked: " + acc.revealAs;
        row.appendChild(tag);

        puzzleScore += SOCKPUPPET_POINTS;
        bumpTrending(TREND_SOCKPUPPET);
        foundCorrect++;

        if (foundCorrect >= totalCorrect) {
          Array.from(list.children).forEach(b => (b.disabled = true));
          resolveRoundAndAdvance();
        }
      } else {
        row.classList.add("dismissed");
      }
    });
  });

  feedList.appendChild(card);
  scrollFeedToBottom();
}

/* ---------------------------------------------------------
   ACTIONS 2-4 — Community Note round: pick the one note that
   actually holds up. One shot, like the decision-box on other
   levels.
   --------------------------------------------------------- */
function renderCommunityNoteRound(item) {
  const card = document.createElement("div");
  card.className = "feed-round-card note-round feed-item-in";

  const targetPost = postsById[item.onPostId];
  if (targetPost) {
    const target = document.createElement("p");
    target.className = "note-target-label";
    target.textContent = "“" + targetPost.text + "” — " + targetPost.authorName;
    card.appendChild(target);
  }

  const prompt = document.createElement("p");
  prompt.className = "round-prompt";
  prompt.textContent = item.prompt;
  card.appendChild(prompt);

  const notesWrap = document.createElement("div");
  notesWrap.className = "decision-options";
  card.appendChild(notesWrap);

  let resolved = false;
  const choices = shuffle(item.notes);
  const buttons = choices.map(note => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "decision-btn";
    btn.textContent = note.text;
    btn.addEventListener("click", () => {
      if (resolved || paused || !gameStarted || finished) return;
      resolved = true;
      buttons.forEach(b => (b.disabled = true));

      if (note.correct) {
        btn.classList.add("chosen-correct");
        puzzleScore += NOTE_POINTS;
        bumpTrending(TREND_NOTE);
      } else {
        btn.classList.add("chosen-incorrect");
      }
      resolveRoundAndAdvance();
    });
    notesWrap.appendChild(btn);
    return btn;
  });

  feedList.appendChild(card);
  scrollFeedToBottom();
}

/* ---------------------------------------------------------
   ACTION 5 — Troll round: report the unfair reply. "Like" and
   "Reply" are there as plausible but wrong actions.
   --------------------------------------------------------- */
function renderTrollRound(item) {
  const card = document.createElement("div");
  card.className = "feed-round-card troll-round feed-item-in";

  const postCard = buildPostCard(item.post, "troll-post");
  card.appendChild(postCard);

  const prompt = document.createElement("p");
  prompt.className = "round-prompt";
  prompt.textContent = item.prompt;
  card.appendChild(prompt);

  const actions = document.createElement("div");
  actions.className = "decision-options troll-actions";
  card.appendChild(actions);

  const options = shuffle([
    { label: "♡ Like",  correct: false },
    { label: "↺ Reply", correct: false },
    { label: "⚑ Report", correct: true }
  ]);

  let resolved = false;
  const buttons = options.map(opt => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "decision-btn troll-btn";
    btn.textContent = opt.label;
    btn.addEventListener("click", () => {
      if (resolved || paused || !gameStarted || finished) return;
      resolved = true;
      buttons.forEach(b => (b.disabled = true));

      if (opt.correct) {
        btn.classList.add("chosen-correct");
        postCard.classList.add("reported");
        puzzleScore += TROLL_POINTS;
        bumpTrending(TREND_TROLL);
      } else {
        btn.classList.add("chosen-incorrect");
      }
      resolveRoundAndAdvance();
    });
    actions.appendChild(btn);
    return btn;
  });

  feedList.appendChild(card);
  scrollFeedToBottom();
}

/* ---------------------------------------------------------
   ACTION 6 — Boost round: repost the Fairy's closing line.
   --------------------------------------------------------- */
function renderBoostRound(item) {
  const card = document.createElement("div");
  card.className = "feed-round-card boost-round feed-item-in";

  const targetPost = postsById[item.onPostId];
  if (targetPost) {
    const target = document.createElement("p");
    target.className = "note-target-label";
    target.textContent = "“" + targetPost.text + "” — " + targetPost.authorName;
    card.appendChild(target);
  }

  const prompt = document.createElement("p");
  prompt.className = "round-prompt";
  prompt.textContent = item.prompt;
  card.appendChild(prompt);

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "btn btn-primary boost-btn";
  btn.textContent = "⟲ Repost";
  btn.addEventListener("click", () => {
    if (paused || !gameStarted || finished || btn.disabled) return;
    btn.disabled = true;
    btn.textContent = "✓ Reposted";
    btn.classList.add("boosted");

    puzzleScore += BOOST_POINTS;
    bumpTrending(TREND_BOOST);
    resolveRoundAndAdvance();
  });
  card.appendChild(btn);

  feedList.appendChild(card);
  scrollFeedToBottom();
}

/* ---------------------------------------------------------
   Main loop — reveals feedScript items one at a time.
   --------------------------------------------------------- */
function scheduleNext(delay) {
  clearTimeout(advanceTimerId);
  advanceTimerId = setTimeout(revealNext, delay);
}

function revealNext() {
  if (paused || !gameStarted || finished) return;

  if (nextIndex >= feedScript.length) {
    finishFeed();
    return;
  }

  const item = feedScript[nextIndex++];

  switch (item.type) {
    case "sockpuppet-round":
      awaitingInput = true;
      renderSockpuppetRound(item);
      break;
    case "communitynote-round":
      awaitingInput = true;
      renderCommunityNoteRound(item);
      break;
    case "troll-round":
      awaitingInput = true;
      renderTrollRound(item);
      break;
    case "boost-round":
      awaitingInput = true;
      renderBoostRound(item);
      break;
    case "post":
    default:
      renderPost(item);
      scheduleNext(REVEAL_DELAY_MS);
      break;
  }
}

/* ---------------------------------------------------------
   Finish
   --------------------------------------------------------- */
function finishFeed() {
  if (finished) return;
  finished = true;

  localStorage.setItem("pinocchio_level4PuzzleScore", puzzleScore.toString());

  finishText.innerHTML =
      `You steered the feed and earned <strong>+${puzzleScore} Humanity</strong> for this chapter `
    + `(Trending reached <strong>${formatCount(trendingValue)}</strong>).<br>`
    + `Continue to the evaluation to collect more.`;
  finishOverlay.classList.remove("hidden");

  startBtn.disabled = true;
  stopBtn.disabled  = true;
}

/* ---------------------------------------------------------
   Controls
   --------------------------------------------------------- */
function startGame() {
  startOverlay.classList.add("hidden");
  paused = false; gameStarted = true;
  startBtn.disabled = true; stopBtn.disabled = false;
  scheduleNext(START_DELAY_MS);
}

function pauseGame() {
  if (paused || !gameStarted || finished) return;
  paused = true;
  clearTimeout(advanceTimerId);
  pauseOverlay.classList.remove("hidden");
  startBtn.disabled = false; stopBtn.disabled = true;
}

function resumeGame() {
  pauseOverlay.classList.add("hidden");
  paused = false;
  startBtn.disabled = true; stopBtn.disabled = false;
  /* if a round is still on screen awaiting a tap, don't advance --
     just let its buttons respond to clicks again */
  if (!awaitingInput) scheduleNext(START_DELAY_MS);
}

overlayStartBtn.addEventListener("click", startGame);
resumeBtn.addEventListener("click", resumeGame);
startBtn.addEventListener("click", () => {
  if (!startOverlay.classList.contains("hidden")) startGame();
  else if (paused && gameStarted) resumeGame();
});
stopBtn.addEventListener("click", pauseGame);

backBtn.addEventListener("click", e => {
  const done = localStorage.getItem("pinocchio_level4Completed") === "true";
  if (!done && gameStarted)
    if (!confirm("Leave this chapter?\n\nIt can only be completed once.")) e.preventDefault();
});

/* ---------------------------------------------------------
   Level already completed - not possible to play it again, without reset.
   (skipped in DEV_MODE, so a level can be replayed freely)
   --------------------------------------------------------- */
if (!DEV_MODE && localStorage.getItem("pinocchio_level4Completed") === "true") {
  startOverlay.classList.add("hidden");
  startBtn.disabled = stopBtn.disabled = true;
  const s = localStorage.getItem("pinocchio_level4Score");
  if (s) doneText.textContent =
    `You have already played through this chapter and earned +${s} Humanity. It can't be played again.`;
  doneOverlay.classList.remove("hidden");
}