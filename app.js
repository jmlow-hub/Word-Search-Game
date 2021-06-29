//get html elements
const newGridBtn = document.querySelector(".game__intro__new-grid-btn");


//array to hold basic word list
const wordList = [];

//fetch list of words from API
 const rawWordsArr = fetch("https://api.datamuse.com/words?ml=software+development").then(res => {
  return res.json();
})
.then(data => {
 

})

.catch(err => {
  alert("You've rendered us speechless, we're all out of words")
})






