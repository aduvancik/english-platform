export const BasicButton = ({ children, isActive = true, handleClick = () => {} }) => {
    return (
        <button onClick={handleClick} className={`${isActive ? "bg-[#36b889] text-white" : "bg-white text-[#36b889]" } border-2 border-[#36b889] p-3 rounded-xl font-bold`}>
            {children}
        </button>
    );
};
