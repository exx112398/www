let state = [
  [ 'x', 'o', null ],
  [ 'x', 'x', 'o' ],
  [ 'o', 'x', null ]
];

function* generator() {
  var indice = 0;
  while(true)
    yield indice++;
}

function populate (board) {
  let newList = board.toString().split(",")
  let iterator = generator()
  document.querySelectorAll("td")
          .forEach( item => item.innerHTML = newList[iterator.next().value])
}

function nextPlayer (board) {
  let countX = 0, countO = 0
  board.toString()
  	 	 .split(",")
	         .filter(item => item != "")
	         .forEach(item => item === "x" ? countX++ : countO++)
  next = countX > countO ? "o" : "x"
  return next 
 }

function findWinner (board) {
  let winner = null
  let selectedItem = "", elementX = "xxx", elementO = "ooo"
  let winWithX = "x", winWithO = "o"
  let i = 0, positionItem = 0
  
  /*-------------- Check  Rows ------------------------*/  
  for (let i = 0; i < board.length; i++) {
    selectedItem = board[i].toString().replace(/,/g,'')
    if (selectedItem === elementX || selectedItem === elementO) {
      winner = selectedItem[positionItem]
      break
    }
  }
  /*---------------------------------------------------*/
  
  /*------------ Check Rows Improved ------------------*/
  for (let i = 0; i < board.length; i++) {
    selectedItemX = board[i].toString().indexOf("x,x,x")
    selectedItemO = board[i].toString().indexOf("o,o,o")
    if (selectedItemX != -1 ) { 
      winner = winWithX
      break
    }
    else if (selectedItemO != -1) { 
      winner = winWithO
      break
    }
  }
  /*---------------------------------------------------*/
  
  /*------------ Check Columns ------------------------*/
  while (i < board.length && winner == null) {
    selectedItem = ""
    board.forEach(element => selectedItem += element[i])
    if (selectedItem === elementX || selectedItem === elementO) {
      winner = selectedItem[positionItem]
      break
    }
    i++
  }
  /*---------------------------------------------------*/
  
  /*------------ Check Columns Improved ---------------*/
  while (i < board.length && winner == null) {
    selectedItem = ""
    state.forEach(element => selectedItem += element[i])
    if (selectedItem.indexOf(elementX) != -1 ){ 
      winner = winWithX
      break
    }
    else if (selectedItem.indexOf(elementO) != -1) { 
      winner = winWithO
      break
    }
  }
  /*---------------------------------------------------*/
  
  /*------------- Check Left Diagonal -----------------*/
  i = 0
  selectedItem = ""
  while (i < board.length && winner == null) {
    selectedItem += board[i][i]
    i++
  }
  if (selectedItem === elementX || selectedItem === elementO) { 
    winner = selectedItem[positionItem] 
  }
  /*--------------------------------------------------*/  
  
  /*-------------- Check Left Diagonal Improved ------*/
  i = 0
  selectedItem = ""
  while (i < board.length && winner == null) {
    selectedItem += board[i][i]
    i++
  }
  if ( selectedItem.indexOf(elementX) != -1 ) { winner = winWithX }
  else if (selectedItem.indexOf(elementO) != -1 ) { winner = winWithO }
  /*--------------------------------------------------*/
  
  /*-------------- Check Right Diagonal --------------*/
  i = 0
  selectedItem = ""
  while (i < board.length && winner == null) {
    let reversePosition = (board[i].length - 1) - i
    selectedItem += board[i][reversePosition]
    i++
	}
  if (selectedItem === elementX || selectedItem === elementO) { 
    winner = selectedItem[positionItem] 
  }
  /*-------------------------------------------------*/
  
  /*------------- Check Right Diagonal Improved -----*/
  i = 0
  selectedItem = ""
  while (i < state.length ) {
    let reversePosition = (state[i].length - 1) - i
    selectedItem += state[i][reversePosition]
    i++
	}
  if ( selectedItem.indexOf(elementX) != -1 ) { winner = winWithX } 
  else if (selectedItem.indexOf(elementO) != -1 ) { winner = winWithO }
  /*------------------------------------------------*/
  
  return winner
}
