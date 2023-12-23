"use client";
import { useEffect } from "react";
import { Provider } from "react-redux";
import store from "@/store/store";
import Navbar from "@/components/Navbar";
import AuthenticationProvider from "@/context/Authentication";
import { usePathname } from "next/navigation";
import AppCourse from "@/app/courses/[course_name]/App";
import CourseProvider from "@/context/Course";

const App = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const len = pathname.split("/").length;
  const isCoursePage =
    pathname.includes("/courses/") &&
    !["create"].includes(pathname.split("/")[len - 1]);

  return (
    <Provider store={store}>
      <AuthenticationProvider>
        {isCoursePage ? (
          <CourseProvider>
            <AppCourse>{children}</AppCourse>
          </CourseProvider>
        ) : (
          <main className={`min-h-[100vh] bg-purple-dark-1 text-white`}>
            <Navbar />
            {children}
          </main>
        )}
      </AuthenticationProvider>
    </Provider>
  );
};

export default App;
