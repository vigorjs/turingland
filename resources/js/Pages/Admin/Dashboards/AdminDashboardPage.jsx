import AdminDeveloperChart from "@/Components/admin/AdminDeveloperChart";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/Components/ui/carousel";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { Users } from "lucide-react";
import React from "react";

export default function AdminDashboardPage() {
    const cardCounting = [
        {
            icon: <Users className="text-2xl w-6 h-6 text-white" />,
            name: "Users",
            total: 12,
        },
        {
            icon: <Users className="text-2xl w-6 h-6 text-white" />,
            name: "Developers",
            total: 69,
        },
        {
            icon: <Users className="text-2xl w-6 h-6 text-white" />,
            name: "Agent",
            total: 8,
        },
        {
            icon: <Users className="text-2xl w-6 h-6 text-white" />,
            name: "Properti",
            total: 137,
        },
    ];

    const developers = [
        {
            logo: "assets/kost.png",
            name: "Sinarmas",
            joinDate: "Senin, 13 Desember 2024"
        },
        {
            logo: "assets/kost.png",
            name: "Sinarmas",
            joinDate: "Senin, 13 Desember 2024"
        },
        {
            logo: "assets/kost.png",
            name: "Sinarmas",
            joinDate: "Senin, 13 Desember 2024"
        },
        {
            logo: "assets/kost.png",
            name: "Sinarmas",
            joinDate: "Senin, 13 Desember 2024"
        },
        {
            logo: "assets/kost.png",
            name: "Sinarmas",
            joinDate: "Senin, 13 Desember 2024"
        },
    ]

    return (
        <AdminLayout>
            {/* <div className="flex justify-start items-center gap-2 mt-8 ml-2"> */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 mt-12 mb-8 mx-3">
                {cardCounting.map((item, index) => (
                    <div
                        key={`card-counting-${index}`}
                        className="h-22 bg-white shadow-md border border-neutral-100 p-5 rounded-xl flex justify-between items-start gap-2 hover:scale-105 hover:shadow-lg transition-all duration-300"
                    >
                        <div className="-mt-10  bg-primary p-3.5 rounded-lg flex justify-center items-center">
                            {item.icon}
                        </div>

                        <div>
                            <p className="text-sm text-right font-normal text-neutral-600">
                                {item.name}
                            </p>
                            <p className="text-2xl text-right text-neutral-700 font-bold">
                                {item.total}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-wrap lg:flex-nowrap justify-between items-start gap-2 py-8">
                <div className="w-full lg:w-2/3">
                    <AdminDeveloperChart />
                </div>
                <div className="w-full lg:w-1/3">
                    <div class="flex flex-col items-center justify-center w-full mx-auto bg-white rounded-lg shadow dark:bg-gray-800">
                        <div class="w-full px-4 py-5 border-b sm:px-6">
                            <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                                Developer Terbaru
                            </h3>
                            <p class="max-w-2xl mt-1 text-sm text-gray-500 dark:text-gray-200">
                                List developer yang terbaru gabung
                            </p>
                        </div>
                        <div class="flex flex-col divide-y divide w-full px-4 sm:px-6">
                            {
                                developers.map((item, index) => (
                                    <div key={`current-developer-${index}`} class="flex flex-row">
                                <div class="flex items-center p-4 cursor-pointer select-none">
                                    <div class="flex flex-col items-center justify-center w-10 h-10 mr-4">
                                        <a href="#" class="relative block">
                                            <img
                                                alt="profil"
                                                src={item.logo}
                                                class="mx-auto object-cover rounded h-10 w-10 "
                                            />
                                        </a>
                                    </div>
                                    <div class="pl-1 mr-16">
                                        <div class="font-medium dark:text-white">
                                            {item.name}
                                        </div>
                                        <div class="text-sm text-gray-600 dark:text-gray-200">
                                            {item.joinDate}
                                        </div>
                                    </div>
                                </div>
                            </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>

            {/* <Carousel
                opts={{
                    align: "center",
                }}
            >
                <CarouselContent className="py-10 pl-3">
                    {cardCounting.map((item, index) => (
                        <CarouselItem key={`card-counting-${index}`} className="flex-shrink-0 basis-auto ">
                            <div className="w-72 max-w-72 h-22 bg-white shadow-md border border-neutral-100 p-5 rounded-xl flex justify-between items-start gap-2 hover:scale-105 hover:shadow-lg transition-all duration-300">
                                <div className="-mt-10  bg-primary p-3.5 rounded-lg flex justify-center items-center">
                                    {item.icon}
                                </div>

                                <div>
                                    <p className="text-sm text-right font-normal text-neutral-600">
                                        {item.name}
                                    </p>
                                    <p className="text-2xl text-right text-neutral-700 font-bold">
                                        {item.total}
                                    </p>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel> */}
            {/* </div> */}
        </AdminLayout>
    );
}
