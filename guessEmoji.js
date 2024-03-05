const emojiContent = [
    { emoji: '😂', description: 'Laughing Face' },
    { emoji: '😀', description: 'Grinning smile' },
    { emoji: '😍', description: 'Heart eyes' },
    { emoji: '😘', description: 'Kissing Face' },
    { emoji: '🤑', description: 'Money Face' },
];

let currentEmojiIndex = 0, score = 0, timerValue = 10;
let timerID; 

const inputEmoji = document.querySelector('#emoji-box');
const resultElement = document.querySelector('#result');
const inputValue = document.querySelector('.input-box');
const timerElement = document.querySelector('#timer');

function displayEmoji() {
    inputEmoji.textContent = emojiContent[currentEmojiIndex].emoji;
}

function checkGuess() {
    const guess = inputValue.value.trim().toLowerCase();
    const currentEmoji = emojiContent[currentEmojiIndex].description.trim().toLowerCase();
    if (guess === currentEmoji) {
        score++;
        resultElement.textContent = `Correct! Score: ${score}`;
        nextEmoji();
    } else {
        resultElement.textContent = `Wrong. Score: ${score}`;
    }
    inputValue.value = '';
    inputValue.focus();
}

function nextEmoji() {
    currentEmojiIndex++;
    if (currentEmojiIndex === emojiContent.length) {
        currentEmojiIndex = 0; 
    }
    displayEmoji();
}

function reStart() {
    currentEmojiIndex = 0;
    score = 0;
    timerValue = 10;
    clearInterval(timerID); // Clear any existing timer
    StartTimer();
    displayEmoji();
    resultElement.textContent = `Score: ${score}`;
    timerElement.textContent = `Timer: ${timerValue}`;
    inputValue.disabled = false;
}

function StartTimer() {
    timerElement.textContent = `Timer: ${timerValue}`; // Initialize timer display
    timerID = setInterval(() => {
        timerValue--;
        timerElement.textContent = `Timer: ${timerValue}`;
        if (timerValue <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(timerID);
    inputValue.disabled = true;
    resultElement.textContent = `Time's up! Final Score: ${score}`;
}

// Initialize game
displayEmoji();
reStart(); // Use reStart to initialize the game so timer starts correctly

document.querySelector('.input-box').addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        checkGuess();
    }
});

document.querySelector('.button').addEventListener('click', reStart);
