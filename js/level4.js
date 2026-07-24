/* =========================================================
   level4.js — "Social Media"

   Pinocchio tells his story on social media, and the player
   has to carry out various actions at different points, such
   as selecting Community Notes, responding correctly themselves, 
   and identifying trolls.

    Scoring: 10 Humanity per correct checkpoint (max. 60).
   ========================================================= */


/* =========================================================
  Start Overlay: Random selection of four names for the players
  social Meida character, and selection of one profile picture.
  The level can only be started once both are chosen.
  ========================================================= */

  const name = ["Carlo Collodi", "Carol Della Chiesa", "Anton Grumann", "Ulrike Schimming"]
    function randomName() {
    const randomIndex = Math.floor(Math.random()*name.length);
    return name[randomIndex];
    }

  let selectedName   = null;
  let selectedAvatar = null; // { src, alt }

  function canStartLevel() {
    return Boolean(selectedName && selectedAvatar);
  }

  function updateStartAvailability() {
    overlayStartBtn.disabled = !canStartLevel();
  }

  const button = document.getElementById("nameButton");
  const show = document.getElementById("showName");
  button.addEventListener("click", function() {
  selectedName = randomName();
  show.textContent = selectedName;
  updateStartAvailability();
});

/* =========================================================
  Selection of one image for players
  social Meida character.
  ========================================================= */
const selectButtons = document.querySelectorAll(".selectButton");

selectButtons.forEach(function(button) {
  button.addEventListener("click", function () {
  selectButtons.forEach(b => b.classList.remove("selected"));
  button.classList.add("selected");
  const image = button.querySelector("img");
  selectedAvatar = { src: image.src, alt: image.alt };
  updateStartAvailability();
  });
});

/* ---------------------------------------------------------
   AUTHORS — every account that can post/reply.
   --------------------------------------------------------- */
const authors = {
  pinocchio:    {name: "Pinocchio",        handle: "@wooden_puppet",  avatarImgSrc: "../images/Pinocchio.jpg", kind: "main character"},
  fairy:        {name: "The Blue Fairy",   handle: "@bluehair_fairy", avatarImgSrc: "../images/Fairy.jpg", kind: "main character"},
  
  fox:          {name: "Fox",              handle: "@red_fox",         avatarImgSrc: "../images/Fox.jpg", kind: "trickster"},
  cat:          {name: "Cat",              handle: "@black_cat",       avatarImgSrc: "../images/Cat.jpg", kind: "trickster"},
  assassin_1:   {name: "Assassin_Fox",      handle: "@assa_f",         avatarImgSrc: "../images/Assassin_1.jpg", kind:"assassin"},
  assassin_2:   {name: "Assassin_Cat",      handle: "@black_coal_sack",avatarImgSrc: "../images/Assassin_2", kind:"assassin"},
  
  geppetto:     {name: "Geppetto",          handle: "@polendina",        avatarImgSrc: "../images/Geppetto.jpg",   kind: "ambient" },
  medoro:       {name: "Medoro",            handle: "@best_coachman",    avatarImgSrc: "../images/Medoro.jpg",   kind: "ambient" },
  mangiafuoco:  {name: "Mangiafuoco",        handle: "Fire_eater_circus",avatarImgSrc: "../images/Mangiafuoco.jpg",  kind:" ambient"},
  candlewick:   {name: "Candlewick",        handle:"@thin_candlewick",   avatarImgSrc: "../images/Candlewick.jpg",    kind:"ambient"},
  
  troll_1:      {name: "Little Black Rabbit",   handle: "@rabbit4321",            avatarImgSrc: "../images/Rabbit_1.jpg", kind: "troll" },
  troll_2:      {name: "Middle Black Rabbit",  handle: "@dead_rabbit",            avatarImgSrc: "../images/Rabbit_2.jpg", kind: "troll"},
  troll_3:      {name: "Big Black Rabbit",     handle: "@eldest_rabbit1234",      avatarImgSrc: "../images/Rabbit_3.jpg", kind: "troll"},
  troll_4:      {name: "Grande Black Rabbit",  handle: "@black_rabbit_immortal",  avatarImgSrc: "../images/Rabbit_4.jpg", kind: "troll"}
};

