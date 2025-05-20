/**
 * QuizQuest - Simplified JavaScript
 * Handles quiz functionality, image slider, and results display
 */

// Quiz questions data - can be loaded from external source in production
const quizQuestions = [
    {
        question: "Which planet in our solar system is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: "Mars"
    },
    {
        question: "What is the capital city of Australia?",
        options: ["Sydney", "Melbourne", "Canberra", "Perth"],
        correctAnswer: "Canberra"
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correctAnswer: "Leonardo da Vinci"
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        options: ["Gold", "Oxygen", "Osmium", "Oganesson"],
        correctAnswer: "Oxygen"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correctAnswer: "Pacific Ocean"
    }
];

// Global variables
let userAnswers = [];
let currentQuestionIndex = 0;

// Execute when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Determine current page and run appropriate functions
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === 'index.html' || currentPage === '') {
        initializeSlider();
    } else if (currentPage === 'quiz.html') {
        initializeQuiz();
    } else if (currentPage === 'results.html') {
        displayResults();
    }
});

/**
 * HOME PAGE FUNCTIONS
 * Image slider functionality 
 */
function initializeSlider() {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;
    
    // Show a specific slide and hide others
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }
    
    // Set up navigation buttons if they exist
    if (prevBtn && nextBtn) {
        // Previous button click
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        });
        
        // Next button click
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        });
        
        // Auto rotation every 5 seconds
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);
    }
}

/**
 * QUIZ PAGE FUNCTIONS
 * Handles all quiz functionality
 */
function initializeQuiz() {
    // Reset answers from previous attempts
    userAnswers = Array(quizQuestions.length).fill(null);
    sessionStorage.removeItem('userAnswers');
    
    // Get DOM elements
    const questionContainer = document.querySelector('.question-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    const validationMsg = document.getElementById('validation-message');
    const progressBar = document.querySelector('.progress');
    
    // Create all question elements
    createQuestions();
    
    // Initialize the first question
    showQuestion(0);
    updateProgressBar();
    
    // Previous button event
    prevBtn.addEventListener('click', () => {
        showQuestion(currentQuestionIndex - 1);
        updateProgressBar();
    });
    
    // Next button event
    nextBtn.addEventListener('click', () => {
        // Validate answer selection
        if (!userAnswers[currentQuestionIndex]) {
            validationMsg.style.display = 'block';
            return;
        }
        
        validationMsg.style.display = 'none';
        showQuestion(currentQuestionIndex + 1);
        updateProgressBar();
    });
    
    // Form submission event
    document.getElementById('quiz-form').addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validate final answer
        if (!userAnswers[currentQuestionIndex]) {
            validationMsg.style.display = 'block';
            return;
        }
        
        // Save answers and redirect
        sessionStorage.setItem('userAnswers', JSON.stringify(userAnswers));
        window.location.href = 'results.html';
    });
    
    /**
     * Creates all question elements in the DOM
     */
    function createQuestions() {
        quizQuestions.forEach((q, index) => {
            // Create question container
            const questionDiv = document.createElement('div');
            questionDiv.className = 'question';
            questionDiv.id = `question-${index}`;
            
            // Add question title
            const questionTitle = document.createElement('h3');
            questionTitle.textContent = `Question ${index + 1}: ${q.question}`;
            
            // Create options list
            const optionsList = document.createElement('ul');
            optionsList.className = 'options-list';
            
            // Create each option
            q.options.forEach((option, optionIndex) => {
                // Create list item
                const optionItem = document.createElement('li');
                optionItem.className = 'option';
                
                // Create label and radio button
                const label = document.createElement('label');
                const radio = document.createElement('input');
                radio.type = 'radio';
                radio.name = `question-${index}`;
                radio.value = option;
                radio.id = `q${index}-option${optionIndex}`;
                
                // Event handler for selection
                radio.addEventListener('change', () => {
                    userAnswers[index] = option;
                    validationMsg.style.display = 'none';
                });
                
                // Assemble the option element
                label.appendChild(radio);
                label.appendChild(document.createTextNode(option));
                optionItem.appendChild(label);
                optionsList.appendChild(optionItem);
            });
            
            // Assemble the question element
            questionDiv.appendChild(questionTitle);
            questionDiv.appendChild(optionsList);
            questionContainer.appendChild(questionDiv);
        });
    }
    
    /**
     * Shows a specific question and updates navigation
     */
    function showQuestion(index) {
        // Hide all questions
        document.querySelectorAll('.question').forEach(q => q.classList.remove('active'));
        
        // Update current index
        currentQuestionIndex = index;
        
        // Show current question
        document.getElementById(`question-${index}`).classList.add('active');
        
        // Update button states
        prevBtn.disabled = index === 0;
        
        // Show submit button on last question
        if (index === quizQuestions.length - 1) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'block';
        } else {
            nextBtn.style.display = 'block';
            submitBtn.style.display = 'none';
        }
    }
    
    /**
     * Updates the progress bar based on current question
     */
    function updateProgressBar() {
        const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
        progressBar.style.width = `${progress}%`;
    }
}

/**
 * RESULTS PAGE FUNCTIONS
 * Handles result display and analysis
 */
function displayResults() {
    // Get user answers from session storage
    const storedAnswers = sessionStorage.getItem('userAnswers');
    
    // Redirect if no answers found
    if (!storedAnswers) {
        setTimeout(() => window.location.href = 'quiz.html', 2000);
        return;
    }
    
    // Parse answers
    userAnswers = JSON.parse(storedAnswers);
    
    // Calculate score with a slight delay to show loading animation
    setTimeout(() => {
        // Get DOM elements
        const scoreDisplay = document.getElementById('score-display');
        const feedbackElement = document.getElementById('feedback');
        const answerReview = document.getElementById('answer-review');
        
        // Calculate score
        let score = userAnswers.reduce((total, answer, index) => {
            return answer === quizQuestions[index].correctAnswer ? total + 1 : total;
        }, 0);
        
        // Clear loading animation
        scoreDisplay.innerHTML = '';
        
        // Create and display score
        const scoreHTML = `
            <div class="score-circle">
                <div class="score-text">${score}/${quizQuestions.length}</div>
                <div>Correct</div>
            </div>
        `;
        scoreDisplay.innerHTML = scoreHTML;
        
        // Generate appropriate feedback
        let feedback;
        const scorePercentage = score / quizQuestions.length;
        
        if (scorePercentage === 1) {
            feedback = 'Perfect! You got all questions correct. Impressive!';
        } else if (scorePercentage >= 0.7) {
            feedback = 'Great job! You have a good knowledge of these topics.';
        } else if (scorePercentage >= 0.5) {
            feedback = 'Not bad! You got more than half right.';
        } else {
            feedback = 'You might want to try again to improve your score.';
        }
        
        feedbackElement.textContent = feedback;
        
        // Create answer review section
        answerReview.innerHTML = '<h3>Review Your Answers</h3>';
        
        // Build each answer review item
        quizQuestions.forEach((q, index) => {
            const isCorrect = userAnswers[index] === q.correctAnswer;
            const answerItem = document.createElement('div');
            answerItem.className = 'answer-item';
            
            // Create HTML for this answer review
            answerItem.innerHTML = `
                <h4>Question ${index + 1}: ${q.question}</h4>
                <p>Your answer: <span class="${isCorrect ? 'correct' : 'incorrect'}">${userAnswers[index]}</span></p>
                ${!isCorrect ? `<p>Correct answer: <span class="correct">${q.correctAnswer}</span></p>` : ''}
            `;
            
            answerReview.appendChild(answerItem);
        });
    }, 1000); // 1 second delay for loading effect
}