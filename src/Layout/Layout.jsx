import Sidebar from "./Sidebar";
import { Outlet, useLocation } from "react-router";
import UserInfo from "../Components/UserInfo";
import MobileSidebar from "./MobileSidebar";
import { useState } from "react";
// import { useState } from "react";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarOpenedAt, setSidebarOpenedAt] = useState(null);
  const location = useLocation();
  const isMobileSidebarOpen = isSidebarOpen && sidebarOpenedAt === location.key;

  return (
    <div className="relative min-h-screen w-screen bg-[#d7d8d9b8] md:p-8">
      {/* Background decorative element */}
      <div className="bg-[#b1ab82] absolute top-0 right-0 w-1/3 md:w-3/10 lg:w-2/10 h-[21.85rem] md:h-[23.85rem] z-10 opacity-50 "></div>
      {/*  Whole page */}
      <div className="relative flex rounded-3xl  min-h-screen md:min-h-[90vh] bg-white w-full  ">
        <Sidebar />
        <MobileSidebar
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        {/* decorative div */}
        <div className="absolute top-0 inset-x-0 md:left-[15rem] bg-[#ccc3a4ac] h-[350px] rounded-bl-4xl rounded-tr-3xl z-0"></div>
        {/* Main content */}
        <button
          onClick={() => {
            setSidebarOpenedAt(location.key);
            setIsSidebarOpen(true);
          }}
          className=" md:hidden top-0 left-0 z-20  text-white p-2 rounded-md w-8 h-8 cursor-pointer"
        >
          ☰
        </button>
        <UserInfo />
        <main className="flex items-start relative flex-1 min-w-0 p-4 md:ml-60">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default Layout;
