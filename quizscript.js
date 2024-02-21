const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizbox = document.querySelector('#quiz-box');
const resultbox = document.querySelector('.result-box');
const optionlist = document.querySelector('.option-list');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');

startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
}

exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}
let questionCount = 0;
let questionNumb = 1;
let userScore=0;


continueBtn.onclick = () => {
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizbox.classList.add('active');

    showQuestions(0);
    questionCounter(1);
    headerScore();
}


// continueBtn.onclick = () => {
//     quizbox.classList.add('active');
//     quizSection.classList.add('active');
//     popupInfo.classList.remove('active');
//     main.classList.remove('active');
    

//     questionCount = 0;
// questionNumb = 1;
// userScore=0;
// showQuestions(questionCount);
// questionCounter(questionNumb);

// headerScore();
// }

// continueBtn.onclick = () => {
//     // Remove the 'active' class from quizbox
//     // quizbox.classList.add('active');  // Comment or remove this line
    
//     quizSection.classList.add('active');
//     popupInfo.classList.remove('active');
//     main.classList.remove('active');
//     quizbox.className.remove('active');

//     questionCount = 0;
//     questionNumb = 1;
//     userScore = 0;

//     showQuestions(questionCount);
//     questionCounter(questionNumb);
//     headerScore();
//     nextBtn.classList.remove('active'); // Ensure this line is here
// };



// continueBtn.onclick = () => {
//     quizSection.className.add('active');
//     popupInfo.classList.remove('active');
//     quizbox.classList.add('active');
//     nextBtn.classList.remove('active');
//     resultbox.classList.remove('active');
//     main.classList.remove('active');

//     questionCount = 0;
// questionNumb = 1;
// userScore=0;
// showQuestions(questionCount);
// questionCounter(questionNumb);

// headerScore();
// }


const nextBtn = document.querySelector('.next-btn');

nextBtn.onclick = () => {
    if (questionCount < questions.length - 1) {
        questionCount++;
        showQuestions(questionCount);

        questionNumb++;
        questionCounter(questionNumb);

        nextBtn.classList.remove('active');
    }
    else {
        quizbox.classList.remove('active');
        showResultBox();
    }
}

tryAgainBtn.onclick = () => {
    quizbox.classList.add('active');
    nextBtn.classList.remove('active');
    resultbox.classList.remove('active');

    questionCount = 0;
questionNumb = 1;
userScore=0;
showQuestions(questionCount);
questionCounter(questionNumb);

headerScore();
}

goHomeBtn.onclick = () => {
    quizSection.classList.remove('active');
    nextBtn.classList.remove('active');
    resultbox.classList.remove('active');

    questionCount = 0;
questionNumb = 1;
userScore=0;
showQuestions(questionCount);
questionCounter(questionNumb);

headerScore();
}




//getting questions and answers from array
function showQuestions(index) {
    const questionText = document.querySelector('.question-text');
    // questionText.textContent=`${questions[index].numb}.${questions[index].question}`;
    questionText.innerHTML = `${questions[index].numb}.${questions[index].question}`;
    let optiontag = `<div class="option"><span>${questions[index].options[0]}</span></div>
                     <div class="option"><span>${questions[index].options[1]}</span></div>
                     <div class="option"><span>${questions[index].options[2]}</span></div>
                     <div class="option"><span>${questions[index].options[3]}</span></div>`;
    optionlist.innerHTML = optiontag;

    const option=document.querySelectorAll('.option');
    for(let i=0;i<option.length;i++){
        option[i].setAttribute('onclick','optionSelected(this)');
    }
}

function optionSelected(answer){
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOptions = optionlist.children.length;
    
    if(userAnswer==correctAnswer){
        answer.classList.add('correct');
        userScore +=1;
        headerScore();
    }
    else{
        answer.classList.add('incorrect');

        //if incorrect option selected, autoselect correct answer
        for(let i=0;i<allOptions;i++){
            if(optionlist.children[i].textContent == correctAnswer){
                optionlist.children[i].setAttribute('class','option correct');
            }
        }
    }

    //if user has selected. disable all options
    for(let i=0;i<allOptions;i++){
        optionlist.children[i].classList.add('disabled');
    }

    nextBtn.classList.add('.active');
}

function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${questions.length} Questions`;
}

function headerScore(){
    const headerScoreText =document.querySelector('.header-score');
    headerScoreText.textContent=`Score: ${userScore} / ${questions.length}`;
}

function showResultBox(){
    quizbox.classList.remove('active');
    resultbox.classList.add('active');

    const scoreText=document.querySelector('.score-text');
    scoreText.textContent=`Your Score ${userScore} out of ${questions.length}`;

    const ProgressValue =document.querySelector('.progress-value');
    const circularProgress=document.querySelector('.circular-progress');
    let progressStartValue=-1;
    let progressEndValue = (userScore/questions.length)*100;
    let speed =20;

    let progress=setInterval(()=>{
        progressStartValue++;
        ProgressValue.textContent=`${progressStartValue}%`;
        circularProgress.style.background=`conic-gradient(rgb(110, 245, 69)  ${progressStartValue*3.6}deg, rgba(255,255,255,.1)0deg)`;
        if(progressStartValue==progressEndValue){
            clearInterval(progress);
        }
    },speed);


}