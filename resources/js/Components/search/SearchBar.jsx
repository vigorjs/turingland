import { LucideSettings2, Search, X } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import FilterModal from "./FilterModal";
import { useForm } from "@inertiajs/react";

const SearchBar = ({ categories, areas, filters, setPropertiesData }) => {
    const searchButton = [
        "Filter",
        "Terbaru",
        "Harga Termurah",
        "Harga Termahal",
    ];

    const [isVisibleModalFilter, setIsVisibleModalFilter] = useState(false);

    const [areaId, setAreaId] = useState(filters["area_id"] ?? "");

    const [orderAdsFilter, setOrderAdsFilter] = useState(
        filters["orderAdsFilter"] ?? ""
    );
    const [typeAdsFilter, setTypeAdsFilter] = useState(
        (filters["type"] === "sale"
            ? "Dijual"
            : filters["type"] === "rent"
            ? "Disewa"
            : "") ?? ""
    );
    const [propertyAdsFilter, setPropertyAdsFilter] = useState(filters["category_id"]);

    const handleClickOrderAdsFilter = (value) => {
        if(value === orderAdsFilter) setOrderAdsFilter("");
        else setOrderAdsFilter(value);
    };

    const handleClickTypeAdsFilter = (value) => {
        if(value === typeAdsFilter) setTypeAdsFilter("");
        else setTypeAdsFilter(value);
    };

    const handleClickPropertyAreaFilter = (value) => {
        if(value === areaId) setAreaId("");
        else setAreaId(value);
    }

    const handleClickPropertyAdsFilter = (value) => {
        if(value === propertyAdsFilter) setPropertyAdsFilter("");
        else setPropertyAdsFilter(value);
        // const isExist = propertyAdsFilter.includes(value);

        // if (isExist)
        //     setPropertyAdsFilter(
        //         propertyAdsFilter.filter((item) => item !== value)
        //     );
        // else setPropertyAdsFilter([...propertyAdsFilter, value]);
    };

    const orderAdsTexts = ["Terbaru", "Harga Termurah", "Harga Terjangkau"];

    const { data, setData, get, processing, errors } = useForm({
        title: "",
    });

    const handleSearchSubmit = async (e) => {
        e?.preventDefault();

        const reqData = {
            ...data,
            orderAdsFilter,
            area_id: areaId,
            type:
                typeAdsFilter === "Dijual"
                    ? "sale"
                    : typeAdsFilter === "Disewa"
                    ? "rent"
                    : "",
            category_id: propertyAdsFilter,
        };

        const res = await fetch(route("search.property.api", reqData));
        const resData = await res.json();

        console.log("resData: ", resData);

        setPropertiesData(resData?.properties);
    };

    const handleResetFilter = () => {
        setOrderAdsFilter("");
        setTypeAdsFilter("");
        setPropertyAdsFilter("");
        setAreaId("")
    };

    // useEffect(() => {
    //     handleSearchSubmit();
    // }, [orderAdsFilter]);

    return (
        <>
            <div className="flex flex-col gap-4 mb-6 px-0">
                <form
                    onSubmit={handleSearchSubmit}
                    className="flex items-center gap-3 w-full"
                >
                    <input
                        onChange={(e) => setData("title", e.target.value)}
                        type="text"
                        placeholder="Rumah Fauzan Property"
                        className="flex-1 px-4 py-2 border border-[#C6C6C6] bg-[#EDEDED] rounded-lg w-2/3"
                    />
                    <Button
                        type="submit"
                        size="lg"
                        className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg"
                    >
                        <Search />{" "}
                        <span className="hidden sm:block">Search</span>
                    </Button>
                </form>
                <div className="flex flex-wrap gap-1.5 mb-2">
                    <Button
                        type="button"
                        onClick={() => setIsVisibleModalFilter(true)}
                        size="sm"
                        variant="outline"
                    >
                        <LucideSettings2 /> Filter
                    </Button>
                    {orderAdsTexts.map((item, index) => (
                        <Button
                            type="button"
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
                categories={categories}
                areas={areas}
                handleResetFilter={handleResetFilter}
                handleSearchSubmit={handleSearchSubmit}
                orderAdsFilter={orderAdsFilter}
                typeAdsFilter={typeAdsFilter}
                propertyAdsFilter={propertyAdsFilter}
                areaId={areaId}
                handleClickPropertyAreaFilter={handleClickPropertyAreaFilter}
                handleClickOrderAdsFilter={handleClickOrderAdsFilter}
                handleClickTypeAdsFilter={handleClickTypeAdsFilter}
                handleClickPropertyAdsFilter={handleClickPropertyAdsFilter}
                isVisibleModalFilter={isVisibleModalFilter}
                setIsVisibleModalFilter={setIsVisibleModalFilter}
            />

            <h2 className="text-2xl font-bold mb-2">
                Menampilkan hasil pencarian {data?.title ?? ""}
            </h2>
        </>
    );
};

export default SearchBar;
