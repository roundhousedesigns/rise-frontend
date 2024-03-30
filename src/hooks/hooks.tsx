import { useState, useEffect, useRef } from 'react';
import { isEqual, omit } from 'lodash';
import { UserProfile } from '@lib/classes';
import { getProfilePrefix, validateProfileSlug } from '@lib/utils';
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
 * Format an error message based on the error code.
 *
 * @param {string} errorCode The error message returned by the server.
 * @param {string} defaultMessage The default message to use if no specific case matches.
 * @returns {string} The formatted error message.
 */
export const useErrorMessage = (errorCode?: string, defaultMessage: string = 'Error'): string => {
	if (!errorCode) return '';

	switch (errorCode) {
		// Login errors
		case 'invalid_username':
		case 'invalid_email':
			return 'No account exists for that email address.';
		case 'empty_login':
			return 'Please enter a username or email address.';
		case 'invalid_account':
			return 'Please use a different account.';
		case 'bad_login':
			return 'Something went wrong. Please try again.';

		// Password Errors
		case 'empty_password':
			return 'Please enter your password.';
		case 'incorrect_password':
			return 'Incorrect password.';
		case 'password_mismatch':
			return 'Passwords do not match.';
		case 'password_too_weak':
			return 'Please make sure your password contains at least one lowercase letter, one uppercase letter, one number, and one special character.';

		// Registration errors
		case 'existing_user_login':
			return 'An account already exists for that email address. Please try logging in.';
		case 'unspecified_create_user_error':
			return 'Something went wrong. Please try again.';

		// ReCAPTCHA errors
		case 'recaptcha_error':
		case 'no_recaptcha_token':
		case 'bad_recaptcha_token':
			return 'reCAPTCHA error.';

		// Change profile slug errors
		case 'user_not_found':
			return 'There was an error updating your profile URL. Please contact support.';
		case 'user_not_authorized':
			return 'You do not appear to be logged in.';
		case 'user_slug_not_unique':
			return 'This alias is already in use. Please choose another.';
		case 'user_slug_invalid':
			return 'Only letters, numbers, dashes (-) and underscores (_) are allowed.';

		default:
			return defaultMessage + ': ' + errorCode;
	}
};

/**
 * Determine if a user profile has been edited.
 *
 * @param editProfile
 * @param origProfile
 */
export const useProfileEdited = (editProfile: UserProfile, origProfile: UserProfile | null) => {
	if (origProfile === null) return;

	const ignoreFields = [
		'slug',
		'credits',
		'image',
		'resume',
		'lookingForWork',
		'isOrg',
		'mediaImage1',
		'mediaImage2',
		'mediaImage3',
		'mediaImage4',
		'mediaImage5',
		'mediaImage6',
	];

	const profile1 = new UserProfile({
		...omit(origProfile, ignoreFields),
		id: 0,
		slug: '',
	});
	const profile2 = new UserProfile({
		...omit(editProfile, ignoreFields),
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
 * @return string|undefined 'weak' or 'strong'
 *
 * TODO: figuring out typing to allow (in index.d.ts):
 * const passwordRequirements = [{id?: number, value?: string, minDiversity?: number, minLength?: number}, {...}]
 * passwordStrength(password, passwordRequirements);
 */
export const useValidatePassword = (password: string): string | undefined => {
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
};
