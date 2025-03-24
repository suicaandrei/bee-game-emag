import { BaseView } from './view.js'

export class LogView extends BaseView {
    constructor() {
        super('log-content')
    }

    addLog(message) {
        let log = document.createElement("p");
        log.className = 'log-row';
        log.textContent = message;

        this.container.appendChild(log);
    }

    clearLogs() {
        this.container.innerHTML = '';

        let logContainerTitle = document.createElement("p");
        logContainerTitle.textContent = 'Log';

        this.container.appendChild(logContainerTitle);
    }
}