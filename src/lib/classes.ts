import { unescape } from 'lodash';
import {
	UserParams,
	CandidateData,
	UserProfileParams,
	CreditParams,
	PersonalLinksParams,
	WPItemParams,
} from './types';
import { maybeParseInt } from './utils';

/**
 * A basic user.
 *
 * @class User
 * @param {Object} params
 * @implements {UserParams}
 */
export class User {
	id!: number;
	firstName: string = '';
	lastName: string = '';

	constructor(params?: UserParams) {
		Object.assign(this, params, {
			id: params ? maybeParseInt(params.id) : 0,
		});
	}

	/**
	 * Generate a full name from a first and last name.
	 *
	 * @returns {string} The full name.
	 */
	fullName(): string {
		const { firstName, lastName } = this;

		if (firstName && lastName) return `${firstName} ${lastName}`;
		else if (firstName && !lastName) return firstName;
		else return lastName;
	}
}

/**
 * A candidate.
 * @class Candidate
 * @param {CandidateData} params
 * @implements {CandidateData}
 */
export class Candidate extends User {
	selfTitle?: string;
	image?: string;

	constructor(params: CandidateData) {
		super({
			id: params.id,
			firstName: params.firstName,
			lastName: params.lastName,
		});

		Object.assign(this, params);
	}

	fullName() {
		return super.fullName();
	}
}

/**
 * A user profile
 * @param {Object} params
 * @implements {UserProfileParams}
 * @implements {PersonalLinks}
 */
export class UserProfile extends User {
	name: string = '';
	email: string = '';
	selfTitle?: string;
	image?: string;
	pronouns?: string;
	phone?: string;
	description?: string;
	location?: string;
	resume?: string;
	willTravel?: boolean | null; // TODO is this null necessary?
	education?: string;
	unions?: WPItem[];
	media?: string[];
	socials?: PersonalLinks;
	credits?: Credit[];

	constructor(userParams: UserProfileParams, credits?: CreditParams[]) {
		super({
			id: userParams.id,
			firstName: userParams.firstName,
			lastName: userParams.lastName,
		});

		Object.assign(this, userParams, {
			name: `${userParams.firstName} ${userParams.lastName}`,
			description: userParams.description ? userParams.description : '',
			education: userParams.education ? userParams.education : '',
			media: userParams.media ? userParams.media.split('##') : [],
			credits: credits && credits.length > 0 ? [...credits] : [],
			socials: new PersonalLinks({
				twitter: userParams.twitter || '',
				linkedin: userParams.linkedin || '',
				instagram: userParams.instagram || '',
				facebook: userParams.facebook || '',
				website: userParams.website || '',
			}),
		});
	}

	fullName() {
		return super.fullName();
	}
}

/**
 * A collection of personal links and social media handles.
 * @param {PersonalLinksParams} params
 * @implements {PersonalLinksParams}
 */
export class PersonalLinks {
	twitter: string = '';
	linkedin: string = '';
	instagram: string = '';
	facebook: string = '';
	website: string = '';

	constructor(params: PersonalLinksParams) {
		Object.assign(this, params);
	}
}

/**
 * A production credit.
 * @param {CreditParams} params
 * @implements {CreditParams}
 */
export class Credit {
	title!: string;
	venue: string = '';
	year: string = '';
	positions: WPItem[]; // TODO Split this collection into departments and jobs.
	skills: WPItem[] = [];

	constructor(params: CreditParams) {
		this.title = params.title;
		this.venue = params.venue;
		this.year = params.year;
		this.positions = params.positions.nodes;
		this.skills = params.skills.nodes;
	}
}

/**
 * A generic WordPress item. Used for taxonomy terms, post objects, etc.
 * @param {WPItemParams} params
 * @implements {WPItemParams}
 */
export class WPItem {
	id!: number;
	name!: string;
	slug!: string;

	constructor(params: WPItemParams) {
		this.id = maybeParseInt(params.id);
		this.name = unescape(params.name);
		this.slug = params.slug;
	}
}
