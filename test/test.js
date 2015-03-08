var spintax = require('../index');

// Get unspinned text
console.log(spintax.unspin('{Hello|Hi} John!')); // "Hello John!" or "Hi John!"

// Count unique variations
console.log(spintax.count('{Hello|Hi} John!')); // 2
