import Link from "next/link";
import React from "react";
import UserProfileAvatar from "./UserProfileAvatar";
import UpgradePlanBtn from "./UpgradePlanBtn";
import { CourseContext } from "@/context/Course";
import MoreBtn from "./MoreBtn";

export default function NavBar() {
  const { setSideBarOpen, sideBararOpen } = CourseContext();

  return (
    <nav className="h-[70px] bg-blue-dark-3 px-6 flex items-center gap-3">
      <div
        onClick={() => setSideBarOpen(!sideBararOpen)}
        className="md:hidden p-1 cursor-pointer rounded-md hover:bg-blue-dark-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </div>

      <ThowLogo />
      <div className="ml-auto flex items-center gap-5">
        <div className="items-center gap-2 hidden md:flex">
          <NavigatorBtn />
          <RobotBtn />
        </div>
        <div className="md:hidden">
          <MoreBtn />
        </div>
        <UpgradePlanBtn />
        <UserProfileAvatar />
      </div>
    </nav>
  );
}

function ThowLogo() {
  return (
    <Link href={"/"}>
      <h1 className="animate-charcter font-bold text-xl2 select-none uppercase">
        Thow
      </h1>
    </Link>
  );
}

function RobotBtn() {
  const { setAiDialogOpen, aiDialogOpen } = CourseContext();
  return (
    <div
      onClick={() => setAiDialogOpen(!aiDialogOpen)}
      className="p-3 text-gray-300 cursor-pointer rounded-md hover:bg-blue-dark-4"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        fill="currentColor"
        className="bi bi-robot"
        viewBox="0 0 16 16"
      >
        <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5M3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.58 26.58 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.933.933 0 0 1-.765.935c-.845.147-2.34.346-4.235.346-1.895 0-3.39-.2-4.235-.346A.933.933 0 0 1 3 9.219zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a24.767 24.767 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25.286 25.286 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135Z" />
        <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2zM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5" />
      </svg>
    </div>
  );
}

function NavigatorBtn() {
  const { setIsNavigatorMenuOpen } = CourseContext();
  return (
    <div
      onClick={() => {
        setIsNavigatorMenuOpen(true);
      }}
      className="p-3 text-gray-300 cursor-pointer rounded-md hover:bg-blue-dark-4"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="30"
        width="30"
        viewBox="0 0 512 512"
      >
        <path
          fill="#d1d5db"
          d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM164.1 325.5C182 346.2 212.6 368 256 368s74-21.8 91.9-42.5c5.8-6.7 15.9-7.4 22.6-1.6s7.4 15.9 1.6 22.6C349.8 372.1 311.1 400 256 400s-93.8-27.9-116.1-53.5c-5.8-6.7-5.1-16.8 1.6-22.6s16.8-5.1 22.6 1.6zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm156.4 25.6c-5.3 7.1-15.3 8.5-22.4 3.2s-8.5-15.3-3.2-22.4c30.4-40.5 91.2-40.5 121.6 0c5.3 7.1 3.9 17.1-3.2 22.4s-17.1 3.9-22.4-3.2c-17.6-23.5-52.8-23.5-70.4 0z"
        />
      </svg>
    </div>
  );
}
