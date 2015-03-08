# mel-spintax

## Parse Spintax formatted text (Nested Spintax supported)

### Install

    npm install mel-spintax

### Example

    var spintax = require('mel-spintax');

    // Get unspinned text
    console.log(spintax.unspin('{Hello|Hi} John!')); // "Hello John!" or "Hi John!"

    // Count unique variations
    console.log(spintax.count('{Hello|Hi} John!')); // 2
