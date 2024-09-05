import { ReactNode, createContext, useReducer, useCallback } from 'react';
import { Credit, PersonalLinks, UserProfile } from '@lib/classes';
import { cloneInstance, generateRandomString, sanitizeBoolean } from '@lib/utils';
import { debounce } from 'lodash';

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

			const current: UserProfile = cloneInstance(state);

			current.set(action.payload.name, action.payload.value);

			return current;
		}

		case 'UPDATE_BOOLEAN_INPUT': {
			if (!action.payload.name || [undefined, null].includes(action.payload.value)) return state;

			const current: UserProfile = cloneInstance(state);
			current.set(action.payload.name, sanitizeBoolean(action.payload.value));

			return current;
		}

		case 'UPDATE_PERSONAL_LINKS_INPUT': {
			if (!action.payload.name) return state;

			const current: UserProfile = cloneInstance(state);

			current.set(
				'socials',
				new PersonalLinks({ ...current.socials, [action.payload.name]: action.payload.value })
			);

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

		case 'DEBOUNCED_UPDATE_INPUT': {
			if (!action.payload.name) return state;

			const current: UserProfile = cloneInstance(state);
			current.set(action.payload.name, action.payload.value);

			return current;
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
	const [editProfile, dispatch] = useReducer(editProfileContextReducer, initialState);

	const debouncedDispatch = useCallback(
		debounce((action: EditProfileAction) => {
			dispatch(action);
		}, 300),
		[]
	);

	const editProfileDispatch = useCallback(
		(action: EditProfileAction) => {
			if (action.type === 'UPDATE_INPUT') {
				debouncedDispatch({ ...action, type: 'DEBOUNCED_UPDATE_INPUT' });
			} else {
				dispatch(action);
			}
		},
		[debouncedDispatch]
	);

	return (
		<EditProfileContext.Provider value={{ editProfile, editProfileDispatch }}>
			{children}
		</EditProfileContext.Provider>
	);
};
