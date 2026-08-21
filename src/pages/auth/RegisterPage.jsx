import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { 
  Eye, 
  EyeOff, 
  Lock, 
  Mail, 
  User, 
  Loader2, 
  CheckCircle2, 
  CheckSquare, 
  Calendar, 
  Clock, 
  Briefcase, 
  Target, 
  Zap 
} from "lucide-react";
import { registerThunk } from "../../features/auth/authThunks";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.auth);

  const onSubmit = async (data) => {
    const result = await dispatch(registerThunk(data));
    if (registerThunk.fulfilled.match(result)) {
      toast.success("Account created successfully!");
      navigate("/");
    } else {
      toast.error(result.payload || "Registration failed");
    }
  };

  // Slow heartbeat animation for the green badge
  const heartbeatVariants = {
    animate: {
      scale: [1, 1.05, 1, 1.05, 1],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 1,
      },
    },
  };

  // Smooth floating animation for background icons
  const floatVariants = (duration, yOffset) => ({
    animate: {
      y: [0, yOffset, 0],
      rotate: [0, 6, -6, 0],
      transition: {
        duration: duration,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  });

  return (
    <div className="relative w-full max-w-md mx-auto my-auto">
      {/* --- NON-OVERLAPPING FLOATING ICONS (Left Side) --- */}
      <motion.div
        variants={floatVariants(4, -16)}
        animate="animate"
        className="absolute -left-24 lg:-left-36 top-[15%] hidden lg:flex items-center justify-center h-14 w-14 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md shadow-xl text-green-400 z-10 pointer-events-none"
      >
        <CheckSquare className="h-7 w-7" />
      </motion.div>

      <motion.div
        variants={floatVariants(5, 20)}
        animate="animate"
        className="absolute -left-28 lg:-left-44 top-[50%] hidden lg:flex items-center justify-center h-12 w-12 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md shadow-xl text-blue-400 z-10 pointer-events-none"
      >
        <Calendar className="h-6 w-6" />
      </motion.div>

      <motion.div
        variants={floatVariants(4.5, -14)}
        animate="animate"
        className="absolute -left-24 lg:-left-36 bottom-[15%] hidden lg:flex items-center justify-center h-14 w-14 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md shadow-xl text-purple-400 z-10 pointer-events-none"
      >
        <Clock className="h-7 w-7" />
      </motion.div>

      {/* --- NON-OVERLAPPING FLOATING ICONS (Right Side) --- */}
      <motion.div
        variants={floatVariants(4.2, 18)}
        animate="animate"
        className="absolute -right-24 lg:-right-36 top-[15%] hidden lg:flex items-center justify-center h-14 w-14 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md shadow-xl text-amber-400 z-10 pointer-events-none"
      >
        <Briefcase className="h-7 w-7" />
      </motion.div>

      <motion.div
        variants={floatVariants(5.5, -20)}
        animate="animate"
        className="absolute -right-28 lg:-right-44 top-[50%] hidden lg:flex items-center justify-center h-12 w-12 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md shadow-xl text-pink-400 z-10 pointer-events-none"
      >
        <Target className="h-6 w-6" />
      </motion.div>

      <motion.div
        variants={floatVariants(4.8, 16)}
        animate="animate"
        className="absolute -right-24 lg:-right-36 bottom-[15%] hidden lg:flex items-center justify-center h-14 w-14 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md shadow-xl text-cyan-400 z-10 pointer-events-none"
      >
        <Zap className="h-7 w-7" />
      </motion.div>

      {/* Glassmorphism Card Container */}
      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-20 w-full rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-2xl md:p-10"
      >
        {/* App Branding & Animated Purpose Tagline */}
        <div className="text-center">
          <motion.div 
            variants={heartbeatVariants}
            animate="animate"
            className="inline-flex items-center gap-2 rounded-full bg-green-500 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-white border border-green-600 mb-4 shadow-lg shadow-green-500/20"
          >
            <CheckCircle2 className="h-3.5 w-3.5" /> 
            <span>Smart Task Management</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-extrabold tracking-tight text-white"
          >
            Create Account
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-1.5 text-sm font-medium text-purple-200/80"
          >
            Start organizing your tasks today.
          </motion.p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
          {/* Full Name Input */}
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-300">
              Full Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                <User className="h-5 w-5" />
              </span>
              <input
                type="text"
                placeholder="John Doe"
                {...register("name", { required: "Name is required" })}
                className="w-full rounded-xl border border-white/10 bg-black/30 py-3 pl-11 pr-4 text-white placeholder-gray-500 shadow-inner outline-none transition-all focus:border-primary focus:bg-black/50 focus:ring-2 focus:ring-primary/40"
              />
            </div>
            {errors.name && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1.5 text-xs font-medium text-red-400">
                {errors.name.message}
              </motion.p>
            )}
          </div>

          {/* Email Input */}
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-300">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                <Mail className="h-5 w-5" />
              </span>
              <input
                type="email"
                placeholder="name@example.com"
                {...register("email", { required: "Email is required" })}
                className="w-full rounded-xl border border-white/10 bg-black/30 py-3 pl-11 pr-4 text-white placeholder-gray-500 shadow-inner outline-none transition-all focus:border-primary focus:bg-black/50 focus:ring-2 focus:ring-primary/40"
              />
            </div>
            {errors.email && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1.5 text-xs font-medium text-red-400">
                {errors.email.message}
              </motion.p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-300">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                <Lock className="h-5 w-5" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters required" },
                })}
                className="w-full rounded-xl border border-white/10 bg-black/30 py-3 pl-11 pr-12 text-white placeholder-gray-500 shadow-inner outline-none transition-all focus:border-primary focus:bg-black/50 focus:ring-2 focus:ring-primary/40"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-400 transition hover:text-white"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1.5 text-xs font-medium text-red-400">
                {errors.password.message}
              </motion.p>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-xl bg-primary py-3.5 font-bold tracking-wide text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary-dark disabled:opacity-60"
          >
            {status === "loading" ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" /> Creating account...
              </span>
            ) : (
              "Create Account"
            )}
          </motion.button>
        </form>

        {/* Footer Link */}
        <p className="mt-8 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-primary transition hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;