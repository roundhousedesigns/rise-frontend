/**
 * Dummy data, assorted dev detritus, and some sprinkles.
 */

import Chance from 'chance';
var chance = new Chance();

/**
 * Generate a one-d dummy data array of random nonsense words.
 * @param {Number} len The desired array length.
 * @param {Number} words (default: 3) The number of words per sentence.
 * @returns {Array} The one-dimensional array of dummy data.
 */
export const simpleWordsArray = (len, words = 3) =>
	[...Array(len)].map(() => {
		return [...Array(words)].map(
			(i, index) => chance.word() + (index < words ? ' ' : '')
		);
	});
