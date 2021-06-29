//get html elements
const newGridBtn = document.querySelector(".game__intro__new-grid-btn");


//array to hold basic word list
const wordList = [];

//fetch list of words from API
 const rawWordsArr = fetch("https://api.datamuse.com/words?ml=software+development").then(res => {
  return res.json();
})
.then(data => {

 //pull 10 words between 3 and 6 words in length from list at random and pushes to wordList array
  for(let i=0; i < 30; i++) {
  const index = Math.floor(Math.random() *100);
  if(data[index].word.length > 2 && data[index].word.length < 7)
  wordList.push(data[index].word);
  console.log(wordList);
  
}
//how to ensure get minimum amount of words - increase i?

  
})
.catch(err => {
  alert("You've rendered us speechless, we're all out of words")
})



