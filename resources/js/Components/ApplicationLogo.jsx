import { useTheme } from "@/hooks/useTheme";
import { Link } from "@inertiajs/react";

export default function ApplicationLogo(props, className) {
    const { theme } = useTheme();
    return (
        <Link
            {...props}
            href="/"
            className={`flex items-center hover:opacity-90 transition-opacity ${className}`}
        >
            {theme === "dark" ? (
                <img
                    src="/assets/turinglandlogodark.png"
                    alt="Application Logo"
                    className="h-auto w-auto"
                />
            ) : (
                <img
                    src="/assets/turinglandlogo.png"
                    alt="Application Logo"
                    className="h-auto w-auto"
                />
            )}
        </Link>
    );
}
