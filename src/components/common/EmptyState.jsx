import { FiClipboard } from "react-icons/fi";

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
      <FiClipboard size={28} />
    </div>
    <h3 className="text-lg font-semibold text-gray-800">No tasks found</h3>
    <p className="mt-1 text-sm text-gray-500 max-w-sm">
      Get started by clicking the "Add Task" button above and tracking your daily goals.
    </p>
  </div>
);

export default EmptyState;