import { useEffect, useState } from 'react';
import { Modal, ModalOverlay, ModalBody, ModalContent, ModalCloseButton } from '@chakra-ui/react';
import { UnavailRange } from '@lib/classes';
import useViewer from '@hooks/queries/useViewer';
import useUpdateUnavailRange from '@hooks/mutations/useUpdateUnavailRange';
import { useErrorMessage } from '@hooks/hooks';
import DateRangePicker from '@common/inputs/DateRangePicker';

interface Props {
	unavailRange?: UnavailRange;
	allUnavailRanges?: UnavailRange[];
	isOpen: boolean;
	onClose: () => void;
}

export default function EditUnavailDateRangeModal({
	unavailRange = new UnavailRange(),
	allUnavailRanges,
	isOpen,
	onClose,
}: Props): JSX.Element {
	const { loggedInId } = useViewer();

	const [errorCode, setErrorCode] = useState<string>('');
	const errorMessage = useErrorMessage(errorCode);

	const {
		updateUnavailRangeMutation,
		results: { data, loading },
	} = useUpdateUnavailRange();

	const { id, startDate, endDate } = unavailRange;

	// Close modal if update is successful
	useEffect(() => {
		if (data?.updateOrCreateUnavailRange?.id && !loading) {
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
	 * Updates the unavailability range with the provided start and end dates.
	 */
	const saveUnavailRangeCallback = (newStartDate: Date, newEndDate: Date): void => {
		const overlappingRange = allUnavailRanges?.find(
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
			setErrorCode('unavail_range_overlap');
			return;
		}

		updateUnavailRangeMutation(id, loggedInId, newStartDate, newEndDate);
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
						saveCallback={saveUnavailRangeCallback}
					/>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
