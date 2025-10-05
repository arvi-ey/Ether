import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useProject from '../../hooks/useProject'
import Header from '../../common/Header'
import { Building2, ClipboardType, Mail, Phone, Calendar, CalendarOff } from 'lucide-react'



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



const ProjectDetail = () => {
    const { id } = useParams()
    const [projectData, setProjectData] = useState<ProjectDetails>()
    const { getProjectById, getProjectDetails, loading } = useProject()

    useEffect(() => {
        GetProjectData()
    }, [id])


    const GetProjectData = async () => {
        if (id) {
            const data = await getProjectDetails(id)
            setProjectData(data[0])
        }
    }
    const FormatedDate = (val: string) => {
        const date = new Date(val).toLocaleDateString()
        return date
    }


    return (
        <div className="w-full min-h-screen h-full">
            <Header heading={projectData?.projectTitle || ""} back={true} />
            <span className='text-gray-400'>Project Details & Overview</span>
            <div className='w-full h-full mt-3 flex'>
                <div className='w-[100%] h-full items-center flex flex-col gap-4'>
                    {/* company Name */}
                    <div className='w-[100%] bg-white h-auto p-3 rounded-lg shadow-sm'>
                        <div className='flex  items-center gap-4'>
                            <div className='size-15 bg-hoverBg flex rounded-lg justify-center items-center'>
                                <Building2 className='text-primary' size={30} />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <span className='text-xl font-semibold opacity-90'>Company Name</span>
                                <span className=' text-sm  opacity-50'>{projectData?.owner}</span>
                            </div>
                        </div>

                    </div>
                    {/* project details */}
                    <div className='w-[100%] bg-white h-auto p-3 rounded-lg shadow-sm'>
                        <div className='flex  items-center gap-4'>
                            <div className='size-15 bg-hoverBg flex rounded-lg justify-center items-center'>
                                <ClipboardType className='text-primary' size={30} />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <span className='text-xl font-semibold opacity-90'>Description</span>
                                <span className=' text-sm  opacity-50'>{projectData?.desc}</span>
                            </div>
                        </div>

                    </div>

                    <div className='w-full flex gap-5'>

                        {/* pm details */}

                        <div className='flex w-[40%] flex-col p-4 rounded-lg  bg-white shadow-sm'>
                            <p className='text-xl font-semibold'>Project Manager</p>
                            <div className='flex items-center gap-5 p-2 border-b border-b-gray-300'>
                                {
                                    projectData?.manager?.profileImage ?
                                        <div className='border-2 border-primary size-15 rounded-full'>
                                            <img src={projectData?.manager?.profileImage} className='w-full h-full  size-15 rounded-full' /> :
                                        </div>
                                        :
                                        <div className='size-15 rounded-full bg-primary flex justify-center items-center'>
                                            <span className='text-lg text-white'>{projectData?.manager?.name.charAt(0)}</span>

                                        </div>
                                }
                                <div className='flex flex-col gap-2'>
                                    <span className='font-semibold opacity-80'>{projectData?.manager?.name}</span>
                                    <span className='text-xs opacity-70 bg-[#fff2bc] p-1 rounded-xl font-semibold'>{projectData?.manager?.role.toUpperCase()}</span>
                                </div>
                            </div>
                            <div>
                                <div className='flex gap-5 p-2 items-center'>

                                    <div>
                                        <Mail className='text-primary' />
                                    </div>
                                    <span className='opacity-70 font-medium'>
                                        {projectData?.manager?.email}
                                    </span>
                                </div>
                                <div className='flex gap-5 p-2 items-center'>

                                    <div>
                                        <Phone className='text-primary' />
                                    </div>
                                    <span className='opacity-70 font-medium'>
                                        {projectData?.manager?.phone}
                                    </span>
                                </div>

                            </div>

                        </div>


                        {/* timings */}
                        <div className='flex w-[40%] flex-col p-4  rounded-lg  bg-white shadow-sm'>
                            <p className='text-xl font-semibold'>Timings</p>
                            <div className='flex flex-col gap-2.5'>
                                <div className=' p-3'>
                                    <div className='flex gap-5 p-2  items-center'>

                                        <div className='h-10 '>
                                            <Calendar className='text-primary' />
                                        </div>
                                        <div className='flex flex-col gap-2 h-10'>
                                            <span className='opacity-90 font-semibold'>
                                                Start date
                                            </span>
                                            <span className='opacity-60'>
                                                {projectData?.startDate}
                                            </span>
                                        </div>
                                    </div>
                                    <div className='flex gap-5 p-2 items-center'>

                                        <div className='h-10'>
                                            <CalendarOff className='text-primary' />
                                        </div>
                                        <div className='flex flex-col gap-2 h-10'>
                                            <span className='opacity-90 font-semibold'>
                                                End date
                                            </span>
                                            <span className='opacity-60'>
                                                {projectData?.endDate}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectDetail