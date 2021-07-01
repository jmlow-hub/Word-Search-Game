"use strict";

//get html elements
var newGridBtn = document.querySelector(".game__intro__new-grid-btn");
var clearButton = document.querySelector(".game__end__clear-btn");
var wordsToFind = document.querySelector("ul");
var gridContainer = document.querySelector(".game__main__grid"); //array to hold basic word list

var wordList = []; //fetch list of words from API

fetch("https://api.datamuse.com/words?ml=software+development").then(function (res) {
  return res.json();
}).then(function (data) {
  //pull 10 words between 3 and 6 words in length from list at random and pushes to wordList array
  //how to ensure unique words - includes()? - !!!!!!!!!!!!! NOT FIXED
  var i = 0;

  do {
    var index = Math.floor(Math.random() * 100);
    if (data[index].word.length > 2 && data[index].word.length < 7 && !wordList.includes(i)) wordList.push(data[index].word);
  } while (wordList.length < 6); // for(let i=0; i < 30; i++) {
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
    gridSquares.classList.add("game__main__grid__grid-square");
    gridSquares.innerHTML = "M";
    gridContainer.appendChild(gridSquares);
  } //place words from wordListarray in grid


  var placeWords = function placeWords(arr) {
    //select random square on grid and add word to square
    for (var _i3 = 0; _i3 < wordList.length; _i3++) {
      var squareIndex = Math.floor(Math.random() * 99);
      var square = document.getElementById(squareIndex);
      square.innerHTML = wordList[_i3];
    }
  };

  placeWords(wordList);
})["catch"](function (err) {
  alert("You've rendered us speechless, we're all out of words");
}); //fill empty spaces with random letters
//select word - change color - first letter last letter?
//word is removed or indicated as clicked on list somehow
//create individual letters from the array to add to the grid squares 
//  for(let i = 0; i < 6; i++) {
//    const letterArr = Array.from(wordList[i]);
// }