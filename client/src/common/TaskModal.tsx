import React, { useEffect, useState } from 'react';
import { Modal, Input, Select, DatePicker, Tag } from 'antd';
import dayjs from 'dayjs';
import { Mail, Phone } from 'lucide-react';

// Define Project Manager type
interface ProjectManager {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    role: string;
    profileImage?: string;
}

// Define Assigned User type
interface AssignedUser {
    _id: string;
    name: string;
    email?: string;
}

// Define Task type
export interface Task {
    _id: string;
    name: string;
    description?: string;
    priority: 'low' | 'medium' | 'high';
    status: 'pending' | 'inProgress' | 'completed';
    startTime: string;
    deadline: string;
    assigned: AssignedUser[];
    projectManager: ProjectManager;
    [key: string]: any;
}

type ModalProps = {
    open: boolean;
    header?: string;
    handleClose?: () => void;
    task?: Task;
};

const { Option } = Select;

const TaskModal: React.FC<ModalProps> = ({ open, header, task, handleClose }) => {
    const [visibleSection, setVisibleSection] = useState({
        name: false,
        description: false,
    });

    const [taskdata, setTaskData] = useState<Task | undefined>(task);

    useEffect(() => {
        setTaskData(task);
    }, [task]);

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
        setTaskData({ ...taskdata, [name]: date ? date.toISOString() : '' });
    };

    const pm = taskdata?.projectManager;

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
                                setTaskData({ ...(taskdata ?? {}), description: e.target.value })
                            }
                            onBlur={() => handleVisibleSection('description', false)}
                        />
                    )}
                </div>

                {/* --- Priority & Status --- */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold opacity-70">Priority</label>
                        <Select
                            value={taskdata?.priority}
                            onChange={(val) => handleSelectChange('priority', val)}
                            className="w-full"
                        >
                            <Option value="low">Low</Option>
                            <Option value="medium">Medium</Option>
                            <Option value="high">High</Option>
                        </Select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold opacity-70">Status</label>
                        <Select
                            value={taskdata?.status}
                            onChange={(val) => handleSelectChange('status', val)}
                            className="w-full"
                        >
                            <Option value="pending">Pending</Option>
                            <Option value="inProgress">In Progress</Option>
                            <Option value="completed">Completed</Option>
                        </Select>
                    </div>
                </div>

                {/* --- Start & Deadline --- */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold opacity-70">Start Time</label>
                        <DatePicker
                            showTime
                            value={taskdata?.startTime ? dayjs(taskdata.startTime) : null}
                            onChange={(date) => handleDateChange('startTime', date)}
                            className="w-full"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold opacity-70">Deadline</label>
                        <DatePicker
                            showTime
                            value={taskdata?.deadline ? dayjs(taskdata.deadline) : null}
                            onChange={(date) => handleDateChange('deadline', date)}
                            className="w-full"
                        />
                    </div>
                </div>

                {/* --- Assigned Users --- */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold opacity-70">Assigned</label>
                    <div className="min-h-[40px] flex flex-wrap gap-2 border rounded-md px-2 py-2 bg-white">
                        {taskdata?.assigned?.length ? (
                            taskdata.assigned.map((user, i) => (
                                <Tag key={i} color="blue">
                                    {user.name || 'Unnamed'}
                                </Tag>
                            ))
                        ) : (
                            <span className="opacity-50 text-sm">No members assigned</span>
                        )}
                    </div>
                </div>

                {/* --- Project Manager Section --- */}
                {pm && (
                    <div className="flex w-[50%] flex-col p-4 rounded-lg bg-white shadow-sm border border-gray-100">
                        <p className="text-xl font-semibold mb-2">Project Manager</p>
                        <div className="flex items-center gap-5 p-2 border-b border-b-gray-300">
                            {pm.profileImage ? (
                                <div className="border-2 border-primary size-15 rounded-full overflow-hidden">
                                    <img
                                        src={pm.profileImage}
                                        alt={pm.name}
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                </div>
                            ) : (
                                <div className="size-15 rounded-full bg-primary flex justify-center items-center">
                                    <span className="text-lg text-white font-semibold">
                                        {pm.name?.charAt(0)}
                                    </span>
                                </div>
                            )}
                            <div className="flex flex-col gap-1">
                                <span className="font-semibold opacity-90">{pm.name}</span>
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
