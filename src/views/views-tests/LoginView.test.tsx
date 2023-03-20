import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MockedProvider } from '@apollo/client/testing';
import LoginView from '../LoginView';

describe('LoginView test', () => {
	it('should say "Please sign in."', () => {
		render(
			<MockedProvider>
				<LoginView />
			</MockedProvider>
		);
		const signInElement = screen.getByText(/Please sign in./i);

		expect(signInElement).toBeInTheDocument();
	});
	it('should say "Username or Email."', () => {
		render(
			<MockedProvider>
				<LoginView />
			</MockedProvider>
		);
		const userNameInput = screen.getByText(/Username or Email/i);
		expect(userNameInput).toBeInTheDocument();
	});

	it('should say "Password"', () => {
		render(
			<MockedProvider>
				<LoginView />
			</MockedProvider>
		);
		const passwordInput = screen.getByText(/Password/i);
		expect(passwordInput).toBeInTheDocument();
	});
});

// toBeInTheDocument()
