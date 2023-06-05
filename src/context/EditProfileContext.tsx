import { createContext, useReducer } from 'react';
import { Credit, UserProfile } from '../lib/classes';
import { generateRandomString, sanitizeBoolean } from '../lib/utils';

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
			current.socials = { ...current.socials, [action.payload.name]: action.payload.value };

			return current;
		}

		case 'UPDATE_CREDIT': {
			if (action.payload.credit === undefined) return state;

			const { credits: currentCredits } = state;
			const {
				payload: { credit: updatedCredit, newCreditTempId },
			} = action;

			const updatedCredits = currentCredits.map((credit) => {
				if (credit.id.toString() === updatedCredit.id || newCreditTempId === credit.id) {
					return new Credit(updatedCredit);
				}

				return credit;
			});

			return {
				...state,
				credits: updatedCredits,
			};
		}

		case 'ADD_CREDIT': {
			return {
				...state,
				credits: [
					...state.credits,
					new Credit({ id: generateRandomString(8), isNew: true, index: state.credits.length }),
				],
			};
		}

		case 'DELETE_CREDIT': {
			if (!action.payload.creditId) return state;

			const trimmedCredits = state.credits.filter(
				(credit) => credit.id.toString() !== action.payload.creditId?.toString()
			);

			return {
				...state,
				credits: trimmedCredits,
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
	children: React.ReactNode;
	initialState: UserProfile | null;
}

export const EditProfileContextProvider = ({ children, initialState }: Props) => {
	const [editProfile, editProfileDispatch] = useReducer(editProfileContextReducer, initialState);

	return (
		<EditProfileContext.Provider value={{ editProfile, editProfileDispatch }}>
			{children}
		</EditProfileContext.Provider>
	);
};
