import { unescape } from 'lodash';
import {
	UserParams,
	CandidateData,
	UserProfileParams,
	CreditParams,
	PersonalLinksParams,
	WPItemParams,
	CreditOutput,
} from './types';
import { generateRandomString, maybeParseInt } from './utils';

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
	firstName: string = '';
	lastName: string = '';
	email: string = '';
	selfTitle?: string;
	image?: string;
	pronouns?: string;
	phone?: string;
	description?: string;
	resume?: string;
	willTravel?: boolean | null; // TODO is this null necessary?
	education?: string;
	media?: string[];
	socials: PersonalLinks = new PersonalLinks();
	locations?: number[] = [];
	unions: number[] = [];
	experienceLevels: number[] = [];
	genderIdentities: number[] = [];
	racialIdentities: number[] = [];
	personalIdentities: number[] = [];
	credits: Credit[] = [];
	[key: string]: any;

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
			resume,
			willTravel,
			education,
			twitter,
			linkedin,
			instagram,
			facebook,
			website,
			locations,
			unions,
			experienceLevels,
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
				firstName,
				lastName,
				pronouns,
				selfTitle,
				email,
				image,
				phone,
				description,
				resume,
				education,
				credits,
			},
			{
				willTravel: Boolean(willTravel),
				locations: locations && locations.length > 0 ? this.extractIdsFromNodes(locations) : [],
				unions: unions && unions.length > 0 ? this.extractIdsFromNodes(unions) : [],
				experienceLevels:
					experienceLevels && experienceLevels.length > 0
						? this.extractIdsFromNodes(experienceLevels)
						: [],
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

	constructor(params: PersonalLinksParams = {}) {
		Object.assign(this, params);
	}
}

/**
 * A production credit.
 * @param {CreditParams} params
 * @implements {CreditParams}
 */
export class Credit {
	id: string;
	title: string;
	venue: string;
	year: string;
	positions: {
		department: number;
		jobs: number[];
	};
	skills: number[];
	isNew: boolean = false;

	constructor(params: CreditParams) {
		this.id = params.id ? params.id.toString() : generateRandomString();
		this.title = params.title ? params.title : '';
		this.venue = params.venue ? params.venue : '';
		this.year = params.year ? params.year : '';
		this.skills = params.skills ? params.skills : [];
		this.isNew = params.isNew ? true : false;

		// Use the `positions` param if it's found, and if not, look for `jobs` and `department` params.
		if (params.jobs && params.jobs.length > 0 && params.department) {
			this.positions = {
				department: params.department,
				jobs: params.jobs.map((job) => Number(job)),
			};
		} else if (
			params.positions &&
			params.positions.hasOwnProperty('department') &&
			params.positions.department &&
			params.positions.hasOwnProperty('jobs')
		) {
			this.positions = params.positions;
		} else {
			this.positions = { department: 0, jobs: [] };
		}
	}

	/**
	 * Sanitize properties for GraphQL mutation.
	 * @param data Credit data
	 * @returns {CreditOutput} A sanitized credit object.
	 */
	prepareForGraphQL(): CreditOutput {
		return {
			...this,
			id: Number(this.id), // This returns NaN if the ID is a string (temporary ID). Fine for our purposes, for now.
			positions: this.positions.jobs,
		};
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
	parentId?: number;

	constructor(params: WPItemParams) {
		this.id = params.id ? maybeParseInt(params.id) : 0;
		this.name = params.name ? unescape(params.name) : '';
		this.slug = params.slug ? params.slug : '';
	}
}
