import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MockedProvider, MockedProviderProps } from '@apollo/client/testing';
import ProfileView from '../ProfileView';

describe('ProfileView test', () => {
	const profile = {
		fullName: 'Chihiro Snider',
		email: 'chihirosnider@gmail.com',
		selfTitle: '',
		image: '',
		pronouns: '',
		phone: '',
		description: '',
		resume: '',
		willTravel: null,
		education: '',
		media: [],
		// socials: PersonalLinks = new PersonalLinks();
		locations: [],
		unions: [],
		experienceLevels: [],
		genderIdentities: [],
		racialIdentities: [],
		personalIdentities: [],
		credits: [],
	};

	const loading = true;
	it('should say "Please sign in."', () => {
		render(
			<MockedProviderProps>
				<ProfileView />
			</MockedProviderProps>
		);
		const signInElement = screen.getByText(/Please sign in./i);
		expect(signInElement).toBeInTheDocument();
	});
	it('should say "Username or Email."', () => {
		render(
			<MockedProvider>
				<ProfileView />
			</MockedProvider>
		);
		const userNameInput = screen.getByText(/Username or Email/i);
		expect(userNameInput).toBeInTheDocument();
	});

	it('should say "Password"', () => {
		render(
			<MockedProvider>
				<ProfileView />
			</MockedProvider>
		);
		const passwordInput = screen.getByText(/Password/i);
		expect(passwordInput).toBeInTheDocument();
	});
	// this should test the functionality of the button - how??
	it('should have a Submit button"', () => {
		render(
			<MockedProvider>
				<LoginView />
			</MockedProvider>
		);
		const button = screen.getByText('Submit', {
			selector: 'button',
		});
		expect(button).toBeInTheDocument();
	});
});

// toBeInTheDocument()
