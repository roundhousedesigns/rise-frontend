import { createContext } from 'react';
import { useLocalStorage } from '../hooks/hooks';

export const AuthContext = createContext({
	userIsLoggedIn: false,
	setUserIsLoggedIn: (status: boolean) => status,
});

interface Props {
	children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: Props) => {
	const [userIsLoggedIn, setUserIsLoggedIn] = useLocalStorage('userIsLoggedIn', 0);

	const contextValue = {
		userIsLoggedIn,
		setUserIsLoggedIn,
	};

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
