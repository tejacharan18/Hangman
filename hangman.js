const canvas = document.getElementById("mycanvas");
const msg = document.getElementById("msg")
const clock = document.getElementById("clock")
canvas.height = 400;
canvas.width = 400;
const ctx = canvas.getContext('2d');
ctx.strokeStyle = 'silver';
const hint = document.getElementById("hint")
const word = document.getElementById("word")
const counts = document.getElementById("counts")
const wordsToGuess = [
    ['Mango', 'a fruit name'],
    ['Peacock', 'a bird name'],
    ['Octopus', 'a sea animal name'],
    ['Vizag', 'city of destiny'],
    ['Snake', 'a reptile name'],
    ['Chair', 'a four legged non-living thing'],
    ['Eyebrow','The brother of an eye ']
]

let selectedWord = ""
let displayWord = ""
let attempts = 0
let maxAttempts = 6
let guessedLetters = []

const initializeGame = () => {
    const selectedIndex = parseInt(Math.random() * wordsToGuess.length)
    selectedWord = wordsToGuess[selectedIndex][0].toLowerCase()
    hint.innerText = `Hint: ${wordsToGuess[selectedIndex][1]}`
    displayWord = "_ ".repeat(selectedWord.length).trim()
    word.innerText = displayWord;
    // counts.innerText = maxAttempts
    draw()
}
// let startpoint = { x: 0, y: 0 };
const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // draw base
    ctx.rect(50, 370, 300, 20);
    ctx.stroke();

    // vertical pole
    ctx.rect(100, 50, 20, 320);
    ctx.stroke();

    // horizontal line
    ctx.rect(120, 70, 120, 10);
    ctx.stroke();
    if (attempts > 0) {
        // top
        ctx.moveTo(200, 80);
        ctx.lineTo(200, 120);
        ctx.stroke();
    }

    if (attempts > 1) {
        //face
        ctx.moveTo(230, 150);
        ctx.arc(200, 150, 30, 0, Math.PI * 2);
        ctx.stroke();
    }
    if (attempts > 2) {
        //body
        ctx.moveTo(200, 180);
        ctx.lineTo(200, 280);
        ctx.stroke();
    }
    if (attempts > 3) {
        // left hand
        ctx.moveTo(200, 200);
        ctx.lineTo(150, 240);
        ctx.stroke();
    }
    if (attempts > 4) {
        // right hand
        ctx.moveTo(200, 200);
        ctx.lineTo(260, 240);
        ctx.stroke();
    }
    if (attempts > 5) {
        // left leg
        ctx.moveTo(200, 280);
        ctx.lineTo(150, 320);
        ctx.stroke();
    }
    if (attempts > 6) {
        // right leg
        ctx.moveTo(200, 280);
        ctx.lineTo(260, 320);
        ctx.stroke();
    }
}

initializeGame()
const updateWord = () => {
    let update = ''
    for (let i = 0; i < selectedWord.length; i++) {
        if (guessedLetters.indexOf(selectedWord[i]) > -1) {
            update += selectedWord[i] + " "
        }
        else {
            update += "_ "
        }
    }
    displayWord = update
    word.innerText = update;
}
const speak=()=>
    {
        const speech = new SpeechSynthesisUtterance("Congratulations you won the game");
        speechSynthesis.speak(speech);
    }
    const lost=()=>
        {
            const speech = new SpeechSynthesisUtterance("You lost the game");
            speechSynthesis.speak(speech);
        }
        const timeup=()=>
            {
                const speech = new SpeechSynthesisUtterance("Oops Time Up!");
                speechSynthesis.speak(speech);
            }
const performAction = (event) => {
    if (attempts < 7 && clockCounter >= 0) {
        const keyPressed = event.key.toLowerCase();
        if (guessedLetters.includes(keyPressed)) {
            return
        }
        if (selectedWord.includes(keyPressed)) {
            if (clockCounter <= 89) {
                clockCounter += 1
            }
            else {
                clockCounter = 90
            }
        }
        else {
            attempts++;
        }
        guessedLetters.push(keyPressed.toLowerCase())
        updateWord();
        draw();
        if (displayWord.replace(/ /g, '') === selectedWord) {
            speak();
            msg.innerText = "🎉🎊 Congratulations You won the Game 🎊🎉"
            msg.className = "success"
            // ctx.clearRect(0, 0, canvas.width, canvas.height)
            canvas.style = "display:none"


        }
    }
    if (attempts === 7) {

        lost()
        msg.innerText = " Sorry! You Lost the Game 😟😢"
        msg.className = "warning"
        canvas.style = "margin-top:-50px"


    }
}
let clockCounter = 90
// const replay=()=>
// {
//     location.reload();

// }
function replay() {
    location.reload();
}

const updateClock = () => {
    if (clockCounter >= 0 && displayWord.replace(/ /g, '') !== selectedWord && attempts !== 7) {
        clock.innerHTML = `${clockCounter} sec`
        clockCounter--
    }
    if (clockCounter < 0 && displayWord.replace(/ /g, '') !== selectedWord) {
        timeup()
        msg.innerHTML = " Time Up!! 😟😢 <button onclick='replay()'>Replay</button>"
        msg.className = "warning"
        canvas.style = "margin-top:-50px"



    }
}

setInterval(updateClock, 1000)

document.addEventListener('keydown', performAction)