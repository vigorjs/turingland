export default function PropertyStatusBadge({ status }) {
    const STATUS_STYLES = {
        active: {
            bg: "bg-emerald-50",
            text: "text-emerald-600",
            dot: "#059669",
            label: "Aktif",
        },
        sold: {
            bg: "bg-blue-50",
            text: "text-blue-600",
            dot: "#2563eb",
            label: "Terjual",
        },
        rented: {
            bg: "bg-yellow-50",
            text: "text-yellow-600",
            dot: "#ca8a04",
            label: "Disewakan",
        },
        inactive: {
            bg: "bg-red-50",
            text: "text-red-600",
            dot: "#dc2626",
            label: "Tidak Aktif",
        },
        rent: {
            bg: "bg-yellow-50",
            text: "text-yellow-600",
            dot: "#ca8a04",
            label: "Rent",
        },
        sale: {
            bg: "bg-emerald-50",
            text: "text-emerald-600",
            dot: "#059669",
            label: "Sale",
        },
    };

    const { bg, text, dot, label } = STATUS_STYLES[status] || STATUS_STYLES.inactive;

    return (
        <div className={`py-1.5 px-2.5 ${bg} rounded-full flex justify-center w-20 items-center gap-1`}>
            <svg width="5" height="6" viewBox="0 0 5 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="2.5" cy="3" r="2.5" fill={dot}></circle>
            </svg>
            <span className={`font-medium text-xs ${text}`}>
                {label}
            </span>
        </div>
    );
}
