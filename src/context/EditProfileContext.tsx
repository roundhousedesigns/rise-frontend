import { ReactNode, createContext, useReducer } from 'react';
import { Credit, UserProfile } from '@lib/classes';
import { generateRandomString, sanitizeBoolean } from '@lib/utils';

interface EditProfileAction {
	type: string;
	payload: {
		name?: string;
		value?: any;
		creditId?: string;
		credit?: Credit;
		profile?: UserProfile;
		newCreditTempId?: string;
	};
}

export const EditProfileContext = createContext({
	editProfile: new UserProfile(),
	editProfileDispatch: ({}: EditProfileAction) => {},
});

function editProfileContextReducer(state: UserProfile, action: EditProfileAction): any {
	switch (action.type) {
		case 'UPDATE_INPUT': {
			if (!action.payload.name) return state;

			const current = { ...state };
			current[action.payload.name] = action.payload.value;

			return current;
		}

		case 'UPDATE_BOOLEAN_INPUT': {
			if (!action.payload.name || !action.payload.value) return state;

			const current = { ...state };
			current[action.payload.name] = sanitizeBoolean(action.payload.value);

			return current;
		}

		case 'UPDATE_PERSONAL_LINKS_INPUT': {
			if (!action.payload.name) return state;

			const current = { ...state };
			(current.socials as any)[action.payload.name] = action.payload.value;

			return current;
		}

		case 'ADD_NEW_CREDIT': {
			return {
				...state,
				credits: [
					...state.credits,
					new Credit({
						id: generateRandomString(8),
						isNew: true,
						index: state.credits.length,
						positions: { departments: [], jobs: [] },
					}),
				],
			};
		}

		case 'INIT':
		case 'RESET': {
			return action.payload.profile;
		}

		default:
			return state;
	}
}

interface Props {
	initialState: UserProfile | null;
	children: ReactNode;
}

export const EditProfileContextProvider = ({ initialState, children }: Props) => {
	const [editProfile, editProfileDispatch] = useReducer(editProfileContextReducer, initialState);

	return (
		<EditProfileContext.Provider value={{ editProfile, editProfileDispatch }}>
			{children}
		</EditProfileContext.Provider>
	);
};
