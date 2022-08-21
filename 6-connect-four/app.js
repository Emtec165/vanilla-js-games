document.addEventListener('DOMContentLoaded', () => {
  const squares = document.querySelectorAll('.grid div')
  const result = document.querySelector('#result')
  const currentPlayerDisplay = document.querySelector('#current-player')

  const rowSize = 7
  const gameAreaIndexes = squares.length - rowSize - 1
  let currentPlayer = 1

  for (let i = 0; i < squares.length; i++) {
    squares[i].id = i.toString()
    squares[i].onclick = () => {

      if (squares[i].classList.contains('taken')) {
        alert('You can\'t pick taken spot dummo')
      }

      if (squares[i + rowSize].classList.contains('taken')) {
        squares[i].classList.add('taken')

        if (currentPlayer === 1) {
          squares[i].classList.add('player-one')
          checkBoard()
          currentPlayer = 2
        } else if (currentPlayer === 2) {
          squares[i].classList.add('player-two')
          checkBoard()
          currentPlayer = 1
        }

        currentPlayerDisplay.innerHTML = currentPlayer.toString()
      } else {
        alert('Can\'t go there. Click on the bottom / just above token')
      }
    }
  }

  function checkBoard() {
    checkBoardForPlayerClass('player-one')
    checkBoardForPlayerClass('player-two')
  }

  function checkBoardForPlayerClass(playerClass) {

    // horizontal (right to left, from bottom)
    for (let i = gameAreaIndexes; i >= 0; i--) {
      if (i % 7 >= 3) {
        if (
          squares[i].classList.contains(playerClass) &&
          squares[i - 1].classList.contains(playerClass) &&
          squares[i - 2].classList.contains(playerClass) &&
          squares[i - 3].classList.contains(playerClass)
        ) {
          finishGame()
        }
      }
    }

    // vertical (bottom to top, from right)
    for (let i = gameAreaIndexes; i >= 0; i--) {
      if (i >= rowSize * 3) {
        if (
          squares[i].classList.contains(playerClass) &&
          squares[i - rowSize].classList.contains(playerClass) &&
          squares[i - rowSize * 2].classList.contains(playerClass) &&
          squares[i - rowSize * 3].classList.contains(playerClass)
        ) {
          finishGame()
        }
      }
    }

    // "/" diag (form bottom right)
    for (let i = 38; i >= 21; i--) {
      if (i % rowSize <= 4) {
        if (
          squares[i].classList.contains(playerClass) &&
          squares[i - rowSize + 1].classList.contains(playerClass) &&
          squares[i - (rowSize * 2) + 2].classList.contains(playerClass) &&
          squares[i - (rowSize * 3) + 3].classList.contains(playerClass)
        ) {
          finishGame()
        }
      }
    }

    // "\" diag (form bottom right)
    for (let i = gameAreaIndexes; i >= 24; i--) {
      if (i % rowSize >= 3) {
        if (
          squares[i].classList.contains(playerClass) &&
          squares[i - rowSize - 1].classList.contains(playerClass) &&
          squares[i - (rowSize * 2) - 2].classList.contains(playerClass) &&
          squares[i - (rowSize * 3) - 3].classList.contains(playerClass)
        ) {
          finishGame()
        }
      }
    }
  }

  function finishGame() {
    result.textContent = 'Player: ' + currentPlayer.toString() + ' wins!'
    squares.forEach(x => x.onclick = null)
  }
})
