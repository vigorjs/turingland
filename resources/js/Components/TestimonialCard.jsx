import { Quote } from "lucide-react";
import { FaQuoteRight } from "react-icons/fa";

export const TestimonialCard = ({ img, name, role, text, ...props }) => {
    const { className } = props;
    return (
        <div
            className={`p-6 bg-card rounded-lg shadow-md flex flex-col items-start gap-4 w-full h-48 ${className}`}
        >
            <div className="flex space-x-5 w-full">
                <img
                    src={img}
                    alt={name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-border"
                />
                <div className="w-full">
                    <div className="flex flex-row justify-between items-center">
                        <h4 className="text-lg font-extrabold text-foreground">
                            {name}
                        </h4>
                        <FaQuoteRight size={14} className="text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground">{role}</p>
                </div>
            </div>
            <p className="text-sm text-foreground mt-2 overflow-hidden line-clamp-4">
                {text}
            </p>
        </div>
    );
};
