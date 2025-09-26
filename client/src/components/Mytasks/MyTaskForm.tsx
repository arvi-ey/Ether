import React, { useState, useEffect, type FormEvent } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useTask from "../../hooks/useTask";

interface User {
    _id: string;
    name: string;
    email: string;
}

interface Project {
    _id: string;
    name: string;
}

interface TaskFormData {
    name: string;
    priority: "low" | "medium" | "high";
    startTime: string;
    deadline: string;
    status: "pending" | "inProgress" | "completed";
    assigned: User | null;
    project: Project | null;
}

const MyTaskForm: React.FC = () => {
    const { taskid } = useParams();
    const isEdit = Boolean(taskid);

    const { GetTeams } = useAuth();
    const { createTask, getTaskById, updateTask, loading } = useTask();

    const [users, setUsers] = useState<User[]>([]);
    const [projects, setProjects] = useState<Project[]>([]); // if you need project selection

    const [formData, setFormData] = useState<TaskFormData>({
        name: "",
        priority: "medium",
        startTime: "",
        deadline: "",
        status: "pending",
        assigned: null,
        project: null,
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectUser = (userId: string) => {
        const selected = users.find((u) => u._id === userId) || null;
        setFormData((prev) => ({ ...prev, assigned: selected }));
    };

    const handleSelectProject = (projectId: string) => {
        const selected = projects.find((p) => p._id === projectId) || null;
        setFormData((prev) => ({ ...prev, project: selected }));
    };

    useEffect(() => {
        const fetchUsers = async () => {
            const result = await GetTeams();
            setUsers(result);
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        if (isEdit && taskid) getTaskDetails(taskid);
    }, [taskid]);

    const getTaskDetails = async (id: string) => {
        const result = await getTaskById(id);
        setFormData({
            name: result.name,
            priority: result.priority,
            startTime: result.startTime,
            deadline: result.deadline,
            status: result.status,
            assigned: result.assigned || null,
            project: result.project || null,
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const payload = {
            ...formData,
            assigned: formData.assigned?._id,
            project: formData.project?._id,
        };

        if (isEdit && taskid) {
            await updateTask(taskid, payload);
        } else {
            await createTask(payload);
        }
    };

    return (
        <>
            <div className="pb-3 mb-6 border-b border-gray-200">
                <h1 className="text-2xl font-bold text-gray-700">
                    {isEdit ? "Update Task" : "Create Task"}
                </h1>
            </div>

            <form onSubmit={handleSubmit} className="w-[90%] mx-auto space-y-4">
                {/* Task Name */}
                <div>
                    <label className="block mb-1 font-medium">Task Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded"
                    />
                </div>

                {/* Priority */}
                <div>
                    <label className="block mb-1 font-medium">Priority</label>
                    <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>

                {/* Start Time */}
                <div>
                    <label className="block mb-1 font-medium">Start Time</label>
                    <input
                        type="date"
                        name="startTime"
                        value={formData.startTime.split("T")[0] || ""}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded"
                    />
                </div>

                {/* Deadline */}
                <div>
                    <label className="block mb-1 font-medium">Deadline</label>
                    <input
                        type="date"
                        name="deadline"
                        value={formData.deadline.split("T")[0] || ""}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded"
                    />
                </div>

                {/* Status */}
                <div>
                    <label className="block mb-1 font-medium">Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    >
                        <option value="pending">Pending</option>
                        <option value="inProgress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                {/* Assign To */}
                <div>
                    <label className="block mb-1 font-medium">Assign To</label>
                    <select
                        name="assigned"
                        value={formData.assigned?._id || ""}
                        onChange={(e) => handleSelectUser(e.target.value)}
                        className="w-full border p-2 rounded"
                    >
                        <option value="">Select User</option>
                        {users.map((user) => (
                            <option key={user._id} value={user._id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Project */}
                <div>
                    <label className="block mb-1 font-medium">Project</label>
                    <select
                        name="project"
                        value={formData.project?._id || ""}
                        onChange={(e) => handleSelectProject(e.target.value)}
                        className="w-full border p-2 rounded"
                    >
                        <option value="">Select Project</option>
                        {projects.map((p) => (
                            <option key={p._id} value={p._id}>
                                {p.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="cursor-pointer px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-70"
                >
                    {loading ? "Saving..." : isEdit ? "Update Task" : "Create Task"}
                </button>
            </form>
        </>
    );
};

export default MyTaskForm;
