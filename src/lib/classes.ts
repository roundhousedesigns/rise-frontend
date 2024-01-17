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
import { decodeString } from './utils';

/**
 * A basic user.
 */
export class User implements UserParams {
	id: number | null = null;
	slug: string | null = null;
	firstName?: string;
	lastName?: string;
	[prop: string]: any;

	constructor(params?: UserParams) {
		if (params) {
			Object.assign(this, params, {
				id: params.id ? Number(params.id) : null,
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
 * The logged in user.
 */
export class CurrentUser extends User {
	email: string;
	bookmarkedProfiles: number[];

	constructor(params?: UserParams & { email: string; bookmarkedProfiles: number[] }) {
		const { id, firstName, lastName, slug, email, bookmarkedProfiles } = params || {};

		super({
			id: id ? id : null,
			firstName: firstName ? firstName : '',
			lastName: lastName ? lastName : '',
			slug: slug ? slug : null,
		});

		this.email = email ? email : '';
		this.bookmarkedProfiles = bookmarkedProfiles ? bookmarkedProfiles : [];
	}

	/**
	 * Get the user's full name.
	 *
	 * @returns The user's full name.
	 */
	fullName() {
		return super.fullName();
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
	partnerDirectories: number[] = [];
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

	constructor(userParams?: UserProfileParams, credits?: CreditParams[]) {
		const {
			id,
			slug,
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
			socials,
			twitter,
			linkedin,
			instagram,
			facebook,
			website,
			locations,
			unions,
			partnerDirectories,
			experienceLevels,
			genderIdentities,
			racialIdentities,
			personalIdentities,
			mediaVideo1,
			mediaVideo2,
			mediaImage1,
			mediaImage2,
			mediaImage3,
			mediaImage4,
			mediaImage5,
			mediaImage6,
		} = userParams || {};

		super({ id: id ? id : null, firstName, lastName, slug: slug ? slug : null });

		this.firstName = firstName ? decodeString(firstName) : firstName;
		this.lastName = lastName ? decodeString(lastName) : lastName;
		this.pronouns = pronouns ? decodeString(pronouns) : pronouns;
		this.email = email;
		this.homebase = homebase ? decodeString(homebase) : homebase;
		this.selfTitle = selfTitle ? decodeString(selfTitle) : selfTitle;
		this.image = image;
		this.phone = phone;
		this.website = website;
		this.description = description ? decodeString(description) : description;
		this.resume = resume;
		this.education = education ? decodeString(education) : education;
		this.mediaVideo1 = mediaVideo1;
		this.mediaVideo2 = mediaVideo2;
		this.mediaImage1 = mediaImage1;
		this.mediaImage2 = mediaImage2;
		this.mediaImage3 = mediaImage3;
		this.mediaImage4 = mediaImage4;
		this.mediaImage5 = mediaImage5;
		this.mediaImage6 = mediaImage6;

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

		if (partnerDirectories && partnerDirectories.length > 0) {
			this.partnerDirectories = this.extractIdsFromNodes(partnerDirectories);
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

		if (twitter || socials?.twitter) {
			this.socials.twitter = twitter || socials?.twitter || '';
		}

		if (linkedin || socials?.linkedin) {
			this.socials.linkedin = linkedin || socials?.linkedin || '';
		}

		if (instagram || socials?.instagram) {
			this.socials.instagram = instagram || socials?.instagram || '';
		}

		if (facebook || socials?.facebook) {
			this.socials.facebook = facebook || socials?.facebook || '';
		}

		if (credits && credits.length > 0) {
			this.credits = credits.map((credit) => new Credit(credit));
		}
	}

	/**
	 * Get the user's full name.
	 *
	 * @returns The user's full name.
	 */
	fullName() {
		return super.fullName();
	}

	/**
	 * Extract sorted IDs from a collection of nodes.
	 */
	extractIdsFromNodes(nodes: { [key: string]: any; id: number }[] | number[]): number[] {
		const ids = nodes.map((node) => (typeof node === 'object' ? node.id : Number(node) || 0));

		// return the IDs sorted in ascending order (aids in profile edited/united comparison)
		return ids.sort((a, b) => a - b);
	}
}

/**
 * A candidate.
 */
export class Candidate extends User implements CandidateData, UserProfileParams {
	slug: string = '';
	searchScore?: number;
	selfTitle?: string;
	image?: string;

	constructor(params: CandidateData) {
		super(params);
		Object.assign(this, params);
	}
}

/**
 * A collection of personal links and social media handles.
 */
export class PersonalLinks implements PersonalLinksParams {
	[key: string]: string | (() => boolean) | undefined;
	twitter: string = '';
	linkedin: string = '';
	instagram: string = '';
	facebook: string = '';

	constructor(params: PersonalLinksParams = {}) {
		Object.assign(this, params);
	}

	/**
	 * Check if all properties are empty.
	 * @returns {boolean} True if all properties are empty.
	 */
	isEmpty(): boolean {
		// Loop through all keys in `this` and check if any are not empty.
		return Object.keys(this).every((key: string) => !this[key] as any);
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
	workStart: string;
	workEnd: string;
	workCurrent: boolean;
	intern: boolean;
	fellow: boolean;
	positions: {
		departments: number[];
		jobs: number[];
	} = { departments: [], jobs: [] };
	skills: number[];
	isNew: boolean = false;

	constructor(params: CreditParams) {
		this.id = params.id.toString();
		this.index = params.index;
		this.title = params.title ? params.title : '';
		this.jobTitle = params.jobTitle ? params.jobTitle : '';
		this.jobLocation = params.jobLocation ? params.jobLocation : '';
		this.venue = params.venue ? params.venue : '';
		this.workStart = params.workStart ? params.workStart : '';
		this.workEnd = params.workEnd ? params.workEnd : '';
		this.workCurrent = params.workCurrent || false;
		this.intern = params.intern || false;
		this.fellow = params.fellow || false;
		this.skills = params.skills ? params.skills : [];
		this.positions = this.getPositions(params) || { departments: [], jobs: [] };
		this.isNew = Boolean(params.isNew) || false;
	}

	/**
	 * Get the positions of the credit.
	 *
	 * @param {CreditParams} params - Credit parameters
	 * @returns {Object} An object containing departments and jobs
	 */
	private getPositions(params: CreditParams): { departments: number[]; jobs: number[] } {
		if (params.positions) {
			return params.positions;
		}

		if (
			params.departments &&
			params.departments.length > 0 &&
			params.jobs &&
			params.jobs.length > 0
		) {
			return {
				departments: params.departments.map((departments) => Number(departments)),
				jobs: params.jobs.map((job) => Number(job)),
			};
		}

		return this.positions;
	}

	/**
	 * Sanitize properties for GraphQL mutation.
	 *
	 * @returns {CreditOutput} A sanitized credit object.
	 */
	prepareCreditForGraphQL(): CreditOutput {
		const { positions, ...rest } = this;

		return {
			...rest,
			id: Number(this.id),
			departments: positions.departments,
			jobs: positions.jobs,
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
	parent?: any;
	taxonomyName?: string;
	externalUrl?: string;

	constructor(params: WPItemParams) {
		this.id = params.id ? Number(params.id) : 0;
		this.name = params.name ? unescape(params.name) : '';
		this.slug = params.slug ? params.slug : undefined;
		this.parentId = params.parentId ? Number(params.parentId) : undefined;
		this.parent = params.parent ? new WPItem(params.parent.node) : undefined;
		this.taxonomyName = params.taxonomyName ? params.taxonomyName : undefined;
		this.externalUrl = params.externalUrl ? params.externalUrl : undefined;
	}
}

/**
 * A WordPress post.
 */
export class WPPost extends WPItem {
	postType: string;
	author?: number;
	title?: string;
	excerpt?: string;
	content?: string;

	constructor(params: WPItemParams) {
		super(params);

		this.postType = params.postType;
		this.author = params.author ? params.author : undefined;
		this.title = params.title ? unescape(params.title) : undefined;
		this.excerpt = params.excerpt ? unescape(params.excerpt) : undefined;
		this.content = params.content ? unescape(params.content) : undefined;
	}
}
