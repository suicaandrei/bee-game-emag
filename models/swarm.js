import { Queen, Worker, Drone } from './bee.js'

export class Swarm {
  constructor(storageService) {
    this.storageService = storageService;
    this.bees = [];
    this.loadSwarm();
  }

  resetSwarm() {
    this.bees = [];

    this.bees.push(new Queen());

    for (let index = 0; index < 5; index++) {
      this.bees.push(new Worker());
    }

    for (let index = 0; index < 8; index++) {
      this.bees.push(new Drone());
    }
  }

  saveSwarm() {
    return this.storageService.save('swarmBees', this.bees);
  }

  loadSwarm() {
    const beesToAdd = this.storageService.load('swarmBees');

    if (beesToAdd) {
      try {
        this.bees = beesToAdd.map(b => {
          let bee;

          if (b.name === 'Queen') {
            bee = new Queen();
          } else if (b.name === 'Worker') {
            bee = new Worker();
          } else if (b.name === 'Drone') {
            bee = new Drone();
          }

          Object.assign(bee, b);
          return bee;
        });
      } catch (error) {
        console.error('Error loading swarm:', error);
        this.resetSwarm();
      }
    } else {
      this.resetSwarm();
    }

    return this.bees;
  }

  getRandomBee() {
    const beesAlive = this.bees.filter(b => !b.isDead);

    return beesAlive[Math.floor(Math.random() * beesAlive.length)];
  }

  getTotalHealth() {
    return this.bees.filter(b => !b.isDead).reduce((sum, bee) => sum + bee.currentHP, 0);
  }

  isQueenDead() {
    return this.bees.find(b => b.name === 'Queen')?.isDead || false;
  }
}