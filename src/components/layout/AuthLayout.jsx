import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

const AuthLayout = () => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-x-hidden bg-gray-950 px-4 py-8">
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

      {/* Main Glassmorphism Card Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-20 max-w-md w-full rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-2xl"
      >
        <Outlet />
      </motion.div>
    </div>
  );
};

export default AuthLayout;