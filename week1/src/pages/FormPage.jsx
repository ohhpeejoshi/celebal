import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const countries = {
    India: ['Jaipur', 'Mumbai', 'Delhi'],
    USA: ['New York', 'Los Angeles', 'Chicago'],
};

function FormPage() {
    const [form, setForm] = useState({
        firstName: '', lastName: '', username: '', email: '', password: '', phoneCode: '',
        phoneNumber: '', country: '', city: '', pan: '', aadhar: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        if (!form.firstName.trim()) newErrors.firstName = 'First Name is required';
        if (!form.lastName.trim()) newErrors.lastName = 'Last Name is required';
        if (!form.username.trim()) newErrors.username = 'Username is required';
        if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Invalid email';
        if (!form.password) newErrors.password = 'Password is required';
        if (!form.phoneCode || !form.phoneNumber.match(/^[0-9]{10}$/)) newErrors.phoneNumber = 'Valid phone number required';
        if (!form.country) newErrors.country = 'Country required';
        if (!form.city) newErrors.city = 'City required';
        if (!form.pan.match(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)) newErrors.pan = 'Invalid PAN';
        if (!form.aadhar.match(/^[0-9]{12}$/)) newErrors.aadhar = 'Invalid Aadhar number';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            navigate('/success', { state: form });
        }
    };

    const isFormValid = () => {
        return (
            form.firstName &&
            form.lastName &&
            form.username &&
            form.email &&
            form.password &&
            form.phoneCode &&
            form.phoneNumber &&
            form.country &&
            form.city &&
            form.pan &&
            form.aadhar &&
            Object.keys(errors).length === 0
        );
    };

    return (
        <div className="min-h-screen bg-[#0f0f0f] text-white flex justify-center items-center px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-2xl p-8 rounded-2xl bg-[#1a1a1a] shadow-lg space-y-6"
            >
                <h2 className="text-3xl font-semibold text-center text-[#00FFC6]">User Registration</h2>

                <div className="grid md:grid-cols-2 gap-4">
                    <Input name="firstName" placeholder="First Name" value={form.firstName} error={errors.firstName} onChange={handleChange} />
                    <Input name="lastName" placeholder="Last Name" value={form.lastName} error={errors.lastName} onChange={handleChange} />
                    <Input name="username" placeholder="Username" value={form.username} error={errors.username} onChange={handleChange} />
                    <Input name="email" placeholder="Email" value={form.email} error={errors.email} onChange={handleChange} />
                </div>

                <div>
                    <label className="block mb-1 text-sm font-medium">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded bg-[#2a2a2a] text-white border border-[#444]"
                            placeholder="Password"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-2 text-sm text-[#00FFC6]"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <Input name="phoneCode" placeholder="Country Code (e.g. +91)" value={form.phoneCode} error={errors.phoneNumber} onChange={handleChange} />
                    <Input name="phoneNumber" placeholder="Phone Number" value={form.phoneNumber} error={errors.phoneNumber} onChange={handleChange} />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <Select
                        name="country"
                        label="Country"
                        options={Object.keys(countries)}
                        value={form.country}
                        error={errors.country}
                        onChange={(e) => {
                            handleChange(e);
                            setForm((prev) => ({ ...prev, city: '' }));
                        }}
                    />
                    <Select
                        name="city"
                        label="City"
                        options={countries[form.country] || []}
                        value={form.city}
                        error={errors.city}
                        onChange={handleChange}
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <Input name="pan" placeholder="PAN Number" value={form.pan} error={errors.pan} onChange={handleChange} />
                    <Input name="aadhar" placeholder="Aadhar Number" value={form.aadhar} error={errors.aadhar} onChange={handleChange} />
                </div>

                <button
                    type="submit"
                    disabled={!isFormValid()}
                    className="w-full bg-[#00FFC6] text-black py-3 rounded hover:bg-[#00dab0] transition disabled:opacity-40"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

const Input = ({ name, placeholder, value, error, onChange }) => (
    <div>
        <input
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full px-4 py-2 rounded bg-[#2a2a2a] text-white border border-[#444] focus:outline-none"
        />
        {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
);

const Select = ({ name, label, options, value, error, onChange }) => (
    <div>
        <label className="block mb-1 text-sm font-medium">{label}</label>
        <select
            name={name}
            value={value}
            onChange={onChange}
            className="w-full px-4 py-2 rounded bg-[#2a2a2a] text-white border border-[#444]"
        >
            <option value="">Select {label}</option>
            {options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
            ))}
        </select>
        {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
);

export default FormPage;
