import { useState } from 'react';
import API from '../api/ApiConfig';
import type { Task } from "../types/tasktypes";
import { useNavigate } from 'react-router-dom';
import { AddTask, DeleteTask, SetTasks, UpdateTask } from '../../redux/slices/taskSlicer';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../redux/store';


const useTask = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState<boolean>(false);
    const user = useSelector((state: RootState) => state.user.user);

    const createTask = async (payload: Task) => {
        setLoading(true);
        try {
            const result = await API.post('tasks/create', payload);
            dispatch(AddTask(result.data.data));
        } catch (error: any) {
            console.log(error?.message);
            throw error;
        } finally {
            setLoading(false);
            navigate(-1)
        }
    };


    const updateTask = async (id: string, payload: Partial<Task>) => {
        setLoading(true);
        try {
            const result = await API.put(`tasks/update/${id}`, payload);
            dispatch(UpdateTask(result.data.data));
        } catch (error: any) {
            console.log(error?.message);
            throw error;
        } finally {
            setLoading(false);
            navigate(-1)
        }
    };




    const deleteTask = async (id: string) => {
        setLoading(true);
        try {
            const result = await API.delete(`tasks/delete/${id}`);
            dispatch(DeleteTask(result.data.data));
        } catch (error: any) {
            console.log(error?.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const GetMyTasks = async () => {
        setLoading(true);
        try {
            const result = await API.get(`tasks/mytasks/${user?._id}`);
            dispatch(SetTasks(result.data.data));
        } catch (error: any) {
            console.log(error?.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const getTasksByProject = async (projectId: string) => {
        setLoading(true);
        try {
            const result = await API.get(`tasks/project/${projectId}`);
            dispatch(SetTasks(result.data.data));
        } catch (error: any) {
            console.log(error?.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };


    const getTaskById = async (id: string) => {
        setLoading(true);
        try {
            const result = await API.get(`tasks/${id}`);
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
        createTask,
        updateTask,
        deleteTask,
        getTasksByProject,
        getTaskById,
        GetMyTasks
    };
};

export default useTask;
