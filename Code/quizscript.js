const questions = [
    {
        question: "How many Amur Leopards do you think are left on this planet?",
        optionA: "85",
        optionB: "140",
        optionC: "5000",
        optionD: "7",
        correctOption: "optionA"
    },

    {
        question: "How many Javan rhinoss do you think are left on this planet?",
        optionA: "100",
        optionB: "60",
        optionC: "9",
        optionD: "1200",
        correctOption: "optionB"
    },

    {
        question: "How many sumatran orangutans do you think are left on this planet?",
        optionA: "840",
        optionB: "3900",
        optionC: "10",
        optionD: "7500",
        correctOption: "optionD"
    },

    {
        question: "How many Gorillas do you think are left on this planet?",
        optionA: "10",
        optionB: "2000",
        optionC: "5000",
        optionD: "100",
        correctOption: "optionC"
    },

    {
        question: "How many Saolas do you think are left on this planet?",
        optionA: "219",
        optionB: "380",
        optionC: "60",
        optionD: "750",
        correctOption: "optionD"
    },

    {
        question: "How many Vaquitas do you think are left on this planet?",
        optionA: "10",
        optionB: "400",
        optionC: "50",
        optionD: "1000",
        correctOption: "optionA"
    },

    {
        question: "How many Sunda Tigers do you think are left on this planet?",
        optionA: "5000",
        optionB: "3023",
        optionC: "400",
        optionD: "20",
        correctOption: "optionC"
    },

    {
        question: "How many Yangtze Finless Porpoises do you think are left on this planet?",
        optionA: "1800",
        optionB: "900",
        optionC: "6750",
        optionD: "90",
        correctOption: "optionA"
    },

    {
        question: "How many Turtles do you think are left on this planet?",
        optionA: "10000",
        optionB: "500",
        optionC: "8300",
        optionD: "6500000",
        correctOption: "optionD"
    },

    {
        question: `How many Sumatran elephants do you think are left on this planet?`,
        optionA: "12003",
        optionB: "300",
        optionC: "9372",
        optionD: "2800",
        correctOption: "optionD"
    },

]

let shuffledQuestions = [] 
function handleQuestions() { 

    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}

let questionNumber = 1 
let playerScore = 0  
let wrongAttempt = 0 
let indexNumber = 0 

function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}

function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] 
    const currentQuestionAnswer = currentQuestion.correctOption 
    const options = document.getElementsByName("option"); 
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            correctOption = option.labels[0].id
        }
    })

    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++ 
            indexNumber++ 
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++
            indexNumber++
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}

function handleNextQuestion() {
    checkForAnswer() 
    unCheckRadioButtons()
    setTimeout(() => {
        if (indexNumber <= 9) {
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 1000);
}

function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

function handleEndGame() {
    let remark = null
    let remarkColor = null

    if (playerScore <= 3) {
        remark = "Bad luck, Keep Practicing. Go read the blog it might help"
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "You nearly did it! Keep trying you can do better."
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "Awesome! You did so well."
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100

    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}

function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}