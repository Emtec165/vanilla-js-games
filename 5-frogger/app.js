const timeLeftDisplay = document.querySelector('#time-left');
const resultDisplay = document.querySelector('#result');
const startPauseButton = document.querySelector("#start-pause-button");
const logsLeft = document.querySelectorAll(".log-left");
const logsRight = document.querySelectorAll(".log-right");
const carsLeft = document.querySelectorAll(".car-left");
const carsRight = document.querySelectorAll(".car-right");
const squares = document.querySelectorAll('.grid div')
const width = 9

let timeLeftSeconds = 20
let interval
let currentIndex = 76
let isGameEnded = false

function moveFrog(e) {

  squares[currentIndex].classList.remove('frog')

  switch (e.key) {
    case 'ArrowLeft':
      if (currentIndex % width !== 0) {
        currentIndex -= 1
      }
      break
    case 'ArrowRight':
      if (currentIndex % width !== 8) {
        currentIndex += 1
      }
      break
    case 'ArrowUp':
      if (currentIndex - width >= 0) {
        currentIndex -= width
      }
      break
    case 'ArrowDown':
      if (currentIndex + width < width * width) {
        currentIndex += width
      }
      break
  }

  squares[currentIndex].classList.add('frog')
  lose()
  win()
}

document.addEventListener('keyup', moveFrog)

interval = setInterval(autoMoveElement, 1000);

function autoMoveElement() {
  logsLeft.forEach(log => moveLogLeft(log))
  logsRight.forEach(log => moveLogRight(log))
  carsLeft.forEach(car => moveCarLeft(car))
  carsRight.forEach(car => moveCarRight(car))
  lose()
  manageTimer()
}

function moveLogLeft(logLeft) {
  switch(true) {
    case logLeft.classList.contains('l1') :
      logLeft.classList.remove('l1')
      logLeft.classList.add('l2')
      break
    case logLeft.classList.contains('l2') :
      logLeft.classList.remove('l2')
      logLeft.classList.add('l3')
      break
    case logLeft.classList.contains('l3') :
      logLeft.classList.remove('l3')
      logLeft.classList.add('l4')
      break
    case logLeft.classList.contains('l4') :
      logLeft.classList.remove('l4')
      logLeft.classList.add('l5')
      break
    case logLeft.classList.contains('l5') :
      logLeft.classList.remove('l5')
      logLeft.classList.add('l1')
      break
  }
}

function moveLogRight(logRight) {
  switch(true) {
    case logRight.classList.contains('l1') :
      logRight.classList.remove('l1')
      logRight.classList.add('l5')
      break
    case logRight.classList.contains('l2') :
      logRight.classList.remove('l2')
      logRight.classList.add('l1')
      break
    case logRight.classList.contains('l3') :
      logRight.classList.remove('l3')
      logRight.classList.add('l2')
      break
    case logRight.classList.contains('l4') :
      logRight.classList.remove('l4')
      logRight.classList.add('l3')
      break
    case logRight.classList.contains('l5') :
      logRight.classList.remove('l5')
      logRight.classList.add('l4')
      break
  }
}

function moveCarLeft(carLeft) {
  switch(true) {
    case carLeft.classList.contains('c1') :
      carLeft.classList.remove('c1')
      carLeft.classList.add('c2')
      break
    case carLeft.classList.contains('c2') :
      carLeft.classList.remove('c2')
      carLeft.classList.add('c3')
      break
    case carLeft.classList.contains('c3') :
      carLeft.classList.remove('c3')
      carLeft.classList.add('c1')
      break
  }
}

function moveCarRight(carRight) {
  switch(true) {
    case carRight.classList.contains('c1') :
      carRight.classList.remove('c1')
      carRight.classList.add('c3')
      break
    case carRight.classList.contains('c2') :
      carRight.classList.remove('c2')
      carRight.classList.add('c1')
      break
    case carRight.classList.contains('c3') :
      carRight.classList.remove('c3')
      carRight.classList.add('c2')
      break
  }
}

function lose() {
  const classList = squares[currentIndex].classList;
  if (
    classList.contains('c1') ||
    classList.contains('l4') ||
    classList.contains('l5')) {
    resultDisplay.textContent = "UR fckd boooi - you got run over / drowned stupido"
    clearInterval(interval)
    classList.remove('frog')
    document.removeEventListener('keyup', moveFrog)
    isGameEnded = true
  }
}

function win() {
  const classList = squares[currentIndex].classList;
  if (classList.contains('ending-block')) {
    resultDisplay.textContent = "You win my little frog! :3"
    clearInterval(interval)
    document.removeEventListener('keyup', moveFrog)
    isGameEnded = true
  }
}

function manageTimer() {
  timeLeftSeconds--
  timeLeftDisplay.textContent = timeLeftSeconds
  if (timeLeftSeconds === 0) {
    resultDisplay.textContent = "UR fckd boooi - time's up"
    clearInterval(interval)
    document.removeEventListener('keyup', moveFrog)
    isGameEnded = true
  }
}

startPauseButton.addEventListener('click', () => {
  if (interval) {
    clearInterval(interval)
    interval = null
    document.removeEventListener('keyup', moveFrog)
  } else if (!isGameEnded) {
    interval = setInterval(autoMoveElement, 1000);
    document.addEventListener('keyup', moveFrog)
  }
})
