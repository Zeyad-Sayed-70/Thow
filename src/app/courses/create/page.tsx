"use client";
import {
  getCourseCards,
  getCoursecContents,
} from "@/store/slices/course/thunks";
import { AppDispatch, RootState } from "@/store/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function page() {
  const [options, setOptions] = useState({
    course: "",
    section: "",
    module: "",
    lesson: "",
  });
  const dispatch = useDispatch<AppDispatch>();
  const { cards, contents, isCourseCardLoading, isCourseCardSuccess } =
    useSelector((state: RootState) => state.course);

  useEffect(() => {
    dispatch(getCourseCards({}));
  }, []);

  useEffect(() => {
    if (options.course) {
      dispatch(getCoursecContents(options.course));
    }
  }, [options]);

  return (
    <main>
      <div className="container mx-auto flex flex-col items-center gap-6 py-12">
        <h1 className="text-xl2">Create Course Lessons Now</h1>
        <section className="mt-6">
          <div className="mt-6">
            <label
              htmlFor="countries"
              className="block mb-2 w-80 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select a Course
            </label>
            <select
              id="countries"
              onChange={(e) =>
                setOptions({ ...options, course: e.target.value })
              }
              disabled={isCourseCardLoading && !isCourseCardSuccess}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value={""}>None</option>
              {cards.map((card, ind) => (
                <option key={ind} value={card.name.content}>
                  {card.name.content}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-6">
            <label
              htmlFor="countries"
              className="block mb-2 w-80 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select a Section
            </label>
            <select
              id="countries"
              disabled={options.course === ""}
              onChange={(e) =>
                setOptions({ ...options, section: e.target.value })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value={""}>None</option>
              {contents.sections?.map((section: any, ind: number) => (
                <option key={ind} value={section.name}>
                  {section.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-6">
            <label
              htmlFor="countries"
              className="block mb-2 w-80 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select a Module
            </label>
            <select
              id="countries"
              disabled={options.section === ""}
              onChange={(e) =>
                setOptions({ ...options, module: e.target.value })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value={""}>None</option>
              {contents.sections?.map((section: any, ind: number) => {
                if (section.name === options.section)
                  return section.modules.map((module: any, ind: number) => (
                    <option key={ind} value={module.name}>
                      {module.name}
                    </option>
                  ));
              })}
            </select>
          </div>
          <div className="mt-6">
            <label
              htmlFor="countries"
              className="block mb-2 w-80 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select a Lesson
            </label>
            <select
              id="countries"
              disabled={options.module === ""}
              onChange={(e) =>
                setOptions({ ...options, lesson: e.target.value })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value={""}>None</option>
              {contents.sections?.map((section: any, ind: number) => {
                if (section.name === options.section)
                  return section.modules.map((module: any, ind: number) => {
                    if (module.name === options.module)
                      return module.lessons.map((lesson: any, ind: number) => (
                        <option key={ind} value={lesson.name}>
                          {lesson.name}
                        </option>
                      ));
                  });
              })}
            </select>
          </div>
        </section>
      </div>
    </main>
  );
}
