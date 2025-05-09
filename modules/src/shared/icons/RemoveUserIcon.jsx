export const RemoveUserIcon = ({ color }) => {
    const fillColor = color || "#414141";
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.5 19C0.5 16.5147 2.51472 14.5 5 14.5H12C14.4853 14.5 16.5 16.5147 16.5 19V21C16.5 21.2761 16.2761 21.5 16 21.5C15.7239 21.5 15.5 21.2761 15.5 21V19C15.5 17.067 13.933 15.5 12 15.5H5C3.067 15.5 1.5 17.067 1.5 19V21C1.5 21.2761 1.27614 21.5 1 21.5C0.723858 21.5 0.5 21.2761 0.5 21V19Z"
                fill={fillColor}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 7C4 4.51472 6.01472 2.5 8.5 2.5C10.9853 2.5 13 4.51472 13 7C13 9.48528 10.9853 11.5 8.5 11.5C6.01472 11.5 4 9.48528 4 7ZM8.5 3.5C6.567 3.5 5 5.067 5 7C5 8.933 6.567 10.5 8.5 10.5C10.433 10.5 12 8.933 12 7C12 5.067 10.433 3.5 8.5 3.5Z"
                fill={fillColor}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.5 11C16.5 10.7239 16.7239 10.5 17 10.5H23C23.2761 10.5 23.5 10.7239 23.5 11C23.5 11.2761 23.2761 11.5 23 11.5H17C16.7239 11.5 16.5 11.2761 16.5 11Z"
                fill={fillColor}
            />
        </svg>
    );
};
