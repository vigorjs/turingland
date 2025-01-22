import InputActiveCheckbox from "@/Components/InputActiveCheckbox";
import Modal from "@/Components/Modal";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useForm } from "@inertiajs/react";
import { LoaderIcon, X } from "lucide-react";
import { useEffect, useState } from "react";

function ModalLocationForm({ location, isOpenModal, setIsOpenModal }) {
    const [isActive, setIsActive] = useState(location?.is_active ?? false);
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(false);

    const { data, setData, post, put, reset } = useForm({
        name: location?.name ?? "",
        description: location?.description ?? "",
        is_active: isActive,
        // _method: location ? "PUT" : "POST",
    });

    useEffect(() => {
        setData("is_active", isActive);
    }, [isActive]);

    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true);

        if (!location) {
            post(route("location.store"), {
                onError: (errors) => {
                    setLoading(false);
                    toast({
                        title: "Lokasi gagal dibuat!",
                        description:
                            errors?.name ||
                            errors?.description ||
                            errors?.area_id ||
                            errors?.is_active,
                        variant: "destructive",
                    });
                    setErrors(errors)
                    console.log("err: ", errors);
                },
                onSuccess: () => {
                    toast({
                        title: `Lokasi berhasil ${
                            location ? "diupdate" : "dibuat"
                        }!`,
                        // description: "location berhasil dibuat",
                        variant: "default",
                    });
                    setIsOpenModal(false);
                    setIsActive(false);
                    reset("name", "description");
                },
                onFinish: () => {
                    setLoading(false);
                },
            });
        } else {
            put(route("location.update", location.id), {
                onError: (errors) => {
                    setLoading(false);
                    toast({
                        title: "Lokasi update Failed!",
                        description:
                            errors?.name ||
                            errors?.description ||
                            errors?.area_id ||
                            errors?.is_active,
                        variant: "destructive",
                    });
                    setErrors(errors)
                    console.log("err: ", errors);
                },
                onSuccess: () => {
                    toast({
                        title: `Lokasi berhasil ${
                            location ? "diupdate" : "dibuat"
                        }!`,
                        // description: "Area berhasil dibuat",
                        variant: "default",
                    });
                    setIsOpenModal(false);
                    setIsActive(false);
                    reset("name", "description");
                },
                onFinish: () => {
                    setLoading(false);
                },
            });
        }
    };

    const ErrorMessage = ({ name }) => {
        return errors[name] ? (
            <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
        ) : null;
    };

    return (
        <Modal show={isOpenModal} onClose={() => setIsOpenModal(false)}>
            <div className="p-3.5 flex justify-between items-center">
                <h1 className="text-xl font-medium">
                    {!location ? "Tambah " : "Edit "} Lokasi
                </h1>
                <button onClick={() => setIsOpenModal(false)}>
                    <X />
                </button>
            </div>

            <hr />

            <form onSubmit={handleSubmit} className="p-3.5 flex flex-col gap-5">
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="nama">Nama</Label>
                    <Input
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        type="text"
                        id="nama"
                        placeholder="Masukkan nama location..."
                    />
                    <ErrorMessage name="name" />
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="icon">Deskripsi</Label>
                    <Input
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        type="text"
                        id="icon"
                        placeholder="Masukkan icon location..."
                    />
                    <ErrorMessage name="description" />
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="is_active">Active</Label>
                    <InputActiveCheckbox
                        isActive={isActive}
                        setIsActive={setIsActive}
                    />
                    <ErrorMessage name="is_active" />
                </div>
                <Button
                    // onClick={() => setIsOpenModal(false)}
                    type="submit"
                    disabled={loading || !data.name}
                    className="bg-primary text-white hover:bg-primary/95 hover:text-white"
                >
                    {loading && (
                        <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {!location ? "Tambah " : "Edit "}
                </Button>
            </form>
        </Modal>
    );
}

export default ModalLocationForm;
