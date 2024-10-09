// hashSet.js

class HashSet {
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

    // Resize the hash set
    resize() {
        const newSize = this.size * 2;
        const oldBuckets = this.buckets;
        this.size = newSize;
        this.buckets = new Array(this.size).fill(null).map(() => []);
        this.numElements = 0;

        oldBuckets.forEach(bucket => {
            bucket.forEach(key => {
                this.add(key);
            });
        });
    }

    // Add a key to the set
    add(key) {
        const bucket = this.getBucket(key);
        if (!this.has(key)) {
            bucket.push(key);
            this.numElements++;
        }

        if (this.numElements / this.size > this.loadFactor) {
            this.resize();
        }
    }

    // Check if the key exists
    has(key) {
        const bucket = this.getBucket(key);
        return bucket.includes(key);
    }

    // Remove a key from the set
    remove(key) {
        const bucket = this.getBucket(key);
        const indexToRemove = bucket.indexOf(key);

        if (indexToRemove >= 0) {
            bucket.splice(indexToRemove, 1);
            this.numElements--;
            return true;
        }
        return false;
    }

    // Get the number of stored keys
    sizeOfSet() {
        return this.numElements;
    }

    // Clear the hash set
    clear() {
        this.buckets = new Array(this.size).fill(null).map(() => []);
        this.numElements = 0;
    }

    // Return an array of all keys
    keys() {
        const keysArray = [];
        this.buckets.forEach(bucket => {
            bucket.forEach(key => keysArray.push(key));
        });
        return keysArray;
    }

    // Get the bucket where the key maps
    getBucket(key) {
        const index = this.hash(key);
        if (index < 0 || index >= this.size) {
            throw new Error(`Out of bounds: Attempted to access bucket at index ${index}`);
        }
        return this.buckets[index];
    }
}

module.exports = HashSet; // Export the HashSet class