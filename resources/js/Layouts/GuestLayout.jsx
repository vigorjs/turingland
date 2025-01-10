import Footer from "@/Components/Footer";
import Header from "@/Components/Header";

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col transition-all duration-300 ease-in-out">
            <Header />

            {/* Main Content */}
            {children}

            <Footer />
        </div>
    );
}
