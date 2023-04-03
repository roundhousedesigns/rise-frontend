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
export class Candidate extends User implements CandidateData, UserProfileParams {
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
	willTour = false;
	education?: string;
	website?: string;
	socials = new PersonalLinks();
	locations: number[] = [];
	unions: number[] = [];
	experienceLevels: number[] = [];
	genderIdentities: number[] = [];
	racialIdentities: number[] = [];
	personalIdentities: number[] = [];
	mediaVideo1?: string;
	mediaVideo2?: string;
	mediaImage1?: string;
	mediaImage2?: string;
	mediaImage3?: string;
	mediaImage4?: string;
	mediaImage5?: string;
	mediaImage6?: string;
	credits: Credit[] = [];
	[other: string]: any;

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
			willTour,
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
			mediaVideo1,
			mediaVideo2,
			// mediaImage1,
			// mediaImage2,
			// mediaImage3,
			// mediaImage4,
			// mediaImage5,
			// mediaImage6,
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
		this.website = website;
		this.description = description;
		this.resume = resume;
		this.education = education;
		this.mediaVideo1 = mediaVideo1;
		this.mediaVideo2 = mediaVideo2;
		// this.mediaImage1 = mediaImage1;
		// this.mediaImage2 = mediaImage2;
		// this.mediaImage3 = mediaImage3;
		// this.mediaImage4 = mediaImage4;
		// this.mediaImage5 = mediaImage5;
		// this.mediaImage6 = mediaImage6;

		if (willTravel) {
			this.willTravel = true;
		}

		if (willTour) {
			this.willTour = true;
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

	constructor(params: PersonalLinksParams = {}) {
		Object.assign(this, params);
	}
}

/**
 * A production credit.
 */
export class Credit implements CreditParams {
	id: string;
	index: number = 0;
	title: string;
	jobTitle: string;
	jobLocation: string;
	venue: string;
	year: string;
	positions: {
		department: number[];
		jobs: number[];
	} = { department: [], jobs: [] };
	skills: number[];
	isNew: boolean = false;

	constructor(params: CreditParams) {
		this.id = params.id.toString();
		this.index = params.index;
		this.title = params.title ? params.title : '';
		this.jobTitle = params.jobTitle ? params.jobTitle : '';
		this.jobLocation = params.jobLocation ? params.jobLocation : '';
		this.venue = params.venue ? params.venue : '';
		this.year = params.year ? params.year : '';
		this.skills = params.skills ? params.skills : [];
		this.positions = this.getPositions(params) || { department: [], jobs: [] };
		this.isNew = Boolean(params.isNew) || false;
	}

	/**
	 * Get the positions of the credit.
	 * @param {CreditParams} params - Credit parameters
	 * @returns {Object} An object containing department and jobs
	 */
	private getPositions(params: CreditParams): { department: number[]; jobs: number[] } {
		if (params.positions) {
			return params.positions;
		}

		if (
			params.department &&
			params.department.length > 0 &&
			params.jobs &&
			params.jobs.length > 0
		) {
			return {
				department: params.department.map((department) => Number(department)),
				jobs: params.jobs.map((job) => Number(job)),
			};
		}

		return this.positions;
	}

	/**
	 * Sanitize properties for GraphQL mutation.
	 * @returns {CreditOutput} A sanitized credit object.
	 */
	prepareCreditForGraphQL(): CreditOutput {
		return {
			...this,
			id: Number(this.id),
			positions: this.positions.jobs,
		};
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
