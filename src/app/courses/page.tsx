"use client";
import Image from "next/image";
import CourseCard from "@/components/courses/CourseCard";
import { getCourseCards } from "@/store/slices/course/thunks";
import { AppDispatch, RootState } from "@/store/store";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function page() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    cards,
    message,
    isCourseCardLoading: isLoading,
    isCourseCardSuccess: isSuccess,
    isCourseCardFailed: isError,
  } = useSelector((state: RootState) => state.course);
  const searchParams = useSearchParams();

  function fetchCards() {
    const name = searchParams.get("name") || undefined;
    const type = searchParams.get("type") || undefined;

    dispatch(getCourseCards({ name, type }));
  }

  useEffect(() => {
    fetchCards();
  }, [searchParams]);

  return (
    <main>
      <div className="container mx-auto pb-12">
        <div className="relative md:mt-6">
          <Image
            src="/assets/robot.jpg"
            width={500}
            height={500}
            alt="photo"
            className="w-full h-[600px] object-cover object-top md:rounded-xl brightness-50"
          />

          <div className="absolute left-0 bottom-10 w-full px-3 md:px-24">
            <Header />
            <SearchCourses />
          </div>
        </div>

        <Controller />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-8">
          {isError && <div>ERROR: {message}</div>}
          {isLoading && !isSuccess && <div>Loading...</div>}
          {cards.map((card, ind) => (
            <CourseCard
              key={ind}
              logo_src={card.logo}
              bg_color={card.theme.backgroundColor}
              headerText={card.name.content}
              headerColor={card.name.color}
              courseLink={`/courses/${card.name.content.split(" ").join("-")}`}
              lineOne={card.theme.color1}
              lineTwo={card.theme.color2}
              otherColor={card.level.color}
              otherText={card.level.content}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

function Header() {
  return (
    <h1 className="rounded-lg text-3xl text-white-v bg-black-v bg-opacity-50 backdrop-blur-sm border-2 border-primary p-4 px-12 font-bold mx-auto w-fit mb-28">
      Courses
    </h1>
  );
}

const Tags = [
  {
    type: "Programming",
  },
  {
    type: "Web Development",
  },
  {
    type: "Design",
  },
  {
    type: "Business",
  },
  {
    type: "Photography",
  },
  {
    type: "Music",
  },
  {
    type: "Finance",
  },
  {
    type: "Sport",
  },
  {
    type: "Health",
  },
];

function SearchCourses() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const searchParams = useSearchParams();
  const type_query = searchParams.get("type");
  const search_query = searchParams.get("title");
  const router = useRouter();

  useEffect(() => {
    setType(type_query as string);
    setSearch(search_query as string);
  }, []);

  function onFilter(e: any, search: string, type: string) {
    e?.preventDefault();
    router.push(
      `/courses?type=${type ? type : ""}&name=${search ? search : ""}`
    );
  }
  return (
    <div className="max-w-[600px] mx-auto px-4 pt-12 pb-6 md:px-12 bg-black-v rounded-xl bg-opacity-50 backdrop-blur-sm border-2 border-primary">
      <form onSubmit={(e) => onFilter(e, search, type)}>
        <input
          type="text"
          name="Search Courses"
          placeholder="Search Courses"
          value={search || ""}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-[600px] mx-auto block rounded px-4 py-2 bg-white-v text-black-v w-full outline-none mb-6"
        />
      </form>
      <div className="flex gap-3 flex-wrap justify-center">
        {Tags.map((tag, ind) => (
          <span
            key={ind}
            onClick={() => setType(tag.type)}
            className={`py-1 p-3 text-md ${
              type?.toLocaleLowerCase() == tag.type.toLocaleLowerCase()
                ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
                : "bg-gray-200 hover:bg-gray-300"
            } cursor-pointer text-black-v rounded-lg`}
          >
            {tag.type}
          </span>
        ))}
      </div>
      <button
        onClick={(e) => onFilter(e, search, type)}
        className="py-2 px-6 rounded-md text-md capitalize bg-purple-dark-3 text-white-v hover:bg-purple-dark-4 mx-auto mt-8 block w-fit"
      >
        filter
      </button>
    </div>
  );
}

function Controller() {
  const { cards } = useSelector((state: RootState) => state.course);
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  return (
    <div className="flex items-center justify-between mt-6 relative px-6">
      <span className="before:w-[0] before:h-[4px] before:rounded-lg before:bg-black-v before:absolute before:top-[10px] before:left-32">
        {type ? type : "All"} - {cards.length} Course
      </span>
      <div className="flex gap-1">
        <button className="w-[35px] h-[35px] flex justify-center items-center rounded-lg bg-white text-black-v hover:bg-white-v">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
            />
          </svg>
        </button>
        <button className="w-[35px] h-[35px] flex justify-center items-center rounded-lg bg-white text-black-v hover:bg-white-v">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 rotate-90"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
