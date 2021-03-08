// receiving our html elements
var timerEl = document.getElementById("timer-count");
var startButton = document.getElementById("start-button");
var content = document.getElementById("content")

// initialize the timer code and question counter variable
var timeLeft = 60;
var questionCounter = 0;
var timerInterval;

// our timer functionality
function setTime() {
    
    timerInterval = setInterval(function() {        
        // will decrement as long as timeLeft is greater than 0
        if (timeLeft > 0) {
            timeLeft--;
            timerEl.textContent = timeLeft;
            console.log(timeLeft)
        } 
    }, 1000);
}

// clicking start will begin our game
if (startButton) {
    startButton.addEventListener("click", startQuiz);
}

function startQuiz() {
    setTime();
    content.innerHTML = "";
    generateQuestions(questionSet[questionCounter]);
}

// where we store our question/answer variables
var questionSet = [
    {
        question: "What API can be used to quickly draft a website format?",
        choice: {
            a: "Shoelace", b: "Bootspam",  c: "Kickflip", d: "Bootstrap",
        },
        cAnswer: "d"
    },

    {
        question: "Which is the correct usage of a loop?",
        choice: {
            a: "if i = 5", b: "while (i > 0)", c: "for int i = 0; i < 3; i++", d: "switch case 1:",
        },
        cAnswer: "b"
    },

    {
        question: "Which API allows you to quickly cycle through an HTML file?",
        choice: {
            a: "jQuery", b: "iTheory", c: "tFoolery", d: "kWeary",
        },
        cAnswer: "a"
    },

    {
        question: "What enables us to give button functionality?",
        choice: {
            a: "Party Listeners", b: "Bootstrap", c: "jQuery", d: "Event Listeners",
        },
        cAnswer: "d"
    },

    {
        question: "What is the name of the instructor that is teaching us about web development?",
        choice: {
            a: "Caleb Crum", b: "Zachary Richards", c: "Slackery Prichards", d: "Not sure (Not a good answer >.>)",
        },
        cAnswer: "a"
    },
]

// function to generate HTML for the questions
function generateQuestions(questionObject) {

    var question = document.createElement("h1");
    question.setAttribute("class", "question");
    question.textContent = questionObject.question;
    content.appendChild(question);

    choice = Object.entries(questionObject.choice);

    for (var i=0; i < choice.length; i++) {
        var answer = choice[i];
        var button = document.createElement("button");
        button.textContent = answer[0] + ". " + answer[1];
        button.setAttribute("value", answer[0]);
        button.setAttribute("id", "answer-btn");
        button.setAttribute("class", "btn btn-md btn-secondary")
        button.addEventListener("click", function (event) {
            selectChoice(event, questionObject.cAnswer)
        });
        content.appendChild(button);
    };
}

// selection of answer
function selectChoice(event, cAnswer) {

    var chosenAnswer = event.target.value;

    if (chosenAnswer === cAnswer) {
        isCorrect = true;
        questionCounter++;
        content.innerHTML = "";

        if (questionCounter <= choice.length) {
            generateQuestions(questionSet[questionCounter]);
            feedbackText();
        } else {
            stopQuiz();
        }
        } else {
        if (timeLeft >= 15) {
            timeLeft -= 15;
        } else if (timeLeft < 15 || timeLeft > 0) {
            timeLeft = 0;
        } else {
            timeLeft = 0;
        }
        
        questionCounter++;
        
        isCorrect = false;
        content.innerHTML = "";
        if (questionCounter <= choice.length) {
            generateQuestions(questionSet[questionCounter]);
            feedbackText();
        } else {
            stopQuiz();
        }
    }
}

// appends the HTML to reflect our answer choice and flashes whether we were right or wrong
function feedbackText() {
    var correct = document.createElement("p");

    if (isCorrect) {
        correct.setAttribute("class", "feedback-text");
        correct.textContent = "Good job!";
        content.appendChild(correct);
    } else {
        correct.setAttribute("class", "feedback-text");
        correct.textContent = "Wrong answer. Prepare to be phasered.";
        content.appendChild(correct);
    } 
    
    setTimeout( function () {
        correct.setAttribute("class", "feedback-text hide");
    }, 1000);
}

function initialEnter() {
    // creates the form that holds our initials variable
    var initialsForm = document.createElement("form");
    initialsForm.setAttribute("class", "initials-form");

    // initialize our text box for the initials
    var enterText = document.createElement("label");
    enterText.textContent = "Enter Initials: "
    initialsForm.appendChild(enterText);

    // creates input for our initials
    nameInput = document.createElement("input");
    nameInput.setAttribute("id", "name-input");
    nameInput.textContent = "Enter Initials: ";
    initialsForm.appendChild(nameInput);

    // creates the button for submit 
    var nameSubmitBtn = document.createElement("button");
    nameSubmitBtn.textContent = "Submit";
    nameSubmitBtn.setAttribute("id", "initials-submit");
    nameSubmitBtn.setAttribute("class", "btn btn-sm btn-primary")
    initialsForm.appendChild(nameSubmitBtn);
    content.appendChild(initialsForm);

    var inputInitialsEl = document.querySelector(".initials-form");
}

// will stop the quiz and display game over text/our score
function stopQuiz() {
    clearInterval(timerInterval);
    score = timeLeft;
    //timerEl.textContent = "0";
    content.innerHTML = "";

    var timerEl = document.querySelector(".timer");
    timerEl.textContent = "";

    var gameOverText = document.createElement("h1");
    gameOverText.textContent = "GAME OVER";
    content.appendChild(gameOverText);

    var yourScoreText = document.createElement("p");
    yourScoreText.textContent = "Final Score: " + score;    
    content.appendChild(yourScoreText);

    initialEnter();
}