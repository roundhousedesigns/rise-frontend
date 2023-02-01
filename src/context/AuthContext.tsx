import { createContext } from 'react';
import { useLocalStorage } from '../hooks/hooks';
import { User } from '../lib/classes';

export const AuthContext = createContext({
	loggedInUser: 0,
	setLoggedInUser: (status: boolean) => status,
});

interface Props {
	children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: Props) => {
	const [loggedInUser, setLoggedInUser] = useLocalStorage('loggedInUser', 0);

	const contextValue = {
		loggedInUser,
		setLoggedInUser,
	};

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
