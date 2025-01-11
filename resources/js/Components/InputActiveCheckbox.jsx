import { Button } from "./ui/button";

export default function InputActiveCheckbox({ isActive, setIsActive }) {
    return (
        <div className="flex justify-between items-center gap-2.5">
            <Button
                onClick={() => setIsActive(true)}
                className={`w-1/2 ${
                    isActive ? "bg-green-100" : "bg-white"
                } border border-green-500 text-green-500 hover:bg-green-100 hover:text-green-500`}
            >
                Aktif
            </Button>
            <Button
                onClick={() => setIsActive(false)}
                className={`w-1/2 ${
                    !isActive ? "bg-red-100" : "bg-white"
                } border border-red-500 text-red-500 hover:bg-red-100 hover:text-red-500`}
            >
                Tidak Aktif
            </Button>
        </div>
    );
}
