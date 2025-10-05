import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../common/Header";
import Dropdown from "../../common/TeamDropdown";
import StatusDropDown from "../../common/StatusDropDown";

import useUser from '../../hooks/useUser';
import useProject from "../../hooks/useProject";



const ProjectForm = () => {
    const { id } = useParams();
    const { GetUsersByFilter } = useUser()
    const [managers, setManagers] = useState([])
    const { createProject, loading, deleteProject, updateProject, getProjectById } = useProject()

    const projectStatus = [
        {
            label: "In progress",
            value: "inprogress",
            color: "#00FFAE"
        },
        {
            label: "Pending",
            value: "pending",
            color: "#FF00C3"
        },
        {
            label: "Completed",
            value: "completed",
            color: "#00AEFF"
        },
    ]


    const [formdata, setFormData] = useState({
        projectTitle: "",
        desc: "",
        owner: "",
        projectManager: "",
        startDate: "",
        endDate: "",
        status: "pending"
    });

    useEffect(() => {
        getManegers()
    }, [])
    useEffect(() => {
        GetProjectData()
    }, [id])


    const GetProjectData = async () => {
        if (id) {
            const data = await getProjectById(id)
            setFormData(data)
        }
    }

    const getManegers = async () => {
        const params = new URLSearchParams({
            role: "manager",
        });
        const data = await GetUsersByFilter(params)
        setManagers(data)

    }



    const HandleSelectProjectmanager = (value: string) => {
        setFormData({ ...formdata, projectManager: value })
    }
    const HandleSelectProjectStatus = (value: string) => {
        setFormData({ ...formdata, status: value })
    }

    const HandleCreateProject = async () => {
        const result = await createProject(formdata)
    }
    const HandleUpdatetask = async () => {
        if (id) {
            const result = await updateProject(id, formdata)
        }

    }

    return (
        <div className="w-full min-h-screen h-full">
            <Header heading={id ? "Update project" : "New project"} back={true} />

            <div className="w-[90%] mx-auto pb-10  flex flex-col gap-12">
                <section>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                        Project Details
                    </h2>


                    <div className="flex flex-col gap-2">
                        <label htmlFor="projectTitle" className="text-gray-600 text-lg font-medium">
                            Title
                        </label>
                        <input
                            id="projectTitle"
                            name="projectTitle"
                            placeholder="Enter project title"
                            required
                            className={`transition-all duration-200  text-xl w-full p-3 rounded-lg border hover:bg-white focus:ring-1 focus:ring-primary outline-none border-gray-300 
                                    `}
                            value={formdata.projectTitle}
                            onChange={(e) => setFormData({ ...formdata, projectTitle: e.target.value })}
                        />
                    </div>


                    <div className="flex flex-col gap-2 mt-6">
                        <label htmlFor="desc" className="text-gray-600 text-lg font-medium">
                            Project Description
                        </label>
                        <textarea
                            id="desc"
                            name="desc"
                            rows={3}
                            required
                            placeholder="Write your project description..."
                            className={` transition-all duration-200 font-medium text-lg w-full p-3 rounded-lg border  hover:bg-white border-gray-300 focus:ring-1 focus:ring-primary outline-none resize-none`}
                            value={formdata.desc}
                            onChange={(e) => setFormData({ ...formdata, desc: e.target.value })}
                        />
                    </div>
                </section>
                <div>
                    <h2 className="text-2xl font-semibold  text-gray-800 mb-6">Ownership</h2>
                    <section className="flex w-full  justify-around">

                        <div className="flex flex-col gap-2 w-[40%]">
                            <label htmlFor="owner" className="text-gray-600 text-lg font-medium">
                                Company Name
                            </label>
                            <input
                                id="owner"
                                required
                                name="owner"
                                placeholder="Enter company name"
                                className={`transition-all duration-200 font-medium text-lg w-full p-3 rounded-lg border  hover:bg-white focus:ring-1 focus:ring-primary outline-none border-gray-300`}
                                value={formdata.owner}
                                onChange={(e) => setFormData({ ...formdata, owner: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-[40%]">
                            <label htmlFor="owner" className="text-gray-600 text-lg font-medium">
                                Project Manager
                            </label>

                            <Dropdown
                                name="projectManager"
                                value={formdata.projectManager}
                                placeholder="Asssign Project Manager"
                                style="transition-all duration-200 font-medium text-lg w-full p-3 rounded-lg border  hover:bg-white focus:ring-1 focus:ring-primary outline-none border border-gray-300"
                                setdropDownValue={HandleSelectProjectmanager}
                                options={managers}
                            />
                        </div>
                    </section>
                </div>

                {/* date and timming */}

                <div>
                    <h2 className="text-2xl font-semibold  text-gray-800 mb-6">Date </h2>
                    <section className="flex w-full  justify-around">

                        <div className="flex flex-col gap-2 w-[40%]">
                            <label htmlFor="startdate" className="text-gray-600 text-lg font-medium">
                                Start Date
                            </label>
                            <input
                                id="startDate"
                                required
                                type="date"
                                name="startDate"
                                placeholder="Start Date"
                                className={`transition-all duration-200 font-medium text-lg w-full p-3 rounded-lg border  hover:bg-white focus:ring-1 focus:ring-primary outline-none border-gray-300`}
                                value={formdata.startDate}
                                onChange={(e) => setFormData({ ...formdata, startDate: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-[40%]">
                            <label htmlFor="endDate" className="text-gray-600 text-lg font-medium">
                                End Date
                            </label>

                            <input
                                id="endDate"
                                required
                                type="date"
                                name="endDate"
                                placeholder="End Date"
                                className={`transition-all duration-200 font-medium text-lg w-full p-3 rounded-lg border  hover:bg-white focus:ring-1 focus:ring-primary outline-none border-gray-300`}
                                value={formdata.endDate}
                                min={formdata.startDate}
                                onChange={(e) => setFormData({ ...formdata, endDate: e.target.value })}
                            />
                        </div>
                    </section>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold  text-gray-800 mb-6">Status</h2>
                    <div className="flex flex-col gap-2 w-[40%]">
                        <label htmlFor="status" className="text-gray-600 text-lg font-medium">
                            Project Status
                        </label>

                        <StatusDropDown
                            name="status"
                            value={formdata.status}
                            placeholder="Select status"
                            style="transition-all duration-200 font-medium text-lg w-full p-3 rounded-lg border  hover:bg-white focus:ring-1 focus:ring-primary outline-none border border-gray-300"
                            setdropDownValue={HandleSelectProjectStatus}
                            options={projectStatus}
                        />
                    </div>
                </div>
                {
                    id ?

                        <div className="flex justify-end">
                            <div
                                onClick={HandleUpdatetask}
                                className={`bg-primary cursor-pointer rounded-sm p-4 hover:bg-primarybg text-white font-semibold w-auto px-10 flex  justify-center items-center ${loading && "opacity-90"} `}
                            >
                                {
                                    loading ? "updating project..." : "Update"
                                }
                            </div>
                        </div>
                        :
                        <div className="flex justify-end">
                            <div
                                onClick={HandleCreateProject}
                                className={`bg-primary cursor-pointer rounded-sm p-4 hover:bg-primarybg text-white font-semibold w-auto px-10 flex  justify-center items-center ${loading && "opacity-90"} `}
                            >
                                {
                                    loading ? "creating project..." : "Create"
                                }
                            </div>
                        </div>
                }



            </div>

        </div>
    );
};

export default ProjectForm;
