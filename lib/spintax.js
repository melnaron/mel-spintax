/**
 * mel-spintax
 *
 * Parse Spintax formatted text (Nested Spintax supported)
 *
 * @copyright 2015 Dmitry Gureev
 * @license MIT Licensed
 *
 * Examples:
 *     // Get unspinned text
 *     console.log(spintax.unspin('{Hello|Hi} John!')); // "Hello John!" or "Hi John!"
 *     // Count unique variations
 *     console.log(spintax.count('{Hello|Hi} John!')); // 2
 */
(function(exports) {

	/**
	 * Check text is Spintax
	 *
	 * @param text {String} Spintax formatted string
	 * @return {Boolean}
	 */
	exports.isSpintax = function(text) {
		return text.match(/{.*(\|.*)+}/) !== null;
	};

	/**
	 * Find and return array of first Spintax occurence or null
	 *
	 * @param text {String} Spintax formatted string
	 * @return {null|Array}
	 */
	exports.findSpintax = function(text) {
		return text.match(/{([^{}]+?)}/);
	};

	/**
	 * Unspin Spintax text
	 *
	 * @param text {String} Spintax formatted string
	 * @return {String}
	 */
	exports.unspin = function(text) {
		var spin;
		var options;
		var choice;

		// While we find Spintax keep unspinning it
		while (exports.isSpintax(text)) {
			// Find first Spintax occurrence
			spin = exports.findSpintax(text);

			// Put the Spintax options in an array
			options = spin[1].split('|');

			// Choose a random option based on the options length
			choice = options[Math.floor(Math.random() * options.length)];

			// Put our unspun choice back into text
			text = text.replace(spin[0], choice);
		}

		return text;
	};

	/**
	 * Count Spintax variations
	 *
	 * @param text {String} Spintax formatted string
	 * @return {Number}
	 */
	exports.count = function(text) {
		var spin;
		var options;
		var num;
		var totals;
		var total = 0;
		var i;
		var reFind = /%%%\d+%%%/g;
		var reParse = /%%%(\d+)%%%/;
		var ps = 'N';
		var pm = '%%%' + ps + '%%%';

		while (exports.isSpintax(text)) {
			spin = exports.findSpintax(text);
			options = spin[1].split('|');
			num = 0;

			for (i = 0; i < options.length; i++) {
				if (options[i].match(reFind)) {
					num += parseInt(options[i].match(reParse)[1]) || 1;
				}
				else {
					num += 1;
				}
			}

			text = text.replace(spin[0], pm.replace(ps, num.toString()));
		}

		if (text.match(reFind)) {
			totals = text.match(reFind);
			total = 1;

			for (i = 0; i < totals.length; i++) {
				total *= parseInt(totals[i].match(reParse)[1]) || 1;
			}
		}

		return total;
	};

})(typeof exports === 'undefined' ? this['spintax'] = {} : exports);
