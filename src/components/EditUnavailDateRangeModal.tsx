import { useEffect } from 'react';
import { Modal, ModalOverlay, ModalBody, ModalContent } from '@chakra-ui/react';
import { UnavailRange } from '@lib/classes';
import useViewer from '@hooks/queries/useViewer';
import useUpdateUnavailRange from '@hooks/mutations/useUpdateUnavailRange';
import DateRangePicker from '@common/inputs/DateRangePicker';

interface Props {
	unavailRange?: UnavailRange;
	isOpen: boolean;
	onClose: () => void;
}

export default function EditUnavailDateRangeModal({
	unavailRange = new UnavailRange(),
	isOpen,
	onClose,
}: Props): JSX.Element {
	const { loggedInId } = useViewer();
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
	}, [data, loading]);

	/**
	 * Updates the unavailability range with the provided start and end dates.
	 *
	 * @param {Date} startDate - The start date for the unavailability range.
	 * @param {Date} endDate - The end date for the unavailability range.
	 * @return {void} No return value.
	 */
	const saveUnavailRangeCallback = (startDate: Date, endDate: Date) => {
		updateUnavailRangeMutation(id, loggedInId, startDate, endDate);
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} scrollBehavior='outside'>
			<ModalOverlay />
			<ModalContent>
				<ModalBody px={4} pb={4}>
					<DateRangePicker
						startDate={startDate}
						endDate={endDate ? endDate : undefined}
						saveCallback={saveUnavailRangeCallback}
					/>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
