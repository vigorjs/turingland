import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
    Bath, 
    Bed, 
    Car, 
    Home, 
    MapPin, 
    Calendar,
    FileText,
    Square
} from "lucide-react";
import AdminLayout from '@/Layouts/AdminLayout';

const AdminDetailPropertyPage = ({ property }) => {
    const [selectedImage, setSelectedImage] = useState(
        property?.images?.find(img => img.is_primary)?.image_path || 
        property?.images?.[0]?.image_path || ''
    );

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(price);
    };

    const getStatusColor = (status) => {
        const colors = {
            active: 'bg-green-500',
            sold: 'bg-red-500',
            rented: 'bg-blue-500',
            inactive: 'bg-gray-500'
        };
        return colors[status] || 'bg-gray-500';
    };

    if (!property) {
        return <div>Loading...</div>;
    }

    return (
        <AdminLayout>
            <div className="container mx-auto p-2">
                <Card className="w-full">
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-2xl font-bold">
                                {property.title}
                            </CardTitle>
                            <Badge className={`${getStatusColor(property.status)} text-white`}>
                                {property.status}
                            </Badge>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* Image Gallery */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="w-full h-96 relative">
                                {selectedImage && (
                                    <img
                                        src={selectedImage}
                                        alt="Main Property Image"
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                )}
                            </div>
                            <div className="p-1 grid grid-cols-4 gap-2 h-96 overflow-y-scroll auto-rows-min">
                                {property.images?.map((image) => (
                                    <img
                                        key={image.id}
                                        src={image.image_path}
                                        alt="Property"
                                        className={`w-full h-24 object-cover rounded cursor-pointer ${
                                            selectedImage === image.image_path ? 'ring-2 ring-primary' : ''
                                        }`}
                                        onClick={() => setSelectedImage(image.image_path)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Property Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold">Details</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center gap-2">
                                        <Bed className="w-5 h-5" />
                                        <span>{property.bedroom_count} Bedrooms</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Bath className="w-5 h-5" />
                                        <span>{property.bathroom_count} Bathrooms</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Car className="w-5 h-5" />
                                        <span>{property.carport_count} Carports</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Square className="w-5 h-5" />
                                        <span>LT: {property.land_area} m²</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Home className="w-5 h-5" />
                                        <span>LB: {property.building_area} m²</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FileText className="w-5 h-5" />
                                        <span>{property.certificate_type || 'N/A'}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-5 h-5" />
                                        <span>Built: {property.year_built || 'N/A'}</span>
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-2">
                                    <h3 className="text-xl font-semibold">Price</h3>
                                    <p className="text-2xl font-bold text-primary">
                                        {formatPrice(property.price)}
                                        {property.type === 'rent' && '/month'}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <h3 className="text-xl font-semibold">Description</h3>
                                    <p className="text-gray-600">{property.description}</p>
                                </div>

                                <Separator />

                                <div className="space-y-2">
                                    <h3 className="text-xl font-semibold">Location</h3>
                                    <div className="flex items-start gap-2">
                                        <MapPin className="w-5 h-5 mt-1" />
                                        <p className="text-gray-600">{property.address}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
};

export default AdminDetailPropertyPage;