import React from 'react'
import API from '../api/ApiConfig'
import { useDispatch, } from 'react-redux'
import { RemoveAssignUser, AddAssignedUser, GetAssignedUser } from '../../redux/slices/taskSlicer'

export interface TaskAssign {
    assignee: string,
    task: string,
    delegator: string,
    project: string,
    roleFortask?: string
}

const useAssign = () => {
    const dispatch = useDispatch()


    const AssignTask = async (payload: TaskAssign) => {
        try {
            const result = await API.post(`assign/assigntask`, payload)
            if (result.data.success == true) return result.data.data
        }
        catch (error) {
            throw error

        }
    }

    const GetAssigneeByTask = async (taskId: string) => {
        try {

            const result = await API.get(`assign/getassignee/${taskId}`)
            if (result.data.success == true) return result.data.data
        }
        catch (error) {
            throw error
        }
    }

    type DeleteAssign = {
        assignee: string,
        task: string,
        name: string
    }


    const RemoveAssignee = async (payload: DeleteAssign) => {
        try {
            const result = await API.post(`assign/remove`, payload)
            if (result.data.success == true) return result.data.data
        }
        catch (error) {
            throw error
        }
    }

    const GetAssignuser = async (id: string) => {
        try {
            const result = await API.get(`assign/getusersproject/${id}`)
            if (result.data.success == true) {
                dispatch(GetAssignedUser(result.data))
            }
        }
        catch (error) {

            throw error
        }
    }

    return {
        AssignTask,
        GetAssigneeByTask,
        RemoveAssignee,
        GetAssignuser
    }
}

export default useAssign