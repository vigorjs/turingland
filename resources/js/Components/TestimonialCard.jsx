export const TestimonialCard = ({ img, name, role, text }) => {
    return (
        <div className="p-6 bg-white rounded-lg shadow-md flex items-start gap-4 max-w-sm">
            <img
                src={img}
                alt={name}
                className="w-14 h-14 rounded-full object-cover border-2 border-gray-200"
            />
            <div>
                <h4 className="text-lg font-bold text-gray-800">{name}</h4>
                <p className="text-sm text-gray-500">{role}</p>
                <p className="text-sm text-gray-600 mt-2">{text}</p>
            </div>
        </div>
    );
};