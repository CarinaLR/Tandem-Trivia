document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector("#start")
    .addEventListener("click", () => load_questions());
});

const load_questions = () => {
  fetch("/questions")
    .then((response) => response.json())
    .then((response) => {
      // console.log("response ", response);
      get_questions(response);
      // load_options();
    });
};

const get_questions = (response) => {
  let questions = response;
  // console.log("qArr ", questions);
  let set = [];

  questions.forEach((question) => {
    set.push(question.content);
  });
  // console.log("set ", set);
  load_options(set, questions);
};

// const load_options = () => {
//   fetch("/options")
//     .then((response) => response.json())
//     .then((response) => {
//       console.log("response ", response);
//     });
// };

const load_options = (set, questions) => {
  let all_questions = questions;
  // console.log("all_questions ", all_questions);

  let questions_arr = set;
  // console.log("questions_arr ", questions_arr);

  let questionOpts = [];
  var options_arr;
  console.log("options_arr1 ", options_arr);
  fetch("/options")
    .then((response) => response.json())
    .then((data) => (options_arr = data))
    .then(() => console.log("options_arr ", options_arr));

  // console.log("options_arr ", options_arr);
};
