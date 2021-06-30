//get html elements
const newGridBtn = document.querySelector(".game__intro__new-grid-btn");
const clearButton = document.querySelector(".game__end__clear-btn");
const wordsToFind = document.querySelector("ul");
const gridContainer = document.querySelector(".game__main__grid");


//array to hold basic word list
const wordList = [];

//fetch list of words from API
 const rawWordsArr = fetch("https://api.datamuse.com/words?ml=software+development").then(res => {
  return res.json();
})
.then(data => {

 //pull 10 words between 3 and 6 words in length from list at random and pushes to wordList array
 //how to ensure unique words - includes()? - !!!!!!!!!!!!! NOT FIXED
 let i = 0;
 do {
  const index = Math.floor(Math.random() *100);
  if(data[index].word.length > 2 && data[index].word.length < 7 && !wordList.includes(i)) 
  wordList.push(data[index].word);
  } while (wordList.length < 6);


  // for(let i=0; i < 30; i++) {
  // const index = Math.floor(Math.random() *100);
  // if(data[index].word.length > 2 && data[index].word.length < 7 && !wordList.includes(i)) //hopefully !includes() means won't return duplicates
  // wordList.push(data[index].word);
  // console.log(wordList);

   //create list of words to find in relevant container
   for(let i = 0; i < 6; i++) {
    const newListItem = document.createElement("li");
    const listItemContent = wordList[i];
    newListItem.innerHTML = listItemContent;
    wordsToFind.appendChild(newListItem);
   }

   //create 10 x 10 grid in relevant container
   for(let i = 0; i < 100; i++) {
    const gridSquare = document.createElement("div");
    gridSquare.setAttribute("id", i);
    gridSquare.classList.add("game__main__grid__grid-square")
    gridContainer.appendChild(gridSquare);


   }
   
  





    
})
.catch(err => {
  alert("You've rendered us speechless, we're all out of words")
})










//place words from array in grid
//fill empty spaces with random letters
//select word - change color - first letter last letter?
//word is removed or indicated as clicked on list somehow