import { AddUserdata, ClearUser } from "../../redux/slices/userSlicer"
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from '../../redux/store';
import type { RootState } from '../../redux/store';
import axios from 'axios'
import { useEffect, useState } from "react";
import type User from "../types/usertype"

const useCheckAuth = () => {
    const dispatch = useDispatch<AppDispatch>()
    const user = useSelector((state: RootState) => state.user.user);
    const [userData, setUserData] = useState<User>()
    const [checkAuthLoading, setCheckAuthLoading] = useState<boolean>(true)


    useEffect(() => {
        if (!user) {
            CheckAuth();
        }
        if (user) {
            console.log("Thiss1111111")
            setUserData(user)
            setCheckAuthLoading(false)
        }
    }, [dispatch, user]);

    const CheckAuth = async () => {
        setCheckAuthLoading(true)
        try {
            const result = await axios.get(`http://localhost:5000/api/v1/auth/checkauth`, { withCredentials: true, })
            dispatch(AddUserdata(result.data.data))
            setUserData(result.data.data)

        }
        catch (error: any) {
            console.log(error?.message)
            dispatch(ClearUser());

        }
        finally {
            setCheckAuthLoading(false)
        }

    }

    return { userData, checkAuthLoading }
}

export default useCheckAuth