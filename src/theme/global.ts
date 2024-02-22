/**
 * Global style overrides.
 */

export const styles = {
	global: {
		html: { fontSize: '18px' },
		textarea: { underline: 'none !important' },
		p: {
			marginTop: '0.5em',
			marginBottom: '0.5em',
		},
		ul: {
			listStylePosition: 'inside',
		},

		// WordPress Block Editor content
		'.wp-post-content': {
			p: {
				marginTop: '1em',
				marginBottom: '1em',
			},
			h2: {
				fontSize: '2em',
				marginTop: '0.5em',
				marginBottom: '0.5em',
			},
		},
	},
};

/**
 * Common component styles.
 */
export const radioCheckboxButtonStyleObject = {
	container: {
		borderRadius: 'md',
		borderWidth: 0,
		transitionDuration: 'normal',
		px: 3,
		py: 2,
		m: 0,
		_dark: {
			bg: 'gray.800',
			_checked: {
				bg: 'gray.300',
			},
		},
		_light: {
			bg: 'gray.100',
			_checked: {
				bg: 'gray.600',
			},
		},
	},
	label: {
		letterSpacing: '0.06em',
		_dark: {
			_checked: {
				color: 'gray.900',
			},
		},
		_light: {
			_checked: {
				color: 'gray.100',
			},
		},
	},
	control: {
		borderColor: 'gray.300',
		_checked: {
			bgColor: 'brand.blue',
			color: 'brand.blue',
			borderColor: 'brand.blue',
		},
	},
};
