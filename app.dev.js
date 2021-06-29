"use strict";

//get html elements
var newGridBtn = document.querySelector(".game__intro__new-grid-btn"); //array to hold basic word list

var wordList = []; //fetch list of words from API

var rawWordsArr = fetch("https://api.datamuse.com/words?ml=software+development").then(function (res) {
  return res.json();
}).then(function (data) {})["catch"](function (err) {
  alert("You've rendered us speechless, we're all out of words");
});