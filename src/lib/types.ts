import { DateRange, SearchFilterSet, WPItem } from '@lib/classes';

/**
 * The data shape for generic WordPress item input.
 */
export interface WPItemParams {
	id: number;
	name?: string;
	slug?: string;
	title?: string;
	content?: string;
	author?: number;
	parentId?: number;
	parent?: any;
	[key: string]: any;
}

/**
 * The data shape for generic WordPress attachment input.
 */
export interface WPAttachmentParams {
	id: number;
	srcSet?: string;
	sourceUrl?: string;
	sizes?: string;
	title?: string;
}

/**
 * The data shape for User input.
 */
export interface UserParams {
	id: number | null;
	slug: string | null;
	firstName?: string;
	lastName?: string;
}

/**
 * The data shape for UserProfile input.
 */
export interface UserProfileParams {
	id: number | null;
	slug: string | null;
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
	willTravel?: boolean | string | number | null;
	willTour?: boolean | string | number | null;
	education?: string;
	multilingual?: boolean;
	languages?: string;
	socials?: PersonalLinksParams;
	twitter?: string;
	linkedin?: string;
	instagram?: string;
	facebook?: string;
	website?: string;
	mediaVideo1?: string;
	mediaVideo2?: string;
	mediaImage1?: string;
	mediaImage2?: string;
	mediaImage3?: string;
	mediaImage4?: string;
	mediaImage5?: string;
	mediaImage6?: string;
	locations?: number[] | WPItem[];
	unions?: number[] | WPItem[];
	partnerDirectories?: number[] | WPItem[];
	experienceLevels?: number[] | WPItem[];
	genderIdentities?: number[] | WPItem[];
	racialIdentities?: number[] | WPItem[];
	personalIdentities?: number[] | WPItem[];
}

/**
 * The data shape for Candidate input.
 */
export interface CandidateData {
	id: number | null;
	slug: string;
	firstName?: string;
	lastName?: string;
	selfTitle?: string;
	image?: string;
}

/**
 * The data shape for a PersonalLinks input.
 */
export interface PersonalLinksParams {
	twitter?: string;
	linkedin?: string;
	instagram?: string;
	facebook?: string;
}

/**
 * The data shape for Credit input.
 */
export interface CreditParams {
	id: string | number; // Allowing a string here because we sometimes need to generate a unique ID for a new credit, and alphanumeric is better.
	index: number;
	title?: string;
	jobTitle?: string;
	jobLocation?: string;
	venue?: string;
	workStart?: string;
	workEnd?: string;
	workCurrent?: boolean;
	intern?: boolean;
	fellow?: boolean;
	departments?: number[];
	jobs?: number[];
	positions: {
		departments: number[];
		jobs: number[];
	};
	skills?: number[];
	isNew?: boolean;
}

/**
 * The data shape for DateRange input.
 */
export interface DateRangeParams {
	id?: number;
	startDate?: string | Date | undefined;
	endDate?: string | Date | undefined;
}

/**
 * The data shape for Credit output to GraphQL.
 */
export interface CreditOutput {
	id: number;
	index: number;
	title: string;
	jobTitle: string;
	jobLocation: string;
	venue: string;
	workStart: string;
	workEnd: string;
	workCurrent: boolean;
	intern: boolean;
	fellow: boolean;
	departments: number[];
	jobs: number[];
	skills: number[];
	isNew: boolean;
}

/**
 * The data shape for login input.
 */
export interface LoginInput {
	login: string;
	password: string;
	reCaptchaToken: string;
}

/**
 * The data shape for user registration input.
 */
export interface RegisterUserInput {
	email: string;
	firstName: string;
	lastName: string;
	password: string;
	confirmPassword: string;
	reCaptchaToken: string;
}

/**
 * The data shape for updating a user's password.
 */
export interface ChangePasswordInput {
	currentPassword?: string;
	newPassword: string;
	confirmPassword: string;
}

/**
 * The data shape for updating a user's email.
 */
export interface ChangeEmailInput {
	currentPassword?: string;
	newEmail: string;
	confirmEmail: string;
}

export interface updateStarredProfilesInput {
	userId: number;
	toggledUserId: number;
}

/**
 * The data shape for a search query.
 */
export interface SearchFilterSetParams {
	[key: string]: any;
	positions:
		| {
				departments?: string[];
				jobs?: string[];
		  }
		| string[];
	skills?: string[];
	jobDates?: DateRange;
	unions?: string[];
	locations?: string[];
	experienceLevels?: string[];
	genderIdentities?: string[];
	racialIdentities?: string[];
	personalIdentities?: string[];
}

/**
 * The data shape for a search result item: departments, jobs, skills, filters (collected).
 */
export interface ParsedSearch {
	id: number;
	title: string;
	filters: SearchFilterSet;
	// Add any other properties you need
}

/**
 * The data shape for a search result item: departments, jobs, skills, filters (collected).
 */
export interface OrganizedSearchTerms {
	departments: WPItem[];
	jobs: WPItem[];
	skills: WPItem[];
	filters: WPItem[];
}

/**
 * The data shape for a search result item (id and search score).
 */
export interface SearchResultCandidate {
	id: number;
	score: number;
}

/**
 * The data shape for a Profile Notice Alert.
 */
export interface ProfileNoticeAlert {
	title: string;
	description?: string | JSX.Element;
	cta?: {
		button?: {
			to: string;
			text: string;
		};
		element?: JSX.Element;
	};
}

/**
 * The data shape for the Viewer.
 */
export interface ViewerData {
	loggedInId: number;
	loggedInSlug: string;
	email: string;
	username: string;
	firstName?: string;
	lastName?: string;
	disableProfile?: boolean;
	starredProfiles?: number[];
}

/**
 * The data shape for a Job.
 */
export interface JobPostParams {
	id: number;
	authorNode?: {
		node: {
			databaseId: number;
		};
	};
	author?: number;
	status?: string;
	title: string;
	companyName: string;
	companyAddress: string;
	contactName: string;
	contactEmail: string;
	contactPhone?: string;
	startDate: string;
	endDate?: string;
	instructions: string;
	compensation?: string;
	applicationUrl?: string;
	applicationPhone?: string;
	applicationEmail?: string;
	description?: string;
	isInternship?: boolean;
	isUnion?: boolean;
	isPaid?: boolean;
}

/**
 * The data shape for a WordPress core settings query result.
 */
export interface WpCoreQueryResult {
	wpGlobalStylesheet?: string;
	wpStylesheetDirectoryUri?: string;
}

/**
 * The data shape for a Job Post Output.
 */
export interface JobPostOutput {
	id?: number;
	author?: number;
	title: string;
	companyName: string;
	companyAddress: string;
	contactName: string;
	contactEmail: string;
	contactPhone?: string;
	startDate: string;
	endDate?: string;
	instructions: string;
	compensation?: string;
	applicationUrl?: string;
	applicationPhone?: string;
	applicationEmail?: string;
	description?: string;
	isPaid?: boolean;
	isInternship?: boolean;
	isUnion?: boolean;
}

/**
 * Supported notification types for profile notifications.
 */
export type NotificationType = 'starred_profile_updated' | 'job_posted';

/**
 * The data shape for a Profile Notification.
 */
export interface ProfileNotificationParams {
	id: number;
	title: string;
	notificationType: NotificationType;
	value: string;
}
