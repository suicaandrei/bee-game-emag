export class Bee {
    static counter = 0;

    constructor(name, hp, damageTaken) {
        this.id = Bee.counter++;
        this.name = name;
        this.maxHP = hp;
        this.currentHP = hp;
        this.damageTaken = damageTaken;
        this.isDead = false;
    }

    takeDamage() {
        this.currentHP -= this.damageTaken;

        if (this.currentHP <= 0) {
            this.isDead = true;
        }
    }
}

export class Queen extends Bee {
    constructor() {
        super('Queen', 100, 8);

        this.imgUrl = './assets/queen.png';
    }
}

export class Worker extends Bee {
    constructor() {
        super('Worker', 75, 10);

        this.imgUrl = './assets/worker.png';
    }
}

export class Drone extends Bee {
    constructor() {
        super('Drone', 50, 12);

        this.imgUrl = './assets/drone.png';
    }
}