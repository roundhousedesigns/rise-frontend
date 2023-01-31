import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Stack, IconButton, Link } from '@chakra-ui/react';
import {
	FiFacebook,
	FiInstagram,
	FiTwitter,
	FiLinkedin,
	FiGlobe,
} from 'react-icons/fi';
import { Socials } from '../../lib/classes';

interface Props {
	socials: Socials;
	website?: string;
}

export default function SocialLinks({ socials, website }: Props) {
	const { facebook, twitter, instagram, linkedin } = socials;

	return (
		<Stack direction="row" spacing={4}>
			{facebook && (
				<Link as={RouterLink} to={facebook} isExternal>
					<IconButton
						variant="socialRound"
						aria-label="Facebook"
						icon={<FiFacebook />}
					/>
				</Link>
			)}

			{twitter && (
				<Link as={RouterLink} to={twitter} isExternal>
					<IconButton
						variant="socialRound"
						aria-label="Twitter"
						icon={<FiTwitter />}
					/>
				</Link>
			)}

			{instagram && (
				<Link as={RouterLink} to={instagram} isExternal>
					<IconButton
						variant="socialRound"
						aria-label="Instagram"
						icon={<FiInstagram />}
					/>
				</Link>
			)}

			{linkedin && (
				<Link as={RouterLink} to={linkedin} isExternal>
					<IconButton
						variant="socialRound"
						aria-label="LinkedIn"
						icon={<FiLinkedin />}
					/>
				</Link>
			)}

			{website ? (
				<Link as={RouterLink} to={website} isExternal>
					<IconButton
						variant="socialRound"
						aria-label="Personal website"
						icon={<FiGlobe />}
					/>
				</Link>
			) : null}
		</Stack>
	);
}
