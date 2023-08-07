const quizSelector = document.getElementById("quiz-selector");
const quizContainer = document.getElementById("quiz-container");
const questionContainer = document.getElementById("question-container");
const answerButtonContainer = document.getElementById("answer-button-container");
const resultsContainer = document.getElementById("results-container");

const loadAllQuiz = async () => {
    const response = await fetch("./quizzes.json")
    const quizzes = await response.json()

    quizzes.forEach((quiz, index) => {
        const quizCard = document.createElement("div");
        quizCard.classList = ["quiz-card"];
        quizCard.innerText = "Quiz" + (index + 1);
        quizCard.addEventListener("click", () => loadQuiz(quiz))
        quizSelector.appendChild(quizCard)
    });
}

loadAllQuiz()

const loadQuiz = (questions) => {
    const quiz = new Quiz(questions);
    quizContainer.style.display = "block";
    quizSelector.style.display = "none"
}

class Quiz {
    constructor(questions) {
        this.questions = questions
        this.currentQuestionIndex = 0
        this.score
    }

    displayQuestion() {
        answerButtonContainer.innerHTML = "";
        const currentQuestion = this.questions[this.currentQuestionIndex];
        questionContainer.textContent = currentQuestion.question
        const answers = currentQuestion.answer
        answers.forEach((answer) => {
            const button = document.createElement("button");
            button.classList = ["answer-button"];
            button.textContent = answer;
            button.addEventListener("click", this.checkAnswer.bind(this));
            answerButtonContainer.appendChild(button)
        })
    }

    checkAnswer(event) {
        const selectedAnswer = event.target.textContent
        const currentQuestion = this.questions[this.currentQuestionIndex]
        if (selectedAnswer === currentQuestion) {
            this.score++
        }
        this.currentQuestionIndex++
    }
}
