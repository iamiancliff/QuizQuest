# QuizQuest

QuizQuest is a responsive three-page interactive quiz website built with HTML5, CSS3, and JavaScript. The website allows users to test their knowledge by answering multiple-choice questions on general knowledge topics.

## Live Demo
[View Live Demo](https://iamiancliff.github.io/QuizQuest/)

## Features

- **Responsive Design**: Works on both mobile and desktop devices
- **Three Pages**:
  - Home page with features overview and image slider
  - Quiz page with interactive multiple-choice questions
  - Results page showing score and answer review
- **Semantic HTML5 Structure**: Uses modern HTML5 elements like `<header>`, `<nav>`, `<main>`, and `<footer>`
- **CSS3 Styling**: Features a clean, modern design with flexbox for layouts
- **JavaScript Functionality**:
  - One question displayed at a time
  - Form validation to ensure all questions are answered
  - Score calculation and display
  - Answer review with correct/incorrect indicators
  - Image slider on the home page

## Setup Instructions

1. **Clone the repository**
   ```
   git clone https://github.com/iamiancliff/QuizQuest.git
   cd quiz-master
   ```

2. **Open in a browser**
   - Simply open the `index.html` file in your web browser to start using the website locally
   - Alternatively, you can use a local development server like Live Server in Visual Studio Code

3. **Deploy to GitHub Pages**
   - Create a new repository on GitHub
   - Push your code to the repository
   - Go to Settings > Pages
   - Select the main branch as the source
   - Save the settings to deploy your website

## Project Structure

```
quiz-quest/
├── index.html          # Home page
├── quiz.html           # Quiz page
├── results.html        # Results page
├── styles.css          # CSS stylesheet
├── script.js           # JavaScript functionality
├── images/             # Image assets
│   ├── quiz-1.jpg
│   ├── quiz-2.jpg
│   └── quiz-3.jpg
└── README.md           # Project documentation
```

## Customization

### Changing Quiz Questions

To add or modify quiz questions, edit the `quizQuestions` array in the `script.js` file:

```javascript
const quizQuestions = [
    {
        question: "Your question here?",
        options: ["Option 1", "Option 2", "Option 3", "Option 4"],
        correctAnswer: "Correct option here"
    },
    // Add more questions...
];
```

### Modifying Color Scheme

The color scheme can be easily changed by editing the CSS variables in the `:root` selector in the `styles.css` file:

```css
:root {
    --primary-color: #4361ee;
    --secondary-color: #3f37c9;
    --accent-color: #4cc9f0;
    /* More color variables... */
}
```

## Common Issues and Debugging

- **Radio buttons not registering**: Make sure each question's radio buttons have a unique `name` attribute
- **CSS layout breaking on mobile**: Check that all responsive media queries are properly set up
- **Images not displaying**: Verify that image paths are correct relative to your HTML files
- **Quiz not progressing**: Check the JavaScript console for errors in the event listeners

## Author

Created by Ian Cliff Wende as a web development learning project.
