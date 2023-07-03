import { useState, useEffect, useRef } from 'react';
import { isEqual, omit } from 'lodash';
import { UserProfile } from '../lib/classes';
import { getProfilePrefix, validateProfileSlug } from '../lib/utils';
import { passwordStrength } from 'check-password-strength';

/**
 * Custom hooks.
 */

/**
 * Use Local Storage Hook.
 *
 * Works the same as useState, but using localStorage.
 *
 * @see {@link https://github.com/mikejolley/morrics-magical-cauldron/blob/main/src/hooks/use-local-storage.js}
 *
 * @param {string} key The key to set in localStorage for this value
 * @param {Object} defaultValue The value to use if it is not already in localStorage
 * @param {{serialize: Function, deserialize: Function}} options The serialize and deserialize functions to use (defaults to JSON.stringify and JSON.parse respectively)
 */
export const useLocalStorage = (
	key: string,
	defaultValue: any = '',
	{
		serialize = JSON.stringify,
		deserialize = JSON.parse,
	}: {
		serialize?: (val: any) => string;
		deserialize?: (val: string) => any;
	} = {}
) => {
	const [state, setState] = useState<any>(() => {
		const valueInLocalStorage = window.localStorage.getItem(key);
		if (valueInLocalStorage) {
			return deserialize(valueInLocalStorage);
		}
		return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
	});

	const prevKeyRef = useRef(key);

	useEffect(() => {
		const prevKey = prevKeyRef.current;
		if (prevKey !== key) {
			window.localStorage.removeItem(prevKey);
		}
		prevKeyRef.current = key;
		window.localStorage.setItem(key, serialize(state));
	}, [key, state, serialize]);

	return [state, setState];
};

/**
 * Format a login error message.
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
 * @param {string} errorCode The login error message returned by the server.
 * @returns {string} The message to print.
 */
export const useResetPasswordError = (errorCode?: string): string => {
	if (!errorCode) return '';

	var message = '';

	// TODO implement these errors, they are still copies of the login errors

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

		case 'weak_password':
			message = 'Weak password - password must be 8 characters long and contain one each of: \n- uppercase letter\n- lowercase letter\n- number\n- special character(\'!@#$%^&*()_+-=][]{}\"\';:/?.>,<`~)\",';
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
 * Determine if a user profile has been edited.
 *
 * @param editProfile
 * @param origProfile
 */
export const useProfileEdited = (editProfile: UserProfile, origProfile: UserProfile | null) => {
	if (origProfile === null) return;

	const omitFields = [
		'slug',
		'credits',
		'image',
		'mediaImage1',
		'mediaImage2',
		'mediaImage3',
		'mediaImage4',
		'mediaImage5',
		'mediaImage6',
	];

	const profile1 = new UserProfile({
		...omit(origProfile, omitFields),
		id: 0,
		slug: '',
	});
	const profile2 = new UserProfile({
		...omit(editProfile, omitFields),
		id: 0,
		slug: '',
	});

	return !isEqual(profile1, profile2);
};

/**
 * Get the URL for a user profile.
 *
 * @param slug The user profile slug.
 * @returns The user profile URL.
 */
export const useProfileUrl = (slug: string): string => {
	const prefix = getProfilePrefix();
	return `${prefix}${slug}`;
};

/**
 * Validate a user profile slug.
 *
 * @param slug The user profile slug.
 * @return True if the slug is valid.
 */
export const useValidateProfileSlug = (slug: string): boolean => validateProfileSlug(slug);

/**
 * Validate a password to meet requirements
 * 
 * @param password The password to validate
 * @return Error message.  'valid password' if valid.
 * 
 * TODO: figuring out typing to allow (in index.d.ts):
 * const passwordRequirements = [{id?: number, value?: string, minDiversity?: number, minLength?: number}, {...}]
 * passwordStrength(password, passwordRequirements);
 */
export const useValidatePassword = (password: string): string => {
	const { value } = passwordStrength(password, [
		{
			id: 0,
			value: "Too weak - password must be 8 characters long and contain one each of: \n- uppercase letter\n- lowercase letter\n- number\n- special character('!@#$%^&*()_+-=][]{}\"\';:/?.>,<`~)",
			minDiversity: 0,
			minLength: 0
		},
		{
			id: 1,
			value: 'valid password',
			minDiversity: 4,
			minLength: 8
		}
	])
	return value;
}
