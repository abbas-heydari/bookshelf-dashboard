import SidebarLink from "./SidebarLink";
import { BiSolidHome } from "react-icons/bi";
import { BiSolidCategory } from "react-icons/bi";
import { IoLibrary } from "react-icons/io5";
import { IoMdHeart } from "react-icons/io";
import { IoIosHelpCircle } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import logo from "../assets/data/bcd5c0d35ad5d0590d86495867f2ab18.jpg";
const SidebarContent = () => {
  return (
    <div
      className="[&_ul]:flex [&_ul]:flex-col [&_ul]:gap-4
      bg-[#ffffff] flex-col gap-4 px-8 py-6
    text-[#888888] z-20  font-josefin-sans md:h-[90%] rounded-bl-3xl rounded-tl-3xl "
    >
      <h2 className="mb-5 font-semibold text-black">THE BOOKS</h2>
      <h3 className="mb-3 font-semibold text-[.8rem]">MENU</h3>
      {/* top lists */}
      <ul className="flex flex-col gap-4">
        <li className="text-[#888888] ">
          <SidebarLink to="/" Icon={BiSolidHome}>Discover</SidebarLink>
        </li>
        <li>
          <SidebarLink to="/Categories" Icon={BiSolidCategory}>Categories</SidebarLink>
        </li>
        <li>
          <SidebarLink to="/MyLibrary" Icon={IoLibrary}>My library</SidebarLink>
        </li>
        <li>
         <SidebarLink to="/Favorites" Icon={IoMdHeart}>Favorites</SidebarLink>
        </li>
      </ul>
      <div className="h-px bg-gray-400 my-5"></div>

      {/*bottom list  */}
      <div>
        <ul>
          <li>
            <SidebarLink to="/Help" Icon={IoIosHelpCircle}>Help</SidebarLink>
          </li>
          <li>
            <SidebarLink to="/Logout" Icon={CiLogout}>Log out</SidebarLink>
          </li>
        </ul>
      </div>
      {/* logo-section */}
      <div className="mt-auto p-2 flex flex-col items-center gap-2 w-3/5">
        <img
          className=" rounded-2xl w-full object-cover aspect-square"
          src={logo}
          alt="logo-pic"
        />
        <span className="text-sm">BOOK LIBRARY</span>
      </div>
    </div>
  );
};
export default SidebarContent;
