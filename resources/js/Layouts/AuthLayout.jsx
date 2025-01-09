import Footer from "@/Components/Footer";
import Header from "@/Components/Header";

export default function AuthLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col">
            <Header variant="sticky" />

            {/* Main Content */}
            {children}

            <Footer />
        </div>
    );
}
