import { RemoveUserIcon } from "../icons";

export const RemoveUserButton = ({color, onClick = () => {}}) => {
    const handleClick = (e) => {
        e.stopPropagation();
        onClick();
    }

    return (
        <button onClick={handleClick} className="bg-transparent">
            <RemoveUserIcon color={color} />
        </button>
    );
};