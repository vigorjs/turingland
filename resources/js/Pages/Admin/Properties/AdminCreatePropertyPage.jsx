import React, { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AdminLayout from '@/Layouts/AdminLayout';
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { router } from '@inertiajs/react';

function AdminCreatePropertyPage({ developers, areas }) {
  const [uploadedImages, setUploadedImages] = useState([]);
  
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      title: "",
      description: "",
      developer_id: "",
      area_id: "",
      bathroom_count: 0,
      bedroom_count: 0,
      carport_count: 0,
      land_area: 0,
      building_area: 0,
      price: 0,
      type: "sale",
      status: "active",
      address: "",
      certificate_type: "",
      year_built: new Date().getFullYear(),
      is_featured: false,
      property_images: [],
    },
  });

  const handleImageUpload = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(file => ({
        file,
        preview: URL.createObjectURL(file),
        caption: ""
      }));
      
      setUploadedImages(prev => [...prev, ...newFiles]);
      setValue('property_images', [...uploadedImages, ...newFiles].map(img => img.file));
    }
  };

  const removeImage = (index) => {
    URL.revokeObjectURL(uploadedImages[index].preview);
    
    const newUploadedImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(newUploadedImages);
    setValue('property_images', newUploadedImages.map(img => img.file));
  };

  const updateImageCaption = (index, caption) => {
    const newUploadedImages = [...uploadedImages];
    newUploadedImages[index].caption = caption;
    setUploadedImages(newUploadedImages);
  };

  const onSubmit = (values) => {
    const formData = new FormData();
    
    // Add form values to FormData
    Object.entries(values).forEach(([key, value]) => {
      if (key !== 'property_images') {
        formData.append(key, value);
      }
    });

    // Add images and captions
    uploadedImages.forEach((image, index) => {
      formData.append(`property_images[${index}][file]`, image.file);
      formData.append(`property_images[${index}][caption]`, image.caption);
    });

    // Handle form submission
    router.post(route('dashboard.property.store'), formData);
    console.log(values);
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Create New Property</h1>
        
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
                      <Input id="title" placeholder="Enter property title" {...field} />
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        id="description"
                        placeholder="Enter property description"
                        className="h-32"
                        {...field}
                      />
                    )}
                  />
                </div>
              </div>

              {/* Developer Select */}
              <div className="space-y-2">
                <Label htmlFor="developer_id">Developer</Label>
                <Controller
                  name="developer_id"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select developer" />
                      </SelectTrigger>
                      <SelectContent>
                        {developers.map((developer) => (
                          <SelectItem key={developer.id} value={developer.id.toString()}>
                            {developer.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              {/* Area Select */}
              <div className="space-y-2">
                <Label htmlFor="area_id">Area</Label>
                <Controller
                  name="area_id"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select area" />
                      </SelectTrigger>
                      <SelectContent>
                        {areas.map((area) => (
                          <SelectItem key={area.id} value={area.id.toString()}>
                            {area.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              {/* Property Details */}
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bedroom_count">Bedrooms</Label>
                  <Controller
                    name="bedroom_count"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="bedroom_count"
                        type="number"
                        {...field}
                        onChange={e => field.onChange(parseInt(e.target.value))}
                      />
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bathroom_count">Bathrooms</Label>
                  <Controller
                    name="bathroom_count"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="bathroom_count"
                        type="number"
                        {...field}
                        onChange={e => field.onChange(parseInt(e.target.value))}
                      />
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="carport_count">Carports</Label>
                  <Controller
                    name="carport_count"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="carport_count"
                        type="number"
                        {...field}
                        onChange={e => field.onChange(parseInt(e.target.value))}
                      />
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="land_area">Land Area (m²)</Label>
                  <Controller
                    name="land_area"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="land_area"
                        type="number"
                        step="0.01"
                        {...field}
                        onChange={e => field.onChange(parseFloat(e.target.value))}
                      />
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="building_area">Building Area (m²)</Label>
                  <Controller
                    name="building_area"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="building_area"
                        type="number"
                        step="0.01"
                        {...field}
                        onChange={e => field.onChange(parseFloat(e.target.value))}
                      />
                    )}
                  />
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
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sale">For Sale</SelectItem>
                          <SelectItem value="rent">For Rent</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="sold">Sold</SelectItem>
                          <SelectItem value="rented">Rented</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
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
                      onChange={e => field.onChange(parseFloat(e.target.value))}
                    />
                  )}
                />
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
                      className="h-24"
                      {...field}
                    />
                  )}
                />
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
                <Label htmlFor="is_featured">Featured Property</Label>
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
                  className="mb-4"
                />

                <div className="grid grid-cols-2 gap-4">
                  {uploadedImages.map((image, index) => (
                    <div key={index} className="relative border rounded-lg p-2">
                      <div className="relative group">
                        <img
                          src={image.preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-40 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
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
                        onChange={(e) => updateImageCaption(index, e.target.value)}
                        className="mt-2"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button type="submit" className="w-48">Create Property</Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

export default AdminCreatePropertyPage;