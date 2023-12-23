"use client";
import React, { Suspense, lazy } from "react";
import NavBar from "@/components/course/NavBar";
import { CourseContext } from "@/context/Course";
import "./style.css";

const SideBar = lazy(() => import("@/components/course/SideBar"));
const AiDialog = lazy(() => import("@/components/course/AiDialog"));
const NavigatorMenu = lazy(
  () => import("@/components/course/NavigatorAgent/NavigatorMenu")
);

export default function App({ children }: { children: React.ReactNode }) {
  const { aiDialogOpen, isNavigatorMenuOpen } = CourseContext();

  return (
    <main className="course flex min-h-[100vh] bg-blue-dark-1 text-white selection:text-blue-300 selection:bg-blue-dark-5">
      <SideBar />
      <Suspense>{aiDialogOpen && <AiDialog />}</Suspense>
      <Suspense>{isNavigatorMenuOpen && <NavigatorMenu />}</Suspense>
      <section className="w-full">
        <NavBar />
        <section
          style={{ height: "calc(100vh - 70px)" }}
          className="px-4 md:px-16 lg:px-24 xl:px-48 pt-10 pb-2 flex flex-col items-center overflow-y-auto"
        >
          <div className="max-w-[800px] w-full relative">{children}</div>
        </section>
      </section>
    </main>
  );
}
