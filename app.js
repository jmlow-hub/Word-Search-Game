//get html elements
const newGridBtn = document.querySelector(".game__intro__new-grid-btn");
const clearButton = document.querySelector(".game__end__clear-btn");
const wordsToFind = document.querySelector("ul");
const gridContainer = document.querySelector(".game__main__grid");
const submitBtn = document.querySelector(".game__end__submit-btn");




//arrays
//array to hold basic word list
const wordList = [];
//array to use as filler for empty squarse
const letterFillArr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
//empty array to hold selected word
const selectedWordArr = [];

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


//randomly select whether to place words horizontally or vertically
const wordPlacement = (arr) => {
  for(let i = 0; i < arr.length; i++) {
    const squareIndex = Math.floor(Math.random() * 50);
    let lettersArr = arr[i];
      for(let j = 0; j < lettersArr.length; j++) {
          let letter = lettersArr[j];                     
           if(squareIndex % 2 === 0) {
           const square = document.getElementById(squareIndex + j);
           square.innerHTML += letter;           
         } else if(squareIndex % 2 != 0 && squareIndex <=50) {
           const square = document.getElementById(squareIndex + (j * 10));
           square.innerHTML += letter;           
        }    
        }
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
 
//fetch list of words from API on button click
const handleNewGrid = newGridBtn.addEventListener("click", (e) => {
  e.preventDefault()

  fetch("https://api.datamuse.com/words?ml=software+development").then(res => {
  return res.json();
})
.then(data => {
let i = 0;
do{
  const index = Math.floor(Math.random()*99);
  if(data[index].word.length > 2 && data[index].word.length < 7) 
  wordList.push(data[index].word);
  }while (wordList.length < 6);

  createWordList();

  createGrid();

  wordPlacement(wordList);

  fillSpace();

  
})
.catch(err =>  {
  alert("You've rendered us speechless, we're all out of words..."  + err)
});


})

//select the word
//click on div/letter
const handleSquare = gridContainer.addEventListener("click", (e) => {
  e.preventDefault();
  let content = e.target.innerHTML;
//value is pushed to array
  if(e.target && e.target.classList == "game__main__grid__grid-square") {
    selectedWordArr.push(content);
    console.log(selectedWordArr);  
  }
})
  
  
const handleSubmit = submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  
  //compare selectedword array with wordList 
  let selectedWord = selectedWordArr.join("");
  console.log(selectedWord)
  if(wordsToFind.li.innerHTML == selectedWord) {
    console.log(true)
    
  }
  //clear array for next selection
  selectedWordArr.length = 0;
})







//clear list and grid
const handleClearGrid = clearButton.addEventListener("click", (e) => {
  e.preventDefault()

  wordsToFind.innerHTML = "";
  "";
  gridContainer.innerHTML = "";
})






