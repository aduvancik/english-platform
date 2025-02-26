export const ModalButton = ({ children, handleClick = () => {} }) => {
    return <button onClick={handleClick} className="p-3 bg-[#36b889] rounded-md text-white">{children}</button>;
};
