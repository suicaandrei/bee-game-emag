export class GameController {
    isOver = false;

    constructor(config) {
        this.storageService = config.storageService;
        this.swarm = config.swarm;
        this.swarmView = config.swarmView;
        this.logView = config.logView;
        this.statusView = config.statusView;

        this.playerName = this.storageService.load('playerName') || 'Player';

        this.init();
    }

    init() {
        this.swarmView.renderSwarm(this.swarm.bees);
        this.statusView.updatePlayerName(this.playerName);
        this.updateSwarmHealth();
        this.updateAllBeesDisplay();

        document.getElementById("hit-btn")?.addEventListener("click", () => this.hitSwarm());
        document.getElementById("reset-btn")?.addEventListener("click", () => this.resetGame());
    }

    hitSwarm() {
        if (this.isOver) return;

        let bee = this.swarm.getRandomBee();
        bee.takeDamage();

        this.swarmView.updateBee(bee);
        this.logView.addLog(`${bee.name} took ${bee.damageTaken} damage`);
        
        this.updateSwarmHealth();
        this.checkGameStatus();

        this.swarm.saveSwarm();
        
    }

    checkGameStatus() {
        if (this.swarm.isQueenDead()) {
            this.isOver = true;
            this.swarm.bees = this.swarm.bees.map(b => ({ ...b, currentHP: 0, isDead: true }));
            this.updateAllBeesDisplay();
            this.statusView.showGameOver(() => this.resetGame());
        }
    }

    updateAllBeesDisplay() {
        this.swarm.bees.forEach(bee => {
            this.swarmView.updateBee(bee, false);
        });
    }

    resetGame() {
        this.swarm.resetSwarm();
        this.swarmView.renderSwarm(this.swarm.bees);
        this.logView.clearLogs();
        this.updateSwarmHealth();
        this.isOver = false;
    }

    updateSwarmHealth() {
        const totalHealth = this.swarm.getTotalHealth();
        this.statusView.updateSwarmHealth(totalHealth);
    }
}