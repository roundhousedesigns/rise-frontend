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
	unions?: number[];
	genderIdentities?: number[];
	racialIdentities?: number[];
	personalIdentities?: number[];
	media?: string[];
	socials?: PersonalLinks;
	credits?: Credit[];

	constructor(userParams: UserProfileParams, credits?: CreditParams[]) {
		const {
			id,
			firstName,
			lastName,
			selfTitle,
			email,
			image,
			pronouns,
			phone,
			description,
			location,
			resume,
			willTravel,
			education,
			twitter,
			linkedin,
			instagram,
			facebook,
			website,
			unions,
			genderIdentities,
			racialIdentities,
			personalIdentities,
			// media,
			// credits,
		} = userParams;

		super({
			id: id,
			firstName: firstName,
			lastName: lastName,
		});

		Object.assign(
			this,
			{
				selfTitle,
				email,
				image,
				pronouns,
				phone,
				description,
				location,
				resume,
				willTravel,
				education,
			},
			{
				unions: unions && unions.length > 0 ? unions.map((item) => item.id) : [],
				genderIdentities:
					genderIdentities && genderIdentities.length > 0
						? genderIdentities.map((item) => item.id)
						: [],
				racialIdentities:
					racialIdentities && racialIdentities.length > 0
						? racialIdentities.map((item) => item.id)
						: [],
				personalIdentities:
					personalIdentities && personalIdentities.length > 0
						? personalIdentities.map((item) => item.id)
						: [],
				// media: media && media.length > 0 ? media : [],
				// FIXME Likely a data issue related to Credit object, something up with positions and skills.
				// credits: credits && credits.length > 0 ? credits.map((credit) => new Credit(credit)) : [],
				socials: new PersonalLinks({
					twitter: twitter || '',
					linkedin: linkedin || '',
					instagram: instagram || '',
					facebook: facebook || '',
					website: website || '',
				}),
			}
		);
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
