export interface Socials {
	twitter: string;
	linkedin: string;
	instagram: string;
	facebook: string;
}

class User {
	id: string;
	name: string;
	email: string;
	image: string;
	constructor(params: {
		id: string;
		name: string;
		email: string;
		image: string;
	}) {
		this.id = params.id;
		this.name = params.name;
		this.email = params.email;
		this.image = params.image;
	}
}

interface UserProfileParams {
	id: string;
	name: string;
	email: string;
	pronouns?: string;
	phone?: string;
	image?: string;
	bio?: string;
	unions?: string[];
	jobTitles?: string[];
	socials?: Socials;
	website?: string;
	location?: string;
	willTravel?: boolean;
	resume?: string;
}

class UserProfile extends User {
	bio: string;
	pronouns: string;
	phone: string;
	unions: string[];
	jobTitles: string[];
	website: string;
	location: string;
	willTravel: boolean | null;
	resume: string;
	socials: Socials;
	constructor(params: UserProfileParams) {
		super({
			id: params.id,
			name: params.name,
			email: params.email || '',
			image: params.image || '',
		});
		this.bio = params.bio || '';
		this.pronouns = params.pronouns || '';
		this.phone = params.phone || '';
		this.unions = params.unions || [];
		this.jobTitles = params.jobTitles || [];
		this.website = params.website || '';
		this.location = params.location || '';
		this.willTravel = params.willTravel || null;
		this.resume = params.resume || '';
		this.socials = {
			twitter: params.socials?.twitter || '',
			linkedin: params.socials?.linkedin || '',
			instagram: params.socials?.instagram || '',
			facebook: params.socials?.facebook || '',
		};
	}

	jobList(): string {
		return this.jobTitles.join(', ');
	}

	unionList(): string {
		return this.unions.join(', ');
	}

	socialLink(network: string): string | undefined {
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

// TODO build Search class
class Search {
	constructor(...params: any[]) {}
}

export { User, UserProfile, Search };
