import { UserParams, CandidateData, UserProfileParams, CreditParams, Socials } from './types';

/**
 * A basic user.
 *
 * @class User
 * @param {Object} params
 * @property {string} id
 * @property {string} name
 * @implements {UserParams}
 */
export class User {
	id: string;
	name: string;

	constructor(params: UserParams) {
		this.id = params.id;
		this.name = params.name;
	}
}

/**
 * A candidate.
 * @class Candidate
 * @param {CandidateData} params
 * @implements {CandidateData}
 */
export class Candidate extends User {
	selfTitle: string = '';

	constructor(params: CandidateData) {
		super({
			id: params.id,
			name: params.name,
		});

		Object.assign(this, params);
	}
}

/**
 * A user profile
 * @param {Object} params
 * @implements {UserProfileParams}
 * @implements {Socials}
 */
export class UserProfile extends User {
	selfTitle?: string;
	email?: string;
	image?: string;
	pronouns?: string;
	phone?: string;
	bio?: string;
	website?: string;
	location?: string;
	resume?: string;
	willTravel?: boolean | null;
	unions?: string[];
	education?: string[];
	media?: string[];
	socials?: Socials;

	constructor(params: UserProfileParams) {
		super({
			id: params.id,
			name: params.name,
		});

		Object.assign(
			this,
			{
				selfTitle: '',
				email: '',
				image: '',
				pronouns: '',
				phone: '',
				bio: '',
				website: '',
				location: '',
				resume: '',
				willTravel: null,
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
}

/**
 * A production credit.
 * @param {CreditParams} params
 * @implements {CreditParams}
 */
export class Credit {
	title: string = '';
	jobTitle: string = '';
	venue: string = '';
	year: string = '';

	constructor(params: CreditParams) {
		Object.assign(this, params);
	}
}

// TODO build Search class
class Search {
	constructor(...params: any[]) {}
}
