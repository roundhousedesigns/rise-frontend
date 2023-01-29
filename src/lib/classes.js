/**
 * Classes.
 */

// TODO build data structures and document.

export class User {
	constructor({ name, email, image }) {
		this.name = name;
		this.email = email;
		this.image = image;
	}
}

/**
 * A user profile.
 * @extends User
 * @param {Object} params
 * @param {string} params.name The user's name.
 * @param {string} params.email The user's email.
 * @param {string} params.image The user's profile image.
 * @param {string} params.bio The user's bio.
 * @param {string[]} params.unions The user's unions.
 * @param {string[]} params.jobTitles The user's job titles.
 * @param {Object} params.socials The user's social media handles.
 * @param {string} params.socials.twitter The user's Twitter handle.
 * @param {string} params.socials.linkedin The user's LinkedIn handle.
 * @param {string} params.socials.instagram The user's Instagram handle.
 * @param {string} params.socials.facebook The user's Facebook URL.
 * @param {string} params.website The user's website.
 * @returns {UserProfile} A user profile.
 */
export class UserProfile extends User {
	constructor({
		name = '',
		pronouns = '',
		email = '',
		phone = '',
		image = '',
		bio = '',
		unions = [],
		jobTitles = [],
		socials = {
			twitter: '',
			linkedin: '',
			instagram: '',
			facebook: '',
		},
		website = '',
		location = '',
		willTravel = null,
		resume = '',
	}) {
		super({ name, email, image });
		this.bio = bio;
		this.pronouns = pronouns;
		this.phone = phone;
		this.unions = unions;
		this.jobTitles = jobTitles;
		this.website = website;
		this.location = location;
		this.willTravel = willTravel;
		this.resume = resume;
		this.socials = {
			// MAYBE abstract this and standardize it.
			// TODO add sanitization for `@` in handles.
			twitter: socials.twitter.handle,
			linkedin: socials.linkedin.handle,
			instagram: socials.instagram.handle,
			facebook: socials.facebook.url,
		};
	}

	/**
	 * Converts a collection of job titles into a comma-separated string.
	 * @returns {String} A comma-separated list of job titles.
	 */
	jobList() {
		return this.jobTitles.join(', ');
	}

	/**
	 * Converts a collection of unions into a comma-separated string.
	 * @returns {String} A comma-separated list of unions.
	 */
	unionList() {
		return this.unions.join(', ');
	}

	/**
	 *
	 * @param {string} network The network label
	 * @returns {string} The base URL for the network.
	 */
	socialLink(network) {
		const socialLinkBases = {
			twitter: 'https://twitter.com/',
			linkedin: 'https://www.linkedin.com/in/',
			instagram: 'https://www.instagram.com/',
			facebook: '',
		};

		if (!(network in socialLinkBases)) {
			return;
		}
	}
}

export class Search {
	constructor(...params) {}
}
