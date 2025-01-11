import React, { useState } from "react";
import axios from "axios";
import AdminLayout from "@/Layouts/AdminLayout"; // Import layout

const AdminSettings = () => {
    const [logo, setLogo] = useState(null); // Untuk menyimpan file yang dipilih
    const [preview, setPreview] = useState(null); // Preview logo yang dipilih

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLogo(file); // Update the logo state
            setPreview(URL.createObjectURL(file)); // Set the preview
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!logo) {
            alert("Pilih file logo terlebih dahulu.");
            return;
        }

        const formData = new FormData();
        formData.append("key", "logo_url");
        formData.append("value", logo);  // Ensure you are passing the file here

        try {
            const response = await axios({
                method: "post",
                url: route("web-preferences.post"),  // Check that this route is correct
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert(response.data.message);
        } catch (error) {
            console.error(error);
            alert("Gagal mengunggah logo.");
        }
    };


    return (
        <AdminLayout>
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold mb-4 text-black">Website Setting</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Select New Logo
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="mt-2 p-2 border border-gray-300 rounded-lg text-black"
                        />
                    </div>
                    {preview && (
                        <div className="mb-4">
                            <h3 className="text-sm font-medium text-gray-700">Preview:</h3>
                            <img
                                src={preview}
                                alt="Preview Logo"
                                className="mt-2 w-32 h-32 object-contain border border-gray-200"
                            />
                        </div>
                    )}
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Save Logo
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
};

export default AdminSettings;
