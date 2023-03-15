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
	resume?: string;
	willTravel?: boolean | null; // TODO is this null necessary?
	education?: string;
	media?: string[];
	socials: PersonalLinks = new PersonalLinks();
	locations?: number[] = [];
	unions: number[] = [];
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
				resume,
				education,
				credits,
			},
			{
				willTravel: Boolean(willTravel),
				locations: locations && locations.length > 0 ? this.extractIdsFromNodes(locations) : [],
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

	constructor(params: PersonalLinksParams = {}) {
		Object.assign(this, params);
	}
}

/**
 * A collection of credit positions.
 *
 * @param {WPItemParams[]} positions
 */
export class CreditPositions {
	department!: number;
	jobs: number[] = [];

	constructor(positions: WPItemParams[]) {
		this.department = positions[0]?.parentId ? positions[0].parentId : 0;
		this.jobs = positions.map((job) => job.id);
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
	positions: CreditPositions;
	skills: number[] = [];

	constructor(params: CreditParams) {
		this.id = params.id;
		this.title = params.title;
		this.venue = params.venue;
		this.year = params.year;
		this.skills = params.skills ? params.skills.nodes.map((skill) => skill.id) : [];
		this.positions = params.positions
			? new CreditPositions(params.positions.nodes)
			: { department: 0, jobs: [] };
	}

	/**
	 * Prepare a credit object for GraphQL.
	 *
	 * @returns {CreditOutput} A credit object formatted for GraphQL.
	 */
	prepareForGraphQL(): CreditOutput {
		return {
			id: this.id,
			title: this.title,
			venue: this.venue,
			year: this.year,
			skills: this.skills,
			jobs: this.positions.jobs,
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

	constructor(params: WPItemParams) {
		this.id = maybeParseInt(params.id);
		this.name = params.name ? unescape(params.name) : '';
		this.slug = params.slug ? params.slug : '';
	}
}
