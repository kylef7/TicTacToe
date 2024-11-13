const startBtn = document.querySelector(".startButton");

const dialog = document.querySelector("#favDialog");
const confirmBtn = favDialog.querySelector("#confirmBtn");
const closeButton = document.querySelector("dialog button");
const createBtn = document.querySelector(".createButton");

function Gameboard() {
    const board = [];

    for (let i = 0; i < 9; i++) {
        board.push(null);
    }

    return board;
}

function createPlayer(name, marker) {
    return {
        name: name,
        marker: marker
    }
}

function GameController() {

    let playerOne = createPlayer("playerOne", "x");
    let playerTwo = createPlayer("playerTwo", "o");

    confirmBtn.addEventListener("click", (event) => {

        let pOne = document.getElementById("pOne").value;
        let pTwo = document.getElementById("pTwo").value;
    
        event.preventDefault();
    
        playerOne = createPlayer(pOne, "x");
        document.querySelector(".playerOneDiv").textContent = playerOne.name;
        playerTwo = createPlayer(pTwo, "o");
        document.querySelector(".playerTwoDiv").textContent = playerTwo.name;

        player = playerOne;
        
        dialog.close();
    
    });

    const divCell = document.querySelectorAll(".cell");

    const board = Gameboard();

    let player = playerOne;

    let winningPlayer;

    const switchPlayers = () => {
        if (player === playerOne) {
            player = playerTwo;
        } else {
            player = playerOne;
        };
    };

    const playRound = () => {

    console.log(player.name);

        divCell.forEach((div) => {
            div.innerHTML = "";
        });

        startBtn.removeEventListener("click", game.playRound);
        startBtn.addEventListener("click", clearBoard);

        let movesPlayed = 0;

        console.log(player.name + " 's turn!");

        if (player === playerOne) {
            document.querySelector(".playerOneDiv").classList.add("active");
            document.querySelector(".playerTwoDiv").classList.remove("active");
        } else {
            document.querySelector(".playerTwoDiv").classList.add("active");
            document.querySelector(".playerOneDiv").classList.remove("active");
        }

        const handleClick = function (event) {
            const div = event.currentTarget;

            const X = renderXIcon(div);
            const O = renderOIcon(div);

            let cell = div.dataset.position;

            if (board[cell] === null) {

                if (player.marker === "x") {
                    X.addSVG(div);
                } else {
                    O.addSVG(div);
                }

                board.splice(cell, 1, player.marker);

                for (let i = 0; i <= 6; i += 3) {

                    if (board[i] == player.marker &&
                        board[i + 1] == player.marker &&
                        board[i + 2] == player.marker) {

                        winningPlayer = player;

                        switchPlayers();

                        let cellOne = document.querySelector(`[data-position="${i}"] > svg`);
                        let cellTwo = document.querySelector(`[data-position="${i + 1}"] > svg`);
                        let cellThree = document.querySelector(`[data-position="${i + 2}"] > svg`);


                        cellOne.classList.add("winState");
                        cellTwo.classList.add("winState");
                        cellThree.classList.add("winState");

                        divCell.forEach((div) => {
                            div.removeEventListener("click", handleClick);
                        });

                        stopGame();
                        return;
                    }
                }

                for (let i = 0; i <= 2; i++) {

                    if (board[i] == player.marker &&
                        board[i + 3] == player.marker &&
                        board[i + 6] == player.marker) {

                        winningPlayer = player;

                        switchPlayers();

                        let cellOne = document.querySelector(`[data-position="${i}"] > svg`);
                        let cellTwo = document.querySelector(`[data-position="${i + 3}"] > svg`);
                        let cellThree = document.querySelector(`[data-position="${i + 6}"] > svg`);

                        cellOne.classList.add("winState");
                        cellTwo.classList.add("winState");
                        cellThree.classList.add("winState");

                        divCell.forEach((div) => {
                            div.removeEventListener("click", handleClick);
                        });

                        stopGame();
                        return;
                    }
                }

                if (board[0] == player.marker &&
                    board[4] == player.marker &&
                    board[8] == player.marker) {
                    let cellOne = document.querySelector('[data-position="0"] > svg');
                    let cellTwo = document.querySelector('[data-position="4"] > svg');
                    let cellThree = document.querySelector('[data-position="8"] > svg');

                    cellOne.classList.add("winState");
                    cellTwo.classList.add("winState");
                    cellThree.classList.add("winState");

                    winningPlayer = player;

                    switchPlayers();

                    divCell.forEach((div) => {
                        div.removeEventListener("click", handleClick);
                    });

                    stopGame();
                    return;
                } else if (board[2] == player.marker &&
                    board[4] == player.marker &&
                    board[6] == player.marker) {
                    let cellOne = document.querySelector('[data-position="2"] > svg');
                    let cellTwo = document.querySelector('[data-position="4"] > svg');
                    let cellThree = document.querySelector('[data-position="6"] > svg');

                    cellOne.classList.add("winState");
                    cellTwo.classList.add("winState");
                    cellThree.classList.add("winState");

                    winningPlayer = player;

                    switchPlayers();

                    divCell.forEach((div) => {
                        div.removeEventListener("click", handleClick);
                    });

                    stopGame();
                    return;
                }


                if (movesPlayed === 8 && winningPlayer === undefined) {

                    divCell.forEach((div) => {
                        div.removeEventListener("click", handleClick);
                        
                        const svgElement = div.querySelector('svg');
                        svgElement.classList.add("tieState");
                    });

                    stopGame();
                } else if (winningPlayer === undefined) {
                    switchPlayers();

                    console.log(player.name + " 's turn!");

                    if (player === playerOne) {
                        document.querySelector(".playerOneDiv").classList.add("active");
                        document.querySelector(".playerTwoDiv").classList.remove("active");
                    } else {
                        document.querySelector(".playerTwoDiv").classList.add("active");
                        document.querySelector(".playerOneDiv").classList.remove("active");
                    }
                }

                movesPlayed++;
            }
        };

        divCell.forEach((div) => {

            div.addEventListener("click", handleClick);
        });

        function clearBoard() {
            divCell.forEach((div) => {
                div.innerHTML = "";
            });

            divCell.forEach((div) => {
                div.removeEventListener("click", handleClick);
            });

            board.splice(0, board.length);

            for (let i = 0; i < 9; i++) {
                board.push(null);
            }
    
            winningPlayer = undefined;
            roundsPlayed = 0;
    
            startBtn.removeEventListener("click", clearBoard);
            game.playRound();
        }


    };

    const stopGame = () => {

        if (winningPlayer === undefined) {
            console.log("Tie!");
        } else {
            console.log(winningPlayer.name + " has won the game! Congratulations!");
        }

        board.splice(0, board.length);

        for (let i = 0; i < 9; i++) {
            board.push(null);
        }

        winningPlayer = undefined;
        roundsPlayed = 0;

        startBtn.addEventListener("click", game.playRound);
    }

    return {
        playRound
    }

};

