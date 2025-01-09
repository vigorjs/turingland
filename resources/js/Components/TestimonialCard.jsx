import { Quote } from "lucide-react";
import { FaQuoteRight } from "react-icons/fa";

export const TestimonialCard = ({ img, name, role, text }) => {
    return (
        <div className="p-6 bg-card rounded-lg shadow-md flex items-start gap-4 w-96 h-48">
            <img
                src={img}
                alt={name}
                className="w-14 h-14 rounded-full object-cover border-2 border-border"
            />
            <div>
                <div className="flex justify-between items-center">
                    <h4 className="text-lg font-extrabold text-foreground">
                        {name}
                    </h4>
                    <FaQuoteRight size={14} className="text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">{role}</p>
                <p className="text-sm text-foreground mt-2 overflow-hidden line-clamp-4">
                  {text}</p>
            </div>
        </div>
    );
};
