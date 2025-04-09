/**
 * Deprecated functionality.
 */

const { VITE_FRONTEND_URL } = import.meta.env;

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
 * Get the URL prefix for a user profile. Includes the trailing slash.
 *
 * @deprecated v1.2
 * @returns string The user profile URL prefix with trailing slash.
 */
export const getProfilePrefix = (): string => `${VITE_FRONTEND_URL}/profile/`;
