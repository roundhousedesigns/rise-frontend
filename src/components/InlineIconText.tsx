import { Fragment, ReactElement } from 'react';
import { Text, IconButton, TextProps, IconButtonProps } from '@chakra-ui/react';

interface Props {
	text: string;
	icon: ReactElement;
	description: string;
	query: string;
	iconProps?: Partial<IconButtonProps>;
}

const InlineIconText = ({
	text,
	icon,
	description,
	query,
	iconProps,
	...props
}: Props & TextProps) => {
	// Create a regex to match the query string as a whole word or phrase
	const regex = new RegExp(`(\\b${query}\\b)`, 'gi');

	const InlineIcon = () => {
		return (
			<IconButton
				icon={icon}
				variant='inlineIcon'
				title='Search'
				mx={1}
				position='relative'
				bottom='2px'
				aria-label={`${description} icon`}
				bgColor={'blackAlpha.300'}
				isDisabled
				{...iconProps}
			/>
		);
	};

	// Split the text by the query using regex to match the query
	const parts = text.split(regex);

	return (
		<Text fontSize='xl' my={0} display='inline' lineHeight='none' {...props}>
			{parts.map((part, index) => (
				<Fragment key={index}>
					{part.toLowerCase() === query.toLowerCase() ? <InlineIcon /> : part}
				</Fragment>
			))}
		</Text>
	);
};

export default InlineIconText;
