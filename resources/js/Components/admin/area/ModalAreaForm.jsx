import InputActiveCheckbox from "@/Components/InputActiveCheckbox";
import Modal from "@/Components/Modal";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { LoaderIcon, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";

function ModalAreaForm({ area, locations, isOpenModal, setIsOpenModal }) {
    const [isActive, setIsActive] = useState(area?.is_active ?? false);
    const [locationId, setLocationId] = useState(area?.location_id?.toString());
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(false);

    const { data, setData, post, put, reset } = useForm({
        name: area?.name ?? "",
        location_id: locationId,
        description: area?.description ?? "",
        is_active: isActive,
        // _method: area ? "PUT" : "POST",
    });

    useEffect(() => {
        setData("is_active", isActive);
    }, [isActive]);

    useEffect(() => {
        setData("location_id", locationId);
    }, [locationId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true);

        if (!area) {
            post(route("area.store"), {
                onError: (errors) => {
                    setLoading(false);
                    toast({
                        title: "Area gagal dibuat!",
                        description: errors?.name || errors?.icon,
                        variant: "destructive",
                    });
                    console.log("err: ", errors);
                    setErrors(errors)
                },
                onSuccess: () => {
                    toast({
                        title: `Area berhasil ${area ? "diupdate" : "dibuat"}!`,
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
        } else {
            put(route("area.update", area.id), {
                onError: (errors) => {
                    setLoading(false);
                    toast({
                        title: "Area update Failed!",
                        description: errors?.name || errors?.icon,
                        variant: "destructive",
                    });
                    console.log("err: ", errors);
                    setErrors(errors)
                },
                onSuccess: () => {
                    toast({
                        title: `Area berhasil ${area ? "diupdate" : "dibuat"}!`,
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
    }

    return (
        <Modal show={isOpenModal}>
            <div className="p-3.5 flex justify-between items-center">
                <h1 className="text-xl font-medium">
                    {!area ? "Tambah " : "Edit "} Area
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
                        placeholder="Masukkan nama Area..."
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
                        placeholder="Masukkan icon Area..."
                    />
                    <ErrorMessage name="description" />
                </div>

                <div className="grid w-full items-center gap-1.5">
                    <Label
                        className="text-[#5B5B5B] font-normal"
                        htmlFor="location"
                    >
                        Lokasi
                    </Label>
                    <Select
                        value={locationId}
                        onValueChange={(value) => setLocationId(value)}
                    >
                        <SelectTrigger className="bg-[#EDEDED] dark:bg-[#3f3f3f] dark:text-[#8B8B8B] border border-[#C6C6C6] w-full ">
                            <SelectValue placeholder="Pilih Lokasi" />
                        </SelectTrigger>
                        <SelectContent className="z-50 bg-white dark:bg-[#3f3f3f] dark:text-[#8B8B8B]">
                            {locations.length > 0
                                ? locations.map((location, index) => (
                                      <SelectItem
                                          key={`location-${location.id}-${index}`}
                                          value={`${location.id}`}
                                          //   selected={locationId == `${location.id}`}
                                      >
                                          {location.name}
                                      </SelectItem>
                                  ))
                                : null}
                        </SelectContent>
                    </Select>
                    <ErrorMessage name="location_id" />
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
                    disabled={loading || !data.name}
                    type="submit"
                    className="bg-primary text-white hover:bg-primary/95 hover:text-white"
                >
                    {loading && (
                        <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {!area ? "Tambah " : "Edit "}
                </Button>
            </form>
        </Modal>
    );
}

export default ModalAreaForm;
