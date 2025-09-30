import React from 'react'
import API from '../api/ApiConfig'

const useUser = () => {

    const GetUsersByFilter = async (params: any) => {
        try {
            const result = await API.get(`user/getusers?${params}`)
            return result.data.data
        }
        catch (error) {
            throw error
        }
    }

    return { GetUsersByFilter }
}

export default useUser