/* ---------------------------------------------------------
   FEED SCRIPT — the whole level, top to bottom, as one
   ordered list. Each entry is either:

     type: "post"                   -> a normal post/reply
     type: "sockpuppet-round"       -> Spot the disguised accounts among the replies
     type: "communitynote-round"    ->  Pick the most helpful Community Note for one of Pinocchio's 3 lies
     type: "troll-round"            -> Report/downvote an unfair comments
     type: "player-reply-round"     -> the player picks a line, which is then posted under their own
                                       chosen name + avatar

   --------------------------------------------------------- */
const feedScript = [

  /* ===================================================
     OPENING: Pinocchio's thread about the night with the Assassins. 
     =================================================== */
  {
    type: "post",
    id: "post_thread_1",
    author: "Pinocchio",
    text: "Woke up FINE this morning, out of bed in one leap. Feels good to be alive after last night. #longstory",
    reach: "high"
  },
  {
    type: "post",
    id: "post_thread_2",
    author: "Pinocchio",
    text: "Short version: Fox & Cat convinced me my 5 gold coins could become 2000 at the Field of Wonders. We never got there. Two guys in coal sacks robbed me instead. Nearly hanged me from a tree. #wonder",
    reach: "viral"
  },
  {
    type: "post",
    id: "post_reply_fox",
    author: "Fox",
    replyTo: "post_thread_2",
    text: "Wow, sounds rough buddy, glad you're ok!",
    reach: "medium"
  },

   /* ===================================================
     PLAYER MOMENT 1
  =================================================== */
  {
    type: "player-reply-round",
    id: "round_player_reply_1",
    onPostId: "post_thread_2",
    prompt: "Choose the right reaction to Pinocchio's story?",
    options: [
      { id: "pr1_a", text: "Wow, five gold pieces turning into two thousand? Sounds like a great deal! #GetRich", correct: false},
      { id: "pr1_b", text: "That is too scary, let us not talk about it anymore. #Scary", correct: false},
      { id: "pr1_c", text: "How could you possibly leave out the Red Lobster Inn? #RedLobsterInn", correct: true }
    ]
  },

  {
    type: "post",
    id: "post_reply_medoro",
    replyTo: "post_thread_2",
    author: "Medoro",
    text: "The woods are not safe these days...",
    reach: "low"
  },
  {
    type: "post",
    id: "post_reply_cat",
    author: "Cat",
    replyTo: "post_thread_2",
    text: "Terrible what some people do these days. Trust no one. #staysafe",
    reach: "medium"
  },

  {
    type: "post",
    id: "post_reply_geppetto",
    replyTo: "post_thread_2",
    author: "Geppetto",
    replyTo: "post_thread_2",
    text: "@wooden_puppet, where are you? ARE YOU OKAY? Come home immediately!",
    reach: "low"
  },

  /* ===================================================
     SOCKPUPPET ROUND 1
     Among the masked "assassin" accounts replying deeper in
     the thread, 2 are Fox & Cat in disguise.
     =================================================== */
  {
    type: "sockpuppet-round",
    id: "round_sockpuppets",
    prompt: "A few anonymous accounts jump into the thread. Two of them are not who they pretend to be. Tap the ones you suspect are Fox & Cat in disguise.",
    accounts: [
      { id: "sock_1", handle: "@assa_f", text: "Your money or your life!", isDisguise: true,  revealAs: "Fox"   },
      { id: "sock_2", handle: "@assa_cf", text: "Did anyone else hear screaming near the oak tree?!", isDisguise: false },
      { id: "sock_3", handle: "@black_coal_sack", text: "Hehe, tongue tricks won't save your paw— i mean, your gold", isDisguise: true,  revealAs: "Cat"},
      { id: "sock_4", handle: "@black_coal_sack_forever", text: "reporting this to the constable in the morning", isDisguise: false }
    ]
  },

  {
    type: "post",
    id: "post_candlewick",
    replyTo: "round_sockpuppets",
    author: "Candlewick",
    text: "Can we get for once more inforamtion about the incident? Seems interessting",
    reach: "low"
  },
  {
    type: "post",
    id: "post_medoro",
    author: "Medoro",
    replyTo: "post_candlewick",
    text: "@thin_candlewick this is your only concern? What is wrong with you? ",
    reach: "low"
  },

  {
    type: "post",
    id: "post_mangiafuoco",
    author: "Mangiafuoco",
    replyTo: "post_thread_2",
    text: "You lost my gold pieces?!",
    reach: "medium"
  },

  {
    type: "post",
    id: "post_geppetto",
    author: "Geppetto",
    replyTo: "post_mangiafuoco",
    text: "@Fire_eater_circus Those are your only concerns?",
    reach: "low"
  },

  /* ===================================================
     The Fairy asks the question that sets up all 3 lies.
     =================================================== */
  {
    type: "post",
    id: "post_fairy_question",
    author: "The Blue Fairy",
    replyTo: "post_thread_2",
    text: "Glad you're safe. So – where are the gold pieces now?",
    reach: "medium"
  },

  /* ===================================================
     LIE #1 + ACTION 2 
     =================================================== */
  {
    type: "post",
    id: "post_lie_1",
    author: "Pinocchio",
    replyTo: "post_fairy_question",
    text: "I lost them.",
    reach: "medium"
  },

    /* ===================================================
     COMMUNITY ROUND 1
     =================================================== */
  {
    type: "communitynote-round",
    id: "round_note_1",
    onPostId: "post_lie_1",
    prompt: "Add a Community Note. Which one is actually accurate?",
    notes: [
      { id: "n1a", text: "You add a Community Note: he still has the coins in his pocket. He never lost them.", correct: true },
      { id: "n1b", text: "You add a Community Note: the coins were likely stolen by the Assassins after all.", correct: false },
      { id: "n1c", text: "You add a Community Note: Sure puppet, nose don't lie", correct: false }
    ]
  },

  {
    type: "post",
    id: "post_reply_mangiafuoco_lie_1",
    author: "Mangiafuoco",
    replyTo: "post_lie_1",
    text: "A puppet who lies this much? Sounds like he'd make a great show. Bring him back to me!",
    reach: "low"
  },

  {
    type: "post",
    id: "post_reply_geppetto_lie_1",
    author: "Geppetto",
    replyTo: "post_lie_1",
    text: "That's my boy... always finding new ways to make his nose grow.",
    reach: "low"
  },

    {
    type: "post",
    id: "post_reply_fox_lie_1",
    author: "Fox",
    replyTo: "post_lie_1",
    text: "Funny, you are a great storyteller @wooden_puppet.",
    reach: "low"
  },

  /* ===================================================
    TROLL ROUND 1
     =================================================== */
  {
    type: "troll-round",
    id: "round_troll_1",
    prompt: "A few more replies show up under Pinocchio's confession. Some are just opinions, others go for a personal cheap shot. Report the ones that actually cross the line.",
    accounts: [
      { id: "troll_1", author: "troll_1", replyTo: "post_lie_1", text: "typical puppet, can't even hold onto a job, no wonder nobody trusts wood-people", reach: "high", isTrollAttack: true },
      { id: "troll_2", author: "troll_2", replyTo: "post_lie_1", text: "Some people just love main character energy.", reach: "low", isTrollAttack: false},
      { id: "troll_3", author: "troll_3", replyTo: "post_lie_1", text: "Honestly not buying this story, sounds made up.", reach: "medium", isTrollAttack: false },
      { id: "troll_4", author: "troll_4", replyTo: "post_lie_1", text: "LOL classic pinocchio behavior", reach: "high", isTrollAttack: true}
    ]
  },

  /* ===================================================
     LIE #2 
     =================================================== */
  {
    type: "post",
    id: "post_lie_2",
    author: "Pinocchio",
    replyTo: "post_lie_1",
    text: "...in the wood nearby. That's where I lost them.",
    reach: "medium"
  },

   /* ===================================================
      COMMUNITY ROUND 2
    =================================================== */
  {
    type: "communitynote-round",
    id: "round_note_2",
    onPostId: "post_lie_2",
    prompt: "Another Community Note is needed here. Which one holds up?",
    notes: [
      { id: "n2a", text: "You add a Community Note: This contradicts his first story and still doesn't match what actually happened.", correct: true },
      { id: "n2b", text: "You add a Community Note: Search parties confirm gold coins were indeed found scattered in the woods.", correct: false },
      { id: "n2c", text: "You add a Community Note: Sounds like a wood joke, get it, WOOD-ed", correct: false }
    ]
  },
    {
    type: "post",
    replyTo: "post_lie_2",
    author: "Geppetto",
    text: "You weren't allowed to leave your home!",
    reach: "low"
  },

  /* ===================================================
     LIE #3
     =================================================== */
  {
    type: "post",
    id: "post_lie_3",
    author: "Pinocchio",
    replyTo: "post_lie_2",
    text: "Actually – now I remember. I swallowed them. While drinking the medicine.",
    reach: "high"
  },
   /* ===================================================
      COMMUNITY ROUND 3
    =================================================== */
  {
    type: "communitynote-round",
    id: "round_note_3",
    onPostId: "post_lie_3",
    prompt: "Community Note of the thread. Which one holds up?",
    notes: [
      { id: "n3a", text: "You add a Community Note: This is the third, contradictory version of the same story in a row – a clear pattern of lying, not a memory issue.", correct: true },
      { id: "n3b", text: "You add a Community Note: Swallowing coins with medicine is medically plausible and should be taken at face value.", correct: false },
      { id: "n3c", text: "You add a Community Note: Nose so big it's now blocking the view for 3 neighboring accounts", correct: false }
    ]
  },

  {
    type: "post",
    id: "post_reply_mangiafuoco_2",
    author: "Mangiafuoco",
    replyTo: "post_lie_3",
    text: "For real, where are the coins?",
    reach: "medium"
  },

  {
    type: "post",
    id: "post_reply_candlewick",
    author: "Candlewick",
    replyTo: "post_lie_3",
    text: "Are you okay, my friend @wooden_puppet? Are you free to meet and play?",
    reach: "medium"
  },

  {
    type: "post",
    id: "post_reply_fairy",
    author: "The Blue Fairy",
    replyTo: "post_lie_3",
    text: "... I am not sure what to do with this boy. Are you lying to me?",
    reach: "low"
  },

  {
    type: "post",
    id: "post_reply_pinocchio",
    author: "Pinocchio",
    replyTo: "post_reply_fairy",
    text: "How do you know I am lying? I MEAN I AM NOT LYING!",
    reach: "medium"
  },

  {
    type: "post",
    id: "post_fairy_moral",
    author: "fairy",
    replyTo: "post_reply_pinocchio",
    text: "Lies, my boy, are known in a moment. There are two kinds: lies with short legs, and lies with long noses. Yours, just now, happen to have long noses.",
    reach: "medium"
  },

  /* ===================================================
     Pinocchio tells what happened.
     =================================================== */
    {
    type: "post",
    id: "post_pinocchio_nose_story_1",
    author: "Pinocchio",
    replyTo: "post_fairy_moral",
    text: "I AM NOT LYING!",
    reach: "low"
    },

    {
    type: "post",
    id: "post_pinocchio_nose_story_2",
    author: "Pinocchio",
    replyTo: "post_pinocchio_nose_story_1",
    text: "Short version: I was getting STUCK in my own bedroom because my nose is basically a tree now! Cried for literally HOURS!!! #Embarrassed",
    reach: "medium"
    },

  /* ===================================================
     TROLl ROUND 2
     =================================================== */
  {
    type: "troll-round",
    id: "round_trolls_2",
    prompt: "A few more replies show up under Pinocchio's confession. Some are just blunt opinions, others go for a personal cheap shot. Report the ones that actually cross the line.",
    accounts: [
      { id: "troll_1", author: "troll_1", replyTo: "post_pinocchio_nose_story_2", text: "Oh no, that sounds genuinely awful. Glad you're okay now.", reach: "low", isTrollAttack: false },
      { id: "troll_4", author: "troll_4", replyTo: "post_pinocchio_nose_story_2", text: "Growing pains, literally. Hope the Fairy sorted you out.", reach: "low", isTrollAttack: false },
      { id: "troll_2", author: "troll_2", replyTo: "post_pinocchio_nose_story_2", text: "Aw, poor thing. Guess that's what happens when you can't stop lying, huh?", reach: "medium", isTrollAttack: true },
      { id: "troll_3", author: "troll_3", replyTo: "post_pinocchio_nose_story_2", text: "So sad. Anyway, does this mean you'll finally stop making things up?", reach: "medium", isTrollAttack: true }
    ]
  },

  {
    type: "post",
    id: "post_reaction_troll_2",
    author: "Medoro",
    replyTo: "round_trolls_2",
    text: "Some of you definitely need better hobbies...",
    reach: "low"
  },
  {
    type: "post",
    id: "post_reaction_troll_2b",
    author: "Candlewick",
    replyTo: "round_trolls_2",
    text: "@wooden_puppet ignore them. Come, let's hang out with the donkeys.",
    reach: "low"
  },
  
  {
    type: "post",
    id: "post_fairy_reaction",
    author: "fairy",
    replyTo: "post_pinocchio_nose_story_2",
    text: "I mean, he looked very pale and terrified, I couldn't even be mad anymore.",
    reach: "low"
  },

  /* ===================================================
     THE ENDING
     =================================================== */
  {
    type: "post",
    id: "post_ending_1",
    author: "fairy",
    replyTo: "post_fairy_reaction",
    text: "I helped him! A flock of woodpeckers has resolved the nose situation. Everything's back to normal.",
    reach: "high"
  },

  /* ===================================================
     PLAYER MOMENT 2
  =================================================== */
  {
    type: "player-reply-round",
    id: "round_player_reply_2",
    onPostId: "post_ending_1",
    prompt: "How do you want to react to how things ended?",
    options: [
      { id: "pr2_a", text: "Imagine getting side-eyed by a fairy, who is teaching you a lesson. Hahaha", correct: false},
      { id: "pr2_b", text: "Awwwww, that's so sweet, the fairy does care about him!", correct: false},
      { id: "pr2_c", text: "Why don't you @bluehair_fairy just say that you wanted to teach him a lesson? After all, lying is the WORST.", correct: true}
    ]
  },

  {
    type: "post",
    id: "post_ending_2",
    author: "Geppetto",
    replyTo: "post_ending_1",
    text: "Have you done something bad to my son?",
    reach: "low"
  },

  {
    type: "post",
    id: "post_ending_3",
    author: "Pinocchio",
    replyTo: "post_ending_1",
    text: "Thank you! How good you are, my Fairy. I love you!",
    reach: "high"
  },

  {
    type: "post",
    id: "post_ending_4",
    author: "fairy",
    replyTo: "post_ending_3",
    text: "I love you, too. And if you wish to stay with me, you may be my little brother.",
    reach: "viral"
  },

  {
    type: "post",
    id: "post_ending_5",
    author: "Pinocchio",
    replyTo: "post_ending_4",
    text: "I would love to have a good sister.",
    reach: "high"
  },

  /* ===================================================
     FINALE
    =================================================== */
  {
    type: "boost-round",
    id: "round_boost",
    onPostId: "post_ending_4",
    prompt: "Help this moment trend. Repost it so everyone sees."
  }

];

