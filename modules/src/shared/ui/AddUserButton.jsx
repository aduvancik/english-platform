import { AddUserIcon } from "../icons";

export const AddUserButton = ({ color, onClick = () => {} }) => {

    const handleClick = (e) => {
        e.stopPropagation();
        onClick();
    }

    return (
        <button onClick={handleClick}  className="bg-transparent">
            <AddUserIcon color={color} />
        </button>
    );
};
