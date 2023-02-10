import {
	UserParams,
	CandidateData,
	UserProfileParams,
	CreditParams,
	Socials,
	PositionTerm,
} from './types';

/**
 * A basic user.
 *
 * @class User
 * @param {Object} params
 * @implements {UserParams}
 */
export class User {
	id: Number = 0;
	firstName: string = '';
	lastName: string = '';

	constructor(params: UserParams) {
		Object.assign(this, params);
	}
}

/**
 * A candidate.
 * @class Candidate
 * @param {CandidateData} params
 * @implements {CandidateData}
 */
export class Candidate extends User {
	fullName: string = '';
	selfTitle?: string;

	constructor(params: CandidateData) {
		super({
			id: params.id,
			firstName: params.firstName,
			lastName: params.lastName,
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
	name: string = '';
	contactEmail: string = '';
	selfTitle?: string;
	image?: string;
	pronouns?: string;
	phone?: string;
	description?: string;
	websiteUrl?: string;
	location?: string;
	resume?: string;
	willTravel?: boolean | null;
	education?: string[];
	unions?: string[];
	media?: string[];
	socials?: Socials;
	credits?: Credit[];

	constructor(userParams: UserProfileParams, credits?: CreditParams[]) {
		super({
			id: userParams.id,
			firstName: userParams.firstName,
			lastName: userParams.lastName,
		});

		Object.assign(this, userParams, {
			name: `${userParams.firstName} ${userParams.lastName}`,
			education: userParams.education ? userParams.education.split('##') : [],
			media: userParams.media ? userParams.media.split('##') : [],
			credits: credits && credits.length > 0 ? [...credits] : [],
			socials: {
				twitter: userParams.twitter || '',
				linkedin: userParams.linkedin || '',
				instagram: userParams.instagram || '',
				facebook: userParams.facebook || '',
			},
		});
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
	positions!: {
		nodes: PositionTerm[];
	};

	constructor(params: CreditParams) {
		Object.assign(this, params);
	}
}

// TODO build Search class
// class Search {
// 	constructor(...params: any[]) {}
// }