/* =========================================================
   ENGINE — walks feedScript top to bottom, appending one card
   at a time to #feedList. Plain posts auto-advance after a
   short delay; rounds pause the feed until the player acts,
   then resume it (same start/pause/resume shape as the other
   levels).

   Scoring: puzzleScore is Humanity for this chapter (max 60 --
   2 sockpuppet rounds + 3 notes + 2 troll rounds + 1 boost +
   2 player-reply rounds). Sockpuppet/troll are worth less per
   round now that there are two of each, so the total stays
   at 60 instead of creeping up to 100.
  ========================================================= */

const SOCKPUPPET_POINTS   = 1;   // x2 correct picks x2 rounds = 4
const NOTE_POINTS         = 10;  // x3 rounds                  = 30
const TROLL_POINTS        = 1;   // x2 correct picks x2 rounds = 4
const BOOST_POINTS        = 12;  // x1 (the finale)             = 12
const PLAYER_REPLY_POINTS = 5;   // x2 rounds                   = 10

const TREND_SOCKPUPPET   = 25;
const TREND_NOTE         = 60;
const TREND_TROLL        = 15;   
const TREND_BOOST        = 400; 
const TREND_PLAYER_REPLY = 50;

const REVEAL_DELAY_MS        = 1600; // gap between plain posts
const ROUND_RESOLVE_DELAY_MS = 1000;  // pause after a round is answered
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

