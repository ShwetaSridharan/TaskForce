'use client';

// import { useTask } from '../contexts/TaskContext';
// import TaskItem from './TaskItem';

// export default function TaskList() {
//   const { tasks } = useTask();

//   if (tasks.length === 0) {
//     return <p className="text-[#E0E6F0]">No tasks yet. Add one!</p>;
//   }

//   return (
//     <ul className="space-y-2">
//       {tasks.map((task) => (
//         <TaskItem key={task.id} task={task} />
//       ))}
//     </ul>
//   );
// }


'use client';

import { useTask } from '../contexts/TaskContext';
import TaskItem from './TaskItem';

export default function TaskList() {
  const { tasks, allTasksComplete } = useTask();

  const workTasks = tasks.filter((t) => t.category === 'work');
  const personalTasks = tasks.filter((t) => t.category === 'personal');

  if (tasks.length === 0) {
    return <p className="text-[#E0E6F0]">No tasks yet. Add one!</p>;
  }

 return (
  <div className={`flex flex-col gap-4 ${allTasksComplete ? 'opacity-30 pointer-events-none' : ''}`}>
    {/* Work/School Tasks */}
    <div>
      <h3 className="text-lg font-semibold text-white text-opacity-90 mb-2">Work/School</h3>
      <ul className="space-y-2 max-h-60 overflow-y-auto custom-scroll">
        {workTasks.length === 0 ? (
          <p className="text-sm text-gray-400">No work/school tasks yet.</p>
        ) : (
          workTasks.map((task) => <TaskItem key={task.id} task={task} />)
        )}
      </ul>
    </div>

    {/* Personal Tasks */}
    <div>
      <h3 className="text-lg font-semibold text-white text-opacity-90 mb-2">Personal</h3>
      <ul className="space-y-2 max-h-60 overflow-y-auto custom-scroll">
        {personalTasks.length === 0 ? (
          <p className="text-sm text-gray-400">No personal tasks yet.</p>
        ) : (
          personalTasks.map((task) => <TaskItem key={task.id} task={task} />)
        )}
      </ul>
    </div>
  </div>
);

}



