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
		return firstName || lastName;
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
		super(params);
		Object.assign(this, params);
	}
}

/**
 * A user profile
 * @param {Object} params
 * @implements {UserProfileParams}
 * @implements {PersonalLinks}
 */
export class UserProfile extends User {
	firstName = '';
	lastName = '';
	email = '';
	selfTitle?: string;
	homebase?: string;
	image?: string;
	pronouns?: string;
	phone?: string;
	description?: string;
	resume?: string;
	willTravel = false;
	education?: string;
	socials = new PersonalLinks();
	locations: number[] = [];
	unions: number[] = [];
	experienceLevels: number[] = [];
	genderIdentities: number[] = [];
	racialIdentities: number[] = [];
	personalIdentities: number[] = [];
	credits: Credit[] = [];

	constructor(userParams: UserProfileParams, credits?: CreditParams[]) {
		const {
			id,
			firstName,
			lastName,
			selfTitle,
			email,
			homebase,
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

		super({ id, firstName, lastName });

		this.firstName = firstName;
		this.lastName = lastName;
		this.pronouns = pronouns;
		this.email = email;
		this.homebase = homebase;
		this.selfTitle = selfTitle;
		this.image = image;
		this.phone = phone;
		this.description = description;
		this.resume = resume;
		this.education = education;

		if (willTravel) {
			this.willTravel = true;
		}

		if (locations && locations.length > 0) {
			this.locations = this.extractIdsFromNodes(locations);
		}

		if (unions && unions.length > 0) {
			this.unions = this.extractIdsFromNodes(unions);
		}

		if (experienceLevels && experienceLevels.length > 0) {
			this.experienceLevels = this.extractIdsFromNodes(experienceLevels);
		}

		if (genderIdentities && genderIdentities.length > 0) {
			this.genderIdentities = this.extractIdsFromNodes(genderIdentities);
		}

		if (racialIdentities && racialIdentities.length > 0) {
			this.racialIdentities = this.extractIdsFromNodes(racialIdentities);
		}

		if (personalIdentities && personalIdentities.length > 0) {
			this.personalIdentities = this.extractIdsFromNodes(personalIdentities);
		}

		if (twitter) {
			this.socials.twitter = twitter;
		}

		if (linkedin) {
			this.socials.linkedin = linkedin;
		}

		if (instagram) {
			this.socials.instagram = instagram;
		}

		if (facebook) {
			this.socials.facebook = facebook;
		}

		if (website) {
			this.socials.website = website;
		}

		if (credits && credits.length > 0) {
			this.credits = credits.map((credit) => new Credit(credit));
		}
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
		return nodes.map((node) => (typeof node === 'number' ? node : node.id || 0));
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
	jobTitle: string;
	jobLocation: string;
	venue: string;
	year: string;
	positions: {
		department: number;
		jobs: number[];
	};
	skills: number[];
	isNew: boolean = false;

	constructor(params: CreditParams) {
		this.id = params.id ? params.id.toString() : generateRandomString(); // Generate a random ID if none is provided.
		this.title = params.title ? params.title : '';
		this.jobTitle = params.jobTitle ? params.jobTitle : '';
		this.jobLocation = params.jobLocation ? params.jobLocation : '';
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
