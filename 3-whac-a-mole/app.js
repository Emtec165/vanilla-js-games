const squares = document.querySelectorAll('.square')
const mole = document.querySelector('.mole')

const score = document.querySelector('#score');
const missClicksDisplay = document.querySelector('#miss-clicks');
const timeLeft = document.querySelector('#time-left');

let result = 0
let missClicks = 0
let hitPosition
let currentTime = 15
let moveMoleTimerId


moveMole()

function randomSquare() {
  squares.forEach(square => {
    square.classList.remove('mole')
  })

  let randomSquare = squares[Math.floor(Math.random() * 9)]
  randomSquare.classList.add('mole')
  hitPosition = randomSquare.id
}

squares.forEach(square => {
  square.addEventListener('mousedown', () => {

    if (square.id === hitPosition) {
      result++
      score.textContent = result.toString()
    } else {
      missClicks++
      missClicksDisplay.textContent = missClicks.toString()
    }
  })
})

function moveMole() {
  moveMoleTimerId = setInterval(randomSquare, 500)
}

function countDown() {
  currentTime--
  timeLeft.textContent = currentTime.toString()

  if (currentTime === 0) {
    clearInterval(countDownTimerId)
    clearInterval(moveMoleTimerId)
    alert('GAME OVER! Your score is ' + result)
  }
}

let countDownTimerId = setInterval(countDown, 1000)
