import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { HelloWorld } from '../helloWorld';

describe('Hello World', () => {
	it('displays "Hello World!"', () => {
		render(
			<MockedProvider>
				<HelloWorld />
			</MockedProvider>
		);
		const linkElement = screen.getByText(/Hello World!/i);
		expect(linkElement).toBeInTheDocument();
	});
});
