import { useState } from 'react';
import API from '../api/ApiConfig';
import type { Project } from '../types/projecttype';
import { useNavigate } from 'react-router-dom';
import { AddProject, DeleteProject, SetProjects, UpdateProject } from '../../redux/slices/projectSlicer';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../redux/store';
const useProject = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>()
    const [loading, setLoading] = useState<boolean>(false);


    const createProject = async (payload: any) => {
        setLoading(true);
        try {
            const result = await API.post('projects/create', payload);
            dispatch(AddProject(result.data.data))
            navigate('/projects')
        } catch (error: any) {
            console.log(error?.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };


    const updateProject = async (id: string, payload: Partial<Project>) => {
        setLoading(true);
        try {
            const result = await API.put(`projects/update/${id}`, payload);
            dispatch(UpdateProject(result.data.data))
        } catch (error: any) {
            console.log(error?.message);
            throw error;
        } finally {
            setLoading(false);
            navigate('/projects')
        }
    };


    const deleteProject = async (id: string) => {
        setLoading(true);
        try {
            const result = await API.delete(`projects/delete/${id}`);
            dispatch(DeleteProject(result.data.data))
        } catch (error: any) {
            console.log(error?.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };


    const getAllProjects = async () => {
        setLoading(true);
        try {
            const result = await API.get('projects/all');
            dispatch(SetProjects(result.data.data))
        } catch (error: any) {
            console.log(error?.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };


    const getProjectById = async (id: string) => {
        setLoading(true);
        try {
            const result = await API.get(`projects/${id}`);

            return result.data.data;
        } catch (error: any) {
            console.log(error?.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        createProject,
        updateProject,
        deleteProject,
        getAllProjects,
        getProjectById
    };
};

export default useProject;


[
    {
        "projectTitle": "Website Redesign",
        "desc": "Redesign the corporate website to improve user experience and responsiveness.",
        "owner": "Tech Solutions Ltd",
        "projectManager": "64f7b3c1a2e4a9b1d0f123a1",
        "startDate": "2025-09-01",
        "endDate": "2025-10-15",
        "status": "pending"
    },
    {
        "projectTitle": "Mobile App Development",
        "desc": "Develop a cross-platform mobile application for booking services.",
        "owner": "Innovatech Corp",
        "projectManager": "64f7b3c1a2e4a9b1d0f123a2",
        "startDate": "2025-09-05",
        "endDate": "2025-12-01",
        "status": "inprogress"
    },
    {
        "projectTitle": "Marketing Campaign",
        "desc": "Plan and execute a marketing campaign for the new product launch.",
        "owner": "Bright Marketing Pvt Ltd",
        "projectManager": "64f7b3c1a2e4a9b1d0f123a3",
        "startDate": "2025-08-20",
        "endDate": "2025-09-30",
        "status": "completed"
    },
    {
        "projectTitle": "CRM Integration",
        "desc": "Integrate the CRM system with existing sales and support tools.",
        "owner": "Global Tech Solutions",
        "projectManager": "64f7b3c1a2e4a9b1d0f123a4",
        "startDate": "2025-09-10",
        "endDate": "2025-11-20",
        "status": "pending"
    },
    {
        "projectTitle": "Data Migration",
        "desc": "Migrate all legacy data to the new database system.",
        "owner": "DataWorks Inc",
        "projectManager": "64f7b3c1a2e4a9b1d0f123a5",
        "startDate": "2025-09-15",
        "endDate": "2025-10-30",
        "status": "inprogress"
    },
    {
        "projectTitle": "Employee Portal",
        "desc": "Build an internal employee portal for HR and payroll management.",
        "owner": "HR Solutions Ltd",
        "projectManager": "64f7b3c1a2e4a9b1d0f123a6",
        "startDate": "2025-09-18",
        "endDate": "2025-11-25",
        "status": "pending"
    },
    {
        "projectTitle": "E-commerce Platform",
        "desc": "Develop an e-commerce platform for online sales and delivery.",
        "owner": "ShopEase Pvt Ltd",
        "projectManager": "64f7b3c1a2e4a9b1d0f123a7",
        "startDate": "2025-09-20",
        "endDate": "2025-12-15",
        "status": "inprogress"
    },
    {
        "projectTitle": "SEO Optimization",
        "desc": "Optimize website content to improve search engine rankings.",
        "owner": "RankBoosters Inc",
        "projectManager": "64f7b3c1a2e4a9b1d0f123a8",
        "startDate": "2025-09-22",
        "endDate": "2025-10-15",
        "status": "completed"
    },
    {
        "projectTitle": "Inventory Management",
        "desc": "Develop a system to track and manage inventory levels in real-time.",
        "owner": "Inventory Solutions Ltd",
        "projectManager": "64f7b3c1a2e4a9b1d0f123a9",
        "startDate": "2025-09-25",
        "endDate": "2025-11-10",
        "status": "inprogress"
    },
    {
        "projectTitle": "Customer Feedback App",
        "desc": "Create an app to collect and analyze customer feedback.",
        "owner": "Feedback Pro Corp",
        "projectManager": "64f7b3c1a2e4a9b1d0f123aa",
        "startDate": "2025-09-28",
        "endDate": "2025-11-30",
        "status": "pending"
    },
    {
        "projectTitle": "Social Media Integration",
        "desc": "Integrate social media login and sharing features into the app.",
        "owner": "Connectify Ltd",
        "projectManager": "64f7b3c1a2e4a9b1d0f123ab",
        "startDate": "2025-10-01",
        "endDate": "2025-11-15",
        "status": "inprogress"
    },
    {
        "projectTitle": "Payment Gateway Setup",
        "desc": "Implement payment gateway for online transactions.",
        "owner": "PayFast Solutions",
        "projectManager": "64f7b3c1a2e4a9b1d0f123ac",
        "startDate": "2025-10-05",
        "endDate": "2025-11-25",
        "status": "pending"
    },
    {
        "projectTitle": "Analytics Dashboard",
        "desc": "Build a dashboard to visualize business KPIs and metrics.",
        "owner": "Insight Analytics",
        "projectManager": "64f7b3c1a2e4a9b1d0f123ad",
        "startDate": "2025-10-10",
        "endDate": "2025-12-01",
        "status": "inprogress"
    },
    {
        "projectTitle": "Chat Support System",
        "desc": "Develop a live chat support system for customer service.",
        "owner": "SupportNow Inc",
        "projectManager": "64f7b3c1a2e4a9b1d0f123ae",
        "startDate": "2025-10-12",
        "endDate": "2025-11-30",
        "status": "pending"
    },
    {
        "projectTitle": "Performance Optimization",
        "desc": "Improve application speed and reduce server response times.",
        "owner": "OptiTech Solutions",
        "projectManager": "64f7b3c1a2e4a9b1d0f123af",
        "startDate": "2025-10-15",
        "endDate": "2025-11-20",
        "status": "completed"
    },
    {
        "projectTitle": "Email Automation",
        "desc": "Setup automated email campaigns for customer engagement.",
        "owner": "MailFlow Corp",
        "projectManager": "64f7b3c1a2e4a9b1d0f123b0",
        "startDate": "2025-10-18",
        "endDate": "2025-11-28",
        "status": "inprogress"
    },
    {
        "projectTitle": "Bug Tracking System",
        "desc": "Implement a system to track bugs and issues in the app.",
        "owner": "BugTracker Ltd",
        "projectManager": "64f7b3c1a2e4a9b1d0f123b1",
        "startDate": "2025-10-20",
        "endDate": "2025-12-05",
        "status": "pending"
    },
    {
        "projectTitle": "Cloud Storage Integration",
        "desc": "Integrate cloud storage for file management and backups.",
        "owner": "CloudWorks Inc",
        "projectManager": "64f7b3c1a2e4a9b1d0f123b2",
        "startDate": "2025-10-22",
        "endDate": "2025-12-15",
        "status": "inprogress"
    },
    {
        "projectTitle": "Security Audit",
        "desc": "Conduct a full security audit for the web and mobile applications.",
        "owner": "SecureTech Solutions",
        "projectManager": "64f7b3c1a2e4a9b1d0f123b3",
        "startDate": "2025-10-25",
        "endDate": "2025-12-20",
        "status": "pending"
    },
    {
        "projectTitle": "New Product Launch",
        "desc": "Plan and execute the launch strategy for the new product line.",
        "owner": "NextGen Enterprises",
        "projectManager": "64f7b3c1a2e4a9b1d0f123b4",
        "startDate": "2025-10-28",
        "endDate": "2025-12-31",
        "status": "inprogress"
    }
]