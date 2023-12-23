"use client";
import Button from "@/components/common/Button";
import { getCourseDetails } from "@/store/slices/course/thunks";
import { AppDispatch, RootState } from "@/store/store";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function page() {
  const {
    isCourseDetailsLoading: isLoading,
    isCourseDetailsSuccess: isSuccess,
    isCourseDetailsFailed: isError,
    details,
    message,
  } = useSelector((state: RootState) => state.course);
  const dispatch = useDispatch<AppDispatch>();
  const { course_name } = useParams();

  useEffect(() => {
    dispatch(getCourseDetails(course_name as string));
  }, []);

  if (isLoading && !isSuccess) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {message}</div>;
  }

  if (details)
    return (
      <section className="px-4">
        <div className="h-[320px] w-full p-6 rounded-lg bg-blue-500">
          <Image
            src={""}
            alt={`course-photo`}
            width={400}
            height={300}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-24 mt-12">
          <h1 className="text-xl2 font-semibold max-w-[420px] capitalize mb-8">
            {details.title}
          </h1>
          <Button
            btnText="Enroll Now"
            bg_color="bg-blue-dark-3"
            bg_hover_color="bg-blue-dark-4"
            targetLink={details.enroll_link}
            textColor="text-white"
          />
        </div>
        <div className="my-24">
          <h2 className="text-xl font-semibold capitalize mb-6">
            Course overview
          </h2>
          <p className="text-base text-gray-300">{details.overview}</p>
        </div>
        <div className="p-3 py-5 bg-[#e97a2b95] border-l-4 text-gray-100 border-orange-500 opacity-80 rounded-lg text-center my-24">
          <h2 className="text-md font-semibold capitalize mb-6">
            Prerequisites
          </h2>
          <p className="text-base text-gray-100">{details.prerequisites}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold capitalize mb-6">
            Learning Goals
          </h2>
          <ul className="text-base text-gray-300 flex flex-col gap-2 list-disc pl-6">
            {details.learning_goals.map((goal: string, ind: number) => (
              <li key={ind}>{goal}</li>
            ))}
          </ul>
        </div>
        <div className="my-24">
          <h2 className="text-xl font-semibold capitalize mb-6">
            Time to Finish
          </h2>
          <p className="text-base text-gray-300">{details.time_to_finish} </p>
        </div>
        <div className="flex justify-center mb-6">
          <Button
            btnText="Enroll Now"
            bg_color="bg-blue-dark-3"
            bg_hover_color="bg-blue-dark-4"
            targetLink={details.enroll_link}
            textColor="text-white"
          />
        </div>
      </section>
    );
}
