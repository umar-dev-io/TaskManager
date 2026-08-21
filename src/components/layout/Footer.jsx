import { motion } from "framer-motion";

const Footer = () => (
  <motion.footer 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
    className="border-t border-white/10 bg-gray-950/80 backdrop-blur-xl py-6 text-center text-sm text-gray-400 shadow-lg"
  >
    <div className="mx-auto max-w-6xl px-4">
      <p className="flex items-center justify-center gap-2 font-medium">
        © {new Date().getFullYear()} <span className="text-white font-semibold">Taskify</span> — Built with the MERN Stack
      </p>
    </div>
  </motion.footer>
);

export default Footer;