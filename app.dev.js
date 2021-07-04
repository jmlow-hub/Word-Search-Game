"use strict";

//get html elements
var newGridBtn = document.querySelector(".game__intro__new-grid-btn");
var clearButton = document.querySelector(".game__end__clear-btn");
var wordsToFind = document.querySelector("ul");
var gridContainer = document.querySelector(".game__main__grid"); //arrays
//array to hold basic word list

var wordList = []; //array to use as filler for empty squarse

var letterFillArr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]; //empty array to hold selected word

var selectedWordArr = []; // const randomNumberArr = [];
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
    newListItem.classList.add("game__main__list__item");
    newListItem.innerHTML = listItemContent;
    wordsToFind.appendChild(newListItem);
  }
}; //create 10 x 10 grid in relevant container - with class and id


var createGrid = function createGrid() {
  for (var i = 0; i < 150; i++) {
    var gridSquares = document.createElement("div");
    gridSquares.setAttribute("id", i);
    gridSquares.classList.add("game__main__grid__grid-square"); //gridSquares.innerHTML = "M";

    gridContainer.appendChild(gridSquares);
  }
}; //randomly select whether to place words horizontally or vertically


var wordPlacement = function wordPlacement(arr) {
  for (var i = 0; i < arr.length; i++) {
    var squareIndex = Math.floor(Math.random() * 144);
    var lettersArr = arr[i];

    for (var j = 0; j < lettersArr.length; j++) {
      var letter = lettersArr[j];

      if (squareIndex % 2 === 0) {
        var square = document.getElementById(squareIndex + j);
        square.innerHTML += letter;
      } else if (squareIndex % 2 != 0 && squareIndex <= 50) {
        var _square = document.getElementById(squareIndex + j * 12);

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
  fetch("https://restcountries.eu/rest/v2/all").then(function (res) {
    return res.json();
  }).then(function (data) {
    var i = 0;

    do {
      var index = Math.floor(Math.random() * 249);

      if (data[index].name.length > 2 && data[index].name.length < 7) {
        data[index].name.toLowerCase();
        wordList.push(data[index].name);
      }
    } while (wordList.length < 6);

    createWordList();
    createGrid();
    wordPlacement(wordList);
    fillSpace();
  })["catch"](function (err) {
    alert("We're all out of words... " + err);
  });
}); //select the word
//click on div/letter

var handleSquare = gridContainer.addEventListener("click", function (e) {
  e.preventDefault();
  var content = e.target.innerHTML; //value is pushed to array

  if (e.target && e.target.classList == "game__main__grid__grid-square") {
    e.target.style.background = "linear-gradient(90deg, hsla(183, 62%, 45%, 1) 0%, hsla(41, 96%, 58%, 1) 100%)";
    selectedWordArr.push(content);
    console.log(selectedWordArr);
  }
});
var handleCompare = wordsToFind.addEventListener("click", function (e) {
  e.preventDefault(); //compare selectedword array with wordList 

  var selectedWord = selectedWordArr.join("");

  if (wordList.includes(selectedWord)) {
    e.target.style.color = "grey";
  } else {
    alert("Sorry, that's not correct. Try again");
  } //clear array for next selection


  selectedWordArr.length = 0;
}); //clear list and grid

var handleClearGrid = clearButton.addEventListener("click", function (e) {
  e.preventDefault();
  wordsToFind.innerHTML = "";
  "";
  gridContainer.innerHTML = "";
});