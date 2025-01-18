import { useTheme } from "@/hooks/useTheme";
import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function ApplicationLogo({ className, ...props }) {
    const { theme } = useTheme();
    const [currentLogo, setCurrentLogo] = useState(null);
    const [currentLogoDark, setCurrentLogoDark] = useState(null);

    useEffect(() => {
        const fetchImage = async (key, setter) => {
            try {
                const response = await axios.get(
                    route("web-preferences.get", { key })
                );
                setter(response.data.value); // Menyimpan path ke state
            } catch (error) {
                // console.error(`Error fetching current ${key}:`, error);
            }
        };

        fetchImage("logo_url", setCurrentLogo);
        fetchImage("logo_dark_url", setCurrentLogoDark);
    }, [currentLogo, currentLogoDark]);

    return (
        <Link
            {...props}
            href="/"
            className={`flex items-center hover:opacity-90 transition-opacity ${className}`}
        >
            {theme !== "dark" ? (
                <img
                    src={
                        currentLogo
                            ? `/storage/${currentLogo}`
                            : "/assets/turinglandlogo.png"
                    }
                    alt="Application Logo"
                    className="h-12 w-auto"
                />
            ) : (
                <img
                    src={
                        currentLogoDark
                            ? `/storage/${currentLogoDark}`
                            : "/assets/turinglandlogodark.png"
                    }
                    alt="Application Logo"
                    className="h-12 w-auto"
                />
            )}
        </Link>
    );
}
