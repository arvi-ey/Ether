import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { RootState } from '../../../redux/store'
import { useSelector } from 'react-redux';
import useProject from '../../hooks/useProject';
import ProjectBox from './ProjectBox';
import { projectStatus } from '../../common/status';
import Header from '../../common/Header';
import StatusBar from './StatusBar';
import Skeleton from '@mui/material/Skeleton';
const Projects = () => {
    const Navigate = useNavigate()
    const { getAllProjects, loading } = useProject()
    const projects = useSelector((state: RootState) => state.project.projects);
    const [statusbar, setStatusBar] = useState<string>("")


    useEffect(() => {
        GetStatusBarData()
    }, [])


    const GetStatusBarData = () => {
        const value = sessionStorage.getItem("statusBar");
        if (value) setStatusBar(value)
        else setStatusBar("inprogress")
    }

    useEffect(() => {
        const params = new URLSearchParams({
            status: statusbar
        })
        GetProjects(params)
    }, [statusbar])

    const handleOpenModal = (type: string) => {
        if (type == "create") {
            Navigate(`/projects/create`)
        }
    }

    const GetProjects = async (params: URLSearchParams) => {
        await getAllProjects(params)
    }

    const HandleSelectStatusbar = (value: string) => {
        setStatusBar(value)
        sessionStorage.setItem("statusBar", value)
        GetStatusBarData()

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
            <div className={`w-[40%] border-b border-gray-300 py-2.5  flex gap-5 mt-5`} >
                {
                    projectStatus?.map((data, index) => {
                        return (
                            <StatusBar
                                data={data}
                                index={index}
                                statusbar={statusbar}
                                HandleSelectStatusbar={HandleSelectStatusbar}
                            />
                        )
                    })
                }

            </div>
            {
                loading &&

                <div className='w-full grid lg:grid-cols-3  md:grid-cols-2 gap-4 mt-5' >
                    {
                        Array.from({ length: 8 }).map(() => {
                            return (
                                <div className='rounded-xl p-5 h-auto  mb-4 max-w-96 '>
                                    <Skeleton
                                        sx={{ width: '100%', height: 300, borderRadius: 2 }}
                                        variant="rectangular"
                                        animation="wave"

                                    />
                                </div>
                            )
                        })
                    }
                </div>
            }


            <div className='w-full grid lg:grid-cols-3  md:grid-cols-2 gap-4 mt-5' >
                {
                    projects?.length > 0 && projects.map((data) => {
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