/**
 * Deprecated functionality.
 */

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
