import { useMediaQuery } from '@chakra-ui/react';
import Page from '../components/Page';
import RegisterView from '../views/RegisterView';
import BackToLoginButton from '../components/common/BackToLoginButton';

export default function Register() {
	const [isLargerThanMd] = useMediaQuery('(min-width: 48rem)');
	const Button = () => (isLargerThanMd ? <BackToLoginButton /> : <></>);

	return (
		<Page title='Join the Directory' actions={<Button />}>
			<RegisterView />
		</Page>
	);
}
