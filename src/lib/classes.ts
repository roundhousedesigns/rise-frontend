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
 */
export class User implements UserParams {
	id: number = 0;
	firstName?: string;
	lastName?: string;

	constructor(params?: UserParams) {
		if (params) {
			Object.assign(this, params, {
				id: maybeParseInt(params.id),
			});
		}
	}

	/**
	 * Generate a full name from a first and last name.
	 */
	fullName(): string {
		const { firstName, lastName } = this;
		return [firstName, lastName].filter(Boolean).join(' ');
	}
}

/**
 * A candidate.
 */
export class Candidate extends User implements CandidateData, UserProfileParams, CreditParams {
	selfTitle?: string;
	image?: string;

	constructor(params: CandidateData) {
		super(params);
		Object.assign(this, params);
	}
}

/**
 * A user profile
 */
export class UserProfile extends User {
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
	 */
	extractIdsFromNodes(nodes: { [key: string]: any; id: number }[] | number[]): number[] {
		return nodes.map((node) => (typeof node === 'number' ? node : node.id || 0));
	}
}

/**
 * A collection of personal links and social media handles.
 */
export class PersonalLinks implements PersonalLinksParams {
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
 */
export class Credit implements CreditParams {
	id: string;
	title: string = '';
	jobTitle: string = '';
	jobLocation: string = '';
	venue: string = '';
	year: string = '';
	positions: {
		department: number;
		jobs: number[];
	} = { department: 0, jobs: [] };
	skills: number[] = [];
	isNew: boolean = false;

	constructor(params: CreditParams) {
		this.id = params.id ? params.id.toString() : generateRandomString(); // Generate a random ID if none is provided.
		Object.assign(this, params, {
			positions: this.getPositions(params),
			isNew: Boolean(params.isNew),
		});
	}

	/**
	 * Sanitize properties for GraphQL mutation.
	 * @returns {CreditOutput} A sanitized credit object.
	 */
	prepareForGraphQL(): CreditOutput {
		return {
			...this,
			id: Number(this.id),
			positions: this.positions.jobs,
		};
	}

	/**
	 * Get the positions of the credit.
	 * @param {CreditParams} params - Credit parameters
	 * @returns {Object} An object containing department and jobs
	 */
	private getPositions(params: CreditParams): { department: number; jobs: number[] } {
		if (params.positions) {
			return params.positions;
		}
		if (params.department && params.jobs && params.jobs.length > 0) {
			return {
				department: params.department,
				jobs: params.jobs.map((job) => Number(job)),
			};
		}
		return this.positions;
	}
}

/**
 * A generic WordPress item. Used for taxonomy terms, post objects, etc.
 */
export class WPItem implements WPItemParams {
	id: number;
	name: string;
	slug?: string;
	parentId?: number;

	constructor(params: WPItemParams) {
		this.id = params.id ? maybeParseInt(params.id) : 0;
		this.name = params.name ? unescape(params.name) : '';
		this.slug = params.slug ? params.slug : undefined;
		this.parentId = params.parentId ? maybeParseInt(params.parentId) : undefined;
	}
}
