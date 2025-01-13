import Modal from "@/Components/Modal";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useForm } from "@inertiajs/react";
import { LoaderIcon, X } from "lucide-react";
import { useState } from "react";

function ModalCategoryForm({
    category,
    setCategory,
    isOpenModal,
    setIsOpenModal,
}) {
    const [loading, setLoading] = useState(false);

    const { data, setData, post, reset, errors } = useForm({
        name: category?.name ?? "",
        icon: null,
        _method: category ? "PUT" : "POST",
    });

    console.log("ERR: ", errors);

    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true);

        if (!category) {
            post(route("category.store"), {
                onError: (errors) => {
                    setLoading(false);
                    toast({
                        title: "Kategori gagal dibuat!",
                        description: errors?.name || errors?.icon,
                        variant: "destructive",
                    });
                    console.log("err: ", errors);
                },
                onSuccess: () => {
                    toast({
                        title: `Kategori berhasil ${
                            category ? "diupdate" : "dibuat"
                        }!`,
                        // description: "Kategori berhasil dibuat",
                        variant: "default",
                    });
                    setIsOpenModal(false);
                    reset("name", "icon");
                },
                onFinish: () => {
                    setLoading(false);
                },
            });
        } else {
            post(route("category.update", category.id), {
                onError: (errors) => {
                    setLoading(false);
                    toast({
                        title: "Kategori gagal dibuat!",
                        description: errors?.name || errors?.icon,
                        variant: "destructive",
                    });
                    console.log("err: ", errors);
                },
                onSuccess: () => {
                    toast({
                        title: `Kategori berhasil ${
                            category ? "diupdate" : "dibuat"
                        }!`,
                        // description: "Kategori berhasil dibuat",
                        variant: "default",
                    });
                    setIsOpenModal(false);
                    reset("name", "icon");
                },
                onFinish: () => {
                    setLoading(false);
                },
            });
        }
    };

    const handleCloseModal = () => {
        setCategory(null);
        reset("name", "icon");
        setIsOpenModal(false);
    };

    return (
        <Modal show={isOpenModal} onClose={handleCloseModal}>
            <div className="p-3.5 flex justify-between items-center">
                <h1 className="text-xl font-medium">
                    {!category ? "Tambah " : "Edit "} Kategori
                </h1>
                <button onClick={handleCloseModal}>
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
                        type="text"
                        id="nama"
                        placeholder="Masukkan nama kategori..."
                        value={data?.name ?? ""}
                        onChange={(e) => setData("name", e.target.value)}
                    />
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="icon">Icon / Gambar</Label>
                    <Input
                        type="file"
                        id="icon"
                        placeholder="Masukkan icon kategori..."
                        // onChange={(e) => setData("icon", e.target.files?.[0] || null)}
                        onChange={(e) => setData("icon", e.target.files[0])}
                    />
                </div>
                <Button
                    type="submit"
                    disabled={loading || !data.name}
                    // onClick={() => setIsOpenModal(false)}
                    className="bg-primary text-white hover:bg-primary/95 hover:text-white"
                >
                    {loading && (
                        <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {!category ? "Tambah " : "Edit "}
                </Button>
            </form>
        </Modal>
    );
}

export default ModalCategoryForm;
