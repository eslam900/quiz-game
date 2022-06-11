// get element
let question = document.querySelector(".question");
let answerArea = document.querySelector(".answer-area");
let progres = document.querySelector("meter");
let target = document.querySelector(".target");
let totalQu = document.querySelector(".totalQu");
let main = document.querySelector("main");
let playerName = document.querySelector(".player");
let form = document.querySelector("form");
let input = document.querySelector("input");
let btnStart = document.querySelector("button");
let model = document.querySelector(".model");
let counter = 0;
let count;
let success = 0;
// display model and creat player name
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value != "") {
    playerName.innerHTML = `player: ${input.value}`;
    model.style.display = "none";
  } else {
    alert("please enter your name");
  }
});
// get data from jason
const getData = () => {
  let req = new XMLHttpRequest();
  req.onreadystatechange = () => {
    if (req.readyState === 4 && req.status === 200) {
      let questionObj = JSON.parse(req.responseText);
      count = questionObj.length;
      creatQues(questionObj[counter]);
      checkAnswer(questionObj[counter]);
    }
  };
  req.open("GET", "./quiz data/data.json");
  req.send();
};
getData();
// creat questions
const creatQues = (data) => {
  question.innerHTML = ` ${data.question} ؟`;
  progres.setAttribute("max", count);
  progres.setAttribute("value", counter + 1);
  target.innerHTML = counter + 1;
  totalQu.innerHTML = `/ ${count}`;
  for (let i = 1; i <= 4; i++) {
    let answer = document.createElement("div");
    let span = document.createElement("span");
    let icon = document.createElement("i");
    answer.appendChild(span);
    answer.appendChild(icon);
    answerArea.appendChild(answer);
    icon.classList.add("fa-solid", "fa-angle-left");
    answer.classList.add(`answer-${i}`, "choice");
    span.innerHTML = data[`answer-${i}`];
  }
};
// handel check answer
const checkAnswer = (data) => {
  let answers = Array.from(document.querySelectorAll(".answer-area .choice"));
  answers.forEach((el, ind) => {
    el.addEventListener("click", (e) => {
      if (
        e.target.className === `answer-${ind + 1} choice` ||
        e.target.name === `span`
      ) {
        if (e.target.children[0].innerHTML === data.correctAnswer) {
          success++;
          let icon = e.target.children[1];
          icon.classList.add("fa-solid", "fa-check");
          el.style.backgroundColor = "green";
        } else {
          let icon = e.target.children[1];
          icon.classList.add("fa-solid", "fa-xmark");
          el.style.backgroundColor = "red";
        }
      } else {
        return;
      }
      setTimeout(() => {
        nextQues();
      }, 400);
    });
  });
};
// handel next question
const nextQues = () => {
  if (counter + 1 !== count) {
    counter++;
    question.innerHTML = "";
    answerArea.innerHTML = "";
    getData();
  } else if (success >= count / 2) {
    main.innerHTML = `<div class= "finish"><divi><span style="color:rgb(46,154,109)">perfect</span> you answer ${success} from ${count}</divi"><div class="emoji">&#128512</div><h1>Winner</h1></div>`;
  } else {
    main.innerHTML = `<div class= "finish"><div><span style="color:red">sory</span> you answer ${success} from ${count}</div><div class="emoji">&#128577</div><h1>ooops!</h1></div>`;
  }
};