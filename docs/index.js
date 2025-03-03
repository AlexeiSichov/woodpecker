document.addEventListener('DOMContentLoaded', () => {
    const solvedPuzzles = JSON.parse(localStorage.getItem('solvedPuzzles') || '[]');
    const failedPuzzles = JSON.parse(localStorage.getItem('failedPuzzles') || '[]');

    const puzzles = document.querySelectorAll('.puzzle');
    puzzles.forEach(puzzle => {
        const number = parseInt(puzzle.innerText);
        if (solvedPuzzles.includes(number)) {
            puzzle.classList.add('solved');
        }
        if (failedPuzzles.includes(number)) {
            puzzle.classList.add('failed');
        }
    });
});

function markAsSolved(event, number) {
    event.stopPropagation();

    let solvedPuzzles = JSON.parse(localStorage.getItem('solvedPuzzles') || '[]');
    let failedPuzzles = JSON.parse(localStorage.getItem('failedPuzzles') || '[]');

    const targetPuzzleElement = event.target.parentElement.previousElementSibling;

    if (!solvedPuzzles.includes(number)) {
        solvedPuzzles.push(number);
        localStorage.setItem('solvedPuzzles', JSON.stringify(solvedPuzzles));
        targetPuzzleElement.classList.add('solved');
    }
    
    if (failedPuzzles.includes(number)) {
        failedPuzzles = failedPuzzles.filter(n => n !== number);
        localStorage.setItem('failedPuzzles', JSON.stringify(failedPuzzles));
    }

    targetPuzzleElement.classList.remove('failed');
}

function markAsFailed(event, number) {
    event.stopPropagation();

    let solvedPuzzles = JSON.parse(localStorage.getItem('solvedPuzzles') || '[]');
    let failedPuzzles = JSON.parse(localStorage.getItem('failedPuzzles') || '[]');

    const targetPuzzleElement = event.target.parentElement.previousElementSibling;

    if (!failedPuzzles.includes(number)) {
        failedPuzzles.push(number);
        localStorage.setItem('failedPuzzles', JSON.stringify(failedPuzzles));
        targetPuzzleElement.classList.add('failed');
    }
    
    if (solvedPuzzles.includes(number)) {
        solvedPuzzles = solvedPuzzles.filter(n => n !== number);
        localStorage.setItem('solvedPuzzles', JSON.stringify(solvedPuzzles));
    }

    targetPuzzleElement.classList.remove('solved');
}

function markAsUnsolved(event, number) {
    event.stopPropagation();

    const targetPuzzleElement = event.target.parentElement.previousElementSibling;

    let solvedPuzzles = JSON.parse(localStorage.getItem('solvedPuzzles') || '[]');
    solvedPuzzles = solvedPuzzles.filter(n => n !== number);

    let failedPuzzles = JSON.parse(localStorage.getItem('failedPuzzles') || '[]');
    failedPuzzles = failedPuzzles.filter(n => n !== number);

    localStorage.setItem('solvedPuzzles', JSON.stringify(solvedPuzzles));
    localStorage.setItem('failedPuzzles', JSON.stringify(failedPuzzles));

    targetPuzzleElement.classList.remove('solved');
    targetPuzzleElement.classList.remove('failed');
}