"use client";
import Image from "next/image";
import Link from "next/link";
import { CONTENTS } from "@/constants/dummyLesson";
import { CourseContext } from "@/context/Course";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getCoursecContents } from "@/store/slices/course/thunks";

export default function SideBar() {
  const { setSideBarOpen, sideBararOpen } = CourseContext();
  const dispatch = useDispatch<AppDispatch>();
  const {
    isCourseContentsLoading: isLoading,
    isCourseContentsSuccess: isSuccess,
    isCourseContentsFailed: isError,
    message,
  } = useSelector((state: RootState) => state.course);
  const { course_name } = useParams();

  useEffect(() => {
    dispatch(getCoursecContents(course_name as string));
  }, []);

  return (
    <aside
      className={`sidebar w-full h-[100vh] top-0 md:w-[320px] bg-blue-dark-2 flex flex-col pt-12 items-center transition-all duration-300 fixed z-10 md:relative ${
        sideBararOpen ? "ml-[0]" : "ml-[-100%] md:ml-[-320px]"
      }`}
    >
      <div className="box w-[120px] h-[120px] p-4">
        <Image
          src={"/assets/Python_logo_icon.png"}
          alt="python_logo"
          width={70}
          height={70}
          quality={50}
          className="w-full h-full object-contain"
        />
      </div>
      {isError && <div>Error: {message}</div>}
      {isLoading && !isSuccess ? <div>Loading...</div> : <LessonsList />}
      <ToggleButton open={sideBararOpen} setOpen={setSideBarOpen} />
    </aside>
  );
}

function LessonsList() {
  const [options, setOptions] = useState<Contents>([]);
  const {
    isCourseContentsLoading: isLoading,
    isCourseContentsSuccess: isSuccess,
    isCourseContentsFailed: isError,
    contents,
  } = useSelector((state: RootState) => state.course);

  useEffect(() => {
    if (!isLoading && isSuccess) {
      setOptions(contents.sections);
    }
  }, [contents]);

  return (
    <>
      <section className="w-full px-4 mt-12 flex flex-col gap-3 overflow-auto">
        {options.map((section, ind: number) => (
          <ListBtn
            key={section.id}
            title={section.name}
            option={section}
            options={options}
            setOptions={setOptions}
          />
        ))}
      </section>
    </>
  );
}

function ToggleButton({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <button
      onClick={() => setOpen(!open)}
      className="absolute right-5 md:-right-14 top-5 md:top-[50%] px-2 py-3 rounded-md bg-blue-dark-1 hover:bg-blue-dark-3 md:hover:bg-blue-dark-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className={`w-8 h-8 md:w-6 md:h-6 transition-transform duration-300 ${
          open ? "rotate-0" : "rotate-180"
        }`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5"
        />
      </svg>
    </button>
  );
}

function ListBtn({
  title,
  hasChild = true,
  setOptions,
  options,
  option,
}: {
  title: string;
  hasChild?: boolean;
  setOptions: (options: typeof CONTENTS) => void;
  options: typeof CONTENTS;
  option: any;
}) {
  const [open, setOpen] = useState(option.isOpen || false);
  const { course_name } = useParams();
  return (
    <>
      <section>
        <h2
          onClick={() => setOpen(!open)}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-md cursor-pointer select-none capitalize ${
            option.type === "section"
              ? "bg-blue-dark-4 hover:bg-blue-dark-5"
              : "bg-blue-dark-3 hover:bg-blue-dark-4"
          } ${option.type === "lesson" ? "text-sm text-gray-300" : "text-md"}`}
        >
          <span className="text-ellipsis overflow-hidden whitespace-nowrap">
            {title}
          </span>
          {hasChild && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={`${option.type === "module" ? "w-4 h-4" : "w-6 h-6"} ${
                open ? "rotate-180" : ""
              }`}
            >
              <path
                fillRule="evenodd"
                d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </h2>

        {hasChild && open && (
          <div
            className={`flex flex-col gap-2 px-1 py-2 bg-blue-dark-1 rounded-md`}
          >
            {option.type === "section"
              ? option.modules.map((module: any, ind: number) => (
                  <ListBtn
                    key={ind}
                    title={module.name}
                    option={module}
                    options={options}
                    setOptions={setOptions}
                  />
                ))
              : option.type === "module" &&
                option.lessons.map((lesson: any, ind: number) => (
                  <Link
                    key={ind}
                    href={`/courses/${course_name}/lessons/${lesson.link}`}
                  >
                    <ListBtn
                      title={lesson.name}
                      hasChild={false}
                      option={lesson}
                      options={options}
                      setOptions={setOptions}
                    />
                  </Link>
                ))}
          </div>
        )}
      </section>
    </>
  );
}
