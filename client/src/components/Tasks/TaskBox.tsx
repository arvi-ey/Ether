import React, { useState } from "react";
import {
    CalendarDays,
    Clock,
    User,
    Flag,
    Pencil,
    Trash2,
    Trash,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import useTask from "../../hooks/useTask";
import type { Task } from '../../types/tasktypes'
import TaskModal from "../../common/TaskModal";
import { useRef } from "react";

interface TaskProps {
    task: any,
    setDraggedItem?: any,
    draggedItem?: string,
    startDrag?: string,
    setStartDrag?: any


}

const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    inProgress: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
};


const TaskBox: React.FC<TaskProps> = ({ task, setDraggedItem, draggedItem, startDrag, setStartDrag }) => {
    const navigate = useNavigate();
    const { id: projectId } = useParams();
    const { deleteTask } = useTask()
    const [opentaskModal, setOpentaskModal] = useState<boolean>(false)



    const HandleOpentaskModal = () => {
        setOpentaskModal(true)
    }

    const HandleCloseModal = () => {
        setOpentaskModal(false)
    }
    const HandleDragItem = (e: any, task: any) => {
        e.dataTransfer.setData("taskId", task._id);
        e.dataTransfer.setData("taskStatus", task.status);
        e.dataTransfer.effectAllowed = "move";
        setStartDrag(task._id)
    }
    const HandleDrop = (e: any) => {

    }

    return (
        <>
            <div
                draggable={true}
                onDragStart={(e) => HandleDragItem(e, task)}
                // onDragEnd={() => setStartDrag("")}
                onDrop={(e) => HandleDrop(e)}

                className={`flex items-start justify-between w-full p-4 mt-4 bg-white rounded-sm cursor-pointer shadow hover:shadow-md transition ${startDrag == task._id ? "opacity-0" : "opacity-100"}`}
                key={task._id}
                onClick={HandleOpentaskModal}

            >

                <div className="flex flex-col gap-2">
                    {
                        task.projectDetails &&
                        <p className="text-lg font-semibold opacity-60 text-gray-800">{task.projectDetails.projectTitle}</p>
                    }

                    <span className={`font-medium text-center w-20 ${task.priority == 'high' ? "bg-amber-400" : task.priority == "medium" ? "bg-blue-400" : "bg-green-400"} p-1 rounded-sm`}>
                        {task.priority?.toUpperCase()}
                    </span>

                    <p className="text-lg font-semibold opacity-90 text-gray-800">{task.name}</p>


                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                            <CalendarDays className="w-4 h-4" />
                            <span>Start: {new Date(task.startTime).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>
                                    Deadline: {new Date(task.deadline).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {opentaskModal &&
                <TaskModal
                    open={opentaskModal}
                    handleClose={HandleCloseModal}
                    task={task}
                    projectId={projectId}
                />
            }
        </>
    );
};

export default TaskBox;
