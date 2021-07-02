"use strict";

//get html elements
var newGridBtn = document.querySelector(".game__intro__new-grid-btn");
var clearButton = document.querySelector(".game__end__clear-btn");
var wordsToFind = document.querySelector("ul");
var gridContainer = document.querySelector(".game__main__grid");
var gridStyle = document.styleSheets[1];
var randomNumberArr = [];

var generateRandomNumberArr = function generateRandomNumberArr() {
  for (var i = 0; i < 100; i++) {
    randomNumberArr.push(i);
  }
};

generateRandomNumberArr();
console.log(randomNumberArr); //array to hold basic word list

var wordList = []; //array of 6 random numbers to choose words & grid slots

var indexGenerator = function indexGenerator() {
  var indices = [];

  while (indices.length < 5) {
    var index = Math.floor(Math.random() * 99);

    if (indices.indexOf(index) === -1) {
      indices.push(index);
    }

    return indices;
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
    var index = indexGenerator();
    if (data[index].word.length > 2 && data[index].word.length < 7) wordList.push(data[index].word);
  } while (wordList.length < 6); //  let i = 0;
  //  do {
  //   const index = Math.floor(Math.random()*100);
  //   if(data[index].word.length > 2 && data[index].word.length < 7 && !wordList.includes(i)) 
  //   wordList.push(data[index].word);
  //   } while (wordList.length < 6);
  // for(let i=0; i < 30; i++) {
  // const index = Math.floor(Math.random() *100);
  // if(data[index].word.length > 2 && data[index].word.length < 7 && !wordList.includes(i)) //hopefully !includes() means won't return duplicates
  // wordList.push(data[index].word);
  // console.log(wordList);
  //create list of words to find in relevant container


  for (var _i = 0; _i < 6; _i++) {
    var newListItem = document.createElement("li");
    var listItemContent = wordList[_i];
    newListItem.innerHTML = listItemContent;
    wordsToFind.appendChild(newListItem);
  } //create 10 x 10 grid in relevant container - with class and id


  for (var _i2 = 0; _i2 < 100; _i2++) {
    var gridSquares = document.createElement("div");
    gridSquares.setAttribute("id", _i2);
    gridSquares.classList.add("game__main__grid__grid-square"); //gridSquares.innerHTML = "M";

    gridContainer.appendChild(gridSquares);
  } //place words from wordList array horizontally in grid
  //const placeHorizontal = (arr) => {
  //select random square on grid and add word to square
  //    for(let i = 0; i < arr.length; i++) {
  //         const squareIndex = Math.floor(Math.random() * 99);
  //         let tempWord = arr[i];
  //            for(let j = 0; j < tempWord.length; j++) {
  //              let letter = tempWord.split('')[j];
  //              const square = document.getElementById(squareIndex + j);
  //              square.innerHTML += letter;        
  //               console.log(letter);
  //             }
  //       }  
  //  }
  //  placeHorizontal(wordList);   
  //})
  //place words from wordList array vertically in grid


  var placeVertical = function placeVertical(arr) {
    //select random square on grid and add word to square
    for (var _i3 = 0; _i3 < arr.length; _i3++) {
      var squareIndex = Math.floor(Math.random() * 50); //console.log(squareIndex)

      var tempWord = arr[_i3];

      for (var j = 0; j < tempWord.length; j++) {
        var letter = tempWord.split('')[j];
        var square = document.getElementById(squareIndex + j * 10);
        square.innerHTML += letter; //console.log(letter);
        //console.log(square)
      }
    }

    placeVertical(wordList);
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