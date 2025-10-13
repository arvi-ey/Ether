import React, { useEffect, useRef, useState } from 'react';
import { Modal, Input, Select, DatePicker, Tag } from 'antd';
import dayjs from 'dayjs';
import { Trash, Trash2 } from 'lucide-react';
import useUser from '../hooks/useUser';
import Dropdown from './TeamDropdown';
import useAssign from '../hooks/useAssign';
import type { TaskAssign } from "../hooks/useAssign";
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import StatusDropDown from './StatusDropDown';
interface ProjectManager {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    role: string;
    profileImage?: string;
}


interface AssignedUser {
    _id: string;
    name?: string;
    email?: string;
}


export interface Task {
    _id: string;
    name: string;
    description?: string;
    priority: 'low' | 'medium' | 'high';
    status: 'pending' | 'inProgress' | 'completed';
    startTime: string;
    deadline: string;
    assigned: AssignedUser[] | string[];
    projectManager: ProjectManager;
    [key: string]: any;
}

type ModalProps = {
    open: boolean;
    header?: string;
    handleClose?: () => void;
    task?: Task;
    projectId: string | undefined
};


type AssignedViewList = {
    _id: string;
    name?: string;
    profileImage?: string

}

type AssignMemberlist = AssignedViewList[]

const { Option } = Select;

