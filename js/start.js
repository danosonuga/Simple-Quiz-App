const start_quiz = document.querySelector(".start-quiz-button");
start_quiz.style.cursor = "pointer";

start_quiz.addEventListener("click", function(){
    localStorage.setItem("score", 0);
    window.location.href = ".\\quiz_page.html";
});