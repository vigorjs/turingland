import { Link } from "@inertiajs/react";
import React from "react";

export const CategoriesSection = ({ categories }) => {
    console.log(categories);

    return (
        <div className="flex flex-wrap justify-center items-center gap-3 mt-56 mb-14 md:my-14">
            {categories.map((category, index) => (
                <Link
                    key={index}
                    href={`/search?category_id=${category.id}`}
                    className="w-28 h-24 sm:w-32 sm:h-24 p-4 bg-background dark:bg-muted rounded-lg flex flex-col justify-center items-center gap-3.5 transition-all duration-300 ease-in-out hover:text-primary shadow-md dark:shadow-slate-800 hover:shadow-2xl"
                    // style={{
                    //     boxShadow:
                    //         "0 0 1px rgba(40,41,61,.07),0 2px 4px rgba(96,97,112,.25)",
                    // }}
                >
                    <img
                        src={category.icon ? `/storage/${category.icon}` : "/assets/rumah.png"}
                        alt={category.name}
                        className="w-10 h-10 rounded-full"
                    />
                    <p className="text-xs font-medium text-center">
                        {category.name}
                    </p>
                </Link>
            ))}
        </div>
    );
};