const TaskModal: React.FC<ModalProps> = ({ open, header, task, handleClose, projectId }) => {
    const [visibleSection, setVisibleSection] = useState({
        name: false,
        description: false,
        status: false,
        priority: false
    });
    const user = useSelector((state: RootState) => state.user.user);
    const { AssignTask, GetAssigneeByTask, RemoveAssignee } = useAssign()
    const selectStatusRef = useRef<HTMLSelectElement>(null);

    const [taskdata, setTaskData] = useState<Task | undefined>({
        _id: "",
        name: "",
        description: "",
        priority: 'medium',
        status: 'pending',
        startTime: "",
        deadline: "",
        assigned: [],
        projectManager: {
            _id: "",
            name: "",
            email: "",
            phone: "",
            role: "",
            profileImage: ""
        },

    });
    const [teams, setTeams] = useState([])
    const { GetUsersByFilter } = useUser()
    const [assignedMembers, setAssignNedMembers] = useState<AssignMemberlist>([])

    useEffect(() => {
        setTaskData(task);
        GetTeams()
        GetAssignedMembers()
    }, [task]);

    const statusBg = taskdata?.status === "completed"
        ? "#0052CC"
        : taskdata?.status === "inProgress"
            ? "#FFAB00"
            : taskdata?.status === "pending"
                ? "#E0115F"
                : "";

    const priorityColor = taskdata?.priority === "high"
        ? "#DE350B"
        : taskdata?.priority === "medium"
            ? "#FF8B00"
            : taskdata?.priority === "low"
                ? "#36B37E"
                : "";


    const GetAssignedMembers = async () => {
        const result = await GetAssigneeByTask(task!._id)
        console.log(result)
        setAssignNedMembers(result)
    }

    const GetTeams = async () => {
        const params = new URLSearchParams({
            role: "developer",
        });
        const data = await GetUsersByFilter(params)
        setTeams(data)

    }

    useEffect(() => {
        if (visibleSection.status && selectStatusRef.current) {
            selectStatusRef.current.focus();
        }
    }, [visibleSection.status]);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (!taskdata) return;
        setTaskData({ ...taskdata, [name]: value });
    };

    const handleVisibleSection = (name: string, val: boolean) => {
        setVisibleSection({ ...visibleSection, [name]: val });
    };

    const handleSelectChange = (name: keyof Task, value: string) => {
        if (!taskdata) return;
        setTaskData({ ...taskdata, [name]: value });
    };

    const handleDateChange = (name: keyof Task, date: dayjs.Dayjs | null) => {
        if (!taskdata) return;
        console.log(date)
        setTaskData({ ...taskdata, [name]: date ? date.toISOString() : '' });
    };

    const pm = taskdata?.projectManager;

    const SetMemberDropDown = async (value: any) => {

        const payload: TaskAssign = {
            assignee: value._id,
            task: taskdata!._id,
            delegator: user!._id!,
            project: projectId!
        }

        const result = await AssignTask(payload)
        if (result) {

            setAssignNedMembers([...assignedMembers, result])
        }
    }


    const projectStatus = [
        {
            label: "In progress",
            value: "inProgress",
            color: "#00FFAE"
        },
        {
            label: "Pending",
            value: "pending",
            color: "#FF00C3"
        },
        {
            label: "Completed",
            value: "completed",
            color: "#00AEFF"
        },
    ]
    const priorityList = [
        {
            label: "HIGH",
            value: "high",
            color: "#00FFAE"
        },
        {
            label: "Medium",
            value: "medium",
            color: "#FF00C3"
        },
        {
            label: "Low",
            value: "low",
            color: "#00AEFF"
        },
    ]


    const RemoveAssign = async (id: string, name: string) => {
        const payload = {
            assignee: id,
            task: taskdata!._id,
            name
        }
        const result = await RemoveAssignee(payload)
        setAssignNedMembers((prev) => prev.filter(data => data._id !== result.assignee))
    }


    const HandleSelectProjectStatus = (value: 'pending' | 'inProgress' | 'completed') => {
        setTaskData({ ...taskdata, status: value })

        handleVisibleSection('status', false)
    }
    const HandleSelectProjectpriority = (value: 'low' | 'medium' | 'high') => {
        setTaskData({ ...taskdata, priority: value })

        handleVisibleSection('priority', false)
    }




    return (
        <Modal
            title={header || 'Task Details'}
            closable
            open={open}
            onCancel={handleClose}
            footer={null}
            width="75%"
        >
            <div className="w-[95%] flex flex-col gap-6 mx-auto mt-2">

                {/* --- Task Name --- */}
                <div>
                    {!visibleSection.name ? (
                        <div
                            className="w-full text-2xl font-semibold opacity-80 hover:bg-hoverBg p-2 rounded-md cursor-pointer transition-all"
                            onClick={() => handleVisibleSection('name', true)}
                        >
                            {taskdata?.name || 'Untitled Task'}
                        </div>
                    ) : (
                        <Input
                            id="name"
                            name="name"
                            value={taskdata?.name}
                            autoFocus
                            placeholder="Task Name"
                            className="w-full text-2xl font-semibold opacity-90 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                            style={{ fontSize: "22px" }}
                            onChange={handleInputChange}
                            onBlur={() => handleVisibleSection('name', false)}
                        />
                    )}
                </div>

                {/* --- Description --- */}
                <div>
                    {!visibleSection.description ? (
                        <div
                            className="w-full text-sm font-medium opacity-80 hover:bg-hoverBg p-2 rounded-md cursor-pointer transition-all"
                            onClick={() => handleVisibleSection('description', true)}
                        >
                            {taskdata?.description || 'Add description...'}
                        </div>
                    ) : (
                        <Input.TextArea
                            id="description"
                            name="description"
                            rows={3}
                            value={taskdata?.description}
                            autoFocus
                            placeholder="Task description..."
                            className="w-full font-medium opacity-80 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                            onChange={(e) =>
                                setTaskData({ ...(taskdata || {}), description: e.target.value } as Task)
                            }
                            onBlur={() => handleVisibleSection('description', false)}
                        />
                    )}
                </div>

                {/* --- Priority & Status --- */}
                <div className="grid grid-cols-2 gap-4">


                    <div className="flex flex-col gap-1">
                        {visibleSection.status === false ?
                            <span className='w-30 cursor-pointer text-center rounded-lg p-1 font-semibold text-white'
                                style={{ backgroundColor: statusBg }}
                                onClick={() => {
                                    // selectStatusRef.current?.focus()
                                    handleVisibleSection('status', true)

                                }
                                }

                            >{taskdata?.status}</span>
                            :
                            <StatusDropDown
                                name="status"
                                value={taskdata?.status}
                                placeholder="Select status"
                                style="transition-all duration-200 font-medium text-lg w-full p-3 rounded-lg border  hover:bg-white focus:ring-1 focus:ring-primary outline-none border border-gray-300"
                                setdropDownValue={HandleSelectProjectStatus}
                                options={projectStatus}
                                show={visibleSection.status}

                            />
                        }
                    </div>
                    <div className="flex flex-col gap-1">
                        {visibleSection.priority === false ?
                            <span className='w-30 cursor-pointer text-center rounded-lg p-1 font-semibold text-white'
                                style={{ backgroundColor: priorityColor }}
                                onClick={() => {
                                    // selectStatusRef.current?.focus()
                                    handleVisibleSection('priority', true)

                                }
                                }

                            >{taskdata?.priority}</span>
                            :
                            <StatusDropDown
                                name="priority"
                                value={taskdata?.priority}
                                placeholder="Select priority"
                                style="transition-all duration-200 font-medium text-lg w-full p-3 rounded-lg border  hover:bg-white focus:ring-1 focus:ring-primary outline-none border border-gray-300"
                                setdropDownValue={HandleSelectProjectpriority}
                                options={priorityList}
                                show={visibleSection.priority}

                            />
                        }
                    </div>
                </div>



                {/* --- Assigned Users --- */}
                <div className="flex flex-col gap-1">
                    <div className="min-h-[40px] flex flex-wrap gap-4  rounded-md px-2 py-2 bg-white">
                        <Dropdown
                            name='assignedmember'
                            value=""
                            placeholder="Asssign member"
                            options={teams}
                            style="transition-all duration-200 font-medium text-lg w-full p-3 rounded-lg border-none  hover:bg-white focus:ring-1 focus:ring-primary outline-none "
                            SetUserObject={SetMemberDropDown}

                        />
                        {
                            assignedMembers?.map((data, index) => {
                                return (
                                    <div className='flex p-2 items-center gap-2 bg-hoverBg rounded-2xl '>
                                        <div>
                                            {data.profileImage ? (
                                                <div className="border-2 border-primary size-8 rounded-full overflow-hidden">
                                                    <img
                                                        src={data.profileImage}
                                                        alt={data.name}
                                                        className="w-full h-full object-cover rounded-full"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="size-8 rounded-full bg-primary flex justify-center items-center">
                                                    <span className="text-lg text-white font-semibold">
                                                        {data.name?.charAt(0)}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <div className='font-semibold opacity-60'>
                                            {data.name}
                                        </div>
                                        <div className='cursor-pointer'
                                            onClick={() => RemoveAssign(data._id, data.name!)}
                                        >
                                            <Trash2 size={15} className='text-red-700 opacity-70 font-bold' />
                                        </div>
                                    </div>
                                )

                            })
                        }

                    </div>
                </div>


                {pm && (
                    <div className="flex w-[50%] flex-col p-4 rounded-lg">
                        <p className="text-lg opacity-60 font-semibold mb-2">Report to</p>
                        <div className="flex items-center gap-5 p-2 ">
                            {pm.profileImage ? (
                                <div className="border-2 border-primary size-8 rounded-full overflow-hidden">
                                    <img
                                        src={pm.profileImage}
                                        alt={pm.name}
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                </div>
                            ) : (
                                <div className="size-8 rounded-full bg-primary flex justify-center items-center">
                                    <span className="text-lg text-white font-semibold">
                                        {pm.name?.charAt(0)}
                                    </span>
                                </div>
                            )}
                            <div className="flex flex-col gap-1">
                                <span className="font-bold text-sm opacity-70">{pm.name}</span>
                                <span className="text-xs opacity-70 bg-[#fff2bc] px-2 py-1 rounded-xl font-semibold w-fit">
                                    {pm.role?.toUpperCase()}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default TaskModal;
