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

var all_questionOpts = [];
var value = 1;

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
    //Everytime there's an iteration the breakloop will decrease to meet conditioner
    breakLoop -= 1;

    //get one question from the array of questions and the options for respective qst
    let question = questions[qA];
    // document.querySelector("#display_Q").innerHTML = `${question.content}`;
    console.log("question ", question);

    //Loop throught the options and separate the options that match the question id
    for (let j = 0; j < options.length; j++) {
      let option = options[j];

      if (question.id.toString() === option.questionId) {
        questionOpts.push(option);
      }
    }

    //Store question and options as one element in a outer array
    all_questionOpts.push([question, questionOpts]);
    console.log("INSIDELOOP ", all_questionOpts);

    console.log("Qoptions", questionOpts);

    selected = 4;
    console.log("selected1 ", selected);

    if (move_ === 1) {
      continue;
    }
    //Grab value from the option selected and replace it as index in the options array and grab that eleemnt as answer from user
    optSelected = selected;
    let answer = questionOpts[optSelected - 1];
    //If there is an answer and the answer is correct, add 10 points to the score and set selected variable to zero
    if (answer !== undefined && answer.correct === true) {
      score += 10;
      selected = 0;
    }
    //Answer object will go back to empty
    answer = {};

    // console.log("selected2 ", selected);
    console.log("score: ", score);

    //The loop will continue with the next question
    question = questions[qA++];
    //Options array will be empty to get next options for respective question
    questionOpts = [];
    //Options from first question will be deleted from array of optons
    options.splice(0, questionOpts.length);
  }
  //Score will be display showing the storage result
  document.querySelector("#score").innerHTML = `Score: ${score}`;
  get_collection(all_questionOpts);
  // return all_questionOpts;
};

/* Implementing pagination */

//Set global variables to store the data, and global variable to keep track of the elements to display on current page
var list = new Array();
var pageList = new Array();
//Set global variables to define current page, number of pages and number of elements displaying at once
var currentPage = 0;
var numberPerPage = 1;
var numberOfPages = 1;
var display_Score = 0;
var selectedOptVal = 0;
var tempArrOpt = [];

const get_collection = (all_questionOpts) => {
  //Get collection of data
  list = all_questionOpts;
  console.log("InLOOP ", list);

  //Will get the number of pages appropiate to be display
  numberOfPages = getNumberOfPages();
  console.log(numberOfPages);
};

const getNumberOfPages = () => {
  return Math.ceil(list.length / numberPerPage);
};

//It will get a value for next elemnt in the collection
const nextPage = () => {
  currentPage += 1;
  loadList();
};

//It will get a value for next elemnt in the collection
const lastPage = () => {
  currentPage = numberOfPages;
  loadList();
};

//It will get an array with the element that will be display
const loadList = () => {
  //Starting from current page
  var begin = (currentPage - 1) * numberPerPage;
  var end = begin + numberPerPage;

  pageList = list.slice(begin, end);
  drawList();
  check();
};

//It will display question'content in object and option's content in array of objs
const drawList = () => {
  value = 1;
  document.getElementById("display_list").innerHTML = "";

  for (let r = 0; r < pageList.length; r++) {
    document.getElementById("display_list").innerHTML +=
      pageList[r][0].content + "";

    pageList[r][1].forEach((option) => {
      const showOpt = document.createElement("option");
      showOpt.value = `${value}`;
      showOpt.innerHTML = `${option.content}` + "";
      value += 1;
      document.querySelector("#select_opt").appendChild(showOpt);

      tempArrOpt.push(option);
    });
  }
};

//Disable next button once question displaying is the last question, disable submit button when it is not the last question
const check = () => {
  document.getElementById("next").disabled =
    currentPage == numberOfPages ? true : false;
  document.getElementById("last").disabled =
    currentPage !== numberOfPages ? true : false;
};

//Onchange in select tag, will grab the value of each option selected
const selected_val = () => {
  let getVal = document.querySelector("#select_opt").value;
  alert(getVal);
  selectedOptVal = parseInt(getVal);

  checkAnswer(tempArrOpt, selectedOptVal);
};

const checkAnswer = (tempArrOpt, selectedOptVal) => {
  //Grab value from the option selected and replace it as index in the options array and grab that eleemnt as answer from user
  optSelected = selectedOptVal;
  let answer = tempArrOpt[optSelected - 1];
  console.log("answer-- ", answer);
  //If there is an answer and the answer is correct, add 10 points to the score and set selected variable to zero
  if (answer !== undefined && answer.correct === true) {
    display_Score += 10;
    console.log("display_Score ", display_Score);
  }
  //Temporary array gets empty for next option list
  empArrOpt = [];
  console.log("display_Score ", display_Score);
};
