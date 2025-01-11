import React, { useState } from "react";
import axios from "axios";
import AdminLayout from "@/Layouts/AdminLayout"; // Import layout

const AdminSettings = () => {
    const [logo, setLogo] = useState(null);
    const [hero, setHero] = useState(null);
    const [logoDark, setLogoDark] = useState(null);
    const [imgLogin, setImgLogin] = useState(null);
    const [imgRegister, setImgRegister] = useState(null);
    const [previewLogo, setPreviewLogo] = useState(null);
    const [previewHero, setPreviewHero] = useState(null);
    const [previewLogoDark, setPreviewLogoDark] = useState(null);
    const [previewImgLogin, setPreviewImgLogin] = useState(null);
    const [previewImgRegister, setPreviewImgRegister] = useState(null);



    // Handle perubahan file logo
    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLogo(file);
            setPreviewLogo(URL.createObjectURL(file));
        }
    };

    // Handle perubahan file hero
    const handleHeroChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setHero(file);
            setPreviewHero(URL.createObjectURL(file));
        }
    };

    // Handle perubahan file logo dark
    const handleLogoDarkChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLogoDark(file);
            setPreviewLogoDark(URL.createObjectURL(file));
        }
    };

    // Handle perubahan file hero
    const handleImgLoginChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImgLogin(file);
            setPreviewImgLogin(URL.createObjectURL(file));
        }
    };

    // Handle perubahan file hero
    const handleImgRegisterChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImgRegister(file);
            setPreviewImgRegister(URL.createObjectURL(file));
        }
    };

    // Handle submit logo
    const handleLogoSubmit = async (e) => {
        e.preventDefault();
        if (!logo) {
            alert("Pilih file logo terlebih dahulu.");
            return;
        }

        const formData = new FormData();
        formData.append("key", "logo_url");
        formData.append("value", logo);

        try {
            const response = await axios.post(route("web-preferences.post"), formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert(response.data.message);
        } catch (error) {
            console.error(error);
            alert("Gagal mengunggah logo.");
        }
    };

    // Handle submit hero
    const handleHeroSubmit = async (e) => {
        e.preventDefault();
        if (!hero) {
            alert("Pilih file hero terlebih dahulu.");
            return;
        }

        const formData = new FormData();
        formData.append("key", "hero_url");
        formData.append("value", hero);

        try {
            const response = await axios.post(route("web-preferences.post"), formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert(response.data.message);
        } catch (error) {
            console.error(error);
            alert("Gagal mengunggah hero.");
        }
    };

    // Handle submit logo dark
    const handleLogoDarkSubmit = async (e) => {
        e.preventDefault();
        if (!logoDark) {
            alert("Pilih file logo dark terlebih dahulu.");
            return;
        }

        const formData = new FormData();
        formData.append("key", "logo_dark_url");
        formData.append("value", logoDark);

        try {
            const response = await axios.post(route("web-preferences.post"), formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert(response.data.message);
        } catch (error) {
            console.error(error);
            alert("Gagal mengunggah logo dark.");
        }
    };

    // Handle image login
    const handleImgLoginSubmit = async (e) => {
        e.preventDefault();
        if (!imgLogin) {
            alert("Pilih file image login terlebih dahulu.");
            return;
        }

        const formData = new FormData();
        formData.append("key", "img_login_url");
        formData.append("value", imgLogin);

        try {
            const response = await axios.post(route("web-preferences.post"), formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert(response.data.message);
        } catch (error) {
            console.error(error);
            alert("Gagal mengunggah image login.");
        }
    };

    // Handle image login
    const handleImgRegisterSubmit = async (e) => {
        e.preventDefault();
        if (!imgRegister) {
            alert("Pilih file image Register terlebih dahulu.");
            return;
        }

        const formData = new FormData();
        formData.append("key", "img_register_url");
        formData.append("value", imgRegister);

        try {
            const response = await axios.post(route("web-preferences.post"), formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert(response.data.message);
        } catch (error) {
            console.error(error);
            alert("Gagal mengunggah image Register.");
        }
    };

    return (
        <AdminLayout>
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold mb-6 text-black">Website Setting</h1>

                {/* Container untuk form-form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Form untuk Logo */}
                    <div className="bg-gray-50 p-4 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4 text-black">Update Logo</h2>
                        <form onSubmit={handleLogoSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Select New Logo</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleLogoChange}
                                    className="mt-2 p-2 border border-gray-300 rounded-lg text-black"
                                />
                            </div>
                            {previewLogo && (
                                <div className="mb-4">
                                    <h3 className="text-sm font-medium text-gray-700">Logo Preview:</h3>
                                    <img
                                        src={previewLogo}
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

                    {/* Form untuk Logo Dark */}
                    <div className="bg-gray-50 p-4 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4 text-black">Update Logo Dark</h2>
                        <form onSubmit={handleLogoDarkSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Select New Logo Dark</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleLogoDarkChange}
                                    className="mt-2 p-2 border border-gray-300 rounded-lg text-black"
                                />
                            </div>
                            {previewLogoDark && (
                                <div className="mb-4">
                                    <h3 className="text-sm font-medium text-gray-700">Logo Dark Preview:</h3>
                                    <img
                                        src={previewLogoDark}
                                        alt="Preview Logo Dark"
                                        className="mt-2 w-32 h-32 object-contain border border-gray-200"
                                    />
                                </div>
                            )}
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            >
                                Save Logo Dark
                            </button>
                        </form>
                    </div>

                    {/* Form untuk Hero */}
                    <div className="bg-gray-50 p-4 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4 text-black">Update Hero</h2>
                        <form onSubmit={handleHeroSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Select New Hero Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleHeroChange}
                                    className="mt-2 p-2 border border-gray-300 rounded-lg text-black"
                                />
                            </div>
                            {previewHero && (
                                <div className="mb-4">
                                    <h3 className="text-sm font-medium text-gray-700">Hero Preview:</h3>
                                    <img
                                        src={previewHero}
                                        alt="Preview Hero"
                                        className="mt-2 w-full max-w-lg object-contain border border-gray-200"
                                    />
                                </div>
                            )}
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            >
                                Save Hero
                            </button>
                        </form>
                    </div>

                    {/* Form untuk Image Login */}
                    <div className="bg-gray-50 p-4 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4 text-black">Update Login Image</h2>
                        <form onSubmit={handleImgLoginSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Select New Login Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImgLoginChange}
                                    className="mt-2 p-2 border border-gray-300 rounded-lg text-black"
                                />
                            </div>
                            {previewImgLogin && (
                                <div className="mb-4">
                                    <h3 className="text-sm font-medium text-gray-700">Login Image Preview:</h3>
                                    <img
                                        src={previewImgLogin}
                                        alt="Preview Image Login"
                                        className="mt-2 w-full max-w-lg object-contain border border-gray-200"
                                    />
                                </div>
                            )}
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            >
                                Save Image Login
                            </button>
                        </form>
                    </div>

                    {/* Form untuk Image Register */}
                    <div className="bg-gray-50 p-4 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4 text-black">Update Register Image</h2>
                        <form onSubmit={handleImgRegisterSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Select New Register Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImgRegisterChange}
                                    className="mt-2 p-2 border border-gray-300 rounded-lg text-black"
                                />
                            </div>
                            {previewImgRegister && (
                                <div className="mb-4">
                                    <h3 className="text-sm font-medium text-gray-700">Register Image Preview:</h3>
                                    <img
                                        src={previewImgRegister}
                                        alt="Preview Image Register"
                                        className="mt-2 w-full max-w-lg object-contain border border-gray-200"
                                    />
                                </div>
                            )}
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            >
                                Save Image Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>


    );
};

export default AdminSettings;
