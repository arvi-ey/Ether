import React from 'react'
import TaskBox from './TaskBox'
import type { Task } from '../../types/tasktypes'


type taskList = {
    tasks: Task[]
}

const TaskList: React.FC<taskList> = ({ tasks }) => {
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
    console.log(tasks)
    return (
        <div className='w-full flex justify-around'>

            {
                taskStatusArray?.map((data, index) => {
                    return (

                        <div key={index} className='h-auto p-3 bg-hoverBg rounded-sm  w-80 flex flex-col '>
                            <span className=' font-semibold opacity-60 cursor-pointer'>
                                {data.label}
                            </span>
                            <div>

                                {
                                    tasks?.map((task,) => {

                                        if (task.status == data.value) {
                                            return (
                                                <TaskBox
                                                    task={task}

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