import { useState } from "react";
import Input from "../components/Input/Input";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { API_ROUTES } from "../shared/api/api-routes";
function Login() {
    const [checked, setChecked] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        let updatedErrors = { ...errors };

        if (name === "email") {
            if (!value.includes("@") || value.length > 100) {
                updatedErrors.email = "Некоректний email (макс. 100 символів)";
            } else {
                delete updatedErrors.email;
            }
        }

        if (name === "password") {
            if (value.length < 6) {
                updatedErrors.password = "Пароль має містити щонайменше 6 символів";
            } else {
                delete updatedErrors.password;
            }
        }

        setErrors(updatedErrors);
    };

    const validate = () => {
        let errors = {};

        if (!formData.email.includes("@") || formData.email.length > 100) {
            errors.email = "Некоректний email (макс. 100 символів)";
        }
        if (formData.password.length < 6) {
            errors.password = "Пароль має містити щонайменше 6 символів";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsFormSubmitted(true);

        if (validate()) {
            try {
                const payload = {
                    email: formData.email,
                    password: formData.password,
                    role: "teacher"
                };

                console.log("Data being sent:", JSON.stringify(payload));

                const { data } = await axios.post(`http://localhost:4000${API_ROUTES.auth.login}`, payload);
                console.log("Login successful:", data);
                // Handle successful login (e.g., redirect to dashboard)
            } catch (error) {
                console.error("Error sending data:", error.response?.data || error.message);
            }
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <div className="flex items-center" style={{ height: '100vh' }}>
            <form onSubmit={handleSubmit} className="w-full mx-auto rounded-[23px] pt-[50px] max-w-[695px] pb-[95px] bg-[#ffffff] flex flex-col justify-center">
                <h1 className="text-[#141414] font-bold text-[32px] text-center mb-[61px]">Вхід</h1>
                <div className="pl-[52px] pr-[60px] gap-[25px] flex flex-col">
                    <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Електронна пошта"
                        error={isFormSubmitted && errors.email}
                    />
                    <Input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Пароль"
                        error={isFormSubmitted && errors.password}
                    />
                </div>
                <div className="pl-[12px] pr-[50px] mt-[47px] ml-[56px] mr-[60px] text-[#141414] text-[20px] flex justify-between">
                    <div className="flex gap-[26px]">
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                id="checkbox"
                                className="hidden"
                                checked={checked}
                                onChange={() => setChecked(!checked)}
                            />
                            <div
                                className={`w-[32px] h-[32px] border-[1px] rounded-full flex items-center justify-center bg-[#36B889] transition-all ${checked ? "bg-[#36B889] border-[#36B889]" : "border-gray-400"
                                    }`}
                            >
                                {checked ? <div className="w-[15px] h-[15px] bg-white rounded-full"></div> : <div className="w-[29px] h-[29px] bg-white rounded-full"></div>}
                            </div>
                        </label>
                        <label htmlFor="checkbox" className="cursor-pointer">запамʼятати мене</label>
                    </div>
                    <NavLink to="/register">забули пароль?</NavLink>
                </div>
                <button type="submit" className="mx-auto mt-[44px] w-min flex justify-center align-center text-white text-[20px] bg-[#36B889] rounded-[15px] py-[10px] px-[40.5px]">Увійти</button>
            </form>
        </div>
    );
}

export default Login;
