/**
 * Utilities.
 */

import { isEqual } from 'lodash';
import { Socials } from './types';

/** Generate a link to a social media profile.
 *
 * @param {string} network The social media network name.
 * @returns {string} The link to the social media profile.
 */
export function socialLink(network: string, value: string): string {
	const socialLinkBases: Socials = {
		twitter: 'https://twitter.com/',
		linkedin: 'https://www.linkedin.com/in/',
		instagram: 'https://www.instagram.com/',
		facebook: '',
	};

	if (!(network in socialLinkBases)) {
		return '';
	}

	return socialLinkBases[network] + value;
}

/**
 * Parse a string to an integer if it is a string.
 *
 * @param value
 * @returns
 */
export function maybeParseInt(value: string | number): number {
	if (typeof value === 'string') {
		return parseInt(value, 10);
	}

	return value;
}

/**
 * Check if two numbers or strings are equal.
 *
 * @param {string|number} a
 * @param {string|number} b
 * @returns {boolean} Whether the numbers are equal.
 */
export function isEqualNumberlike(a: number | string, b: number | string): boolean {
	return isEqual(Number(a), Number(b));
}
