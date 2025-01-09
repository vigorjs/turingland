import { CardProperty } from "@/Components/CardProperty";
import { FilterSearch } from "@/Components/FilterSearch";
import { TestimonialCard } from "@/Components/TestimonialCard";
import { Button } from "@/Components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/Components/ui/carousel";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import Autoplay from "embla-carousel-autoplay";
import { QuoteIcon } from "lucide-react";
import React from "react";

export default function Home() {
    const img =
        "https://ecatalog.sinarmasland.com/_next/image?url=https%3A%2F%2Fecatalog.sinarmasland.com%2Fassets%2Fsite-setting-files%2F1%2Fhomepage-background-banner-desktop-677b6f397dc74.jpg&w=3840&q=75";

    const img2 =
        "https://s3-alpha-sig.figma.com/img/b74a/c4c3/77ce5aaed022bc3392bf4c60e9f023f3?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TBddhCyuhgK3h9pPOzC6liBCEHm6TsYR7d~rH3sp4CvaC3yOelv4WVMmuxaxESdJNZc35GZAhsml9j6SGRGXsQOzrv92arIuKxGqA3G9aCE~3t24rREsBu3QdUvtkynVgfEqfZR30kwwC9guwj~syJ88f0fRfDbVJeZiyOTOqER4xiIV3wrAfMlcjQm9o-IcPSUM86bMEta04tgrQPaa2YxuMw~3EUz4FJJ~~gR2nASUu1cearMaxPV4coLrdbo2ysRfCKUs2HIDPgjEZQAf1xVt7tewP0fmtjjR7GxJ5FjWY5uzm3a-l3hcQaOIa~qekSB6fqROwfuzmK0r66Mt7Q__";

    const img3 =
        "https://s3-alpha-sig.figma.com/img/db80/4347/cb68839c79ca58a9b46777e9c9c07cc0?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nXWoIhqAUTi-at1criMJPC8l-xudGFynTTWb9Y-EQ3SJVxbjtvcOe0gMCLVH-t9DqTyNiL-Yzev8ZoIv8rUhxICHbXB8rkLeNKxj7EQ62uTTgu9cxyvbWTE~QRaByjGG1cJ6vcaSQ6MXKBL0oqfIGiBf0VqSA6UKFh5uufI7P4FLQmWmiBmecXFnhZ2A5p2FkQ5Vc~d9jsWCoMVMpC711S6lfNymccRCkodcG15Mx22s-p2ydCVU06b5TyCZg7x1tG2lcqPcdyaX07KFBNHfmAp9N23KdaCvnBgsmBAeg76eEDgO9y7B4xcEcerX559xGjDraUB~HpMhDXtZGXxetg__";

    const arr = [{}, {}, {}, {}, {}, {}, {}, {}];

    const testimonials = [
        {
            id: 1,
            img: "https://via.placeholder.com/150",
            name: "Saydova",
            role: "Investor Kripto",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, ex.",
        },
        {
            id: 2,
            img: "https://via.placeholder.com/150",
            name: "Tommy",
            role: "Penyewa ",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, nobis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, nobisLorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, nobisLorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, nobis",
        },
        {
            id: 3,
            img: "https://via.placeholder.com/150",
            name: "Jake Doe",
            role: "Pembeli",
            text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim, voluptate.",
        },
        {
            id: 4,
            img: "https://via.placeholder.com/150",
            name: "Attahlah",
            role: "Investor",
            text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim, voluptate.",
        },
    ];

    return (
        <GuestLayout>
            <Head title="Tempat Jual Beli Rumah Apartement" />
            <div>
                {/* HERO SECTION */}
                {/* <Carousel
                    plugins={[
                        Autoplay({
                            delay: 6000,
                        }),
                    ]}
                    opts={{
                        loop: true,
                    }}
                >
                    <CarouselContent>
                        {arr.length > 0
                            ? arr.map((_, index) => (
                                  <CarouselItem key={index}> */}
                <div
                    className="relative w-full h-[50vh] bg-cover bg-center bg-fixed border border-gray-400"
                    //   style={{
                    //       backgroundImage: `url(${img})`,
                    //   }}
                >
                    <img src={img} className="w-full h-full object-cover" />
                    <div className="w-full min-h-full dark:bg-black/10 absolute top-0" />
                </div>
                {/* </CarouselItem>
                              ))
                            : null}
                    </CarouselContent> */}
                {/* FILTRE */}
                <FilterSearch />

                {/* </Carousel> */}
                <div className="px-3 sm:px-4 md:px-6 lg:px-[150px]">
                    {/* ADS SECTION */}
                    <Carousel
                        className="mt-16 mb-4"
                        plugins={[
                            Autoplay({
                                delay: 2500,
                            }),
                        ]}
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                    >
                        <CarouselContent>
                            {arr.length > 0 ? (
                                arr.map((_, index) => (
                                    <CarouselItem
                                        key={`ads-section-${index}`}
                                        className="flex-shrink-0 basis-1/1 md:basis-1/2 max-h-[40vh]"
                                    >
                                        <img
                                            src={img}
                                            alt={`Carousel item ${index}`}
                                            className="object-contain md:rounded-2xl rounded-none w-auto h-full"
                                        />
                                    </CarouselItem>
                                ))
                            ) : (
                                <p className="text-center text-gray-500">
                                    No items available for the carousel.
                                </p>
                            )}
                        </CarouselContent>
                    </Carousel>

                    {/* RECCOMENDATION PROPERTIES */}
                    <div className="mt-16 mb-4">
                        <div className="mb-4 flex justify-between items-center">
                            <div>
                                <h2 className="text-xl sm:text-2xl font-bold">
                                    Rekomendasi Properti Terpopuler
                                </h2>
                                <p className="text-base">
                                    Cek rekomendasi properti terpopuler kami
                                </p>
                            </div>
                            <Button
                                variant={"outline"}
                                className="hidden md:mr-0 md:block lg:mr-40"
                            >
                                Lihat Selengkapnya
                            </Button>
                        </div>

                        {/* CARD */}
                        <Carousel
                            opts={{
                                align: "start",
                            }}
                        >
                            <CarouselContent className="flex space-x-1 sm:space-x-5 pb-8">
                                {arr.length > 0
                                    ? arr.map((_, index) => (
                                          <CarouselItem
                                              className="flex-shrink-0 basis-auto"
                                              key={index}
                                          >
                                              <CardProperty
                                                  img={img3}
                                                  key={`properties-card-${index}`}
                                              >
                                                  <h2 className="text-base font-bold">
                                                      Fauzan Properties
                                                  </h2>
                                                  <div className="flex justify-start items-center gap-2">
                                                      <p className="text-xs text-neutral-600">
                                                          I
                                                      </p>
                                                      <p className="text-xs text-neutral-600">
                                                          Jl. Kebon Jeruk,
                                                          Jakarta
                                                      </p>
                                                  </div>

                                                  <div className="flex justify-start items-center gap-3.5 mt-1">
                                                      <p className="text-xs">
                                                          LT: 40&sup2;
                                                      </p>
                                                      <p className="text-xs">
                                                          LB: 40&sup2;
                                                      </p>
                                                  </div>
                                                  <hr className="my-1" />
                                                  <p className="text-xs font-semibold">
                                                      Rp 200 juta
                                                  </p>
                                              </CardProperty>
                                          </CarouselItem>
                                      ))
                                    : null}
                            </CarouselContent>
                            <div className="absolute -top-11 right-20  justify-center items-center hidden lg:flex">
                                <CarouselPrevious className="" />
                                <CarouselNext className="" />
                            </div>
                        </Carousel>
                    </div>

                    {/* TESTIMONIAL SECTION */}
                    <div className="py-12">
                        <h2 className="text-xl sm:text-2xl font-bold mb-8 text-left text-foreground">
                            Kata Mereka Tentang TuringLand
                        </h2>
                        <Carousel
                            opts={{
                                align: "start",
                            }}
                            className="w-full relative pb-6"
                        >
                            <CarouselContent className="flex gap-3">
                                {testimonials.map((testimonial, index) => (
                                    <CarouselItem
                                        key={index}
                                        className="md:basis-1/2 lg:basis-1/3"
                                    >
                                        <div className="p-1">
                                            <TestimonialCard
                                                img={testimonial.img}
                                                name={testimonial.name}
                                                role={testimonial.role}
                                                text={testimonial.text}
                                                className="bg-card rounded-lg shadow-lg"
                                            />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <div className="absolute bottom-0 w-full bg-background flex justify-center items-center">
                                <CarouselPrevious className="absolute left-0 bottom-0" />
                                <CarouselNext className="absolute right-0 bottom-0" />
                            </div>
                        </Carousel>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
