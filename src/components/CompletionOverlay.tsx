import { useTask } from '../contexts/TaskContext';

export default function CompletionOverlay() {
  const { allTasksComplete } = useTask();

  if (!allTasksComplete) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="text-white text-3xl text-center">
        <p>✨ You’ve completed today’s constellation! 🌟</p>
        <p className="text-lg mt-2">See you tomorrow for a new pattern.</p>
      </div>
    </div>
  );
}
