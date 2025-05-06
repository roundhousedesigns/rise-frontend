/**
 * Utilities.
 */

import { isEqual, omit } from 'lodash';
import {
	Credit,
	PersonalLinks,
	DateRange,
	UserProfile,
	WPItem,
	SearchFilterSet,
	ProfileNotification,
} from '@lib/classes';
import { DateRangeParams, SearchFilterSetParams, SearchResultCandidate } from '@lib/types';
import Cookies from 'js-cookie';
import { passwordStrength } from 'check-password-strength';

/**
 * Additional filter keys. Affects display order.
 */
export const additionalFilterKeys: string[] = [
	'locations',
	'unions',
	'experienceLevels',
	'genderIdentities',
	'racialIdentities',
	'personalIdentities',
];

/** Generate a link to a social media profile.
 *
 * @param {string} network The social media network name.
 * @returns {string} The link to the social media profile.yarn
 */
export function socialLink(network: string, value: string): string {
	const socialLinkBases = new PersonalLinks({
		twitter: 'https://twitter.com/',
		instagram: 'https://www.instagram.com/',
		linkedin: '',
		facebook: '',
	});

	if (!(network in socialLinkBases)) {
		return '';
	}

	let suffix = value;
	// If the network is not facebook, remove the @ symbol.
	if (network !== 'facebook') {
		suffix = suffix.replace('@', '');
	}

	return socialLinkBases[network as keyof PersonalLinks] + suffix;
}

/**
 *
 * @param {string} str The string to decode.
 * @returns {string} The decoded string.
 */
export function decodeString(str: string): string {
	let txt = document.createElement('textarea');

	txt.innerHTML = str;

	return txt.value;
}

/**
 * Convert a string to a boolean. Strictly accepts case-insensitive "true" or "false".
 *
 * @param {str} The string to encode.
 * @returns boolean|null The boolean value or null if the string is not "true" or "false".
 */
export function sanitizeBoolean(value: string | boolean): boolean | null {
	if (typeof value === 'boolean') {
		return value;
	}

	const strLower = value.toLowerCase();

	return strLower === 'true' ? true : strLower === 'false' ? false : null;
}

/**
 * Get WPItem objects (terms) from selected IDs.
 *
 * @param {number[]} ids  The IDs of the items to get.
 * @param {WPItem[]} items  The items to filter.
 * @returns {WPItem[]} The filtered items.
 */
export function getWPItemsFromIds(ids: number[], items: WPItem[]): WPItem[] {
	return items.filter((item) => ids.includes(item.id));
}
/**
 * Determine if a user profile has been edited.
 *
 * @param {editProfile}
 * @param {origProfile}
 */
export const hasProfileChanged = (editProfile: UserProfile, origProfile: UserProfile) => {
	if (origProfile === null) return false;

	const ignoreFields = [
		'credits',
		'conflictRanges',
		'slug',
		'image',
		'resume',
		'mediaImage1',
		'mediaImage2',
		'mediaImage3',
		'mediaImage4',
		'mediaImage5',
		'mediaImage6',
	];

	const profile1 = new UserProfile({
		...omit(editProfile, ignoreFields),
		id: 0,
		slug: '',
	});

	const profile2 = new UserProfile({
		...omit(origProfile, ignoreFields),
		id: 0,
		slug: '',
	});

	return !isEqual(profile1, profile2);
};

/**
 * Prepare a user profile for GraphQL.
 *
 * @param {UserProfile} profile The user profile to preprae.
 * @returns {Object} The prepared user profile.
 */
export function prepareUserProfileForGQL(profile: UserProfile): object {
	// Strip unwanted fields from the payload
	const {
		slug,
		image,
		multilingual,
		resume,
		mediaImage1,
		mediaImage2,
		mediaImage3,
		mediaImage4,
		mediaImage5,
		mediaImage6,
		conflictRanges,
		credits,
		...sanitized
	} = profile;

	// Prepare the languages field
	if (!multilingual) {
		sanitized.languages = '';
	}

	return sanitized;
}

/**
 * Sort two arrays and compare them.
 *
 * @param {number[]|string[]} a The first array to compare.
 * @param {number[]|string[]} b The second array to compare.
 * @returns {boolean} Whether the arrays are equal.
 */
export function sortAndCompareArrays(a: number[] | string[], b: number[] | string[]): boolean {
	return isEqual(a.sort(), b.sort());
}

/**
 * Generate a random alphanumeric string.
 *
 * @param {length} The generated string length.
 * @returns The generated string.
 */
export function generateRandomString(length: number = 8): string {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let result = '';

	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}

	return result;
}

/**
 * Handle reCAPTCHA verification.
 *
 * @param {label} The label for the reCAPTCHA.
 * @param {executeRecaptcha} The reCAPTCHA execution function.
 * @returns The reCAPTCHA token (Promise)
 */
