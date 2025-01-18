import Modal from "@/Components/Modal";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Checkbox } from "@/Components/ui/checkbox";
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

    const { data, setData, post, reset, errors } = useForm({
        client_name: testimony?.client_name ?? "", // Mengambil nama klien, default kosong jika tidak ada
        client_avatar: null, // Avatar klien, default null untuk file upload
        content: testimony?.content ?? "", // Isi testimoni, default kosong
        rating: testimony?.rating ?? 5, // Nilai rating, default 5
        is_active: testimony?.is_active ?? true, // Status aktif, default true
        _method: testimony ? "PUT" : "POST", // Jika testimony ada, gunakan PUT, jika tidak gunakan POST
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
                    toast({
                        title: "Testimoni gagal dibuat!",
                        description: errors?.client_name || errors?.content,
                        variant: "destructive",
                    });
                    console.log("err: ", errors);
                },
                onSuccess: () => {
                    toast({
                        title: `Testimoni berhasil ${
                            testimony ? "diupdate" : "dibuat"
                        }!`,
                        variant: "default",
                    });
                    setLoading(false);
                    setIsOpenModal(false);
                    reset(
                        "client_name",
                        "client_avatar",
                        "content",
                        "rating",
                        "is_active"
                    );
                    setIsActive(false);
                },
                onFinish: () => {
                    setLoading(false);
                },
            });
        } else {
            post(route("testimony.update", testimony.id), {
                onError: (errors) => {
                    setLoading(false);
                    toast({
                        title: "Testimoni update Failed!",
                        description: errors?.client_name || errors?.content,
                        variant: "destructive",
                    });
                    console.log("err: ", errors);
                },
                onSuccess: () => {
                    toast({
                        title: `Testimoni berhasil ${
                            testimony ? "diupdate" : "dibuat"
                        }!`,
                        variant: "default",
                    });
                    setLoading(false);
                    setIsOpenModal(false);
                    reset(
                        "client_name",
                        "client_avatar",
                        "content",
                        "rating",
                        "is_active"
                    );
                    setIsActive(false);
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
                {/* Client Name */}
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="client_name">Client Name</Label>
                    <Input
                        type="text"
                        id="client_name"
                        placeholder="Enter client name..."
                        value={data?.client_name ?? ""}
                        onChange={(e) => setData("client_name", e.target.value)}
                    />
                    {errors.client_name && (
                        <span className="text-red-600 text-sm">
                            {errors.client_name}
                        </span>
                    )}
                </div>

                {/* Client Avatar */}
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="client_avatar">Client Avatar</Label>
                    <Input
                        onChange={(e) =>
                            setData("client_avatar", e.target.files[0])
                        }
                        type="file"
                        id="client_avatar"
                    />
                </div>

                {/* Content */}
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                        id="content"
                        value={data?.content ?? ""}
                        onChange={(e) => setData("content", e.target.value)}
                        placeholder="Enter testimony content..."
                    />
                    {errors.content && (
                        <span className="text-red-600 text-sm">
                            {errors.content}
                        </span>
                    )}
                </div>

                {/* Rating */}
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
                    {errors.rating && (
                        <span className="text-red-600 text-sm">
                            {errors.rating}
                        </span>
                    )}
                </div>

                {/* Is Active */}
                <div className="flex items-center gap-2">
                    <Checkbox
                        id="is_active"
                        checked={data?.is_active ?? false}
                        onCheckedChange={(checked) =>
                            setData("is_active", checked)
                        }
                    />
                    <Label htmlFor="is_active">Is Active</Label>
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
