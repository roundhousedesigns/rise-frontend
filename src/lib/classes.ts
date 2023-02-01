/**
 * A basic user.
 *
 * @class User
 * @param {Object} params
 * @property {string} id
 * @property {string} name
 * @property {string} email
 */
class User {
	id: string;
	name: string;
	email: string;

	constructor(params: { id: string; name: string; email: string }) {
		this.id = params.id;
		this.name = params.name;
		this.email = params.email;
	}
}

/**
 * Social media links.
 *
 * @interface Socials
 * @typedef {Object} Socials
 * @property {string} [twitter]
 * @property {string} [linkedin]
 * @property {string} [instagram]
 * @property {string} [facebook]
 */
export interface Socials {
	[twitter: string]: string;
	linkedin: string;
	instagram: string;
	facebook: string;
}

/**
 * The data shape for a user profile.
 *
 * @interface UserProfileParams
 * @typedef {Object} UserProfileParams
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} [image]
 * @property {string} [pronouns]
 * @property {string} [phone]
 * @property {string} [bio]
 * @property {string[]} [jobTitles]
 * @property {Socials} [socials]
 * @property {string} [website]
 * @property {string} [location]
 * @property {boolean} [willTravel]
 * @property {string} [resume]
 * @property {string[]} [unions]
 * @property {string[]} [education]
 * @property {string[]} [media]
 */
interface UserProfileParams {
	id: string;
	name: string;
	email: string;
	image?: string;
	pronouns?: string;
	phone?: string;
	bio?: string;
	website?: string;
	location?: string;
	resume?: string;
	willTravel?: boolean;
	jobTitles?: string[];
	unions?: string[];
	education?: string[];
	media?: string[];
	socials?: Socials;
}

/**
 * A user profile
 * @param {Object} params
 * @implements {UserProfileParams}
 * @implements {Socials}
 */
class UserProfile extends User {
	image?: string;
	pronouns?: string;
	phone?: string;
	bio?: string;
	website?: string;
	location?: string;
	resume?: string;
	willTravel?: boolean | null;
	jobTitles?: string[];
	unions?: string[];
	education?: string[];
	media?: string[];
	socials?: Socials;

	constructor(params: UserProfileParams) {
		super({
			id: params.id,
			name: params.name,
			email: params.email || '',
		});

		Object.assign(
			this,
			{
				image: '',
				pronouns: '',
				phone: '',
				bio: '',
				website: '',
				location: '',
				resume: '',
				willTravel: null,
				jobTitles: [],
				unions: [],
				education: [],
				media: [],
				socials: {
					twitter: '',
					linkedin: '',
					instagram: '',
					facebook: '',
				},
			},
			params
		);
	}

	/**
	 * Returns a comma separated list of job titles
	 *
	 * @returns {string} comma separated list of job titles
	 */
	jobList(): string {
		const { jobTitles } = this;

		return jobTitles && jobTitles.length ? jobTitles.join(', ') : '';
	}

	/**
	 * Returns a comma separated list of unions
	 *
	 * @returns {string} comma separated list of unions
	 */
	unionList(): string {
		const { unions } = this;
		return unions && unions.length ? unions.join(', ') : '';
	}
}

// TODO build Search class
class Search {
	constructor(...params: any[]) {}
}

export { User, UserProfile, Search };
