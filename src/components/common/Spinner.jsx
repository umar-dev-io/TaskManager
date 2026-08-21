import { motion } from "framer-motion";

const Spinner = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
    className="flex justify-center items-center py-16"
  >
    <div className="w-9 h-9 border-4 border-primary/30 border-t-primary rounded-full animate-spin shadow-lg"></div>
  </motion.div>
);

export default Spinner;