import { useState, useEffect, forwardRef } from 'react';
import {
	Box,
	Button,
	ButtonGroup,
	Circle,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverContent,
	PopoverTrigger,
} from '@chakra-ui/react';
import 'country-flag-icons/3x2/flags.css';

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
					<FlagIcon lang={currentLang} label={'Change language'} />
				</PopoverTrigger>

				<PopoverContent w='auto'>
					<PopoverArrow />
					<PopoverBody m={0}>
						<ButtonGroup>
							<FlagIcon lang={'en'} label={'English'} onClick={() => changeLanguage('en')} />
							<FlagIcon lang={'es'} label={'Spanish'} onClick={() => changeLanguage('es')} />
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
	const flagMap: { [lang: string]: string } = {
		en: 'US',
		es: 'ES',
	};

	return (
		<Button ref={ref} bg='none' p={0} {...props}>
			<Circle
				className={`flag:${flagMap[lang] || 'US'}`}
				aria-label={label}
				cursor={'pointer'}
				size={'28px'}
				borderWidth={'2px'}
				_dark={{
					borderColor: 'text.light',
				}}
				_light={{
					borderColor: 'text.dark',
				}}
			/>
		</Button>
	);
});
