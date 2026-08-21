import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { FiX } from "react-icons/fi";
import { closeModal } from "../../features/tasks/taskSlice";
import { createTaskThunk, updateTaskThunk, fetchTasksThunk } from "../../features/tasks/taskThunks";
import { toast } from "react-toastify";

const TaskFormModal = () => {
  const dispatch = useDispatch();
  const { open, mode, task } = useSelector((state) => state.tasks.modal);

  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    if (mode === "edit" && task) {
      setValue("title", task.title);
      setValue("description", task.description);
      setValue("priority", task.priority);
      setValue("status", task.status);
    } else {
      reset({ title: "", description: "", priority: "medium", status: "pending" });
    }
  }, [mode, task, reset, setValue]);

  if (!open) return null;

  const onSubmit = async (data) => {
    if (mode === "add") {
      const result = await dispatch(createTaskThunk(data));
      if (createTaskThunk.fulfilled.match(result)) {
        toast.success("Task created successfully");
        dispatch(closeModal());
        dispatch(fetchTasksThunk()); // Refreshes task list
      } else {
        toast.error(result.payload || "Failed to create task");
      }
    } else {
      const result = await dispatch(updateTaskThunk({ id: task._id, data }));
      if (updateTaskThunk.fulfilled.match(result)) {
        toast.success("Task updated successfully");
        dispatch(closeModal());
        dispatch(fetchTasksThunk()); // Refreshes task list
      } else {
        toast.error(result.payload || "Failed to update task");
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">
            {mode === "add" ? "Create New Task" : "Edit Task"}
          </h2>
          <button
            onClick={() => dispatch(closeModal())}
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition"
          >
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              {...register("title", { required: true })}
              placeholder="What needs to be done?"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              {...register("description")}
              rows="3"
              placeholder="Add details (optional)"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Priority
              </label>
              <select
                {...register("priority")}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                {...register("status")}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => dispatch(closeModal())}
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark"
            >
              {mode === "add" ? "Create Task" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskFormModal;