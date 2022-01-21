// VARIABLES
const quizCard = document.querySelector('#dynamic-quiz-card');
const startButton = document.querySelector('#start-quiz-button');
const timerBarElement = document.querySelector('#timer-bar');
const countdownElement = document.querySelector('#countdown');
const endMessage = document.createElement('p');
let countdown;
let countdownCount = 60;


// DEFAULT UI STATES
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
      // startCountdown(); 
}

function endQuiz() {
    endMessage.textContent = "Congratulations! You finsihed the game before time ran out. Enter your initials and click save to save your score!"
    quizCard.append(endMessage);
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
            alert('try again!');
        }
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