import { describe, test, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HelloWorld } from './helloWorld';

describe('Hello World', () => {
	it('displays "Hello World!"', () => {
		render(<HelloWorld />);
		const linkElement = screen.getByText(/Hello World!/i);
		expect(linkElement).toBeInTheDocument();
	});
});
