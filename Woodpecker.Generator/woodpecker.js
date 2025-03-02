document.addEventListener('DOMContentLoaded', () => {
    const completedPuzzles = JSON.parse(localStorage.getItem('completedPuzzles') || '[]');
    const puzzles = document.querySelectorAll('.puzzle');
    puzzles.forEach(puzzle => {
        const number = parseInt(puzzle.innerText);
        if (completedPuzzles.includes(number)) {
            puzzle.classList.add('completed');
        }
    });
});

function markAsCompleted(event, number) {
    event.stopPropagation();
    const completedPuzzles = JSON.parse(localStorage.getItem('completedPuzzles') || '[]');
    if (!completedPuzzles.includes(number)) {
        completedPuzzles.push(number);
        localStorage.setItem('completedPuzzles', JSON.stringify(completedPuzzles));
        event.target.parentElement.previousElementSibling.classList.add('completed');
    }
}

function markAsUncompleted(event, number) {
    event.stopPropagation();
    let completedPuzzles = JSON.parse(localStorage.getItem('completedPuzzles') || '[]');
    completedPuzzles = completedPuzzles.filter(n => n !== number);
    localStorage.setItem('completedPuzzles', JSON.stringify(completedPuzzles));
    event.target.parentElement.previousElementSibling.classList.remove('completed');
}