const feedUserAvatar  = document.getElementById("feedUserAvatar");
const feedUserName    = document.getElementById("feedUserName");

overlayStartBtn.disabled = true; // needs a name + avatar first

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

/* postsById[id] = { authorName, text, likes, reposts } — filled
   in as posts are rendered, so later rounds/replies can quote/
   link back to them, and the boost round can amplify a post's
   own reach when it's reposted. */
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
function playerHandle() {
  if (!selectedName) return "@you";
  return "@" + selectedName.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}

function resolveAuthor(nameOrKey) {
  if (!nameOrKey) return { name: "Unknown", handle: "", avatar: "?" };
  if (nameOrKey === "player") {
    return {
      name: selectedName || "You",
      handle: playerHandle(),
      avatarImgSrc: selectedAvatar ? selectedAvatar.src : null
    };
  }
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

/* ---------------------------------------------------------
  Randomized likes and reposts. 
   a) every playthrough looks a little different and 
   b) the number stays consistent every
   time that same post is referenced again later.
   --------------------------------------------------------- */
const REACH_RANGES = {
  low:    { likes: [0,   20],  reposts: [0,  5]   },
  medium: { likes: [20,  70],  reposts: [5,  20]  },
  high:   { likes: [70,  180], reposts: [20, 60]  },
  viral:  { likes: [180, 400], reposts: [60, 200] }
};

function randInRange([min, max]) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function resolveReach(item) {
  if (item._reachResolved) return item;
  const tier = REACH_RANGES[item.reach];
  if (tier) {
    item.likes = randInRange(tier.likes);
    item.reposts = randInRange(tier.reposts);
  }
  item._reachResolved = true;
  return item;
}

/* Counts a stat span up from 0 to its final value. */
function animateCount(el, target, duration = 1100) {
  const start = performance.now();
  function tick(now) {
    const t = Math.min(1, (now - start) / duration);
    el.textContent = formatCount(Math.round(target * t));
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function rememberPost(id, item) {
  if (!id) return;
  postsById[id] = {
    authorName: resolveAuthor(item.author).name,
    text: item.text,
    likes: Number(item.likes) || 0,
    reposts: Number(item.reposts) || 0
  };
}

/* A post's own likes+reposts, passively added to trendingValue
   the moment it appears — the feed trends on its own, without
   needing the player to do anything. */
function postReach(item) {
  return (Number(item.likes) || 0) + (Number(item.reposts) || 0);
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
  resolveReach(post);
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
  if (author.avatarImgSrc) {
    const avatarImg = document.createElement("img");
    avatarImg.className = "feed-avatar-img";
    avatarImg.src = author.avatarImgSrc;
    avatarImg.alt = author.name;
    avatar.appendChild(avatarImg);
  } else {
    avatar.textContent = author.avatar || author.name.charAt(0);
  }
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
  likeSpan.append("♥ ");
  const likeNum = document.createElement("span");
  likeNum.textContent = "0";
  likeSpan.appendChild(likeNum);
  animateCount(likeNum, post.likes);

  const repostSpan = document.createElement("span");
  repostSpan.className = "feed-stat";
  repostSpan.append("⟲ ");
  const repostNum = document.createElement("span");
  repostNum.textContent = "0";
  repostSpan.appendChild(repostNum);
  animateCount(repostNum, post.reposts);

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
  const reach = postReach(item);
  if (reach > 0) bumpTrending(reach);
  scrollFeedToBottom();
}

/* Called by every round once the player has answered it, to
   un-pause the auto-advance and move on to the next item. */
function resolveRoundAndAdvance() {
  awaitingInput = false;
  scheduleNext(ROUND_RESOLVE_DELAY_MS);
}

/* ---------------------------------------------------------
  Sockpuppet round 1 and 2: tap exactly 2 of the 4 accounts
   you suspect are disguises. Every tap is scored immediately
   (green = correct, red = wrong).
   --------------------------------------------------------- */
const SOCKPUPPET_PICKS_ALLOWED = 2;

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

  let picksMade = 0;

  shuffle(item.accounts).forEach(acc => {
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
      if (picksMade >= SOCKPUPPET_PICKS_ALLOWED) return;

      row.disabled = true;
      picksMade++;

      if (acc.isDisguise) {
        row.classList.add("unmasked");
        puzzleScore += SOCKPUPPET_POINTS;
        bumpTrending(TREND_SOCKPUPPET);
      } else {
        row.classList.add("wrong");
      }

      if (picksMade >= SOCKPUPPET_PICKS_ALLOWED) {
        Array.from(list.children).forEach(b => (b.disabled = true));
        resolveRoundAndAdvance();
      }
    });
  });

  feedList.appendChild(card);
  scrollFeedToBottom();
}

