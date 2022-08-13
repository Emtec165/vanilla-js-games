const cardArray = [
  {
    name: 'fries',
    img: 'images/fries.png'
  },
  {
    name: 'cheeseburger',
    img: 'images/cheeseburger.png'
  },
  {
    name: 'hotdog',
    img: 'images/hotdog.png'
  },
  {
    name: 'ice-cream',
    img: 'images/ice-cream.png'
  },
  {
    name: 'milkshake',
    img: 'images/milkshake.png'
  },
  {
    name: 'pizza',
    img: 'images/pizza.png'
  },
  {
    name: 'fries',
    img: 'images/fries.png'
  },
  {
    name: 'cheeseburger',
    img: 'images/cheeseburger.png'
  },
  {
    name: 'hotdog',
    img: 'images/hotdog.png'
  },
  {
    name: 'ice-cream',
    img: 'images/ice-cream.png'
  },
  {
    name: 'milkshake',
    img: 'images/milkshake.png'
  },
  {
    name: 'pizza',
    img: 'images/pizza.png'
  }
]
cardArray.sort(() => 0.5 - Math.random())
console.log(cardArray)

let cards
let cardsChosen = []
const cardsWon = []
let score = 0


createBoard()

function createBoard() {
  for (let i = 0; i < cardArray.length; i++) {
    const card = document.createElement('img')
    card.setAttribute('src', 'images/blank.png')
    card.setAttribute('data-id', i.toString())
    card.addEventListener('click', flipCard)
    document.querySelector('#grid').append(card)
    cards = document.querySelectorAll('#grid img')
  }
}

function flipCard() {
  const cardId = this.getAttribute('data-id');
  const card = cardArray[cardId];

  if (cardsChosen.length > 0 && cardId === cardsChosen[0].id) {
    alert('You sneaky bastard')
    return
  }

  cardsChosen.push({id: cardId, name: card.name})
  this.setAttribute('src', card.img)

  if (cardsChosen.length === 2) {
    setTimeout(checkMatch, 500)
  }
}

function checkMatch() {

  console.log('check for a match')
  if (cardsChosen[0].name === cardsChosen[1].name) {
    cards[cardsChosen[0].id].setAttribute('src', 'images/white.png')
    cards[cardsChosen[1].id].setAttribute('src', 'images/white.png')
    cards[cardsChosen[0].id].removeEventListener('click', flipCard)
    cards[cardsChosen[1].id].removeEventListener('click', flipCard)

    cardsWon.push(cardsChosen[0].name)
    score++
    document.querySelector('#score').innerHTML = score.toString()
  } else {
    cards[cardsChosen[0].id].setAttribute('src', 'images/blank.png')
    cards[cardsChosen[1].id].setAttribute('src', 'images/blank.png')
  }

  cardsChosen = []
  document.querySelector('#images-matched').innerHTML = cardsWon.toString()

  if (score === 6) {
    alert('You win!')
  }
}


