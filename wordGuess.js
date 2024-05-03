const inputs = document.querySelector(".inputs"),
hintTag = document.querySelector(".hint span"),
guessLeft = document.querySelector(".guess-left span"),
wrongLetter = document.querySelector(".wrong-letter span"),
scoreDisplay = document.querySelector(".score span"),
highScoreDisplay = document.getElementById("high-score"),
resetBtn = document.querySelector(".reset-btn"),
typingInput = document.querySelector(".typing-input");

let word,
  maxGuesses,
  incorrectLetters = [],
  correctLetters = [],
  score = 0;

// Load high score from local storage if available
let highScore = localStorage.getItem("highScore") || 0;
highScoreDisplay.innerText = highScore;

function randomWord() {
  let ranItem = wordList[Math.floor(Math.random() * wordList.length)];
  word = ranItem.word;
  maxGuesses = word.length >= 5 ? 10 : 8;
  correctLetters = [];
  incorrectLetters = [];
  hintTag.innerText = ranItem.hint;
  guessLeft.innerText = maxGuesses;
  wrongLetter.innerText = incorrectLetters;
  scoreDisplay.innerText = score;
  let html = "";
  for (let i = 0; i < word.length; i++) {
    html += `<input type="text" disabled>`;
    inputs.innerHTML = html;
  }
}

randomWord();

function initGame(e) {
  let key = e.target.value.toLowerCase();
  if (
    (key.match(/^[A-Za-záéóíúüñÑÁÉÍÚÜÓ\s.,!?¿¡]+$/i) || key === " ") &&
    !incorrectLetters.includes(` ${key}`) &&
    !correctLetters.includes(key)
  ) {
    if (word.includes(key)) {
      for (let i = 0; i < word.length; i++) {
        if (word[i] == key) {
          correctLetters += key;
          inputs.querySelectorAll("input")[i].value = key;
          score += 1;
        }
      }
    } else {
      maxGuesses--;
      incorrectLetters.push(` ${key}`);
      score -= 1;
    }
    guessLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrectLetters;
    scoreDisplay.innerText = score;
  }
  typingInput.value = "";
  setTimeout(() => {
    if (correctLetters.length === word.length) {
      alert(`Congrats! You found the word ${word.toUpperCase()}`);
      if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore); // Update high score in local storage
        highScoreDisplay.innerText = highScore; // Update high score display
      }
      return randomWord();
    } else if (maxGuesses < 1) {
      alert("Game over! You don't have remaining guesses");
      for (let i = 0; i < word.length; i++) {
        inputs.querySelectorAll("input")[i].value = word[i];
      }
    }
  }, 100);
}

resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());

function createButton(character) {
    const button = document.createElement('button');
    button.textContent = character;
    button.addEventListener('click', function() {
      initGame({ target: { value: character } });
      console.log(`Button ${character} clicked`);
    });
    return button;
  }
  
  const specialCharacters = ['á', 'é', 'í', 'ó', 'ú', 'ü', 'ñ', "¡", "¿"];
  
  const container = document.getElementById('special-characters-container');
  
  specialCharacters.forEach(character => {
    const button = createButton(character);
    button.classList.add('special-character-btn'); // Add a class for styling
    container.appendChild(button);
  });

//Upload a text file with your own vocabulary words (format "word, hint" with an enter between lines)
const fileInput = document.getElementById('file-input');

fileInput.addEventListener('change', handleFileSelect);

async function handleFileSelect(event) {
    let wordListArray = []
    const file = await event.target.files[0];
    const reader = new FileReader();

    reader.onload = await function(event) {
        const contents = event.target.result;
        const lines = contents.split('\n');

        // Assuming each line contains a word and a hint separated by a comma
        wordList = lines.map(line => {
            const [word, hint] = line.split(',');
            wordListArray.push ({ word: word.trim(), hint: hint.trim() });
        });
        
        console.log(wordList);
        wordList = wordListArray; // Update the global wordList variable
        randomWord(); 
    };

    reader.readAsText(file);
}
// Using a modal
const modal = document.getElementById("myModal");

// Open the modal
const openModalBtn = document.getElementById("open-modal-btn");

// Close the modal
const closeBtn = document.getElementsByClassName("close")[0];

const customWordInput = document.getElementById('custom-word-input');

openModalBtn.onclick = function() {
  modal.style.display = "block";
  customWordInput.focus(); // Set focus to the input field inside the modal ... not working ... 
}

