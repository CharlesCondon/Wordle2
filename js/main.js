document.addEventListener("DOMContentLoaded", () => {
    createSquares();

    let guessedWords = [[]];
    let availableSpace = 1;
    let guessedWordCount = 0;

    const keys = document.querySelectorAll('.keyboardRow button');
    const help = document.querySelector(".helpImg");
    const eye = document.querySelector(".logoImg");

    function getCurrentWord() {
        const guessNum = guessedWords.length;
        return guessedWords[guessNum - 1];
    }

    function updateGuess(letter) {
        const currentWord = getCurrentWord();
        if (currentWord && currentWord.length < 5) {
            currentWord.push(letter);

            const availableEl = document.getElementById(String(availableSpace));
            availableSpace = availableSpace + 1;
            
            availableEl.classList.add('animate__bounceIn');
            availableEl.textContent = letter;
        }
    }

    function getTileColor(letter, index) {
        return "rgb(83, 141, 78)";
    }

    function backspace() {
        const currentWord = getCurrentWord();

        if (currentWord.length > 0) {
            const removed = currentWord.pop();

            guessedWords[guessedWords.length - 1] = currentWord;

            const lastLetterEl = document.getElementById(String(availableSpace - 1));

            lastLetterEl.textContent = "";
            availableSpace = availableSpace - 1;
        }

    }

    function submitWord() {
        const currentWord = getCurrentWord();
        if (currentWord.length !== 5) {
            window.alert('Word must be 5 letters');
        }
        else {
            const currentStr = currentWord.join('');

            const firstLetterId = guessedWordCount * 5 + 1;
            const interval = 200;
            currentWord.forEach((letter, index) => {
                setTimeout(() => {
                    const tileColor = getTileColor(letter, index);
                    
                    const keyEl = document.querySelector(`[data-key='${letter}']`);
                    const letterId = firstLetterId + index;
                    const letterEl = document.getElementById(letterId);
                    letterEl.classList.add('animate__flipInX');
                    letterEl.style = `background-color:${tileColor};border-color:${tileColor}`;
                    keyEl.style = `background-color:${tileColor};border-color:${tileColor}`;
                }, interval * index)
            });
    
            guessedWordCount += 1;
    
            if (currentStr) {
                popup('win');
            }
            else if (guessedWords.length === 6) {
                popup('lose');
            }
    
            guessedWords.push([]);
        }
    }

    function popup(trigger) {
        if (trigger === 'win') {
            const popup = document.getElementById('popup');
            popup.classList.add("show");
        }
    }

    function createSquares() {
        const gameBoard = document.getElementById("board")

        for (let index = 0; index < 30; index++) {
            let square = document.createElement("div");
            square.classList.add("square");
            square.classList.add("animate__animated")
            square.setAttribute("id", index + 1);
            gameBoard.appendChild(square);
        }
    }
    
    keys.forEach( e => {
        e.onclick = ({ target }) => {
            const key = target.getAttribute("data-key");

            if (key === 'enter') {
                submitWord();
                return;
            }

            else if (key === 'del') {
                backspace();
                return;
            }
            else {
                updateGuess(key);
            }
        }
    });

    help.onclick = () => {
        console.log("Help clicked")
        const helpPop = document.getElementById('helpPop');
        helpPop.classList.toggle("show");
    }

    eye.onclick = (e) => {
        const eyePop = document.getElementById('eyePop');

        eyePop.classList.toggle("show");

    }

});