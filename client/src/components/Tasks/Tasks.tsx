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

import AssignedUserList from '../User/AssignedUserList';


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
        setProjectData(result[0])
    }
    const Gettasks = async (id: string) => {
        await GetTaskByProject(id)

    }


    const demodata = [
        {
            "_id": "68dc1db76875dec20c450b8b",
            "name": "Simran Kaur",
            "email": "simran.kaur@example.com",
            "role": "developer",
            "profileImage": "https://randomuser.me/api/portraits/women/16.jpg",
            "roleForTask": "assignee"
        },
        {
            "_id": "68dc1db76875dec20c450b8c",
            "name": "Arjun Mehta",
            "email": "arjun.mehta@example.com",
            "role": "frontend developer",
            "profileImage": "https://randomuser.me/api/portraits/men/21.jpg",
            "roleForTask": "assignee"
        },
        {
            "_id": "68dc1db76875dec20c450b8d",
            "name": "Priya Sharma",
            "email": "priya.sharma@example.com",
            "role": "UI/UX designer",
            "profileImage": "https://randomuser.me/api/portraits/women/45.jpg",
            "roleForTask": "assignee"
        },
        {
            "_id": "68dc1db76875dec20c450b8e",
            "name": "Ravi Kumar",
            "email": "ravi.kumar@example.com",
            "role": "backend developer",
            "profileImage": "https://randomuser.me/api/portraits/men/34.jpg",
            "roleForTask": "assignee"
        },
        {
            "_id": "68dc1db76875dec20c450b8f",
            "name": "Ayesha Khan",
            "email": "ayesha.khan@example.com",
            "role": "QA engineer",
            "profileImage": "https://randomuser.me/api/portraits/women/22.jpg",
            "roleForTask": "assignee"
        },
        // {
        //     "_id": "68dc1db76875dec20c450b90",
        //     "name": "Vikram Singh",
        //     "email": "vikram.singh@example.com",
        //     "role": "project manager",
        //     "profileImage": "https://randomuser.me/api/portraits/men/47.jpg",
        //     "roleForTask": "report"
        // },
        // {
        //     "_id": "68dc1db76875dec20c450b91",
        //     "name": "Sneha Patel",
        //     "email": "sneha.patel@example.com",
        //     "role": "full stack developer",
        //     "profileImage": "https://randomuser.me/api/portraits/women/11.jpg",
        //     "roleForTask": "assignee"
        // },
        // {
        //     "_id": "68dc1db76875dec20c450b92",
        //     "name": "Karan Joshi",
        //     "email": "karan.joshi@example.com",
        //     "role": "frontend developer",
        //     "profileImage": "https://randomuser.me/api/portraits/men/18.jpg",
        //     "roleForTask": "assignee"
        // },
        // {
        //     "_id": "68dc1db76875dec20c450b93",
        //     "name": "Meena Reddy",
        //     "email": "meena.reddy@example.com",
        //     "role": "content strategist",
        //     "profileImage": "https://randomuser.me/api/portraits/women/28.jpg",
        //     "roleForTask": "report"
        // },
        // {
        //     "_id": "68dc1db76875dec20c450b94",
        //     "name": "Ankit Verma",
        //     "email": "ankit.verma@example.com",
        //     "role": "backend developer",
        //     "profileImage": "https://randomuser.me/api/portraits/men/12.jpg",
        //     "roleForTask": "assignee"
        // },
        // {
        //     "_id": "68dc1db76875dec20c450b95",
        //     "name": "Divya Nair",
        //     "email": "divya.nair@example.com",
        //     "role": "UI/UX designer",
        //     "profileImage": "https://randomuser.me/api/portraits/women/56.jpg",
        //     "roleForTask": "assignee"
        // },
        // {
        //     "_id": "68dc1db76875dec20c450b96",
        //     "name": "Rahul Deshmukh",
        //     "email": "rahul.deshmukh@example.com",
        //     "role": "devops engineer",
        //     "profileImage": "https://randomuser.me/api/portraits/men/38.jpg",
        //     "roleForTask": "assignee"
        // },
        // {
        //     "_id": "68dc1db76875dec20c450b97",
        //     "name": "Ananya Gupta",
        //     "email": "ananya.gupta@example.com",
        //     "role": "QA tester",
        //     "profileImage": "https://randomuser.me/api/portraits/women/30.jpg",
        //     "roleForTask": "assignee"
        // },
        // {
        //     "_id": "68dc1db76875dec20c450b98",
        //     "name": "Harshit Malhotra",
        //     "email": "harshit.malhotra@example.com",
        //     "role": "software engineer",
        //     "profileImage": "https://randomuser.me/api/portraits/men/9.jpg",
        //     "roleForTask": "assignee"
        // },
        // {
        //     "_id": "68dc1db76875dec20c450b99",
        //     "name": "Nisha Pillai",
        //     "email": "nisha.pillai@example.com",
        //     "role": "technical writer",
        //     "profileImage": "https://randomuser.me/api/portraits/women/50.jpg",
        //     "roleForTask": "report"
        // },
        // {
        //     "_id": "68dc1db76875dec20c450b9a",
        //     "name": "Rohit Chauhan",
        //     "email": "rohit.chauhan@example.com",
        //     "role": "frontend developer",
        //     "profileImage": "https://randomuser.me/api/portraits/men/23.jpg",
        //     "roleForTask": "assignee"
        // },
        // {
        //     "_id": "68dc1db76875dec20c450b9b",
        //     "name": "Ishita Das",
        //     "email": "ishita.das@example.com",
        //     "role": "product designer",
        //     "profileImage": "https://randomuser.me/api/portraits/women/60.jpg",
        //     "roleForTask": "assignee"
        // },
        // {
        //     "_id": "68dc1db76875dec20c450b9c",
        //     "name": "Manish Aggarwal",
        //     "email": "manish.aggarwal@example.com",
        //     "role": "full stack developer",
        //     "profileImage": "https://randomuser.me/api/portraits/men/42.jpg",
        //     "roleForTask": "assignee"
        // },
        // {
        //     "_id": "68dc1db76875dec20c450b9d",
        //     "name": "Tanya Bhatia",
        //     "email": "tanya.bhatia@example.com",
        //     "role": "frontend developer",
        //     "profileImage": "https://randomuser.me/api/portraits/women/18.jpg",
        //     "roleForTask": "assignee"
        // },
        // {
        //     "_id": "68dc1db76875dec20c450b9e",
        //     "name": "Amit Sinha",
        //     "email": "amit.sinha@example.com",
        //     "role": "team lead",
        //     "profileImage": "https://randomuser.me/api/portraits/men/48.jpg",
        //     "roleForTask": "report"
        // }
    ]



    return (
        <>
            <Header
                heading={`Tasks of ${projectdata?.projectTitle}`}
                back={true}
            />
            <div className={`w-full`}>
                <span className='font-semibold opacity-80'>Members on boards</span>
                <div className={`flex items-center -space-x-3 mt-2`}>
                    {
                        demodata?.map((data, index) => {
                            return (
                                <AssignedUserList
                                    data={data}
                                    index={index}

                                />
                            )
                        })

                    }
                    {
                        10 > 6 &&

                        <div className='size-10 flex border-2 border-white justify-around items-center text-center bg-hover text-white rounded-full z-50'>
                            <span>
                                +{10 - 6}
                            </span>
                        </div>
                    }

                </div>
            </div>

            <div className='mt-10'>
                <TaskList
                    tasks={tasks}
                    projectId={id}
                    projectdata={projectdata}
                />
            </div>
        </>
    )
}

export default Tasks