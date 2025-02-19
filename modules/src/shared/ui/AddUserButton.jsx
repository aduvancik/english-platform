import { AddUserIcon } from "../icons";

export const AddUserButton = ({ color, onClick = () => {} }) => {
    return (
        <button onClick={onClick}  className="bg-transparent">
            <AddUserIcon color={color} />
        </button>
    );
};
