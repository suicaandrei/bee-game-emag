document.getElementById('start-btn').addEventListener('click', function() {
    startGame();
});

document.getElementById('player-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        startGame();
    }
});

function startGame() {
    const playerNameInput = document.getElementById('player-input');
    const errorMessage = document.getElementById('error-message');
    const playerName = playerNameInput.value.trim();
    
    if (playerName === '') {
        errorMessage.textContent = 'Please enter your name to continue';
        return;
    }
    
    errorMessage.textContent = '';
    
    localStorage.setItem('playerName', playerName);
    localStorage.removeItem('swarmBees');
    
    window.location.href = 'game.html';
}