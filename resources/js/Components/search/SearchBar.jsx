import { LucideSettings2, X } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import Modal from "../Modal";

const SearchBar = () => {
    const searchButton = [
        "Filter",
        "Terbaru",
        "Harga Termurah",
        "Harga Termahal",
    ];

    const [isVisibleModalFilter, setIsVisibleModalFilter] = useState(false);

    const [orderAdsFilter, setOrderAdsFilter] = useState("");
    const [typeAdsFilter, setTypeAdsFilter] = useState("");
    const [propertyAdsFilter, setPropertyAdsFilter] = useState([]);

    const handleClickOrderAdsFilter = (value) => {
        setOrderAdsFilter(value);
    };

    const handleClickTypeAdsFilter = (value) => {
        setTypeAdsFilter(value);
    };

    const handleClickPropertyAdsFilter = (value) => {
        const isExist = propertyAdsFilter.includes(value);

        if(isExist) setPropertyAdsFilter(propertyAdsFilter.filter(item => item !== value))
        else setPropertyAdsFilter([...propertyAdsFilter, value])
    }

    const orderAdsTexts = ["Terbaru", "Harga Termurah", "Harga Terjangkau"];

    return (
        <>
            <div className="flex flex-col gap-4 mb-6 px-0">
                <div className="flex items-center gap-3">
                    <input
                        type="text"
                        placeholder="Rumah Fauzan Property"
                        className="flex-1 px-4 py-2 border border-[#C6C6C6] bg-[#EDEDED] rounded-lg"
                    />
                    <Button
                        size="lg"
                        className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg"
                    >
                        Search
                    </Button>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-2">
                    <Button
                        onClick={() => setIsVisibleModalFilter(true)}
                        size="sm"
                        variant="outline"
                    >
                        <LucideSettings2 /> Filter
                    </Button>
                    {orderAdsTexts.map((item, index) => (
                        <Button
                            key={`filter-order-ads-${index}`}
                            className={
                                orderAdsFilter === item &&
                                "bg-primary text-white hover:bg-primary/90 hover:text-white"
                            }
                            onClick={() => handleClickOrderAdsFilter(item)}
                            size="sm"
                            variant="outline"
                        >
                            {item}
                        </Button>
                    ))}
                </div>
            </div>

            <FilterModal
                orderAdsFilter={orderAdsFilter}
                typeAdsFilter={typeAdsFilter}
                propertyAdsFilter={propertyAdsFilter}
                handleClickOrderAdsFilter={handleClickOrderAdsFilter}
                handleClickTypeAdsFilter={handleClickTypeAdsFilter}
                handleClickPropertyAdsFilter={handleClickPropertyAdsFilter}
                isVisibleModalFilter={isVisibleModalFilter}
                setIsVisibleModalFilter={setIsVisibleModalFilter}
            />
        </>
    );
};

const FilterModal = ({
    orderAdsFilter,
    typeAdsFilter,
    propertyAdsFilter,
    handleClickOrderAdsFilter,
    handleClickTypeAdsFilter,
    handleClickPropertyAdsFilter,
    isVisibleModalFilter,
    setIsVisibleModalFilter,
}) => {
    const orderAdsTexts = [
        "Terbaru",
        "Harga Termurah",
        "Harga Terjangkau",
        "Rekomendasi",
        "Luas Bangunan Terluas",
        "Luas Tanah Terluas",
    ];

    const typeAdsTexts = ["Dijual", "Disewa"];

    const propertyAdsText = [
        "Rumah",
        "Apartemen",
        "Tanah",
        "Ruko",
        "Villa",
        "Kost",
    ];

    return (
        <Modal
            show={isVisibleModalFilter}
            onClose={() => setIsVisibleModalFilter(false)}
        >
            <div className="">
                <div className="p-3.5 flex justify-between items-center">
                    <h1 className="text-xl font-medium">Filter</h1>
                    <button onClick={() => setIsVisibleModalFilter(false)}><X /></button>
                </div>

                <hr />

                <div className="p-3.5 flex flex-col gap-4">
                    <div>
                        <h2 className="text-lg mb-2">Urutkan</h2>
                        <div className="flex flex-wrap gap-1.5 mb-2">
                            {orderAdsTexts.map((item, index) => (
                                <Button
                                    key={`filter-order-ads-${index}`}
                                    className={
                                        orderAdsFilter === item &&
                                        "bg-primary text-white hover:bg-primary/90 hover:text-white"
                                    }
                                    onClick={() =>
                                        handleClickOrderAdsFilter(item)
                                    }
                                    size="sm"
                                    variant="outline"
                                >
                                    {item}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg mb-2">Tipe Iklan</h2>
                        <div className="flex flex-wrap gap-1.5 mb-2">
                            {typeAdsTexts.map((item, index) => (
                                <Button
                                    key={`filter-type-ads-${index}`}
                                    className={
                                        typeAdsFilter === item &&
                                        "bg-primary text-white hover:bg-primary/90 hover:text-white"
                                    }
                                    onClick={() =>
                                        handleClickTypeAdsFilter(item)
                                    }
                                    size="sm"
                                    variant="outline"
                                >
                                    {item}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg mb-2">Tipe Properti</h2>
                        <div className="flex flex-wrap gap-1.5 mb-2">
                            {propertyAdsText.map((item, index) => (
                                <Button
                                    key={`filter-properties-ads-${index}`}
                                    className={
                                        propertyAdsFilter.includes(item) &&
                                        "bg-primary text-white hover:bg-primary/90 hover:text-white"
                                    }
                                    onClick={() =>
                                        handleClickPropertyAdsFilter(item)
                                    }
                                    size="sm"
                                    variant="outline"
                                >
                                    {item}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <Button
                        onClick={() => setIsVisibleModalFilter(false)}
                        className="bg-primary text-white hover:bg-primary/95 hover:text-white"
                    >
                        Tampilkan Hasil
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default SearchBar;