/* ---------------------------------------------------------
   Community Note round 1, 2, and 3: pick the one note that
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
   Troll round 1 and 2: several replies show up at once and
   the player has to judge tone. Each is
   scored immediately (correct = genuine personal attack,
   wrong = just a blunt-but-legitimate opinion).
   --------------------------------------------------------- */
const TROLL_PICKS_ALLOWED = 2;

function renderTrollRound(item) {
  const card = document.createElement("div");
card.className = "feed-round-card troll-round feed-item-in";

  const prompt = document.createElement("p");
  prompt.className = "round-prompt";
  prompt.textContent = item.prompt;
  card.appendChild(prompt);

  let picksMade = 0;

  shuffle(item.accounts).forEach(acc => {
    const postCard = buildPostCard(acc, "troll-post");
    card.appendChild(postCard);

    // These replies are visible in the feed the moment the round
    // renders, so their reach counts passively right away, same
    // as any other post -- reporting one later removes it again.
    const reach = postReach(acc);
    if (reach > 0) bumpTrending(reach);

    const reportBtn = document.createElement("button");
    reportBtn.type = "button";
    reportBtn.className = "btn btn-light troll-report-btn";
    reportBtn.textContent = "Report";
    postCard.appendChild(reportBtn);

    reportBtn.addEventListener("click", () => {
      if (paused || !gameStarted || finished || reportBtn.disabled) return;
      if (picksMade >= TROLL_PICKS_ALLOWED) return;

      reportBtn.disabled = true;
      picksMade++;

      if (acc.isTrollAttack) {
        postCard.classList.add("reported", "reported-correct");
        puzzleScore += TROLL_POINTS;
        bumpTrending(TREND_TROLL - reach); // takedown: its own reach is removed again, small bonus on top
      } else {
        postCard.classList.add("reported", "reported-wrong");
      }

      if (picksMade >= TROLL_PICKS_ALLOWED) {
        card.querySelectorAll(".troll-report-btn").forEach(b => (b.disabled = true));
        resolveRoundAndAdvance();
      }
    });
});

  feedList.appendChild(card);
  scrollFeedToBottom();
}

