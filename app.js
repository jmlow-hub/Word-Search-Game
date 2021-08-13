//get html elements
const newGridBtn = document.querySelector(".game__intro__new-grid-btn");
const clearButton = document.querySelector(".game__end__clear-btn");
const wordsToFind = document.querySelector("ul");
const gridContainer = document.querySelector(".game__main__grid");


//arrays
//array to hold basic word list
const wordList = [];
//array to use as filler for empty squarse
const letterFillArr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
//empty array to hold selected word
const selectedWordArr = [];
//empty array to hold ids of selected letters
const selectedIDArr = [];


const numberGenerator = (min,max) => [...Array(max-min + 1).keys()].map(i => i + min) //creates an array

//create list of words to find in relevant container
const createWordList = () => {
    for(let i = 0; i < 6; i++) {
    const newListItem = document.createElement("li");
    const listItemContent = wordList[i];
    newListItem.classList.add("game__main__list__item")
    newListItem.innerHTML = listItemContent;
    wordsToFind.appendChild(newListItem);
   }
}
//create 10 x 10 grid in relevant container - with class and id
const createGrid = () => {
    for(let i = 0; i < 225; i++) {
    const gridSquares = document.createElement("div");
    gridSquares.setAttribute("id", i);
    gridSquares.classList.add("game__main__grid__grid-square");
    //gridSquares.innerHTML = "M";
    gridContainer.appendChild(gridSquares);
   }
  }


//randomly select whether to place words horizontally or vertically
const wordPlacement = (arr) => {
  //array of specific grid locations
  const gridLocationArr = [0,8,17,25,29,34,57, 61,73,78,101,105,110,122,129,138,149,166,196,214];
   for(let i = 0; i < arr.length; i++) {
    const squareIndex = Math.floor(Math.random() * gridLocationArr.length); //selects an index between 0 and 15
        
    let lettersArr = arr[i]; //takes letters in each word in argument array and iterates over it to split into letters
      for(let j = 0; j < lettersArr.length; j++) {
          let letter = lettersArr[j];  
            //if grid location at square index is even place the letter horizontally                 
          if(gridLocationArr[squareIndex] % 2 === 0) { //
            const square = document.getElementById(gridLocationArr[squareIndex] + j);
            square.innerHTML += letter;
              }      
           //if grid location is odd place letters vertically  
          else if(gridLocationArr[squareIndex] % 2 != 0) { 
            const square = document.getElementById(gridLocationArr[squareIndex] + (j * 15));
            square.innerHTML += letter;           
        }  
        }  
        gridLocationArr.splice(squareIndex, 1); //takes square index out of array to avoid duplication
      
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
  e.preventDefault();

  fetch("https://restcountries.eu/rest/v2/all").then(res => {
    return res.json();
  })
  .then(data => {  
    const numberPickerArr = numberGenerator(0, 249); //calls function to generate array of numbers
    while(wordList.length < 6){
      const i = Math.floor(Math.random() * numberPickerArr.length);
       //checks the length of the word at [i] meets condition  
      if(data[i].name.length > 2 && data[i].name.length < 7) {
         wordList.push(data[i].name.toLowerCase());
         
         numberPickerArr.splice(i, 1); //deletes [i] from array
                 
    }

  }

    createWordList();

    createGrid();

    wordPlacement(wordList);

    fillSpace();

    
  })
  .catch(err => {
    alert("We're all out of words... " + err)
  })
   }  
)



//select the word
//click on div/letter
const handleSquare = gridContainer.addEventListener("click", (e) => {
  e.preventDefault();
  let content = e.target.innerHTML;
  let id = e.target.id;
//value is pushed to array
  if(e.target && e.target.classList == "game__main__grid__grid-square") {
    e.target.style.color = "#52b788";
    selectedWordArr.push(content);
    selectedIDArr.push(id);  
    console.log(selectedWordArr)   
 
  }
})
  

const handleCompare = wordsToFind.addEventListener("click", (e) => {
  e.preventDefault();  
  //compare selectedword array with wordList 
  let selectedWord = selectedWordArr.join("");
 
  //if word is a match, sets class which calls animation and changes styles of word and individual letters  
  if(wordList.includes(selectedWord)) {
    e.target.classList.add("right");
    e.target.style.textDecoration = "line-through";
    e.target.style.color = "green";
    selectedIDArr.forEach(id => {
    document.getElementById(id).style.opacity = "0.3";
     //clear array for next selection
    selectedWordArr.length = 0;
    selectedIDArr.length = 0;
})     
  }
 //if word is not a match, sets class which call animation and re-sets the styles
  else {
    e.target.classList.add("wrong");
    selectedIDArr.forEach(id => {
      document.getElementById(id).style.color = "#006d77";
      e.target.style.color = "black";    
  })
  //clear array for next selection
  selectedWordArr.length = 0;
  selectedIDArr.length = 0;
}
})

//clear list and grid
const handleClearGrid = clearButton.addEventListener("click", (e) => {
  e.preventDefault()

  wordsToFind.innerHTML = "";
  "";
  gridContainer.innerHTML = "";

  wordList.length = 0;

  
})





