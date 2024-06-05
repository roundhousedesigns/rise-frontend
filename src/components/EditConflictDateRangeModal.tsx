import { useEffect, useState } from 'react';
import { Modal, ModalOverlay, ModalBody, ModalContent, ModalCloseButton } from '@chakra-ui/react';
import { ConflictRange } from '@lib/classes';
import useViewer from '@hooks/queries/useViewer';
import useUpdateConflictRange from '@hooks/mutations/useUpdateConflictRange';
import { useErrorMessage } from '@hooks/hooks';
import DateRangePicker from '@common/inputs/DateRangePicker';

interface Props {
	conflictRange?: ConflictRange;
	allConflictRanges?: ConflictRange[];
	isOpen: boolean;
	onClose: () => void;
}

export default function EditUnavailDateRangeModal({
	conflictRange = new ConflictRange(),
	allConflictRanges,
	isOpen,
	onClose,
}: Props): JSX.Element {
	const { loggedInId } = useViewer();

	const [errorCode, setErrorCode] = useState<string>('');
	const errorMessage = useErrorMessage(errorCode);

	const {
		updateConflictRangeMutation,
		results: { data, loading },
	} = useUpdateConflictRange();

	const { id, startDate, endDate } = conflictRange;

	// Close modal if update is successful
	useEffect(() => {
		if (data?.updateOrCreateConflictRange?.id && !loading) {
			onClose();
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
	const saveConflictRangeCallback = (newStartDate: Date, newEndDate: Date): void => {
		const overlappingRange = allConflictRanges?.find(
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
						saveCallback={saveConflictRangeCallback}
					/>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
