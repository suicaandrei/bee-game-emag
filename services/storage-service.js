export class StorageService {
    constructor(storageProvider = localStorage) {
        this.storage = storageProvider;
    }

    save(key, data) {
        this.storage.setItem(key, JSON.stringify(data));
    }

    load(key) {
        const data = this.storage.getItem(key);

        try {
            return JSON.parse(data);
        } catch (error) {
            return data
        }
    }

    remove(key) {
        this.storage.removeItem(key);
    }
}