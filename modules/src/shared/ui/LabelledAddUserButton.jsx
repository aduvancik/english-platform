import { AddUserButton } from "./AddUserButton";

export const LabelledAddUserButton = ({ label }) => {
    return (
        <label className="flex items-center gap-2">
            {label}
            <AddUserButton />
        </label>
    );
};
