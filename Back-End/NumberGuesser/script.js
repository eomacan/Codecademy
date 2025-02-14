let humanScore = 0;
let computerScore = 0;
let currentRoundNumber = 1;

// Write your code below:
function generateTarget() {
  return Math.floor(Math.random() * 10);
}

function compareGuesses(humanGuess, computerGuess, target) {
  if (Math.abs(humanGuess - target) <= Math.abs(computerGuess - target)) {
    return true;
  } else {
    return false;
  }
}

function updateScore(winner) {
  if (winner === 'human') {
    humanScore++;
  } else {
    computerScore++;
  }
}

function advanceRound() {
  currentRoundNumber++;
}   
