import React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../ui/carousel";
import { BathIcon, BedDoubleIcon, CarFrontIcon, PhoneCall } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "../ui/button";
import { formatRupiah, formatUpdatedAt } from "@/lib/utils";
import { Link } from "@inertiajs/react";

export default function CardPropertySearch({ property }) {
    const img2 =
        "https://ik.imagekit.io/pashouses/pb1/tr:n-hl_v3/property/front-house/-JDoNqEMWigKKq7jtLReZVFmjQ7pfFdb0Op7MHND.jpeg";
    const img1 =
        "https://s3-alpha-sig.figma.com/img/db80/4347/cb68839c79ca58a9b46777e9c9c07cc0?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nXWoIhqAUTi-at1criMJPC8l-xudGFynTTWb9Y-EQ3SJVxbjtvcOe0gMCLVH-t9DqTyNiL-Yzev8ZoIv8rUhxICHbXB8rkLeNKxj7EQ62uTTgu9cxyvbWTE~QRaByjGG1cJ6vcaSQ6MXKBL0oqfIGiBf0VqSA6UKFh5uufI7P4FLQmWmiBmecXFnhZ2A5p2FkQ5Vc~d9jsWCoMVMpC711S6lfNymccRCkodcG15Mx22s-p2ydCVU06b5TyCZg7x1tG2lcqPcdyaX07KFBNHfmAp9N23KdaCvnBgsmBAeg76eEDgO9y7B4xcEcerX559xGjDraUB~HpMhDXtZGXxetg__";

    const imagePrimary = property.images;

    return (
        <div className="shadow-md rounded-2xl">
            <Carousel>
                <CarouselContent>
                    {imagePrimary.length > 0 ? (
                        imagePrimary.map((img, index) => (
                            <CarouselItem
                                key={`image-section-${index}`}
                                // className="basis-auto"
                            >
                                <div className="w-auto flex justify-center items-center">
                                    <img
                                        src={img?.image_path}
                                        className="w-full object-contain rounded-t-xl"
                                        alt=""
                                    />
                                </div>
                            </CarouselItem>
                        ))
                    ) : (
                        <CarouselItem>
                            <div className="w-auto flex justify-center items-center">
                                <img
                                    src={"/assets/default-img-property.png"}
                                    className="w-full object-cover rounded-t-xl"
                                    alt=""
                                />
                            </div>
                        </CarouselItem>
                    )}
                </CarouselContent>
                {imagePrimary.length > 0 && (
                    <div className="absolute top-1/2 left-14 right-14 flex items-center justify-center">
                        <div className="mx-auto w-full ">
                            <CarouselPrevious className="" />
                            <CarouselNext className="" />
                        </div>
                    </div>
                )}
            </Carousel>

            {/* CATEGORIES PROPERTY */}
            <div className="bg-primary/75 w-full py-2.5 px-3.5">
                <button className="bg-neutral-200/90 text-neutral-800 p-1.5 rounded-full text-[9px]">
                    Apartemen
                </button>
            </div>

            {/* DETAIL PROPERTY */}

            <div className="p-3.5">
                <Link href={route("property.show", { id: property.id })}>
                    <h1 className="text-primary text-lg font-extrabold mb-1">
                        {formatRupiah(property.price)}
                        <span className="ml-2 bg-primary/15 text-primary px-2 py-1 font-semibold rounded-full text-xs">
                            Disewa
                        </span>
                    </h1>

                    <div className="flex flex-wrap justify-start items-center gap-2 my-3">
                        <button className="flex items-center gap-x-1 text-xs px-2.5 py-1 shadow rounded-full">
                            <BedDoubleIcon className="w-3.5 h-3.5" /> :{" "}
                            {property.bedroom_count}
                        </button>
                        <button className="flex items-center gap-x-1 text-xs px-2.5 py-1 shadow rounded-full">
                            <BathIcon className="w-3.5 h-3.5" /> :{" "}
                            {property.bathroom_count}
                        </button>
                        <button className="flex items-center gap-x-1 text-xs px-2.5 py-1 shadow rounded-full">
                            <CarFrontIcon className="w-3.5 h-3.5" /> :{" "}
                            {property.carport_count}
                        </button>
                    </div>

                    <div>
                        <h1 className="text-neutral-700 text-sm font-semibold">
                            {property.title}
                        </h1>
                        <p className="text-neutral-600 text-sm">
                            {property.area.description}
                        </p>
                        <p className="text-neutral-600 text-xs overflow-hidden whitespace-nowrap text-ellipsis mt-1">
                            {property.description}
                        </p>
                    </div>
                </Link>

                <div className="my-5 border-b border-neutral-300" />

                {/* AGEN AND DEVELOPER INFORMATION */}
                <div>
                    <div className="flex flex-wrap justify-between items-center">
                        <div className="flex justify-between items-center gap-8 w-full lg:w-auto">
                            <div className="flex justify-start items-center gap-2">
                                <img
                                    src="https://avatar.iran.liara.run/public"
                                    alt=""
                                    className="w-10 h-10 object-cover rounded-full"
                                />
                                <div>
                                    <p className="text-neutral-600 text-xs overflow-hidden whitespace-nowrap text-ellipsis">
                                        {formatUpdatedAt(property.updated_at)}
                                    </p>
                                    <p className="text-sm text-neutral-600 overflow-hidden whitespace-nowrap text-ellipsis">
                                        {property.developer.name} Properties
                                    </p>
                                </div>
                            </div>
                            <img
                                src={property.developer.logo}
                                className="w-16"
                                alt=""
                            />
                        </div>

                        <div className="flex justify-center items-center gap-2 w-full lg:w-auto">
                            <Button variant="outline" className="w-full mt-3">
                                <PhoneCall className="text-primary" />
                                <p className="text-primary text-sm">
                                    08581700...
                                </p>
                            </Button>
                            <Button className="w-full mt-3 bg-green-500 hover:bg-green-600">
                                <FaWhatsapp className="text-white" />
                                <p className="text-white text-sm">Whatsapp</p>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
