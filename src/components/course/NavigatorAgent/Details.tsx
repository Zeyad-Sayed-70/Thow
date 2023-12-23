import CloseBtn from "./CloseBtn";

export default function Details({
  otherSide,
  detailsData,
  setOtherSide,
}: {
  otherSide: boolean;
  detailsData: Character | undefined;
  setOtherSide: (otherSide: boolean) => void;
}) {
  return (
    <section
      className={`${
        otherSide ? "block" : "hidden"
      } gradient-border max-w-[800px] p-1 md:p-0 bg-blue-dark-4 w-full md:h-auto fixed top-[50%] md:left-[50%] md:translate-x-[-50%] translate-y-[-50%] z-20`}
    >
      <div className="py-8 px-6 bg-blue-dark-5">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setOtherSide(false)}
            className="py-2 px-4 rounded-md capitalize text-md text-gray-400 hover:text-white flex items-center gap-2 transition"
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
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>
            go back
          </button>
          <CloseBtn />
        </div>
        <div className="flex justify-center items-center text-center md:text-start gap-8 md:gap-16 mt-4 flex-col md:flex-row">
          <div className="h-[250px] min-w-[200px] md:h-[350px] md:min-w-[280px] bg-purple-800 rounded-lg"></div>
          <div className="text-md md:text-xl capitalize flex flex-col gap-2 md:gap-5">
            {Object.entries(detailsData || {}).map(([key, val], ind) => {
              if (key === "filter" || key === "avatar") return;

              return (
                <p key={ind}>
                  {key}: <span className="text-gray-400">{val}</span>
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
