import { AddUserButton } from "./AddUserButton";

export const LabelledAddUserButton = ({ label, color = "#000000", customStyles = "" }) => {
    return (
        <label className={`flex items-center gap-2 cursor-pointer ${customStyles}`} style={{ color: color }}>
            {label}
            <AddUserButton color={color} />
        </label>
    );
};
