import { Home, BarChart2, Folder, CheckSquare, Users, LogOut } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import type { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';

interface DashboardLayoutProps {
    heading?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = () => {
    const user = useSelector((state: RootState) => state.user.user);
    const location = useLocation()
    const pathName = location.pathname.substring(1);
    const Navigate = useNavigate()
    const { UserSinOut, loading } = useAuth()



    const sideNavArray = [
        { name: 'Dashboard', path: '/dashboard', icon: <BarChart2 size={20} /> },
        { name: 'Projects', path: '/projects', icon: <Folder size={20} /> },
        { name: 'My Tasks', path: '/mytasks', icon: <CheckSquare size={20} /> },
        { name: 'Logout', path: '/logout', icon: <LogOut size={20} color='red' /> },
    ];

    const Logout = async () => {


        await UserSinOut()

    }


    return (
        <div className="flex h-screen bg-gray-100">

            <aside className="w-64 bg-white shadow-lg flex flex-col border-r-1 border-gray-200">
                <div className="p-6 flex items-center space-x-2 border-b border-gray-200 cursor-pointer" onClick={() => Navigate("/")}>
                    <span className="text-2xl font-bold text-gray-800">{import.meta.env.VITE_APP_NAME}</span>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2">
                    {sideNavArray.map((item) => (
                        <NavLink
                            to={item.path}
                            key={item.name}
                            onClick={(e) => {
                                if (item.path == '/logout') {
                                    e.preventDefault();
                                    Logout()

                                }

                            }}
                            className={({ isActive }) =>
                                `flex items-center px-4 py-3 rounded-lg font-medium text-gray-700 transition-colors duration-200 ${isActive
                                    ? 'bg-primary text-white'
                                    : 'hover:bg-hoverBg hover:text-primary'
                                }`
                            }
                        >
                            {item.icon}
                            <span className={`ml-3 ${item.name == "Logout" && "text-red-600"} `}>{item.name}</span>
                        </NavLink>
                    ))}
                </nav>
                <div className='flex w-full mb-10 pl-3 gap-2'>
                    <div className='size-10 rounded-full text-white bg-indigo-700 flex justify-center items-center'>
                        {user?.name?.charAt(0)}
                    </div>
                    <div className='flex flex-col'>
                        <span className='opacity-80 font-semibold text-sm'>{user?.name}</span>
                        <span className='opacity-60 font-semibold text-sm'>{user?.email}</span>

                    </div>

                </div>


            </aside>

            <main className="flex-1 p-8 overflow-auto bg-white">
                <Outlet />
            </main>

        </div>
    );
};

export default DashboardLayout;
