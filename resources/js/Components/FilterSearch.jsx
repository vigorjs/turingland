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

export const FilterSearch = () => {
    const [isSimpleSearch, setIsSimpleSearch] = useState(true);

    return (
      <div
        className={`absolute w-full overflow-x-auto z-10 px-3 md:px-6 lg:px-10 ${
          isSimpleSearch ? "-mt-36" : "-mt-[216px]"
        }`}
      >
        <div className="bg-white/85 dark:bg-muted w-full h-full sm:rounded-2xl">
          <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {isSimpleSearch ? (
                <SimpleFilterSearch setIsSimpleSearch={setIsSimpleSearch} />
              ) : (
                <AdvanceFilterSearch setIsSimpleSearch={setIsSimpleSearch} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const SimpleFilterSearch = ({ setIsSimpleSearch }) => {
    return (
      <>
        <div className="grid w-full items-center gap-1.5">
          <Label className="text-[#5B5B5B] font-normal" htmlFor="email">
            Lokasi
          </Label>
          <Select>
            <SelectTrigger className="bg-[#EDEDED] dark:bg-[#3f3f3f] dark:text-[#8B8B8B] border border-[#C6C6C6] w-full ">
              <SelectValue placeholder="Select Location" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-white dark:bg-[#3f3f3f] dark:text-[#8B8B8B]">
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label className="text-[#5B5B5B] font-normal" htmlFor="email">
            Tipe Property
          </Label>
          <Select>
            <SelectTrigger className="bg-[#EDEDED] dark:bg-[#3f3f3f] dark:text-[#8B8B8B] border border-[#C6C6C6] w-full">
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-white dark:bg-[#3f3f3f] dark:text-[#8B8B8B]">
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label className="text-[#5B5B5B] font-normal" htmlFor="email">
            Rentang Harga
          </Label>
          <Select>
            <SelectTrigger className="bg-[#EDEDED] dark:bg-[#3f3f3f] dark:text-[#8B8B8B] border border-[#C6C6C6] w-full">
              <SelectValue placeholder="Select Range" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-white dark:bg-[#3f3f3f] dark:text-[#8B8B8B]">
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid w-full items-end">
          <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg w-full">
            Search
          </Button>
        </div>
        <button onClick={() => setIsSimpleSearch(false)}>
          <p className="text-left text-primary">Pencarian Lanjutan</p>
        </button>
      </>
    );
  };
const AdvanceFilterSearch = ({ setIsSimpleSearch }) => {
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

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
        <>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label className="text-[#5B5B5B] font-normal" htmlFor="email">
                    Lokasi
                </Label>
                <Select>
                    <SelectTrigger className="bg-[#EDEDED] dark:bg-[#3f3f3f] dark:text-[#8B8B8B] border border-[#C6C6C6]">
                        <SelectValue placeholder="Select Location" />
                    </SelectTrigger>
                    <SelectContent className="z-50 dark:bg-[#3f3f3f] dark:text-[#8B8B8B]">
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label className="text-[#5B5B5B] font-normal" htmlFor="email">
                    Tipe Property
                </Label>
                <Select>
                    <SelectTrigger className="bg-[#EDEDED] dark:bg-[#3f3f3f] dark:text-[#8B8B8B] border border-[#C6C6C6]">
                        <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent className="z-50 dark:bg-[#3f3f3f] dark:text-[#8B8B8B]">
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label
                    className="text-[#5B5B5B] font-normal"
                    htmlFor="harga-min"
                >
                    Harga Min
                </Label>
                <Input
                    className="bg-[#EDEDED] dark:bg-[#3f3f3f] dark:text-[#8B8B8B] border border-[#C6C6C6]"
                    type="text"
                    id="harga-min"
                    onChange={handleMinPriceChange}
                    placeholder="Rp 0"
                />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label
                    className="text-[#5B5B5B] font-normal"
                    htmlFor="harga-max"
                >
                    Harga Max
                </Label>
                <Input
                    className="bg-[#EDEDED] dark:bg-[#3f3f3f] dark:text-[#8B8B8B] border border-[#C6C6C6]"
                    type="text"
                    id="harga-max"
                    onChange={handleMaxPriceChange}
                    placeholder="Rp 0"
                />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label className="text-[#5B5B5B] font-normal" htmlFor="email">
                    Area
                </Label>
                <Select>
                    <SelectTrigger className="bg-[#EDEDED] dark:bg-[#3f3f3f] dark:text-[#8B8B8B] border border-[#C6C6C6]">
                        <SelectValue placeholder="Select Area" />
                    </SelectTrigger>
                    <SelectContent className="z-50 dark:bg-[#3f3f3f] dark:text-[#8B8B8B]">
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label className="text-[#5B5B5B] font-normal" htmlFor="email">
                    Developer
                </Label>
                <Select>
                    <SelectTrigger className="bg-[#EDEDED] dark:bg-[#3f3f3f] dark:text-[#8B8B8B] border border-[#C6C6C6]">
                        <SelectValue placeholder="Select Developer" />
                    </SelectTrigger>
                    <SelectContent className="z-50 dark:bg-[#3f3f3f] dark:text-[#8B8B8B]">
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label className="text-[#5B5B5B] font-normal" htmlFor="email">
                    Tipe Iklan
                </Label>
                <Select>
                    <SelectTrigger className="bg-[#EDEDED] dark:bg-[#3f3f3f] dark:text-[#8B8B8B] border border-[#C6C6C6]">
                        <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent
                        style={{ zIndex: 9999 }}
                        className="z-50 dark:bg-[#3f3f3f] dark:text-[#8B8B8B]"
                    >
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid w-full max-w-sm items-end">
                <Label
                    className="text-[#5B5B5B] font-normal"
                    htmlFor="email"
                ></Label>
                <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg">
                    Search
                </Button>
            </div>

            <button onClick={() => setIsSimpleSearch(true)}>
                <p className="text-left text-primary">Pencarian Mudah</p>
            </button>
        </>
    );
};
