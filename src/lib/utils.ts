/**
 * Utilities.
 */

import { Socials } from './types';

/** Generate a link to a social media profile.
 *
 * @param {string} network The social media network name.
 * @returns {string} The link to the social media profile.
 */
export const socialLink = (network: string, value: string): string => {
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
};
