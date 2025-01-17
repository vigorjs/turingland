import { CardProperty } from "@/Components/CardProperty";
import CardPropertySearch from "@/Components/search/CardPropertySearch";
import SearchBar from "@/Components/search/SearchBar";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import React from "react";

export default function SearchPage({ properties }) {
    const img3 =
        "https://s3-alpha-sig.figma.com/img/db80/4347/cb68839c79ca58a9b46777e9c9c07cc0?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nXWoIhqAUTi-at1criMJPC8l-xudGFynTTWb9Y-EQ3SJVxbjtvcOe0gMCLVH-t9DqTyNiL-Yzev8ZoIv8rUhxICHbXB8rkLeNKxj7EQ62uTTgu9cxyvbWTE~QRaByjGG1cJ6vcaSQ6MXKBL0oqfIGiBf0VqSA6UKFh5uufI7P4FLQmWmiBmecXFnhZ2A5p2FkQ5Vc~d9jsWCoMVMpC711S6lfNymccRCkodcG15Mx22s-p2ydCVU06b5TyCZg7x1tG2lcqPcdyaX07KFBNHfmAp9N23KdaCvnBgsmBAeg76eEDgO9y7B4xcEcerX559xGjDraUB~HpMhDXtZGXxetg__";

    const arr = [{}, {}];
    // const arr = [{}];
    console.log(properties.data.length);

    return (
        <GuestLayout>
            <Head title="Cari rumah" />
            {/* <div className="px-3 md:px-6 lg:px-[150px] mb-12 mt-28"> */}
            <div className="px-3 md:px-6 lg:px-[150px] my-12">
                <SearchBar />
                <h2 className="text-2xl font-bold mb-2">
                    Menampilkan hasil pencarian “Pakubuwono Residence”
                </h2>
                <p className="text-gray-500 mb-4">
                    Menampilkan {properties.data.length} hasil
                </p>
                {/* CARD */}
                <div className="flex flex-wrap sm:flex-nowrap justify-center sm:justify-between items-start gap-8 sm:gap-16">
                    <div className="w-full sm:w-2/3 flex flex-col gap-5">
                        {properties.data.length > 0
                            ? properties.data.map((property, index) => (
                                  <CardPropertySearch key={index} property={property} />
                              ))
                            : null}
                    </div>
                    <div className="sticky top-3.5 w-full sm:w-1/3 flex flex-col gap-3">
                        <img
                            src={img3}
                            alt={`image`}
                            className="object-contain rounded-2xl w-full"
                        />
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
