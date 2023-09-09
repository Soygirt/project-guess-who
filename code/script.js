// All the DOM selectors stored as short variables
const board = document.getElementById('board')
const questions = document.getElementById('questions')
const restartButton = document.getElementById('restart')
const findOut = document.getElementById('filter')
const winOrLose = document.getElementById('winOrLose')
const guessbtn = document.getElementsByClassName(`filled-button small`)
const playAgain = document.getElementById(`playAgain`)

// Array with all the characters, as objects
const CHARACTERS = [
  {
    name: 'Jabala',
    img: 'images/jabala.svg',
    hair: 'hidden',
    eyes: 'hidden',
    accessories: ['glasses', 'hat'],
    other: []
  },
  {
    name: 'Jack',
    img: 'images/jack.svg',
    hair: 'hidden',
    eyes: 'blue',
    accessories: ['hat'],
    other: []
  },
  {
    name: 'Jacques',
    img: 'images/jacques.svg',
    hair: 'grey',
    eyes: 'blue',
    accessories: ['hat'],
    other: ['smoker']
  },
  {
    name: 'Jai',
    img: 'images/jai.svg',
    hair: 'black',
    eyes: 'brown',
    accessories: [],
    other: []
  },
  {
    name: 'Jake',
    img: 'images/jake.svg',
    hair: 'yellow',
    eyes: 'green',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'James',
    img: 'images/james.svg',
    hair: 'brown',
    eyes: 'green',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jana',
    img: 'images/jana.svg',
    hair: 'black',
    eyes: 'hidden',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jane',
    img: 'images/jane.svg',
    hair: 'yellow',
    eyes: 'hidden',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jaqueline',
    img: 'images/jaqueline.svg',
    hair: 'orange',
    eyes: 'green',
    accessories: ['glasses'],
    other: []
  },

  {
    name: 'Jazebelle',
    img: 'images/jazebelle.svg',
    hair: 'purple',
    eyes: 'hidden',
    accessories: ['glasses'],
    other: ['smoker']
  },
  {
    name: 'Jean',
    img: 'images/jean.svg',
    hair: 'brown',
    eyes: 'blue',
    accessories: ['glasses', 'hat'],
    other: ['smoker']
  },
  {
    name: 'Jeane',
    img: 'images/jeane.svg',
    hair: 'brown',
    eyes: 'green',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jed',
    img: 'images/jed.svg',
    hair: 'orange',
    eyes: 'green',
    accessories: ['glasses', 'hat'],
    other: ['smoker']
  },
  {
    name: 'Jenni',
    img: 'images/jenni.svg',
    hair: 'white',
    eyes: 'hidden',
    accessories: ['hat'],
    other: []
  },
  {
    name: 'Jeri',
    img: 'images/jeri.svg',
    hair: 'orange',
    eyes: 'green',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jerry',
    img: 'images/jerry.svg',
    hair: 'hidden',
    eyes: 'blue',
    accessories: ['hat'],
    other: []
  },
  {
    name: 'Jess',
    img: 'images/jess.svg',
    hair: 'black',
    eyes: 'blue',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jocelyn',
    img: 'images/jocelyn.svg',
    hair: 'black',
    eyes: 'brown',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jon',
    img: 'images/jon.svg',
    hair: 'brown',
    eyes: 'green',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jordan',
    img: 'images/jordan.svg',
    hair: 'yellow',
    eyes: 'hidden',
    accessories: ['glasses', 'hat'],
    other: []
  },
  {
    name: 'Josephine',
    img: 'images/josephine.svg',
    hair: 'grey',
    eyes: 'brown',
    accessories: [],
    other: []
  },
  {
    name: 'Josh',
    img: 'images/josh.svg',
    hair: 'yellow',
    eyes: 'green',
    accessories: [],
    other: []
  },
  {
    name: 'Jude',
    img: 'images/jude.svg',
    hair: 'black',
    eyes: 'green',
    accessories: [],
    other: []
  },
  {
    name: 'Julie',
    img: 'images/julie.svg',
    hair: 'black',
    eyes: 'brown',
    accessories: ['glasses', 'hat'],
    other: []
  },
]

// Global variables
let secret
let currentQuestion
let charactersInPlay

// Draw the game board
const generateBoard = () => {
  board.innerHTML = ''
  charactersInPlay.forEach((person) => {
    board.innerHTML += `
      <div class="card">
        <p>${person.name}</p>
        <img src=${person.img} alt=${person.name}>
        <div class="guess">
          <span>Guess on ${person.name}?</span>
          <button class="filled-button small" onclick="guess('${person.name}')">Guess</button>
        </div>
      </div>
    `
  })
}




// Randomly select a person from the characters array and set as the value of the variable called secret
const setSecret = () => {
  secret = charactersInPlay[Math.floor(Math.random() * charactersInPlay.length)]

  console.log(`secret person is ${secret.name}`); //helps me to see who the secret person is.
}

