import React from "react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/Components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { X, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

const MultiSelect = ({
    selected = [],
    options = [],
    onChange = () => {},
    placeholder = "Select items...",
}) => {
    const [open, setOpen] = React.useState(false);

    // Ensure options and selected are arrays and have the required structure
    const safeOptions = Array.isArray(options) ? options : [];
    const safeSelected = Array.isArray(selected) ? selected : [];

    const handleSelect = (item) => {
        if (!item || !item.id) return;

        const isSelected = safeSelected.some(
            (selectedItem) => selectedItem.id === item.id
        );
        const newSelected = isSelected
            ? safeSelected.filter((i) => i.id !== item.id)
            : [...safeSelected, item];

        onChange(newSelected);
    };

    const handleRemove = (item, e) => {
        if (!item || !item.id) return;

        e.stopPropagation();
        const newSelected = safeSelected.filter((i) => i.id !== item.id);
        onChange(newSelected);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                        "w-full justify-between",
                        !safeSelected.length && "text-muted-foreground"
                    )}
                >
                    <div className="flex gap-1 flex-wrap">
                        {safeSelected.length > 0 ? (
                            safeSelected.map(
                                (item) =>
                                    item &&
                                    item.id && (
                                        <Badge
                                            key={item.id}
                                            variant="secondary"
                                            className="mr-1"
                                        >
                                            {item.name || "Unnamed"}
                                            <button
                                                className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                                onMouseDown={(e) =>
                                                    handleRemove(item, e)
                                                }
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </Badge>
                                    )
                            )
                        ) : (
                            <span>{placeholder}</span>
                        )}
                    </div>
                    <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder="Search..." />
                    <CommandEmpty>No item found.</CommandEmpty>
                    <CommandGroup className="max-h-64 overflow-auto">
                        {safeOptions.map(
                            (item) =>
                                item &&
                                item.id && (
                                    <CommandItem
                                        key={item.id}
                                        onSelect={() => handleSelect(item)}
                                        className="cursor-pointer"
                                    >
                                        <div
                                            className={cn(
                                                "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                                safeSelected.some(
                                                    (selected) =>
                                                        selected.id === item.id
                                                )
                                                    ? "bg-primary text-primary-foreground"
                                                    : "opacity-50 [&_svg]:invisible"
                                            )}
                                        >
                                            <X className="h-4 w-4" />
                                        </div>
                                        {item.name || "Unnamed"}
                                    </CommandItem>
                                )
                        )}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default MultiSelect;
