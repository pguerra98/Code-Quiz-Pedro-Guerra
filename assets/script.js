var startquiz = document.querySelector("#startbttn");
var choiceA = document.querySelector("#choiceA");
var choiceB = document.querySelector("#choiceB");
var choiceC = document.querySelector("#choiceC");
var choiceD = document.querySelector("#choiceD");
var question = document.querySelector("#questions");
var gCard = document.querySelector("#card");
var timerdisp = document.querySelector(".timer");
var answer = document.querySelector("#answer");
var bottommessage = document.querySelector("#bottom-message");
var rCard = document.querySelector("#mc");
var insertF = document.querySelector("#insertF");
var start = document.querySelector(".start");
var clearscoresbutton = document.querySelector("#clearscoresbutton");
var returnbutton = document.querySelector("#returnbutton");
var leadbtn = document.querySelector("#leadbtn");
var sCard = document.querySelector("#totalscorecard");
var sBtn = document.querySelector("#totalscorebtn");
var initialsarea = document.querySelector("#initialsarea");
var submitbttn = document.querySelector("#submitbttn");
var remainingtime = questions.length * 18;
var y = 0;
var z = 0;
var score = 0;
var scorelist = [];
var timeinterval;

getscore();

/* The function below will be the running timer for the quiz */

function timer() {
    timeinterval = setInterval(function () {
        remainingtime--;
        timerdisp.textContent ="Timer: " + remainingtime;

        if (remainingtime === 0 || y >= questions.length) {
            clearInterval(timeinterval);
            quizisover();
        }
    },1000);
}

/* The function below will be the function to run when the quiz is finished */

function quizisover() {
    sBtn.innerHTML = score;
    sBtn.style.display = "inline-block";
    gCard.classList.add("hide");
    leadbtn.classList.add("hide");
    timerdisp.classList.add("hide");
    insertF.classList.add("hide");
    highscoresboard();
}

/* The function below will keep track of the top 10 highest scores */

function highscoresboard() {
    deletefromleaderboard();
    buildonleaderboard();
    scorelist.sort((a,b) => {
        return b.score - a.score;
    });

    tenhighestscores = scorelist.slice(0, 10);

    for (var i=0; i < tenhighestscores.length; i++) {
        var user = tenhighestscores[i].user;
        var score = tenhighestscores[i].score;
        var newDiv = document.createElement("div");
        highscoresboardDiv.appendChild(newDiv);
        var newlabel = document.createElement("label");
        newlabel.textContent = user + " - " + score;
        newDiv.appendChild(newlabel);
    }
}

/* The function below will delete user's initials from the 10 highest scores if their score has been beat */

function deletefromleaderboard() {
    var deletescores = document.getElementById("userinitials");
    if (deletescores !== null) {
        deletescores.remove();
    } else {
    }
}

/* The function below will add user's initials to the 10 highest scores if their score is higher than one already on the leaderboard */

function buildonleaderboard() {
    highscoresboardDiv = document.createElement("div");
    highscoresboardDiv.setAttribute("id", "userinitials");
    document.getElementById("highscoresboard").appendChild("highscoresboardDiv");
}

/* The function below will save the score of the user even after closing out of the page*/

function savescore() {
    localStorage.setItem("highScores", JSON.stringify(scorelist))
}

/* The function below will pull high scores from the saved storage*/

function getscore() {
    var putawayscore = JSON.parse(localStorage.getItem("highScore"));
    if (putawayscore !== null) {
        scorelist = putawayscore;
    }
}


/* The function below will pull in and display the questions from the separate javascript file*/

function getquestions() {
    if (y < questions.length) {
        question.textContent = questions[y].question;
        choiceA.textContent = questions[y].choices[0];
        choiceB.textContent = questions[y].choices[1];
        choiceC.textContent = questions[y].choices[2];
        choiceD.textContent = questions[y].choices[3];
    } else {
        quizisover();
    }
}

/* The function below will determine whether the chosen answer is correct or incorrect*/

function determineanswer(event) {
    if (y >= questions.length) {
        quizisover();
        clearInterval(timeinterval);
    } else {
        if (event === questions[y].answer) {
            bottommessage.textContent = "Correct!";
    } else {
        remainingtime -= 10;
        bottommessage.textContent = "Incorrect!";
    }
    score = remainingtime;
    y++;
    getquestions();
    }
}
/* Below will be the event listeners*/

startquiz.addEventListener("click", function (event) {
    timer();
    getquestions();
    start.classList.add("hide");
    gCard.classList.remove("hide");
    leadbtn.style.display = "none";
    sCard.classList.add("hide");
});

rCard.addEventListener("click", function (event) {
    var event = event.target;
    determineanswer(event.textContent.trim())
});

leadbtn.addEventListener("click", function(event) {
    sCard.classList.remove("hide");
    leadbtn.classList.remove("hide");
    start.classList.add("hide");
    highscoresboard();
}
);

clearscoresbutton.addEventListener("click", function(event) {
    scorelist = [];
    start.classList.add("hide");
    localStorage.setItem("highscore", JSON.stringify(scorelist));
    highscoresboard();
    savescore();
});

returnbutton.addEventListener("click", function(event) {
    location.reload();
});

submitbttn.addEventListener("click", function(event) {
    event.preventDefault();
    var userinitials = initialsarea.value.trim();
    var newscore = {
        user: userinitials,
        score: score,
    };
    scorelist.push(newscore);
    savescore();
    highscoresboard();
    insertF.classList.add("hide");
    sCard.classList.remove("hide");
});