import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import useProject from '../../hooks/useProject';
import { Plus } from 'lucide-react';
import TaskBox from './TaskBox';
import Header from '../../common/Header';


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
    const { getProjectById, getProjectDetails } = useProject()
    // const [tasks, setTasks] = useState([])
    const [projectdata, setProjectData] = useState<ProjectDetails>()
    console.log(id)

    const navigate = useNavigate()
    useEffect(() => {
        if (id) {
            GetProjectData(id)
        }
    }, [id])

    const GetProjectData = async (id: string) => {
        const result = await getProjectDetails(id)
        // setTasks(result.tasks)
        setProjectData(result[0])
    }
    console.log(projectdata)


    return (
        <>
            <Header
                heading={`Tasks of ${projectdata?.projectTitle}`}
            />
            <div className='bg-indigo-600 text-white gap-4 hover:bg-indigo-700 cursor-pointer p-3 w-60 rounded-lg flex justify-center items-center'
                onClick={() => navigate(`/projects/${id}/tasks/create`)}
            >
                <Plus />
                <span className='font-semibold'>
                    Create New Task
                </span>
            </div>

            {/* <div className='flex flex-col'>
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

            </div> */}
        </>
    )
}

export default Tasks