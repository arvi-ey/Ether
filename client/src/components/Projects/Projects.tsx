import React, { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { RootState } from '../../../redux/store'
import { useSelector } from 'react-redux';
import useProject from '../../hooks/useProject';
import ProjectBox from './ProjectBox';
import ProjectModal from '../../common/ProjectModal';
import Header from '../../common/Header';
const Projects = () => {
    const Navigate = useNavigate()
    const { getAllProjects } = useProject()
    const projects = useSelector((state: RootState) => state.project.projects);
    const [openModal, setOpenModal] = useState<boolean>(false)



    useEffect(() => {
        getAllProjects()
    }, [])

    const handleOpenModal = (type: string) => {
        if (type == "create") {
            Navigate(`/projects/create`)
        }

    }

    return (
        <div>
            <Header
                heading='All Project'

            />

            <div className='bg-primary text-white gap-4 hover:bg-primarybg cursor-pointer p-3 w-60 rounded-lg flex justify-center items-center'
                onClick={() => handleOpenModal("create")}
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
            <div className='w-full'>
                {
                    openModal &&
                    <ProjectModal
                        open={openModal}
                        header='Create New Project'
                        handleClose={() => setOpenModal(false)}

                    />
                }
            </div>
        </div>
    )
}

export default Projects