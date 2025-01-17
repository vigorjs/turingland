import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import { useEffect, useState } from "react";

export default function AuthLayout({ children, auth }) {

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
        <div className="flex min-h-screen flex-col">
            <Header variant="sticky" auth={auth} areas={areas} categories={categories} />

            {/* Main Content */}
            {children}

            <Footer areas={areas} categories={categories} />
        </div>
    );
}
