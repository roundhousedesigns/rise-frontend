/**
 * The data shape for a User.
 */
export interface UserParams {
	id: Number;
	firstName: string;
	lastName: string;
}

/**
 * The data shape for a Candidate.
 */
export interface CandidateData {
	id: Number;
	firstName: string;
	lastName: string;
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
	id: Number;
	firstName: string;
	lastName: string;
	selfTitle?: string;
	email: string;
	image?: string;
	imageConnection?: {
		[key: string]: any;
	};
	pronouns?: string;
	phone?: string;
	description?: string;
	url?: string;
	location?: string;
	resume?: string;
	willTravel?: boolean;
	education?: string;
	media?: string;
	unions?: string[];
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

/**
 * The data shape for login input.
 */
export interface LoginInput {
	login: string;
	password: string;
}
