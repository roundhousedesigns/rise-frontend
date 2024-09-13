/**
 * Deprecated functionality.
 */

import { isEqual } from 'lodash';
import { omit } from 'lodash';
import { UserProfile } from '@lib/classes';

/**
 * Format a login error message.
 *
 * @deprecated 1.0.7 Use `useErrorMessage` instead.
 *
 * @param {string} errorCode The login error message returned by the server.
 * @returns {string} The message to print.
 */
export const useLoginError = (errorCode?: string): string => {
	if (!errorCode) return '';

	var message = '';

	switch (errorCode) {
		case 'invalid_username':
		case 'invalid_email':
			message = 'No account exists for that email address.';
			break;

		case 'incorrect_password':
			message = 'Incorrect password.';
			break;

		case 'empty_login':
			message = 'Please enter a username or email address.';
			break;

		case 'empty_password':
			message = 'Please enter your password.';
			break;

		default:
			message = 'Unspecified error: ' + errorCode;
	}

	return message;
};

/**
 * Format a user registration error message.
 *
 * @deprecated 1.0.7 Use `useErrorMessage` instead.
 *
 * @param {string} errorCode The login error message returned by the server.
 * @returns {string} The message to print.
 */
export const useRegistrationError = (errorCode?: string): string => {
	if (!errorCode) return '';

	var message = '';

	switch (errorCode) {
		case 'existing_user_login':
			message = 'An account already exists for that email address. Please try logging in.';
			break;

		case 'empty_login':
			message = 'Please enter a username or email address.';
			break;

		case 'empty_password':
			message = 'Please enter your password.';
			break;

		default:
			message = 'Unspecified error: ' + errorCode;
	}

	return message;
};

/**
 * Format a lost password error message.
 *
 * @deprecated 1.0.7 Use `useErrorMessage` instead.
 *
 * @param {string} errorCode The error message returned by the server.
 * @returns {string} The message to print.
 */
export const useLostPasswordError = (errorCode?: string): string => {
	if (!errorCode) return '';

	var message = '';

	switch (errorCode) {
		case 'recaptcha_error':
			message = 'Invalid reCAPTCHA.';
			break;

		default:
			message = 'Unspecified error: ' + errorCode;
	}

	return message;
};

/**
 * Format a user password reset error message.
 *
 * @deprecated 1.0.7 Use `useErrorMessage` instead.
 *
 * @param {string} errorCode The login error message returned by the server.
 * @returns {string} The message to print.
 */
export const useResetPasswordError = (errorCode?: string): string => {
	if (!errorCode) return '';

	var message = '';

	switch (errorCode) {
		case 'invalid_username':
		case 'invalid_email':
			message = 'Invalid username or email address.';
			break;

		case 'incorrect_password':
			message = 'Incorrect password.';
			break;

		case 'empty_login':
			message = 'Please enter a username or email address.';
			break;

		case 'empty_password':
			message = 'Please enter your password.';
			break;

		default:
			message = 'Unspecified error: ' + errorCode;
	}

	return message;
};

/**
 * Format a user password reset error message.
 *
 * @deprecated 1.0.7 Use `useErrorMessage` instead.
 *
 * @param {string} errorCode The login error message returned by the server.
 * @returns {string} The message to print.
 */
export const useChangePasswordError = (errorCode?: string): string => {
	if (!errorCode) return '';

	var message = '';

	switch (errorCode) {
		case 'incorrect_password':
			message = 'Incorrect password.';
			break;

		case 'empty_login':
			message = 'Please enter a username or email address.';
			break;

		case 'empty_password':
			message = 'Please enter your password.';
			break;

		default:
			message = 'Unspecified error: ' + errorCode;
	}

	return message;
};

/**
 * Format a change profile slug error message.
 *
 * @deprecated 1.0.7 Use `useErrorMessage` instead.
 *
 * @param {string} errorCode The error message returned by the server.
 * @returns {string} The message to print.
 */
export const useChangeProfileSlugError = (errorCode?: string): string => {
	if (!errorCode) return '';

	var message = '';

	switch (errorCode) {
		case 'user_not_found':
			message = 'There was an error updating your profile URL. Please contact support.';
			break;

		case 'user_not_authorized':
			message = 'You do not appear to be logged in.';
			break;

		case 'user_slug_not_unique':
			message = 'This alias is already in use. Please choose another.';
			break;

		case 'user_slug_invalid':
			message = 'Only letters, numbers, dashes (-) and underscores (_) are allowed.';
			break;

		default:
			message = 'Unspecified error: ' + errorCode;
	}

	return message;
};

/**
 * Toggle the existence of an item in an array of primitive values.
 *
 * @deprecated v1.1.9
 *
 * @param {array} The array to toggle the item in.
 * @param {item} The item to toggle.
 * @returns The new array.
 */
export function toggleArrayItem(array: any[], item: any): any[] {
	if (array.includes(item)) {
		return array.filter((i) => i !== item);
	}

	return [...array, item];
}

/**
 * Determine if a user profile has been edited.
 *
 * @deprecated 1.1.11
 *
 * @param {editProfile}
 * @param {origProfile}
 
 */
export const hasProfileChanged = (editProfile: UserProfile, origProfile: UserProfile): boolean => {
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
 * Sort two arrays and compare them.
 *
 * @deprecated 1.1.11
 *
 * @param {number[]|string[]} a The first array to compare.
 * @param {number[]|string[]} b The second array to compare.
 * @returns {boolean} Whether the arrays are equal.
 *
 */
export function sortAndCompareArrays(a: number[] | string[], b: number[] | string[]): boolean {
	return isEqual(a.sort(), b.sort());
}
