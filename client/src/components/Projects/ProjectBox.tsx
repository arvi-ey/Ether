import React, { type MouseEventHandler } from "react";
import { Edit, Eye, Trash2, Calendar, Clock, BadgePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useProject from "../../hooks/useProject";

interface ProjectBoxProps {
    project: {
        _id?: string;
        name: string;
        desc: string;
        deliveryDate: string;
        startDate: string;
        status: string;
        tasks?: any[];
    };
}

const ProjectBox: React.FC<ProjectBoxProps> = ({ project }) => {
    const Navigate = useNavigate()
    const { deleteProject } = useProject()


    const DeleteProject = async () => {
        if (project._id) {
            await deleteProject(project._id);
        }
    };
    return (
        <div className="bg-white shadow-md rounded-xl p-5 border border-gray-200 hover:shadow-lg transition mb-4"
            key={project?._id}
        >

            <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-800">{project.name}</h3>
                <span
                    className={`px-3 py-1 rounded-full text-xs font-medium
            ${project.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : project.status === "inProgress"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-green-100 text-green-700"
                        }`}
                >
                    {project.status}
                </span>
            </div>


            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.desc}</p>


            <div className="flex items-center text-sm text-gray-500 gap-4 mb-4">
                <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>Start: {new Date(project.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>Delivery: {new Date(project.deliveryDate).toLocaleDateString()}</span>
                </div>
            </div>


            <div className="flex justify-end gap-2">
                <div
                    onClick={() => Navigate(`/projects/${project._id}/tasks`)}

                    className="flex items-center gap-1 px-3 py-1.5 text-sm bg-indigo-600 text-white rounded-lg cursor-pointer hover:bg-indigo-700 transition"
                >
                    <BadgePlus size={16} /> Add Task
                </div>
                <div
                    onClick={() => Navigate(`/projects/${project._id}`)}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm bg-yellow-500 text-white rounded-lg cursor-pointer hover:bg-yellow-600 transition"
                >
                    <Edit size={16} /> Edit
                </div>
                <div
                    onClick={DeleteProject}

                    className="flex items-center gap-1 px-3 py-1.5 text-sm bg-red-500 text-white rounded-lg cursor-pointer hover:bg-red-600 transition"
                >
                    <Trash2 size={16} /> Delete
                </div>
            </div>
        </div>
    );
};

export default ProjectBox;
