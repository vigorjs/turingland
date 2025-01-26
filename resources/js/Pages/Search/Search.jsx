import CardPropertySearch from "@/Components/search/CardPropertySearch";
import SearchBar from "@/Components/search/SearchBar";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function SearchPage({
    properties,
    categories,
    areas,
    filters,
    auth,
    banner,
}) {
    const [propertiesData, setPropertiesData] = useState(properties);
    const [currentPage, setCurrentPage] = useState(properties.current_page);
    const [hasMore, setHasMore] = useState(
        properties.current_page < properties.last_page
    );
    const [loading, setLoading] = useState(false);

    const observer = useRef();

    const lastPropertyRef = (node) => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                loadMore();
            }
        });

        if (node) observer.current.observe(node);
    };

    const loadMore = async () => {
        if (!hasMore) return;
        setLoading(true);

        try {
            const response = await axios.get(
                `/search-api?page=${currentPage + 1}`
            );
            const newData = response.data.properties;
            setPropertiesData((prev) => ({
                ...prev,
                current_page: newData.current_page,
                last_page: newData.last_page,
                data: [...prev.data, ...newData.data],
            }));
            setCurrentPage(newData.current_page);
            setHasMore(newData.current_page < newData.last_page);
        } catch (error) {
            console.error("Error loading more properties:", error);
        } finally {
            setLoading(false);
        }
    };

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
                        {propertiesData?.data?.length > 0
                            ? propertiesData.data.map((property, index) => {
                                  if (
                                      index ===
                                      propertiesData.data.length - 1
                                  ) {
                                      return (
                                          <div
                                              key={index}
                                              ref={lastPropertyRef}
                                          >
                                              <CardPropertySearch
                                                  property={property}
                                              />
                                          </div>
                                      );
                                  }
                                  return (
                                      <CardPropertySearch
                                          key={index}
                                          property={property}
                                      />
                                  );
                              })
                            : null}
                    </div>
                    <div className="sticky top-3.5 w-full sm:w-1/3 flex flex-col gap-40">
                        {banner?.length > 0
                            ? banner.map((bnr, index) => (
                                  <a href={bnr.link} key={index}>
                                      <img
                                          src={
                                              bnr.image_path
                                                  ? `/storage/${bnr.image_path}`
                                                  : `/assets/bannerfallback.png`
                                          }
                                          alt={bnr.image_alt || "Banner"}
                                          className="object-contain rounded-2xl w-full"
                                      />
                                  </a>
                              ))
                            : null}
                    </div>
                </div>
                {loading && (
                    <div className="flex justify-center items-center py-4">
                        <div
                            className="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
                            role="status"
                            aria-label="loading"
                        >
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                )}
            </div>
        </GuestLayout>
    );
}
