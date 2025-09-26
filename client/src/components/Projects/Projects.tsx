import React, { useEffect } from 'react'
import { Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { RootState } from '../../../redux/store'
import { useSelector } from 'react-redux';
import useProject from '../../hooks/useProject';
import ProjectBox from './ProjectBox';

const Projects = () => {
    const Navigate = useNavigate()
    const { getAllProjects } = useProject()
    const projects = useSelector((state: RootState) => state.project.projects);



    useEffect(() => {
        getAllProjects()
    }, [])

    return (
        <div>
            <div className="pb-3 mb-6 border-b border-gray-200">
                <h1 className="text-2xl font-bold text-gray-700">Projects</h1>
            </div>
            <div className='bg-indigo-600 text-white gap-4 hover:bg-indigo-700 cursor-pointer p-3 w-60 rounded-lg flex justify-center items-center'
                onClick={() => Navigate('/projects/create')}
            >
                <Plus />
                <span className='font-semibold'>
                    Create New Project
                </span>
            </div>
            <div className='flex flex-col mt-2.5'>
                {
                    projects?.length > 0 && projects.map((data, index) => {
                        return (
                            <ProjectBox
                                project={data}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Projects