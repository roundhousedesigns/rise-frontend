import { chakra } from '@chakra-ui/react';

interface Props {
	char: 'upRightArrow' | 'starburst';
	[prop: string]: any;
}

export default function SpecialChar({ char, ...props }: Props): JSX.Element {
	const chars = {
		upRightArrow: '\u2197',
		starburst: '\u273A',
	};

	const hasChar = Object.keys(chars).includes(char);

	return hasChar ? (
		<chakra.span fontSize='inherit' color='inherit' {...props}>
			{chars[char]}
		</chakra.span>
	) : (
		<></>
	);
}
