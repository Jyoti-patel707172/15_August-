document.addEventListener('DOMContentLoaded', () => {
    const poppage = document.getElementById("poppage");
    const usernameInput = document.getElementById('usernameInput');
    const startButton = document.getElementById('startButton');
    

    function openpop() {
        poppage.classList.add("open-popup");
        poppage.style.display = 'flex';
    }

    function startgame() {
        const username = usernameInput.value;
        if (username.trim() !== '') {
            // Store the username in local storage
            localStorage.setItem('username', username);
            
            window.location.href = "quiz.html";
        } else {
            alert('Please enter your username');
        }
    }

    usernameInput.addEventListener('input', () => {
    
        startButton.disabled = usernameInput.value.trim() === '';
    });

    window.openpop = openpop; // Expose openpop to global scope for onclick
    window.startgame = startgame; // Expose startgame to global scope for onclick
});


const questions = [

    {
        question: "Who is known as the 'Father of the Nation' in India?",
        options: ["Bhagat Singh", "Subhas Chandra Bose", "Mahatma Gandhi", "Jawaharlal Nehru"],
        correct: 2
    },
    {
        question: "Which freedom fighter is known for his role in the Chittagong Uprising?",
        options: ["Rajguru", "Jatin Das", "Surya Sen", "Lala Lajpat Rai"],
        correct: 2
    },
    {
        question: "Who was the leader of the Indian National Army (INA)?",
        options: ["Mohandas Karamchand Gandhi", "Subhas Chandra Bose", "Jawaharlal Nehru", "Bhagat Singh"],
        correct: 1
    },
    {
        question: "Who was a prominent figure in the Jallianwala Bagh massacre?",
        options: ["Lord Mountbatten", "General Dyer", "Winston Churchill", "Edward VII"],
        correct: 1
    },
    {
        question: "Which freedom fighter led the Non-Cooperation Movement?",
        options: ["Jawaharlal Nehru", "Sardar Patel", "Mahatma Gandhi", "Subhas Chandra Bose"],
        correct: 2
    },
    {
        question: "Who is known for his role in the Indian Rebellion of 1857?",
        options: ["Rani Lakshmibai", "Mangal Pandey", "Tatya Tope", "All of the above"],
        correct: 3
    },
    {
        question: "Which freedom fighter was a close associate of Gandhi and led the Salt March?",
        options: ["Jawaharlal Nehru", "Sardar Patel", "Lala Lajpat Rai", "Vinoba Bhave"],
        correct: 1
    },
    {
        question: "Who was known as the 'Punjab Kesari'?",
        options: ["Lala Lajpat Rai", "Bhagat Singh", "Chandrashekhar Azad", "Bal Gangadhar Tilak"],
        correct: 0
    },
    {
        question: "Which leader was a major proponent of Hindu-Muslim unity in the early 20th century?",
        options: ["Mohammed Ali Jinnah", "Jawaharlal Nehru", "Mahatma Gandhi", "Allama Iqbal"],
        correct: 2
    },
    {
        question: "Who led the Kakori Train Robbery?",
        options: ["Bhagat Singh", "Chandrashekhar Azad", "Rajguru", "Ram Prasad Bismil"],
        correct: 3
    },
    {
        question: "Who was the first woman president of the Indian National Congress?",
        options: ["Sarojini Naidu", "Annie Besant", "Vijayalakshmi Pandit", "Kamaladevi Chattopadhyay"],
        correct: 1
    },
    {
        question: "Who is remembered for the slogan 'Give me blood, and I will give you freedom'?",
        options: ["Bhagat Singh", "Subhas Chandra Bose", "Chandrashekhar Azad", "Lala Lajpat Rai"],
        correct: 3
    },
    {
        question: "Which freedom fighter was imprisoned for his role in the Quit India Movement?",
        options: ["Jawaharlal Nehru", "Mahatma Gandhi", "Subhas Chandra Bose", "Rajguru"],
        correct: 1
    },
    {
        question: "Who is known for the concept of 'Hind Swaraj'?",
        options: ["Mahatma Gandhi", "Bal Gangadhar Tilak", "Jawaharlal Nehru", "Subhas Chandra Bose"],
        correct: 0
    },
    {
        question: "Which freedom fighter's assassination led to nationwide protests?",
        options: ["Mahatma Gandhi", "Bhagat Singh", "Subhas Chandra Bose", "Lala Lajpat Rai"],
        correct: 0
    },
    {
        question: "Who was a prominent leader of the Indian independence movement in Maharashtra?",
        options: ["Bal Gangadhar Tilak", "Gopal Krishna Gokhale", "Lala Lajpat Rai", "Bipin Chandra Pal"],
        correct: 0
    },
    {
        question: "Which freedom fighter was also a prominent journalist and social reformer?",
        options: ["Aurobindo Ghosh", "Jawaharlal Nehru", "Bhagat Singh", "M.K. Gandhi"],
        correct: 0
    },
    {
        question: "Who is remembered for his efforts in the Indian Renaissance and freedom struggle?",
        options: ["Raja Ram Mohan Roy", "Swami Vivekananda", "Bankim Chandra Chattopadhyay", "Rabindranath Tagore"],
        correct: 0
    },
    {
        question: "Who was known for the revolutionary activities of the Hindustan Socialist Republican Association (HSRA)?",
        options: ["Ram Prasad Bismil", "Chandrashekhar Azad", "Bhagat Singh", "All of the above"],
        correct: 3
    },
    {
        question: "Which freedom fighter founded the Indian Home Rule Movement?",
        options: ["Annie Besant", "Bal Gangadhar Tilak", "Mahatma Gandhi", "Jawaharlal Nehru"],
        correct: 1
    }
];

