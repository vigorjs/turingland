import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import { useEffect, useState } from "react";

export default function GuestLayout({ children, auth }) {
    // console.log("ini props dari auth di komponen guestLayout : ", auth);

    const [categories, setCategories] = useState([]);

    const [areas, setAreas] = useState([]);

    const getDataHeader = async () => {
        try {
            const response = await fetch("/api/header-data");
            const data = await response.json();

            setAreas(data.areas);
            setCategories(data.categories);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        (async () => {
            await getDataHeader();
        })();
    }, []);

    return (
        <div className="flex min-h-screen flex-col transition-all duration-300 ease-in-out">
            <Header auth={auth} areas={areas} categories={categories} />

            {/* Main Content */}
            {children}

            <Footer areas={areas} categories={categories} />
        </div>
    );
}
