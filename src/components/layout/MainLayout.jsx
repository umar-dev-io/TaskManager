import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import TaskFormModal from "../tasks/TaskFormModal"; // adjust path as needed

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-950 text-white relative">
      <div>
        <Navbar />
        <main className="w-full">
          <Outlet />
        </main>
      </div>
      <Footer />
      
      {/* Global modal placement so it centers across the full screen */}
      <TaskFormModal />
    </div>
  );
};

export default MainLayout;