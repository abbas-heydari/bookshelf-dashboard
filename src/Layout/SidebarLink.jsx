import { NavLink } from "react-router";

export default function SidebarLink({ to, Icon, children }) {
  return (
    <NavLink
      to={to}
      className="flex items-center gap-3 px-2 py-2 rounded-md transition-colors duration-200 ease-in-out group hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
    >
      {({ isActive }) => (
        <>
          <Icon
            className={
              "w-5 h-5 transform transition-all duration-200 " +
              (isActive
                ? "text-orange-500"
                : "text-gray-400 group-hover:text-orange-500")
            }
          />
          <span
            className={
              "text-sm transition-colors duration-200 " +
              (isActive
                ? " text-black font-semibold"
                : "text-gray-700 group-hover:text-black")
            }
          >
            {children}
          </span>
        </>
      )}
    </NavLink>
  );
}
