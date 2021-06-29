"use strict";

//get html elements
var newGridBtn = document.querySelector(".game__intro__new-grid-btn"); //array to hold basic word list

var wordList = []; //fetch list of words from API

var rawWordsArr = fetch("https://api.datamuse.com/words?ml=software+development").then(function (res) {
  return res.json();
}).then(function (data) {
  //pull 10 words between 3 and 6 words in length from list at random and pushes to wordList array
  for (var i = 0; i < 30; i++) {
    var index = Math.floor(Math.random() * 100);
    if (data[index].word.length > 2 && data[index].word.length < 7) wordList.push(data[index].word);
    console.log(wordList);
  } //how to ensure get minimum amount of words - increase i?

})["catch"](function (err) {
  alert("You've rendered us speechless, we're all out of words");
});