const game = GameController();
game.playRound();

startBtn.addEventListener("click", game.playRound);

createBtn.addEventListener("click", () => {
    dialog.showModal();
});

closeButton.addEventListener("click", () => {
    dialog.close();
});


function renderXIcon(node) {
    const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    const iconLine1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    const iconLine2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');

    iconSvg.setAttribute('viewBox', '0 0 100 100');
    iconSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    iconSvg.classList.add('custom-icon');

    iconLine1.setAttribute('x1', '10');
    iconLine1.setAttribute('y1', '10');
    iconLine1.setAttribute('x2', '90');
    iconLine1.setAttribute('y2', '90');
    iconLine1.setAttribute('stroke', '#fff');
    iconLine1.setAttribute('stroke-width', '5');

    iconLine2.setAttribute('x1', '10');
    iconLine2.setAttribute('y1', '90');
    iconLine2.setAttribute('x2', '90');
    iconLine2.setAttribute('y2', '10');
    iconLine2.setAttribute('stroke', '#fff');
    iconLine2.setAttribute('stroke-width', '5');

    iconSvg.appendChild(iconLine1);
    iconSvg.appendChild(iconLine2);

    const addSVG = () => {
        return node.appendChild(iconSvg);
    };

    const removeSVG = () => {
        return node.removeChild(iconSvg);
    };

    return {
        addSVG,
        removeSVG
    };
}

function renderOIcon(node) {
    const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const iconCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

    iconSvg.setAttribute('viewBox', '0 0 299.65 299.65');
    iconSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    iconSvg.classList.add('circle-icon');

    iconCircle.setAttribute('class', 'cls-1');
    iconCircle.setAttribute('cx', '149.83');
    iconCircle.setAttribute('cy', '149.83');
    iconCircle.setAttribute('r', '147.33');

    iconCircle.setAttribute('fill', 'none');  
    iconCircle.setAttribute('stroke', '#fff');  
    iconCircle.setAttribute('stroke-width', '10px'); 

    iconSvg.appendChild(iconCircle);

    const addSVG = () => {
        return node.appendChild(iconSvg);
    };

    const removeSVG = () => {
        return node.removeChild(iconSvg);
    }

    return {
        addSVG,
        removeSVG
    }
};


