import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";

const NotFoundPage = () => {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-x-hidden bg-gray-950 px-4">
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

      {/* Main Glassmorphism Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-20 mx-auto max-w-md w-full rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-2xl flex flex-col items-center text-center"
      >
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 border border-primary/30 text-white shadow-inner"
        >
          <FiAlertCircle className="text-3xl text-primary-light" />
        </motion.div>

        <h1 className="text-6xl font-extrabold tracking-tight text-white">404</h1>
        <p className="mt-3 text-xl font-bold text-white">Page Not Found</p>
        <p className="mt-2 text-sm text-purple-200/80">
          The page you are looking for does not exist or has been moved.
        </p>

        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full mt-6"
        >
          <Link
            to="/"
            className="flex w-full items-center justify-center rounded-xl bg-primary px-5 py-3 font-semibold text-white shadow-lg shadow-primary/30 transition hover:bg-primary-dark"
          >
            Go Back Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;