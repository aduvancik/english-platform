export const BasicButton = ({ children, handleClick = () => {} }) => {
    return (
        <button onClick={handleClick} className="bg-[#36b889] p-3 rounded-xl text-white font-bold">
            {children}
        </button>
    );
};
