import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "@/Layouts/AdminLayout"; // Import layout
import UpdateImageForm from "@/Components/admin/admin_web_preferences/form";
import { useToast } from "@/hooks/use-toast";

const WebPreferences = ({ auth }) => {
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

    const [currentLogo, setCurrentLogo] = useState(null);
    const [currentLogoDark, setCurrentLogoDark] = useState(null);
    const [currentHero, setCurrentHero] = useState(null);
    const [currentImgLogin, setCurrentImgLogin] = useState(null);
    const [currentImgRegister, setCurrentImgRegister] = useState(null);

    const { toast } = useToast();

    useEffect(() => {
        const fetchImage = async (key, setter) => {
            try {
                const response = await axios.get(
                    route("web-preferences.get", { key })
                );
                setter(response.data.value); // Menyimpan path ke state
            } catch (error) {
                console.error(`Error fetching current ${key}:`, error);
            }
        };

        fetchImage("logo_url", setCurrentLogo);
        fetchImage("logo_dark_url", setCurrentLogoDark);
        fetchImage("hero_url", setCurrentHero);
        fetchImage("img_login_url", setCurrentImgLogin);
        fetchImage("img_register_url", setCurrentImgRegister);
    }, []);

    // Handle perubahan file
    const handleFileChange = (setter, previewSetter) => (e) => {
        const file = e.target.files[0];
        if (file) {
            setter(file);
            previewSetter(URL.createObjectURL(file));
        }
    };

    // Handle pengunggahan file
    const handleFileSubmit = (key, file) => async (e) => {
        e.preventDefault();
        if (!file) {
            toast({
                title: "Upload Failed ❌",
                description: `Pilih file untuk ${key.replace(
                    "_",
                    " "
                )} terlebih dahulu.`,
                variant: "destructive",
            });
            return;
        }

        const formData = new FormData();
        formData.append("key", key);
        formData.append("value", file);

        try {
            const response = await axios.post(
                route("web-preferences.post"),
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            window.location.reload();
            toast({
                title: "Upload Success ✅",
                description: response.data.message,
                variant: "default",
            });
        } catch (error) {
            console.error(error);
            toast({
                title: "Upload Failed ❌",
                description: `Gagal mengunggah ${key.replace("_", " ")}.`,
                variant: "destructive",
            });
        }
    };

    // Perubahan file
    const handleLogoChange = handleFileChange(setLogo, setPreviewLogo);
    const handleHeroChange = handleFileChange(setHero, setPreviewHero);
    const handleLogoDarkChange = handleFileChange(
        setLogoDark,
        setPreviewLogoDark
    );
    const handleImgLoginChange = handleFileChange(
        setImgLogin,
        setPreviewImgLogin
    );
    const handleImgRegisterChange = handleFileChange(
        setImgRegister,
        setPreviewImgRegister
    );

    // Pengunggahan file
    const handleLogoSubmit = handleFileSubmit("logo_url", logo);
    const handleHeroSubmit = handleFileSubmit("hero_url", hero);
    const handleLogoDarkSubmit = handleFileSubmit("logo_dark_url", logoDark);
    const handleImgLoginSubmit = handleFileSubmit("img_login_url", imgLogin);
    const handleImgRegisterSubmit = handleFileSubmit(
        "img_register_url",
        imgRegister
    );

    return (
        <AdminLayout auth={auth}>
            <div className="p-6 bg-white rounded-lg shadow-md h-full">
                <h1 className="text-2xl font-semibold mb-6 text-black">
                    Website Setting
                </h1>

                {/* Container untuk form-form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <UpdateImageForm
                        title="Logo"
                        currentImage={
                            currentLogo ? `/storage/${currentLogo}` : null
                        }
                        previewImage={previewLogo}
                        onImageChange={handleLogoChange}
                        onSubmit={handleLogoSubmit}
                    />
                    <UpdateImageForm
                        title="Logo Dark"
                        currentImage={
                            currentLogoDark
                                ? `/storage/${currentLogoDark}`
                                : null
                        }
                        previewImage={previewLogoDark}
                        onImageChange={handleLogoDarkChange}
                        onSubmit={handleLogoDarkSubmit}
                    />
                    <UpdateImageForm
                        title="Hero"
                        currentImage={
                            currentHero ? `/storage/${currentHero}` : null
                        }
                        previewImage={previewHero}
                        onImageChange={handleHeroChange}
                        onSubmit={handleHeroSubmit}
                    />
                    <UpdateImageForm
                        title="Login Image"
                        currentImage={
                            currentImgLogin
                                ? `/storage/${currentImgLogin}`
                                : null
                        }
                        previewImage={previewImgLogin}
                        onImageChange={handleImgLoginChange}
                        onSubmit={handleImgLoginSubmit}
                    />
                    <UpdateImageForm
                        title="Register Image"
                        currentImage={
                            currentImgRegister
                                ? `/storage/${currentImgRegister}`
                                : null
                        }
                        previewImage={previewImgRegister}
                        onImageChange={handleImgRegisterChange}
                        onSubmit={handleImgRegisterSubmit}
                    />
                </div>
            </div>
        </AdminLayout>
    );
};

export default WebPreferences;
