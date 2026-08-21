import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { logout } from "../../features/auth/authSlice";
import { FiLogOut, FiCheckSquare } from "react-icons/fi";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const userName = user?.name || "Umar Farooq";

  // Infinite pulsing/floating animation for the Taskify brand box
  const infinitePulseVariants = {
    animate: {
      scale: [1, 1.06, 1],
      rotate: [0, 3, -3, 0],
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="sticky top-0 z-40 border-b border-white/10 bg-gray-950/80 backdrop-blur-xl shadow-lg"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5">
        {/* Animated Brand Logo with Infinite Motion */}
        <Link
          to="/"
          className="flex items-center gap-2.5 font-display text-lg font-bold text-white transition"
        >
          <motion.div
            variants={infinitePulseVariants}
            animate="animate"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/20 border border-primary/30 text-primary-light shadow-inner shadow-primary/20"
          >
            <FiCheckSquare className="text-xl" />
          </motion.div>
          <span className="tracking-tight">Taskify</span>
        </Link>
        
        {/* User Info & Logout Button */}
        <div className="flex items-center gap-4">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="hidden text-sm font-medium text-gray-300 sm:block"
          >
            Hi, <span className="text-white font-semibold">{userName}</span>
          </motion.span>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl bg-white/10 border border-white/10 px-4 py-2 text-sm font-semibold text-gray-200 transition-all hover:bg-red-500/20 hover:border-red-500/30 hover:text-red-400 shadow-sm"
          >
            <FiLogOut className="text-base" /> Logout
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;