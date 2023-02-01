/**
 * The data shape for a User.
 *
 * @typedef {Object} UserParams
 * @property {string} id The user's ID
 * @property {string} name The user's name
 */
export interface UserParams {
	[id: string]: string;
	name: string;
}

/**
 * The data shape for a Candidate.
 *
 * @typedef {Object} CandidateData
 * @property {string} id The candidate's ID
 * @property {string} name The candidate's name
 * @property {string} selfTitle The candidate's short description
 */
export interface CandidateData {
	[id: string]: string;
	name: string;
	selfTitle: string;
}

/**
 * The data shape for a social media account.
 *
 * @typedef {Object} Socials
 * @property {string} [twitter]
 * @property {string} [linkedin]
 * @property {string} [instagram]
 * @property {string} [facebook]
 */
export interface Socials {
	[twitter: string]: string;
	linkedin: string;
	instagram: string;
	facebook: string;
}

/**
 * The data shape for a User Profile.
 *
 * @typedef {Object} UserProfileParams
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} [image]
 * @property {string} [pronouns]
 * @property {string} [phone]
 * @property {string} [bio]
 * @property {string} [website]
 * @property {string} [location]
 * @property {string} [resume]
 * @property {boolean} [willTravel]
 * @property {string[]} [jobTitles]
 * @property {string[]} [unions]
 * @property {string[]} [education]
 * @property {string[]} [media]
 * @property {Socials} [socials]
 */
export interface UserProfileParams {
	id: string;
	name: string;
	selfTitle: string;
	email: string;
	image?: string;
	pronouns?: string;
	phone?: string;
	bio?: string;
	website?: string;
	location?: string;
	resume?: string;
	willTravel?: boolean;
	unions?: string[];
	education?: string[];
	media?: string[];
	socials?: Socials;
}

/**
 * The data shape for a Credit.
 *
 * @typedef {Object} CreditParams
 * @property {string} title The title of the production
 * @property {string} jobTitle The job title
 * @property {string} venue The venue
 * @property {string} year The year
 */
export interface CreditParams {
	[title: string]: string;
	jobTitle: string;
	venue: string;
	year: string;
}
