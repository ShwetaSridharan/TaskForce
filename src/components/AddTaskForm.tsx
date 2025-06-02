'use client';

import { useState } from 'react';
import { useTask } from '../contexts/TaskContext';

export default function AddTaskForm() {
  const [text, setText] = useState('');
  const [category, setCategory] = useState<'work' | 'personal'>('work');
  const { addTask } = useTask();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() !== '') {
      addTask(text, category); // 👈 Pass category
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4 text-[#A0AEC0]">
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a task..."
          className="flex-1 p-2 border border-[#4C5A78] focus:border-teal-500 rounded-2xl;"
        />
     <button type="submit" className="bg-gradient-to-r from-[#38B2AC] to-[#4FD1C5] text-white px-3 py-2 rounded-lg shadow-md hover:brightness-110 transition">
  Add
</button>

      </div>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value as 'work' | 'personal')}
        className="p-2 border border-[#4C5A78] focus:border-teal-500"
      >
        <option value="" disabled>
          Select a category
        </option>
        <option value="work">Work/School</option>
        <option value="personal">Personal</option>
      </select>
    </form>
  );
}
