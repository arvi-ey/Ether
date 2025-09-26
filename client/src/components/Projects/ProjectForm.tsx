import React, { useState, useEffect, } from 'react';
import type { FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import type { Project } from '../../types/projecttype';
import useProject from '../../hooks/useProject';


const ProjectForm: React.FC = () => {
    const { id } = useParams();
    const isEdit = Boolean(id);

    const { createProject, getProjectById, updateProject, loading } = useProject()

    const [formData, setFormData] = useState<Project>({
        name: '',
        desc: '',
        startDate: '',
        deliveryDate: '',
        status: 'pending',
        tasks: [],
    });


    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (id) {
            getProjectDetails(id)
        }
    }, [id])

    const getProjectDetails = async (id: string) => {
        const result = await getProjectById(id)
        setFormData({
            name: result.name,
            desc: result.desc,
            startDate: result.startDate,
            deliveryDate: result.deliveryDate,
            status: result.status,
            tasks: result.tasks,
        })
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (isEdit) {
            await updateProject(id!, formData)
        }
        else {
            await createProject(formData)
        }

    };

    return (
        <>
            <div className="pb-3 mb-6 border-b border-gray-200">
                <h1 className="text-2xl font-bold text-gray-700">
                    {isEdit ? 'Update Project' : 'Create Project'}
                </h1>
            </div>
            <form onSubmit={handleSubmit} className="w-[90%] mx-auto space-y-4">


                <div>
                    <label className="block mb-1 font-medium">Project Name</label>
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
                    <label className="block mb-1 font-medium">Description</label>
                    <textarea
                        name="desc"
                        value={formData.desc}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Start Date</label>
                    <input
                        type="date"
                        name="startDate"
                        value={formData.startDate.split('T')[0] || ''}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Delivery Date</label>
                    <input
                        type="date"
                        name="deliveryDate"
                        value={formData.deliveryDate.split('T')[0] || ''}
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

                <button
                    type="submit"
                    disabled={loading}
                    className="cursor-pointer px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-70"
                >
                    {loading ? 'Saving...' : isEdit ? 'Update Project' : 'Create Project'}
                </button>
            </form>
        </>
    );
};

export default ProjectForm;
