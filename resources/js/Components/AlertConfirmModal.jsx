import { InfoIcon } from "lucide-react";
import Modal from "./Modal";
import { Button } from "./ui/button";

export default function AlertConfirmModal({
    isOpen,
    setIsOpen,
    title,
    message,
    onClick,
}) {
    return (
        <Modal show={isOpen} onClose={() => setIsOpen(false)}>
            <div className="p-6 flex flex-col justify-center items-center gap-4">
                <div className="h-12 w-12 p-2 rounded-full bg-red-50 grid place-items-center">
                    <InfoIcon className="text-red-500 h-7 w-7" />
                </div>
                <div className="text-center">
                    <h1 className="text-xl font-medium">{title}</h1>
                    <p>{message}</p>
                </div>
                <div className="flex justify-center items-center gap-1.5 w-full sm:px-24">
                    <Button className="w-1/2 border border-neutral-800 bg-white hover:bg-gray-50 hover:border-neutral-800" onClick={() => setIsOpen(false)}>Batal</Button>
                    <Button className="w-1/2 text-white bg-red-500 hover:bg-red-600" onClick={onClick}>Ya, lanjutkan</Button>
                </div>
            </div>
        </Modal>
    );
}
