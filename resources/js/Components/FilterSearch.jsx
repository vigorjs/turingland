import React, { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { SearchIcon } from "lucide-react";
import { router, usePage } from "@inertiajs/react";

export const FilterSearch = () => {
    const [isSimpleSearch, setIsSimpleSearch] = useState(true);
    const { areas, developers, locations, categories } = usePage().props;

    return (
        <div
            className={`absolute w-full overflow-x-auto z-10 px-3 md:px-36 ${
                isSimpleSearch ? "-mt-36" : "-mt-[216px]"
            }`}
        >
            <div className="bg-white/85 dark:bg-muted w-full h-full sm:rounded-2xl transition-all duration-300 ease-in-out">
                <div className="p-4">
                    <div>
                        {isSimpleSearch ? (
                            <SimpleFilterSearch
                                setIsSimpleSearch={setIsSimpleSearch}
                                areas={areas}
                                categories={categories}
                                locations={locations}
                            />
                        ) : (
                            <AdvanceFilterSearch
                                setIsSimpleSearch={setIsSimpleSearch}
                                areas={areas}
                                developers={developers}
                                categories={categories}
                                locations={locations}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const SimpleFilterSearch = ({ setIsSimpleSearch, areas, categories, locations }) => {
    const [filters, setFilters] = useState({
        area_id: "",
        category_id: "", // Updated from type to category_id
        price_min: "",
        price_max: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        router.get("/search", filters);
    };

    const handlePriceRangeChange = (value) => {
        const ranges = {
            "10-100": { min: 10000000, max: 100000000 },
            "100-500": { min: 100000000, max: 500000000 },
            "500-1000": { min: 500000000, max: 1000000000 },
        };

        if (ranges[value]) {
            setFilters((prev) => ({
                ...prev,
                price_min: ranges[value].min,
                price_max: ranges[value].max,
            }));
        }
    };

    return (
        <form
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4"
            onSubmit={handleSubmit}
        >
            <div className="grid w-full items-center gap-1.5">
                <Label className="dark:text-white text-[#5B5B5B] font-normal">
                    Lokasi
                </Label>
                <Select
                    onValueChange={(value) =>
                        setFilters((prev) => ({ ...prev, location_id: value }))
                    }
                >
                    <SelectTrigger className="bg-[#EDEDED] dark:bg-[#3f3f3f] dark:text-[#8B8B8B] border border-[#C6C6C6] w-full">
                        <SelectValue placeholder="Pilih Lokasi" />
                    </SelectTrigger>
                    <SelectContent className="z-50 bg-white dark:bg-[#3f3f3f] dark:text-[#8B8B8B]">
                        {locations.map((location) => (
                            <SelectItem
                                key={location.id}
                                value={location.id.toString()}
                            >
                                {location.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="grid w-full items-center gap-1.5">
                <Label className="dark:text-white text-[#5B5B5B] font-normal">
                    Kategori
                </Label>
                <Select
                    onValueChange={(value) =>
                        setFilters((prev) => ({ ...prev, category_id: value }))
                    }
                >
                    <SelectTrigger className="bg-[#EDEDED] dark:bg-[#3f3f3f] dark:text-[#8B8B8B] border border-[#C6C6C6] w-full">
                        <SelectValue placeholder="Pilih Kategori" />
                    </SelectTrigger>
                    <SelectContent className="z-50 bg-white dark:bg-[#3f3f3f] dark:text-[#8B8B8B]">
                        {categories.map((category) => (
                            <SelectItem
                                key={category.id}
                                value={category.id.toString()}
                            >
                                {category.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Rest of the form remains the same */}
            <div className="grid w-full items-center gap-1.5">
                <Label className="dark:text-white text-[#5B5B5B] font-normal">
                    Rentang Harga
                </Label>
                <Select onValueChange={handlePriceRangeChange}>
                    <SelectTrigger className="bg-[#EDEDED] dark:bg-[#3f3f3f] dark:text-[#8B8B8B] border border-[#C6C6C6] w-full">
                        <SelectValue placeholder="Pilih Rentang Harga" />
                    </SelectTrigger>
                    <SelectContent className="z-50 bg-white dark:bg-[#3f3f3f] dark:text-[#8B8B8B]">
                        <SelectItem value="10-100">
                            Rp 10Jt - Rp 100Jt
                        </SelectItem>
                        <SelectItem value="100-500">
                            Rp 100Jt - Rp 500Jt
                        </SelectItem>
                        <SelectItem value="500-1000">
                            Rp 500Jt - Rp 1M
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="grid w-full items-end">
                <Button
                    type="submit"
                    className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg w-full"
                >
                    <SearchIcon />
                    Cari
                </Button>
            </div>
            <button type="button" onClick={() => setIsSimpleSearch(false)}>
                <p className="text-left text-primary">Pencarian Lanjutan</p>
            </button>
        </form>
    );
};

const AdvanceFilterSearch = ({
    setIsSimpleSearch,
    areas,
    categories,
    developers,
    locations
}) => {
    const [filters, setFilters] = useState({
        area_id: "",
        category_id: "",
        price_min: "",
        price_max: "",
        developer_id: "",
        type: "",
        status: "",
        land_area_min: "",
        land_area_max: "",
        building_area_min: "",
        building_area_max: "",
        year_built: "",
    });

    const propertyStatus = [
        { id: "for_sale", name: "Dijual" },
        { id: "for_rent", name: "Disewa" },
        { id: "sold", name: "Terjual" },
    ];

    const filteredAreas = filters.location_id 
    ? areas.filter(area => area.location_id === parseInt(filters.location_id))
    : areas;

    const handleLocationChange = (locationId) => {
        setFilters(prev => ({
            ...prev,
            location_id: locationId,
            area_id: "" // Reset area ketika lokasi berubah
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.get("/search", filters);
    };

    const formatPrice = (value) => {
        // Remove non-digit characters
        const numbers = value.replace(/\D/g, "");

        // Format with thousand separator
        const formatted = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(numbers);

        // Remove 'IDR' and trim spaces, just keep 'Rp'
        return formatted.replace("IDR", "Rp");
    };

    const handleMinPriceChange = (e) => {
        const rawValue = e.target.value;
        setMinPrice(rawValue);
        e.target.value = formatPrice(rawValue);
    };

    const handleMaxPriceChange = (e) => {
        const rawValue = e.target.value;
        setMaxPrice(rawValue);
        e.target.value = formatPrice(rawValue);
    };

    return (
        <form
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4"
            onSubmit={handleSubmit}
        >
            <div className="grid w-full items-center gap-1.5">
                <Label className="dark:text-white text-[#5B5B5B] font-normal">
                    Lokasi
                </Label>
                <Select
                    value={filters.location_id}
                    onValueChange={handleLocationChange}
                >
                    <SelectTrigger className="bg-[#EDEDED] dark:bg-[#3f3f3f] dark:text-[#8B8B8B] border border-[#C6C6C6]">
                        <SelectValue placeholder="Pilih Lokasi" />
                    </SelectTrigger>
                    <SelectContent className="z-50 bg-white dark:bg-[#3f3f3f] dark:text-[#8B8B8B]">
                        {locations.map((location) => (
                            <SelectItem
                                key={location.id}
                                value={location.id.toString()}
                            >
                                {location.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="grid w-full items-center gap-1.5">
                <Label className="dark:text-white text-[#5B5B5B] font-normal">
                    Tipe Property
                </Label>
                <Select
                    onValueChange={(value) =>
                        setFilters((prev) => ({ ...prev, category_id: value }))
                    }
                >
                    <SelectTrigger className="bg-[#EDEDED] dark:bg-[#3f3f3f] dark:text-[#8B8B8B] border border-[#C6C6C6]">
                        <SelectValue placeholder="Tipe Property" />
                    </SelectTrigger>
                    <SelectContent className="z-50 bg-white dark:bg-[#3f3f3f] dark:text-[#8B8B8B]">
                        {categories.map((category) => (
                            <SelectItem
                                key={category.id}
                                value={category.id.toString()}
                            >
                                {category.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="grid w-full items-center gap-1.5">
                <Label className="text-[#5B5B5B] dark:text-white font-normal">
                    Harga Min
                </Label>
                <Input
                    className="bg-[#EDEDED] dark:bg-[#3f3f3f] dark:text-[#8B8B8B] border border-[#C6C6C6]"
                    type="text"
                    onChange={(e) =>
                        setFilters((prev) => ({
                            ...prev,
                            price_min: e.target.value,
                        }))
                    }
                    placeholder="Rp 0"
                />
            </div>

            <div className="grid w-full items-center gap-1.5">
                <Label className="text-[#5B5B5B] dark:text-white font-normal">
                    Harga Max
                </Label>
                <Input
                    className="bg-[#EDEDED] dark:bg-[#3f3f3f] dark:text-[#8B8B8B] border border-[#C6C6C6]"
                    type="text"
                    onChange={(e) =>
                        setFilters((prev) => ({
                            ...prev,
                            price_max: e.target.value,
                        }))
                    }
                    placeholder="Rp 0"
                />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label
                    className="dark:text-white text-[#5B5B5B] font-normal"
                    htmlFor="email"
                >
                    Area
                </Label>
                <Select 
                    onValueChange={(value) =>
                        setFilters((prev) => ({ ...prev, area_id: value }))
                    }
                >
                    <SelectTrigger className="bg-[#EDEDED] dark:bg-[#3f3f3f] dark:text-[#8B8B8B] border border-[#C6C6C6]">
                        <SelectValue placeholder="Pilih Area" />
                    </SelectTrigger>
                    <SelectContent className="z-50 dark:bg-[#3f3f3f] dark:text-[#8B8B8B]">
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
            </div>

            <div className="grid w-full items-center gap-1.5">
                <Label className="dark:text-white text-[#5B5B5B] font-normal">
                    Developer
                </Label>
                <Select
                    onValueChange={(value) =>
                        setFilters((prev) => ({ ...prev, developer_id: value }))
                    }
                >
                    <SelectTrigger className="bg-[#EDEDED] dark:bg-[#3f3f3f] dark:text-[#8B8B8B] border border-[#C6C6C6]">
                        <SelectValue placeholder="Pilih Developer" />
                    </SelectTrigger>
                    <SelectContent className="z-50 bg-white dark:bg-[#3f3f3f] dark:text-[#8B8B8B]">
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
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label
                    className="dark:text-white text-[#5B5B5B] font-normal"
                    htmlFor="email"
                >
                    Tipe Iklan
                </Label>
                <Select
                    onValueChange={(value) =>
                        setFilters((prev) => ({ ...prev, type: value }))
                    }
                >
                    <SelectTrigger className="bg-[#EDEDED] dark:bg-[#3f3f3f] dark:text-[#8B8B8B] border border-[#C6C6C6]">
                        <SelectValue placeholder="Pilih Tipe Iklan" />
                    </SelectTrigger>
                    <SelectContent
                        style={{ zIndex: 9999 }}
                        className="z-50 dark:bg-[#3f3f3f] dark:text-[#8B8B8B]"
                    >
                        <SelectItem value="sale">Dijual</SelectItem>
                        <SelectItem value="rent">Disewa</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid w-full max-w-sm items-end">
                <Label
                    className="text-[#5B5B5B] dark:text-white font-normal"
                    htmlFor="email"
                ></Label>
                <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg">
                    <SearchIcon />
                    Cari
                </Button>
            </div>

            <button onClick={() => setIsSimpleSearch(true)}>
                <p className="text-left text-primary">Pencarian Mudah</p>
            </button>
        </form>
    );
};
