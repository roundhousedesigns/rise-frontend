/**
 * Dummy data, assorted dev detritus, and some sprinkles.
 */

import Chance from 'chance';
import { UserProfile, Credit } from './classes';

/**
 * Generate a one-d dummy data array of random nonsense words.
 * @param {Number} len The desired array length.
 * @param {Number} words (default: 3) The number of words per sentence.
 * @returns {Array} The one-dimensional array of dummy data.
 */
export const simpleWordsArray = (len: Number, words: Number = 3): Array<string> => {
	var chance = new Chance();
	return [...Array(len)].map(() => {
		return [...Array(words)]
			.map((i, index) => chance.word() + (index < words ? ' ' : ''))
			.join(' ');
	});
};

export const _devRecentSearches = ['Recent search one', 'Recent search two', 'Recent search three'];

export const _devSavedSearches = ['Saved search one', 'Saved search two', 'Saved search three'];

export const _devProfileData = new UserProfile({
	id: '12345',
	name: 'Bob Bobbson',
	email: 'bob@bobbson.com',
	image: 'https://picsum.photos/300/400',
	pronouns: 'he/him',
	phone: '555-555-5555',
	website: 'https://picsum.photos',
	location: 'Los Angeles, CA',
	media: ['https://www.youtube.com/watch?v=arZRYbtb20M'],
	resume: 'https://picsum.photos',
	willTravel: true,
	jobTitles: ['Stage Manager', 'Assistant Stage Manager', 'Production Manager'],
	unions: ['IATSE', 'SAG-AFTRA'],
	education: ['MFA - Some Cool School', 'BA - Some Other Cool School'],
	socials: {
		twitter: 'bob_bobbson',
		linkedin: 'bob-bobbson',
		instagram: 'bob_bobbson',
		facebook: 'https://www.facebook.com/bob.bobbson',
	},
});

export const _devCreditsData = [
	new Credit({
		title: "Big Bob's Big Musicale",
		jobTitle: 'Main Boss Guy',
		venue: 'Big Ole Theatre',
		year: '2017',
	}),
	new Credit({ title: 'A Sad Tale', jobTitle: 'Peon', venue: 'The Dumps', year: '2020' }),
	new Credit({
		title: 'Future Me: A Retrospective',
		jobTitle: 'Everywhen',
		venue: 'The Universe',
		year: 'Unknowable',
	}),
];
