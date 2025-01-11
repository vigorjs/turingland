export default function ActiveBadge({ isActive }) {
    return (
        <div
            className={`py-1.5 px-2.5 ${
                isActive ? "bg-emerald-50" : "bg-red-50"
            } rounded-full flex justify-center w-20 items-center gap-1`}
        >
            <svg
                width="5"
                height="6"
                viewBox="0 0 5 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle
                    cx="2.5"
                    cy="3"
                    r="2.5"
                    fill={isActive ? "#059669" : "dc2626"}
                ></circle>
            </svg>
            <span
                className={`font-medium text-xs ${
                    isActive ? "text-emerald-600" : "text-red-600"
                }`}
            >
                {isActive ? "Aktif" : "Tidak Aktif"}
            </span>
        </div>
    );
}
