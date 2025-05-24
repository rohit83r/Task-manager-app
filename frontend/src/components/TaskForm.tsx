import React, { useState, useEffect } from 'react';
import type { Task } from '../features/tasks/taskSlice';

type TaskFormProps = {
    onSubmit: (task: Omit<Task, 'id'>) => void;
    editingTask?: Task | null;
    onCancel?: () => void;
};

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, editingTask, onCancel }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState<'pending' | 'in-progress' | 'completed'>('pending');

    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title);
            setDescription(editingTask.description);
            setStatus(editingTask.status);
        } else {
            setTitle('');
            setDescription('');
            setStatus('pending');
        }
    }, [editingTask]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ title, description, status });
        if (!editingTask) {
            setTitle('');
            setDescription('');
            setStatus('pending');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto"
            aria-label={editingTask ? 'Edit Task Form' : 'New Task Form'}
        >
            <h3 className="text-xl font-semibold mb-6 text-gray-900">
                {editingTask ? 'Edit Task' : 'Create New Task'}
            </h3>

            <label htmlFor="title" className="block text-gray-700 font-medium mb-1">
                Title
            </label>
            <input
                id="title"
                type="text"
                placeholder="Enter task title"
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label htmlFor="description" className="block text-gray-700 font-medium mb-1">
                Description
            </label>
            <textarea
                id="description"
                placeholder="Enter task description"
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label htmlFor="status" className="block text-gray-700 font-medium mb-1">
                Status
            </label>
            <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
            </select>

            <div className="flex gap-4">
                <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white font-semibold rounded-md py-2 hover:bg-blue-700 transition"
                >
                    {editingTask ? 'Update Task' : 'Create Task'}
                </button>
                {editingTask && onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 border border-gray-300 text-gray-700 rounded-md py-2 hover:bg-gray-100 transition"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default TaskForm;