// Close when user clicks on <span> (x)
closeBtn.onclick = function() {
  modal.style.display = "none";
}

// Close when user clicks anywhere outside of the modal
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Function to add custom word
const addWordBtn = document.getElementById('add-word-btn');

addWordBtn.addEventListener('click', () => {
    const inputText = customWordInput.value.trim();
    const [word, hint] = inputText.split(',');
    if (word && hint) {
        wordList.push({ word: word.trim(), hint: hint.trim() });
        customWordInput.value = '';
        modal.style.display = "none";
    } else {
        alert('Please enter the word and hint separated by a comma.');
    }
});

const classDropdown = document.getElementById('class-dropdown');

classDropdown.addEventListener('change', () => {
    let selectedClass = classDropdown.value;
    console.log("Change Made In Dropdown", selectedClass);
  switch (selectedClass) {
    case 'spanish1-unit-a':
      wordList = spanish1UnitAWordList;
      break;
    case 'spanish1-unit-b':
      wordList = spanish1UnitBWordList;
      break;
      case 'spanish1-unit-c':
      wordList = spanish1UnitCWordList;
      break;
      case 'spanish1-unit-d':
      wordList = spanish1UnitDWordList;
      break;
      case 'spanish1-unit-e':
      wordList = spanish1UnitEWordList;
      break;
      case 'spanish1-unit-f':
      wordList = spanish1UnitFWordList;
      break;
      case 'spanish1-unit-g':
      wordList = spanish1UnitGWordList;
      break;
      case 'spanish1-unit-h':
      wordList = spanish1UnitHWordList;
      break;
      case 'spanish1-unit-i':
      wordList = spanish1UnitIWordList;
      break;
      case 'spanish1-unit-j':
      wordList = spanish1UnitJWordList;
      break;
      case 'spanish1-unit-k':
console.log("K is selected")
      wordList = spanish1UnitKWordList;
      console.log("Wordlist is", wordList)
      break;
    // Build out for the rest of the levels and units
    case 'spanish2-unit-a':
        wordList = spanish2UnitAWordList;
        break;
      case 'spanish2-unit-b':
        wordList = spanish2UnitBWordList;
        break;
        case 'spanish2-unit-c':
        wordList = spanish2UnitCWordList;
        break;
        case 'spanish2-unit-d':
        wordList = spanish2UnitDWordList;
        break;
        case 'spanish2-unit-e':
        wordList = spanish2UnitEWordList;
        break;
        case 'spanish2-unit-f':
        wordList = spanish2UnitFWordList;
        break;
        case 'spanish2-unit-g':
        wordList = spanish2UnitGWordList;
        break;
        case 'spanish2-unit-h':
        wordList = spanish2UnitHWordList;
        break;
        case 'spanish3-unit-a':
        wordList = spanish3UnitAWordList;
        break;
        case 'spanish3-unit-b':
        wordList = spanish3UnitBWordList;
        break;
        case 'spanish3-unit-c':
        wordList = spanish3UnitCWordList;
        break;
        case 'spanish3-unit-d':
        wordList = spanish3UnitDWordList;
        break;
        case 'spanish3-unit-e':
        wordList = spanish3UnitEWordList;
        break;
        case 'spanish4-unit-a':
        wordList = spanish4UnitAWordList;
        break;
        case 'spanish4-unit-b':
        wordList = spanish4UnitBWordList;
        break;
        case 'spanish4-unit-c':
        wordList = spanish4UnitCWordList;
        break;
        case 'spanish4-unit-d':
        wordList = spanish4UnitDWordList;
        break;
        case 'spanish4-unit-e':
        wordList = spanish4UnitEWordList;
        break;
        case 'spanish4-unit-f':
        wordList = spanish4UnitFWordList;
        break;
        case 'ap-spanish-unit-a':
        wordList = apSpanishUnitAWordList;
        break;
        case 'ap-spanish-unit-b':
        wordList = apSpanishUnitBWordList;
        break;
        case 'ap-spanish-unit-c':
        wordList = apSpanishUnitCWordList;
        break;
        case 'ap-spanish-unit-d':
        wordList = apSpanishUnitDWordList;
        break;
        case 'ap-spanish-unit-e':
        wordList = apSpanishUnitEWordList;
        break;
        case 'ap-spanish-unit-f':
        wordList = apSpanishUnitFWordList;
        break;
    default:
      wordList = defaultWordList;
  }
  randomWord();
});