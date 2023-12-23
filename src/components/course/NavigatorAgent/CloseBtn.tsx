import { CourseContext } from "@/context/Course";

export default function CloseBtn() {
  const { setIsNavigatorMenuOpen } = CourseContext();
  return (
    <button
      onClick={() => setIsNavigatorMenuOpen(false)}
      className="p-2 rounded-full text-md text-gray-400 bg-[#702020] hover:bg-[#933a3a] transition"
    >
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
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
}