export async function handleReCaptchaVerify({
	label,
	executeRecaptcha,
}: {
	label: string;
	executeRecaptcha: ((action?: string | undefined) => Promise<string>) | undefined;
}): Promise<string | undefined> {
	if (!executeRecaptcha) {
		return;
	}

	const token = await executeRecaptcha(label);

	return token;
}

/**
 * Validate a profile slug string.
 *
 * @param {str} The string to validate.
 * @returns boolean Whether the string is valid.
 */
export function validateProfileSlug(str: string): boolean {
	if (!str) return true;

	var regexp = /^[a-zA-Z0-9_-]+$/;
	return regexp.test(str);
}

/**
 * Compare 2 WPItems and sort them alphabetically by the `name` property.
 *
 * @param {a} The first WPItem.
 * @param {b} The second WPItem.
 * @returns The sort order.
 */
export const sortWPItemsByName = (a: WPItem, b: WPItem): number => {
	const nameA = a.name?.toLowerCase() || '';
	const nameB = b.name?.toLowerCase() || '';

	if (nameA < nameB) {
		return -1;
	}
	if (nameA > nameB) {
		return 1;
	}
	return 0;
};

/**
 * Extract the IDs of terms from a JSON string.
 * @param {json} The JSON string to extract the IDs from.
 * @returns The IDs of the terms.
 */
export function getUniqueTermIdsFromString(json: any): number[] {
	const numericStrings = json.match(/\d+/g);
	const ids = numericStrings?.map((id: string) => Number(id));

	return ids ? [...new Set<number>(ids)] : [];
}

/**
 * Extract the IDs of terms from an object.
 * @param {obj} The object to extract the IDs from.
 * @returns The IDs of the terms.
 */
export function extractSearchTermIds(obj: SearchFilterSet | SearchFilterSetParams): number[] {
	if (!obj) return [];

	const numbersArray: number[] = [];

	Object.keys(obj).forEach((key) => {
		const value = obj[key];

		// If the value is an object, recurse.
		if (typeof value === 'object' && value !== null) {
			numbersArray.push(...extractSearchTermIds(value));
		}

		// If the value is a string, check if it's a number.
		if (typeof value === 'string') {
			const number = Number(value);

			if (!isNaN(number)) {
				numbersArray.push(number);
			}
		}
	});

	return numbersArray;
}

/**
 * Compares two search filter sets and returns a boolean indicating whether they are equal.
 *
 * @param {SearchFilterSet} a - The first search filter set to compare.
 * @param {SearchFilterSet} b - The second search filter set to compare.
 * @return {boolean} True if the filter sets are equal, false otherwise.
 */
export function searchFilterSetsAreEqual(a: SearchFilterSet, b: SearchFilterSet): boolean {
	const filtersA = a.toQueryableFilterSet();
	const filtersB = b.toQueryableFilterSet();

	return isEqual(filtersA, filtersB);
}

/**
 * Convert an array of user IDs to an array of SearchResultCandidate objects scored as '0'.
 *
 * @param {userIds}
 * @returns An array of SearchResultCandidates with a score of zero.
 */
export function convertUnscoredToScored(userIds: (number | string)[]): SearchResultCandidate[] {
	return userIds.map((id) => {
		return {
			id: parseInt(id.toString()),
			score: 0,
		};
	});
}

/**
 * Set a cookie.
 *
 * @param {name} The name of the cookie.
 * @param {value} The cookie's value.
 * @param {days} The number of days until expiration (default: 7).
 * @returns void
 */
export function setCookie(name: string, value: string | number | boolean, days: number = 7): void {
	Cookies.set(name, String(value), { expires: days });
}

/**
 * Retrieve a cookie.
 *
 * @param {name} The name of the cookie to retrieve.
 * @returns The cookie's value or undefined if the cookie doesn't exist.
 */
export function getCookie(name: string): string | undefined {
	return Cookies.get(name);
}

/**
 * Remove a cookie.
 *
 * @param {name} The name of the cookie to delete.
 * @returns void
 */
export function deleteCookie(name: string): void {
	Cookies.remove(name);
}

/**
 * Prepare a collection of Credit objects from a raw array of GQL nodes.
 *
 * @param {nodes} The raw array of GQL nodes to prepare.
 * @returns An array of Credit objects.
 */
