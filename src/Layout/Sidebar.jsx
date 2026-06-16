import SidebarContent from "./SidebarContent";

const Sidebar = () => {
  return (
    <aside className="hidden md:fixed md:left-8 md:top-8 h-[90%] md:flex w-60 shrink-0 rounded-tl-2xl">
      <SidebarContent />
    </aside>
  );
};
export default Sidebar;
