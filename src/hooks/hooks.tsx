import { useState, useEffect, useRef } from 'react';
import { isEqual, omit } from 'lodash';
import { UserProfile } from '../lib/classes';

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
