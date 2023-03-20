import { render, screen } from '@testing-library/react';
import { describe, test, expect, it } from 'vitest';
import LoginView from './LoginView';

describe('LoginView test', () => {
	test('should say "Please sign in."', () => {
		render(<LoginView />);
		const linkElement = screen.getByText(/Please sign in./i);
		expect(linkElement).toBeInTheDocument();
	});
});
