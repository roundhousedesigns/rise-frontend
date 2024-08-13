import { useState, useEffect, useRef, useContext } from 'react';
import {
	searchFilterSetsAreEqual,
	getProfilePrefix,
	validateEmail,
	validatePassword,
	validateProfileSlug,
} from '@lib/utils';
import { SearchContext } from '@context/SearchContext';
import useUserProfile from '@queries/useUserProfile';

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
	// TODO Return an object keyed by code to handle multiple errors at once.
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

		// Profile Edit errors
		case 'conflict_range_overlap':
			return 'This date range overlaps with an existing busy time. Please try again.';
		case 'multilingual_no_languages':
			return 'Please enter at least one language.';

		default:
			return defaultMessage + ': ' + errorCode;
	}
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
 */
export const useValidatePassword = (password: string): string | undefined =>
	validatePassword(password);

/**
 * Validate an email address.
 *
 * @param email The email address.
 * @return True if the email address is valid.
 */
export const useValidateEmail = (email: string): boolean => validateEmail(email);

/**
 * Returns a boolean indicating whether the currently restored Saved Search has been changed
 * by the user.
 *
 * @return boolean True if the filter set has changed.
 */
export const useSavedSearchFiltersChanged = (): boolean => {
	const {
		search: {
			filters: { filterSet: currentFilterSet },
			savedSearch: { filterSet: savedSearchFilterSet },
		},
	} = useContext(SearchContext);

	return !searchFilterSetsAreEqual(currentFilterSet, savedSearchFilterSet);
};

/**
 * Calculates the completion percentage of a user's profile.
 *
 * @param {number} profileId - The ID of the user's profile to calculate completion for.
 * @return {number} The completion percentage of the user's profile, as a whole number between 0 and 100.
 */
export const useProfileCompletion = (profileId: number): number => {
	const [profile] = useUserProfile(profileId);

	// Field weights
	const fieldsToCalculate = {
		selfTitle: 10,
		email: 10,
		homebase: 10,
		pronouns: 5,
		description: 10,
		resume: 15,
		education: 5,
		locations: 10,
		socials: 5,
		website: 5,
		unions: 5,
		experienceLevels: 1,
		credits: 30,
		// mediaVideo1: 1,
		// mediaVideo2: 1,
		// mediaImage1: 1,
		// mediaImage2: 1,
		// mediaImage3: 1,
		// mediaImage4: 1,
		// mediaImage5: 1,
		// mediaImage6: 1,
		// firstName: 1,
		// lastName: 1,
		// phone: 1,
		// willTravel: 1,
		// willTour: 1,
		// partnerDirectories: 1,
		// multilingual: 1,
		// languages: 1,
		// genderIdentities: 1,
		// racialIdentities,
		// personalIdentities,
	};

	// Add up the total weights for each field
	const totalWeight = Object.values(fieldsToCalculate).reduce((a, b) => a + b, 0);

	// Calculate the profile completion percentage. If a field's value is truthy, add the weight. If a field's value is an object, only add the weight if at least one of its properties is truthy.
	let profileCompletion = 0;

	if (!profile) {
		return 0;
	}

	for (const [field, weight] of Object.entries(fieldsToCalculate)) {
		if (profile[field] && typeof profile[field] === 'object') {
			if (Object.values(profile[field]).some((value) => value)) {
				profileCompletion += weight;
			}
		} else if (profile[field]) {
			profileCompletion += weight;
		}
	}

	// Divide the score by the total weight, multiplied by 100, to get the profile completion percentage as a decimal. Round to the nearest integer.

	return Math.round((profileCompletion / totalWeight) * 100);
};
