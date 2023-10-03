import { createContext } from 'react';

interface SearchDrawerContextProps {
	drawerIsOpen: boolean;
	openDrawer: () => void;
	closeDrawer: () => void;
}

const defaultSearchDrawerContext: SearchDrawerContextProps = {
	drawerIsOpen: false,
	openDrawer: () => {},
	closeDrawer: () => {},
};

const SearchDrawerContext = createContext(defaultSearchDrawerContext);

export default SearchDrawerContext;
