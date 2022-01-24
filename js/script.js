//////// VARIABLES ////////

const mainElement = document.querySelector('#primary-content');
const quizCard = document.querySelector('#dynamic-quiz-card');
const startButton = document.querySelector('.start-quiz-button');
const viewHighScoresButton = document.querySelector('#view-hs-button');
const highScoresElement = document.querySelector('#high-scores-container');
const blackFilter = document.querySelector('#black-filter');
const highScoresContent = document.querySelector('#high-scores-content');
const scoresList = document.createElement('ul');
scoresList.setAttribute('id', 'high-scores-list');
const closeButton = document.querySelector('#close-btn');
const clearScoresButton = document.querySelector('#clear-scores-btn');
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

const saveScoreButton = document.createElement('button');
saveScoreButton.setAttribute('id', 'save-score-button');

const retakeQuizButton = document.createElement('button');
retakeQuizButton.classList.add('start-quiz-button');
const retakeQuizButtonContent = {
    "allQuestionsAnswered": "Take Quiz Again!",
    "timesUp": "Try Again!"
}

// Default countdown values on page load - so there is something in the UI befoe the quiz is started for the first time;
let countdownCount = 100;
countdownElement.textContent = countdownCount;

// Must be defined as empty array for the first time a scored is ever saved (or if the user has cleared local storage). After this it will always be defined as a parsed array from local storage, even if the user reloads
let hiScoresArr = [];

//////// AVAILABLE QUESTIONS ////////

//Defining all the questions and storing them in an object
const questions = [{
    "question": "The localstorage fucntionality of a web browser will accept which of the following data types?",
    "choice": ["String", "Boolean", "Number", "All of them"],
    "correct": "String"
    },
    {
    "question": "Which of the following methods will disable the standard built-in behavor of certain HTML elements?",
    "choice": [".preventAction()", ".preventDefault()", ".block()", ".diasbleDefault()"], 
    "correct": ".preventDefault()"
    },
    { 
    "question": "If I want to allow the value of a variable to be updated, which of the following can I use to initialize that variable?",
    "choice": ["var", "const", "let", "var & let", "var & const"],  
    "correct": "var & let"
   },
   { 
    "question": "When a function produces a value, it is said to _________ that value.",
    "choice": ["resolve", "return", "result", "report"], 
    "correct": "return"
},
{ 
    "question": "Values that are passed to a function when it is invoked are called __________.",
    "choice": ["Arguments", "Variables", "Parameters", "Callbacks"],  
    "correct": "Arguments"
},
{ 
    "question": "A block of code that executes a multiple number of times while a certain condition is present is called a/an _________.",
    "choice": ["circuit", "conditional", "iterative", "loop"],  
    "correct": "loop"
},
{ 
    "question": "Which of the following operators will add the value of the right operand to the variable AND reassign the variable to equal the result?",
    "choice": ["++", "=+", "+=", "=="], 
    "correct": "+="
},
{ 
    "question": "JavaScript accesses HTML using which of the following models?",
    "choice": ["JOM", "DOM", "ROM", "COM"],  
    "correct": "DOM"
},
{ 
    "question": "Which of the following methods would you use to push an element to the document via JavaScript?",
    "choice": [".append()", ".attach", ".addElement()", ".insert()"],  
    "correct": ".append()"
},
{ 
    "question": "In order to store groups of data in a single variable, we can use a/an __________",
    "choice": ["object", "dataset", "array", "bundle"],  
    "correct": "array"
}
];

//////// FUNCTIONS ////////

// On init() check local storage for scores and render them if the exist
function init() {

    // Checking if there is a key in local storage call Scores - necessary because we cannot push to an empty array if it's parsed from local storage when we try to save the first ever score (or if user has cleared local storage since last they saved a score)
    if (localStorage.getItem('Scores')) {
        hiScoresArr = JSON.parse(localStorage.getItem('Scores'));
    } else {
        hiScoresArr = [];
    }

    renderHighScores();
}

// Render high scores to the UI, if any exist
function renderHighScores() {
    // First clear the UI so scores are not duplicated
    highScoresContent.innerHTML = '';
    scoresList.innerHTML = '';
    if (hiScoresArr.length > 0) {
        let sortedScores = hiScoresArr.sort().reverse();
        for (let i = 0; i < sortedScores.length; i++) {
            highScoreItem = document.createElement('li');
            highScoreItem.textContent = sortedScores[i];
            scoresList.append(highScoreItem);
        }
    highScoresContent.append(scoresList);

    } else {
        highScoresContent.innerHTML = '';
        const noScoresElementContainer = document.createElement('div');
        const noScoresImg = document.createElement('img');
        noScoresImg.setAttribute('src', 'img/shrugIcon.svg');
        const noScoresMessage = document.createElement('p');
        noScoresMessage.textContent = "There aren't any scores on the board yet..."
        noScoresElementContainer.append(noScoresImg);
        noScoresElementContainer.append(noScoresMessage);
        highScoresContent.append(noScoresElementContainer);
    }
}

// Saving a score to high scores on click of Save Score button
function saveScore() {
    let currentInitials = initialsInput.value;

    // If initals entry field has a mimimum value of 1, convert the score and push it, along with the initals entry value to the local storage array as a single string
    if (initialsInput.value.length > 1) {
        stringifiedScore = countdownCount.toString();
        hiScoresArr.push(stringifiedScore + ' - ' + currentInitials);
        localStorage.setItem('Scores', JSON.stringify(hiScoresArr));
        // Render the scores again so they are immediately visible without having to relaod the page
        renderHighScores();
        saveScoreButton.textContent = 'Score Saved!'
        saveScoreButton.disabled = true;

    // Wont allow user to save if initials are left empty 
    } else {
        alert('Must enter initials to save score!');
    }
}

