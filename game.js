const question = document.getElementById("question");
// Convert choices to an array
const choices = Array.from(document.getElementsByClassName("answer"));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');

let currentQuestion = {};
// to create a delay after answering:
let acceptingAnswers = false
let score = 0;
let questionCounter = 0
let availableQuestions = [];


let questions = [];
// fetch questions from api (opentdb.com)
fetch("https://opentdb.com/api.php?amount=15&category=9&difficulty=easy&type=multiple")
    .then(res => {

        return res.json();
    })
    .then(loadedQuestions => {
        // console.log(loadedQuestions.results);


        // map questions to convert questions...
        questions = loadedQuestions.results.map(loadedQuestion => {
            const formattedQuestion = {
                question: loadedQuestion.question
            };

            const answerChoices = [...loadedQuestion.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;   //randomize answer choices
            answerChoices.splice(formattedQuestion.answer - 1, 0,
                loadedQuestion.correct_answer);

            // iterate through answer choices
            answerChoices.forEach((choice, index) => {
                formattedQuestion["choice" + (index + 1)] = choice;
            })
            return formattedQuestion
        });
        startGame()
    })

// How much each correct bonus is worth
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion()
};
// get random question
getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        end()
    }
    //update question counter
    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);   //Code accessed from Stack Overflow(https://stackoverflow.com/questions/43267033/understanding-the-use-of-math-floor-when-randomly-accessing-an-array)
    currentQuestion = availableQuestions[questionIndex];    //keeps track of which question we are on
    question.innerText = currentQuestion.question      //innerText renders only the text content of an element - (https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/innerText)

    // display answer choices
    //select the number from the dataset property for the corresponding question to show answer options
    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })

    // splice the question used
    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

//to click on a response and mark it correct or incorrect 
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

//Increment score 
incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

//when trivia has ended 
function end() {
    let triviaEndHTML =
        `
      <h1>CONGRATULATIONS, You have completed this trivia!</h1>
      <h2 id = "score"> YOU SCORED: ${score} points</h2>
      <div class = "restart">
      <a class="btn" href ="index.html">PLAY AGAIN</a>
      <a class="btn" href ="saveScore.html">SAVE</a>
      </div>
      `;
    let triviaElement = document.getElementById('game');
    triviaElement.innerHTML = triviaEndHTML;

    //save score in local storage
    localStorage.setItem('mostRecentScore', score);
}