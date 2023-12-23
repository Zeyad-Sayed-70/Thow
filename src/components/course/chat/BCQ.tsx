"use client";
import React from "react";

export default function BCQ() {
  const [answer, setAnswer] = React.useState<boolean | null>(null);
  function handleCheck() {}
  function handleShowExplanation() {}
  return (
    <div className="bg-blue-dark-3 p-6 py-8 rounded-lg">
      <div className="flex flex-wrap @xl:flex-nowrap gap-4 relative">
        <div className="min-w-[40px] h-[40px] absolute left-[50%] -top-8 translate-x-[-50%] translate-y-[-50%] @xl:static @xl:translate-x-0 @xl:translate-y-0 rounded-full bg-purple-dark-5"></div>
        <div className="flex-1">
          <p className="text-lg whitespace-pre-wrap max-w-full">
            2. IS STRING NOT a valid data type in Python?
          </p>
          <div className="flex flex-col items-center @md:flex-row gap-12 justify-between mt-8">
            <div className="flex gap-12">
              <div>
                <h4 className="text-lg font-semibold capitalize">True</h4>
                <span
                  onClick={() => setAnswer(true)}
                  className="flex justify-center items-center text-lg font-bold w-12 h-12 rounded-md bg-blue-dark-4 hover:bg-blue-dark-5 border-blue-dark-1 border-2 cursor-pointer"
                >
                  {answer && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="w-8 h-8 text-success"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  )}
                </span>
              </div>
              <div>
                <h4 className="text-lg font-semibold capitalize">False</h4>
                <span
                  onClick={() => setAnswer(false)}
                  className="flex justify-center items-center text-lg font-bold w-12 h-12 rounded-md bg-blue-dark-4 hover:bg-blue-dark-5 border-blue-dark-1 border-2 cursor-pointer"
                >
                  {answer === false && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="w-8 h-8 text-success"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  )}
                </span>
              </div>
            </div>
            <div className="w-24 h-24 @md:mr-12 flex flex-col items-center justify-center rounded-full bg-blue-dark-2 ring-4 ring-blue-dark-5">
              <span className="text-3xl mb-2 block">72%</span>
              <span className="text-sm text-warn font-semibold whitespace-nowrap block uppercase">
                pass this question
              </span>
            </div>
          </div>
          <div className="flex flex-wrap justify-end gap-4 mt-12">
            <button
              onClick={() => handleShowExplanation()}
              className="py-1.5 px-4 rounded-lg uppercase hover:text-gray-300"
            >
              show explanation
            </button>
            <button
              onClick={() => handleCheck()}
              className="py-1.5 px-4 rounded-lg text-lg uppercase bg-blue-dark-4 hover:bg-blue-dark-5"
            >
              check
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
