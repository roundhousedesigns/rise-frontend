/**
 * The data shape for a User.
 */
export interface UserParams {
	id: number;
	firstName: string;
	lastName: string;
}

/**
 * The data shape for a Candidate.
 */
export interface CandidateData {
	id: number;
	firstName: string;
	lastName: string;
	selfTitle: string;
	image?: string;
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
	id: number;
	firstName: string;
	lastName: string;
	selfTitle?: string;
	email: string;
	image?: string;
	pronouns?: string;
	phone?: string;
	description?: string;
	location?: string;
	resume?: string;
	willTravel?: boolean;
	education?: string;
	media?: string;
	unions?: string[];
	twitter?: string;
	linkedin?: string;
	instagram?: string;
	facebook?: string;
	websiteUrl?: string;
}

/**
 * The data shape for a Production Position.
 */
export interface PositionTerm {
	id: number;
	parentId: number;
	slug: string;
	name: string;
}

export interface SkillTerm {
	id: number;
	slug: string;
	name: string;
}

/**
 * The data shape for a Credit.
 */
export interface CreditParams {
	title: string;
	venue: string;
	year: string;
	positions: {
		nodes: PositionTerm[];
	};
}

/**
 * The data shape for login input.
 */
export interface LoginInput {
	login: string;
	password: string;
}

/**
 * The data shape for a search query.
 */
export interface SearchParams {
	skills?: string[];
	department?: string;
	jobs?: string[];
}
