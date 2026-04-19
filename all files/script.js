function signup() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    alert("Please fill all fields");
    return;
  }

  localStorage.setItem(`user_${username}`, password);
  alert("Signup successful! Now login.");
}

function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  const savedPassword = localStorage.getItem(`user_${username}`);

  if (savedPassword === password) {
    localStorage.setItem("currentUser", username);
    window.location.href = "welcome.htm";
  } else {
    alert("Invalid username or password");
  }
}

function startQuiz() {
  localStorage.setItem("score", 0);
  localStorage.setItem("currentQ", 0);
  window.location.href = "quiz.htm";
}

const questions = [
  {
    q: "JavaScript is used for?",
    options: ["Web Development", "Cooking", "Driving", "Painting"],
    ans: 0
  },
  {
    q: "Which keyword declares variable?",
    options: ["var", "int", "float", "num"],
    ans: 0
  },
  {
    q: "Which symbol is comment?",
    options: ["//", "##", "**", "!!"],
    ans: 0
  },
  {
    q: "Which company created JavaScript?",
    options: ["Netscape", "Google", "Apple", "Microsoft"],
    ans: 0
  },
  {
    q: "Which function shows popup?",
    options: ["alert()", "msg()", "show()", "popup()"],
    ans: 0
  },
  {
    q: "Which is correct variable name?",
    options: ["myVar", "1var", "#var", "var!"],
    ans: 0
  },
  {
    q: "Which is used to print in console?",
    options: ["console.log()", "print()", "echo()", "write()"],
    ans: 0
  }
];

while (questions.length < 30) {
  questions.push({
    q: `Sample JS Question ${questions.length + 1}`,
    options: ["Option A", "Option B", "Option C", "Option D"],
    ans: 0
  });
}

let currentQ = 0;
let score = 0;
let selectedOption = null;

if (document.getElementById("question")) {
  currentQ = parseInt(localStorage.getItem("currentQ")) || 0;
  score = parseInt(localStorage.getItem("score")) || 0;

  loadQuestion();
  startTimer();
}

function loadQuestion() {
  const currentQuestion = questions[currentQ];

  document.getElementById("question").innerText = currentQuestion.q;

  const optionsHTML = currentQuestion.options
    .map((option, index) => 
      `<div class="option" onclick="selectAnswer(${index}, this)">${option}</div>`
    )
    .join("");

  document.getElementById("options").innerHTML = optionsHTML;
  selectedOption = null;
}

function selectAnswer(index, element) {
  if (selectedOption !== null) return;

  selectedOption = index;

  if (index === questions[currentQ].ans) {
    score++;
  }

  localStorage.setItem("score", score);

  document.querySelectorAll(".option").forEach(opt => {
    opt.classList.remove("selected");
  });

  element.classList.add("selected");
}

function nextQuestion() {
  if (selectedOption === null) {
    alert("Select an answer first");
    return;
  }

  currentQ++;

  localStorage.setItem("score", score);
  localStorage.setItem("currentQ", currentQ);

  if (currentQ >= questions.length) {
    window.location.href = "result.htm";
  } else {
    loadQuestion();
  }
}

function startTimer() {
  let timeLeft = 50 * 60;

  const timerInterval = setInterval(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    const timerElement = document.getElementById("timer");
    if (timerElement) {
      timerElement.innerText = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    }

    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(timerInterval);
      localStorage.setItem("score", score);
      window.location.href = "result.htm";
    }
  }, 1000);
}

if (document.getElementById("score")) {
  const finalScore = parseInt(localStorage.getItem("score")) || 0;
  document.getElementById("score").innerText = `${finalScore} / ${questions.length}`;
}

function restart() {
  localStorage.removeItem("score");
  localStorage.removeItem("currentQ");
  window.location.href = "index.htm";
}