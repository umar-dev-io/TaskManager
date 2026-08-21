import { useDispatch } from "react-redux";
import { FiEdit2, FiTrash2, FiCheckCircle, FiCircle } from "react-icons/fi";
import { deleteTaskThunk, toggleTaskThunk, fetchTasksThunk } from "../../features/tasks/taskThunks";
import { openEditModal } from "../../features/tasks/taskSlice";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const TaskCard = ({ task }) => {
  const dispatch = useDispatch();

  const handleToggle = async () => {
    await dispatch(toggleTaskThunk(task._id));
    dispatch(fetchTasksThunk()); // Refreshes task list
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      await dispatch(deleteTaskThunk(task._id));
      toast.success("Task deleted successfully");
      dispatch(fetchTasksThunk()); // Refreshes task list
    }
  };

  const priorityColors = {
    low: "bg-blue-50 text-blue-700 border-blue-200",
    medium: "bg-amber-50 text-amber-700 border-amber-200",
    high: "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <div className={`flex flex-col justify-between rounded-xl border bg-white p-5 shadow-xs transition hover:shadow-md ${task.isCompleted ? "border-green-200 bg-green-50/20" : "border-gray-200"}`}>
      <div>
        <div className="flex items-start justify-between gap-2">
          <h3 className={`font-semibold text-gray-900 ${task.isCompleted ? "line-through text-gray-400" : ""}`}>
            {task.title}
          </h3>
          <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${priorityColors[task.priority] || priorityColors.medium}`}>
            {task.priority}
          </span>
        </div>
        {task.description && (
          <p className="mt-2 text-sm text-gray-600 line-clamp-2">
            {task.description}
          </p>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
        <button
          onClick={handleToggle}
          className={`flex items-center gap-1.5 text-sm font-medium transition ${task.isCompleted ? "text-green-600" : "text-gray-500 hover:text-gray-800"}`}
        >
          {task.isCompleted ? <FiCheckCircle className="text-lg" /> : <FiCircle className="text-lg" />}
          <span>{task.isCompleted ? "Completed" : "Mark Done"}</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => dispatch(openEditModal(task))}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-primary transition"
            title="Edit Task"
          >
            <FiEdit2 size={16} />
          </button>
          <button
            onClick={handleDelete}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600 transition"
            title="Delete Task"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;