import {
    CalendarDays,
    Clock,
    User,
    Flag,
    Pencil,
    Trash2,
} from "lucide-react";
import React from 'react'
import useTask from "../../hooks/useTask";
import { useNavigate } from "react-router-dom";






interface TaskProps {
    task: {
        _id: string;
        name: string;
        priority: "low" | "medium" | "high";
        startTime: string;
        deadline: string;
        status: "pending" | "inProgress" | "completed";
        assigned: string;
    };

}
const MytaskBox: React.FC<TaskProps> = ({ task }) => {
    const { deleteTask } = useTask()
    const Navigate = useNavigate()
    const statusColors: Record<string, string> = {
        pending: "bg-yellow-100 text-yellow-800",
        inProgress: "bg-blue-100 text-blue-800",
        completed: "bg-green-100 text-green-800",
    };

    const priorityColors: Record<string, string> = {
        low: "text-green-600",
        medium: "text-yellow-600",
        high: "text-red-600",
    };

    return (
        <div className="flex items-start justify-between w-full p-4 mt-4 bg-white rounded-2xl shadow hover:shadow-md transition"
            key={task._id}
        >

            <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold text-gray-800">{task.name}</h2>


                <div className="flex items-center gap-3">
                    <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[task.status]}`}
                    >
                        {task.status}
                    </span>
                    <div className="flex items-center gap-1 text-sm">
                        <Flag
                            className={`w-4 h-4 ${priorityColors[task.priority]}`}
                            strokeWidth={2.5}
                        />
                        <span className={priorityColors[task.priority]}>
                            {task.priority}
                        </span>
                    </div>
                </div>


                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                        <CalendarDays className="w-4 h-4" />
                        <span>Start: {new Date(task.startTime).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>
                            Deadline: {new Date(task.deadline).toLocaleDateString()}
                        </span>
                    </div>
                </div>



            </div>


            <div className="flex flex-col gap-2">
                <button
                    onClick={() => Navigate(`/mytasks/${task?._id}`)}

                    className=" cursor-pointer flex items-center gap-1 px-3 py-1.5 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
                >
                    <Pencil className="w-4 h-4" />
                    Edit
                </button>
                <button
                    onClick={() => deleteTask(task._id)}

                    className="cursor-pointer flex items-center gap-1 px-3 py-1.5 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
                >
                    <Trash2 className="w-4 h-4" />
                    Delete
                </button>
            </div>
        </div>
    )
}

export default MytaskBox