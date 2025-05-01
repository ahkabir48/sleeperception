import React from 'react';
import { Dialog } from '@headlessui/react';
import './DeletePatientDialog.css';

interface DeletePatientDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    patientName: string;
}

const DeletePatientDialog: React.FC<DeletePatientDialogProps> = ({
    isOpen,
    onClose,
    onConfirm,
    patientName
}) => {
    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            className="delete-dialog-overlay"
        >
            <div className="delete-dialog-container">
                <Dialog.Panel className="delete-dialog-panel">
                    <Dialog.Title className="delete-dialog-title">
                        Delete Patient
                    </Dialog.Title>
                    <div className="delete-dialog-content">
                        <p>Are you sure you want to delete {patientName}?</p>
                        <p className="delete-dialog-warning">
                            This action cannot be undone.
                        </p>
                    </div>
                    <div className="delete-dialog-buttons">
                        <button
                            className="delete-dialog-cancel"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            className="delete-dialog-confirm"
                            onClick={onConfirm}
                        >
                            Delete
                        </button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};

export default DeletePatientDialog; 