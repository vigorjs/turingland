import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";

const UpdateImageForm = ({
    title,
    currentImage,
    previewImage,
    onImageChange,
    onSubmit,
}) => {
    return (
        <div className="bg-gray-50 p-4 rounded-lg shadow w-auto">
            <h2 className="text-xl font-semibold mb-4 text-black">{title}</h2>
            <form onSubmit={onSubmit}>
                <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-700">
                        Current {title}:
                    </h3>
                    <img
                        src={currentImage}
                        alt={`Current ${title}`}
                        className="mt-2 w-32 h-32 object-contain border border-gray-200"
                    />
                </div>
                <div className="mb-4 w-auto">
                    <Label className="block text-sm font-medium text-gray-700">
                        Select New {title}
                    </Label>
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={onImageChange}
                        className="mt-2 p-2 border border-gray-300 rounded-lg text-black w-full"
                    />
                </div>
                {previewImage && (
                    <div className="mb-4">
                        <h3 className="text-sm font-medium text-gray-700">
                            Preview:
                        </h3>
                        <img
                            src={previewImage}
                            alt={`Preview ${title}`}
                            className="mt-2 w-32 h-32 object-contain border border-gray-200"
                        />
                    </div>
                )}
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Save {title}
                </button>
            </form>
        </div>
    );
};

export default UpdateImageForm;
