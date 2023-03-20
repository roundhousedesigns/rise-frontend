import { WPItem } from './classes';

/**
 * The data shape for generic WordPress item input.
 */
export interface WPItemParams {
	id: number;
	name?: string;
	slug?: string;
	parentId?: number;
}

/**
 * The data shape for User input.
 */
export interface UserParams {
	id: number;
	firstName: string;
	lastName: string;
}

/**
 * The data shape for Candidate input.
 */
export interface CandidateData {
	id: number;
	firstName: string;
	lastName: string;
	selfTitle: string;
	image?: string;
}

/**
 * The data shape for a PersonalLinks input.
 */
export interface PersonalLinksParams {
	twitter?: string;
	linkedin?: string;
	instagram?: string;
	facebook?: string;
	website?: string;
}

/**
 * The data shape for UserProfile input.
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
	resume?: string;
	willTravel?: boolean | string | number | null;
	education?: string;
	media?: string;
	locations?: number[] | WPItem[];
	unions?: number[] | WPItem[];
	experienceLevels?: number[] | WPItem[];
	genderIdentities?: number[] | WPItem[];
	racialIdentities?: number[] | WPItem[];
	personalIdentities?: number[] | WPItem[];
	twitter?: string;
	linkedin?: string;
	instagram?: string;
	facebook?: string;
	website?: string;
}

/**
 * The data shape for Credit input.
 */
export interface CreditParams {
	id?: number;
	title?: string;
	venue?: string;
	year?: string;
	department?: number;
	jobs?: number[];
	skills?: number[];
}

export interface CreditOutput {
	id: number;
	title: string;
	venue: string;
	year: string;
	jobs: number[];
	skills: number[];
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
	positions: {
		department?: string;
		jobs?: string[];
		skills?: string[];
	};
}
