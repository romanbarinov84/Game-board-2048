const boardSize = 4;
let board = Array(boardSize).fill().map(() => Array(boardSize).fill(0));
const boardElement = document.getElementById("board");

function startGame() {
    board = Array(boardSize).fill().map(() => Array(boardSize).fill(0));
    spawnTile();
    spawnTile();
    drawBoard();
}

function spawnTile() {
    let emptyCells = [];
    for (let r = 0; r < boardSize; r++) {
        for (let c = 0; c < boardSize; c++) {
            if (board[r][c] === 0) emptyCells.push({ r, c });
        }
    }
    if (emptyCells.length === 0) return;
    let { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[r][c] = Math.random() < 0.9 ? 2 : 4;
}

function drawBoard() {
    boardElement.innerHTML = "";
    for (let r = 0; r < boardSize; r++) {
        for (let c = 0; c < boardSize; c++) {
            let tile = document.createElement("div");
            tile.classList.add("tile");
            if (board[r][c] !== 0) {
                tile.textContent = board[r][c];
                tile.setAttribute("data-value", board[r][c]);
            }
            boardElement.appendChild(tile);
        }
    }
}

function slide(row) {
    row = row.filter(val => val); 
    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] === row[i + 1]) {
            row[i] *= 2;
            row[i + 1] = 0;
        }
    }
    return row.filter(val => val).concat(Array(boardSize - row.length).fill(0));
}

function moveLeft() {
    for (let r = 0; r < boardSize; r++) {
        board[r] = slide(board[r]);
    }
}

function moveRight() {
    for (let r = 0; r < boardSize; r++) {
        board[r] = slide(board[r].reverse()).reverse();
    }
}

function rotateBoard() {
    let newBoard = Array(boardSize).fill().map(() => Array(boardSize).fill(0));
    for (let r = 0; r < boardSize; r++) {
        for (let c = 0; c < boardSize; c++) {
            newBoard[c][boardSize - 1 - r] = board[r][c];
        }
    }
    board = newBoard;
}

function moveUp() {
    rotateBoard();
    moveLeft();
    rotateBoard();
    rotateBoard();
    rotateBoard();
}

function moveDown() {
    rotateBoard();
    rotateBoard();
    rotateBoard();
    moveLeft();
    rotateBoard();
}

document.addEventListener("keydown", (e) => {
    let moved = false;
    if (e.key === "ArrowLeft") { moveLeft(); moved = true; }
    if (e.key === "ArrowRight") { moveRight(); moved = true; }
    if (e.key === "ArrowUp") { moveUp(); moved = true; }
    if (e.key === "ArrowDown") { moveDown(); moved = true; }
    if (moved) {
        spawnTile();
        drawBoard();
    }
});

startGame();
