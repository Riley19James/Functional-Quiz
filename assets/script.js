const quizContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const timerElement = document.getElementById("time");
const startButton = document.getElementById("start-btn");
const gameOverContainer = document.getElementById("game-over");
const scoreForm = document.getElementById("score-form");
const initialsInput = document.getElementById("initials");
const highScoreText = document.getElementById("high-score-text");
const highScoreList = document.getElementById("high-score-list");

let currentQuestionIndex = 0;
let time = 60;
let timerId;

const quizQuestions = [
  {
    question:
      "Question 1: Conor McGregor is or was a holder of which UFC record?",
    choices: [
      "Fastest title fight knockout",
      "Most fights won",
      "Most submissions",
      "Most knockouts",
    ],
    correctAnswer: "Fastest title fight knockout",
  },
  {
    question: "Question 2: What is the shape of the UFC ring?",
    choices: ["Circle", "Octagon", "Square", "Triangle"],
    correctAnswer: "Octagon",
  },
  {
    question: "Question 3: Who won UFC 1 on November 12, 1993?",
    choices: ["Dan Severn", "Frank Mir", "Royce Gracie ", "Conor McGregor"],
    correctAnswer: "Royce Gracie ",
  },
  {
    question: "Question 4: Who is the UFC President",
    choices: ["Vince McMahon", "Steve Jobs", "Elon Musk", "Dana White"],
    correctAnswer: "Dana White",
  },
  {
    question: 'Question 5: Also Known as "The Diamond"',
    choices: ["Dustin Poirier", "Jose Aldo", "Ken Shamrock", "Tito Ortiz"],
    correctAnswer: "Dustin Poirier",
  },
  {
    question: "Question 6: Where is the UFC Headquarters?",
    choices: [
      "Saint John, Newbrunswick",
      "Las Vegas, Nevada",
      "Washington, D.C",
      "Rome",
    ],
    correctAnswer: "Las Vegas, Nevada",
  },
];

startButton.addEventListener("click", startQuiz);

function startQuiz() {
  startButton.disabled = true;
  timerId = setInterval(updateTimer, 1000);
  showQuestion();
}

function showQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  choicesElement.innerHTML = "";
  currentQuestion.choices.forEach((choice) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = choice;
    li.appendChild(button);
    choicesElement.appendChild(li);

    button.addEventListener("click", () => {
      checkAnswer(button.textContent);
    });
  });
}

function checkAnswer(answer) {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  if (answer === currentQuestion.correctAnswer) {
    currentQuestionIndex++;
    if (currentQuestionIndex === quizQuestions.length) {
      endQuiz();
    } else {
      showQuestion();
    }
  } else {
    time -= 10;
  }
}

function updateTimer() {
  time--;
  timerElement.textContent = time;
  if (time <= 0) {
    endQuiz();
  }
}

function endQuiz() {
  clearInterval(timerId);
  quizContainer.classList.add("hide");
  gameOverContainer.classList.remove("hide");
  scoreForm.addEventListener("submit", saveScore);

  const highScore = getHighScore();
  if (highScore && highScore.initials && highScore.score) {
    highScoreText.textContent = `High Score: ${highScore.initials} - ${highScore.score}`;
  } else {
    highScoreText.textContent = "High Score: No high score yet.";
  }

  const userScore = document.createElement("p");
  userScore.textContent = `Your Score: ${time} - Initials: `;
  const userInitials = document.createElement("span");
  userInitials.setAttribute("id", "user-initials");
  userScore.appendChild(userInitials);
  gameOverContainer.appendChild(userScore);

  initialsInput.disabled = false;
  initialsInput.value = "";
  initialsInput.focus();
  scoreForm.querySelector("button").disabled = false;

  displayHighScores();
}

function getHighScores() {
  const highScoresJSON = localStorage.getItem("highScores");
  return highScoresJSON ? JSON.parse(highScoresJSON) : [];
}


function saveScore(event) {
  event.preventDefault();
  const initials = initialsInput.value;
  const score = time;

  const highScores = getHighScores();

  const newScore = {
    initials: initials,
    score: score,
  };

  highScores.push(newScore);

  localStorage.setItem("highScores", JSON.stringify(highScores));

  displayHighScores(); 

  const highScoreText = document.getElementById("high-score-text");
  highScoreText.textContent = `High Score: ${initials} - ${score}`;

  initialsInput.disabled = true;
  scoreForm.querySelector("button").disabled = true;
}


function restartQuiz() {
  window.location.href = "index.html";
}

document.getElementById("try-again-btn").addEventListener("click", restartQuiz);

function displayHighScores() {
  const highScores = getHighScores();
  highScoreList.innerHTML = "";

  const scoresWithInitials = highScores.filter((score) => score.initials);

  if (scoresWithInitials.length > 0) {
    scoresWithInitials.forEach((score) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${score.initials} - ${score.score}`;
      highScoreList.appendChild(listItem);
    });
  } else {
    const listItem = document.createElement("li");
    listItem.textContent = "No high scores with initials yet.";
    highScoreList.appendChild(listItem);
  }
}

function getHighScores() {
  const highScoresJSON = localStorage.getItem("highScores");
  return highScoresJSON ? JSON.parse(highScoresJSON) : [];
}

function displayHighScores() {
  const highScores = getHighScores();
  console.log(highScores); 
  highScoreList.innerHTML = "";

  const scoresWithInitials = highScores.filter(score => score.initials);

  if (scoresWithInitials.length > 0) {
    scoresWithInitials.forEach((score) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${score.initials} - ${score.score}`;
      highScoreList.appendChild(listItem);
    });
  } else {
    const listItem = document.createElement("li");
    listItem.textContent = "No high scores with initials yet.";
    highScoreList.appendChild(listItem);
  }
}


displayHighScores();
