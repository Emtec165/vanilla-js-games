const ROCK = 'rock'
const PAPER = 'paper'
const SCISSORS = 'scissors'

const computerChoiceDisplay = document.getElementById('computer-choice');
const userChoiceDisplay = document.getElementById('user-choice');
const resultDisplay = document.getElementById('result');

const possibleChoices = document.querySelectorAll('button')

let userChoice
let computerChoice

possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', getListener()))

function getListener() {
  return e => {
    displayUserChoice()
    generateComputerChoice()
    computeResult()

    function displayUserChoice() {
      userChoice = e.target.id
      userChoiceDisplay.innerHTML = userChoice
    }
  };
}

function generateComputerChoice() {
  const randomNumber = Math.floor(Math.random() * possibleChoices.length)
  computerChoice = possibleChoices[randomNumber].id;
  computerChoiceDisplay.innerHTML = computerChoice
}

function computeResult() {
  let result

  if (userChoice === computerChoice) {
    result = 'It\'s a draw!'
  } else if (userChoice === PAPER && computerChoice === ROCK) {
    result = 'You win!'
  } else if (userChoice === ROCK && computerChoice === SCISSORS) {
    result = 'You win!'
  } else if (userChoice === SCISSORS && computerChoice === PAPER) {
    result = 'You win!'
  } else {
    result = 'You lose!'
  }

  resultDisplay.innerHTML = result
}
