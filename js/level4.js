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
  assassin_1:   {name: "Assassin_Fox",      handle: "@assa_f1",        avatar: "a1", kind:"assassin"},
  assassin_2:   {name: "Assassin_Cat",      handle: "@black_coal_sack",avatar: "a2", kind:"assassin"},
  
  geppetto:     {name: "Geppetto",          handle: "@polendina",        avatar: "g",   kind: "ambient" },
  medoro:       { name: "Medoro",           handle: "@best_coachman",    avatar: "m",   kind: "ambient" },
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
    text: "Woke up FINE this morning, out of bed in one leap. Feels good to be alive after last night #longstory",
    likes: 0, reposts: 0
  },
  {
    type: "post",
    id: "post_thread_2",
    author: "Pinocchio",
    text: "Short version: Fox & Cat convinced me my 5 gold coins could become 2000 at the \"Field of Wonders.\" We never got there. Two guys in coal sacks robbed me instead. Nearly hanged me from a tree. 🌳💀",
    likes: 0, reposts: 0
  },
  {
    type: "post",
    id: "post_reply_fox",
    author: "Fox",
    replyTo: "post_thread_2",
    text: "Wow, sounds rough buddy glad you're ok!",
    likes: 0, reposts: 0
  },
  {
    type: "post",
    id: "post_reply_cat",
    author: "Cat",
    replyTo: "post_thread_2",
    text: "Terrible what people do these days. Trust no one.",
    likes: 0, reposts: 0
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
      { id: "sock_1", handle: "@coalSackGuy1", text: "your money or your life", isDisguise: true,  revealAs: "fox"   },
      { id: "sock_2", handle: "@justapasserby", text: "did anyone else hear screaming near the oak tree??", isDisguise: false },
      { id: "sock_3", handle: "@coalSackGuy2", text: "hehe, tongue tricks won't save your paw— i mean, your gold 🐾", isDisguise: true,  revealAs: "cat"   },
      { id: "sock_4", handle: "@villagewatch", text: "reporting this to the constable in the morning", isDisguise: false }
    ]
  },

  {
    type: "post",
    id: "post_villager_filler",
    author: "villager1",
    text: "can we please get some good news for once. this village man",
    likes: 21, reposts: 1
  },

  /* ===================================================
     The Fairy asks the question that sets up all 3 lies
     =================================================== */
  {
    type: "post",
    id: "post_fairy_question",
    author: "fairy",
    replyTo: "post_thread_2",
    text: "Glad you're safe. So -- where are the gold pieces now?",
    likes: 156, reposts: 4
  },

  /* ===================================================
     LIE #1 + ACTION 2 (Community Note round)
     =================================================== */
  {
    type: "post",
    id: "post_lie_1",
    author: "pinocchio",
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
      { id: "n1c", text: "lol sure buddy, nose don't lie", correct: false }
    ]
  },

  /* ===================================================
     ACTION 5 (troll round) — placed between lie 1 and 2
     =================================================== */
  {
    type: "troll-round",
    id: "round_troll_1",
    post: {
      author: "trollAcc",
      replyTo: "post_lie_1",
      text: "typical puppet, can't even hold onto a job, no wonder nobody trusts wood-people"
    },
    prompt: "This reply isn't a fact-check -- it's just unfair to Pinocchio. Report it."
  },

  /* ===================================================
     LIE #2 + ACTION 3 (Community Note round)
     =================================================== */
  {
    type: "post",
    id: "post_lie_2",
    author: "pinocchio",
    replyTo: "post_lie_1",
    text: "...in the wood nearby. That's where I lost them.",
    likes: 38, reposts: 0
  },
  {
    type: "communitynote-round",
    id: "round_note_2",
    onPostId: "post_lie_2",
    prompt: "Another Community Note is needed here. Which one holds up?",
    notes: [
      { id: "n2a", text: "This contradicts his first story and still doesn't match what actually happened.", correct: true },
      { id: "n2b", text: "Search parties confirm gold coins were indeed found scattered in the woods.", correct: false },
      { id: "n2c", text: "sounds like a wood joke, get it, WOOD-ed 🌲", correct: false }
    ]
  },

  /* ===================================================
     LIE #3 + ACTION 4 (Community Note round, harder --
     two notes should feel close/plausible)
     =================================================== */
  {
    type: "post",
    id: "post_lie_3",
    author: "pinocchio",
    replyTo: "post_lie_2",
    text: "Actually -- now I remember. I swallowed them. While drinking the medicine.",
    likes: 29, reposts: 0
  },
  {
    type: "communitynote-round",
    id: "round_note_3",
    onPostId: "post_lie_3",
    prompt: "Final Community Note of the thread -- read carefully, these two are close.",
    notes: [
      { id: "n3a", text: "This is the third, contradictory version of the same story in a row -- a clear pattern of lying, not a memory issue.", correct: true },
      { id: "n3b", text: "Swallowing coins with medicine is medically plausible and should be taken at face value.", correct: false },
      { id: "n3c", text: "nose so big it's now blocking the view for 3 neighboring accounts", correct: false }
    ]
  },

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
    text: "Update: a flock of woodpeckers has resolved the nose situation. Everything's back to normal. 🐦🔨 Some lessons you really do feel in your face.",
    likes: 3100, reposts: 890
  }

];