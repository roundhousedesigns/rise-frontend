import React from 'react';
import { CheckboxGroup, Flex } from '@chakra-ui/react';
import { WPItem } from '@lib/classes';
import CheckboxButton from './CheckboxButton';

interface ProfileCheckboxGroupProps {
	items: WPItem[];
	checked: string[];
	handleChange: (value: string[]) => void;
	[prop: string]: any;
}

const ProfileCheckboxGroup: React.FC<ProfileCheckboxGroupProps> = ({
	items,
	checked,
	handleChange,
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
		</CheckboxGroup>
	);
};

export default ProfileCheckboxGroup;
