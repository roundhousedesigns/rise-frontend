import { createContext, ReactNode, useReducer } from 'react';

interface UserState {
	userId: number;
	slug: string;
	firstName?: string;
	lastName?: string;
	email: string;
	starredProfiles?: number[];
}

interface UserAction {
	type: string;
	payload?: {
		userId?: number;
		slug?: string;
		firstName?: string;
		lastName?: string;
		email?: string;
		starredProfiles?: number[];
	};
}

const initialUserState: UserState = {
	userId: 0,
	slug: '',
	firstName: '',
	lastName: '',
	email: '',
	starredProfiles: [],
};

export const UserContext = createContext({
	user: initialUserState,
	userDispatch: ({}: UserAction) => {},
});

function userContextReducer(state: UserState, action: UserAction): UserState {
	switch (action.type) {
		case 'SET_USER':
		// set user

		case 'TOGGLE_STARRED_PROFILE':
		// toggle a profile ID in the starredProfiles array

		case 'CLEAR_USER':
			return initialUserState;

		default:
			return state;
	}
}

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
	const [user, userDispatch] = useReducer(userContextReducer, initialUserState);

	return <UserContext.Provider value={{ user, userDispatch }}>{children}</UserContext.Provider>;
};
