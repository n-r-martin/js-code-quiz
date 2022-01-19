// VARIABLES
const quizCard = document.querySelector('#dynamic-quiz-card');
const startButton = document.querySelector('#start-quiz-button');
const timerBarElement = document.querySelector('#timer-bar');
const countdownElement = document.querySelector('#countdown');
let countdown;
let countdownCount = 60;


// DEFAULT UI STATES
countdownElement.textContent = countdownCount;


// AVAILABLE QUESTIONS 

//Defining all the questions and storing them in an ibject
const questions = [{
    "question": "What is the capital of Bangladesh?",
    "choice": ["Dhaka", "Chittagong", "Sylhet"],
    "correct": ["Dhaka"]
    },
    {
    "question": "What is the name of the largest planet in the solar system?",
    "choice": ["Earth", "Jupiter", "Uranus"], 
    "correct": ["Jupiter"]
    },
    { 
    "question": "What is the capital of New York?",
    "choice": ["Manhattan", "NYC", "Albany"],  
    "correct": ["Albany"]
   },
   { 
    "question": "How many bones does the human body have?",
    "choice": ["109", "206", "114"],  //quizObj[2].choice[0],quizObj[2].choice[1]
    "correct": ["206"]
},
{ 
    "question": "What is the alter ego of Batman?",
    "choice": ["Bruce Banner", "Bruce Wayne", "Tony Stark"],  //quizObj[2].choice[0],quizObj[2].choice[1]
    "correct": ["Bruce Wayne"]
},
{ 
    "question": "How many books are there in the Harry Potter series?",
    "choice": ["7", "5", "8"],  //quizObj[2].choice[0],quizObj[2].choice[1]
    "correct": ["7"]
}
];

// for (let i = 0; i < questions.length; i++) {
    
// }



// Once the quiz begins, the first of a set of randomly selected questions should display
// Need to dynamically swap the content of quiz card container with the first item of the shuffledQuestions array
// Access the object properties and render them to the UI





//The timer should also begin
//As long as there is time left the user is still able to progress through the quiz
//If the user answers a question incorrectly, time (5 seconds) is subratcted from the timer, and the user must try to answer the question again
//If the user answers correctly, the next question is displayed



// FUNCTIONS

// Function to get the Highscores from local storage
function init() {
    getHighscores();
}

function getHighscores() {
    
}


// A Fisher-Yates algorithm expressed in a JavaScript Function to shuffle the order of any array that is passed as an argument when the function is called. 
function shuffleQuestions(...array) {
    var m = array.length, t, i;
  
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  }

function startQuiz() {
    // startCountdown();
    console.log(questions)
    let shuffledQuestions = shuffleQuestions(...questions);
    console.log('--- Shuffling magic ---')
    console.log(shuffledQuestions);
    clearQuizCard();
    renderQuestion();
}

function clearQuizCard() {
    quizCard.innerHTML = '';
}

function renderQuestion() {
    currentQuestionObj = questions[0];
    currentQuestion = JSON.stringify(questions[0].question).replace(/"/g, ''); 
    console.log(currentQuestion);
    questionAnchor = document.createElement("p");
    questionAnchor.textContent = currentQuestion;
    quizCard.appendChild(questionAnchor);

    answersList = document.createElement("ul");
    quizCard.appendChild(answersList);

    for (let i = 0; i < currentQuestionObj.choice.length; i++) {
       console.log('grabbing choices');
       choice = document.createElement("li");
       choice.textContent = currentQuestionObj.choice[i]
       answersList.appendChild(choice);  
    }
   
}

// function endGame() {
//     clearInterval(countdown);
//     setScore();  
// }

// function setWins() {
//     localStorage.setItem("score", countdownCount);
//   }
  


// function startCountdown() {
//     countdown = setInterval(function () {
//         countdownCount--;

//         if (countdownCount > 0 && allQuestionsAnswered) {
//             endGame();
//         } else if (countdownCount === 0) {
//             endGame();
//         }
//     }, 1000);
// }




// EVENT LISTENERS

//Clicking the Start Button will initiate the quiz
startButton.addEventListener('click', startQuiz)








//If the timer reaches zero, the user is no longer able to answer any questions
//The user is presented with their score, which is equal to the time remaining
//The user's score is stored to localData and also presented in the highscores UI.
//The user is presented with an option to take the quiz again, which will reset the quiz and timer

//When the user accesses the highscores list, they are presented with a list of all scores stored in localData
//The scores are listed in descending order



///// ENHANCEMENTS
// If the user answers 5 questions correctly in a row, they get a time bonus
// Depending on score, display 'ninja, wizard, noob, etc'
// Animations for right and wrong
// Provide options for what kind of quiz
// Pipe quiz data from elsewhere?





// QUESTIONS LIST

/* What is the operator used to add a new value to the previous one, and store it in the same variable? 
    ANSWER: =+  
*/