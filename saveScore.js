//userName input
const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore')     //get finalscore id from html
const mostRecentScore = localStorage.getItem('mostRecentScore')   //get recent score from local storage

finalScore.innerText = mostRecentScore    //updates final score with the most recent score

//add eventlistener using 'keyup'-gives change on every character
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;   //disable btn if username not entered
});

saveHighScore = (e) => {
    // console.log("clicked save");
    e.preventDefault();
};