/* ---------------------------------------------------------
   Boost round: repost the target post
   so its own reach counts a second time.
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

    const amplified = targetPost ? postReach(targetPost) : 0;
    puzzleScore += BOOST_POINTS;
    bumpTrending(amplified > 0 ? amplified : TREND_BOOST);
    resolveRoundAndAdvance();
  });
  card.appendChild(btn);

  feedList.appendChild(card);
  scrollFeedToBottom();
}

/* ---------------------------------------------------------
   PLAYER MOMENT 1 and 2
   --------------------------------------------------------- */
function renderPlayerReplyRound(item) {
  const card = document.createElement("div");
  card.className = "feed-round-card player-reply-round feed-item-in";

  const targetPost = item.onPostId ? postsById[item.onPostId] : null;
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

  const optionsWrap = document.createElement("div");
  optionsWrap.className = "decision-options";
  card.appendChild(optionsWrap);

  let resolved = false;
  shuffle(item.options).forEach(opt => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "decision-btn";
    btn.textContent = opt.text;
    btn.addEventListener("click", () => {
      if (resolved || paused || !gameStarted || finished) return;
      resolved = true;

      const playerPost = {
        id: item.id + "_post",
        author: "player",
        replyTo: item.onPostId,
        text: opt.text,
        likes: 0, reposts: 0
      };
      const postCard = buildPostCard(playerPost, "feed-item-in");

      if (opt.correct) {
        postCard.classList.add("player-post-correct");
        puzzleScore += PLAYER_REPLY_POINTS;
        bumpTrending(TREND_PLAYER_REPLY);
      }

      card.replaceWith(postCard);
      rememberPost(playerPost.id, playerPost);
      scrollFeedToBottom();

      resolveRoundAndAdvance();
    });
    optionsWrap.appendChild(btn);
  });

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
    case "player-reply-round":
      awaitingInput = true;
      renderPlayerReplyRound(item);
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
  if (!canStartLevel()) return; // guard, in case the button was ever re-enabled programmatically

  feedUserAvatar.src = selectedAvatar.src;
  feedUserAvatar.alt = selectedAvatar.alt;
  feedUserName.textContent = selectedName;

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