export default function UserInput() {
  return (
    <form className="flex items-center gap-3 py-3 px-4 rounded-xl sticky bottom-0 w-full backdrop-blur-sm bg-[#004bd54a]">
      <input
        type="text"
        name="user-input"
        placeholder="Ask a Question..."
        className="w-full py-2 px-4 block bg-transparent border-none focus:outline-none outline-none placeholder:text-gray-400"
      />
      <button className="p-2 rounded-lg flex justify-center bg-blue-800 hover:bg-blue-700">
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
  );
}
