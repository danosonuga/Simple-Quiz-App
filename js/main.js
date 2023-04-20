const quiz_container = document.querySelector(".quiz-page-desc");
const quiz_question = document.querySelector(".quiz-question");
const quiz_instruction = document.querySelector(".quiz-instruction");
const quiz_options = document.querySelector(".quiz-options");
const next_button = document.querySelector(".next-button");
const page_count = document.querySelector(".page-count");
const quiz_timer = document.querySelector(".quiz-timer");
next_button.style.cursor = "pointer";
const prev_button = document.querySelector(".prev-button");

let currentIndex = 0
let score = 0;

/**
 * @function: The function to display a quiz question
 * @param: currentIndex
 * @returns: none
 */
function get_quiz_info(currentIndex){
    quiz_options.innerHTML = "";
    
    const one_quiz = quiz[currentIndex];
    quiz_question.innerHTML = one_quiz.question;
    quiz_instruction.innerHTML = one_quiz.instruction;

    page_count.innerHTML = `${currentIndex+1}/${quiz.length}`;

    one_quiz.options.forEach(option => {
        const quiz_option = document.createElement("div");
        quiz_option.classList.add("d-flex");
        quiz_option.classList.add("card-like");

        const quiz_option_input = document.createElement("input");
        quiz_option_input.className = "not-radiod";
        quiz_option_input.type = "radio";
        quiz_option_input.name = "option";
        quiz_option_input.value = option;

        const quiz_option_text = document.createElement("p");
        quiz_option_text.innerHTML = option;

        quiz_option.appendChild(quiz_option_input);
        quiz_option.appendChild(quiz_option_text);
        quiz_option.addEventListener("click", function(){
            quiz_option_input.checked = true;
        });

        quiz_option.addEventListener("mouseover", function(){
            quiz_option.style.border = "1px solid #119822";
        });

        quiz_option.addEventListener("mouseout", function () {
            quiz_option.style.border = "1px solid #E9ECE8";
            quiz_option.style.cursor = "pointer";
        });
        quiz_options.appendChild(quiz_option);
    });
};

window.addEventListener("load", function() {
    get_quiz_info(currentIndex);
});

/**
 * The Button to increment the quiz questions
 */
next_button.addEventListener("click", function() {
    try {
        quiz_instruction.style.color = "#535058";
        var selectedOption = document.querySelector('input[name = "option"]:checked').value;

        if (selectedOption === quiz[currentIndex].answer){
            score++;
        }

        currentIndex++;
        if (currentIndex >= 0 && currentIndex < quiz.length){
            get_quiz_info(currentIndex);
            localStorage.setItem("score", score);
            localStorage.setItem("count", currentIndex+1);
        }

        if (currentIndex == quiz.length - 1){
            next_button.textContent = "Finish Quiz";
            next_button.addEventListener("click", function(){
                localStorage.setItem("score", score);
                localStorage.setItem("count", quiz.length);
                end_quiz();
            });
        }
    } catch (TypeError) {
        quiz_instruction.innerHTML = "You haven't selected any option";
        quiz_instruction.style.color = "red";
    }
});

/**
 * The Button to decrement the quiz questions
 */
prev_button.addEventListener("click", function(){
    if (currentIndex > 0){
        currentIndex--;
        score--;
        localStorage.setItem("score", score);
        get_quiz_info(currentIndex);
    }
});

/**
 * @function: A method to end the quiz
 * @param: no parameter
 * @returns: no returns
 */
function end_quiz(){
    localStorage.setItem("count", quiz.length);
    window.location.href = ".\\quiz_finish.html";
}


let time = 5;
let quizTimeInMinutes = time * 60 * 60;
let quizTime = quizTimeInMinutes / 60;

function get_countdown(){
    setInterval(function(){
        if(quizTime==0){
            end_quiz();
        }else{
            quizTime--;
            let minutes = Math.floor(quizTime / 60) % 60;
            let seconds = Math.floor(quizTime % 60);
            quiz_timer.innerHTML = `Time Left: ${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
        }
    }, 1000);
}

get_countdown();