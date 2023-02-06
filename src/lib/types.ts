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
 * The data shape for a Production Department.
 */
export interface DepartmentParams {
	slug: string;
	name: string;
}

/**
 * The data shape for a Credit.
 */
export interface CreditParams {
	title: string;
	jobTitle: string;
	venue: string;
	year: string;
	department?: DepartmentParams;
}

/**
 * The data shape for login input.
 */
export interface LoginInput {
	login: string;
	password: string;
}
