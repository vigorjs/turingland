export const CardProperty = ({ children, img, isFullWhenMobile = false }) => {
    const twClass = isFullWhenMobile
        ? "relative w-full aspect-square h-auto sm:w-[287.73px] sm:h-[287.73px] rounded-xl"
        : "relative w-[287.73px] h-[287.73px] rounded-xl";

    return (
        <div className={twClass}>
            <img
                src={img}
                alt={img}
                className="w-full h-full object-cover rounded-xl"
            />

            <div className="absolute bottom-0 p-1.5 w-full">
                <div className="bg-white w-full rounded-xl p-2">{children}</div>
            </div>
        </div>
    );
};
