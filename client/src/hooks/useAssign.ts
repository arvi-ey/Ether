import React from 'react'
import API from '../api/ApiConfig'


export interface TaskAssign {
    assignee: string,
    task: string,
    delegator: string,
    project: string,
    roleFortask?: string
}

const useAssign = () => {


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

    return {
        AssignTask,
        GetAssigneeByTask,
        RemoveAssignee
    }
}

export default useAssign