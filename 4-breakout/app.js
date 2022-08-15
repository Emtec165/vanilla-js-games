const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector("#score")
const leftArrow = document.querySelector('.left-arrow')
const rightArrow = document.querySelector('.right-arrow')
const blockWidth = 100
const blockHeight = 20
const boardWidth = 560
const boardHeight = 300
const ballDiameter = 15
const collisionMargin = 15;

const userStart = [230, 10]
const ballStart = [270, 40]
let currentPosition = userStart
let ballCurrentPosition = ballStart
let ballXDirection = 2
let ballYDirection = 2

let timerId
let score = 0

//create Block
class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis]
    this.bottomRight = [xAxis + blockWidth, yAxis]
    this.topLeft = [xAxis, yAxis + blockHeight]
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    this.isActive = true
    this.blockDiv = null
  }
}

//all my blocks
const blocks = [

  new Block(120, 270),
  new Block(340, 270),

  new Block(10, 240),
  new Block(120, 240),
  new Block(230, 240),
  new Block(340, 240),
  new Block(450, 240),

  new Block(10, 210),
  new Block(120, 210),
  new Block(230, 210),
  new Block(340, 210),
  new Block(450, 210),

  new Block(120, 180),
  new Block(230, 180),
  new Block(340, 180),

  new Block(230, 150)
]

//draw all my block
function addBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement('dev')
    block.classList.add('block')
    block.style.left = blocks[i].bottomLeft[0] + 'px'
    block.style.bottom = blocks[i].bottomLeft[1] + 'px'
    grid.appendChild(block)
    blocks[i].blockDiv = block
  }
}
addBlocks()

//add user
const user = document.createElement('div')
user.classList.add('user')
drawUser();
grid.appendChild(user)

//draw the user
function drawUser() {
  user.style.left = userStart[0] + 'px'
  user.style.bottom = userStart[1] + 'px'
}

//draw the ball
function drawBall() {
  ball.style.left = ballCurrentPosition[0] + 'px'
  ball.style.bottom = ballCurrentPosition[1] + 'px'
}

document.addEventListener('keydown', moveUser)
leftArrow.addEventListener('click', moveByButton)
rightArrow.addEventListener('click', moveByButton)

function moveUser(e) {
  switch (e.key) {
    case 'ArrowLeft':
      if (currentPosition[0] > 0) {
        currentPosition[0] -= 10
        drawUser()
      }
      break;
    case 'ArrowRight':
      if (currentPosition[0] < boardWidth - blockWidth) {
        currentPosition[0] += 10
        drawUser()
      }
      break;
  }
}

function moveByButton(e) {
  switch (e.target.classList[0]) {
    case 'left-arrow':
      if (currentPosition[0] > 0) {
        currentPosition[0] -= 10
        drawUser()
      }
      break;
    case 'right-arrow':
      if (currentPosition[0] < boardWidth - blockWidth) {
        currentPosition[0] += 10
        drawUser()
      }
      break;
  }
}

//add ball
const ball = document.createElement('div')
ball.classList.add('ball')
drawBall();
grid.appendChild(ball)

function moveBall() {
  ballCurrentPosition[0] += ballXDirection
  ballCurrentPosition[1] += ballYDirection
  drawBall()
  checkForCollisions()
}
timerId = setInterval(moveBall, 30)

// check for collisions
function checkForCollisions() {
  // check for block collisions
  for (let i = 0; i < blocks.length; i++) {

    const block = blocks[i];
    if ( // bottom
      block.isActive &&
      ballCurrentPosition[0] + ballDiameter >= block.bottomLeft[0] && // left
      ballCurrentPosition[0] <= block.bottomRight[0] && // right
      ballCurrentPosition[1] + ballDiameter >= block.bottomLeft[1] && // bottom
      ballCurrentPosition[1] + ballDiameter < block.bottomLeft[1] + collisionMargin // margin
    ) {
      console.log('BOTTOM collision')
      ballYDirection = -2
      breakBlock(block)

    } else if ( //top
      block.isActive &&
      ballCurrentPosition[0] + ballDiameter >= block.topLeft[0] && // left
      ballCurrentPosition[0] <= block.topRight[0] && // right
      ballCurrentPosition[1] <= block.topLeft[1] && // top
      ballCurrentPosition[1] > block.topLeft[1] - collisionMargin // margin
    ) {
      console.log('TOP collision')
      ballYDirection = 2
      breakBlock(block)

    } else if ( //right
      block.isActive &&
      ballCurrentPosition[1] < block.topRight[1] && // top
      ballCurrentPosition[1] >= block.bottomRight[1] && // bottom
      ballCurrentPosition[0] <= block.topRight[0] && // right
      ballCurrentPosition[0] > block.topRight[0] - collisionMargin // margin
    ) {
      console.log('RIGHT collision')
      ballXDirection = 2
      breakBlock(block)

    } else if ( //left
      block.isActive &&
      ballCurrentPosition[1] < block.topLeft[1] && // top
      ballCurrentPosition[1] >= block.bottomLeft[1] && // bottom
      ballCurrentPosition[0] + ballDiameter >= block.topLeft[0] && // left
      ballCurrentPosition[0] + ballDiameter < block.topLeft[0] + collisionMargin // margin
    ) {
      console.log('LEFT collision')
      ballXDirection = -2
      breakBlock(block)
    }
  }

  // check for wall collisions - right
  if (ballCurrentPosition[0] >= boardWidth - ballDiameter) {
    ballXDirection = -2
  }

  // check for wall collision - left
  if (ballCurrentPosition[0] <= 0) {
    ballXDirection = 2
  }

  // check for wall collision - up
  if (ballCurrentPosition[1] >= boardHeight - ballDiameter) {
    ballYDirection = -2
  }

  // check for board collisions
  if (
    ballCurrentPosition[0] + ballDiameter >= currentPosition[0] &&
    ballCurrentPosition[0] <= currentPosition[0] + blockWidth &&
    ballCurrentPosition[1] <= currentPosition[1] + blockHeight
  ) {
    ballYDirection = 2
  }

  // check for wall collision - down
  if (ballCurrentPosition[1] <= 0) {
    grid.removeChild(ball)
    clearInterval(timerId)
    document.removeEventListener('keydown', moveUser)
    leftArrow.removeEventListener('click', moveByButton)
    rightArrow.removeEventListener('click', moveByButton)
    scoreDisplay.textContent = 'GAME OVER! Refresh the page to play again..'
  }
}

function breakBlock(block) {
  block.isActive = false
  score++
  scoreDisplay.textContent = score.toString()
  block.blockDiv.style.backgroundColor = 'white'

  // game won
  if (score === blocks.length) {
    grid.removeChild(ball)
    clearInterval(timerId)
    document.removeEventListener('keydown', moveUser)
    scoreDisplay.textContent = 'YOU WIN!'
  }
}
