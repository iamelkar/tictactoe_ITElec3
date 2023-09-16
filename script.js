let currentPlayer = 'X';
let moves = 0;
let cells = document.querySelectorAll('.box');
let resultDisplay = document.getElementById('result');
let gameActive = true;

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            cells[a].classList.add(`winner-box`);
            cells[b].classList.add(`winner-box`);
            cells[c].classList.add(`winner-box`);
            return currentPlayer;
        }
    }

    if (moves === 9) {
        resultDisplay.classList.remove('hidden');
        alert(`The match is a draw!`);
    }

    return false;
}

function makeMove(cellIndex) {
    if (gameActive && !cells[cellIndex].textContent && !resultDisplay.textContent) {
        cells[cellIndex].textContent = currentPlayer;
        moves++;
        if (checkWinner()) {
            gameActive = false;
            const winner = checkWinner();
            if (currentPlayer === 'X' || currentPlayer === 'O') {
                alert(`${winner} wins!`);
            }
            resultDisplay.classList.remove('hidden');
            //cells.remove();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }    
}

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        makeMove(index);
    });
});
