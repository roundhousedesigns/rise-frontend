import React from 'react';
import { CheckboxGroup, Flex, Text } from '@chakra-ui/react';
import { WPItem } from '@lib/classes';
import CheckboxButton from './CheckboxButton';

interface ProfileCheckboxGroupProps {
	items: WPItem[];
	checked: string[];
	error?: string;
	handleChange: (value: string[]) => void;
	[prop: string]: any;
}

const ProfileCheckboxGroup: React.FC<ProfileCheckboxGroupProps> = ({
	items,
	checked,
	handleChange,
	error,
	...props
}) => {
	return (
		<CheckboxGroup colorScheme='blue' value={checked} onChange={handleChange} {...props}>
			<Flex gap={[1, 3]} direction={['column', 'row']} flexWrap={'wrap'}>
				{items?.map((item) => (
					<CheckboxButton key={item.id} value={item.id.toString()}>
						{item.name}
					</CheckboxButton>
				))}
			</Flex>
			{error && <Text color={'brand.red'}>{error}</Text>}
		</CheckboxGroup>
	);
};

export default ProfileCheckboxGroup;
