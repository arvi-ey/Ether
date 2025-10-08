import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import useProject from '../../hooks/useProject';
import { Plus } from 'lucide-react';
import TaskBox from './TaskBox';
import Header from '../../common/Header';
import TaskList from './TaskList';
import useTask from '../../hooks/useTask';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../redux/store';


interface ProjectDetails {
    _id: string;
    projectTitle: string;
    desc: string;
    owner: string;
    projectManager: string;
    startDate: string;
    endDate: string;
    status: "pending" | "inprogress" | "completed";
    createdAt: string;
    updatedAt: string;
    manager: {
        _id: string;
        name: string;
        email: string;
        phone: string;
        password: string;
        role: "manager" | "admin" | "developer";
        profileImage: string;
        imagePublicId: string | null;
        createdAt: string;
        updatedAt: string;
    };
}


const Tasks = () => {
    const { id } = useParams();
    const tasks = useSelector((state: RootState) => state.task.tasks)
    const { getProjectById, getProjectDetails } = useProject()
    const { GetTaskByProject } = useTask()
    const [projectdata, setProjectData] = useState<ProjectDetails>()


    const navigate = useNavigate()
    useEffect(() => {
        if (id) {
            GetProjectData(id)
            Gettasks(id)
        }
    }, [id])

    const GetProjectData = async (id: string) => {
        const result = await getProjectDetails(id)
        // setTasks(result.tasks)
        setProjectData(result[0])
    }
    const Gettasks = async (id: string) => {
        await GetTaskByProject(id)

    }


    return (
        <>
            <Header
                heading={`Tasks of ${projectdata?.projectTitle}`}
                back={true}
            />
            <div className='bg-indigo-600 text-white gap-4 hover:bg-indigo-700 cursor-pointer p-3 w-60 rounded-lg flex justify-center items-center'
                onClick={() => navigate(`/projects/${id}/tasks/create`)}
            >
                <Plus />
                <span className='font-semibold'>
                    Create New Task
                </span>
            </div>
            <div className='mt-10'>
                <TaskList tasks={tasks} />
            </div>

        </>
    )
}

export default Tasks