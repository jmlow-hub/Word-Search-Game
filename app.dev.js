"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

//get html elements
var newGridBtn = document.querySelector(".game__intro__new-grid-btn");
var clearButton = document.querySelector(".game__end__clear-btn");
var wordsToFind = document.querySelector("ul");
var gridContainer = document.querySelector(".game__main__grid");
var listTitle = document.querySelector(".game__main__list-title");
var correctSound = new Audio("335908__littlerainyseasons__correct.mp3"); //arrays
//array to hold basic word list

var wordList = []; //array to use as filler for empty squarse

var letterFillArr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]; //empty array to hold selected word

var selectedWordArr = []; //empty array to hold ids of selected letters

var selectedIDArr = [];

var numberGenerator = function numberGenerator(min, max) {
  return _toConsumableArray(Array(max - min + 1).keys()).map(function (i) {
    return i + min;
  });
}; //creates an array
//create list of words to find in relevant container


var createWordList = function createWordList() {
  for (var i = 0; i < 6; i++) {
    var newListItem = document.createElement("li");
    var listItemContent = wordList[i];
    newListItem.classList.add("game__main__list__item");
    newListItem.innerHTML = listItemContent;
    wordsToFind.appendChild(newListItem);
  }

  listTitle.innerHTML += "Can you find:";
}; //create 10 x 10 grid in relevant container - with class and id


var createGrid = function createGrid() {
  for (var i = 0; i < 225; i++) {
    var gridSquares = document.createElement("div");
    gridSquares.setAttribute("id", i);
    gridSquares.classList.add("game__main__grid__grid-square");
    gridContainer.classList.add("game__main__grid-border");
    gridContainer.appendChild(gridSquares);
  }
}; //randomly select whether to place words horizontally or vertically


var wordPlacement = function wordPlacement(arr) {
  //array of specific grid locations
  var gridLocationArr = [0, 8, 17, 25, 29, 34, 57, 61, 73, 78, 101, 105, 110, 122, 129, 138, 149, 166, 196, 214];

  for (var i = 0; i < arr.length; i++) {
    var squareIndex = Math.floor(Math.random() * gridLocationArr.length); //selects an index between 0 and 15

    var lettersArr = arr[i]; //takes letters in each word in argument array and iterates over it to split into letters

    for (var j = 0; j < lettersArr.length; j++) {
      var letter = lettersArr[j]; //if grid location at square index is even place the letter horizontally                 

      if (gridLocationArr[squareIndex] % 2 === 0) {
        //
        var square = document.getElementById(gridLocationArr[squareIndex] + j);
        square.innerHTML += letter;
      } //if grid location is odd place letters vertically  
      else if (gridLocationArr[squareIndex] % 2 != 0) {
          var _square = document.getElementById(gridLocationArr[squareIndex] + j * 15);

          _square.innerHTML = letter;
        }
    }

    gridLocationArr.splice(squareIndex, 1); //takes square index out of array to avoid duplication
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
    var numberPickerArr = numberGenerator(0, 249); //calls function to generate array of numbers

    while (wordList.length < 6) {
      var i = Math.floor(Math.random() * numberPickerArr.length); //checks the length of the word at [i] meets condition  

      if (data[i].name.length > 2 && data[i].name.length < 7) {
        wordList.push(data[i].name.toLowerCase());
        numberPickerArr.splice(i, 1); //deletes [i] from array
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
  var content = e.target.innerHTML;
  var id = e.target.id; //value is pushed to array

  if (e.target && e.target.classList == "game__main__grid__grid-square") {
    e.target.style.color = "#52b788";
    selectedWordArr.push(content);
    selectedIDArr.push(id);
    console.log(selectedWordArr);
  }
});
var handleCompare = wordsToFind.addEventListener("click", function (e) {
  e.preventDefault(); //compare selectedword array with wordList 

  var selectedWord = selectedWordArr.join(""); //if word is a match, sets class which calls animation and changes styles of word and individual letters  

  if (wordList.includes(selectedWord)) {
    e.target.classList.add("right");
    e.target.style.textDecoration = "line-through";
    e.target.style.color = "green";
    selectedIDArr.forEach(function (id) {
      document.getElementById(id).style.opacity = "0.3";
      correctSound.play(); //clear array for next selection

      selectedWordArr.length = 0;
      selectedIDArr.length = 0;
    });
  } //if word is not a match, sets class which call animation and re-sets the styles
  else {
      e.target.classList.add("wrong");
      selectedIDArr.forEach(function (id) {
        document.getElementById(id).style.color = "#006d77";
        e.target.style.color = "black";
      }); //clear array for next selection

      selectedWordArr.length = 0;
      selectedIDArr.length = 0;
    }
}); //clear list and grid

var handleClearGrid = clearButton.addEventListener("click", function (e) {
  e.preventDefault();
  wordsToFind.innerHTML = "";
  "";
  gridContainer.innerHTML = "";
  listTitle.innerHTML = "";
  gridContainer.classList.remove("game__main__grid-border");
  wordList.length = 0;
});