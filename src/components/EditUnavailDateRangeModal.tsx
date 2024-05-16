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

	useEffect(() => {
		if (data?.updateOrCreateUnavailRange?.id && !loading) {
			onClose();
		}
	}, [data, loading]);

	const saveUnavailRangeCallback = (startDate: Date, endDate: Date) => {
		console.info('Unavail Range', startDate, endDate);
		updateUnavailRangeMutation(id, loggedInId, startDate, endDate);
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} scrollBehavior='outside' size='4xl'>
			<ModalOverlay />
			<ModalContent>
				<ModalBody px={4} pb={4}>
					<DateRangePicker
						startDate={startDate}
						endDate={endDate}
						callback={saveUnavailRangeCallback}
					/>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
