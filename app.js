//get html elements
const newGridBtn = document.querySelector(".game__intro__new-grid-btn");
const clearButton = document.querySelector(".game__end__clear-btn");
const wordsToFind = document.querySelector("ul");
const gridContainer = document.querySelector(".game__main__grid");


//array to hold basic word list
const wordList = [];

//fetch list of words from API
  fetch("https://api.datamuse.com/words?ml=software+development").then(res => {
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

   //create 10 x 10 grid in relevant container - with class and id
   for(let i = 0; i < 100; i++) {
    const gridSquares = document.createElement("div");
    gridSquares.setAttribute("id", i);
    gridSquares.classList.add("game__main__grid__grid-square")
    gridSquares.innerHTML = "M";
    gridContainer.appendChild(gridSquares);
   }
   
 //place words from wordListarray in grid
   const placeWords = (arr) => {
     //split array into individual words
     const word1 = arr[0];
     const word2 = arr[1];
     const word3 = arr[3];
     const word4 = arr[4];
     const word5 = arr[5];
     const word6 = arr[6];

     //select random square on grid
     const squareIndex = Math.floor(Math.random() * 99);
     const square = document.getElementById(squareIndex);
     
     console.log(square)




   }


    
   
   
   placeWords(wordList);
  
   
})

.catch(err => {
  alert("You've rendered us speechless, we're all out of words")
})


 








//fill empty spaces with random letters
//select word - change color - first letter last letter?
//word is removed or indicated as clicked on list somehow



  //create individual letters from the array to add to the grid squares 
  //  for(let i = 0; i < 6; i++) {
        
  //    const letterArr = Array.from(wordList[i]);

    
  // }