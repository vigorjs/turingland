import AlertConfirmModal from "@/Components/AlertConfirmModal";
import Pagination from "@/Components/Pagination";
import AdminLayout from "@/Layouts/AdminLayout";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { router } from "@inertiajs/react";
import { HiSortAscending, HiSortDescending } from "react-icons/hi";
import { Input } from "@/Components/ui/input";

export default function AdminLogPage({ logs, auth }) {
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [selectedLog, setSelectedLog] = useState(null);
    const [sortOrder, setSortOrder] = useState("desc");
    const [editingColumn, setEditingColumn] = useState(null);
    const [filter, setFilter] = useState({
        level: "",
        message: "",
        context: "",
        timestamp: "",
    });

    const sortedData = [...logs.data].sort((a, b) => {
        if (sortOrder === "asc") {
            return a.id - b.id;
        } else {
            return b.id - a.id;
        }
    });

    const handleOpenDeleteModal = (log) => {
        setSelectedLog(log);
        setIsOpenDeleteModal(true);
    };

    const handleDeleteLog = () => {
        router.delete(route("dashboard.log.destroy", selectedLog.id), {
            onSuccess: () => {
                toast({
                    title: "Log berhasil dihapus!",
                    variant: "default",
                });
            },
            onError: (err) => {
                toast({
                    title: "Log gagal dihapus!",
                    description: err,
                    variant: "destructive",
                });
            },
            onFinish: () => {
                setIsOpenDeleteModal(false);
                setSelectedLog(null);
            },
        });
    };

    const handleSortByNumber = () => {
        setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    };

    return (
        <AdminLayout auth={auth} title="Logs">
            <div className="flex flex-col">
                <div className="overflow-x-auto pb-4">
                    <div className="block">
                        <div className="overflow-x-auto w-full border rounded-lg border-gray-300">
                            <table className="w-full rounded-xl">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th
                                            className="px-5 py-2.5 text-left whitespace-nowrap text-sm leading-6 font-semibold capitalize cursor-pointer transition-all duration-300 ease-in-out hover:bg-gray-200 hover:scale-105 hover:text-primary"
                                            onClick={handleSortByNumber}
                                        >
                                            No
                                            {sortOrder === "asc" ? (
                                                <HiSortAscending size={16} />
                                            ) : (
                                                <HiSortDescending size={16} />
                                            )}
                                        </th>
                                        {[
                                            {
                                                key: "level",
                                                label: "Status Code",
                                                type: "number",
                                            },
                                            {
                                                key: "timestamp",
                                                label: "Timestamp",
                                                type: "text",
                                            },
                                            {
                                                key: "message",
                                                label: "Message",
                                                type: "text",
                                            },
                                            {
                                                key: "context",
                                                label: "Context",
                                                type: "text",
                                            },
                                        ].map(({ key, label, type }, index) => (
                                            <th
                                                key={index}
                                                className="px-6 py-4 text-left whitespace-nowrap text-sm leading-6 font-semibold capitalize cursor-pointer transition-all duration-300 ease-in-out hover:bg-gray-200 hover:scale-105 hover:text-primary"
                                                onClick={() =>
                                                    setEditingColumn(key)
                                                }
                                            >
                                                {editingColumn === key ? (
                                                    <Input
                                                        type={type}
                                                        placeholder={`Filter ${label}`}
                                                        className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        value={filter[key]}
                                                        onChange={(e) =>
                                                            setFilter(
                                                                (prev) => ({
                                                                    ...prev,
                                                                    [key]: e
                                                                        .target
                                                                        .value,
                                                                })
                                                            )
                                                        }
                                                        onBlur={() =>
                                                            setEditingColumn(
                                                                null
                                                            )
                                                        }
                                                    />
                                                ) : (
                                                    label
                                                )}
                                            </th>
                                        ))}
                                        <th className="px-6 py-4 text-left whitespace-nowrap text-sm leading-6 font-semibold capitalize">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-300">
                                    {sortedData
                                        .filter((log) => {
                                            return (
                                                (filter.level === "" ||
                                                    log.level
                                                        .toString()
                                                        .includes(
                                                            filter.level
                                                        )) &&
                                                log.message
                                                    .toLowerCase()
                                                    .includes(
                                                        filter.message.toLowerCase()
                                                    ) &&
                                                (log.context
                                                    ? JSON.stringify(
                                                          log.context
                                                      )
                                                          .toLowerCase()
                                                          .includes(
                                                              filter.context.toLowerCase()
                                                          )
                                                    : true) &&
                                                new Date(log.logged_at)
                                                    .toLocaleString()
                                                    .toLowerCase()
                                                    .includes(
                                                        filter.timestamp.toLowerCase()
                                                    )
                                            );
                                        })
                                        .map((log, index) => (
                                            <tr
                                                key={log.id}
                                                className="bg-white transition-all duration-500 hover:bg-gray-200"
                                            >
                                                <td className="px-5 py-2.5 text-sm">
                                                    {index + 1}
                                                </td>
                                                <td className="px-5 py-2.5 text-sm">
                                                    {log.level}
                                                </td>
                                                <td className="px-5 py-2.5 text-sm">
                                                    {new Date(
                                                        log.logged_at
                                                    ).toLocaleString()}
                                                </td>
                                                <td className="px-5 py-2.5 text-sm">
                                                    {log.message}
                                                </td>
                                                <td className="px-5 py-2.5 text-sm">
                                                    {typeof log.context ===
                                                    "object"
                                                        ? JSON.stringify(
                                                              log.context
                                                          )
                                                        : log.context}
                                                </td>
                                                <td className="flex items-center justify-center gap-2 p-5">
                                                    <button
                                                        onClick={() =>
                                                            handleOpenDeleteModal(
                                                                log
                                                            )
                                                        }
                                                        className="p-2 rounded-full bg-white group hover:bg-red-600 transition-all duration-500"
                                                        title="Delete"
                                                    >
                                                        <svg
                                                            className="w-5 h-5 text-red-600 group-hover:text-white"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M6 4a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V6a2 2 0 00-2-2H6zm2 4a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                        <Pagination
                            first_page_url={logs.first_page_url}
                            last_page_url={logs.last_page_url}
                            links={logs.links}
                            next_page_url={logs.next_page_url}
                            prev_page_url={logs.prev_page_url}
                        />
                    </div>
                </div>
            </div>

            <AlertConfirmModal
                isOpen={isOpenDeleteModal}
                setIsOpen={setIsOpenDeleteModal}
                title="Delete Log"
                message="Are you sure you want to delete this log?"
                onClick={handleDeleteLog}
            />
        </AdminLayout>
    );
}
