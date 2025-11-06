import React, { useState } from 'react'
import TaskBox from './TaskBox'
import type { Task } from '../../types/tasktypes'
import { Plus } from 'lucide-react'
import useTask from '../../hooks/useTask'



type taskList = {
    tasks: Task[],
    projectId?: string | undefined,
    projectdata?: any,
    isProject?: boolean
}

const TaskList: React.FC<taskList> = ({ tasks, projectId, projectdata, isProject }) => {

    const { createTask } = useTask()
    const [draggedItem, setDraggedItem] = useState<string | undefined>("")
    const [startDrag, setStartDrag] = useState<string>("")


    const taskStatusArray = [
        {
            label: "Pending",
            value: "pending"
        },
        {
            label: "In progress",
            value: "inProgress"
        },
        {
            label: "Completed",
            value: "completed"
        },
    ]

    const CreateNewTask = async () => {
        const today = new Date();
        // console.log(projectdata)
        const formattedDate = today.toISOString().split('T')[0];
        const obj = {
            name: "",
            description: "",
            priority: 'medium',
            status: 'pending',
            assigned: [],
            startTime: formattedDate,
            deadline: formattedDate,
            project: projectId,
            projectManager: projectdata.projectManager
        }
        // return
        await createTask(obj)
    }



    const { updateTask } = useTask(); // assuming your hook has this

    const handleDrop = async (e: React.DragEvent<HTMLDivElement>, newStatus: string) => {
        e.preventDefault();

        const taskId = e.dataTransfer.getData("taskId");
        const prevStatus = e.dataTransfer.getData("taskStatus");


        if (!taskId || prevStatus === newStatus) return;

        try {
            await updateTask(taskId, { status: newStatus });
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    };


    return (
        <div className='w-full flex justify-around'>

            {
                taskStatusArray?.map((data, index) => {
                    return (

                        <div
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => handleDrop(e, data.value)}
                            key={index} className='h-auto p-3 bg-hoverBg rounded-sm  w-80 flex flex-col '>
                            <span className=' font-semibold opacity-60 cursor-pointer'>
                                {data.label}
                            </span>
                            <div >
                                {
                                    (data.label == "Pending" && projectId) &&
                                    <div className='bg-indigo-600 mt-5 text-white gap-4 hover:bg-indigo-700 cursor-pointer p-3 w-60 rounded-lg flex justify-center items-center'
                                        onClick={CreateNewTask}
                                    >
                                        <Plus />
                                        <span className='font-semibold'

                                        >
                                            Create New Task
                                        </span>
                                    </div>
                                }
                                {
                                    tasks?.map((task,) => {

                                        if (task.status == data.value) {
                                            return (
                                                <TaskBox
                                                    setDraggedItem={setDraggedItem}
                                                    task={task}
                                                    draggedItem={draggedItem}
                                                    isProject={isProject}

                                                />
                                            )
                                        }
                                    })
                                }


                            </div>
                        </div>

                    )
                })
            }


        </div>
    )
}

export default TaskList