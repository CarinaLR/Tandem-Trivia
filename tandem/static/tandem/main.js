document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector("#start")
    .addEventListener("click", () => load_questions());
});

const load_questions = () => {
  //Fetch data from db to get all questions
  fetch("/questions")
    .then((response) => response.json())
    .then((response) => {
      get_questions(response);
    });
};

const get_questions = (response) => {
  let questions = response;
  let set = [];
  let quest_num = 10;

  var result = new Array(quest_num),
    len = questions.length,
    taken = new Array(len);
  if (quest_num > len)
    throw new RangeError("number of questions not available");
  while (quest_num--) {
    var x = Math.floor(Math.random() * len);
    result[quest_num] = questions[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  result.forEach((question) => {
    set.push(question.content);
  });
  load_options(set, questions);
};

const load_options = (set, questions) => {
  //Get all questions obj with corresponding id and content
  let all_questions = questions;

  //Variable to hold questions
  let questions_arr = set;

  //Variable to hold options
  var options_arr;

  //Fetch options data from db and pass all data to start game
  fetch("/options")
    .then((response) => response.json())
    .then((data) => (options_arr = data))
    .then(() => startGame(all_questions, questions_arr, options_arr));
};

//Block to start game with all data to manipulate
const startGame = (all_questions, questions_arr, options_arr) => {
  let questions = all_questions;
  let qSet = questions_arr;
  let options = options_arr;

  // console.log("questions ", questions);
  // console.log("qSet ", qSet);
  // console.log("options ", options);

  let qA = 0;
  let score = 0;
  let selected = 0;
  let move_ = 0;
  let questionOpts = [];
  let breakLoop = qSet.length;
  console.log("breakLoop ", breakLoop);

  while (breakLoop > 0) {
    breakLoop -= 1;

    let question = questions[qA];
    document.querySelector("#display_Q").innerHTML = `${question.content}`;
    console.log("question ", question);

    for (let j = 0; j < options.length; j++) {
      let option = options[j];

      if (question.id.toString() === option.questionId) {
        questionOpts.push(option);
      }
    }
    console.log("Qoptions", questionOpts);
    let value = 1;
    questionOpts.forEach((option) => {
      const showOpt = document.createElement("option");
      showOpt.value = `${value}`;
      showOpt.innerHTML = `${option.content}`;
      value += 1;
      document.querySelector("#rowR").appendChild(showOpt);
    });

    let optVal = document.querySelector("#rowR");
    selected = optVal.value;
    console.log("selected1 ", selected);

    const next = document
      .querySelector("#next")
      .addEventListener("click", () => {
        move_ += 1;
      });

    if (next) {
      continue;
    }
    // if (move_ === 0) {
    //   break;
    // }
    optSelected = selected;
    let answer = questionOpts[optSelected - 1];
    if (answer !== undefined && answer.correct === true) {
      score += 10;
      selected = 0;
    }
    answer = {};

    // console.log("selected2 ", selected);
    console.log("score: ", score);
    document
      .querySelector("#next")
      .addEventListener("click", () => (question = questions[qA++]));
    question = questions[qA++];
    questionOpts = [];
    options.splice(0, questionOpts.length);
  }
  document.querySelector("#score").innerHTML = `Score: ${score}`;
  // return score;
};
