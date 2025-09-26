
import { useEffect, useState } from 'react';
import API from '../api/ApiConfig'
import type User from "../types/usertype"
import type { Signin } from "../types/usertype";
import { useNavigate } from 'react-router-dom';
import { AddUserdata, ClearUser } from "../../redux/slices/userSlicer"
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from '../../redux/store';
import { AddTeams } from '../../redux/slices/teamsSlicer';


const useAuth = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    const [loading, setLoading] = useState<boolean>(false)


    const UserSinUp = async (payload: User) => {
        setLoading(true)
        try {
            const result = await API.post(`auth/signup`, payload)
            console.log('result', result)

        }
        catch (error) {
            throw error
        }
        finally {
            setLoading(false)
        }
        setTimeout(() => {
            navigate('/auth/signin')
        }, 1000)

    }

    const UserSinIn = async (payload: Signin) => {
        setLoading(true)
        try {
            const result = await API.post(`auth/signin`, payload)
            dispatch(AddUserdata(result.data.data))

        }
        catch (error: any) {
            console.log(error?.message)
        }
        finally {
            setLoading(false)
        }

        navigate('/dashboard')



    }
    const UserSinOut = async () => {
        setLoading(true)
        try {
            const result = await API.post(`auth/signout`)
            dispatch(ClearUser())


        }
        catch (error: any) {
            console.log(error?.message)
        }
        finally {
            setLoading(false)
        }

        navigate('/')


    }

    const GetTeams = async () => {
        setLoading(true)
        try {
            const result = await API.get(`auth/getteams`)
            dispatch(AddTeams(result.data.data))
            return result.data.data
        }
        catch (error: any) {
            console.log(error?.message)
        }
        finally {
            setLoading(false)
        }
    }



    return { UserSinUp, UserSinIn, UserSinOut, loading, GetTeams }
}

export default useAuth