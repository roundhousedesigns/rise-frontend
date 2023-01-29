/**
 * Dummy data, assorted dev detritus, and some sprinkles.
 */

import Chance from 'chance';
import { UserProfile } from './classes';

/**
 * Generate a one-d dummy data array of random nonsense words.
 * @param {Number} len The desired array length.
 * @param {Number} words (default: 3) The number of words per sentence.
 * @returns {Array} The one-dimensional array of dummy data.
 */
export const simpleWordsArray = (len, words = 3) => {
	var chance = new Chance();
	return [...Array(len)].map(() => {
		return [...Array(words)]
			.map((i, index) => chance.word() + (index < words ? ' ' : ''))
			.join(' ');
	});
};

export const _devRecentSearches = [
	'Recent search one',
	'Recent search two',
	'Recent search three',
];

export const _devSavedSearches = [
	'Saved search one',
	'Saved search two',
	'Saved search three',
];

export const _devProfileData = new UserProfile({
	name: 'Bob Bobbson',
	image: 'https://picsum.photos/300/400',
	pronouns: 'he/him',
	phone: '555-555-5555',
	unions: ['AFL-CIO', 'SAG-AFTRA'],
	jobTitles: ['Stage Manager', 'Assistant Stage Manager', 'Production Manager'],
	website: 'https://picsum.photos',
	location: 'Los Angeles, CA',
	willTravel: true,
	resume: 'https://picsum.photos',
	social: {
		twitter: 'bob_bobbson',
		linkedin: 'bob-bobbson',
		instagram: 'bob_bobbson',
		facebook: 'https://www.facebook.com/bob.bobbson',
	},
});
