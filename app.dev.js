"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

//get html elements
var newGridBtn = document.querySelector(".game__intro__new-grid-btn");
var clearButton = document.querySelector(".game__end__clear-btn");
var wordsToFind = document.querySelector("ul");
var gridContainer = document.querySelector(".game__main__grid"); //arrays
//array to hold basic word list

var wordList = []; //array to use as filler for empty squarse

var letterFillArr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]; //array of grid locations

var gridLocationArr = [0, 8, 17, 25, 29, 34, 37, 61, 73, 78, 101, 105, 110, 122, 129, 138, 149, 166, 196, 214]; //const gridLocations = [];
//empty array to hold selected word

var selectedWordArr = []; //function to grid location

var gridSelector = function gridSelector() {
  var index = Math.floor(Math.random() * gridLocationArr.length);
  var randomNumber = gridLocationArr[index];
  gridLocationArr.splice(index, 1);
  return randomNumber;
}; //function to generate random number


var numberGenerator = function numberGenerator() {
  var range = function range(min, max) {
    return _toConsumableArray(Array(max - min + 1).keys()).map(function (i) {
      return i + min;
    });
  }; //creates an array


  var numberPickerArr = range(0, 249);
  var index = Math.floor(Math.random() * numberPickerArr.length);
  var randomNumber = numberPickerArr[index];
  numberPickerArr.splice(index, 1);
  return randomNumber;
}; //create list of words to find in relevant container


var createWordList = function createWordList() {
  for (var i = 0; i < 4; i++) {
    var newListItem = document.createElement("li");
    var listItemContent = wordList[i];
    newListItem.classList.add("game__main__list__item");
    newListItem.innerHTML = listItemContent;
    wordsToFind.appendChild(newListItem);
  }
}; //create 10 x 10 grid in relevant container - with class and id


var createGrid = function createGrid() {
  for (var i = 0; i < 225; i++) {
    var gridSquares = document.createElement("div");
    gridSquares.setAttribute("id", i);
    gridSquares.classList.add("game__main__grid__grid-square"); //gridSquares.innerHTML = "M";

    gridContainer.appendChild(gridSquares);
  }
}; //randomly select whether to place words horizontally or vertically


var wordPlacement = function wordPlacement(arr) {
  for (var i = 0; i < arr.length; i++) {
    var squareIndex = gridSelector();
    gridLocationArr.splice(squareIndex, 1); //workaround!!!!!!

    console.log(squareIndex);
    console.log(gridLocationArr.length);
    var lettersArr = arr[i];

    for (var j = 0; j < lettersArr.length; j++) {
      var letter = lettersArr[j];

      if (squareIndex % 2 === 0) {
        var square = document.getElementById(squareIndex + j);
        square.innerHTML += letter;
      } else if (squareIndex % 2 != 0) {
        var _square = document.getElementById(squareIndex + j * 15);

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
    while (wordList.length < 4) {
      var i = numberGenerator();

      if (data[i].name.length > 2 && data[i].name.length < 7) {
        wordList.push(data[i].name);
      }
    }

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
  }
});
var handleCompare = wordsToFind.addEventListener("click", function (e) {
  e.preventDefault(); //compare selectedword array with wordList 

  var selectedWord = selectedWordArr.join("");

  if (wordList.includes(selectedWord)) {
    e.target.style.color = "grey";
    e.target.style.fontWeight = "lighter";
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
  wordList.length = 0;
});