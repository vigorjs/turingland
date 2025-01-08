import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "@/hooks/useTheme";
// import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export function ThemeToggle() {
    const { setTheme } = useTheme();
    // const { toast } = useToast();
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleToggle = () => {
        const newTheme = isDarkMode ? "light" : "dark";
        setIsDarkMode(!isDarkMode);
        setTheme(newTheme);

        // toast({
        //     title: isDarkMode
        //         ? "Blinding Headlights! 🌞"
        //         : "Hello Darkness! 👏",
        //     variant: "default",
        // });
    };

    return (
        <Button
            variant="ghost"
            onClick={handleToggle}
            aria-label="Toggle theme"
            className="text-white dark:text-white dark:hover:text-[#FD9458] hover:text-white hover:bg-inherit"
        >
            {isDarkMode ? (
                <Moon className="transition-all" size={40}  />
            ) : (
                <Sun className="transition-all" size={40}/>
            )}
        </Button>
    );
}
