import AdminDeveloperChart from "@/Components/admin/AdminDeveloperChart";
import AdminPropertyChart from "@/Components/AdminPropertyChart";
import PropertyCategoryChart from "@/Components/PropertyCategoryChart";
import PropertyTypeChart from "@/Components/PropertyTypeChart";
import SearchQueryChart from "@/Components/SearchQueryChart";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/Components/ui/carousel";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { Users } from "lucide-react";
import moment from "moment";
import React from "react";

export default function AdminDashboardPage({
    totalUser,
    totalDeveloper,
    totalAgent,
    totalProperty,
    latestDevelopers,
    latestAgents,
    propertyData,
    categoryData,
    propertyTypeData,
    auth,
    logs,
}) {
    const cardCounting = [
        {
            icon: <Users className="text-2xl w-6 h-6 text-white" />,
            name: "Users",
            total: totalUser,
        },
        {
            icon: <Users className="text-2xl w-6 h-6 text-white" />,
            name: "Developers",
            total: totalDeveloper,
        },
        {
            icon: <Users className="text-2xl w-6 h-6 text-white" />,
            name: "Agent",
            total: totalAgent,
        },
        {
            icon: <Users className="text-2xl w-6 h-6 text-white" />,
            name: "Properti",
            total: totalProperty,
        },
    ];

    return (
        <AdminLayout auth={auth}>
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

            <div className="flex flex-col lg:flex-row gap-4 py-8">
                {/* Left Section - Charts */}
                <div className="w-full lg:w-2/3 flex flex-col gap-6">
                    <SearchQueryChart logs={logs} />
                    {/* Property Chart */}
                    <div className="w-full">
                        <AdminPropertyChart data={propertyData} />
                    </div>

                    {/* Pie Charts - Stack on mobile, side by side on desktop */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {" "}
                        {/* Increased gap */}
                        <div className="w-full h-[400px]">
                            {" "}
                            {/* Added fixed height */}
                            <PropertyCategoryChart data={categoryData} />
                        </div>
                        <div className="w-full h-[400px]">
                            {" "}
                            {/* Added fixed height */}
                            <PropertyTypeChart data={propertyTypeData} />
                        </div>
                    </div>
                </div>

                {/* Right Section - Latest Info */}
                <div className="w-full lg:w-1/3 flex flex-col gap-4">
                    {/* Latest Developers Card */}
                    <div className="bg-white rounded-lg shadow dark:bg-gray-800">
                        <div className="px-4 py-5 border-b sm:px-6">
                            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                                Developer Terbaru
                            </h3>
                            <p className="max-w-2xl mt-1 text-sm text-gray-500 dark:text-gray-200">
                                List developer yang terbaru gabung
                            </p>
                        </div>
                        <div className="divide-y divide-gray-200 dark:divide-gray-700">
                            {latestDevelopers.map((item, index) => (
                                <div
                                    key={`current-developer-${index}`}
                                    className="flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <div className="flex-shrink-0 w-10 h-10 mr-4">
                                        <img
                                            alt="profil"
                                            src={
                                                item.logo
                                                    ? `storage/${item.logo}`
                                                    : "https://avatar.iran.liara.run/public"
                                            }
                                            className="w-full h-full object-cover rounded"
                                        />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="font-medium text-gray-900 dark:text-white truncate">
                                            {item.name}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-200">
                                            {moment(item.created_at).format(
                                                "YYYY-MM-DD"
                                            )}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Latest Agents Card */}
                    <div className="bg-white rounded-lg shadow dark:bg-gray-800">
                        <div className="px-4 py-5 border-b sm:px-6">
                            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                                Agents Terbaru
                            </h3>
                            <p className="max-w-2xl mt-1 text-sm text-gray-500 dark:text-gray-200">
                                List agents yang terbaru gabung
                            </p>
                        </div>
                        <div className="divide-y divide-gray-200 dark:divide-gray-700">
                            {latestAgents.map((item, index) => (
                                <div
                                    key={`current-agent-${index}`}
                                    className="flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <div className="flex-shrink-0 w-10 h-10 mr-4">
                                        <img
                                            alt="profil"
                                            src={
                                                item.photo
                                                    ? `storage/${item.photo}`
                                                    : "https://avatar.iran.liara.run/public"
                                            }
                                            className="w-full h-full object-cover rounded"
                                        />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="font-medium text-gray-900 dark:text-white truncate">
                                            {item.name}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-200">
                                            {moment(item.created_at).format(
                                                "YYYY-MM-DD"
                                            )}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
