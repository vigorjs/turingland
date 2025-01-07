export const CardProperty = ({ children, img }) => {
    return (
        <div
            className="relative w-full aspect-square h-auto sm:w-[287.73px] sm:h-[287.73px] rounded-xl"
        >
            <img
                src={img}
                alt={img}
                className="w-full h-full object-cover rounded-xl"
            />

            <div className="absolute bottom-0 p-1.5 w-full">
                <div className="bg-white w-full rounded-xl p-2">
                    {children}
                </div>
            </div>
        </div>
    );
};