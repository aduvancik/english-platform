import { AddUserIcon } from "../icons";

export const AddUserButton = ({color}) => {
    return (
        <button className="bg-transparent">
            <AddUserIcon color={color} />
        </button>
    );
};