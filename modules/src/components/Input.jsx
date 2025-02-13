import PropTypes from 'prop-types';

function Input({ type, name, value, onChange, placeholder, className, error }) {
    return (
        <div className="flex flex-col w-full">
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                style={{ placeholderColor: '#A9A9A9' }}
                className={`w-full border-[#36B889] border-[1px] rounded-[15px] text-[20px] px-[10px] h-[60px] py-[14px] ${className} ${error ? 'border-red-500' : ''}`}
            />
            {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
        </div>
    );
}

Input.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    className: PropTypes.string,
    error: PropTypes.string,  // Accept error message as a string
};

export default Input;
