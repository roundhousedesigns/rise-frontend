import { WPItem } from './classes';

/**
 * The data shape for generic WordPress item input.
 */
export interface WPItemParams {
	id: number;
	name?: string;
	slug?: string;
	author?: number;
	parentId?: number;
	parent?: any;
	[key: string]: any;
}

/**
 * The data shape for User input.
 */
export interface UserParams {
	id: number | null;
	slug: string | null;
	firstName?: string;
	lastName?: string;
}

/**
 * The data shape for UserProfile input.
 */
export interface UserProfileParams {
	id: number | null;
	slug: string | null;
	firstName?: string;
	lastName?: string;
	email?: string;
	selfTitle?: string;
	homebase?: string;
	image?: string;
	pronouns?: string;
	phone?: string;
	description?: string;
	resume?: string;
	willTravel?: boolean | string | number | null;
	willTour?: boolean | string | number | null;
	education?: string;
	mediaVideo1?: string;
	mediaVideo2?: string;
	mediaImage1?: string;
	mediaImage2?: string;
	mediaImage3?: string;
	mediaImage4?: string;
	mediaImage5?: string;
	mediaImage6?: string;
	locations?: number[] | WPItem[];
	unions?: number[] | WPItem[];
	partnerDirectories?: number[] | WPItem[];
	experienceLevels?: number[] | WPItem[];
	genderIdentities?: number[] | WPItem[];
	racialIdentities?: number[] | WPItem[];
	personalIdentities?: number[] | WPItem[];
	socials?: PersonalLinksParams;
	twitter?: string;
	linkedin?: string;
	instagram?: string;
	facebook?: string;
	website?: string;
}

/**
 * The data shape for Candidate input.
 */
export interface CandidateData {
	id: number | null;
	slug: string;
	firstName?: string;
	lastName?: string;
	selfTitle?: string;
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
}

/**
 * The data shape for Credit input.
 */
export interface CreditParams {
	id: string | number; // Allowing a string here because we sometimes need to generate a unique ID for a new credit, and alphanumeric is better.
	index: number;
	title?: string;
	jobTitle?: string;
	jobLocation?: string;
	venue?: string;
	workStart?: string;
	workEnd?: string;
	workCurrent?: boolean;
	intern?: boolean;
	fellow?: boolean;
	departments?: number[];
	jobs?: number[];
	positions: {
		departments: number[];
		jobs: number[];
	};
	skills?: number[];
	isNew?: boolean;
}

/**
 * The data shape for Credit output to GraphQL.
 */
export interface CreditOutput {
	id: number;
	index: number;
	title: string;
	jobTitle: string;
	jobLocation: string;
	venue: string;
	workStart: string;
	workEnd: string;
	workCurrent: boolean;
	intern: boolean;
	fellow: boolean;
	departments: number[];
	jobs: number[];
	skills: number[];
	isNew: boolean;
}

/**
 * The data shape for login input.
 */
export interface LoginInput {
	login: string;
	password: string;
	reCaptchaToken: string;
}

/**
 * The data shape for user registration input.
 */
export interface RegisterUserInput {
	email: string;
	firstName: string;
	lastName: string;
	password: string;
	confirmPassword: string;
	reCaptchaToken: string;
}

/**
 * The data shape for updating a user's password.
 */
export interface ChangePasswordInput {
	currentPassword?: string;
	newPassword: string;
	confirmPassword: string;
}

export interface updateBookmarkedProfilesInput {
	userId: number;
	toggledUserId: number;
}

/**
 * The data shape for a search query.
 */
export interface SearchFilterSet {
	positions: {
		departments?: string[];
		jobs?: string[];
	};
	skills?: string[];
	unions?: string[];
	locations?: string[];
	experienceLevels?: string[];
	genderIdentities?: string[];
	racialIdentities?: string[];
	personalIdentities?: string[];
	searchName?: string;
}

/**
 * The data shape for a raw search query (flat `positions`).
 */
export interface SearchFilterSetRaw {
	positions?: string[];
	skills?: string[];
	unions?: string[];
	locations?: string[];
	experienceLevels?: string[];
	genderIdentities?: string[];
	racialIdentities?: string[];
	personalIdentities?: string[];
	searchName?: string;
}

/**
 * The data shape for a search query.
 */
export interface SearchFilterSet {
	positions: {
		departments?: string[];
		jobs?: string[];
	};
	skills?: string[];
	unions?: string[];
	locations?: string[];
	experienceLevels?: string[];
	genderIdentities?: string[];
	racialIdentities?: string[];
	personalIdentities?: string[];
	searchName?: string;
	[key: string]: any;
}

/**
 * The data shape for a raw search query (flat `positions`).
 */
export interface SearchFilterSetRaw {
	positions?: string[];
	skills?: string[];
	unions?: string[];
	locations?: string[];
	experienceLevels?: string[];
	genderIdentities?: string[];
	racialIdentities?: string[];
	personalIdentities?: string[];
	searchName?: string;
	[key: string]: any;
}

/**
 * The data shape for a search result item: departments, jobs, skills, filters (collected).
 */
export interface OrganizedSearchTerms {
	departments: WPItem[];
	jobs: WPItem[];
	skills: WPItem[];
	filters: WPItem[];
}

/**
 * The data shape for a search result item (id and search score).
 */
export interface SearchResultCandidate {
	id: number;
	score: number;
}
