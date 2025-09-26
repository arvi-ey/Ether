import React, { useState, useEffect, type FormEvent } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useTask from "../../hooks/useTask";

const TaskForm: React.FC = () => {
    const { id, taskid } = useParams();

    const isEdit = Boolean(taskid);

    const { GetTeams } = useAuth()
    const { createTask, getTaskById, updateTask, loading } = useTask()


    const [users, setUsers] = useState([

    ]);

    const [formData, setFormData] = useState({
        name: "",
        priority: "medium",
        startTime: "",
        deadline: "",
        status: "pending",
        assigned: "",
        project: id || "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
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

    const getTaskDetails = async (taskId: string) => {
        const result = await getTaskById(taskId);
        setFormData({
            name: result.name,
            priority: result.priority,
            startTime: result.startTime,
            deadline: result.deadline,
            status: result.status,
            assigned: result.assigned,
            project: result.project,
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (isEdit && taskid) {
            await updateTask(taskid, formData);
        } else {
            await createTask(formData);
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

                <div>
                    <label className="block mb-1 font-medium">Assign To</label>
                    <select
                        name="assigned"
                        value={formData.assigned}
                        onChange={handleChange}
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

export default TaskForm;
