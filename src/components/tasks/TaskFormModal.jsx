import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { closeModal } from "../../features/tasks/taskSlice";
import { createTaskThunk, updateTaskThunk, fetchTasksThunk } from "../../features/tasks/taskThunks";
import { toast } from "react-toastify";

const glassToastOptions = {
  className: "backdrop-blur-xl bg-gray-950/80 border border-white/20 text-white rounded-2xl shadow-2xl",
  progressClassName: "bg-primary",
};

const TaskFormModal = () => {
  const dispatch = useDispatch();
  const { open, mode, task } = useSelector((state) => state.tasks.modal);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
      status: "pending",
    },
  });

  useEffect(() => {
    if (mode === "edit" && task) {
      reset({
        title: task.title || "",
        description: task.description || "",
        priority: task.priority || "medium",
        status: task.status || "pending",
      });
    } else {
      reset({
        title: "",
        description: "",
        priority: "medium",
        status: "pending",
      });
    }
  }, [mode, task, reset]);

const onSubmit = async (data) => {
    if (mode === "add") {
      const result = await dispatch(createTaskThunk(data));
      if (createTaskThunk.fulfilled.match(result)) {
        toast.success("Task created successfully!", glassToastOptions);
        dispatch(closeModal());
        dispatch(fetchTasksThunk());
      } else {
        toast.error(result.payload || "Failed to create task", glassToastOptions);
      }
    } else {
      const result = await dispatch(updateTaskThunk({ id: task._id, data }));
      if (updateTaskThunk.fulfilled.match(result)) {
        toast.success("Task updated successfully!", glassToastOptions);
        dispatch(closeModal());
        dispatch(fetchTasksThunk());
      } else {
        toast.error(result.payload || "Failed to update task", glassToastOptions);
      }
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full max-w-md rounded-3xl border border-white/20 bg-gray-950/80 p-6 shadow-2xl backdrop-blur-2xl text-white relative overflow-hidden"
          >
            {/* Ambient Background Glow */}
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/20 blur-[80px] pointer-events-none" />
            <div className="absolute -left-20 -bottom-20 h-40 w-40 rounded-full bg-purple-600/20 blur-[80px] pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between pb-4 border-b border-white/10">
              <h2 className="text-lg font-bold text-white">
                {mode === "add" ? "Create New Task" : "Edit Task"}
              </h2>
              <button
                onClick={() => dispatch(closeModal())}
                className="rounded-xl p-2 text-gray-400 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition"
              >
                <FiX size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="relative z-10 mt-4 space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-purple-200">
                  Title
                </label>
                <input
                  {...register("title", { required: true })}
                  placeholder="What needs to be done?"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-gray-400 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-purple-200">
                  Description
                </label>
                <textarea
                  {...register("description")}
                  rows="3"
                  placeholder="Add details (optional)"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-gray-400 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-purple-200">
                    Priority
                  </label>
                  <select
                    {...register("priority")}
                    className="w-full rounded-xl border border-white/10 bg-gray-900 px-4 py-2.5 text-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition cursor-pointer"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-purple-200">
                    Status
                  </label>
                  <select
                    {...register("status")}
                    className="w-full rounded-xl border border-white/10 bg-gray-900 px-4 py-2.5 text-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition cursor-pointer"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => dispatch(closeModal())}
                  className="rounded-xl px-4 py-2.5 text-sm font-medium text-gray-300 hover:bg-white/5 transition"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition hover:bg-primary-dark"
                >
                  {mode === "add" ? "Create Task" : "Save Changes"}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TaskFormModal;