const homeSection = document.getElementById('home');
const playBtn = document.getElementById('play-btn');
const questionSection = document.getElementById('question');
const questionHeaderProgressText = document.getElementById('question-header-progress-text');
const questionHeaderProgressBarFilled = document.getElementById('question-header-progress-bar-filled');
const questionHeaderScoreValue = document.getElementById('question-header-score-value');
const questionTitleText = document.getElementById('question-title-text');
const choices = Array.from(document.getElementsByClassName('choice'));
const endSection = document.getElementById('end');
const endScoreValue = document.getElementById('end-score-value');
const restartBtn = document.getElementById('restart-btn');
const homeBtn = document.getElementById('home-btn');

let questions = [
    {
        question: 'Which HTML tag is used to define an inline style?',
        choice1: '<script>',
        choice2: '<css>',
        choice3: '<style>',
        choice4: '<span>',
        answer: 3,
    },
    {
        question: 'Which property is used to change the text color in CSS?',
        choice1: 'text-color',
        choice2: 'font-color',
        choice3: 'text-style',
        choice4: 'color',
        answer: 4,
    },
    {
        question: 'Which of the following is the correct way to comment in HTML?',
        choice1: '// Comment',
        choice2: '<!-- Comment -->',
        choice3: '/* Comment */',
        choice4: '<! Comment>',
        answer: 2,
    },
];

let answeredQuestions = 0;
let score = 0;
let availableQuestions = [];
let acceptingAnswers = false;
let currentQuestion;

const startGame = () => {
    homeSection.classList.add('hide');
    questionSection.classList.remove('hide');
    endSection.classList.add('hide');
    availableQuestions = [...questions];
    answeredQuestions = 0;
    score = 0;
    updateProgressBar();
    getNewQuestion();
};

const getNewQuestion = () => {
    if (availableQuestions.length === 0 || answeredQuestions >= questions.length) {
        homeSection.classList.add('hide');
        questionSection.classList.add('hide');
        endSection.classList.remove('hide');
        endScoreValue.innerText = `Your Score: ${score * 10}`;
        return;
    }

    answeredQuestions++;
    questionHeaderProgressText.innerText = `Question ${answeredQuestions}/${questions.length}`;
    updateProgressBar();

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions.splice(questionIndex, 1)[0];
    questionTitleText.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.id.replace('choice', '');
        choice.innerText = currentQuestion[`choice${number}`];
        choice.dataset['number'] = number;
    });

    acceptingAnswers = true;
};

const updateProgressBar = () => {
    const progress = answeredQuestions / questions.length * 100;
    questionHeaderProgressBarFilled.style.width = `${progress}%`;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;
        acceptingAnswers = false;

        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        const correctAnswer = currentQuestion.answer;

        const classToApply = selectedAnswer === correctAnswer.toString() ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            score++;
            questionHeaderScoreValue.innerText = score * 10;
        }

        selectedChoice.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.classList.remove(classToApply);
            getNewQuestion();
        }, 1500);
    });
});

playBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);
homeBtn.addEventListener('click', () => {
    homeSection.classList.remove('hide');
    questionSection.classList.add('hide');
    endSection.classList.add('hide');
});
