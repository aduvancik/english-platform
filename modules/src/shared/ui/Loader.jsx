import { CircularProgress } from "@mui/material";

export const Loader = () => {
    return (
        <div className="w-full flex justify-center p-3">
            <CircularProgress color="success" />
        </div>
    );
};
