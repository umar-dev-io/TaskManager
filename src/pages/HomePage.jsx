import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiPlus } from "react-icons/fi";
import { motion } from "framer-motion";
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

  // Staggered card grid animations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="relative min-h-[calc(100vh-140px)] w-full overflow-x-hidden bg-gray-950 px-4 py-8 lg:px-12">
      {/* Fullscreen Background Image with Dark Overlay */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 pointer-events-none"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop')` 
        }}
      />
      
      {/* Ambient Glow Gradient Orbs */}
      <div className="fixed left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/25 blur-[140px] pointer-events-none" />
      <div className="fixed right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-purple-600/25 blur-[140px] pointer-events-none" />

      {/* Main Glassmorphism Task Dashboard Container */}
      <div className="relative z-20 mx-auto max-w-5xl rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-2xl md:p-10">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6"
        >
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">My Tasks</h1>
            <p className="mt-1 text-sm font-medium text-purple-200/80">
              {items.length} total tasks managed seamlessly
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => dispatch(openAddModal())}
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary-dark"
          >
            <FiPlus className="text-lg" /> Add Task
          </motion.button>
        </motion.div>

        {/* Content Section */}
        {status === "loading" ? (
          <div className="flex justify-center py-20">
            <Spinner />
          </div>
        ) : items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="py-12 text-center text-gray-300"
          >
            <EmptyState />
          </motion.div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {items.map((task) => (
              <motion.div key={task._id} variants={itemVariants}>
                <TaskCard task={task} />
              </motion.div>
            ))}
          </motion.div>
        )}

        <TaskFormModal />
      </div>
    </div>
  );
};

export default HomePage;