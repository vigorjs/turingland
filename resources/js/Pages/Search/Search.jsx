import CardPropertySearch from "@/Components/search/CardPropertySearch";
import SearchBar from "@/Components/search/SearchBar";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";

export default function SearchPage({
    properties,
    categories,
    areas,
    filters,
    auth,
    banner,
}) {
    const [propertiesData, setPropertiesData] = useState(properties);

    return (
        <GuestLayout auth={auth}>
            <Head title="Cari rumah" />
            <div className="px-3 md:px-6 lg:px-[150px] my-12">
                <div>
                    <SearchBar
                        categories={categories}
                        areas={areas}
                        filters={filters}
                        setPropertiesData={setPropertiesData}
                    />
                </div>
                <p className="text-gray-500 mb-4">
                    Menampilkan {propertiesData?.data?.length} hasil
                </p>
                {/* CARD */}
                <div className="flex flex-wrap sm:flex-nowrap justify-center sm:justify-between items-start gap-8 sm:gap-16">
                    <div className="w-full sm:w-2/3 flex flex-col gap-5">
                        {propertiesData.data.length > 0
                            ? propertiesData.data.map((property, index) => (
                                  <CardPropertySearch
                                      key={index}
                                      property={property}
                                  />
                              ))
                            : null}
                    </div>
                    <div className="sticky top-3.5 w-full sm:w-1/3 flex flex-col gap-3">
                        {banner.length > 0
                            ? banner.map((bnr, index) => (
                                  <Link href={bnr.link} key={index}>
                                      <img
                                          src={`storage/${bnr.image_path}`}
                                          alt={`image`}
                                          className="object-contain rounded-2xl w-full"
                                      />
                                  </Link>
                              ))
                            : null}
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
