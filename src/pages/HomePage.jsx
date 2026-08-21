import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiPlus } from "react-icons/fi";
import { fetchTasksThunk } from "../features/tasks/taskThunks";
import { openAddModal } from "../features/tasks/taskSlice";
import TaskCard from "../components/tasks/TaskCard";
import TaskFormModal from "../components/tasks/TaskFormModal";
import Spinner from "../components/common/Spinner";
import EmptyState from "../components/common/EmptyState";

const HomePage = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasksThunk());
  }, [dispatch]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
          <p className="text-sm text-gray-500">{items.length} total tasks</p>
        </div>
        <button
          onClick={() => dispatch(openAddModal())}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-semibold text-white shadow-sm transition hover:bg-primary-dark"
        >
          <FiPlus /> Add Task
        </button>
      </div>

      {status === "loading" ? (
        <Spinner />
      ) : items.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      )}

      <TaskFormModal />
    </div>
  );
};

export default HomePage;