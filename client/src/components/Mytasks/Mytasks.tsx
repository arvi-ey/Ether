import React, { useEffect } from 'react'
import MytaskBox from './MytaskBox'
import { useNavigate, useParams } from 'react-router-dom';
import useTask from '../../hooks/useTask';
import type { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';
import TaskList from '../Tasks/TaskList';

const Mytasks = () => {
    const tasks = useSelector((state: RootState) => state.task.tasks);
    const { GetMyTasks } = useTask()


    useEffect(() => {
        GetMyTasks()
    }, [])






    return (
        <>
            <div className="pb-3 mb-6 border-b border-gray-200">
                <h1 className="text-2xl font-bold text-gray-700">
                    My tasks
                </h1>
            </div>
            <div className='flex flex-col'>
                <TaskList
                    tasks={tasks}
                    isProject={false}
                />
            </div>
        </>
    )
}

export default Mytasks