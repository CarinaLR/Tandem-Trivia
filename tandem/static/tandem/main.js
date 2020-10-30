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

  questions.forEach((question) => {
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
  let questionsCount = questions_arr;
  let options = options_arr;
  let questionOpts = [];

  console.log("questions ", questions);
  console.log("questionsCount ", questionsCount);
  console.log("options ", options);
};
