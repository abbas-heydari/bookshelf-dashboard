import { IoNotifications } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import profile from "../assets/data/avatar2.jpg";
const UserInfo = () => {
  return (
    <div className="flex items-center gap-2 z-30 absolute top-0 right-4 p-2">
      {/* UserName Info */}

      <img
        className="size-10 rounded-full object-cover
          "
        src={profile}
        alt="user-profile"
      />
      <span className=" hidden md:inline text-[.6rem] font-medium">
        {" "}
        Robin Worksman
      </span>

      <span className=" hidden md:inline ">
        <IoIosArrowDown />
      </span>
      {/* Notification */}
      <button className=" hidden md:inline relative text-xl ">
        <IoNotifications />
        <span className=" absolute bg-red-700 rounded-full p-1 top-0 right-0"></span>
      </button>
    </div>
  );
};
export default UserInfo;
