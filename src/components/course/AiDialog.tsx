import { CourseContext } from "@/context/Course";
import { roboto_mono } from "@/ui/Fonts";
import React, { useState } from "react";

export default function AiDialog() {
  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { aiDialogOpen, setAiDialogOpen } = CourseContext();

  return (
    <>
      <div
        className={`${
          aiDialogOpen ? "block" : "hidden"
        } w-full h-full bg-[#000000a3] fixed top-0 left-0 z-[15]`}
      ></div>
      <section
        className={`${roboto_mono.className} ${
          loading ? "conic-gradient-effect" : "border-2 border-blue-dark-5"
        } ${
          aiDialogOpen ? "block" : "hidden"
        } max-w-[800px] w-full fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-20`}
      >
        <div
          // style={{
          //   backgroundImage:
          //     "linear-gradient(0deg, #005aff 0%, transparent 100%)",
          // }}
          className="hidden-scroll bg-blue-dark-1 00 h-[600px] p-6 flex flex-col-reverse gap-12 md:gap-6 relative overflow-auto"
        >
          <Message />
        </div>
        <span
          onClick={() => setAiDialogOpen(false)}
          className="block absolute top-0 left-[0] lg:left-[100%] text-danger p-3 cursor-pointer opacity-90 hover:bg-[#6702024d] transition rounded-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </span>

        {/* <div
          style={{ boxShadow: "40px 90px 500px 50px #005aff7a" }}
          className="w-[0] h-[100%] absolute top-[0] -left-10"
        ></div>
        <div
          style={{ boxShadow: "-30px 90px 500px 50px #005aff7a" }}
          className="w-[0] h-[100%] absolute top-[0] -right-10"
        ></div> */}

        <form className="flex items-center bg-[#004bd586]">
          <input
            type="text"
            name="message"
            placeholder="Ask a Question"
            onChange={(e) => setPrompt(e.target.value)}
            className={`w-full py-4 px-6 text-md bg-[#004bd54a] placeholder:text-gray-400  border-none outline-none`}
            autoFocus
          />
          <button className="p-2 h-[56px] w-[70px] flex justify-center items-center bg-[#004bd579] hover:bg-blue-700">
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
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>
        </form>
      </section>
    </>
  );
}

function Message() {
  return (
    <div className="relative px-6 py-5 bg-blue-dark-3 flex items-start gap-6 rounded-md">
      <div className="absolute -top-7 left-5 md:static min-w-[40px] min-h-[40px] md:min-w-[60px] md:min-h-[60px] rounded-full bg-purple-700"></div>
      <p className="text-base text-gray-200 my-auto">
        Hello my pretty student, i’m alison who will carry you in this course,
        what is your question my joicey firend?
      </p>
    </div>
  );
}
