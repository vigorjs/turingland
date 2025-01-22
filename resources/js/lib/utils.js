import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function formatRupiah(value) {
    const number = parseFloat(value) || 0;
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    })
        .format(number)
        .replace("IDR", "Rp");
}

export function formatUpdatedAt(value) {
    const timeDiff = Date.now() - new Date(value).getTime();

    const secondDiff = Math.floor(timeDiff / 1000);
    const minuteDiff = Math.floor(timeDiff / (1000 * 60));
    const hourDiff = Math.floor(timeDiff / (1000 * 60 * 60));
    const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const weekDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 7));
    const monthDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30));
    const yearDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));

    if (secondDiff < 1) return "Diperbarui kurang dari satu detik yang lalu";
    else if (secondDiff < 60) return `Diperbarui ${secondDiff} detik yang lalu`;
    else if (minuteDiff < 60) return `Diperbarui ${minuteDiff} menit yang lalu`;
    else if (hourDiff < 24) return `Diperbarui ${hourDiff} jam yang lalu`;
    else if (dayDiff < 7) return `Diperbarui ${dayDiff} hari yang lalu`;
    else if (weekDiff < 4) return `Diperbarui ${weekDiff} minggu yang lalu`;
    else if (monthDiff < 12) return `Diperbarui ${monthDiff} bulan yang lalu`;
    else return `Diperbarui ${yearDiff} tahun yang lalu`;
}
