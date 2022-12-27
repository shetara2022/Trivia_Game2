const question = document.getElementById("question");
// Convert choices to an array
const choices = Array.from(document.getElementsByClassName("answer"));
console.log(choices)
let currentQuestion = {};
// to create a delay after answering:
let acceptingAnswers = false
let score = 0;
let questionCounter = 0;
let availableQuestions = [];


let questions = [];
// fetch questions from api (opentdb.com)
fetch("https://opentdb.com/api.php?amount=15&category=9&difficulty=easy&type=multiple")
    .then(res => {
        return res.json();
    })
    .then(loadedQuestions => {
        console.log(loadedQuestions.results);

        // map questions to convert questions...
        questions = loadedQuestions.results.map(loadedQuestion => {
            const formattedQuestion = {
                question: loadedQuestion.question
            };

            const answerChoices = [...loadedQuestion.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
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
const CORRECT_BONUS = 5;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion()
};
// get random question
getNewQuestion = () => {
    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question

    // display answer choices
    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })

    // splice the question used
    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
}