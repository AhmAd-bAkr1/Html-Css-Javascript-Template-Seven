let count = document.querySelector(".count span");
let spans = document.querySelector(".bullets .spans");
let bullets = document.querySelector(".bullets");
let quizArea = document.querySelector(".quiz-area ");
let quizInfo = document.querySelector(".quiz-info ");
let ansewrsArea = document.querySelector(".ansewrs-area");
let submitButtn = document.querySelector("#submit-buttn");
let results = document.querySelector(".results");
let countdown = document.querySelector(".countdown");
let curentIndex = 0;
let rightAnswers = 0;
let CountDown;

function getQuestions() {
    let Request = new XMLHttpRequest();
    Request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let questions = JSON.parse(this.responseText);
            let questionsCount = questions.length;

            CreatBallets(questionsCount);

            AddData(questions[curentIndex], questionsCount);

            Timer(60, questionsCount);

            submitButtn.addEventListener("click", function () {
                let rightAnswer = questions[curentIndex].right_answer;

                cheackAnswer(rightAnswer, questionsCount);

                curentIndex++;

                console.log(curentIndex);

                quizArea.innerHTML = "";

                ansewrsArea.innerHTML = "";

                AddData(questions[curentIndex], questionsCount);

                HandelBallets();

                clearInterval(CountDown);

                Timer(60, questionsCount);

                theResults(questionsCount);
            });
        }
    };
    Request.open("GET", "quis.json", true);
    Request.send();
}
getQuestions();

function CreatBallets(num) {
    count.innerHTML = num;

    for (let i = 0; i < num; i++) {
        let spanCount = document.createElement("span");
        spans.appendChild(spanCount);

        if (i === 0) {
            spanCount.className = "on";
        }
    }
}

function AddData(obj, qCount) {
    if (curentIndex < qCount) {
        let Titel = document.createElement("h2");
        let TitelName = document.createTextNode(obj["title"]);
        Titel.append(TitelName);
        quizArea.appendChild(Titel);

        for (let i = 1; i < 4; i++) {
            let mainDiv = document.createElement("div");
            mainDiv.className = "answer";

            let mainInput = document.createElement("input");
            mainInput.type = "radio";
            mainInput.id = `answer-${i}`;
            mainInput.name = "answer";
            mainInput.dataset.answer = obj[`answer_${i}`];

            let mainLabl = document.createElement("label");
            mainLabl.htmlFor = `answer-${i}`;
            let laplText = document.createTextNode(mainInput.dataset.answer);
            mainLabl.appendChild(laplText);
            mainDiv.appendChild(mainInput);
            mainDiv.appendChild(mainLabl);
            ansewrsArea.appendChild(mainDiv);
        }
    }
}

function cheackAnswer(ra, qc) {
    let ansewrs = document.getElementsByName("answer");
    let theChoosenAnswer;
    for (let i = 0; i < 3; i++) {
        if (ansewrs[i].checked) {
            theChoosenAnswer = ansewrs[i].dataset.answer;
        }
    }
    console.log(`right : ${ra}`);
    console.log(`Choosen : ${theChoosenAnswer}`);
    if (ra === theChoosenAnswer) {
        rightAnswers++;
        console.log("good");
        console.log(rightAnswers);
    }
}

function HandelBallets() {
    let spanBullets = document.querySelectorAll(".bullets .spans span");
    let arrspanBullets = Array.from(spanBullets);
    arrspanBullets.forEach((span, index) => {
        if (curentIndex === index) {
            span.className = "on";
            console.log(span);
        }
    });
}

function theResults(count) {
    let Results = " ";
    if (curentIndex === count) {
        ansewrsArea.remove();
        quizArea.remove();
        submitButtn.remove();
        bullets.remove();
        if (rightAnswers > count / 2 && rightAnswers < count) {
            Results = `<span class ="good">Good</span> you did what you could your score is ${rightAnswers} from ${count}`;
        } else if (rightAnswers === count) {
            Results = `<span class ="perfect">Congratulations</span> you are Genius`;
        } else {
            Results = `<span class ="bad">Bad</span> you did what you could your score is ${rightAnswers} from ${count}`;
        }
    }
    results.innerHTML = Results;

    results.style.padding = "10px";
    results.style.backgroundColor = "white";
    results.style.marginTop = "10px";
}

function Timer(duration, count) {
    if (curentIndex < count) {
        let minuts, seconds;
        CountDown = setInterval(() => {
            minuts = parseInt(duration / 60);
            seconds = parseInt(duration % 60);
            minuts = minuts < 10 ? `0${minuts}` : minuts;
            seconds = seconds < 10 ? `0${seconds}` : seconds;
            countdown.innerHTML = `${minuts} : ${seconds}`;

            if (--duration < 0) {
                clearInterval(CountDown);
                console.log("fionished");
                submitButtn.click();
                duration = 5;
            }
        }, 1000);
    }
}
