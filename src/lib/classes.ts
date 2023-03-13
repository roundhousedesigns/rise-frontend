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
	media?: string[];
	socials?: PersonalLinks;
	unions?: number[];
	genderIdentities?: number[];
	racialIdentities?: number[];
	personalIdentities?: number[];
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
				education,
				credits,
			},
			{
				willTravel: Boolean(willTravel),
				unions: unions && unions.length > 0 ? this.extractIdsFromNodes(unions) : [],
				genderIdentities:
					genderIdentities && genderIdentities.length > 0
						? this.extractIdsFromNodes(genderIdentities)
						: [],
				racialIdentities:
					racialIdentities && racialIdentities.length > 0
						? this.extractIdsFromNodes(racialIdentities)
						: [],
				personalIdentities:
					personalIdentities && personalIdentities.length > 0
						? this.extractIdsFromNodes(personalIdentities)
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

	/**
	 * Extract IDs from a collection of nodes.
	 *
	 * @param {WPItem[]} nodes A collection of nodes.
	 * @returns {number[]} A collection of IDs.
	 */
	extractIdsFromNodes(nodes: { [key: string]: any; id: number }[] | number[]): number[] {
		if (nodes.length === 0) return [];

		// TODO check performance on this
		// Sanitize the nodes.
		return nodes.map((node) => {
			if (typeof node === 'number') {
				return node;
			} else if (typeof node === 'object') {
				return Number(node.id);
			} else {
				return 0;
			}
		});
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
	id!: number;
	title!: string;
	venue: string = '';
	year: string = '';
	positions: WPItem[];
	skills: WPItem[] = [];

	constructor(params: CreditParams) {
		this.id = params.id;
		this.title = params.title;
		this.venue = params.venue;
		this.year = params.year;
		this.positions = params.positions;
		this.skills = params.skills;
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
	slug?: string;

	constructor(params: WPItemParams) {
		this.id = maybeParseInt(params.id);
		this.name = params.name ? unescape(params.name) : '';
		this.slug = params.slug ? params.slug : '';
	}
}
