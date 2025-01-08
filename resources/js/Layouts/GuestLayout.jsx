import Footer from '@/Components/Footer';
import Header from '@/Components/Header';

export default function GuestLayout({ children }) {


    return (
        <div className="flex min-h-screen flex-col">
            <Header/>

            {/* Main Content */}
            {children}

            <Footer/>
        </div>
    );
}