// This function to start (and restart) the game
const start = () => {
  // Here we're setting charactersInPlay array to be all the characters to start with
  charactersInPlay = CHARACTERS
  generateBoard();
  setSecret();


  // What else should happen when we start the game?
}

// setting the currentQuestion object when you select something in the dropdown

const selectQuestion = () => {
  const category = questions.options[questions.selectedIndex].parentNode.label

  const value = questions.value;
  // This variable stores what option group (category) the question belongs to.
  // We also need a variable that stores the actual value of the question we've selected.
  // const value =

  currentQuestion = {
    category: category,
    value: value,
  }
}

// Function to check the selected question
const checkQuestion = () => {
  const { category, value } = currentQuestion

  //compares question to the secret person
  let keep = false;

  if (category === 'hair' || category === 'eyes') {

    keep = value === secret[category];

  } else if (category === 'accessories' || category === 'other') {
    keep = secret[category].includes(value);
  }

  filterCharacters(keep);
};

// This function filters characters array and redraw the game board.
const filterCharacters = (keep) => {
  const { category, value } = currentQuestion

  //accesories
  if (category === 'accessories') {
    if (keep) {

      charactersInPlay = charactersInPlay.filter((person) => person[category].includes(value))
      alert(
        `Yes, the person wears ${value}! Keep all people that wears ${value}`
      )
    } else {
      charactersInPlay = charactersInPlay.filter((person) => !person[category].includes(value))//doesn't remove them
      alert(
        `No, the person doesn't wear ${value}! Remove all people that wears ${value}`
      )
    } //other/smoker
  } else if (category === 'other') {
    if (keep) {
      charactersInPlay = charactersInPlay.filter((person) => person[category].includes(value))
      alert(`Yes! The person is a ${value}! Let's remove all non-smokers!`) //doesn't remove them
    } else {
      charactersInPlay = charactersInPlay.filter((person) => !person[category].includes(value)) //doesn't remove them
      alert(`Noo, this is a healthy person who's not a ${value}. Let's remove all smokers!`)
    }

  } else {
    if (keep) { //hair and eyes
      charactersInPlay = charactersInPlay.filter((person) => person[category] === value)
      alert(`Yes! The person has ${value} ${category}! Let's keep all people with ${value} ${category}.`)

    } else {
      charactersInPlay = charactersInPlay.filter((person) => person[category] !== value)
      alert(`No, the person doesn't have ${value} ${category}! Let's remove all people with ${value} ${category}.`)

    }
    generateBoard();
  }

  // Determine what is the category
  // filter by category to keep or remove based on the keep variable.
  /* 
    for hair and eyes :
      charactersInPlay = charactersInPlay.filter((person) => person[attribute] === value)
      or
      charactersInPlay = charactersInPlay.filter((person) => person[attribute] !== value)

    for accessories and other
      charactersInPlay = charactersInPlay.filter((person) => person[category].includes(value))
      or
      charactersInPlay = charactersInPlay.filter((person) => !person[category].includes(value))
  */

  // Invoke a function to redraw the board with the remaining people.
}

// when clicking guess, the player first have to confirm that they want to make a guess.
const guess = (personToConfirm) => {
  const isConfirmed = confirm(`Are you sure you want to guess that ${personToConfirm} is the secret person?`);

  if (isConfirmed) {
    checkMyGuess(personToConfirm)
  }
  // store the interaction from the player in a variable.
  // remember the confirm() ?
  // If the player wants to guess, invoke the checkMyGuess function.
}


// If you confirm, this function is invoked
const checkMyGuess = (personToCheck) => {
  if (personToCheck === secret.name) {
    winOrLose.style.display = "flex";
    board.style.display = 'none';
    winOrLoseText.innerHTML += `<h1>Congratulations! Your guess is right and you WON! 🏆</h1>`
  } else {
    winOrLose.style.display = "flex";
    board.style.display = 'none';
    winOrLoseText.innerHTML += `<h1>Your guess is unfortunately wrong 😞 Do you wanna try again?</h1>`
  }

}

// 1. Check if the personToCheck is the same as the secret person's name
// 2. Set a Message to show in the win or lose section accordingly
// 3. Show the win or lose section
// 4. Hide the game board

// Invokes the start function when website is loaded
start();

const replay = () => {
  location.reload();

  //winOrLose.style.display = `none`;
  //generateBoard(CHARACTERS);
  //start();

}



// All the event listeners
restartButton.addEventListener('click', start); //resets the board when the restart button is clicked.

questions.addEventListener('click', selectQuestion); //Does this work? Error in console on website.

findOut.addEventListener('click', checkQuestion); //Invokes the checkQuestion when "find out button" is clicked.

playAgain.addEventListener(`click`, replay); //loads the board for a new game when the play again button is clicked.