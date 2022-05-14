let playerScore = 0,
  computerScore = 0

const userScore = document.querySelector('.game__score-user');
const randomScore = document.querySelector('.game__score-pc');
const textContainer = document.querySelector('.game__text')
const endgameModal = document.querySelector('.game__modal')
const endgameMsg = document.querySelector('.game__modal-title')
const overlay = document.querySelector('.game__overlay')
const restartBtn = document.querySelector('.game__restart-btn')
const newGame = document.querySelector('.game__play');
const rockButton = document.getElementById('rock');
const paperButton = document.getElementById('paper');
const scissorsButton = document.getElementById('scissors');

newGame.addEventListener('click', restartGame);
rockButton.addEventListener('click', playGame);
paperButton.addEventListener('click', playGame);
scissorsButton.addEventListener('click', playGame);
restartBtn.addEventListener('click', closeEndgameModal)


function resultsOutput(string) {
  textContainer.textContent = string;
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function computerPlay() {
  const myArray = ["rock", "scissors", "paper"];

  return myArray[~~(Math.random() * myArray.length)]
};

function playGame(playerSelection, computerSelection) {
  playerSelection = this.id;
  computerSelection = computerPlay();

  if (
    (playerSelection === 'rock' && computerSelection === 'scissors') ||
    (playerSelection === 'paper' && computerSelection === 'rock') ||
    (playerSelection === 'scissors' &&
      computerSelection === 'paper' &&
      (computerScore <= 5 || playerScore <= 5))
  ) {
    playerScore++;
    resultsOutput(
      `You won.
        ${capitalize(playerSelection)} beats ${computerSelection}.`
    );
    userScore.textContent = `Your score: ${playerScore}`;
    if (playerScore >= 5) {
      resultsOutput(`You got 5 points!`);
      rockButton.removeEventListener('click', playGame);
      paperButton.removeEventListener('click', playGame);
      scissorsButton.removeEventListener('click', playGame);
      openEndgameModal();
    }
  } else if (
    (playerSelection === 'rock' && computerSelection === 'paper') ||
    (playerSelection === 'paper' && computerSelection === 'scissors') ||
    (playerSelection === 'scissors' &&
      computerSelection === 'rock' &&
      (computerScore <= 5 || playerScore <= 5))
  ) {
    computerScore++;

    resultsOutput(`Computer won. ${computerSelection} beats ${playerSelection}.`);
    randomScore.textContent = `Computer: ${computerScore}`;
    if (computerScore >= 5) {
      resultsOutput(`The computer was first to get 5 points.`);
      rockButton.removeEventListener('click', playGame);
      paperButton.removeEventListener('click', playGame);
      scissorsButton.removeEventListener('click', playGame);
      openEndgameModal();
    }
  } else {
    resultsOutput(`Tie round: ${playerSelection} and ${computerSelection}.`);
  }
}

function openEndgameModal() {
  endgameModal.classList.add('active')
  overlay.classList.add('active')
  setFinalMessage()
}

function setFinalMessage() {
  return playerScore > computerScore
    ? (endgameMsg.textContent = 'Congratulations! You won!')
    : (endgameMsg.textContent = 'You lost...Maybe you should try again?')
}

function closeEndgameModal() {
  endgameModal.classList.remove('active')
  overlay.classList.remove('active')
  restartGame()
}

function restartGame() {
  playerScore = 0
  computerScore = 0
  userScore.textContent = 'Your score: 0'
  randomScore.textContent = 'Computer: 0'
  textContainer.textContent = 'Choose your weapon';
  rockButton.addEventListener('click', playGame);
  paperButton.addEventListener('click', playGame);
  scissorsButton.addEventListener('click', playGame);
}