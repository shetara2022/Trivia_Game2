//userName input
const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore')     //get finalscore id from html
const mostRecentScore = localStorage.getItem('mostRecentScore')   //get recent score from local storage

//LOCAL STORAGE-things in local storage are stored as a JSON string 
//parse to get an array object out of local storage
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];   //initializes empty highscore array
console.log(highScores)

finalScore.innerText = mostRecentScore    //updates final score with the most recent score

//add eventlistener using 'keyup'-gives change on every character
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;   //disable btn if username not entered
});

saveHighScore = (e) => {
    // console.log("clicked save");
    e.preventDefault();

    //Score object 
    const score = {
        score: mostRecentScore,
        name: username.value
    };
    //push score to array
    highScores.push(score)
    console.log(highScores);
};

