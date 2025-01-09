import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "@/hooks/useTheme";
// import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export function ThemeToggle() {
    const { setTheme } = useTheme();
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleToggle = () => {
        const newTheme = isDarkMode ? "light" : "dark";
        setIsDarkMode(!isDarkMode);
        setTheme(newTheme);
    };

    return (
        <Button
            variant="ghost"
            onClick={handleToggle}
            aria-label="Toggle theme"
            className="text-white dark:text-white dark:hover:text-primary hover:text-white hover:bg-white/10 dark:hover:bg-black/10 p-2 rounded-full"
        >
            {isDarkMode ? (
                <Moon className="transition-transform transform rotate-0 dark:rotate-180"/>
            ) : (
                <Sun className="transition-transform transform rotate-180 dark:rotate-0"/>
            )}
        </Button>
    );
}

