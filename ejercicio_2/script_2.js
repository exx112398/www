let targetNumber = Math.floor(Math.random() * 10) + 1;
let attemps = 0;
let alert = document.getElementById("alert");

function init (evt) {
  evt.preventDefault();
  attemps++;
  let value = document.getElementById("text").value;
  check(parseInt(value));
}

function check (value) {
  if (value === targetNumber) { 
    showWin(); 
  } else if ( value !== targetNumber && attemps > 5) {
    showLoss();
  } else {
    showError(); 
  }
}

function showWin () {
  alert.innerHTML = "GANADOR";
  alert.classList.remove("PERDEDOR");
  alert.classList.add("GANADOR");
  document.getElementById("text").value = null;
  
}

function showError () {
  alert.innerHTML = "NUMERO INCORRECTO!";
  alert.classList.remove("GANADOR");
  alert.classList.add("PERDEDOR");
}

function showLoss () {
  alert.innerHTML = "PERDEDOR";
  alert.classList.remove("GANADOR");
  alert.classList.add("PERDEDOR");
}
