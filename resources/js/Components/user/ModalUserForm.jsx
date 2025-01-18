import Modal from "@/Components/Modal";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useForm } from "@inertiajs/react";
import { LoaderIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import InputActiveCheckbox from "../InputActiveCheckbox";

function ModalUserForm({ user, setUser, isOpenModal, setIsOpenModal }) {
    const [loading, setLoading] = useState(false);
    const [isAgentActive, setIsAgentActive] = useState(
        user?.is_agent_active ?? false
    );

    const [photo, setPhoto] = useState(
        user?.photo ? `/storage/${user?.photo}` : null
    );
    const { data, setData, post, reset, errors } = useForm({
        name: user?.name ?? "",
        email: user?.email ?? "",
        password: user?.password ?? "",
        wa_number: user?.wa_number ?? "",
        photo: null,
        is_agent_active: isAgentActive,
        _method: user ? "PUT" : "POST",
    });

    useEffect(() => {
        setData("is_agent_active", isAgentActive);
    }, [isAgentActive]);

    console.log("ERR: ", errors);

    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true);

        if (!user) {
            post(route("dashboard.agent.store"), {
                onError: (errors) => {
                    setLoading(false);
                    toast({
                        title: "User gagal dibuat!",
                        description:
                            errors?.name || errors?.photo || errors.wa_number,
                        variant: "destructive",
                    });
                    console.log("err: ", errors);
                },
                onSuccess: () => {
                    toast({
                        title: `User berhasil ${user ? "diupdate" : "dibuat"}!`,
                        // description: "User berhasil dibuat",
                        variant: "default",
                    });
                    setIsOpenModal(false);
                    reset("name", "photo");
                },
                onFinish: () => {
                    setLoading(false);
                },
            });
        } else {
            post(route("dashboard.agent.update", user.id), {
                onError: (errors) => {
                    setLoading(false);
                    toast({
                        title: "User gagal dibuat!",
                        description: errors?.name || errors?.photo,
                        variant: "destructive",
                    });
                    console.log("err: ", errors);
                },
                onSuccess: () => {
                    toast({
                        title: `User berhasil ${user ? "diupdate" : "dibuat"}!`,
                        // description: "User berhasil dibuat",
                        variant: "default",
                    });
                    setIsOpenModal(false);
                    reset("name", "photo");
                },
                onFinish: () => {
                    setLoading(false);
                },
            });
        }
    };

    const handleCloseModal = () => {
        setUser(null);
        reset("name", "photo");
        setIsOpenModal(false);
    };

    const handleImageDelete = () => {
        setPhoto(null);
        setData("photo", null);
    };

    return (
        <Modal show={isOpenModal} onClose={handleCloseModal}>
            <div className="p-3.5 flex justify-between items-center">
                <h1 className="text-xl font-medium">
                    {!user ? "Tambah " : "Edit "} User
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
                        placeholder="Input nama user..."
                        value={data?.name ?? ""}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                    />
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        type="text"
                        id="email"
                        placeholder="Input email user..."
                        value={data?.email ?? ""}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />
                </div>
                {!user && (
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            type="text"
                            id="password"
                            placeholder="Input password user..."
                            value={data?.password ?? ""}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />
                    </div>
                )}
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="wa_number">Phone Number</Label>
                    <Input
                        type="text"
                        id="wa_number"
                        placeholder="Input phone number..."
                        value={data?.wa_number ?? ""}
                        onChange={(e) => setData("wa_number", e.target.value)}
                    />
                </div>

                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="photo">Photo</Label>
                    <Input
                        type="file"
                        id="photo"
                        accept="photo/*"
                        placeholder="Input photo user..."
                        // onChange={(e) => setData("photo", e.target.files?.[0] || null)}
                        onChange={(e) => {
                            setData("photo", e.target.files[0]);
                            setPhoto(URL.createObjectURL(e.target.files[0]));
                        }}
                    />
                </div>
                <div className={`${!photo && "hidden"} w-full`}>
                    <img
                        src={photo}
                        alt="Image preview"
                        className="w-32 shadow"
                    />
                    {!user && (
                        <button
                            type="button"
                            onClick={handleImageDelete}
                            className="text-primary font-bold text-sm mt-2"
                        >
                            Hapus foto?
                        </button>
                    )}
                </div>
                {user && user.roles.some((role) => role.name === "agent") && (
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="is_agent_active">Active</Label>
                        <InputActiveCheckbox
                            isActive={isAgentActive}
                            setIsActive={setIsAgentActive}
                        />
                    </div>
                )}
                <Button
                    type="submit"
                    disabled={loading || !data.name}
                    // onClick={() => setIsOpenModal(false)}
                    className="bg-primary text-white hover:bg-primary/95 hover:text-white"
                >
                    {loading && (
                        <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {!user ? "Tambah " : "Edit "}
                </Button>
            </form>
        </Modal>
    );
}

export default ModalUserForm;
