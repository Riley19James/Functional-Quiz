const quizContainer = document.getElementById('quiz-container');
const questionElement = document.getElementById('question');
const choicesElement = document.getElementById('choices');
const timerElement = document.getElementById('time');
const startButton = document.getElementById('start-btn');
const gameOverContainer = document.getElementById('game-over');
const scoreForm = document.getElementById('score-form');
const initialsInput = document.getElementById('initials');
const highScoreText = document.getElementById('high-score-text');

let currentQuestionIndex = 0;
let time = 60;
let timerId;

// Define your quiz questions and answers as an array of objects
const quizQuestions = [
  {
    question: 'Question 1: Conor McGregor is or was a holder of which UFC record?',
    choices: ['Fastest title fight knockout', 'Most fights won', 'Most submissions', 'Most knockouts'],
    correctAnswer: 'Fastest title fight knockout'
  },
  {
    question: 'Question 2: What is the shape of the UFC ring?',
    choices: ['Circle', 'Octagon', 'Square', 'Triangle'],
    correctAnswer: 'Octagon'
  },
  {
    question: 'Question 3: Who won UFC 1 on November 12, 1993?',
    choices: ['Dan Severn', 'Frank Mir', 'Royce Gracie ', 'Conor McGregor'],
    correctAnswer: 'Royce Gracie '
  },
  {
    question: 'Question 4: Who is the UFC President',
    choices: ['Vince McMahon', 'Steve Jobs', 'Elon Musk', 'Dana White'],
    correctAnswer: 'Dana White'
  },
  {
    question: 'Question 5: Also Known as "The Diamond"',
    choices: ['Dustin Poirier', 'Jose Aldo', 'Ken Shamrock', 'Tito Ortiz'],
    correctAnswer: 'Dustin Poirier'
  },
  {
    question: 'Question 6: Where is the UFC Headquarters?',
    choices: ['Saint John, Newbrunswick', 'Las Vegas, Nevada', 'Washington, D.C', 'Rome'],
    correctAnswer: 'Las Vegas, Nevada'
  },
];

startButton.addEventListener('click', startQuiz);

function startQuiz() {
  startButton.disabled = true;
  timerId = setInterval(updateTimer, 1000);
  showQuestion();
}

function showQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  choicesElement.innerHTML = '';
  currentQuestion.choices.forEach(choice => {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.textContent = choice;
    li.appendChild(button);
    choicesElement.appendChild(li);

    button.addEventListener('click', () => {
      checkAnswer(button.textContent);
    });
  });
}

function checkAnswer(answer) {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  if (answer === currentQuestion.correctAnswer) {
    // Answer is correct
    currentQuestionIndex++;
    if (currentQuestionIndex === quizQuestions.length) {
      // All questions answered
      endQuiz();
    } else {
      showQuestion();
    }
  } else {
    // Answer is incorrect
    time -= 10; // Subtract 10 seconds from the timer
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
  quizContainer.classList.add('hide');
  gameOverContainer.classList.remove('hide');
  scoreForm.addEventListener('submit', saveScore);

  // Display high score
  const highScore = getHighScore();
  if (highScore) {
    highScoreText.textContent = `High Score: ${highScore.initials} - ${highScore.score}`;
  }
}



function saveScore(event) {
  event.preventDefault();
  const initials = initialsInput.value;
  const score = time;

  // Save the score
  const highScore = getHighScore();
  if (!highScore || score > highScore.score) {
    const newHighScore = {
      initials: initials,
      score: score
    };
    localStorage.setItem('highScore', JSON.stringify(newHighScore));
    highScoreText.textContent = `High Score: ${initials} - ${score}`;
  }

  // Disable the form after saving the score
  initialsInput.disabled = true;
  scoreForm.querySelector('button').disabled = true;
}

function getHighScore() {
  const highScoreData = localStorage.getItem('highScore');
  return highScoreData ? JSON.parse(highScoreData) : null;
}
