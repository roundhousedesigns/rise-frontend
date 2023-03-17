import { createContext } from 'react';
import { useLocalStorage } from '../hooks/hooks';
import { User } from '../lib/classes';
import { UserParams } from '../lib/types';

export const AuthContext = createContext({
	loggedInUser: {
		user: new User(),
		token: '',
	},
	setLoggedInUser: (user: UserParams) => {
		return new User(user);
	},
});

interface Props {
	children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: Props) => {
	const [loggedInUser, setLoggedInUser] = useLocalStorage('loggedInUser', new User());

	const contextValue = {
		loggedInUser,
		setLoggedInUser,
	};

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
