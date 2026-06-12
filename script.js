const grid = document.getElementById("sudoku-grid");

for (let i = 0; i < 81; i++) {
    let input = document.createElement("input");
    input.type = "number";
    input.min = 1;
    input.max = 9;
    grid.appendChild(input);
}

function getBoard() {
    let board = [];
    let inputs = document.querySelectorAll("#sudoku-grid input");

    for (let row = 0; row < 9; row++) {
        board[row] = [];
        for (let col = 0; col < 9; col++) {
            let value = inputs[row * 9 + col].value;
            board[row][col] = value ? parseInt(value) : 0;
        }
    }
    return board;
}

function setBoard(board) {
    let inputs = document.querySelectorAll("#sudoku-grid input");

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            inputs[row * 9 + col].value =
                board[row][col] === 0 ? "" : board[row][col];
        }
    }
}

function isValid(board, row, col, num) {

    for (let x = 0; x < 9; x++) {
        if (board[row][x] === num) return false;
    }

    for (let x = 0; x < 9; x++) {
        if (board[x][col] === num) return false;
    }

    let startRow = row - row % 3;
    let startCol = col - col % 3;

    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            if (board[startRow + r][startCol + c] === num)
                return false;
        }
    }

    return true;
}

function solve(board) {

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {

            if (board[row][col] === 0) {

                for (let num = 1; num <= 9; num++) {

                    if (isValid(board, row, col, num)) {

                        board[row][col] = num;

                        if (solve(board))
                            return true;

                        board[row][col] = 0;
                    }
                }

                return false;
            }
        }
    }

    return true;
}

function solveSudoku() {

    let board = getBoard();

    if (solve(board)) {
        setBoard(board);
        alert("Sudoku Solved Successfully!");
    } else {
        alert("No solution exists!");
    }
}

function clearGrid() {
    let inputs = document.querySelectorAll("#sudoku-grid input");

    inputs.forEach(input => {
        input.value = "";
    });
}
