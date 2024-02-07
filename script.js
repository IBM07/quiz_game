const API_URL = 'https://opentdb.com/api.php?amount=1&type=multiple';

const questionContainer = document.getElementById('question-container');
const optionsContainer = document.getElementById('options-container');
const submitBtn = document.getElementById('submit-btn');
const resultContainer = document.getElementById('result');

let currentQuestion;
let correctCount = 0;
let wrongCount = 0;

function fetchQuestion() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            currentQuestion = data.results[0];
            displayQuestion(currentQuestion);
        });
}

function displayQuestion(question) {
    questionContainer.innerHTML = `<p class="question">${question.question}</p>`;
    const options = question.incorrect_answers.concat(question.correct_answer);
    options.sort(() => Math.random() - 0.5);
    optionsContainer.innerHTML = '';
    options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.innerText = option;
        optionElement.addEventListener('click', () => selectOption(optionElement));
        optionsContainer.appendChild(optionElement);
    });
}

function selectOption(optionElement) {
    const selectedOption = optionsContainer.querySelector('.selected');
    if (selectedOption) {
        selectedOption.classList.remove('selected');
    }
    optionElement.classList.add('selected');
}

submitBtn.addEventListener('click', () => {
    const selectedOption = optionsContainer.querySelector('.selected');
    if (!selectedOption) {
        alert('Please select an option.');
        return;
    }
    const userAnswer = selectedOption.innerText;
    if (userAnswer === currentQuestion.correct_answer) {
        resultContainer.innerText = 'Correct!';
        correctCount++;
    } else {
        resultContainer.innerText = `Incorrect! The correct answer is: ${currentQuestion.correct_answer}`;
        wrongCount++;
    }
    setTimeout(() => {
        resultContainer.innerText = ''; // Clear result after 2 seconds
        fetchQuestion(); // Fetch next question
        updateScore();
    }, 2000);
});

function updateScore() {
    const scoreElement = document.getElementById('score');
    scoreElement.innerText = `Correct: ${correctCount} | Incorrect: ${wrongCount}`;
}

fetchQuestion();
