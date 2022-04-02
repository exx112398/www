let words = window.words;
let position = 0;
let selectedWord = null;
let countIncorrectGuess = 0;
let gameState = {
  incorrectGuesses : [],
  guessesRemaining : 0
};

function chooseWord () {countIncorrectGuess
  position = Math.floor(Math.random() * words.length);
  return words[position];
}

function createWordTiles (word) {
  var container = document.getElementById("word");
  word.split("").forEach(i => { 
      var div = document.createElement("div");
      div.setAttribute("class","letter");
      div.innerHTML = i;
      container.appendChild(div);
  })
}

function validate (text) {
  let isLetter = /[a-zA-ZñÑ]/.test(text)
  if ( text.length === 1 && isLetter )  return true;
  return false;
}

function testGuess (letter) {
  let arr = selectedWord.split("");
  let positionArr = [];
  arr.map((item,index) => item === letter ? positionArr.push(index) : null );
  return positionArr; 
}

function updateWordTiles (indices) {
  var contenedor = document.getElementById("word");

  selectedWord.split("").forEach((i,index) => {  
    let element = document.getElementById(index);  
    const idx = indices.findIndex(i => i === index);
 
    if (element === null ) {
      var div = document.createElement("div");
      div.setAttribute("class","letter");
      div.setAttribute("id",index);
      if (idx !== -1) div.innerHTML = selectedWord[index];   
      contenedor.appendChild(div);  
    } else {
      if (idx !== -1) element.innerHTML = selectedWord[index];
    } 
  })
}

function updateScoreboard (incorrectLetter, numberIncorrectLetter) {
  gameState['incorrectGuesses'].push(incorrectLetter);
  gameState['guessesRemaining'] = numberIncorrectLetter;
  document.getElementById("td1").innerHTML = gameState['incorrectGuesses'];
  document.getElementById("td2").innerHTML = gameState['guessesRemaining'];
}

function listen (evt) {
  evt.preventDefault();
  init() 
}

function init () {
  let letter = document.getElementById("guess").value;
  selectedWord = selectedWord === null ? chooseWord() : selectedWord;
  console.log(selectedWord);
  
  if (validate(letter)) {
    let arrPosition = testGuess(letter);
    if (arrPosition.length != 0) updateWordTiles(arrPosition);
    else {
      countIncorrectGuess++;
      updateScoreboard(letter,countIncorrectGuess);
    }
  }  
}
