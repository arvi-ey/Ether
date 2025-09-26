import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import Loader from '../../common/loader';
import useAuth from '../../hooks/useAuth';
import type { Signin } from '../../types/usertype';
import { theme } from '../../../theme';

const SignIn: React.FC = () => {

    const [showPassword, setShowPassword] = useState(false);
    const { UserSinIn, loading } = useAuth()
    const [formData, setFormData] = useState<Signin>({
        email: "",
        password: ''
    })


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await UserSinIn(formData)
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white shadow-xl rounded-2xl max-w-md w-full p-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
                    Sign In
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="relative">
                        <Mail className="absolute top-3 left-3 text-gray-400" size={18} />
                        <input
                            type="email"
                            name='email'
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                            required
                            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9088F1] focus:border-[#9088F1] transition"
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute top-3 left-3 text-gray-400" size={18} />
                        <input
                            name='password'
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
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

                    {
                        loading ?
                            <div className='w-full flex justify-center items-center'>
                                <Loader />

                            </div> :

                            <button
                                type="submit"
                                className="w-full cursor-pointer py-3 rounded-lg text-white font-semibold transition bg-indigo-500 hover:bg-indigo-600"
                            >
                                Sign In
                            </button>
                    }
                </form>

                <p className="mt-6 text-center text-gray-500">
                    Don’t have an account?{' '}
                    <Link to="/auth/signup" className="text-[#9088F1] font-medium hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignIn;
