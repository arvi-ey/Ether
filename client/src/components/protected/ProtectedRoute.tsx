
import { Navigate, Outlet } from 'react-router-dom'

import Loader from '../../common/loader'
import useCheckAuth from '../../hooks/useCheckAuth'

const ProtectedRoute = () => {
    const { checkAuthLoading, userData } = useCheckAuth()

    if (checkAuthLoading) {
        return (
            <div className='w-ful h-full flex justify-around items-center'>
                <Loader />
            </div>
        )
    }

    return userData?._id ? <Outlet /> : <Navigate to="/auth/signin" replace />;
}

export default ProtectedRoute