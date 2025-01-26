import { Link } from "@inertiajs/react";

const Pagination = ({
    first_page_url,
    links,
    next_page_url,
    last_page_url,
    prev_page_url,
}) => {
    return (
        <nav
            className="flex items-center justify-center py-4"
            aria-label="Table navigation"
        >
            <ul className="flex flex-wrap items-center justify-center text-sm gap-4 sm:gap-6 md:gap-8">
                {prev_page_url && (
                    <li>
                        <Link
                            href={first_page_url}
                            className="flex items-center justify-center gap-2 px-3 h-10 text-gray-500 bg-white font-medium text-sm sm:text-base leading-7 rounded-md hover:text-gray-700 hover:bg-gray-100"
                        >
                            <svg
                                width="21"
                                height="20"
                                viewBox="0 0 21 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M13.0002 14.9999L8 9.99967L13.0032 4.99652"
                                    stroke="black"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></path>
                            </svg>
                            Back
                        </Link>
                    </li>
                )}

                <li>
                    <ul className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
                        {links.map((link, index) => (
                            <li key={index}>
                                <Link
                                    href={link.url || "javascript:;"}
                                    className={`text-sm sm:text-base font-normal leading-7 py-2 px-3 sm:py-2.5 sm:px-4 rounded-full transition-all duration-300 ${
                                        link.active
                                            ? "bg-primary text-white"
                                            : "bg-white text-gray-500 hover:bg-primary hover:text-white"
                                    }`}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                ></Link>
                            </li>
                        ))}
                    </ul>
                </li>

                {next_page_url && (
                    <li>
                        <Link
                            href={last_page_url}
                            className="flex items-center justify-center gap-2 px-3 h-10 text-gray-500 bg-white font-medium text-sm sm:text-base leading-7 rounded-md hover:text-gray-700 hover:bg-gray-100"
                        >
                            Last
                            <svg
                                width="21"
                                height="20"
                                viewBox="0 0 21 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M8.00295 4.99646L13.0032 9.99666L8 14.9998"
                                    stroke="black"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></path>
                            </svg>
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Pagination;
