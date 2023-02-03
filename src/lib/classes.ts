import { asyncMap } from '@apollo/client/utilities';
import { UserParams, CandidateData, UserProfileParams, CreditParams, Socials } from './types';

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
	selfTitle?: string;
	email?: string;
	image?: string;
	pronouns?: string;
	phone?: string;
	description?: string;
	url?: string;
	location?: string;
	resume?: string;
	willTravel?: boolean | null;
	education?: string[];
	unions?: string[];
	media?: string[];
	socials?: Socials;

	constructor(params: UserProfileParams) {
		super({
			id: params.id,
			firstName: params.firstName,
			lastName: params.lastName,
		});

		Object.assign(this, params, {
			name: `${params.firstName} ${params.lastName}`,
			// Set the image to the imageConnection node link if it exists, otherwise use the image param.
			image: params.image
				? params.image
				: params.imageConnection?.node.mediaItemUrl
				? params.imageConnection.node.mediaItemUrl
				: '',
			education: params.education ? params.education.split('|') : [],
			media: params.media ? params.media.split('|') : [],
		});
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
// class Search {
// 	constructor(...params: any[]) {}
// }
