import { createContext, useReducer } from 'react';
import { Credit, UserProfile } from '../lib/classes';
import { sanitizeBoolean } from '../lib/utils';

interface EditProfileAction {
	type: string;
	payload: {
		[key: string]: any;
		credit?: Credit;
	};
}

export const EditProfileContext = createContext({
	editProfile: {} as UserProfile,
	editProfileDispatch: ({}: EditProfileAction) => {},
});

// TODO type this reducer's return
function editProfileContextReducer(state: UserProfile, action: EditProfileAction): any {
	switch (action.type) {
		case 'UPDATE_INPUT':
			return {
				...state,
				[action.payload.name]: action.payload.value,
			};

		case 'UPDATE_BOOLEAN_INPUT':
			return {
				...state,
				[action.payload.name]: sanitizeBoolean(action.payload.value),
			};

		case 'UPDATE_NESTED_INPUT':
			return {
				...state,
				[action.payload.parent]: {
					...state[action.payload.parent],
					[action.payload.name]: action.payload.value,
				},
			};

		case 'UPDATE_CREDIT':
			if (action.payload.credit === undefined) return state;

			const { credits: currentCredits } = state;
			const {
				payload: { credit: newCredit },
			} = action;

			const updatedCredits = currentCredits.map((credit) => {
				if (credit.id === newCredit?.id) {
					return new Credit({
						id: newCredit.id ? newCredit.id : 0,
						title: newCredit.title ? newCredit.title : '',
						venue: newCredit.venue ? newCredit.venue : '',
						year: newCredit.year ? newCredit.year : '',
						department: newCredit.positions.department ? newCredit.positions.department : 0,
						jobs: newCredit.positions.jobs
							? newCredit.positions.jobs.map((job) => Number(job))
							: [],
						skills: newCredit.skills ? newCredit.skills.map((skill) => Number(skill)) : [],
					});
				}

				return credit;
			});

			return {
				...state,
				credits: updatedCredits,
			};

		case 'ADD_CREDIT':
			return {
				...state,
				credits: [...state.credits, {} as Credit],
			};

		case 'INIT':
		case 'RESET':
			return action.payload;

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
