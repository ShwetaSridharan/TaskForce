// src/app/page.tsx
"use client";

import { TaskProvider } from '../contexts/TaskContext';
import AddTaskForm from '../components/AddTaskForm';
import TaskList from '../components/TaskList';
import ConstellationScene from '../components/ConstellationScene';

import PomodoroTimer3D from '@/components/PomodoroTimer3D';


export default function HomePage() {
  return (
     <div className="min-h-screen overflow-auto h-full ">
    <TaskProvider
      children={{
        taskPanel: (
          <div className="flex flex-col overflow-auto">
            <div className="sticky top-0 z-10">
              <h1 className="text-xl font-bold mb-4 text-[#E0E6F0]">Your Tasks</h1>
              <AddTaskForm />
            </div>

            <div className="flex-1 overflow-y-auto max-h-[500px] md:max-h-none">
              <TaskList />
            </div>

            
          </div>
        ),
        constellationPanel: <ConstellationScene />,
         rightPanel: (
     
        <PomodoroTimer3D />
       
      
     
    ),
      }}
    />
    </div>
  );
}
