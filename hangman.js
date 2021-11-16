var dictword = [
    "ARITHMETIC", "APPEARANCE","CONTAINERS","BILINGUAL","EQUIVALENCE","FAVORISTISM","ILLEGIBLE",
    "MANNERISM","OCCASIONALLY","METHODOLOGY","NEEDLELIKE","PUZZLING","BOTHERSOME","RICE","PASTE",
    "PYTHON","BIRD","KOTLIN","VARIABLE","CONSTANT"]

let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

function randomWord() {
    answer = dictword[Math.floor(Math.random() * dictword.length)];
}

function generateButtons() {
    let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('').map(letter =>
        `
        <button
          class="btn btn-lg btn-primary m-2"
          id='` + letter + `'
          onClick="handleGuess('` + letter + `')">
          ` + letter + `
        </button>
      `).join('');

    document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function handleGuess(chosenLetter) {
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
    document.getElementById(chosenLetter).setAttribute('disabled', true);

    if (answer.indexOf(chosenLetter) >= 0) {
        guessedWord();
        updateifwon(); 
    } else if (answer.indexOf(chosenLetter) === -1) {
        mistakes++;
        updatemistakes();
        updateiflost();
        updatehangmanpic();
    }
}
function updatehangmanpic() {
    document.getElementById('hangmanPic').src = "./image-hangman/" + mistakes + '.jpg';
}
function updateifwon() {
    if (wordStatus === answer) {
        document.getElementById('keyboard').innerHTML = "You Won!!!"
    }
}

function updateiflost() {
    if (mistakes === maxWrong) {
        document.getElementById('wordSpotlight').innerHTML = answer;
        document.getElementById('keyboard').innerHTML = "You Lost!!!"
    }
}

function guessedWord() {
    wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : ' __ ')).join('');
    document.getElementById("wordSpotlight").innerHTML = wordStatus;
}

function updatemistakes() {
    document.getElementById('mistakes').innerHTML = mistakes;
}

function reset() {
    mistakes = 0;
    guessed = [];
    document.getElementById('hangmanPic').src = "./image-hangman/0.jpg";

    randomWord()
    generateButtons()
    guessedWord()
    updatemistakes()
}

document.getElementById('maxWrong').innerHTML = maxWrong;

randomWord()
generateButtons()
guessedWord()