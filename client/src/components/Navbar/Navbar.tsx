import React from 'react';
import { NavLink, } from 'react-router-dom';
import { Home, LogIn, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { theme } from '../../../theme';

const Navbar: React.FC = () => {
    const Navigate = useNavigate()
    const NavArray = [
        { name: 'Sign In', path: '/auth/signin', },
        { name: 'Get started', path: '/auth/signup', },
    ];

    return (
        <nav className="text-black p-4 shadow-md sticky top-0 z-50 bg-white" >
            <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap">

                <div className="flex items-center space-x-2 cursor-pointer" onClick={() => Navigate("/")} >
                    <span className="text-xl font-semibold">{import.meta.env.VITE_APP_NAME}</span>
                </div>
                <div className="flex space-x-6 items-center">
                    <div className=' opacity-90 h-10 w-30 flex justify-center items-center cursor-pointer   rounded-lg font-semibold'
                        onClick={() => Navigate("/auth/signin")}
                    >
                        Sign In
                    </div>
                    <div className='opacity-90 flex justify-center text-white font-semibold rounded-lg items-center h-10 w-30 cursor-pointer'

                        style={{ background: theme.Gradient }}
                        onClick={() => Navigate("/auth/signup")}
                    >
                        Get Started

                    </div>
                </div>
            </div>
        </nav >
    );
};

export default Navbar;
