// VARIABLES
const quizCard = document.querySelector('#dynamic-quiz-card');
const startButton = document.querySelector('.start-quiz-button');
const timerBarElement = document.querySelector('#timer-bar');
const countdownElement = document.querySelector('#countdown');
const endCardTitleElement = document.createElement('h2');
const endCardTitleContent = {
    "allQuestionsAnswered": "Great Job!",
    "timesUp": "Bummer!"
}
const endCardMessageElement = document.createElement('p');
const endCardMessageContent = {
    "allQuestionsAnswered": "You completed the quiz before time ran out and finished with a score of:",
    "timesUp": "You ran out of time before you could finish the quiz. But no worries because you can retake it as many times as you want. You got this!"
}

const finalScoreElement = document.createElement('h3');
const initialsInput = document.createElement('input');
initialsInput.setAttribute('id', 'initials-input');
initialsInput.setAttribute('maxlength', 3);

const saveInitialsButton = document.createElement('button');
saveInitialsButton.setAttribute('id', 'save-initials-button');
saveInitialsButton.textContent = 'Save Score';

const retakeQuizButton = document.createElement('button');
retakeQuizButton.classList.add('start-quiz-button');
const retakeQuizButtonContent = {
    "allQuestionsAnswered": "Take Quiz Again!",
    "timesUp": "Try Again!"
}

// DEFAULT COUNTDOWN VALUES ON PAGE LOAD
let countdownCount = 100;
countdownElement.textContent = countdownCount;


// AVAILABLE QUESTIONS 

//Defining all the questions and storing them in an object
const questions = [{
    "question": "What is the capital of Bangladesh?",
    "choice": ["Dhaka", "Chittagong", "Sylhet"],
    "correct": "Dhaka"
    },
    {
    "question": "What is the name of the largest planet in the solar system?",
    "choice": ["Earth", "Jupiter", "Uranus"], 
    "correct": "Jupiter"
    },
    { 
    "question": "What is the capital of New York?",
    "choice": ["Manhattan", "NYC", "Albany"],  
    "correct": "Albany"
   },
   { 
    "question": "How many bones does the human body have?",
    "choice": ["109", "206", "114"],  //quizObj[2].choice[0],quizObj[2].choice[1]
    "correct": "206"
},
{ 
    "question": "What is the alter ego of Batman?",
    "choice": ["Bruce Banner", "Bruce Wayne", "Tony Stark"],  //quizObj[2].choice[0],quizObj[2].choice[1]
    "correct": "Bruce Wayne"
},
{ 
    "question": "How many books are there in the Harry Potter series?",
    "choice": ["7", "5", "8"],  //quizObj[2].choice[0],quizObj[2].choice[1]
    "correct": "7"
}
];



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

function startQuiz() {
    console.log(questions)
    let shuffledQuestions = shuffleQuestions(...questions);
    console.log('--- Shuffling magic ---')
    console.log(shuffledQuestions);
    clearQuizCard();
    renderQuestion(shuffledQuestions);
    startCountdown(); 
}

function endQuiz() {
    clearInterval(countdown);
    clearQuizCard();
    endCardTitleElement.textContent = endCardTitleContent.allQuestionsAnswered;
    endCardMessageElement.textContent = endCardMessageContent.allQuestionsAnswered;
    retakeQuizButton.textContent = retakeQuizButtonContent.allQuestionsAnswered;
    renderEndCardTags();
    renderWinUI();
}

function timeIsUp() {
    //Calling this again in case the user chooses incorrectly with less than five seconds left so UI does not show/capture a negative value
    countdownCount = 0;
    countdownElement.textContent = countdownCount;
    
    clearQuizCard();
    endCardTitleElement.textContent = endCardTitleContent.timesUp;
    endCardMessageElement.textContent = endCardMessageContent.timesUp;
    retakeQuizButton.textContent = retakeQuizButtonContent.timesUp;
    renderEndCardTags();
}

