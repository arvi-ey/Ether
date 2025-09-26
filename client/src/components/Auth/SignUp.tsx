import React, { useState } from 'react';
import { Users, Mail, Phone, Lock, Eye, EyeOff, } from 'lucide-react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import toast from "react-hot-toast";
import type User from '../../types/usertype';
import Loader from '../../common/loader';


const SignUp: React.FC = () => {


    const { UserSinUp, loading } = useAuth()
    const [formData, setFormData] = useState<User>({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match!');
            return;
        }
        const payloadData = { ...formData }
        delete payloadData.confirmPassword
        await UserSinUp(payloadData)

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-xl rounded-2xl max-w-md w-full p-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
                    Sign Up
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">

                    <div className="relative">
                        <Users className="absolute top-3 left-3 text-gray-400" size={18} />
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9088F1] focus:border-[#9088F1] transition"
                        />
                    </div>

                    <div className="relative">
                        <Mail className="absolute top-3 left-3 text-gray-400" size={18} />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9088F1] focus:border-[#9088F1] transition"
                        />
                    </div>

                    <div className="relative">
                        <Phone className="absolute top-3 left-3 text-gray-400" size={18} />
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9088F1] focus:border-[#9088F1] transition"
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute top-3 left-3 text-gray-400" size={18} />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9088F1] focus:border-[#9088F1] transition"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-3 right-3 text-gray-400"
                        >
                            {showPassword ? <EyeOff size={18} className='cursor-pointer' /> : <Eye size={18} className='cursor-pointer' />}
                        </button>
                    </div>

                    <div className="relative">
                        <Lock className="absolute top-3 left-3 text-gray-400" size={18} />
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9088F1] focus:border-[#9088F1] transition"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute top-3 right-3 text-gray-400"
                        >
                            {showConfirmPassword ? <EyeOff size={18} className='cursor-pointer' /> : <Eye size={18} className='cursor-pointer' />}
                        </button>
                    </div>
                    {
                        loading ?
                            <div className='w-full flex justify-center items-center'>
                                <Loader />

                            </div> :

                            <button
                                type="submit"
                                className="w-full cursor-pointer py-3 rounded-lg text-white font-semibold transition bg-indigo-500 hover:bg-indigo-600"
                            >
                                Sign Up
                            </button>
                    }

                </form>

                <p className="mt-6 text-center text-gray-500">
                    Already have an account?{' '}
                    <Link to="/auth/signin" className="text-[#9088F1] font-medium hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
