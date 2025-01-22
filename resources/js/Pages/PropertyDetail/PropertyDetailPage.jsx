import { CardProperty } from "@/Components/CardProperty";
import Modal from "@/Components/Modal";
import { Button } from "@/Components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/Components/ui/carousel";
import GuestLayout from "@/Layouts/GuestLayout";
import { formatRupiah, formatUpdatedAt } from "@/lib/utils";
import { Head, Link } from "@inertiajs/react";
import Autoplay from "embla-carousel-autoplay";
import {
    BathIcon,
    BedDoubleIcon,
    CarFrontIcon,
    ChevronDown,
    ChevronUp,
    MapPin,
    MapPinIcon,
    User,
} from "lucide-react";
import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function PropertyDetailPage({
    property,
    auth,
    featuredProp,
    banner,
}) {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isInfoLess, setIsInfoLess] = useState(true);

    const imagePrimary = property.images.filter(
        (img) => img.is_primary == true
    );
    // const otherImages = property.images.filter((img) => {
    //     img.is_primary == false;
    // });

    const otherImages = property.images.slice(1, property.images.length);

    const allImages = [imagePrimary, ...otherImages];

    // console.log("property: ", property);
    // console.log("otherImages: ", otherImages);

    return (
        <GuestLayout auth={auth}>
            <Head title="Property Detail" />

            <div className="min-h-screen px-3 sm:px-4 md:px-6 lg:px-[150px] py-6">
                {/* IMAGES */}
                <button
                    onClick={() =>
                        property?.images?.length > 0 && setIsOpenModal(true)
                    }
                    className="w-full border border-gray-50 dark:border-white/90 rounded-2xl"
                >
                    <img
                        src={
                            imagePrimary[0]
                                ? imagePrimary[0].image_path
                                : "/assets/default-img-property.png"
                        }
                        alt=""
                        className={`w-full h-80 sm:h-[420px] rounded-2xl shadow-lg ${
                            imagePrimary[0] ? "object-cover" : "object-contain"
                        }`}
                    />
                </button>
                {property?.images?.length > 1 && (
                    <div className="relative flex justify-center items-center -mt-10 sm:-mt-16">
                        <Carousel className="bg-white sm:gap-4 w-auto max-w-xs sm:max-w-xl p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl shadow-md">
                            <CarouselContent>
                                {otherImages.map((img, index) => (
                                    <CarouselItem
                                        className="basis-auto"
                                        key={index}
                                    >
                                        <button
                                            onClick={() => setIsOpenModal(true)}
                                        >
                                            <img
                                                src={
                                                    img.image_path
                                                        ? img.image_path
                                                        : "/assets/default-img-property.png"
                                                }
                                                className="w-[100px] sm:w-40 rounded-xl"
                                            />
                                        </button>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <div className="absolute -bottom-6 right-14 flex justify-center items-center">
                                <div className="mx-auto w-full ">
                                    <CarouselPrevious className="" />
                                    <CarouselNext className="" />
                                </div>
                            </div>
                        </Carousel>
                    </div>
                )}

                {/* DETAIL */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0 mt-16 md:mt-20">
                    <div className="w-full col-span-1 md:col-span-2">
                        {/* CATEGORIES */}
                        <div className="flex flex-wrap justify-start items-center gap-2">
                            {property.categories.length > 0
                                ? property.categories.map((category, index) => (
                                      <button
                                          key={index}
                                          className="bg-neutral-200/80 text-neutral-800 p-2 rounded-full text-xs"
                                      >
                                          {category.name}
                                      </button>
                                  ))
                                : null}
                        </div>

                        <div className="mt-6 border-b pb-4 border-neutral-300">
                            <h1 className="text-primary text-2xl font-extrabold mb-1">
                                {formatRupiah(property.price)}
                            </h1>
                            <p className="text-neutral-600 text-base">
                                {property.title}
                            </p>
                            <p className="text-neutral-500 text-xs">
                                {formatUpdatedAt(property.updated_at)}
                            </p>

                            <div className="mt-6">
                                <p className="text-primary font-bold text-sm">
                                    {property.area.name}
                                </p>
                                <p className="text-neutral-600 text-sm">
                                    {property.area.location.name}
                                </p>
                                <Button className="bg-primary flex justify-start items-center gap-0.5 mt-1.5 px-3 py-1 rounded-full">
                                    <MapPin className="text-white w-5 h-5" />
                                    <p className="text-white text-sm">
                                        Lihat Lokasi
                                    </p>
                                </Button>
                            </div>
                        </div>

                        {/* OVERVIEW PROPERTY */}
                        <div className="mt-6 border-b pb-4 border-neutral-300">
                            <h2 className="text-neutral-600 font-semibold text-lg mb-3">
                                Overview Properti
                            </h2>
                            <div className="flex flex-wrap justify-start items-center gap-2">
                                <button className="bg-primary/15 text-primary px-2 py-1 font-semibold rounded-full text-xs">
                                    {property.type}
                                </button>
                                <button className="flex items-center gap-x-1 text-xs px-2.5 py-1 shadow rounded-full">
                                    <BedDoubleIcon className="w-3.5 h-3.5" /> :
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
                        </div>

                        {/* INFORMATION PROPERTY */}
                        <div className="mt-6 border-b pb-4 border-neutral-300">
                            <h2 className="text-neutral-600 font-semibold text-lg mb-3">
                                Informasi Properti
                            </h2>

                            {/* SPECIFICATION PROPERTY */}
                            <div className="">
                                <h3 className="text-neutral-600 font-semibold text-xs mb-1">
                                    Spesifikasi
                                </h3>
                                <ul className="divide-y divide">
                                    <li>
                                        <div className="flex justify-start items-center gap-2 pb-2 pt-5">
                                            <p className="w-1/2 md:w-1/4 text-neutral-600 text-xs">
                                                Kamar Tidur
                                            </p>
                                            <p className="w-1/2 md:w-1/4 text-neutral-600 text-sm font-medium">
                                                {property.bedroom_count}
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="flex justify-start items-center gap-2 pb-2 pt-5">
                                            <p className="w-1/2 md:w-1/4 text-neutral-600 text-xs">
                                                Kamar Mandi
                                            </p>
                                            <p className="w-1/2 md:w-1/4 text-neutral-600 text-sm font-medium">
                                                {property.bathroom_count}
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="flex justify-start items-center gap-2 pb-2 pt-5">
                                            <p className="w-1/2 md:w-1/4 text-neutral-600 text-xs">
                                                Luas Bangunan
                                            </p>
                                            <p className="w-1/2 md:w-1/4 text-neutral-600 text-sm font-medium">
                                                {property.land_area} m&sup2;
                                            </p>
                                        </div>
                                    </li>
                                    {!isInfoLess && (
                                        <>
                                            <li>
                                                <div className="flex justify-start items-center gap-2 pb-2 pt-5">
                                                    <p className="w-1/2 md:w-1/4 text-neutral-600 text-xs">
                                                        Sertifikat
                                                    </p>
                                                    <p className="w-1/2 md:w-1/4 text-neutral-600 text-sm font-medium">
                                                        {property.certificate_type
                                                            ? property.certificate_type
                                                            : "Sertifikat tidak tertera"}
                                                    </p>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="flex justify-start items-center gap-2 pb-2 pt-5">
                                                    <p className="w-1/2 md:w-1/4 text-neutral-600 text-xs">
                                                        Tahun Dibangun
                                                    </p>
                                                    <p className="w-1/2 md:w-1/4 text-neutral-600 text-sm font-medium">
                                                        {property.year_built
                                                            ? property.year_built
                                                            : "Tahun tidak tertera"}
                                                    </p>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="flex justify-start items-center gap-2 pb-2 pt-5">
                                                    <p className="w-1/2 md:w-1/4 text-neutral-600 text-xs">
                                                        Tipe Properti
                                                    </p>
                                                    {property.categories
                                                        .length > 0
                                                        ? property.categories.map(
                                                              (
                                                                  category,
                                                                  index
                                                              ) => (
                                                                  <p className="w-1/2 md:w-1/4 text-neutral-600 text-sm font-medium">
                                                                      {
                                                                          category.name
                                                                      }
                                                                  </p>
                                                              )
                                                          )
                                                        : null}
                                                </div>
                                            </li>
                                            <li>
                                                <div className="flex justify-start items-center gap-2 pb-2 pt-5">
                                                    <p className="w-1/2 md:w-1/4 text-neutral-600 text-xs">
                                                        Tipe Iklan
                                                    </p>
                                                    <p className="w-1/2 md:w-1/4 text-neutral-600 text-sm font-medium">
                                                        {property.type}
                                                    </p>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="flex justify-start items-center gap-2 pb-2 pt-5">
                                                    <p className="w-1/2 md:w-1/4 text-neutral-600 text-xs">
                                                        ID Iklan
                                                    </p>
                                                    <p className="w-1/2 md:w-1/4 text-neutral-600 text-sm font-medium">
                                                        #123
                                                    </p>
                                                </div>
                                            </li>
                                        </>
                                    )}
                                </ul>
                                {!isInfoLess && (
                                    <Button className="text-primary hover:text-white bg-white hover:bg-primary border border-primary mt-5 w-full">
                                        Tanya lebih lanjut
                                    </Button>
                                )}
                                <button
                                    onClick={() => setIsInfoLess(!isInfoLess)}
                                    className="flex justify-start items-center md:gap-1 mt-3.5"
                                >
                                    <p className="text-primary font-medium text-xs md:text-sm">
                                        Muat lebih{" "}
                                        {isInfoLess ? "banyak" : "sedikit"}
                                    </p>{" "}
                                    {isInfoLess ? (
                                        <ChevronDown className="w-4 md:w-5 h-4 md:h-5 text-primary" />
                                    ) : (
                                        <ChevronUp className="w-4 md:w-5 h-4 md:h-5 text-primary" />
                                    )}
                                </button>

                                {/* DESCRIPTION PROPERTY */}
                                <h3 className="text-neutral-600 font-semibold text-xs mt-8 mb-2.5">
                                    Deskripsi
                                </h3>
                                <p className="text-neutral-600 text-xs">
                                    {property.description}
                                </p>
                            </div>
                        </div>

                        {/* LOCATION PROPERTY */}
                        <div className="mt-6 border-b pb-4 border-neutral-300">
                            <h2 className="text-neutral-600 font-semibold text-lg mb-3">
                                Lokasi Properti
                            </h2>
                            <iframe
                                className="w-full h-72"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.7116794951467!2d106.81653397488066!3d-6.301563693687589!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ed44c9532647%3A0x5589ddd11d4aa627!2sEnigma%20Camp%20Training%20Center%20Jakarta%201!5e0!3m2!1sid!2sid!4v1736784513047!5m2!1sid!2sid"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                    <div className="md:sticky md:top-2 w-full md:h-[680px] col-span-1 pl-0 md:pl-6">
                        {/* AGENT INFORMATION */}
                        <div className="shadow-md p-4 rounded-2xl mb-7">
                            <div className="flex justify-start items-start gap-2.5 border-b border-neutral-300 pb-5">
                                <img
                                    src={property.agent.photo}
                                    alt=""
                                    className="w-14 h-14 rounded-full object-cover"
                                />
                                <div>
                                    <p className="text-primary font-semibold text-sm">
                                        {property.agent.name}
                                    </p>
                                    <p className="text-neutral-500 text-xs mt-0.5">
                                        Agent
                                    </p>
                                    <p className="text-neutral-500 text-xs">
                                        {property.agent.email}
                                    </p>
                                </div>
                            </div>
                            <Link
                                href={`https://api.whatsapp.com/send?phone=${property.agent.wa_number}`}
                            >
                                <Button className="w-full mt-3 bg-green-500 hover:bg-green-600">
                                    <FaWhatsapp className="text-white" />
                                    <p className="text-white text-sm">
                                        Whatsapp
                                    </p>
                                </Button>
                            </Link>
                        </div>

                        <div className="shadow-md p-4 rounded-2xl mb-7">
                            <div className="flex justify-start items-center gap-2.5 border-b border-neutral-300 pb-5">
                                <img
                                    src={
                                        property.developer.logo
                                            ? property.developer.logo
                                            : "https://avatar.iran.liara.run/public"
                                    }
                                    alt=""
                                    className="w-14 h-14 rounded-full object-cover"
                                />
                                <div>
                                    <p className="text-primary font-semibold text-sm">
                                        {property.developer.name}
                                    </p>
                                    <p className="text-neutral-500 text-xs mt-0.5">
                                        Developer
                                    </p>
                                </div>
                            </div>
                            <p className="text-neutral-500 text-xs mt-3">
                                {property.developer.description}
                            </p>
                        </div>

                        {/* <div className="w-full">
                            <img src={img1} alt="" className="rounded-2xl" />
                        </div> */}
                    </div>
                </div>

                {/* RECCOMENDATION PROPERTIES */}
                <div className="mt-16 mb-12">
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
                            {featuredProp.length > 0
                                ? featuredProp.map((property, index) => (
                                      <CarouselItem
                                          className="flex-shrink-0 basis-auto w-[350px] h-[355px]"
                                          key={index}
                                      >
                                          <CardProperty
                                              //   img={
                                              //       property.images.image_path
                                              //           ? property.images
                                              //                 .image_path
                                              //           : "https://ik.imagekit.io/pashouses/pb1/tr:n-hl_v3/property/front-house/-JDoNqEMWigKKq7jtLReZVFmjQ7pfFdb0Op7MHND.jpeg"
                                              //   }
                                              img={
                                                  property?.images.length > 0
                                                      ? property.images?.[0]
                                                            ?.image_path
                                                      : "/assets/default-img-property.png"
                                              }
                                              key={`properties-card-${index}`}
                                          >
                                              <div className="flex flex-row justify-between items-center w-full">
                                                  <div>
                                                      <h2 className="font-bold text-foreground">
                                                          {property.title}
                                                      </h2>
                                                      <div className="flex justify-start items-center gap-1">
                                                          <p className="text-xs text-neutral-600">
                                                              <MapPinIcon
                                                                  className="text-muted"
                                                                  fill="#FD9458"
                                                                  size={"16px"}
                                                              />
                                                          </p>
                                                          <p className="text-xs text-muted-foreground">
                                                              {property.address}
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
                                  ))
                                : null}
                        </CarouselContent>
                        <div className="absolute -top-11 right-20  justify-center items-center hidden lg:flex">
                            <CarouselPrevious className="" />
                            <CarouselNext className="" />
                        </div>
                    </Carousel>
                </div>

                <Carousel
                    className="mb-4"
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
                        {banner.length > 0 ? (
                            banner.map((bnr, index) => (
                                <CarouselItem
                                    key={`ads-section-${index}`}
                                    className="flex-shrink-0 basis-1/1 md:basis-1/2 max-h-[40vh]"
                                >
                                    <Link href={bnr.link}>
                                        <img
                                            src={
                                                bnr.image_path
                                                    ? bnr.image_path
                                                    : "https://ecatalog.sinarmasland.com/_next/image?url=https%3A%2F%2Fecatalog.sinarmasland.com%2Fassets%2Fsite-setting-files%2F1%2Fhomepage-background-banner-desktop-677b6f397dc74.jpg&w=3840&q=75"
                                            }
                                            alt={`Carousel item ${index}`}
                                            className="object-contain md:rounded-2xl rounded-none w-[100vw] sm:w-auto sm:h-full"
                                        />
                                    </Link>
                                </CarouselItem>
                            ))
                        ) : (
                            <p className="text-center text-gray-500">
                                No items available for the carousel.
                            </p>
                        )}
                    </CarouselContent>
                </Carousel>
            </div>

            <ModalImages
                isOpenModal={isOpenModal}
                setIsOpenModal={setIsOpenModal}
                images={allImages}
            />
        </GuestLayout>
    );
}

function ModalImages({ isOpenModal, setIsOpenModal, images }) {
    const handleCloseModal = () => setIsOpenModal(false);

    return (
        <Modal onClose={handleCloseModal} show={isOpenModal}>
            <div className="bg-white p-2 sm:p-4">
                <Carousel
                    opts={{
                        align: "center",
                        loop: false,
                    }}
                >
                    <CarouselContent>
                        {images.map((img, index) => (
                            <CarouselItem
                                key={`image-section-${index}`}
                                // className="basis-auto"
                            >
                                <div className="w-auto flex justify-center items-center">
                                    <img
                                        src={
                                            img[0]
                                                ? img?.[0].image_path
                                                : img.image_path
                                        }
                                        className="w-full object-contain h-80 sm:h-96 rounded-xl shadow-md"
                                        alt=""
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="absolute right-12 bottom-5 bg-red-500 flex justify-center items-center">
                        <CarouselPrevious />
                        <CarouselNext />
                    </div>
                </Carousel>
            </div>
        </Modal>
    );
}
