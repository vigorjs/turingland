import SearchBar from "@/Components/search/SearchBar";
import { Button } from "@/Components/ui/button";
import { Head, Link } from "@inertiajs/react";

export default function Welcome() {
    return (
        <>
            <Head title="Welcome" />
            <div className="flex justify-center items-center h-screen">
                <Button>test</Button>
                <SearchBar></SearchBar>
            </div>
        </>
    );
}