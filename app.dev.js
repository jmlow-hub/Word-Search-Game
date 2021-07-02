"use strict";

//get html elements
var newGridBtn = document.querySelector(".game__intro__new-grid-btn");
var clearButton = document.querySelector(".game__end__clear-btn");
var wordsToFind = document.querySelector("ul");
var gridContainer = document.querySelector(".game__main__grid");
var submitBtn = document.querySelector(".game__end__submit-btn"); //arrays
//array to hold basic word list

var wordList = [];
var letterFillArr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]; // const randomNumberArr = [];
// const generateRandomNumberArr = () => {
//   for (let i = 0; i < 100; i++) {
//     randomNumberArr.push(i);
//   }
// }
// generateRandomNumberArr()
//array of 6 random numbers to choose words & grid slots

var indexGenerator = function indexGenerator(repeater) {
  var indices = [];

  while (indices.length < 5) {
    var index = Math.floor(Math.random() * repeater);

    if (indices.indexOf(index) === -1) {
      indices.push(index);
    }

    return indices;
  }
}; //create list of words to find in relevant container


var createWordList = function createWordList() {
  for (var i = 0; i < 6; i++) {
    var newListItem = document.createElement("li");
    var listItemContent = wordList[i];
    newListItem.innerHTML = listItemContent;
    wordsToFind.appendChild(newListItem);
  }
}; //create 10 x 10 grid in relevant container - with class and id


var createGrid = function createGrid() {
  for (var i = 0; i < 100; i++) {
    var gridSquares = document.createElement("div");
    gridSquares.setAttribute("id", i);
    gridSquares.classList.add("game__main__grid__grid-square");
    gridContainer.appendChild(gridSquares);
  }
}; //randomly select whether to place words horizontally or vertically


var wordPlacement = function wordPlacement(arr) {
  for (var i = 0; i < arr.length; i++) {
    var squareIndex = Math.floor(Math.random() * 50);
    var lettersArr = arr[i];

    for (var j = 0; j < lettersArr.length; j++) {
      var letter = lettersArr[j];

      if (squareIndex % 2 === 0) {
        var square = document.getElementById(squareIndex + j);
        square.innerHTML += letter;
      } else if (squareIndex % 2 != 0 && squareIndex <= 50) {
        var _square = document.getElementById(squareIndex + j * 10);

        _square.innerHTML += letter;
      }
    }
  }
}; //fill empty spaces:


var fillSpace = function fillSpace() {
  var gridSpaceArr = document.getElementsByClassName("game__main__grid__grid-square");

  for (var i = 0; i < gridSpaceArr.length; i++) {
    var letterIndex = Math.floor(Math.random() * 25);

    if (gridSpaceArr[i].innerHTML === "") {
      gridSpaceArr[i].innerHTML = letterFillArr[letterIndex];
    }
  }
}; //fetch list of words from API on button click


var handleNewGrid = newGridBtn.addEventListener("click", function (e) {
  e.preventDefault();
  fetch("https://api.datamuse.com/words?ml=software+development").then(function (res) {
    return res.json();
  }).then(function (data) {
    var i = 0;

    do {
      var index = Math.floor(Math.random() * 99);
      if (data[index].word.length > 2 && data[index].word.length < 7) wordList.push(data[index].word);
    } while (wordList.length < 6);

    createWordList();
    createGrid();
    wordPlacement(wordList);
    fillSpace();
  })["catch"](function (err) {
    alert("You've rendered us speechless, we're all out of words..." + err);
  });
}); //clear list and grid

var handleClearGrid = clearButton.addEventListener("click", function (e) {
  e.preventDefault();
  wordsToFind.innerHTML = "";
  "";
  gridContainer.innerHTML = "";
});