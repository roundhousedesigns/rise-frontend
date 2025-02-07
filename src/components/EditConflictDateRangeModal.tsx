import { useEffect, useState } from 'react';
import {
	Modal,
	ModalOverlay,
	ModalBody,
	ModalContent,
	ModalCloseButton,
	useToast,
} from '@chakra-ui/react';
import { DateRange } from '@lib/classes';
import useViewer from '@queries/useViewer';
import useUpdateConflictRange from '@mutations/useUpdateConflictRange';
import { useErrorMessage } from '@hooks/hooks';
import DateRangePicker from '@common/inputs/DateRangePicker';

interface Props {
	conflictRange?: DateRange;
	allDateRanges?: DateRange[];
	isOpen: boolean;
	onClose: () => void;
}

export default function EditConflictDateRangeModal({
	conflictRange = new DateRange(),
	allDateRanges,
	isOpen,
	onClose,
}: Props): JSX.Element {
	const [{ loggedInId }] = useViewer();

	const [errorCode, setErrorCode] = useState<string>('');
	const errorMessage = useErrorMessage(errorCode);

	const {
		updateConflictRangeMutation,
		results: { data, loading },
	} = useUpdateConflictRange();

	const { id, startDate, endDate } = conflictRange;

	const toast = useToast();

	useEffect(() => {
		// Close modal if update is successful
		if (data?.updateOrCreateConflictRange?.id && !loading) {
			onClose();

			toast({
				title: 'Success!',
				description: 'Conflict range updated.',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
		}

		return () => {
			setErrorCode('');
		};
	}, [data, loading]);

	const handleSelect = () => {
		setErrorCode('');
	};

	/**
	 * Updates the conflict range with the provided start and end dates.
	 */
	const saveDateRangeCallback = (newStartDate: Date, newEndDate: Date): void => {
		const overlappingRange = allDateRanges?.find(
			({ id: existingRangeId, startDate: existingStartDate, endDate: existingEndDate }) => {
				return (
					// Check if the new dates overlap with any other range
					existingRangeId !== id &&
					existingStartDate &&
					existingEndDate &&
					!(newEndDate < existingStartDate || newStartDate > existingEndDate)
				);
			}
		);

		if (overlappingRange) {
			setErrorCode('conflict_range_overlap');
			return;
		}

		updateConflictRangeMutation(id, loggedInId, newStartDate, newEndDate);
	};
	return (
		<Modal isOpen={isOpen} onClose={onClose} scrollBehavior='outside'>
			<ModalOverlay />
			<ModalContent>
				<ModalCloseButton />
				<ModalBody px={4} pb={4}>
					<DateRangePicker
						startDate={startDate}
						endDate={endDate ? endDate : undefined}
						error={errorCode ? errorMessage : ''}
						handleSelect={handleSelect}
						saveCallback={saveDateRangeCallback}
					/>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
