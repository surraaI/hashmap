// hashMapExample.js

class HashMap {
    constructor(initialSize = 16) {
        this.size = initialSize;
        this.buckets = new Array(this.size).fill(null).map(() => []);
        this.numElements = 0;
        this.loadFactor = 0.75;
    }

    // Hash function
    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
        return Math.abs(hashCode % this.size);
    }

    // Resize the hashmap if the load factor is exceeded
    resize() {
        const newSize = this.size * 2;
        const oldBuckets = this.buckets;
        this.size = newSize;
        this.buckets = new Array(this.size).fill(null).map(() => []);
        this.numElements = 0;

        oldBuckets.forEach(bucket => {
            bucket.forEach(([key, value]) => {
                this.set(key, value); // Rehash and insert existing entries
            });
        });
    }

    // Set key-value pair
    set(key, value) {
        const bucket = this.getBucket(key);
        const existingIndex = bucket.findIndex(([k, _]) => k === key);

        if (existingIndex >= 0) {
            // If key already exists, overwrite value
            bucket[existingIndex][1] = value;
        } else {
            // Add new key-value pair
            bucket.push([key, value]);
            this.numElements++;
        }

        // Resize if load factor exceeds 0.75
        if (this.numElements / this.size > this.loadFactor) {
            this.resize();
        }
    }

    // Get value by key
    get(key) {
        const bucket = this.getBucket(key);
        const found = bucket.find(([k, _]) => k === key);
        return found ? found[1] : null;
    }

    // Check if key exists
    has(key) {
        const bucket = this.getBucket(key);
        return bucket.some(([k, _]) => k === key);
    }

    // Remove key-value pair
    remove(key) {
        const bucket = this.getBucket(key);
        const indexToRemove = bucket.findIndex(([k, _]) => k === key);

        if (indexToRemove >= 0) {
            bucket.splice(indexToRemove, 1);
            this.numElements--;
            return true;
        }
        return false;
    }

    // Get number of stored keys
    length() {
        return this.numElements;
    }

    // Clear the hash map
    clear() {
        this.buckets = new Array(this.size).fill(null).map(() => []);
        this.numElements = 0;
    }

    // Return an array of all keys
    keys() {
        const keysArray = [];
        this.buckets.forEach(bucket => {
            bucket.forEach(([key, _]) => keysArray.push(key));
        });
        return keysArray;
    }

    // Return an array of all values
    values() {
        const valuesArray = [];
        this.buckets.forEach(bucket => {
            bucket.forEach(([_, value]) => valuesArray.push(value));
        });
        return valuesArray;
    }

    // Return an array of [key, value] pairs
    entries() {
        const entriesArray = [];
        this.buckets.forEach(bucket => {
            bucket.forEach(([key, value]) => entriesArray.push([key, value]));
        });
        return entriesArray;
    }

    // Helper method to get the bucket where the key maps
    getBucket(key) {
        const index = this.hash(key);
        if (index < 0 || index >= this.size) {
            throw new Error(`Out of bounds: Attempted to access bucket at index ${index}`);
        }
        return this.buckets[index];
    }
}
module.exports = HashMap;