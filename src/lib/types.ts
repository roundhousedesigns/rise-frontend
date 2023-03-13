import { WPItem } from './classes';

/**
 * The data shape for a generic WordPress item.
 */
export interface WPItemParams {
	id: number;
	name?: string;
	slug?: string;
	parentId?: number;
}

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
export interface PersonalLinksParams {
	twitter?: string;
	linkedin?: string;
	instagram?: string;
	facebook?: string;
	website?: string;
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
	willTravel?: boolean | string | number | null;
	education?: string;
	media?: string;
	unions?: number[];
	genderIdentities?: number[];
	racialIdentities?: number[];
	personalIdentities?: number[];
	twitter?: string;
	linkedin?: string;
	instagram?: string;
	facebook?: string;
	website?: string;
}

/**
 * The data shape for a Credit.
 */
export interface CreditParams {
	title: string;
	venue: string;
	year: string;
	positions: {
		nodes: WPItem[];
	};
	skills: {
		nodes: WPItem[];
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
	position: {
		department?: string;
		jobs?: string[];
	};
	skills?: string[];
}
