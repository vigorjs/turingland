import { X } from "lucide-react";
import Modal from "../Modal";
import { Button } from "../ui/button";

const FilterModal = ({
    categories,
    areas,
    handleResetFilter,
    handleSearchSubmit,
    orderAdsFilter,
    typeAdsFilter,
    propertyAdsFilter,
    areaId,
    handleClickPropertyAreaFilter,
    handleClickOrderAdsFilter,
    handleClickTypeAdsFilter,
    handleClickPropertyAdsFilter,
    isVisibleModalFilter,
    setIsVisibleModalFilter,
}) => {
    const orderAdsTexts = [
        "Terbaru",
        "Harga Termurah",
        // "Harga Terjangkau",
        // "Rekomendasi",
        "Luas Bangunan Terluas",
        "Luas Tanah Terluas",
    ];

    const typeAdsTexts = ["Dijual", "Disewa"];

    // const propertyAdsText = [
    //     "Rumah",
    //     "Apartemen",
    //     "Tanah",
    //     "Ruko",
    //     "Villa",
    //     "Kost",
    // ];

    return (
        <Modal
            show={isVisibleModalFilter}
            onClose={() => setIsVisibleModalFilter(false)}
        >
            <div className="">
                <div className="p-3.5 flex justify-between items-center">
                    <h1 className="text-xl font-medium">Filter</h1>
                    <button onClick={() => setIsVisibleModalFilter(false)}>
                        <X />
                    </button>
                </div>

                <hr />

                <form onSubmit={(e) => {
                    handleSearchSubmit(e);
                    setIsVisibleModalFilter(false);
                }} className="p-3.5 flex flex-col gap-4">
                    <div>
                        <h2 className="text-lg mb-2">Urutkan</h2>
                        <div className="flex flex-wrap gap-1.5 mb-2">
                            {orderAdsTexts.map((item, index) => (
                                <Button
                                    type="button"
                                    key={`filter-order-ads-${index}`}
                                    className={
                                        orderAdsFilter == item &&
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
                                    type="button"
                                    key={`filter-type-ads-${index}`}
                                    className={
                                        typeAdsFilter == item &&
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
                        <h2 className="text-lg mb-2">Kategori Properti</h2>
                        <div className="flex flex-wrap gap-1.5 mb-2">
                            {categories?.map((item, index) => (
                                <Button
                                    type="button"
                                    key={`filter-properties-ads-${index}`}
                                    className={
                                        propertyAdsFilter == item.id &&
                                        "bg-primary text-white hover:bg-primary/90 hover:text-white"
                                    }
                                    onClick={() =>
                                        handleClickPropertyAdsFilter(item.id)
                                    }
                                    size="sm"
                                    variant="outline"
                                >
                                    {item.name}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg mb-2">Area Properti</h2>
                        <div className="flex flex-wrap gap-1.5 mb-2">
                            {areas?.map((item, index) => (
                                <Button
                                    type="button"
                                    key={`filter-properties-ads-area-${index}`}
                                    className={
                                        areaId == item.id &&
                                        "bg-primary text-white hover:bg-primary/90 hover:text-white"
                                    }
                                    onClick={() =>
                                        handleClickPropertyAreaFilter(item.id)
                                    }
                                    size="sm"
                                    variant="outline"
                                >
                                    {item.name}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <button type="button" onClick={handleResetFilter} className="text-primary/90 font-extralight text-sm">reset filter</button>
                    </div>

                    <Button
                        type="submit"
                        // onClick={() => setIsVisibleModalFilter(false)}
                        className="bg-primary text-white hover:bg-primary/95 hover:text-white"
                    >
                        Tampilkan Hasil
                    </Button>
                </form>
            </div>
        </Modal>
    );
};

export default FilterModal;
