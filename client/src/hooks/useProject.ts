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


    const createProject = async (payload: Project) => {
        setLoading(true);
        try {
            const result = await API.post('projects/create', payload);
            dispatch(AddProject(result.data.data))
        } catch (error: any) {
            console.log(error?.message);
            throw error;
        } finally {
            setLoading(false);
            navigate('/projects')
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
