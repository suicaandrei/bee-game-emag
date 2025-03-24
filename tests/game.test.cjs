const { GameController } = require('../controllers/game-controller.js');

jest.mock('../services/storage-service.js', () => {
    return {
        StorageService: jest.fn().mockImplementation(() => {
            return {
                save: jest.fn().mockReturnValue(true),
                load: jest.fn(),
                remove: jest.fn()
            };
        })
    };
});

document.body.innerHTML = `
  <div id="bees-content"></div>
  <div id="log-content"></div>
  <div id="swarm-health"></div>
  <div id="player-name"></div>
  <button id="hit-btn">Hit</button>
  <button id="reset-btn">Reset</button>
`;

describe('GameController', () => {
    let mockStorageService;
    let mockSwarm;
    let mockSwarmView;
    let mockLogView;
    let mockStatusView;
    let game;

    beforeEach(() => {
        mockStorageService = {
            load: jest.fn().mockReturnValue('test'),
            save: jest.fn()
        };

        mockSwarm = {
            bees: [
                { name: 'Queen', currentHP: 100, maxHP: 100, isDead: false, damageTaken: 8, takeDamage: jest.fn() },
                { name: 'Worker', currentHP: 75, maxHP: 75, isDead: false, damageTaken: 10, takeDamage: jest.fn() },
                { name: 'Drone', currentHP: 50, maxHP: 50, isDead: false, damageTaken: 12, takeDamage: jest.fn() },
            ],
            getRandomBee: jest.fn(),
            isQueenDead: jest.fn().mockReturnValue(false),
            resetSwarm: jest.fn(),
            saveSwarm: jest.fn(),
            getTotalHealth: jest.fn().mockReturnValue(40)
        };

        mockSwarmView = {
            renderSwarm: jest.fn(),
            updateBee: jest.fn()
        };

        mockLogView = {
            addLog: jest.fn(),
            clearLogs: jest.fn()
        };

        mockStatusView = {
            updatePlayerName: jest.fn(),
            updateSwarmHealth: jest.fn(),
            showGameOver: jest.fn()
        };

        game = new GameController({
            storageService: mockStorageService,
            swarm: mockSwarm,
            swarmView: mockSwarmView,
            logView: mockLogView,
            statusView: mockStatusView
        });
    });

    test('Game should initialize with correct initial properties', () => {
        expect(game.swarm).toBeDefined();
        expect(game.swarm.bees.length).toBe(3);
        expect(game.isOver).toBe(false);
    });

    test('hitSwarm() should damage a random bee', () => {
        const randomBee = mockSwarm.bees[0];
        randomBee.takeDamage();
        mockSwarm.getRandomBee.mockReturnValue(randomBee);

        game.hitSwarm();

        expect(mockSwarm.getRandomBee).toHaveBeenCalled();
        expect(randomBee.takeDamage).toHaveBeenCalled();
        expect(mockSwarmView.updateBee).toHaveBeenCalledWith(randomBee);
        expect(mockStatusView.updateSwarmHealth).toHaveBeenCalled();
        expect(mockLogView.addLog).toHaveBeenCalledWith(`${randomBee.name} took ${randomBee.damageTaken} damage`);
        expect(mockSwarm.saveSwarm).toHaveBeenCalled();
        expect(mockSwarm.isQueenDead).toHaveBeenCalled();
    });

    test('resetGame() should reset the game', () => {
        game.isOver = true;

        game.resetGame();

        expect(mockSwarm.resetSwarm).toHaveBeenCalled();
        expect(mockSwarmView.renderSwarm).toHaveBeenCalledWith(mockSwarm.bees);
        expect(mockLogView.clearLogs).toHaveBeenCalled();
        expect(mockStatusView.updateSwarmHealth).toHaveBeenCalled();
        expect(game.isOver).toBe(false);
    });


    test('checkGameStatus should end the game if the queen is dead', () => {
        mockSwarm.isQueenDead.mockReturnValueOnce(true);

        game.checkGameStatus();

        expect(game.isOver).toBe(true);
        expect(mockStatusView.showGameOver).toHaveBeenCalled();
    });
});