export function prepareCreditsFromGQLNodes(nodes: object[]): Credit[] {
	const credits: Credit[] = [];

	nodes.forEach((credit: { [key: string]: any }) => {
		// If credit at least has an id and a title, return a new Credit object
		if (!credit.id || !credit.title) return null;

		const jobs = credit.positions.nodes.filter(
			(position: { __typename: string; id: number; parentId: number }) => position.parentId !== null
		);
		const departments = credit.positions.nodes.filter(
			(position: { __typename: string; id: number; parentId: number }) => position.parentId === null
		);

		// Backwards compatibility for old credits
		if ((!departments || !departments.length) && jobs) {
			jobs.forEach((job: WPItem) => {
				if (job.parentId) {
					departments.push(new WPItem({ id: job.parentId }));
				}
			});
		}

		const newCredit = new Credit({
			id: credit.id,
			index: credit.index,
			title: credit.title,
			jobTitle: credit.jobTitle,
			jobLocation: credit.jobLocation,
			venue: credit.venue,
			workStart: credit.workStart,
			workEnd: credit.workEnd,
			workCurrent: credit.workCurrent,
			intern: credit.intern,
			fellow: credit.fellow,
			positions: {
				departments: departments?.map((department: WPItem) => department.id),
				jobs: jobs?.map((job: WPItem) => job.id),
			},
			skills: credit.skills?.nodes.map((skill: WPItem) => skill.id),
		});

		credits.push(newCredit);
	});

	return credits;
}

/**
 * Generates an array of DateRange objects from the provided array of GraphQL nodes.
 *
 * @param {object[]} nodes - An array of GraphQL nodes to process.
 * @return {DateRange[]} An array of DateRange objects prepared from the GraphQL nodes.
 */
export function prepareUnavailDatesFromGQLNodes(nodes: DateRangeParams[]): DateRange[] {
	return nodes.map((node: DateRangeParams) => new DateRange(node));
}

/**
 * Sort a collection of Credits by their index property.
 *
 * @param {credits} The collection to sort.
 * @returns A sorted array of Credits.
 */
export function sortCreditsByIndex(credits: Credit[]): Credit[] {
	const sorted = [...credits];
	sorted.sort((a: Credit, b: Credit) => Number(a.index) - Number(b.index));

	return sorted;
}

/**
 * Validate a password to meet requirements
 *
 * @param {password} The password to validate
 * @return string|undefined 'weak' or 'strong'
 *
 * TODO: figuring out typing to allow (in index.d.ts):
 * const passwordRequirements = [{id?: number, value?: string, minDiversity?: number, minLength?: number}, {...}]
 * passwordStrength(password, passwordRequirements);
 */
export function validatePassword(password: string): string | undefined {
	if (!password) return;

	const { value } = passwordStrength(password, [
		{
			id: 0,
			value: 'weak',
			minDiversity: 0,
			minLength: 0,
		},
		{
			id: 1,
			value: 'strong',
			minDiversity: 4,
			minLength: 8,
		},
	]);

	return value;
}

/**
 * Validate an email address.
 *
 * @param {email} The email address to validate.
 * @returns True if the email address is valid, false otherwise.
 */
export function validateEmail(email: string): boolean {
	// Define a regex pattern for validating an email
	const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

	// Test the email against the regex pattern and return the result
	return regex.test(email);
}

/**
 * Obscure an email address with asterisks, showing only the first few characters of the username.
 *
 * @param {emailString} The email address to obscure.
 * @returns The obscured email address, or an error message if the input is not a valid email.
 */
export function obscureEmail(emailString: string): string {
	if (!emailString.includes('@')) {
		throw new Error('Invalid email format');
	}

	const [username, domain] = emailString.split('@');
	const visibleCount = Math.min(3, username.length);
	const obscuredPart = '*'.repeat(username.length - visibleCount);

	return `${username.substring(0, visibleCount)}${obscuredPart}@${domain}`;
}

/**
 * Check if a job date search filter range overlaps with any of the given conflict ranges.
 *
 * @param {jobDates} - The job schedule to check.
 * @param {conflictRange} - An array of conflict ranges to check against.
 * @returns True if the job schedule overlaps with any of the conflict ranges, false otherwise.
 */
export function dateRangesOverlap(jobDates: DateRange, conflictRange: DateRange): boolean {
	const { startDate: jobStart, endDate: jobEnd } = jobDates || {};
	const { startDate: rangeStart, endDate: rangeEnd } = conflictRange;

	if (!jobStart || !rangeStart || !rangeEnd) return false;

	// If the job does not have an endDate, we only return true if the conflict range overlaps with jobStart.
	if (!jobEnd) {
		return jobStart <= rangeEnd;
	}

	return rangeStart <= jobEnd && rangeEnd >= jobStart;
}

/**
 * Clone an instance of an object.
 *
 * @param {object} instance The instance to clone.
 * @returns The cloned instance.
 */
export function cloneInstance(instance: object): any {
	// Create a new object with the same prototype as the instance
	const newInstance = Object.create(Object.getPrototypeOf(instance));

	// Copy all properties from the instance to the new object
	return Object.assign(newInstance, instance);
}
