import { useEffect, useState } from "react";

const NotificationMessage = ({ message, boolean }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setVisible(true);
            const timer = setTimeout(() => setVisible(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    if (!visible) return null;

    return (
        <div className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 ${boolean ? "bg-green-500" : "bg-red-500"} text-white px-4 py-2 rounded-md shadow-lg z-50`}>
            {message}
        </div>
    );
};

export default NotificationMessage;
