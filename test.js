// testHashMap.js

const HashMap = require('./hashmap'); // Import the HashMap class

const test = new HashMap();

// Populate the hash map
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

console.log('HashMap before adding "moon":');
console.log('Entries:', test.entries());
console.log('Keys:', test.keys());
console.log('Values:', test.values());
console.log('Length:', test.length());

// Try overwriting some nodes
test.set('apple', 'green');
test.set('banana', 'brown');

console.log('\nHashMap after overwriting some nodes:');
console.log('Entries:', test.entries());
console.log('Keys:', test.keys());
console.log('Values:', test.values());
console.log('Length:', test.length());

// Add the last node and trigger resizing
test.set('moon', 'silver');

console.log('\nHashMap after adding "moon" (resize triggered):');
console.log('Entries:', test.entries());
console.log('Keys:', test.keys());
console.log('Values:', test.values());
console.log('Length:', test.length());

// Overwrite again after resizing
test.set('carrot', 'yellow');
test.set('dog', 'black');

console.log('\nHashMap after overwriting post-resize:');
console.log('Entries:', test.entries());
console.log('Keys:', test.keys());
console.log('Values:', test.values());
console.log('Length:', test.length());

// Test other methods
console.log('\nTesting other methods:');
console.log('Has "lion":', test.has('lion'));
console.log('Get "moon":', test.get('moon'));
test.remove('grape');
console.log('Entries after removing "grape":', test.entries());
console.log('Length after removal:', test.length());

// Clear the hash map
test.clear();
console.log('\nHashMap after clearing:');
console.log('Entries:', test.entries());
console.log('Length:', test.length());