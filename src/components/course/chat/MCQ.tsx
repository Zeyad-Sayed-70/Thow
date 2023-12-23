"use client";
import React from "react";

export default function MCQ() {
  function handleClick() {}
  return (
    <div className="bg-blue-dark-3 p-6 py-8 rounded-lg">
      <div className="flex flex-wrap @xl:flex-nowrap gap-4 relative">
        <div className="min-w-[40px] h-[40px] absolute left-[50%] -top-8 translate-x-[-50%] translate-y-[-50%] @xl:static @xl:translate-x-0 @xl:translate-y-0 rounded-full bg-purple-dark-5"></div>
        <div>
          <p className="text-lg whitespace-pre-wrap max-w-full">
            1. Which of the following is NOT a valid data type in Python?
          </p>
          <div className="flex flex-col items-center @md:flex-row gap-12 justify-between mt-8">
            <div className="flex flex-col gap-3">
              <RadioBtn id="a" label="String" value="string" name="q1" />
              <RadioBtn id="b" label="Integer" value="integer" name="q1" />
              <RadioBtn id="c" label="Float" value="float" name="q1" />
              <RadioBtn id="d" label="Pointer" value="pointer" name="q1" />
            </div>
            <div className="w-24 h-24 @md:mr-12 flex flex-col items-center justify-center rounded-full bg-blue-dark-2 ring-4 ring-blue-dark-5">
              <span className="text-3xl mb-2 block">94%</span>
              <span className="text-sm text-success font-semibold whitespace-nowrap block uppercase">
                pass this question
              </span>
            </div>
          </div>
          <div className="flex flex-wrap justify-end gap-4 mt-12">
            <button
              onClick={() => handleClick()}
              className="py-1.5 px-4 rounded-lg uppercase hover:text-gray-300"
            >
              show explanation
            </button>
            <button
              onClick={() => handleClick()}
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

function RadioBtn({
  id,
  label,
  value,
  name,
}: {
  id: string;
  label: string;
  value: string;
  name: string;
}) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const id = e.target.id;
    const value = e.target.value;
    console.log({ id, value });
  }
  return (
    <div className="flex items-center gap-4 px-4 py-2 rounded-lg bg-blue-dark-4">
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        className="w-6 h-6 bg-blue-dark-5 checked:bg-blue-900 focus:bg-blue-dark-4 border-0 cursor-pointer"
        onChange={handleChange}
      />
      <label htmlFor={id} className="text-md capitalize">
        {label}
      </label>
    </div>
  );
}
