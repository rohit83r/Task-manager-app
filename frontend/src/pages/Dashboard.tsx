import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    type Task,
} from '../features/tasks/taskSlice';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { LogOut } from 'lucide-react';


import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { tasks, loading, error } = useAppSelector((state) => state.tasks);

    const [editingTask, setEditingTask] = useState<Task | null>(null);

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const handleCreate = (taskData: Omit<Task, 'id'>) => {
        dispatch(createTask(taskData));
    };

    const handleUpdate = async (taskData: Omit<Task, 'id'>) => {
        if (!editingTask) return;
        await dispatch(updateTask({ ...editingTask, ...taskData }));
        dispatch(fetchTasks());
        setEditingTask(null);
    };


    const handleDelete = (id: string) => {
        dispatch(deleteTask(id));
        if (editingTask && editingTask.id === id) {
            setEditingTask(null);
        }
    };

    const handleEdit = (task: Task) => {
        setEditingTask(task);
    };

    const handleCancelEdit = () => {
        setEditingTask(null);
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Navbar */}
            <header className="sticky top-0 z-50 bg-white shadow-md py-4 px-8 flex justify-between items-center">
                <h1 className="text-3xl font-semibold text-gray-900">Task Manager</h1>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-gray-700 hover:text-red-600 font-medium transition"
                    aria-label="Logout"
                >
                    <LogOut className="w-5 h-5" />
                    Logout
                </button>
            </header>

            {/* Main content container */}
            <main className="max-w-4xl mx-auto p-8">
                {/* Task Form */}
                <div className="bg-white rounded-xl shadow-md p-8 mb-10">
                    <TaskForm
                        onSubmit={editingTask ? handleUpdate : handleCreate}
                        editingTask={editingTask}
                        onCancel={editingTask ? handleCancelEdit : undefined}
                    />
                </div>

                {/* Loading and error */}
                {loading && (
                    <p className="text-center text-gray-500 mb-6 italic">Loading tasks...</p>
                )}
                {error && (
                    <p className="text-center text-red-500 mb-6 font-semibold">{error}</p>
                )}

                {/* Task List */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <TaskList tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