const questionElement = document.getElementById("quiz-question");
const answerButton = document.getElementById("answer-button");
const submitButton1 = document.getElementById("submit1");
const submitButton2 = document.getElementById("submit2");
const quizSectionHeader = document.querySelector(".Simpleword");
const emoji1 = document.getElementById("emoji1");
const emoji2 = document.getElementById("emoji2");
const emoji3 = document.getElementById("emoji3");
const emoji4= document.getElementById("emoji4");
const username = localStorage.getItem('username');
const myAudio= document.getElementById("myAudio");

 


let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    submitButton1.innerHTML = "Next";
    submitButton2.innerHTML = "Back";
    quizSectionHeader.style.display = "block";
    
    showQuestion();
    emoji1.style.display="none";
    emoji2.style.display="none";
    emoji3.style.display="none";
    emoji4.style.display="none";

    
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + " . " + currentQuestion.question;

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.innerHTML = option;
        button.classList.add("btn");
        button.addEventListener('click', () => checkAnswer(index));
        answerButton.appendChild(button);
    });
}

function resetState() {
    submitButton1.style.display = "none";
    submitButton2.style.display = "none";
   
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);


    }
}

function checkAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedIndex === currentQuestion.correct) {
        score++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    resetState();
    quizSectionHeader.style.display = "none";

    // Determine the color based on the score
    let scoreColor;
    if (score <= 10) {

        if(score <=5){
            emoji1.style.display = "block";

        }
        else{
            emoji2.style.display = "block";
           

        }
        scoreColor = "#d9534f"; // Red color
    } if(score >10){
        if(score<=15){
            emoji3.style.display = "block";

        }
        else{
            emoji4.style.display = "block";
            myAudio.play().catch(error => {
                console.error('Autoplay blocked or failed:', error);
              });

        }
        scoreColor = "#0FFF50"; // Green color
    }

    questionElement.innerHTML = `<span style="font-size: 30px;">${username} scored <span style="color: ${scoreColor};">${score}</span> out of ${questions.length}</span> `;
    submitButton1.innerHTML = "Play Again";
    submitButton1.style.display = "block";
    submitButton2.innerHTML = "Home Page";
    submitButton2.style.display = "block";


    // Add event listener to play again
    submitButton1.addEventListener('click', () => startQuiz());
    submitButton2.addEventListener('click', () => window.location.href = "home.html"); // Go to home page
}


document.addEventListener('DOMContentLoaded', startQuiz);




