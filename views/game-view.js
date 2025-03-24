export class GameView {
    constructor() {
        this.swarmHealthDiv = document.getElementById('swarm-health');
        this.playerNameDiv = document.getElementById('player-name');
    }

    updateSwarmHealth(health) {
        this.swarmHealthDiv.innerText = `Swarm health: ${health}`;
    }

    updatePlayerName(name) {
        this.playerNameDiv.textContent = `Player: ${name}`;
    }

    showGameOver(resetCallback) {
        const overlay = document.createElement('div');
        overlay.id = 'game-over-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        overlay.style.display = 'flex';
        overlay.style.flexDirection = 'column';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.style.zIndex = '1000';

        const message = document.createElement('h1');
        message.textContent = 'Game Over!';
        message.style.color = 'white';
        message.style.fontSize = '3rem';
        message.style.marginBottom = '2rem';

        const playAgainButton = document.createElement('button');
        playAgainButton.textContent = 'Play Again';
        playAgainButton.style.padding = '1rem 2rem';
        playAgainButton.style.fontSize = '1.5rem';
        playAgainButton.style.backgroundColor = '#4CAF50';
        playAgainButton.style.color = 'white';
        playAgainButton.style.border = 'none';
        playAgainButton.style.borderRadius = '5px';
        playAgainButton.style.cursor = 'pointer';

        playAgainButton.addEventListener('click', () => {
            if (typeof resetCallback === 'function') {
                resetCallback();
            }
            document.body.removeChild(overlay);
        });

        overlay.appendChild(message);
        overlay.appendChild(playAgainButton);
        document.body.appendChild(overlay);
    }
}