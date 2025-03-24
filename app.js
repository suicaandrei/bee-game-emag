import { StorageService } from './services/storage-service.js'
import { Swarm } from './models/swarm.js'
import { SwarmView } from './views/swarm-view.js'
import { LogView } from './views/log-view.js'
import { GameView } from './views/game-view.js'
import { GameController } from './controllers/game-controller.js'


document.addEventListener("DOMContentLoaded", () => {
    const storageService = new StorageService();

    const swarm = new Swarm(storageService);
    const swarmView = new SwarmView();
    const logView = new LogView();
    const statusView = new GameView();

    const game = new GameController({
        storageService,
        swarm,
        swarmView,
        logView,
        statusView,
    });

    window.gameInstance = game;
});