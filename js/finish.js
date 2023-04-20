const final_index = document.querySelector(".final-index");
const final_score = document.querySelector(".final-score");
const score_comment = document.querySelector(".score-comment");
const restart_quiz = document.querySelector(".restart-quiz");

const count = localStorage.getItem("count");
const score = localStorage.getItem("score");
const quiz_length = quiz.length;

restart_quiz.style.cursor = "pointer";

function displayFinish(){
    final_index.innerHTML = `${count}\\${quiz_length}`;
    final_score.innerHTML = `You scored ${score}\\${quiz_length}`;

    if (score < 5){
        score_comment.innerHTML = "You can do better, please try again.";
    }else if (score == quiz_length){
        score_comment.innerHTML = "You don sabi this thing die.";
    }else{
        score_comment.innerHTML = "You did really well, wanna go again?";
    }

    // localStorage.setItem("count", 0);
    
}

restart_quiz.addEventListener("click", function(){
    localStorage.setItem("score", 0);
    window.location.href = "C:\\Users\\Hp\ Pc\\Downloads\\CBT Practice\\quiz_page.html";
});



displayFinish();