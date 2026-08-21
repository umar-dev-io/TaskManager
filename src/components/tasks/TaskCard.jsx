import { useDispatch } from "react-redux";
import { FiEdit2, FiTrash2, FiCheckCircle, FiCircle } from "react-icons/fi";
import { motion } from "framer-motion";
import { deleteTaskThunk, toggleTaskThunk, fetchTasksThunk } from "../../features/tasks/taskThunks";
import { openEditModal } from "../../features/tasks/taskSlice";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const TaskCard = ({ task }) => {
  const dispatch = useDispatch();

  const handleToggle = async () => {
    await dispatch(toggleTaskThunk(task._id));
    dispatch(fetchTasksThunk());
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
      background: "#030712",
      color: "#ffffff",
    });

    if (result.isConfirmed) {
      await dispatch(deleteTaskThunk(task._id));
      toast.success("Task deleted successfully");
      dispatch(fetchTasksThunk());
    }
  };

  const priorityColors = {
    low: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    medium: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    high: "bg-red-500/20 text-red-300 border-red-500/30",
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className={`flex flex-col justify-between rounded-2xl border p-5 shadow-lg backdrop-blur-xl transition-all ${
        task.isCompleted 
          ? "border-green-500/30 bg-green-950/20" 
          : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
      }`}
    >
      <div>
        <div className="flex items-start justify-between gap-2">
          <h3 className={`font-semibold text-white ${task.isCompleted ? "line-through text-gray-400" : ""}`}>
            {task.title}
          </h3>
          <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize shadow-sm ${priorityColors[task.priority] || priorityColors.medium}`}>
            {task.priority}
          </span>
        </div>
        {task.description && (
          <p className="mt-2 text-sm text-purple-200/80 line-clamp-2">
            {task.description}
          </p>
        )}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
        <button
          onClick={handleToggle}
          className={`flex items-center gap-1.5 text-sm font-medium transition ${
            task.isCompleted ? "text-green-400" : "text-gray-400 hover:text-white"
          }`}
        >
          {task.isCompleted ? <FiCheckCircle className="text-lg" /> : <FiCircle className="text-lg" />}
          <span>{task.isCompleted ? "Completed" : "Mark Done"}</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => dispatch(openEditModal(task))}
            className="rounded-xl p-2 text-gray-300 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition"
            title="Edit Task"
          >
            <FiEdit2 size={15} />
          </button>
          <button
            onClick={handleDelete}
            className="rounded-xl p-2 text-gray-300 bg-white/5 border border-white/10 hover:bg-red-500/20 hover:border-red-500/30 hover:text-red-400 transition"
            title="Delete Task"
          >
            <FiTrash2 size={15} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;