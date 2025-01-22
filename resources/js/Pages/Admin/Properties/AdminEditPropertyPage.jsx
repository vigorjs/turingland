import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/Components/ui/button";
import { Textarea } from "@/Components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import AdminLayout from "@/Layouts/AdminLayout";
import { Checkbox } from "@/Components/ui/checkbox";
import { X } from "lucide-react";
import { Label } from "@/Components/ui/label";
import { router } from "@inertiajs/react";
import { Input } from "@/Components/ui/input";
import { MultiSelect } from "react-multi-select-component";

function AdminEditPropertyPage({
    property,
    developers,
    areas,
    categories,
    auth,
}) {
    const [uploadedImages, setUploadedImages] = useState([]);
    const [errors, setErrors] = useState({});

    // Initialize form with existing property data
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors: formErrors },
    } = useForm({
        defaultValues: {
            title: property.title,
            description: property.description,
            developer_id: property.developer_id.toString(),
            area_id: property.area_id.toString(),
            category_ids: property.categories.map((category) => category.id),
            bathroom_count: property.bathroom_count,
            bedroom_count: property.bedroom_count,
            carport_count: property.carport_count,
            land_area: property.land_area,
            building_area: property.building_area,
            price: property.price,
            type: property.type,
            status: property.status,
            address: property.address,
            certificate_type: property.certificate_type,
            year_built: property.year_built || null,
            is_featured: property.is_featured,
            property_images: [],
        },
    });

    // Initialize existing images
    useEffect(() => {
        if (property.images) {
            const existingImages = property.images.map((image) => ({
                id: image.id,
                file: null,
                preview: image.image_path,
                caption: image.caption || "",
                isExisting: true,
            }));
            setUploadedImages(existingImages);
        }
    }, [property]);

    const handleImageUpload = (e) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files).map((file) => ({
                file,
                preview: URL.createObjectURL(file),
                caption: "",
                isExisting: false,
            }));

            const updatedImages = [...uploadedImages, ...newFiles];
            setUploadedImages(updatedImages);
            setValue("property_images", updatedImages);
        }
    };

    const removeImage = (index) => {
        const imageToRemove = uploadedImages[index];

        if (!imageToRemove.isExisting) {
            URL.revokeObjectURL(imageToRemove.preview);
        }

        const newUploadedImages = uploadedImages.filter((_, i) => i !== index);
        setUploadedImages(newUploadedImages);
        setValue("property_images", newUploadedImages);
    };

    const updateImageCaption = (index, caption) => {
        const newUploadedImages = [...uploadedImages];
        newUploadedImages[index].caption = caption;
        setUploadedImages(newUploadedImages);
    };

    const onSubmit = (values) => {
        const formData = new FormData();

        // Add non-file form values
        Object.entries(values).forEach(([key, value]) => {
            if (key === "category_ids") {
                // Kirim sebagai multiple entries untuk array
                value.forEach((categoryId, index) => {
                    formData.append(`category_ids[]`, categoryId);
                });
            } else if (key !== "property_images") {
                formData.append(key, value);
            }
        });

        // Add new images
        const newImages = uploadedImages.filter((img) => !img.isExisting);
        newImages.forEach((image, index) => {
            formData.append(`new_images[${index}][file]`, image.file);
            formData.append(`new_images[${index}][caption]`, image.caption);
        });

        // Add existing images data
        const existingImages = uploadedImages.filter((img) => img.isExisting);
        existingImages.forEach((image, index) => {
            formData.append(`existing_images[${index}][id]`, image.id);
            formData.append(
                `existing_images[${index}][caption]`,
                image.caption
            );
        });

        // Add method for Laravel to recognize PUT request
        formData.append("_method", "PUT");

        router.post(route("dashboard.property.update", property.id), formData, {
            forceFormData: true,
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                setErrors({});
                console.log("Update success");
            },
            onError: (errors) => {
                setErrors(errors);
                console.log("Update errors:", errors);
            },
        });
    };

    const ErrorMessage = ({ name }) => {
        return errors[name] ? (
            <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
        ) : null;
    };

    // Format options untuk react-multi-select-component
    const categoryOptions = categories.map((category) => ({
        label: category.name,
        value: category.id,
    }));

    return (
        <AdminLayout auth={auth}>
            <div className="max-w-7xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-6">Edit Property</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-6">
                            {/* Basic Information */}
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Controller
                                        name="title"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                id="title"
                                                placeholder="Enter property title"
                                                {...field}
                                                className={
                                                    errors.title
                                                        ? "border-red-500"
                                                        : ""
                                                }
                                            />
                                        )}
                                    />
                                    <ErrorMessage name="title" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">
                                        Description
                                    </Label>
                                    <Controller
                                        name="description"
                                        control={control}
                                        render={({ field }) => (
                                            <Textarea
                                                id="description"
                                                placeholder="Enter property description"
                                                className={`h-32 ${
                                                    errors.description
                                                        ? "border-red-500"
                                                        : ""
                                                }`}
                                                {...field}
                                            />
                                        )}
                                    />
                                    <ErrorMessage name="description" />
                                </div>
                            </div>

                            {/* Developer Select */}
                            <div className="space-y-2">
                                <Label htmlFor="developer_id">Developer</Label>
                                <Controller
                                    name="developer_id"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <SelectTrigger
                                                className={
                                                    errors.developer_id
                                                        ? "border-red-500"
                                                        : ""
                                                }
                                            >
                                                <SelectValue placeholder="Select developer" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {developers.map((developer) => (
                                                    <SelectItem
                                                        key={developer.id}
                                                        value={developer.id.toString()}
                                                    >
                                                        {developer.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                <ErrorMessage name="developer_id" />
                            </div>

                            {/* Categories Select */}
                            <div className="space-y-2">
                                <Label htmlFor="category_ids">Categories</Label>
                                <Controller
                                    name="category_ids"
                                    control={control}
                                    defaultValue={[]}
                                    render={({ field }) => (
                                        <MultiSelect
                                            options={categoryOptions}
                                            value={categoryOptions.filter(
                                                (option) =>
                                                    field.value.includes(
                                                        option.value
                                                    )
                                            )}
                                            onChange={(selected) => {
                                                // Update form dengan array of IDs
                                                field.onChange(
                                                    selected.map(
                                                        (item) => item.value
                                                    )
                                                );
                                            }}
                                            labelledBy="Select categories"
                                            // Optional props untuk kustomisasi
                                            hasSelectAll={true}
                                            disableSearch={false}
                                            className="w-full"
                                            overrideStrings={{
                                                selectSomeItems:
                                                    "Select categories...",
                                                allItemsAreSelected:
                                                    "All categories selected",
                                                selectAll: "Select All",
                                                search: "Search",
                                            }}
                                        />
                                    )}
                                />
                                {errors.category_ids && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.category_ids}
                                    </p>
                                )}
                            </div>

                            {/* Area Select */}
                            <div className="space-y-2">
                                <Label htmlFor="area_id">Area</Label>
                                <Controller
                                    name="area_id"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <SelectTrigger
                                                className={
                                                    errors.area_id
                                                        ? "border-red-500"
                                                        : ""
                                                }
                                            >
                                                <SelectValue placeholder="Select area" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {areas.map((area) => (
                                                    <SelectItem
                                                        key={area.id}
                                                        value={area.id.toString()}
                                                    >
                                                        {area.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                <ErrorMessage name="area_id" />
                            </div>

                            {/* Property Details */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="bedroom_count">
                                        Bedrooms
                                    </Label>
                                    <Controller
                                        name="bedroom_count"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                id="bedroom_count"
                                                type="number"
                                                {...field}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        parseInt(e.target.value)
                                                    )
                                                }
                                                className={
                                                    errors.bedroom_count
                                                        ? "border-red-500"
                                                        : ""
                                                }
                                            />
                                        )}
                                    />
                                    <ErrorMessage name="bedroom_count" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="bathroom_count">
                                        Bathrooms
                                    </Label>
                                    <Controller
                                        name="bathroom_count"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                id="bathroom_count"
                                                type="number"
                                                {...field}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        parseInt(e.target.value)
                                                    )
                                                }
                                                className={
                                                    errors.bathroom_count
                                                        ? "border-red-500"
                                                        : ""
                                                }
                                            />
                                        )}
                                    />
                                    <ErrorMessage name="bathroom_count" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="carport_count">
                                        Carports
                                    </Label>
                                    <Controller
                                        name="carport_count"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                id="carport_count"
                                                type="number"
                                                {...field}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        parseInt(e.target.value)
                                                    )
                                                }
                                                className={
                                                    errors.carport_count
                                                        ? "border-red-500"
                                                        : ""
                                                }
                                            />
                                        )}
                                    />
                                    <ErrorMessage name="carport_count" />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="land_area">
                                        Land Area (m²)
                                    </Label>
                                    <Controller
                                        name="land_area"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                id="land_area"
                                                type="number"
                                                step="0.01"
                                                {...field}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        parseFloat(
                                                            e.target.value
                                                        )
                                                    )
                                                }
                                                className={
                                                    errors.land_area
                                                        ? "border-red-500"
                                                        : ""
                                                }
                                            />
                                        )}
                                    />
                                    <ErrorMessage name="land_area" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="building_area">
                                        Building Area (m²)
                                    </Label>
                                    <Controller
                                        name="building_area"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                id="building_area"
                                                type="number"
                                                step="0.01"
                                                {...field}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        parseFloat(
                                                            e.target.value
                                                        )
                                                    )
                                                }
                                                className={
                                                    errors.building_area
                                                        ? "border-red-500"
                                                        : ""
                                                }
                                            />
                                        )}
                                    />
                                    <ErrorMessage name="building_area" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="year_built">
                                        Year Build
                                    </Label>
                                    <Controller
                                        name="year_built"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                id="year_built"
                                                type="number"
                                                step="1"
                                                {...field}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        parseFloat(
                                                            e.target.value
                                                        )
                                                    )
                                                }
                                                className={
                                                    errors.building_area
                                                        ? "border-red-500"
                                                        : ""
                                                }
                                            />
                                        )}
                                    />
                                    <ErrorMessage name="building_area" />
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            {/* Property Status and Type */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="type">Property Type</Label>
                                    <Controller
                                        name="type"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <SelectTrigger
                                                    className={
                                                        errors.type
                                                            ? "border-red-500"
                                                            : ""
                                                    }
                                                >
                                                    <SelectValue placeholder="Select type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="sale">
                                                        For Sale
                                                    </SelectItem>
                                                    <SelectItem value="rent">
                                                        For Rent
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                    <ErrorMessage name="type" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <Controller
                                        name="status"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="active">
                                                        Active
                                                    </SelectItem>
                                                    <SelectItem value="sold">
                                                        Sold
                                                    </SelectItem>
                                                    <SelectItem value="rented">
                                                        Rented
                                                    </SelectItem>
                                                    <SelectItem value="inactive">
                                                        Inactive
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="price">Price</Label>
                                <Controller
                                    name="price"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            id="price"
                                            type="number"
                                            step="0.01"
                                            {...field}
                                            onChange={(e) =>
                                                field.onChange(
                                                    parseFloat(e.target.value)
                                                )
                                            }
                                            className={
                                                errors.price
                                                    ? "border-red-500"
                                                    : ""
                                            }
                                        />
                                    )}
                                />
                                <ErrorMessage name="price" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Controller
                                    name="address"
                                    control={control}
                                    render={({ field }) => (
                                        <Textarea
                                            id="address"
                                            placeholder="Enter property address"
                                            className={`h-24 ${
                                                errors.address
                                                    ? "border-red-500"
                                                    : ""
                                            }`}
                                            {...field}
                                        />
                                    )}
                                />
                                <ErrorMessage name="address" />
                            </div>

                            <div className="flex items-center space-x-2">
                                <Controller
                                    name="is_featured"
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox
                                            id="is_featured"
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    )}
                                />
                                <Label htmlFor="is_featured">
                                    Featured Property
                                </Label>
                            </div>

                            {/* Image Upload Section */}
                            <div className="space-y-4">
                                <Label htmlFor="images">Upload Images</Label>
                                <Input
                                    id="images"
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className={`mb-4 ${
                                        errors.property_images
                                            ? "border-red-500"
                                            : ""
                                    }`}
                                />
                                <ErrorMessage name="property_images" />

                                <div className="grid grid-cols-2 gap-4">
                                    {uploadedImages.map((image, index) => (
                                        <div
                                            key={index}
                                            className="relative border rounded-lg p-2"
                                        >
                                            <div className="relative group">
                                                <img
                                                    src={image.preview}
                                                    alt={`Preview ${index + 1}`}
                                                    className="w-full h-40 object-cover rounded-lg"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeImage(index)
                                                    }
                                                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full
                                   opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <Input
                                                type="text"
                                                placeholder="Add caption"
                                                value={image.caption}
                                                onChange={(e) =>
                                                    updateImageCaption(
                                                        index,
                                                        e.target.value
                                                    )
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <Button type="submit" className="w-48">
                            Update Property
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}

export default AdminEditPropertyPage;
