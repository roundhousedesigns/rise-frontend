import { Heading } from '@chakra-ui/react';

interface Props {
	title?: string;
	children: React.ReactNode;
}

export default function Page({ title, children }: Props) {
	return (
		<>
			{title ? (
				<Heading variant="pageTitle" as="h1">
					{title}
				</Heading>
			) : null}
			{children}
		</>
	);
}
