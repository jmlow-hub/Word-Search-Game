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
//random number array to use in selections
const randomNumberArr = [];
//function to generate random number
const almostRandomNumber = (multiplier) => {
  
    do {
      const index = Math.floor(Math.random() * multiplier);
      randomNumberArr.push(index);
      }
    while (randomNumberArr.length < 4);
     let randomNum = Math.floor(randomNumberArr.reduce((acc, num) =>{
     return acc + num }) / 6);
     randomNumberArr.length = 0;
     return randomNum;
  
}


// const shuffle = (arr) => {
//   let number;
//   for(let i = arr.length - 1; i > 0; i--) {
//     let random = Math.floor(Math.random() * i + 1);
//     number = arr[i];
//     arr[i] = arr[random];
//     arr[random] =  number;
//   }
//   return arr;
// }


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
    const squareIndex = almostRandomNumber(224);
    
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




  
// const duplicateCheck = () => {
//   const locationsArr = document.getElementsByClassName("game__main__grid__grid-square");
//   const duplicates = [];
  
//   for(let i = 0; i < locationsArr.length; i++) {
//       if(locationsArr[i].innerHTML.length > 1) {
//          duplicates.push(i); 

//          if(duplicates.length > 0) {
//            for (let j = 0; j < duplicates.length; j++) {
//               const id = j;
//               const oldLocation = document.getElementById(id);
//               const newlocation = document.getElementById(id + 6);
//               newlocation.innerHTML = oldLocation.innerHTML;
              
              
             
              

             

            
//            }
         
             
//           }
      
//     }
//       }

  
//   }




      // while(wordList.length < 4){
      //   const i = almostRandomNumber(249);
        
      //   if(data[i].name.length > 2 && data[i].name.length < 7) {
      //      wordList.push(data[i].name);
      // }
    
  
  












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
      const i = almostRandomNumber(249);
      
      if(data[i].name.length > 2 && data[i].name.length < 7) {
         wordList.push(data[i].name);
    }

}

    createWordList();

    createGrid();

    wordPlacement(wordList);

    //duplicateCheck()

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

  randomNumberArr.length = 0;
})





