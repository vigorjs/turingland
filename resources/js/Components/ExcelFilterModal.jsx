import React, { useState } from "react";
import { Button } from "@/Components/ui/button";
import Modal from "./Modal"; // Impor modal yang sudah Anda buat

export default function ExcelFilterModal({ isOpen, setIsOpen, onFilterSubmit }) {
    const [filter, setFilter] = useState("");

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleExport = () => {
        onFilterSubmit(filter);
        setIsOpen(false);
    };

    return (
        <Modal show={isOpen} onClose={handleClose}>
            <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">Export Excel Filter</h3>
                <div className="mb-4">
                    <label htmlFor="filter" className="block text-sm font-medium text-gray-700">
                        Filter Data
                    </label>
                    <input
                        id="filter"
                        type="text"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="flex justify-end gap-4">
                    <Button onClick={handleClose} className="bg-gray-500 hover:bg-gray-600 text-white">
                        Cancel
                    </Button>
                    <Button onClick={handleExport} className="bg-blue-500 hover:bg-blue-600 text-white">
                        Export
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
