import { RemoveUserIcon } from "../icons";

export const RemoveUserButton = ({color}) => {
    return (
        <button className="bg-transparent">
            <RemoveUserIcon color={color} />
        </button>
    );
};