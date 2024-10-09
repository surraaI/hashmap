// testHashSet.js

const HashSet = require('./hashset'); // Import the HashSet class

const testSet = new HashSet();

// Add keys to the set
testSet.add('apple');
testSet.add('banana');
testSet.add('carrot');
testSet.add('dog');
testSet.add('elephant');

console.log('HashSet after adding keys:');
console.log('Keys:', testSet.keys());
console.log('Size:', testSet.sizeOfSet());

// Test adding duplicate keys
testSet.add('banana'); // This should not add a duplicate
testSet.add('carrot'); // This should not add a duplicate

console.log('\nHashSet after trying to add duplicates:');
console.log('Keys:', testSet.keys());
console.log('Size:', testSet.sizeOfSet());

// Check if certain keys exist
console.log('\nChecking existence of keys:');
console.log('Has "dog":', testSet.has('dog'));
console.log('Has "frog":', testSet.has('frog'));

// Remove a key
testSet.remove('apple');
console.log('\nHashSet after removing "apple":');
console.log('Keys:', testSet.keys());
console.log('Size:', testSet.sizeOfSet());

// Clear the set
testSet.clear();
console.log('\nHashSet after clearing:');
console.log('Keys:', testSet.keys());
console.log('Size:', testSet.sizeOfSet());