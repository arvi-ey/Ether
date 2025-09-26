import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import useProject from '../../hooks/useProject';
import { Plus } from 'lucide-react';
import TaskBox from './TaskBox';

const Tasks = () => {
    const { id } = useParams();
    const { getProjectById, } = useProject()
    const [tasks, setTasks] = useState([])
    const [projectName, setProjectName] = useState()

    const navigate = useNavigate()
    useEffect(() => {
        if (id) {
            getProjectDetails(id)
        }
    }, [id])

    const getProjectDetails = async (id: string) => {
        const result = await getProjectById(id)
        setTasks(result.tasks)
        setProjectName(result.name)
    }


    return (
        <>
            <div className="pb-3 mb-6 border-b border-gray-200">
                <h1 className="text-2xl font-bold text-gray-700">
                    {projectName || " "}
                </h1>
            </div>
            <div className='bg-indigo-600 text-white gap-4 hover:bg-indigo-700 cursor-pointer p-3 w-60 rounded-lg flex justify-center items-center'
                onClick={() => navigate(`/projects/${id}/tasks/create`)}
            >
                <Plus />
                <span className='font-semibold'>
                    Create New Task
                </span>
            </div>

            <div className='flex flex-col'>
                {
                    tasks?.length > 0 && tasks.map((data, index) => {
                        return (
                            <TaskBox
                                task={data}
                                setTasks={setTasks}
                            />
                        )
                    })
                }

            </div>
        </>
    )
}

export default Tasks