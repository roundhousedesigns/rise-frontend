import { useMediaQuery } from '@chakra-ui/react';
import Shell from '@layout/Shell';
import RegisterView from '@views/RegisterView';
import BackToLoginButton from '@common/BackToLoginButton';

export default function Register() {
	const [isLargerThanMd] = useMediaQuery('(min-width: 48rem)');
	const Button = () => (isLargerThanMd ? <BackToLoginButton /> : <></>);

	return (
		<Shell title={'Join the Directory'} actions={<Button />}>
			<RegisterView />
		</Shell>
	);
}
