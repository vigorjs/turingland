import { Button } from "@/Components/ui/button";
import AdminLayout from "@/Layouts/AdminLayout";
import React from "react";

function AdminPropertyPage({ properties }) {
    console.log(properties);

    return (
        <AdminLayout>
            <Button onClick={() => {}} className="text-white mb-3.5">
                Tambah Property
            </Button>

            <div className="flex flex-col">
                <div className="overflow-x-auto pb-4">
                    <div className="block">
                        <div className="overflow-x-auto w-full border rounded-lg border-gray-300">
                            <table className="w-full rounded-xl">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th
                                            scope="col"
                                            className="px-5 py-2.5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
                                        >
                                            {" "}
                                            No{" "}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-300">
                                    <tr className="bg-white transition-all duration-500 hover:bg-gray-50">
                                        <td className="px-5 py-3.5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                            1
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export default AdminPropertyPage;
