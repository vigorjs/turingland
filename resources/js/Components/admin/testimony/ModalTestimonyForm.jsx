import Modal from "@/Components/Modal";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import InputActiveCheckbox from "@/Components/InputActiveCheckbox";
import { toast } from "@/hooks/use-toast";
import { useForm } from "@inertiajs/react";
import { LoaderIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Textarea } from "@/Components/ui/textarea";

function ModalTestimonyForm({
    testimony,
    setTestimony,
    isOpenModal,
    setIsOpenModal,
}) {
    const [loading, setLoading] = useState(false);
    const [isActive, setIsActive] = useState(testimony?.is_active ?? false);
    const [errors, setErrors] = useState([]);

    const { data, setData, post, put, reset } = useForm({
        client_name: testimony?.client_name ?? "",
        client_avatar: null,
        content: testimony?.content ?? "",
        rating: testimony?.rating ?? 5,
        is_active: testimony?.is_active ?? true,
        _method: testimony ? "PUT" : "POST",
    });

    useEffect(() => {
        setData("is_active", isActive);
    }, [isActive]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        if (!testimony) {
            post(route("testimony.store"), {
                onError: (errors) => {
                    setLoading(false);
                    setErrors(errors);
                    toast({
                        title: "Testimoni gagal dibuat!",
                        description: errors?.client_name || errors?.content,
                        variant: "destructive",
                    });
                },
                onSuccess: () => {
                    toast({
                        title: "Testimoni berhasil dibuat!",
                        variant: "default",
                    });
                    setIsOpenModal(false);
                    setIsActive(false);
                    reset(
                        "client_name",
                        "client_avatar",
                        "content",
                        "rating",
                        "is_active"
                    );
                },
                onFinish: () => {
                    setLoading(false);
                },
            });
        } else {
            post(route("testimony.update", testimony.id), {
                onError: (errors) => {
                    setLoading(false);
                    setErrors(errors);
                    toast({
                        title: "Testimoni gagal diupdate!",
                        description: errors?.client_name || errors?.content,
                        variant: "destructive",
                    });
                },
                onSuccess: () => {
                    toast({
                        title: "Testimoni berhasil diupdate!",
                        variant: "default",
                    });
                    setIsOpenModal(false);
                    setIsActive(false);
                    reset(
                        "client_name",
                        "client_avatar",
                        "content",
                        "rating",
                        "is_active"
                    );
                },
                onFinish: () => {
                    setLoading(false);
                },
            });
        }
    };

    const handleCloseModal = () => {
        setTestimony(null);
        reset("client_name", "client_avatar", "content", "rating", "is_active");
        setIsOpenModal(false);
    };

    const ErrorMessage = ({ name }) => {
        return errors[name] ? (
            <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
        ) : null;
    };

    return (
        <Modal show={isOpenModal} onClose={handleCloseModal}>
            <div className="p-3.5 flex justify-between items-center">
                <h1 className="text-xl font-medium">
                    {!testimony ? "Tambah " : "Edit "} Testimoni
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
                    <Label htmlFor="client_name">Client Name</Label>
                    <Input
                        type="text"
                        id="client_name"
                        placeholder="Enter client name..."
                        value={data?.client_name ?? ""}
                        onChange={(e) => setData("client_name", e.target.value)}
                    />
                    <ErrorMessage name="client_name" />
                </div>

                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="client_avatar">Client Avatar</Label>
                    <Input
                        onChange={(e) =>
                            setData("client_avatar", e.target.files[0])
                        }
                        type="file"
                        id="client_avatar"
                        accept=".png, .jpg, .jpeg"
                    />
                    <ErrorMessage name="client_avatar" />
                </div>

                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                        id="content"
                        value={data?.content ?? ""}
                        onChange={(e) => setData("content", e.target.value)}
                        placeholder="Enter testimony content..."
                    />
                    <ErrorMessage name="content" />
                </div>

                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="rating">Rating</Label>
                    <Input
                        type="number"
                        id="rating"
                        min="1"
                        max="5"
                        value={data?.rating ?? 5}
                        onChange={(e) => setData("rating", e.target.value)}
                    />
                    <ErrorMessage name="rating" />
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
                    type="submit"
                    disabled={loading || !data.client_name || !data.content}
                    className="bg-primary text-white hover:bg-primary/95"
                >
                    {loading && (
                        <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {!testimony ? "Tambah " : "Edit "}
                </Button>
            </form>
        </Modal>
    );
}

export default ModalTestimonyForm;
