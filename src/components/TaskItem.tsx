'use client';

import { Task } from '../types/Task';
import { useTask } from '../contexts/TaskContext';

export default function TaskItem({ task }: { task: Task }) {
  const { toggleTask, removeTask } = useTask();

  return (
    <li className="flex items-center gap-2 bg-[#283049] p-2 rounded text-[#E0E6F0]">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
        className="h-4 w-4 rounded-xl"
        color='red'
      />
      <span className={task.completed ? 'line-through text-[#E0E6F0]' : ''}>
        {task.text}
      </span>
      <button
        onClick={() => removeTask(task.id)}
        className="ml-auto text-[#F87171] hover:text-[#F87171]"
      >
        ✕
      </button>
    </li>
  );
}