// Start the quiz once the Start Quiz or Take Again buttons are clicked
function startQuiz() {
    // Create a new array of shuffled questions taken from the available questions object (values defined above) - function defined below
    let shuffledQuestions = shuffleQuestions(...questions);
    // Clear the quiz card of UI before rendering the first question
    clearQuizCard();
    // Render the first question in the shuffled questions array
    renderQuestion(shuffledQuestions);
    startCountdown(); 
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

// Useful function to call whenever the current UI needs to be cleared
function clearQuizCard() {
    quizCard.innerHTML = '';
}

// Programmatically render one question at a time and repeat until shuffled questions array is empty - then end the quiz if time is still remaining
function renderQuestion(shuffledQuestions) {
    // Create a variable from which we will generat all UI for the current question
    const currentQuestionObj = shuffledQuestions[0];
    const currentQuestion = JSON.stringify(currentQuestionObj.question).replace(/"/g, ''); 
    const questionElement = document.createElement("p");
    questionElement.textContent = currentQuestion;
    quizCard.appendChild(questionElement);
    const answersList = document.createElement("ul");
    quizCard.appendChild(answersList);

    // Render all answwr choices associated with current question
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

    // Check answer when any answer is clicked - using 'evt' to get the data-choice of the clicked element a cross checking it against the 'correct' property of the current question objact
    function checkAnswer(evt) {
        let selectedChoice = evt.target.getAttribute('data-choice');
        console.log("checking answer for... " + selectedChoice);

        // If select answer matches, clear the UI, splice the shuffled questions array at the first position, and repeat unitl the array the whole process until the array is empty
        if (selectedChoice === currentQuestionObj.correct) {
            clearQuizCard();
            shuffledQuestions.splice(0,1);
            if (shuffledQuestions.length > 0) {
                renderQuestion(shuffledQuestions); 
            // call end quiz function if shuffled questions array is empty
            } else {
                endQuiz();
            }  
        // if user chooses incorrectly, subratct 5 seconds from timer and style the clicked answer to indicate it's incorrect
        } else {
            countdownCount = countdownCount - 5;
            timerBarPosition = timerBarPosition + 5;
            evt.target.style.backgroundColor = 'red';
        }
    }
}

// Scenario in which user answers all questions before time runs out
function endQuiz() {
    clearInterval(countdown);
    clearQuizCard();
    endCardTitleElement.textContent = endCardTitleContent.allQuestionsAnswered;
    endCardMessageElement.textContent = endCardMessageContent.allQuestionsAnswered;
    retakeQuizButton.textContent = retakeQuizButtonContent.allQuestionsAnswered;
    renderEndCardTags();

     // Render UI specific to a successful completion scenario - see below
    renderWinUI();
}

// Scenario in which user runs out of time before answering all questions
function timeIsUp() {
    // Call this again in case the user chooses incorrectly with less than five seconds left, so UI does not show/capture a negative value
    countdownCount = 0;
    countdownElement.textContent = countdownCount;
    clearQuizCard();
    endCardTitleElement.textContent = endCardTitleContent.timesUp;
    endCardMessageElement.textContent = endCardMessageContent.timesUp;
    retakeQuizButton.textContent = retakeQuizButtonContent.timesUp;
    renderEndCardTags();
}

// Dynamic content called in both scenarios
function renderEndCardTags() {
    quizCard.append(endCardTitleElement);
    quizCard.append(endCardMessageElement);
    quizCard.append(retakeQuizButton);
}

// Rneder the score and the ability to enter initials and save both to the high scores list
function renderWinUI() {
    finalScoreElement.textContent = countdownCount;
    quizCard.append(finalScoreElement);
    initialsInput.value = '';
    quizCard.append(initialsInput);
    quizCard.append(saveScoreButton);
    saveScoreButton.textContent = 'Save Score!';
    saveScoreButton.disabled = false;
}

// Countdown function
function startCountdown() {
    countdownCount = 100;
    timerBarPosition = 0;
    countdownElement.textContent = countdownCount;
    timerBarElement.style.width = '100%';
    timerBarElement.style.marginLeft = '0%';
    timerBarElement.style.backgroundColor = '#2cb978';


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
  

//////// EVENT LISTENERS ////////

//Clicking the Start Button will initiate the quiz
startButton.addEventListener('click', startQuiz);
retakeQuizButton.addEventListener('click', function () {
    startQuiz();
});

saveScoreButton.addEventListener('click', saveScore);

viewHighScoresButton.addEventListener('click', function (evt) {
    evt.preventDefault;
    highScoresElement.style.display = 'block';
    blackFilter.style.display = 'block';
    mainElement.setAttribute('class', 'blur');
});

closeButton.addEventListener('click', function () {
    highScoresElement.style.display = 'none';
    blackFilter.style.display = 'none';
    mainElement.removeAttribute('class', 'blur');
});

clearScoresButton.addEventListener('click', function () {
    // evt.preventDefault;
    console.log('Cleared highscores');
    localStorage.clear();
    hiScoresArr = [];
    renderHighScores();
});

// Call Init function - defined abover 
init ();





//////// ADDITIONAL QUESTIONS LIST ////////

/* What is the operator used to add a new value to the previous one, and store it in the same variable? 
    ANSWER: =+  
*/

//////// ENHANCEMENTS ////////

/* If the user answers 5 questions correctly in a row, they get a time bonus?
    Animations for right and wrong? 
    Provide options for what kind of quiz?
    Pipe in quiz data from elsewhere?
*/ 

