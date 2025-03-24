const { Bee, Queen, Worker, Drone } = require('../models/bee.js');

describe('Bee class', () => {
    test('Queen bee should have correct initial properties', () => {
        const queen = new Queen();
        expect(queen.name).toBe('Queen');
        expect(queen.maxHP).toBe(100);
        expect(queen.damageTaken).toBe(8);
        expect(queen.currentHP).toBe(queen.maxHP);
        expect(queen.isDead).toBe(false);
    });

    test('Worker bee should have correct initial properties', () => {
        const worker = new Worker();
        expect(worker.name).toBe('Worker');
        expect(worker.maxHP).toBe(75);
        expect(worker.damageTaken).toBe(10);
        expect(worker.currentHP).toBe(worker.maxHP);
        expect(worker.isDead).toBe(false);
    });

    test('Drone bee should have correct initial properties', () => {
        const drone = new Drone();
        expect(drone.name).toBe('Drone');
        expect(drone.maxHP).toBe(50);
        expect(drone.damageTaken).toBe(12);
        expect(drone.currentHP).toBe(drone.maxHP);
        expect(drone.isDead).toBe(false);
    });

    test('Bee should take correct damage', () => {
        const bee = new Bee('test', 100, 10);

        bee.takeDamage();

        expect(bee.currentHP).toBe(90);
    });

    test('Bee should die when it reaches 0 health', () => {
        const bee = new Bee('test', 10, 10);

        bee.takeDamage();

        expect(bee.isDead).toBe(true);
    })
});