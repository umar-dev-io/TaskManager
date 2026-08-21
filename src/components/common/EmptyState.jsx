import { FiClipboard } from "react-icons/fi";
import { motion } from "framer-motion";

const EmptyState = () => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4 }}
    className="flex flex-col items-center justify-center py-16 text-center"
  >
    <motion.div 
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 border border-primary/30 text-primary-light shadow-inner mb-4"
    >
      <FiClipboard size={28} className="text-primary-light" />
    </motion.div>
    
    <h3 className="text-lg font-bold text-white">No tasks found</h3>
    <p className="mt-1 text-sm text-purple-200/80 max-w-sm">
      Get started by clicking the "Add Task" button above and tracking your daily goals.
    </p>
  </motion.div>
);

export default EmptyState;