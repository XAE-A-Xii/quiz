/******************************************************
 * "Which Library Persona Are You?" Final
 * - Full-screen approach
 * - Spaced-out hyphens, bigger welcome, bigger Start button
 * - No single-word lines in answers
 * - Smooth progress bar
 * - One-time confetti
 * - "Vote Yushu!" pinned bottom, 4 share icons (X, WhatsApp, Telegram, Email)
 ******************************************************/

// SCREENS
const welcomeScreen = document.getElementById('welcome-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

// BUTTONS
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const voteBtn = document.getElementById('vote-btn');

// QUIZ ELEMENTS
const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');
const progressText = document.getElementById('progress-text');
const progressFill = document.getElementById('progress-fill');

// RESULT ELEMENTS
const resultPersona = document.getElementById('result-persona');
const resultDesc = document.getElementById('result-desc');
const confettiContainer = document.getElementById('confetti-container');

// SHARE ICONS
const shareX = document.getElementById('share-x');
const shareWhatsApp = document.getElementById('share-whatsapp');
const shareTelegram = document.getElementById('share-telegram');
const shareEmail = document.getElementById('share-email');

/* 
  QUIZ DATA 
  (Spacing out hyphens: e.g., "mates — revision" or "no faff — straight")
*/
const questions = [
  {
    question: "How do you enter the library?",
    answers: [
      { text: "With my mates — revision starts with good intentions but turns into a gossip sesh.", type: "Loud" },
      { text: "Hood up, AirPods in, no faff — straight to my usual spot.", type: "Silent" },
      { text: "Power-walking in, 3 deadlines behind and running on vibes.", type: "LastMinute" },
      { text: "I don’t even bother going in — WiFi in the café is good enough.", type: "Social" }
    ]
  },
  {
    question: "What’s your library snack of choice?",
    answers: [
      { text: "Full-on meal deal — if I’m here for hours, I’m doing it properly.", type: "Loud" },
      { text: "Coffee. Just coffee. Probably from Pret.", type: "Silent" },
      { text: "What’s food? I’ve been staring at this essay for 6 hours.", type: "LastMinute" },
      { text: "Gum & chocolate — mainly here for the ~aesthetic~.", type: "Social" }
    ]
  },
  {
    question: "How do you ‘study’ in the library?",
    answers: [
      { text: "“Just a quick break…” proceeds to binge 3 Netflix episodes.", type: "Loud" },
      { text: "Actually working — AirPods in, lo-fi beats on, don’t even look at me.", type: "Silent" },
      { text: "Aggressively typing while whisper-arguing with my group about citations.", type: "LastMinute" },
      { text: "Checking my phone every 2 minutes & pretending it’s ‘research’.", type: "Social" }
    ]
  },
  {
    question: "Your reaction when you find your usual library seat taken?",
    answers: [
      { text: "Deep sigh & death stare. This was MY spot.", type: "Loud" },
      { text: "Find another seat, act unbothered (but I’m fuming inside).", type: "Silent" },
      { text: "Panic — I can’t study anywhere else. I’m doomed.", type: "LastMinute" },
      { text: "Just leave. Might as well go to the pub at this point.", type: "Social" }
    ]
  },
  {
    question: "What’s your studying motivation level?",
    answers: [
      { text: "Motivation? Haven’t seen her in months.", type: "Loud" },
      { text: "Fully locked in — this degree isn’t gonna earn itself.", type: "Silent" },
      { text: "Last-minute panic. My only study method.", type: "LastMinute" },
      { text: "Just here for the vibes & free heating.", type: "Social" }
    ]
  }
];

// TALLY
let tally = {
  Loud: 0,
  Silent: 0,
  LastMinute: 0,
  Social: 0
};

// PERSONA DATA (Vote Yushu)
const personaData = {
  Loud: {
    persona: "The Loud Study Group Member",
    desc: `You came to the library to ‘study’… but let’s be honest, you spent 90% of the time catching up on the latest gossip.
Group work? More like group chat. But hey, at least the vibes were immaculate!

“Students like you deserve better study spaces — vote for Yushu to make it happen!”`
  },
  Silent: {
    persona: "The Silent Grinder",
    desc: `You disappear into the library for 8 hours straight. No distractions, no nonsense, just work.
People have started wondering if you live here.

“Hardworking students like you deserve better — vote for Yushu to improve uni life!”`
  },
  LastMinute: {
    persona: "The Last-Minute Warrior",
    desc: `You work best under pressure. 2,000 words due in 5 hours? No problem. Adrenaline is your best friend.
It’s chaotic, but somehow… it works.

“Let’s make student life better — vote for Yushu to help us thrive!”`
  },
  Social: {
    persona: "The Social Butterfly",
    desc: `Are you really here to study? Or just here for the aesthetic? Either way, you’re living your best life.
The bookshelves? A vibe. The café? A must. The actual studying? TBD.

“Vote for Yushu to bring more study spaces that fit your vibe!”`
  }
};

let currentQuestionIndex = 0;

// START QUIZ
startBtn.addEventListener('click', () => {
  welcomeScreen.classList.remove('active');
  welcomeScreen.classList.add('hidden');
  quizScreen.classList.add('active');
  currentQuestionIndex = 0;
  loadQuestion();
});

// LOAD QUESTION
function loadQuestion() {
  answersContainer.innerHTML = '';
  nextBtn.classList.add('hidden');

  const q = questions[currentQuestionIndex];
  questionText.innerText = q.question;
  progressText.innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;

  // Smooth progress fill
  let progressPercent = (currentQuestionIndex / questions.length) * 100;
  progressFill.style.width = progressPercent + "%";

  q.answers.forEach(answer => {
    const btn = document.createElement('button');
    btn.classList.add('answer-btn', 'pill-btn');
    btn.innerText = answer.text;
    btn.addEventListener('click', () => selectAnswer(answer.type));
    answersContainer.appendChild(btn);
  });
}

// SELECT ANSWER
function selectAnswer(type) {
  // optional phone vibration
  if (navigator.vibrate) navigator.vibrate(40);

  tally[type]++;
  nextBtn.classList.remove('hidden');
}

// NEXT
nextBtn.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

// SHOW RESULT
function showResult() {
  quizScreen.classList.remove('active');
  quizScreen.classList.add('hidden');
  resultScreen.classList.add('active');

  // final progress fill = 100% 
  progressFill.style.width = "100%";

  let highest = "Loud";
  for (let key in tally) {
    if (tally[key] > tally[highest]) {
      highest = key;
    }
  }

  resultPersona.innerText = personaData[highest].persona;
  resultDesc.innerText = personaData[highest].desc;

  // Confetti once
  launchConfetti();
}

// VOTE YUSHU
voteBtn.addEventListener('click', () => {
  window.open("https://engage.luu.org.uk/election/V2CBV/leadluu-2025/position/2CX46/equality-liberation-officer", "_blank");
});

// SHARE ICONS (X, WhatsApp, Telegram, Email)
shareX.addEventListener('click', () => {
  let text = `I got ${resultPersona.innerText} in the library quiz! Check it out.`;
  let url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
});
shareWhatsApp.addEventListener('click', () => {
  let text = `I got ${resultPersona.innerText} in the library quiz! Check it out.`;
  let wUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  window.open(wUrl, '_blank');
});
shareTelegram.addEventListener('click', () => {
  let text = `I got ${resultPersona.innerText} in the library quiz! Check it out.`;
  let tUrl = `https://t.me/share/url?url=${encodeURIComponent("http://your-quiz-link.com")}&text=${encodeURIComponent(text)}`;
  window.open(tUrl, '_blank');
});
shareEmail.addEventListener('click', () => {
  let subject = "Check out my Library Persona!";
  let body = `I got ${resultPersona.innerText} in the library quiz. Check it out!`;
  let mailUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.open(mailUrl, '_blank');
});

// CONFETTI (one-time)
function launchConfetti() {
  confettiContainer.style.display = 'block';

  // spawn ~30 confetti for a single shot
  for (let i = 0; i < 30; i++) {
    const confetti = document.createElement("div");
    confetti.innerText = "🎉";
    confetti.style.position = "absolute";
    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.top = "-10%";
    confetti.style.fontSize = "24px";
    confetti.style.animation = `fall 3s linear ${Math.random()}s forwards`; 
    confettiContainer.appendChild(confetti);
  }
}

// Single-run confetti keyframes
const confettiStyles = document.createElement('style');
confettiStyles.innerHTML = `
@keyframes fall {
  0% { transform: translateY(-10%); }
  100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
}
`;
document.head.appendChild(confettiStyles);