function renderEndCardTags() {
    quizCard.append(endCardTitleElement);
    quizCard.append(endCardMessageElement);
    quizCard.append(retakeQuizButton);
}

function renderWinUI() {
    finalScoreElement.textContent = countdownCount;
    quizCard.append(finalScoreElement);
    quizCard.append(initialsInput);
    quizCard.append(saveInitialsButton);
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

function clearQuizCard() {
    quizCard.innerHTML = '';
}

function renderQuestion(shuffledQuestions) {
    const currentQuestionObj = shuffledQuestions[0];
    const currentQuestion = JSON.stringify(currentQuestionObj.question).replace(/"/g, ''); 
    const questionElement = document.createElement("p");
    questionElement.textContent = currentQuestion;
    quizCard.appendChild(questionElement);
    const answersList = document.createElement("ul");
    quizCard.appendChild(answersList);

    for (let i = 0; i < currentQuestionObj.choice.length; i++) {
       choice = document.createElement("li");
       choice.setAttribute("data-choice", currentQuestionObj.choice[i]);
       choice.classList.add('choice');
       choice.setAttribute("id", "choice-" +i);
       choice.textContent = currentQuestionObj.choice[i];
       answersList.appendChild(choice);  
    }   
    
      //Adding Event Listeners to all the choices to then fire the checkAnswer function
      document.querySelectorAll('.choice').forEach(item => {
        item.addEventListener('click', checkAnswer);
    }); 

    function checkAnswer(evt) {
        let selectedChoice = evt.target.getAttribute('data-choice');
        console.log("checking answer for... " + selectedChoice);
        if (selectedChoice === currentQuestionObj.correct) {
            clearQuizCard();
            shuffledQuestions.splice(0,1);
            if (shuffledQuestions.length > 0) {
                renderQuestion(shuffledQuestions); 
            } else {
                endQuiz();
            }  
        } else {
            countdownCount = countdownCount - 5;
            timerBarPosition = timerBarPosition + 5;
            evt.target.style.backgroundColor = 'red';
        }
    }
}

function startCountdown() {
    countdownCount = 100;
    timerBarPosition = 0;
    countdownElement.textContent = countdownCount;
    timerBarElement.style.width = '100%';
    timerBarElement.style.marginLeft = '0%'

    countdown = setInterval(function () {
        countdownCount--;
        timerBarPosition++;
        let timerBarWidth = countdownCount.toString();
        timerBarElement.style.width = timerBarWidth + '%';
        let stringfiedBarPosition = timerBarPosition.toString();
        timerBarElement.style.marginLeft = stringfiedBarPosition + '%';
        countdownElement.textContent = countdownCount;

        if (countdownCount <= 50 && countdownCount > 25) {
            timerBarElement.style.backgroundColor = '#ffd615';
        } else if (countdownCount <= 25 && countdownCount > 0) {
            timerBarElement.style.backgroundColor = 'red';
        } else if (countdownCount <= 0) {
            clearInterval(countdown);
            timeIsUp();
        } 
    }, 1000);
}




    // if (evt.target.getAttribute('data-choice') === currentQuestionObj.correct) {
    //     alert("You chose correct!");
    // }
    //When user clicks on an answer
    //Check if clicked on answer matches the correct answer which is stored in the object -- maybe change this to a string since we're stringifying the answers array
    //Someway to use the .include() function??
    //See screengrab for possible JSON Structure - match to a string OR an array index?? Are we randomizing how the list items display on the question render??      
    //If the values match, then clear the question, splice the shuffled questions array, and renderQuestion again, which should be a new question at the 0 position in the index
    //maybe in the render question function, call the correct answer and return it so it is available to be cross-checked??
    //Wrong answers bg color to red -- consider styling of buttons

// function setWins() {
//     localStorage.setItem("score", countdownCount);
//   }
  







// EVENT LISTENERS

//Clicking the Start Button will initiate the quiz
startButton.addEventListener('click', startQuiz);
retakeQuizButton.addEventListener('click', function () {
    startQuiz();
});









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