const highScoresList = document.getElementById('highScoresList');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];  //get high scores out of local storage [copied from saveScore.js]


//iterate through each score and add to list 
highScoresList.innerHTML =
    highScores.map(score => {     //taking in the score object & returning a string version of a list
        return `<li class ="high-score">${score.name} - ${score.score} </li>`
    })
        .join('');