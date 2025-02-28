'use client';

import { ReactNode, createContext, useContext, useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';

// Define the search context type
type SearchContextType = {
	searchTerm: string;
	setSearchTerm: (term: string) => void;
	drawerIsOpen: boolean;
	openDrawer: () => void;
	closeDrawer: () => void;
};

// Create the context with default values
const SearchContext = createContext<SearchContextType>({
	searchTerm: '',
	setSearchTerm: () => {},
	drawerIsOpen: false,
	openDrawer: () => {},
	closeDrawer: () => {},
});

// Hook to use the search context
export const useSearch = () => useContext(SearchContext);

// Provider component
export function SearchProvider({ children }: { children: ReactNode }) {
	const [searchTerm, setSearchTerm] = useState('');
	const { isOpen: drawerIsOpen, onOpen: openDrawer, onClose: closeDrawer } = useDisclosure();

	const value = {
		searchTerm,
		setSearchTerm,
		drawerIsOpen,
		openDrawer,
		closeDrawer,
	};

	return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
} 