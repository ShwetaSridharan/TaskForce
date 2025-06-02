'use client';

// import { createContext, useContext, useState } from 'react';
// import { Task } from '../types/Task';

// type TaskContextType = {
//   tasks: Task[];
//   addTask: (text: string) => void;
//   toggleTask: (id: number) => void;
//   removeTask: (id: number) => void;
// };

// const TaskContext = createContext<TaskContextType | undefined>(undefined);

// export const TaskProvider = ({
//   children,
// }: {
//   children: {
//     taskPanel: React.ReactNode;
//     constellationPanel: React.ReactNode;
//   };
// }) => {
//   const [tasks, setTasks] = useState<Task[]>([]);

//   const addTask = (text: string) => {
//     setTasks((prev) => [
//       ...prev,
//       { id: Date.now(), text, completed: false },
//     ]);
//   };

//   const toggleTask = (id: number) => {
//     setTasks((prev) =>
//       prev.map((task) =>
//         task.id === id ? { ...task, completed: !task.completed } : task
//       )
//     );
//   };

//   const removeTask = (id: number) => {
//     setTasks((prev) => prev.filter((task) => task.id !== id));
//   };

//    return (
//     <TaskContext.Provider value={{ tasks, addTask, toggleTask, removeTask }}>
//       <div className="flex flex-col md:flex-row h-full bg-[#]">
//         {/* Left: Task List */}
//         <aside className="w-full md:w-1/3 lg:w-1/4 p-4 md:h-full overflow-y-auto">
//           {children.taskPanel}
//         </aside>

//         {/* Divider */}
//         <div className="hidden md:block w-px"></div>

//         {/* Right: Constellation */}
//         <main className="flex-1  p-4 overflow-hidden">
//           {children.constellationPanel}
//         </main>
//       </div>
//     </TaskContext.Provider>
//   );
// };

// export const useTask = () => {
//   const context = useContext(TaskContext);
//   if (!context) throw new Error('useTask must be used within TaskProvider');
//   return context;
// };


'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { Task } from '../types/Task';

type TaskContextType = {
  tasks: Task[];
  addTask: (text: string, category: 'work' | 'personal') => void;
  toggleTask: (id: number) => void;
  removeTask: (id: number) => void;
  allTasksComplete: boolean; // 👈 New: For constellation completion
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({
  children,
}: {
  children: {
    taskPanel: React.ReactNode;
    constellationPanel: React.ReactNode;
    rightPanel: React.ReactNode;
  };
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [allTasksComplete, setAllTasksComplete] = useState(false); // 👈 New

  const addTask = (text: string, category: 'work' | 'personal') => {
  setTasks((prev) => [
    ...prev,
    { id: Date.now(), text, completed: false, category },
  ]);
};


  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // 👇 Track task completion state
  useEffect(() => {
    if (tasks.length > 0 && tasks.every((task) => task.completed)) {
      setAllTasksComplete(true);
    } else {
      setAllTasksComplete(false);
    }
  }, [tasks]);

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTask, removeTask, allTasksComplete }}>
      <div className="flex flex-col md:flex-row h-full bg-[#00082a]  overflow-auto ">
        {/* Left: Task List */}
    <aside className="bg-white/10 backdrop-blur-2xl border-1.5 border-blue/100 shadow-lg
     shadow-white/20 md:shadow-white/100 text-white text-opacity-90 rounded-2xl p-4  md:w-1/4">
  {children.taskPanel}
</aside>
        {/* Divider */}
        <div className="hidden md:block w-px"></div>

        {/* Right: Constellation */}
        <main className="flex-1 overflow-hidden p-4">
          {children.constellationPanel}
        </main>

          <aside >
        {children.rightPanel}
      </aside>
        
      </div>
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTask must be used within TaskProvider');
  return context;
};
