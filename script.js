let turn = "X";
let isgameover = false;
let add = true;
const audioTurn = new Audio('audioTurn.mp3');
const gameovercc = new Audio('gameovercc.mp3');

const changeTurn = () => {
    return turn === "X" ? "O" : "X";
};

const checkWin = () => {
    let boxtexts = document.querySelectorAll('.boxtext');
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    wins.forEach(e => {
        if ((boxtexts[e[0]].innerText === boxtexts[e[1]].innerText) &&
            (boxtexts[e[2]].innerText === boxtexts[e[1]].innerText) &&
            (boxtexts[e[0]].innerText !== "")
        ) {
            document.querySelector('.info').innerText = boxtexts[e[0]].innerText + " won";
            gameovercc.play();
            isgameover = true;
            add = false;
        }
    });
};

const startGame = () => {
    if (add) {
        let boxes = document.getElementsByClassName("box");
        Array.from(boxes).forEach(element => {
            let boxtext = element.querySelector('.boxtext');
            element.addEventListener('click', () => {
                if (boxtext.innerText === '') {
                    boxtext.innerText = turn;
                    audioTurn.play();
                    turn = changeTurn();
                    checkWin();
                    if (!isgameover) {
                        document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
                    }
                }
            });
        });
    }
};

startGame(); 

let butn = document.querySelector('#reset');
butn.addEventListener('click', () => {
    let textinside = document.querySelectorAll('.boxtext');
    Array.from(textinside).forEach(element => {
        element.innerText = '';
    });
    gameovercc.pause();
    isgameover = false;
    add = true;
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    startGame(); 
});
