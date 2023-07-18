import { ReactNode, createContext, useReducer } from 'react';
import { CurrentUser } from '../lib/classes';

interface CurrentUserAction {
	type: string;
	payload: {
		field?: string;
		value?: any;
		toggleStarredProfileId?: number;
	};
}

export const EditProfileContext = createContext({
	currentUser: new CurrentUser(),
	currentUserDispatch: ({}: CurrentUserAction) => {},
});

function currentUserContextReducer(state: CurrentUser, action: CurrentUserAction): any {
	switch (action.type) {
		case 'UPDATE_FIELD': {
			const { field, value } = action.payload;

			if (!field || value === undefined) return state;

			return { ...state, [field]: value };
		}

		case 'UPDATE_STARRED_PROFILES': {
			const { toggleStarredProfileId } = action.payload;

			if (!toggleStarredProfileId) return state;

			// Toggle the starred profile.
			const updatedStarredProfiles = state.starredProfiles.includes(toggleStarredProfileId)
				? state.starredProfiles.filter((id) => id !== toggleStarredProfileId)
				: [...state.starredProfiles, toggleStarredProfileId];

			return {
				...state,
				starredProfiles: updatedStarredProfiles,
			};
		}

		case 'INIT':
		case 'RESET': {
			return new CurrentUser();
		}

		default:
			return state;
	}
}

interface Props {
	children: ReactNode;
	initialState: CurrentUser | null;
}

export const EditProfileContextProvider = ({ children, initialState }: Props) => {
	const [currentUser, currentUserDispatch] = useReducer(currentUserContextReducer, initialState);

	return (
		<EditProfileContext.Provider value={{ currentUser, currentUserDispatch }}>
			{children}
		</EditProfileContext.Provider>
	);
};
