import { useState, useEffect, ReactElement, forwardRef } from 'react';
import {
	Box,
	ButtonGroup,
	IconButton,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
} from '@chakra-ui/react';
import { US, ES } from 'country-flag-icons/react/3x2';

function LanguageSelect() {
	const [currentLang, setCurrentLang] = useState<string>('');

	useEffect(() => {
		// Ensure Weglot is loaded before accessing its methods
		if (window.Weglot) {
			setCurrentLang(window.Weglot.getCurrentLang());
		} else {
			console.warn('Weglot is not loaded yet.');
		}
	}, []);

	const changeLanguage = (lang: string) => {
		if (window.Weglot) {
			window.Weglot.switchTo(lang);
			setCurrentLang(lang); // Update state with the new language
		} else {
			console.warn('Weglot is not available.');
		}
	};

	return (
		<Box>
			<Popover>
				<PopoverTrigger>
					<FlagIcon lang={currentLang} label='Change language' />
				</PopoverTrigger>

				<PopoverContent>
					<PopoverArrow />
					<PopoverHeader>Change language</PopoverHeader>
					<PopoverBody>
						<ButtonGroup>
							<FlagIcon lang='en' label='English' onClick={() => changeLanguage('en')} />
							<FlagIcon lang='es' label='Spanish' onClick={() => changeLanguage('es')} />
						</ButtonGroup>
					</PopoverBody>
				</PopoverContent>
			</Popover>
		</Box>
	);
}

export default LanguageSelect;

const FlagIcon = forwardRef<
	HTMLButtonElement,
	{ lang: string; label: string; [prop: string]: any }
>(({ lang, label, ...props }, ref) => {
	const flagMap: { [lang: string]: ReactElement } = {
		en: <US title='English' />,
		es: <ES title='Spanish' />,
	};

	return (
		<IconButton
			icon={flagMap[lang]}
			aria-label={label}
			cursor='pointer'
			size='xs'
			ref={ref}
			{...props}
		/>
	);
});
