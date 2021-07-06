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
 //array of grid locations
 const gridLocationArr = [0,8,17,25,29,34,37,61,73,78,101,105,110,122,129,138,149,166,196,214];
 //const gridLocations = [];
//empty array to hold selected word
const selectedWordArr = [];

//function to grid location
const gridSelector = () => {
    
    let index = Math.floor(Math.random() * gridLocationArr.length)
    let randomNumber = gridLocationArr[index];
    gridLocationArr.splice(index, 1);

    return randomNumber;
    
  }
//function to generate random number
const numberGenerator = () => {
  const range = (min, max) => [...Array(max - min + 1).keys()].map(i => i + min) //creates an array
  const numberPickerArr = range(0, 249);  
  let index = Math.floor(Math.random() * numberPickerArr.length)
  let randomNumber = numberPickerArr[index];
  numberPickerArr.splice(index, 1);
  return randomNumber;
  
}


//create list of words to find in relevant container
const createWordList = () => {
    for(let i = 0; i < 4; i++) {
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
  for(let i = 0; i < arr.length; i++) {
    const squareIndex = gridSelector();
    gridLocationArr.splice(squareIndex, 1);  //workaround!!!!!!
    console.log(squareIndex)
    console.log(gridLocationArr.length)
       
        
    let lettersArr = arr[i];
      for(let j = 0; j < lettersArr.length; j++) {
          let letter = lettersArr[j];  
                             
          if(squareIndex % 2 === 0) {
            const square = document.getElementById(squareIndex + j);
            square.innerHTML += letter;
              }      
             
          else if(squareIndex % 2 != 0) {
            const square = document.getElementById(squareIndex + (j * 15));
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
  e.preventDefault();

  fetch("https://restcountries.eu/rest/v2/all").then(res => {
    return res.json();
  })
  .then(data => {  

    while(wordList.length < 4){
      const i = numberGenerator();
      
      if(data[i].name.length > 2 && data[i].name.length < 7) {
         wordList.push(data[i].name);
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
  

})


//select the word
//click on div/letter
const handleSquare = gridContainer.addEventListener("click", (e) => {
  e.preventDefault();
  let content = e.target.innerHTML;
//value is pushed to array
  if(e.target && e.target.classList == "game__main__grid__grid-square") {
    e.target.style.background = "linear-gradient(90deg, hsla(183, 62%, 45%, 1) 0%, hsla(41, 96%, 58%, 1) 100%)";
    selectedWordArr.push(content);    
      
  }
})
  
  
const handleCompare = wordsToFind.addEventListener("click", (e) => {
  e.preventDefault();
  
  //compare selectedword array with wordList 
  let selectedWord = selectedWordArr.join("");
  
  if(wordList.includes(selectedWord)) {
    e.target.style.color = "grey"; 
    e.target.style.fontWeight = "lighter"
      
  }
  else {
    alert("Sorry, that's not correct. Try again");
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

  wordList.length = 0;
 
})





