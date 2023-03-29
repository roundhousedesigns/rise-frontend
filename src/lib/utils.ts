/**
 * Utilities.
 */

import { isEqual } from 'lodash';
import { PersonalLinks, UserProfile, WPItem } from './classes';

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
		website: '',
	};

	if (!(network in socialLinkBases)) {
		return '';
	}

	return socialLinkBases[network as keyof PersonalLinks] + value;
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
export const getWPItemsFromIds = (ids: number[], items: WPItem[]): WPItem[] => {
	return items.filter((item) => ids.includes(item.id));
};

/**
 * Prepare a user profile for GraphQL.
 *
 * @param {UserProfile} profile The user profile to preprae.
 * @returns {Object} The prepared user profile.
 */
export const prepareUserProfileForGraphQL = (profile: UserProfile) => {
	const { credits, image, ...sanitized } = profile;

	return sanitized;
};

/**
 * Compare two arrays and sort them before comparing.
 *
 * @param {number[]|string[]} a The first array to compare.
 * @param {number[]|string[]} b The second array to compare.
 * @returns {boolean} Whether the arrays are equal.
 */
export const sortAndCompareArrays = (a: number[] | string[], b: number[] | string[]): boolean => {
	return isEqual(a.sort(), b.sort());
};

/**
 * Generate a random alphanumeric string.
 *
 * @param length The generated string length.
 * @returns The generated string.
 */
export const generateRandomString = (length: number = 8): string => {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let result = '';

	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}

	return result;
};
