import { ReactElement, JSXElementConstructor } from 'react';
import { Tooltip, IconButton } from '@chakra-ui/react';

interface Props {
	icon: ReactElement<any, string | JSXElementConstructor<any>>;
	label: string;
	isDisabled?: boolean;
	tooltipProps?: {
		[prop: string]: any;
	};
	[prop: string]: any;
}

export default function TooltipIconButton({
	icon,
	label,
	isDisabled,
	tooltipProps,
	...props
}: Props) {
	return (
		<>
			<Tooltip
				label={label}
				placement='bottom'
				aria-hidden={true}
				role='presentation'
				{...tooltipProps}
			>
				<IconButton
					icon={icon}
					variant='solid'
					aria-label={label}
					// isDisabled={isDisabled}
					// pointerEvents={isDisabled ? 'none' : 'auto'}
					{...props}
				/>
			</Tooltip>
		</>
	);
}
