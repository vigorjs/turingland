import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "@/hooks/useTheme";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export function ThemeToggle() {
    const { setTheme } = useTheme();
    const { toast } = useToast();
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleToggle = () => {
        const newTheme = isDarkMode ? "light" : "dark";
        setIsDarkMode(!isDarkMode);
        setTheme(newTheme);

        toast({
            title: isDarkMode
                ? "Blinding Headlights! 🌞"
                : "Hello Darkness! 👏",
            variant: "default",
        });
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={handleToggle}
            aria-label="Toggle theme"
        >
            {isDarkMode ? (
                <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
            ) : (
                <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
            )}
        </Button>
    );
}
