import React, { useState } from 'react'
import API from '../api/ApiConfig'
import { useDispatch } from 'react-redux'
import { AddUserdata } from '../../redux/slices/userSlicer'

const useUser = () => {

    const dispatch = useDispatch()

    const GetUsersByFilter = async (params: any) => {
        try {
            const result = await API.get(`user/getusers?${params}`)
            return result.data.data
        }
        catch (error) {
            throw error
        }
    }

    const UpDateUser = async (payload: FormData, userId: string) => {

        try {
            const result = await API.patch(`user/updateuser/${userId}`, payload)
            dispatch(AddUserdata(result.data.data))
            return result.data.data
        }
        catch (error) {
            throw error
        }

    }

    return { GetUsersByFilter, UpDateUser }
}

export default useUser