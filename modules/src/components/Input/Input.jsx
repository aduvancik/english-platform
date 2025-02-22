function Input({ id, type, name, value, onChange, placeholder, className, error }) {
    return (
        <div className="flex flex-col w-full">
            <input
                id={id}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                style={{ placeholderColor: '#A9A9A9' }}
                className={`${className} w-full border-[#36B889] border-[1px] rounded-[15px] text-[20px] px-[10px] h-[60px] py-[14px] ${className} ${error ? 'border-red-500' : ''}`}
            />
            {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
        </div>
    );
}



export default Input;
