import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface DeleteModalProps {
	openModal: boolean;
	alertMessage: string;
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>; // Type definition for the prop
	onDelete: React.MouseEventHandler<HTMLButtonElement>;
}

const DeleteModal = ({ openModal, setOpenModal, onDelete, alertMessage }: DeleteModalProps) => {
	return (
		<AlertDialog open={openModal}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>{alertMessage}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={() => setOpenModal(false)}>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default DeleteModal;
