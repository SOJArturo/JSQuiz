var quizQuestions = document.getElementById("quiz-questions");
var timer = document.getElementById("timer");
var btnStart = document.getElementById("btn-start");
var timecounter = document.getElementById("timecounter");
var titleitem = document.getElementById("title-item");
var nextQuestions = '';
var questionanswers = document.getElementById("question-answers");
var myScore = document.getElementById("score");
var btnScore = document.getElementById("btnScore");
var currentindex = 0;
var score = 0;
var count = 75;
var alert =document.getElementById("alert");
var info = document.getElementById("info");
var allScores = [];
var storedScores = JSON.parse(localStorage.getItem("userData"));
var questions = [
    {
        title: "Inside which HTML element do we put the Javascript?",
        choices: ["<script>","<javascript>","<js>", "<scripting>"],
        answer : "<script>"    
    },
    {
        title: "What is the correct Javascript syntax to change the content of the HTML element below?     <p id = 'demo'>This is a demostration</p>",
        choices: ["#demo.innerHTML = 'Hello World!'","document.getElementById('demo').innerHTML = 'Hello World!'","document.getElement('p').innerHTML = 'Hello World!'", "document.getElementByName('p').innerHTML = 'Hello World!'"],
        answer : "document.getElementById('demo').innerHTML = 'Hello World!'"    
    },
    {
        title: "Where is the correct place to insert a JavaScript?",
        choices: ["The <body> section","The <head> section","Both the <head> and <body> section are correct"],
        answer : "The <body> section"    
    },
    {
        title: "What is the correct syntax for referring to an external script called 'xxx.js'",
        choices: ["<script name = 'xxx.js'>","<script src = 'xxx.js'>","<script href = 'xxx.js'>"],
        answer : "<script src = 'xxx.js'>" 
    },
    {
        title: "The external JavaScript file must contain the <script> tag.",
        choices: ["True","False"],
        answer : "False"    
    },
]
btnStart.addEventListener("click", startQuiz);
function startQuiz(){
    if(storedScores !==null) {
        allScores = storedScores;
    }
    info.classList.add("d-none")
    btnStart.classList.add("d-none")
    timecounter.classList.remove("d-none")
    quizQuestions.classList.remove("d-none")
    nextQuestions= questions[currentindex]
    console.log(nextQuestions.title)
    
        displayQuestion(nextQuestions)

    gametime()
}
btnScore.addEventListener("click" , function(){
    let name = document.getElementById("inputScore").value
    scorePage(name, count)
});
// Time set

function gametime(){
    var timeinterval = setInterval(function(){
        timer.innerText = count
            if (count > 0){
             count--;
            }
            else{
                alert("Time's up!");
            }
            }, 1000);
}


function scorePage(a, b) {

    var userData = {
        inits: a,
        userScore: b
    };
    allScores.push(userData);

    localStorage.setItem("userData", JSON.stringify(allScores));
    location.href = "score.html";
}

function displayQuestion(question){
    titleitem.innerText=question.title
    question.choices.forEach(element => {
     var button =document.createElement("button")
    button.className="btn-primary btn-block text-left"
    button.innerText=element
    // questionanswers.innerHTML=""
    questionanswers.appendChild(button)
    button.addEventListener("click", displaynextQuestion)
    });
}


function displaynextQuestion(e){
    currentindex++
    if(currentindex < questions.length && count >= 0){
        correction(e.target.innerText == nextQuestions.answer)
        questionanswers.innerHTML=""
        if(currentindex < questions.length){    
            nextQuestions= questions[currentindex]
            displayQuestion(nextQuestions)  
        }else {
            currentindex = 0
            displayQuestion(nextQuestions)  
        }

    }else{
        console.log("endgame")
        endgame()
        

    }
    
     
}
function correction(response){
    
    if(response){
        alert.innerText= "Good"
        console.log("Good")
    }else {
        alert.innerText="Wrong"
        count = count -15
        timer.innerHTML = count
        console.log("Wrong")

    }
    setTimeout(function(){
        alert.innerText=""
    
        }, 1000);

}
 function endgame (){
    // btnStart.classList.add("d-none")
    myScore.innaText = count
    addscore.classList.remove("d-none")
    timecounter.classList.add("d-none")
    quizQuestions.classList.add("d-none")
    addscore.classList.remove("d-none")


 }
