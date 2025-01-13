import Modal from "@/Components/Modal";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Checkbox } from "@/Components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { useForm } from "@inertiajs/react";
import { LoaderIcon, X } from "lucide-react";
import { useEffect, useState } from "react";

function ModalBannerForm({
    banner,
    setBanner,
    isOpenModal,
    setIsOpenModal,
}) {
    const [loading, setLoading] = useState(false);
    const [isActive, setIsActive] = useState(banner?.is_active ?? false);

    const { data, setData, post, reset, errors } = useForm({
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
                    toast({
                        title: "Banner gagal dibuat!",
                        description: errors?.name || errors?.icon,
                        variant: "destructive",
                    });
                    console.log("err: ", errors);
                },
                onSuccess: () => {
                    toast({
                        title: `banner berhasil ${banner ? "diupdate" : "dibuat"
                            }!`,
                        variant: "default",
                    });
                    setLoading(true);
                    setIsOpenModal(false);
                    reset("title", "description", "image_path", "link", "order", "is_active");
                    setIsActive(false);
                },
                onFinish: () => {
                    setLoading(false);
                },
            });
        } else {
            post(route("banner.update", banner.id), {
                onError: (errors) => {
                    setLoading(false);
                    toast({
                        title: "Banner gagal dibuat!",
                        description: errors?.name || errors?.icon,
                        variant: "destructive",
                    });
                    console.log("err: ", errors);
                },
                onSuccess: () => {
                    toast({
                        title: `banner berhasil ${banner ? "diupdate" : "dibuat"
                            }!`,
                        variant: "default",
                    });
                    setLoading(true);
                    setIsOpenModal(false);
                    reset("title", "description", "image_path", "link", "order", "is_active");
                    setIsActive(false);
                },
                onFinish: () => {
                    setLoading(false);
                },
            });
        }
    };

    const handleCloseModal = () => {
        setBanner(null);
        reset("title", "description", "image_path", "link", "order", "is_active");
        setIsOpenModal(false);
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
                {/* Title */}
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="title">Title</Label>
                    <Input
                        type="text"
                        id="title"
                        placeholder="Enter banner title..."
                        value={data?.title ?? ""}
                        onChange={(e) => setData("title", e.target.value)}
                    />
                    {errors.title && <span className="text-red-600 text-sm">{errors.title}</span>}
                </div>

                {/* Description */}
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="description">Description</Label>
                    <Input
                        id="description"
                        value={data?.description ?? ""}
                        onChange={(e) => setData("description", e.target.value)}
                        placeholder="Enter banner description..."
                    />
                    {errors.description && <span className="text-red-600 text-sm">{errors.description}</span>}
                </div>

                {/* Image */}
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="image_path">Image</Label>
                    <Input
                        onChange={(e) => setData("image_path", e.target.files[0])}
                        type="file"
                        id="image_path"
                    />
                </div>

                {/* Link */}
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="link">Link</Label>
                    <Input
                        type="text"
                        id="link"
                        value={data?.link ?? ""}
                        onChange={(e) => setData("link", e.target.value)}
                        placeholder="Enter banner link..."
                    />
                    {errors.link && <span className="text-red-600 text-sm">{errors.link}</span>}
                </div>

                {/* Order */}
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="order">Order</Label>
                    <Input
                        type="number"
                        id="order"
                        value={data?.order ?? 0}
                        onChange={(e) => setData("order", e.target.value)}
                    />
                    {errors.order && <span className="text-red-600 text-sm">{errors.order}</span>}
                </div>

                {/* Is Active */}
                <div className="flex items-center gap-2">
                    <Checkbox
                        id="is_active"
                        checked={data?.is_active ?? false}
                        onCheckedChange={(checked) => setData("is_active", checked)}
                    />
                    <Label htmlFor="is_active">Is Active</Label>
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
};

export default ModalBannerForm;
