"use strict";

//get html elements
var newGridBtn = document.querySelector(".game__intro__new-grid-btn");
var clearButton = document.querySelector(".game__end__clear-btn");
var wordsToFind = document.querySelector("ul");
var gridContainer = document.querySelector(".game__main__grid");
var gridStyle = document.styleSheets[1]; //arrays
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
}; //place words from wordList array horizontally in grid


var placeHorizontal = function placeHorizontal(arr) {
  //Select random square on grid and add word to square
  for (var i = 0; i < arr.length; i++) {
    var squareIndex = Math.floor(Math.random() * 99);
    var tempWord = arr[i];

    for (var j = 0; j < tempWord.length; j++) {
      var letter = tempWord.split('')[j];
      var square = document.getElementById(squareIndex + j);
      square.innerHTML += letter;
    }
  }
}; // place words from wordList array vertically in grid


var placeVertical = function placeVertical(arr) {
  for (var i = 0; i < arr.length; i++) {
    var squareIndex = Math.floor(Math.random() * 50);
    var tempWord = arr[i];

    for (var j = 0; j < tempWord.length; j++) {
      var letter = tempWord.split('')[j];
      var square = document.getElementById(squareIndex + j * 10);
      square.innerHTML += letter;
    }
  }
}; //randomly select whether to place words horizontally or vertically


var wordPlacement = function wordPlacement() {
  var number = indexGenerator(20);

  if (number % 2 === 0) {
    return placeHorizontal(wordList);
  } else {
    return placeVertical(wordList);
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
}; //fetch list of words from API


fetch("https://api.datamuse.com/words?ml=software+development").then(function (res) {
  return res.json();
}).then(function (data) {
  //pull 10 words between 3 and 6 words in length from list at random and pushes to wordList array
  //how to ensure unique words - includes()? - !!!!!!!!!!!!! NOT FIXED
  ;
  var i = 0;

  do {
    var index = Math.floor(Math.random() * 99);
    if (data[index].word.length > 2 && data[index].word.length < 7) wordList.push(data[index].word);
  } while (wordList.length < 6); //fill empty spaces:


  var fillSpace = function fillSpace() {
    var gridSpaceArr = document.getElementsByClassName("game__main__grid__grid-square");

    for (var _i = 0; _i < gridSpaceArr.length; _i++) {
      var letterIndex = Math.floor(Math.random() * 25);

      if (gridSpaceArr[_i].innerHTML === "") {
        gridSpaceArr[_i].innerHTML = letterFillArr[letterIndex];
      }
    }
  };
})["catch"](function (err) {
  alert("You've rendered us speechless, we're all out of words");
}); //fill empty spaces with random letters
//select word - change color - first letter last letter?
//word is removed or indicated as clicked on list somehow
//create individual letters from the array to add to the grid squares 
//  for(let i = 0; i < 6; i++) {
//    const letterArr = Array.from(wordList[i]);
// }