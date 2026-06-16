import React from "react";
import { IoMenu, IoNotifications } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import profile from "../assets/data/avatar2.jpg";

const Header = ({ onOpenSidebar }) => {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-neutral-200 bg-white/95 px-4 backdrop-blur lg:px-6">
      <button
        type="button"
        aria-label="Open navigation"
        aria-controls="mobile-sidebar"
        onClick={onOpenSidebar}
        className="grid size-10 place-items-center rounded-md text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-950 focus:outline-none focus:ring-2 focus:ring-neutral-950 lg:hidden"
      >
        <IoMenu aria-hidden="true" className="text-2xl" />
      </button>

      <div className="hidden lg:block">
        <p className="text-sm font-semibold text-neutral-950">Dashboard</p>
        <p className="text-xs text-neutral-500">Manage your ebook shelf</p>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <button
          type="button"
          aria-label="View notifications"
          className="relative hidden size-10 place-items-center rounded-md text-xl text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-950 focus:outline-none focus:ring-2 focus:ring-neutral-950 md:grid"
        >
          <IoNotifications aria-hidden="true" />
          <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-red-600" />
        </button>

        <button
          type="button"
          aria-label="Open user menu"
          className="flex items-center gap-2 rounded-md p-1.5 transition-colors hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-950"
        >
          <img
            className="size-9 rounded-full object-cover"
            src={profile}
            alt="Robin Worksman"
          />
          <span className="hidden text-xs font-medium text-neutral-700 md:inline">
            Robin Worksman
          </span>
          <IoIosArrowDown
            aria-hidden="true"
            className="hidden text-neutral-500 md:inline"
          />
        </button>
      </div>
    </header>
  );
};

export default React.memo(Header);
