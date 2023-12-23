import { roboto_condensed } from "@/ui/Fonts";
import Image from "next/image";
import React from "react";
import Button from "../common/Button";

export default function CourseCard({
  headerColor,
  otherColor,
  headerText,
  otherText,
  bg_color,
  courseLink,
  lineOne,
  lineTwo,
  logo_src,
}: {
  headerColor: string;
  otherColor: string;
  bg_color: string;
  courseLink: string;
  lineOne: string;
  lineTwo: string;
  headerText: string;
  otherText: string;
  logo_src: string;
}) {
  return (
    <div
      style={{ backgroundColor: bg_color }}
      className={`${roboto_condensed.className} max-w-[300px] flex flex-col items-center gap-6 py-8 px-6 rounded-lg text-center mx-auto relative overflow-hidden`}
    >
      <span
        style={{ backgroundColor: lineTwo }}
        className={`absolute w-[120px] h-[2px] top-[40px] left-[-20px] block rotate-[135deg]`}
      ></span>

      <span
        style={{ backgroundColor: lineOne }}
        className={`absolute w-[200px] h-[2px] top-[4px] left-[-40px] block rotate-[135deg]`}
      ></span>

      <Image
        src={logo_src}
        alt="logo"
        width={100}
        height={100}
        className="object-contain"
      />

      <h4 style={{ color: headerColor }} className={`text-xl`}>
        {headerText}
      </h4>

      <p style={{ color: otherColor }}>{otherText}</p>

      <Button
        bg_color="bg-primary"
        bg_hover_color="bg-primary-dark"
        btnText="Join Course"
        textColor="text-white"
        targetLink={courseLink}
      />
    </div>
  );
}
