import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <section className="py-12">
      <h1 className="text-lg font-semibold capitalize mb-6">Lessons List</h1>
      <ul className="w-fit text-base text-blue-500 underline flex flex-col gap-2 pl-6">
        <li className="hover:text-blue-400">
          <Link href={"#"}>Lesson 1</Link>
        </li>
        <li className="hover:text-blue-400">
          <Link href={"#"}>Lesson 2</Link>
        </li>
        <li className="hover:text-blue-400">
          <Link href={"#"}>Lesson 3</Link>
        </li>
      </ul>
    </section>
  );
}
