/**
 * The data shape for a User.
 */
export interface UserParams {
	[id: string]: string;
	name: string;
}

/**
 * The data shape for a Candidate.
 */
export interface CandidateData {
	[id: string]: string;
	name: string;
	selfTitle: string;
}

/**
 * The data shape for a social media account.
 */
export interface Socials {
	[twitter: string]: string;
	linkedin: string;
	instagram: string;
	facebook: string;
}

/**
 * The data shape for a User Profile.
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
 */
export interface CreditParams {
	[title: string]: string;
	jobTitle: string;
	venue: string;
	year: string;
}
