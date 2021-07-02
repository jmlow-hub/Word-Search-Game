//get html elements
const newGridBtn = document.querySelector(".game__intro__new-grid-btn");
const clearButton = document.querySelector(".game__end__clear-btn");
const wordsToFind = document.querySelector("ul");
const gridContainer = document.querySelector(".game__main__grid");
const gridStyle = document.styleSheets[1];

//arrays
//array to hold basic word list
const wordList = [];
const letterFillArr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

// const randomNumberArr = [];

// const generateRandomNumberArr = () => {
//   for (let i = 0; i < 100; i++) {
//     randomNumberArr.push(i);
//   }
// }
// generateRandomNumberArr()

//array of 6 random numbers to choose words & grid slots
const indexGenerator = (repeater) => {
  const indices = [];
  while (indices.length < 5) {
    let index = Math.floor(Math.random() * repeater);
    if(indices.indexOf(index) === -1) {
      indices.push(index);
    }
    return indices;
  }
}

//create list of words to find in relevant container
const createWordList = () => {
    for(let i = 0; i < 6; i++) {
    const newListItem = document.createElement("li");
    const listItemContent = wordList[i];
    newListItem.innerHTML = listItemContent;
    wordsToFind.appendChild(newListItem);
   }
}
//create 10 x 10 grid in relevant container - with class and id
const createGrid = () => {
    for(let i = 0; i < 100; i++) {
    const gridSquares = document.createElement("div");
    gridSquares.setAttribute("id", i);
    gridSquares.classList.add("game__main__grid__grid-square")
    gridContainer.appendChild(gridSquares);
   }
  }


 //place words from wordList array horizontally in grid
 const placeHorizontal = (arr) => {
    //Select random square on grid and add word to square
     for(let i = 0; i < arr.length; i++) {
          const squareIndex = Math.floor(Math.random() * 99);
          let tempWord = arr[i];
             for(let j = 0; j < tempWord.length; j++) {
               let letter = tempWord.split('')[j];
               const square = document.getElementById(squareIndex + j);
               square.innerHTML += letter;        
                      
              }
        }  
   }


 // place words from wordList array vertically in grid
 const placeVertical = (arr) => {  
  for(let i = 0; i < arr.length; i++) {
    const squareIndex = Math.floor(Math.random() * 50);
    let tempWord = arr[i];
        for(let j = 0; j < tempWord.length; j++) {
          let letter = tempWord.split('')[j];
          const square = document.getElementById(squareIndex + (j*10));
          square.innerHTML += letter;
        }
  }
}

//randomly select whether to place words horizontally or vertically
const wordPlacement = () => {
  let number = indexGenerator(20);
  if(number % 2 === 0) {
    return placeHorizontal(wordList);
  } else {
    return placeVertical(wordList);
  }
}


//fill empty spaces:
const fillSpace = () => {
  const gridSpaceArr = document.getElementsByClassName("game__main__grid__grid-square");
  for (let i = 0; i < gridSpaceArr.length; i++) {
    const letterIndex = Math.floor(Math.random() * 25);
    if(gridSpaceArr[i].innerHTML === "") {
      gridSpaceArr[i].innerHTML = letterFillArr[letterIndex];
    }
  }
}
 



//fetch list of words from API
  fetch("https://api.datamuse.com/words?ml=software+development").then(res => {
  return res.json();
})
.then(data => {

 //pull 10 words between 3 and 6 words in length from list at random and pushes to wordList array
 //how to ensure unique words - includes()? - !!!!!!!!!!!!! NOT FIXED
;
let i = 0;
do{
  const index = Math.floor(Math.random()*99);
  if(data[index].word.length > 2 && data[index].word.length < 7) 
  wordList.push(data[index].word);
  }while (wordList.length < 6);



   
 
 
   
   
  



//fill empty spaces:
const fillSpace = () => {
  const gridSpaceArr = document.getElementsByClassName("game__main__grid__grid-square");
  for (let i = 0; i < gridSpaceArr.length; i++) {
    const letterIndex = Math.floor(Math.random() * 25);
    if(gridSpaceArr[i].innerHTML === "") {
      gridSpaceArr[i].innerHTML = letterFillArr[letterIndex];
    }
  }

}


  
})
.catch(err =>  {
  alert("You've rendered us speechless, we're all out of words")
});


 








//fill empty spaces with random letters
//select word - change color - first letter last letter?
//word is removed or indicated as clicked on list somehow



  //create individual letters from the array to add to the grid squares 
  //  for(let i = 0; i < 6; i++) {
        
  //    const letterArr = Array.from(wordList[i]);

    
  // }