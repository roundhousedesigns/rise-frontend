/**
 * Dummy data, assorted dev detritus, and some sprinkles.
 */

import Chance from 'chance';
import { UserProfile, Credit, Candidate } from './classes';

/**
 * Generate a one-d dummy data array of random nonsense words.
 * @param {number} len The desired array length.
 * @param {number} words (default: 3) The number of words per sentence.
 * @returns {Array} The one-dimensional array of dummy data.
 */
export const simpleWordsArray = (len: number, words: number = 3): Array<string> => {
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
	id: 27846,
	firstName: 'Bob',
	lastName: 'Bobbson',
	selfTitle: 'One Awesome Carpenter',
	email: 'bob@bobbson.com',
	image: 'https://picsum.photos/300/400',
	pronouns: 'he/him',
	phone: '555-555-5555',
	websiteUrl: 'https://picsum.photos',
	description: 'I am a carpenter. I am awesome. I am Bob Bobbson.',
	location: 'Los Angeles, CA',
	media: 'https://www.youtube.com/watch?v=arZRYbtb20M',
	resume: 'https://picsum.photos',
	willTravel: true,
	unions: ['IATSE', 'SAG-AFTRA'],
	education: 'MFA - Some Cool School##BA - Some Other Cool School',
	twitter: 'bob_bobbson',
	linkedin: 'bob-bobbson',
	instagram: 'bob_bobbson',
	facebook: 'https://www.facebook.com/bob.bobbson',
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
		jobTitle: 'Head Electrician',
		venue: 'The Universe',
		year: 'Unknowable',
	}),
];

export const _devSavedCandidates = [
	new Candidate({
		id: 23456,
		firstName: 'Jim',
		lastName: 'Jimmson',
		selfTitle: 'Head Cheesemaker',
	}),
	new Candidate({
		id: 34567,
		firstName: 'Sally',
		lastName: 'Sallyberries',
		selfTitle: 'Headcheese Maker',
	}),
];
