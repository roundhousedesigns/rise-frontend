/**
 * Utilities.
 */

import { isEqual } from 'lodash';
import { PersonalLinks, UserProfile, WPItem } from './classes';
import { SearchFilterSet } from './types';
const { VITE_FRONTEND_URL } = import.meta.env;

/** Generate a link to a social media profile.
 *
 * @param {string} network The social media network name.
 * @returns {string} The link to the social media profile.
 */
export function socialLink(network: string, value: string): string {
	const socialLinkBases: PersonalLinks = {
		twitter: 'https://twitter.com/',
		linkedin: 'https://www.linkedin.com/in/',
		instagram: 'https://www.instagram.com/',
		facebook: '',
	};

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
 * Parse a string to an integer if it is a string.
 *
 * @param value
 * @returns
 */
// TODO decide if we can just cast things as Numbers without this.
export function maybeParseInt(value: string | number): number {
	if (typeof value === 'string') {
		return parseInt(value, 10);
	}

	return value;
}

/**
 * Check if two numbers or strings are equal.
 *
 * @param {string|number} a The first value
 * @param {string|number} b The second value
 * @returns {boolean} Whether the numbers are equal.
 */
export function isEqualNumberlike(a: number | string, b: number | string): boolean {
	return isEqual(Number(a), Number(b));
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
 * @param str The string to encode.
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
 * Prepare a user profile for GraphQL.
 *
 * @param {UserProfile} profile The user profile to preprae.
 * @returns {Object} The prepared user profile.
 */
export const prepareUserProfileForGraphQL = (profile: UserProfile): object => {
	// Strip unwanted fields from the payload
	const {
		slug,
		image,
		resume,
		mediaImage1,
		mediaImage2,
		mediaImage3,
		mediaImage4,
		mediaImage5,
		mediaImage6,
		credits,
		...sanitized
	} = profile;

	return sanitized;
};

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
 * @param length The generated string length.
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
 * @param label The label for the reCAPTCHA.
 * @param executeRecaptcha The reCAPTCHA execution function.
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
 * Get the URL prefix for a user profile. Includes the trailing slash.
 *
 * @returns string The user profile URL prefix with trailing slash.
 */
export const getProfilePrefix = (): string => `${VITE_FRONTEND_URL}/profile/`;

/**
 * Validate a profile slug string.
 *
 * @param str The string to validate.
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
 * @param a The first WPItem.
 * @param b The second WPItem.
 * @returns The sort order.
 */
export const sortWPItemsByName = (a: WPItem, b: WPItem): number => {
	const nameA = a.name.toLowerCase();
	const nameB = b.name.toLowerCase();

	if (nameA < nameB) {
		return -1;
	}
	if (nameA > nameB) {
		return 1;
	}
	return 0;
};

/**
 * Toggle the existence of an item in an array of primitive values.
 *
 * @param array The array to toggle the item in.
 * @param item The item to toggle.
 * @returns The new array.
 */
export const toggleArrayItem = (array: any[], item: any): any[] => {
	if (array.includes(item)) {
		return array.filter((i) => i !== item);
	}

	return [...array, item];
};

/**
 * Extract the IDs of terms from a JSON string.
 * @param json The JSON string to extract the IDs from.
 * @returns The IDs of the terms.
 */
export function getUniqueTermIdsFromString(json: any): number[] {
	const numericStrings = json.match(/\d+/g);
	const ids = numericStrings?.map((id: string) => Number(id));

	return ids ? [...new Set<number>(ids)] : [];
}

/**
 * Extract the IDs of terms from an object.
 * @param obj  The object to extract the IDs from.
 * @returns The IDs of the terms.
 */
export function extractSearchTermIds(obj: SearchFilterSet): number[] {
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
