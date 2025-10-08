import React from "react";
import {
    CalendarDays,
    Clock,
    User,
    Flag,
    Pencil,
    Trash2,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import useTask from "../../hooks/useTask";
import type { Task } from '../../types/tasktypes'

interface TaskProps {
    task: Task,

}

const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    inProgress: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
};

const priorityColors: Record<string, string> = {
    low: "text-green-700",
    medium: "text-yellow-700",
    high: "text-red-700",
};

const TaskBox: React.FC<TaskProps> = ({ task }) => {
    const navigate = useNavigate();
    const { id: projectId } = useParams();
    const { deleteTask } = useTask()

    console.log(task)

    return (
        <div className="flex items-start justify-between w-full p-4 mt-4 bg-white rounded-sm cursor-pointer shadow hover:shadow-md transition"
            key={task._id}
        >

            <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold text-gray-800">{task.name}</h2>


                <div className="flex items-center gap-3">
                    <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[task.status]}`}
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


                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="w-4 h-4" />
                    <span>Assigned: {task.assigned}</span>
                </div>
            </div>
        </div>
    );
};

export default TaskBox;
