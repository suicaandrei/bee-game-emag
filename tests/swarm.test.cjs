const { Swarm } = require('../models/swarm.js');

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

describe('Swarm class', () => {
    let mockStorageService;
    let swarm;

    beforeEach(() => {
        mockStorageService = {
            save: jest.fn().mockReturnValue(true),
            load: jest.fn().mockReturnValue(null),
            remove: jest.fn()
        };

        swarm = new Swarm(mockStorageService);
    });

    test('Swarm should have correct initial properties', () => {
        expect(swarm.bees.length).toBe(14);
        expect(swarm.bees.filter(b => b.name === 'Queen').length).toBe(1);
        expect(swarm.bees.filter(b => b.name === 'Worker').length).toBe(5);
        expect(swarm.bees.filter(b => b.name === 'Drone').length).toBe(8);
    });

    test('Swarm should initialize with correct data when no saved state', () => {

        expect(swarm.bees.length).toBe(14);
        expect(swarm.bees.filter(b => b.name === 'Queen').length).toBe(1);
        expect(swarm.bees.filter(b => b.name === 'Worker').length).toBe(5);
        expect(swarm.bees.filter(b => b.name === 'Drone').length).toBe(8);
    });

    test('Swarm should initialize with correct data when saved state exists', () => {
        const mockBees = [
            { name: 'Queen', maxHP: 100, currentHP: 100, isDead: false },
            { name: 'Worker', maxHP: 50, currentHP: 30, isDead: false },
            { name: 'Drone', maxHP: 30, currentHP: 0, isDead: true }
        ];

        mockStorageService.load.mockReturnValueOnce(mockBees);

        swarm.loadSwarm();

        expect(swarm.bees.length).toBe(3);
        expect(swarm.bees.filter(b => b.name === 'Queen').length).toBe(1);
        expect(swarm.bees.filter(b => b.name === 'Worker').length).toBe(1);
        expect(swarm.bees.filter(b => b.name === 'Drone').length).toBe(1);

        expect(swarm.bees[1].currentHP).toBe(30);
        expect(swarm.bees[2].isDead).toBe(true);
    });

    test('resetSwarm() should reset the swarm with initial values', () => {
        swarm.bees = [
            { name: 'Queen', isDead: false, currentHP: 75 },
            { name: 'Worker', isDead: false, currentHP: 10 },
            { name: 'Worker', isDead: true, currentHP: 0 },
            { name: 'Drone', isDead: false, currentHP: 10 },
            { name: 'Drone', isDead: false, currentHP: 5 }
        ];

        swarm.resetSwarm();

        expect(swarm.bees.filter(b => b.name === 'Queen').length).toBe(1);
        expect(swarm.bees.filter(b => b.name === 'Worker').length).toBe(5);
        expect(swarm.bees.filter(b => b.name === 'Drone').length).toBe(8);
        expect(swarm.getTotalHealth()).toBe(875);
    });

    test('saveSwarm() should call storageService.save() with bees array', () => {
        swarm.saveSwarm();

        expect(mockStorageService.save).toHaveBeenCalledWith('swarmBees', swarm.bees);
    });

    test('getRandomBee() should return a random alive bee', () => {
        swarm.bees = [
            { name: 'Queen', isDead: false },
            { name: 'Worker', isDead: true },
            { name: 'Drone', isDead: true }
        ];

        const randomBee = swarm.getRandomBee();

        expect(randomBee.isDead).toBe(false);
    });

    test('getTotalHealth() should return the sum of all alive bees health', () => {
        swarm.bees = [
            { name: 'Queen', isDead: false, currentHP: 75 },
            { name: 'Worker', isDead: false, currentHP: 10 },
            { name: 'Worker', isDead: true, currentHP: 0 },
            { name: 'Drone', isDead: false, currentHP: 10 },
            { name: 'Drone', isDead: false, currentHP: 5 }
        ];

        const totalHealth = swarm.getTotalHealth();

        expect(totalHealth).toBe(100);
    });

    test('isQueenDead() should return true if the queen is dead', () => {
        swarm.bees = [
            { name: 'Queen', isDead: true },
            { name: 'Worker', isDead: false },
            { name: 'Drone', isDead: false, currentHP: 10 },
            { name: 'Drone', isDead: false, currentHP: 5 }
        ];

        expect(swarm.isQueenDead()).toBe(true);
    });
});