import { CardProperty } from "@/Components/CardProperty";
import { CategoriesSection } from "@/Components/CategoriesSection";
import { FilterSearch } from "@/Components/FilterSearch";
import { TestimonialCard } from "@/Components/TestimonialCard";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/Components/ui/carousel";
import GuestLayout from "@/Layouts/GuestLayout";
import { formatRupiah } from "@/lib/utils";
import { Head, Link } from "@inertiajs/react";
import Autoplay from "embla-carousel-autoplay";
import {
    BathIcon,
    BedDoubleIcon,
    CarFrontIcon,
    MapPinIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Home({
    auth,
    categories,
    testimonials,
    banners,
    webPreferences,
    latestProperties,
    featuredProperties,
}) {
    const [api, setApi] = useState();
    const [current, setCurrent] = useState(0);

    const img =
        "https://ecatalog.sinarmasland.com/_next/image?url=https%3A%2F%2Fecatalog.sinarmasland.com%2Fassets%2Fsite-setting-files%2F1%2Fhomepage-background-banner-desktop-677b6f397dc74.jpg&w=3840&q=75";

    const heroUrl = webPreferences?.find(
        (pref) => pref.key === "hero_url"
    )?.value;

    useEffect(() => {
        if (!api) {
            return;
        }

        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    return (
        <GuestLayout auth={auth}>
            <Head title="Tempat Jual Beli Rumah Apartement" />
            <div>
                {/* HERO SECTION */}

                <div className="relative w-full h-[50vh] bg-cover bg-center bg-fixed border border-gray-400">
                    <img
                        src={heroUrl ? `/storage/${heroUrl}` : img}
                        className="w-full h-full object-cover"
                    />
                    <div className="w-full min-h-full dark:bg-black/10 absolute top-0" />
                </div>

                {/* FILTRE */}
                <FilterSearch />

                <CategoriesSection categories={categories} />

                {/* </Carousel> */}

                <div className="px-3 sm:px-4 md:px-6 lg:px-[150px]">
                    {/* ADS SECTION */}
                    <Carousel
                        setApi={setApi}
                        className="mb-4 relative"
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
                        <CarouselContent className="flex gap-4">
                            {banners
                                .filter((banner) => banner.is_active)
                                .sort((a, b) => a.order - b.order) // Urutkan berdasarkan banner.order dari kecil ke besar
                                .map((banner, index) => (
                                    <CarouselItem
                                        key={`ads-section-${index}`}
                                        className="flex-shrink-0 basis-full sm:basis-1/1 md:basis-1/2 lg:basis-1/3 max-h-[40vh]"
                                    >
                                        <a
                                            href={banner.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <img
                                                src={
                                                    banner.image_path
                                                        ? `/storage/${banner.image_path}`
                                                        : `/assets/bannerfallback.png`
                                                }
                                                alt={`Carousel item ${index}`}
                                                className="object-contain rounded-none md:rounded-2xl w-full h-full"
                                            />
                                        </a>
                                    </CarouselItem>
                                ))}
                        </CarouselContent>
                        <div className="absolute -bottom-5 w-full flex justify-between px-4 items-center">
                            <CarouselPrevious className="bg-white p-2 left-0 rounded-full shadow-md cursor-pointer" />
                            <CarouselNext className="bg-white p-2 right-0 rounded-full shadow-md cursor-pointer" />
                        </div>
                        <div className="absolute -bottom-6 w-full flex justify-center items-center space-x-2">
                            {banners
                                .filter((banner) => banner.is_active === true)
                                .map((_, index) => (
                                    <span
                                        key={`dot-${index}`}
                                        className={`w-3 h-3 rounded-full ${
                                            index === current
                                                ? "bg-primary"
                                                : "bg-gray-400"
                                        }`}
                                    />
                                ))}
                        </div>
                    </Carousel>

                    {/* NEW LAUNCH PROPERTIES */}
                    <div className="mt-16 mb-4 " id="terbaru">
                        <div className="mb-4 flex justify-between items-center">
                            <div>
                                <div className="flex items-center gap-2">
                                    <h2 className="text-xl sm:text-2xl font-bold">
                                        Rekomendasi Properti Terbaru
                                    </h2>
                                    <span className="hidden sm:block">
                                        <Badge
                                            className={
                                                "text-sm font-extralight rounded-xl"
                                            }
                                        >
                                            Baru !
                                        </Badge>
                                    </span>
                                </div>
                                <p className="text-base">
                                    Cek rekomendasi properti terbaru kami
                                </p>
                            </div>
                            <Link href={route("search.property")}>
                                <Button
                                    variant={"outline"}
                                    className="hidden md:mr-0 md:block lg:mr-40"
                                >
                                    Lihat Selengkapnya
                                </Button>
                            </Link>
                        </div>

                        {/* CARD */}
                        <Carousel
                            opts={{
                                align: "start",
                            }}
                        >
                            <CarouselContent>
                                {latestProperties.length > 0
                                    ? latestProperties.map(
                                          (property, index) => (
                                              <CarouselItem
                                                  className="flex-shrink-0 basis-auto w-[350px] h-[355px]"
                                                  key={index}
                                              >
                                                  <CardProperty
                                                      img={
                                                          property?.images
                                                              .length > 0
                                                              ? property
                                                                    .images[0]
                                                                    ?.image_path
                                                              : "/assets/default-img-property.png"
                                                      }
                                                      key={`properties-card-${index}`}
                                                      id={property.id}
                                                  >
                                                      <div className="flex flex-row justify-between items-center w-full">
                                                          <div>
                                                              <h2 className="font-bold text-foreground">
                                                                  {
                                                                      property.title
                                                                  }
                                                              </h2>
                                                              <div className="flex justify-start items-center gap-1">
                                                                  <p className="text-xs text-neutral-600">
                                                                      <MapPinIcon
                                                                          className="text-muted"
                                                                          fill="#FD9458"
                                                                          size={
                                                                              "16px"
                                                                          }
                                                                      />
                                                                  </p>
                                                                  <p className="text-xs text-muted-foreground">
                                                                      {
                                                                          property.address
                                                                      }
                                                                  </p>
                                                              </div>

                                                              <div className="flex justify-start items-center gap-3.5 mt-1">
                                                                  <p className="text-xs">
                                                                      LT:{" "}
                                                                      {
                                                                          property.land_area
                                                                      }
                                                                      &sup2;
                                                                  </p>
                                                                  <p className="text-xs">
                                                                      LB:{" "}
                                                                      {
                                                                          property.building_area
                                                                      }
                                                                      &sup2;
                                                                  </p>
                                                              </div>
                                                          </div>
                                                      </div>
                                                      <hr className="mt-2 mb-3 dark:border-white" />
                                                      <div className="flex justify-between">
                                                          <p className="text-xs dark:text-primary font-semibold">
                                                              {formatRupiah(
                                                                  property.price
                                                              )}
                                                          </p>
                                                          <div className="flex gap-5">
                                                              <div className="flex items-center gap-x-1 text-xs">
                                                                  <BedDoubleIcon className="w-4 h-4" />{" "}
                                                                  :{" "}
                                                                  {
                                                                      property.bedroom_count
                                                                  }
                                                              </div>
                                                              <div className="flex items-center gap-x-1 text-xs">
                                                                  <BathIcon className="w-4 h-4" />{" "}
                                                                  :{" "}
                                                                  {
                                                                      property.bathroom_count
                                                                  }
                                                              </div>
                                                              <div className="flex items-center gap-x-1 text-xs">
                                                                  <CarFrontIcon className="w-4 h-4" />{" "}
                                                                  :{" "}
                                                                  {
                                                                      property.carport_count
                                                                  }
                                                              </div>
                                                          </div>
                                                      </div>
                                                  </CardProperty>
                                              </CarouselItem>
                                          )
                                      )
                                    : null}
                            </CarouselContent>
                            <div className="absolute -top-11 right-20  justify-center items-center hidden lg:flex">
                                <CarouselPrevious className="" />
                                <CarouselNext className="" />
                            </div>
                        </Carousel>
                    </div>

                    {/* RECCOMENDATION PROPERTIES */}
                    <div className="mt-16 mb-4 " id="populer">
                        <div className="mb-4 flex justify-between items-center">
                            <div>
                                <h2 className="text-xl sm:text-2xl font-bold">
                                    Rekomendasi Properti Terpopuler
                                </h2>
                                <p className="text-base">
                                    Cek rekomendasi properti terpopuler kami
                                </p>
                            </div>
                            <Link href={route("search.property")}>
                                <Button
                                    variant={"outline"}
                                    className="hidden md:mr-0 md:block lg:mr-40"
                                >
                                    Lihat Selengkapnya
                                </Button>
                            </Link>
                        </div>

                        {/* CARD */}
                        <Carousel
                            opts={{
                                align: "start",
                            }}
                        >
                            <CarouselContent>
                                {featuredProperties.length > 0
                                    ? featuredProperties.map(
                                          (property, index) => (
                                              <CarouselItem
                                                  className="flex-shrink-0 basis-auto w-[350px] h-[355px]"
                                                  key={index}
                                              >
                                                  <CardProperty
                                                      img={
                                                          property?.images
                                                              .length > 0
                                                              ? property
                                                                    .images[0]
                                                                    ?.image_path
                                                              : "/assets/default-img-property.png"
                                                      }
                                                      key={`properties-card-${index}`}
                                                      id={property.id}
                                                  >
                                                      <div className="flex flex-row justify-between items-center w-full">
                                                          <div>
                                                              <h2 className="font-bold text-foreground">
                                                                  {
                                                                      property.title
                                                                  }
                                                              </h2>
                                                              <div className="flex justify-start items-center gap-1">
                                                                  <p className="text-xs text-neutral-600">
                                                                      <MapPinIcon
                                                                          className="text-muted"
                                                                          fill="#FD9458"
                                                                          size={
                                                                              "16px"
                                                                          }
                                                                      />
                                                                  </p>
                                                                  <p className="text-xs text-muted-foreground">
                                                                      {
                                                                          property.address
                                                                      }
                                                                  </p>
                                                              </div>

                                                              <div className="flex justify-start items-center gap-3.5 mt-1">
                                                                  <p className="text-xs">
                                                                      LT:{" "}
                                                                      {
                                                                          property.land_area
                                                                      }
                                                                      &sup2;
                                                                  </p>
                                                                  <p className="text-xs">
                                                                      LB:{" "}
                                                                      {
                                                                          property.building_area
                                                                      }
                                                                      &sup2;
                                                                  </p>
                                                              </div>
                                                          </div>
                                                      </div>
                                                      <hr className="mt-2 mb-3 dark:border-white" />
                                                      <div className="flex justify-between">
                                                          <p className="text-xs dark:text-primary font-semibold">
                                                              Rp{" "}
                                                              {formatRupiah(
                                                                  property.price
                                                              )}
                                                          </p>
                                                          <div className="flex gap-5">
                                                              <div className="flex items-center gap-x-1 text-xs">
                                                                  <BedDoubleIcon className="w-4 h-4" />{" "}
                                                                  :{" "}
                                                                  {
                                                                      property.bedroom_count
                                                                  }
                                                              </div>
                                                              <div className="flex items-center gap-x-1 text-xs">
                                                                  <BathIcon className="w-4 h-4" />{" "}
                                                                  :{" "}
                                                                  {
                                                                      property.bathroom_count
                                                                  }
                                                              </div>
                                                              <div className="flex items-center gap-x-1 text-xs">
                                                                  <CarFrontIcon className="w-4 h-4" />{" "}
                                                                  :{" "}
                                                                  {
                                                                      property.carport_count
                                                                  }
                                                              </div>
                                                          </div>
                                                      </div>
                                                  </CardProperty>
                                              </CarouselItem>
                                          )
                                      )
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
                                {testimonials
                                    .filter(
                                        (testimonial) =>
                                            testimonial.is_active == true
                                    )
                                    .map((testimonial, index) => (
                                        <CarouselItem
                                            key={index}
                                            className="md:basis-1/2 lg:basis-1/3"
                                        >
                                            <div className="p-1">
                                                <TestimonialCard
                                                    img={
                                                        testimonial.client_avatar
                                                            ? `/storage/${testimonial.client_avatar}`
                                                            : "/assets/avatar.png"
                                                    }
                                                    name={
                                                        testimonial.client_name
                                                    }
                                                    role={
                                                        <span className="flex">
                                                            {Array.from(
                                                                { length: 5 },
                                                                (_, i) => (
                                                                    <span
                                                                        key={i}
                                                                        className={`${
                                                                            i <
                                                                            testimonial.rating
                                                                                ? "text-yellow-500"
                                                                                : "text-gray-300"
                                                                        }`}
                                                                    >
                                                                        ★
                                                                    </span>
                                                                )
                                                            )}
                                                        </span>
                                                    }
                                                    text={testimonial.content}
                                                    className="rounded-lg shadow-lg transition-all duration-300 ease-in-out dark:shadow-slate-950 dark:bg-muted"
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
