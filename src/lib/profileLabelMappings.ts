/**
 * Label mappings for individual and employer profile views.
 */

const labelMappings = {
	lastName: {
		individual: 'Last Name',
		employer: 'Name',
	},
	lastNamePlaceholder: {
		individual: 'Last Name',
		employer: 'Name',
	},
	profession: {
		individual: 'Profession',
		employer: '',
	},
	titleTradeProfession: {
		individual: 'Title/Trade/Profession',
		employer: 'Organization type',
	},
	titleTradeProfessionPlaceholder: {
		individual: 'Title',
		employer: 'Theater, producer, contractor, etc',
	},
	homebase: {
		individual: 'Home base',
		employer: 'Main location',
	},
	worksIn: {
		individual: 'Works In',
		employer: 'Location',
	},
	// Add new labels here as needed
} as const;

type LabelKey = keyof typeof labelMappings;
type UserType = 'individual' | 'employer';

export const getLabels = (isOrg: boolean): Record<LabelKey, string> => {
	const userType: UserType = isOrg ? 'employer' : 'individual';
	const labels: Record<string, string> = {};

	Object.keys(labelMappings).forEach((key) => {
		const labelKey = key as LabelKey; // Type assertion for TypeScript understanding
		labels[labelKey] = labelMappings[labelKey][userType];
	});

	return labels as Record<LabelKey, string>;
};
