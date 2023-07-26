import { MouseEventHandler } from 'react';
import { IconButton, useToken } from '@chakra-ui/react';
import { FiMinusCircle } from 'react-icons/fi';

interface Props {
	id: number;
	removeHandler: MouseEventHandler<HTMLButtonElement>;
	[prop: string]: any;
}

export default function RemoveBookmarkIcon({ id, removeHandler, ...props }: Props) {
	const [red, lightGray] = useToken('colors', ['brand.red', 'gray.300']);

	const iconLabel = 'Remove this candidate from your saved candidates';

	return (
		<IconButton
			icon={<FiMinusCircle color={red} fill={red} stroke={lightGray} strokeWidth={2} size={30} />}
			variant={'bookmark'}
			aria-label={iconLabel}
			title={iconLabel}
			onClick={removeHandler}
			mr={2}
			{...props}
		/>
	);
}
