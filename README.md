# Seriousgame_Pinocchio
**"The Adventures of Pinocchio – A SERIOUS GAME ABOUT ONE STORY TOLD IN DIFFERENT MEDIA"**

A browser-based Serious Game built for the course "136033-1 SE Creating Web Experiences for the Digital Humanities" (University of Vienna).
The game explores how the same story changes depending on the medium that tells it. All four levels retell the same excerpt from _The Adventures of Pinocchio_ by Carlo Collodi (1883), in the English translation by Carol Della Chiesa, but each level uses a different medium with its own mechanics, forcing players to pay attention not just to whathappens, but to how the medium tells it.
Source text: https://www.gutenberg.org/files/500/500-h/500-h.htm#link2HCH0016

**1. CONCEPT**:

The player experiences Pinocchio's famous scene with the three lies and his growing nose. It is told four times, in four different media:

**Level 1	The Book:**	A 4-page flip-book that types itself out word by word. At 6 points in the story, the player must choose the correct continuation of the sentence from 3 options, optionally under a 30-second timer.

**Level 2	The Comic:**	An open comic book spread of 12 shuffled panels (6 per page). The player taps two panels to swap them until the story is back in the correct reading order. Scoring is based on how close the player's swap count is to the mathematical minimum.

**Level 3	The Audiobook:**	The same chapter, narrated as an audio recording (spoken by Michaela Kutschera). The player must choose the correct word from 3 options at 6 points in the narration.

**Level 4	Social Media:**	The story retold through a social-media feed format (posts,community notes, troll rounds). The player has to select the right version of the story at key moments. 

Each level ends with a **4-question evaluation quiz** about the medium itself (not the plot), which also rewards points.

**Reward system — "Humanity Points":**

•	Every level rewards Humanity Points for solving it correctly.

•	Points persist across levels (stored in localStorage) and are shown in the badge at the top of every page.

•	After Level 4, the player's total Humanity decides Pinocchio's fate:

1. Enough Humanity → become a real boy.
    
2. Medium Humanity → become a hybrid.

3. Not enough Humanity → he remains a wooden puppet.
    
•	A Hybrid ending illustration (part puppet, part boy) is planned for in-between results.

**2. CREDITS & SOURCES**

**Text** (Ch. 17–18):	Carlo Collodi, _Le avventure di Pinocchio_ (1883), translated by Carol Della Chiesa

**Level 1:**: illustrations	Original illustrations by Enrico Mazzanti (1883)

**Level 2:** comic panels	digitally drawn by Michaela Kutschera, inspired by various Pinocchio adaptations.

**Level 3:** narration	text read aloud by Michaela Kutschera.

**Level 4:** profile pictures	digitally drawn by Michaela Kutschera, inspired by Enrico Mazzanti's illustrations.

**Final animation** (puppet/hybrid/human): Adapted/redrawn from Enrico Mazzanti's illustrations; the hybrid form is a mix of both.


**3. PROJECR STRUCTURE**

<img width="657" height="648" alt="Bildschirmfoto 2026-07-27 um 12 33 20" src="https://github.com/user-attachments/assets/5f358d99-4805-4db3-b6b9-3b5dfca326c5" />


**3. HOW TO RUN**
1.	Open index.html in a browser.
2.	Progress (Humanity Points, completed levels) is saved in the browser's localStorage, so it persists between sessions on the same device/browser.
3.	Use the "Reset Progress" button on the start page to clear all saved data and Humanity Points.

**4. DEV MODE**

**Line to change before deployment:**
const DEV_MODE = true;   // change to: const DEV_MODE = false;

js/script.js contains a global switch:
While DEV_MODE = true:

•	All built levels/quizzes are reachable directly, regardless of lock state.

•	Levels/quizzes can be replayed (the normal "one-time only" rule is skipped).

•	A red "Dev: Open Quiz →" shortcut link appears under each level card on the start page.

•	The quiz "Previous" button becomes usable (normally hidden during real play).


**5.TECH NOTES**

•	HTML/CSS/JavaScript

•	Fonts loaded via Google Fonts

•	Shared design tokens (colors, fonts, spacing) live in css/style.css under :root, used by all level/quiz CSS files.

•	All player state (Humanity Points, completion flags, per-level scores) is stored client-side in localStorage under keys prefixed pinocchio_....

**6. PROJECT & CONTACT:** 

•	Created by: Michaela Kutschera, MA

•	E-Mail: a11831654@unet.univie.ac.at

•	2026

**7. AI USAGE**

This project was developed with the assistance of Claude.ai (Anthropic), mainly for writing and debugging code. Within the JavaScript and CSS files, the comment:

/* Claude.ai provided assistance in the creation of the following code section. */ 

marks the point from which a code section was created with AI assistance.

The narrative text is taken from Carol Della Chiesa's public-domain translation of Carlo Collodi's _The Adventures of Pinocchio_. All other content, including the quiz questions, answer options, and the overall game design and concept, was developed and written independently by Michaela Kutschera.

