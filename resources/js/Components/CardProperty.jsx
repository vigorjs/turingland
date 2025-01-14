import { Link } from "@inertiajs/react";

export const CardProperty = ({ children, img, isFullWhenMobile = false }) => {
    const twClass = isFullWhenMobile
        ? "relative w-full aspect-square h-full rounded-2xl"
        : "relative w-full h-full rounded-2xl";

    return (
        <Link href={route('property.show', 1)} className={twClass}>
            <img
                src={img}
                alt={img}
                className="w-full h-full object-cover rounded-2xl"
            />

            <div className="absolute bottom-0 p-1.5 w-full">
                <div className="bg-white dark:bg-[#282828] w-full rounded-xl py-3 px-4 gap-1">
                    {children}
                </div>
            </div>
        </Link>
    );
};
