import InputActiveCheckbox from "@/Components/InputActiveCheckbox";
import Modal from "@/Components/Modal";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { LoaderIcon, X } from "lucide-react";

function ModalBannerForm({ banner, setBanner, isOpenModal, setIsOpenModal }) {
    const [isActive, setIsActive] = useState(banner?.is_active ?? false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const { data, setData, post, put, reset } = useForm({
        title: banner?.title ?? "",
        description: banner?.description ?? "",
        image_path: null,
        link: banner?.link ?? "",
        order: banner?.order ?? 0,
        is_active: isActive,
        _method: banner ? "PUT" : "POST",
    });

    useEffect(() => {
        setData("is_active", isActive);
    }, [isActive]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        if (!banner) {
            post(route("banner.store"), {
                onError: (errors) => {
                    setLoading(false);
                    setErrors(errors);
                    toast({
                        title: "Banner gagal dibuat!",
                        description: errors?.title || errors?.description,
                        variant: "destructive",
                    });
                },
                onSuccess: () => {
                    toast({
                        title: "Banner berhasil dibuat!",
                        variant: "default",
                    });
                    setIsOpenModal(false);
                    setIsActive(false);
                    reset(
                        "title",
                        "description",
                        "image_path",
                        "link",
                        "order",
                        "is_active"
                    );
                },
                onFinish: () => {
                    setLoading(false);
                },
            });
        } else {
            post(route("banner.update", banner.id), {
                onError: (errors) => {
                    setLoading(false);
                    setErrors(errors);
                    toast({
                        title: "Banner gagal diupdate!",
                        description: errors?.title || errors?.description,
                        variant: "destructive",
                    });
                },
                onSuccess: () => {
                    toast({
                        title: "Banner berhasil diupdate!",
                        variant: "default",
                    });
                    setIsOpenModal(false);
                    setIsActive(false);
                    reset(
                        "title",
                        "description",
                        "image_path",
                        "link",
                        "order",
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
        setBanner(null);
        reset(
            "title",
            "description",
            "image_path",
            "link",
            "order",
            "is_active"
        );
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
                    {!banner ? "Tambah " : "Edit "} Banner
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
                    <Label htmlFor="title">Title</Label>
                    <Input
                        type="text"
                        id="title"
                        placeholder="Enter banner title..."
                        value={data?.title ?? ""}
                        onChange={(e) => setData("title", e.target.value)}
                    />
                    {errors.title && (
                        <span className="text-red-600 text-sm">
                            {errors.title}
                        </span>
                    )}
                </div>

                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="description">Description</Label>
                    <Input
                        id="description"
                        value={data?.description ?? ""}
                        onChange={(e) => setData("description", e.target.value)}
                        placeholder="Enter banner description..."
                    />
                    {errors.description && (
                        <span className="text-red-600 text-sm">
                            {errors.description}
                        </span>
                    )}
                </div>

                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="image_path">Image</Label>
                    <Input
                        onChange={(e) =>
                            setData("image_path", e.target.files[0])
                        }
                        type="file"
                        id="image_path"
                        accept=".png, .jpg, .jpeg"
                    />
                </div>

                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="link">Link</Label>
                    <Input
                        type="text"
                        id="link"
                        value={data?.link ?? ""}
                        onChange={(e) => setData("link", e.target.value)}
                        placeholder="Enter banner link..."
                    />
                    {errors.link && (
                        <span className="text-red-600 text-sm">
                            {errors.link}
                        </span>
                    )}
                </div>

                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="order">Order</Label>
                    <Input
                        type="number"
                        id="order"
                        value={data?.order ?? 0}
                        onChange={(e) => setData("order", e.target.value)}
                    />
                    {errors.order && (
                        <span className="text-red-600 text-sm">
                            {errors.order}
                        </span>
                    )}
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
                    disabled={loading || !data.title}
                    className="bg-primary text-white hover:bg-primary/95"
                >
                    {loading && (
                        <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {!banner ? "Tambah " : "Edit "}
                </Button>
            </form>
        </Modal>
    );
}

export default ModalBannerForm;
