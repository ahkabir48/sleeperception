import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import './AddPatientDialog.css';

interface AddPatientDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onAddPatient: (name: string, roomNumber: string) => Promise<void>;
}

export default function AddPatientDialog({ isOpen, onClose, onAddPatient }: AddPatientDialogProps) {
    const [name, setName] = useState('');
    const [roomNumber, setRoomNumber] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !roomNumber) return;

        setIsSubmitting(true);
        try {
            await onAddPatient(name, roomNumber);
            setName('');
            setRoomNumber('');
            onClose();
        } catch (error) {
            console.error('Error adding patient:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <div className="dialog-overlay" aria-hidden="true" />
            
            <div className="dialog-container">
                <Dialog.Panel className="dialog-panel">
                    <Dialog.Title className="dialog-title">
                        Add New Patient
                    </Dialog.Title>

                    <form onSubmit={handleSubmit} className="dialog-form">
                        <div className="form-group">
                            <label htmlFor="name" className="form-label">
                                Patient Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="form-input"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="roomNumber" className="form-label">
                                Room Number
                            </label>
                            <input
                                type="text"
                                id="roomNumber"
                                value={roomNumber}
                                onChange={(e) => setRoomNumber(e.target.value)}
                                className="form-input"
                                required
                            />
                        </div>

                        <div className="dialog-buttons">
                            <button
                                type="button"
                                onClick={onClose}
                                className="cancel-button"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="submit-button"
                            >
                                {isSubmitting ? 'Adding...' : 'Add Patient'}
                            </button>
                        </div>
                    </form>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
} 