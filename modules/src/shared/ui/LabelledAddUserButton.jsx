import { AddUserButton } from "./AddUserButton";

export const LabelledAddUserButton = ({ label, color = "#000000", customStyles = "", onClick = () => {} }) => {
    return (
        <label className={`flex items-center gap-2 cursor-pointer ${customStyles}`} style={{ color: color }}>
            {label}
            <AddUserButton onClick={onClick} color={color} />
        </label>
    );
};
