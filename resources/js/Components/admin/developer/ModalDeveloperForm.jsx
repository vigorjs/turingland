import InputActiveCheckbox from "@/Components/InputActiveCheckbox";
import Modal from "@/Components/Modal";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { LoaderIcon, X } from "lucide-react";
import { Label } from "@/Components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";

function ModalDeveloperForm({ developer, isOpenModal, setIsOpenModal }) {
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState(
        developer?.logo ? `/storage/${developer?.logo}` : null
    );
    const [isActive, setIsActive] = useState(developer?.is_active ?? false);

    const { data, setData, post, reset } = useForm({
        name: developer?.name ?? "",
        description: developer?.description ?? "",
        logo: null,
        is_active: isActive,
        _method: developer ? "PUT" : "POST",
    });

    useEffect(() => {
        setData("is_active", isActive);
    }, [isActive]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (!developer) {
            post(route("developer.store"), {
                onError: (errors) => {
                    setIsLoading(false);
                    toast({
                        title: "Developer gagal dibuat!",
                        description: errors?.name || errors?.logo,
                        variant: "destructive",
                    });
                    console.log("err: ", errors);
                },
                onSuccess: () => {
                    toast({
                        title: `Developer berhasil ${
                            developer ? "diupdate" : "dibuat"
                        }!`,
                        // description: "Kategori berhasil dibuat",
                        variant: "default",
                    });
                    setIsLoading(true);
                    setIsOpenModal(false);
                    reset("name", "description", "logo");
                    setIsActive(false);
                },
                onFinish: () => {
                    setIsLoading(false);
                },
            });
        } else {
            console.log("LALALA: ", data.name);

            post(route("developer.update", developer.id), {
                onError: (errors) => {
                    setIsLoading(false);
                    toast({
                        title: "Developer update Failed!",
                        description: errors?.name || errors?.logo,
                        variant: "destructive",
                    });
                    console.log("err: ", errors);
                },
                onSuccess: () => {
                    toast({
                        title: `Developer berhasil ${
                            developer ? "diupdate" : "dibuat"
                        }!`,
                        // description: "Kategori berhasil dibuat",
                        variant: "default",
                    });
                    setIsLoading(true);
                    setIsOpenModal(false);
                    reset("name", "description", "logo");
                    setIsActive(false);
                },
                onFinish: () => {
                    setIsLoading(false);
                },
            });
        }
    };

    const handleImageDelete = () => {
        setImage(null);
        setData("logo", null);
    };

    // useEffect(() => {
    //     setIsActive(developer?.is_active);
    // }, [developer]);

    return (
        <Modal show={isOpenModal} onClose={() => setIsOpenModal(false)}>
            <div className="p-3.5 flex justify-between items-center">
                <h1 className="text-xl font-medium">
                    {!developer ? "Tambah " : "Edit "} Developer
                </h1>
                <button onClick={() => setIsOpenModal(false)}>
                    <X />
                </button>
            </div>

            <hr />

            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="p-3.5 flex flex-col gap-5"
            >
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="nama">Nama</Label>
                    <Input
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        type="text"
                        id="nama"
                        placeholder="Masukkan nama developer..."
                    />
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="deskripsi">Deskripsi</Label>
                    <Input
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        type="text"
                        id="deskripsi"
                        placeholder="Masukkan deskripsi developer..."
                    />
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="logo">Logo</Label>
                    <Input
                        onChange={(e) => {
                            setData("logo", e.target.files[0]);
                            setImage(URL.createObjectURL(e.target.files[0]));
                        }}
                        type="file"
                        id="logo"
                        accept="image/*"
                    />
                </div>

                <div className={`${!image && "hidden"} w-full`}>
                    <img
                        src={image}
                        alt="Image preview"
                        className="w-32 shadow"
                    />
                    {!developer && (
                        <button
                            type="button"
                            onClick={handleImageDelete}
                            className="text-primary font-bold text-sm mt-2"
                        >
                            Hapus foto?
                        </button>
                    )}
                </div>

                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="is_active">Active</Label>
                    <InputActiveCheckbox
                        isActive={isActive}
                        setIsActive={setIsActive}
                    />
                </div>
                <Button
                    // onClick={() => setIsOpenModal(false)}
                    disabled={isLoading || !data.name}
                    type="submit"
                    className="bg-primary text-white hover:bg-primary/95 hover:text-white"
                >
                    {isLoading && (
                        <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {!developer ? "Tambah " : "Edit "}
                </Button>
            </form>
        </Modal>
    );
}

export default ModalDeveloperForm;
