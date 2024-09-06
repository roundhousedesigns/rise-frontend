import { Flex } from '@chakra-ui/react';
import { FiFacebook, FiInstagram, FiLinkedin } from 'react-icons/fi';
import { PersonalLinks } from '@lib/classes';
import SocialIcon from '@common/SocialIcon';
import XIcon from '@common/icons/X';

interface Props {
	socials: PersonalLinks;
	[prop: string]: any;
}

export default function PersonalIconLinks({ socials, ...props }: Props): JSX.Element {
	const { facebook, twitter, instagram, linkedin } = socials;

	return (
		<Flex gap={4} {...props}>
			{linkedin && (
				<SocialIcon label={'LinkedIn'} name={'linkedin'} value={linkedin} icon={<FiLinkedin />} />
			)}
			{facebook && (
				<SocialIcon label={'Facebook'} name={'facebook'} value={facebook} icon={<FiFacebook />} />
			)}

			{twitter && (
				<SocialIcon label={'X/Twitter'} name={'twitter'} value={twitter} icon={<XIcon />} />
			)}

			{instagram && (
				<SocialIcon label={'Instagram'} name={'instagram'} value={instagram} icon={<FiInstagram />} />
			)}
		</Flex>
	);
}
