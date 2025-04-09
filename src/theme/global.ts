/**
 * Global style overrides.
 */

export const styles = {
	global: {
		html: { fontSize: '18px' },
		body: {
			backgroundColor: 'bg.dark',
		},
		textarea: { underline: 'none !important' },
		p: {
			marginTop: '0.5em',
			marginBottom: '0.5em',
		},
		ul: {
			listStylePosition: 'inside',
		},

		// WordPress Block Editor content
		'.has-medium-font-size': {
			fontSize: '1rem',
		},
		'.has-large-font-size': {
			fontSize: '1.125rem',
		},
		'.has-x-large-font-size': {
			fontSize: '1.25rem',
		},
		'.has-2-x-large-font-size': {
			fontSize: '1.5rem',
		},
		'.has-3-x-large-font-size': {
			fontSize: '1.875rem',
		},
		'.has-4-x-large-font-size': {
			fontSize: '2.25rem',
		},
		'.has-5-x-large-font-size': {
			fontSize: '3rem',
		},
		'.wp-post-content': {
			a: {
				'&:not(.wp-block-button__link), &:not(.wp-element-button), &:not(.chakra-button)': {
					textDecoration: 'underline',
					color: 'brand.blue',
				},
			},
			p: {
				marginTop: '1em',
				marginBottom: '1em',
				paddingBottom: '1em',

				'&:first-of-type': {
					marginTop: 0,
				},

				'&:last-of-type': {
					marginBottom: 0,
				},
			},
			'.wp-block-group': {
				'*': {
					flex: 1,
				},
			},
			'&.network-partner': {
				'.content': {
					'*': {
						textAlign: 'center',
						mx: 'auto',
						display: 'block',
					},
				},
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
			_hover: {
				bg: 'gray.600',
			},
		},
		_light: {
			bg: 'gray.100',
			_checked: {
				bg: 'gray.600',
			},
			_hover: {
				bg: 'gray.200',
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
