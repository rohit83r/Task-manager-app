import React from 'react';
import type { Task } from '../features/tasks/taskSlice';

type TaskListProps = {
    tasks: Task[];
    onEdit: (task: Task) => void;
    onDelete: (id: string) => void;
};

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete }) => {
    return (
        <section aria-labelledby="task-list-heading" className="max-w-4xl mx-auto">
            <h3
                id="task-list-heading"
                className="text-2xl font-semibold text-gray-900 mb-6"
            >
                Tasks
            </h3>

            {tasks.length === 0 ? (
                <p className="text-center text-gray-500 italic">No tasks yet.</p>
            ) : (
                <ul className="space-y-4">
                    {tasks.map((task) => (
                        <li
                            key={task.id}
                            className="bg-white shadow rounded-lg p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between"
                        >
                            <div className="mb-3 sm:mb-0 sm:flex-1">
                                <h4 className="text-lg font-semibold text-gray-900">{task.title}</h4>
                                <p className="text-gray-700 mt-1">{task.description}</p>
                                <p className="mt-2 text-sm text-gray-500">
                                    Status:{' '}
                                    <span
                                        className={`font-medium ${
                                            task.status === 'completed'
                                                ? 'text-green-600'
                                                : task.status === 'in-progress'
                                                    ? 'text-yellow-600'
                                                    : 'text-gray-600'
                                        }`}
                                    >
                    {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  </span>
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => onEdit(task)}
                                    className="px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                                    aria-label={`Edit task: ${task.title}`}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(task.id)}
                                    className="px-4 py-2 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 transition"
                                    aria-label={`Delete task: ${task.title}`}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
};

export default TaskList;
