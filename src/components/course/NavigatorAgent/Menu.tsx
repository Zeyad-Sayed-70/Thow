import { CHARACTERS, FilterBtns } from "@/constants/navigator";
import CharacterBox from "./CharacterBox";
import CloseBtn from "./CloseBtn";
import { useEffect, useState } from "react";

export default function Menu({
  otherSide,
  setOtherSide,
  setDetailsData,
}: {
  otherSide: boolean;
  setOtherSide: (otherSide: boolean) => void;
  setDetailsData: (detailsData: Character) => void;
}) {
  const [characters, setCharacters] = useState<Character[]>(CHARACTERS);
  const [filterData, setFilterData] = useState({
    filter: "all",
    name: "",
  });

  useEffect(() => {
    const filterdCharacters = CHARACTERS.filter((c) => {
      if (filterData.filter !== "all" && filterData.filter !== c.filter)
        return false;

      if (
        filterData.name !== "" &&
        !c.name.toLowerCase().includes(filterData.name.toLowerCase())
      )
        return false;

      return true;
    });

    setCharacters(filterdCharacters);
  }, [filterData]);

  return (
    <section
      className={`${
        otherSide ? "hidden" : "block"
      } gradient-border p-1 md:p-0 max-w-[800px] w-full fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-20`}
    >
      <div className="pt-8 bg-blue-dark-5 pb-1">
        <div className="text-center">
          <h1 className="text-xl2 uppercase mb-6">Choose your navigator</h1>
          <p className="text-gray-400 text-start text-base max-w-full px-2 md:max-w-[500px] mx-auto capitalize">
            this is your navigator in this course, choose who you like to be
            your nevigator and assistant, have fun my friend
          </p>
          <div className="absolute top-3 right-2 md:top-5 md:right-5">
            <CloseBtn />
          </div>
        </div>
        <div className="mt-5">
          <div className="flex items-center gap-2 bg-blue-dark-1 px-3 py-3">
            <div className="hidden md:flex items-center gap-2">
              {FilterBtns.map((fb, ind) => (
                <button
                  key={ind}
                  onClick={() =>
                    setFilterData({ ...filterData, filter: fb.type })
                  }
                  className="text-white bg-blue-dark-4 hover:bg-blue-dark-5 rounded-md px-6 py-1.5 uppercase text-md"
                >
                  {fb.type}
                </button>
              ))}
            </div>
            <button className="text-white bg-blue-dark-4 hover:bg-blue-dark-5 rounded-md px-6 py-1.5 uppercase text-md">
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
                  d="M12 6v12m6-6H6"
                />
              </svg>
            </button>
            <input
              className="w-full text-white border-none outline-none bg-blue-dark-4 hover:bg-blue-dark-5 rounded-md px-3"
              type="text"
              placeholder="Filrter Navigators"
              onChange={(e) =>
                setFilterData({ ...filterData, name: e.target.value })
              }
            />
          </div>
          <div className="max-h-[400px] grid grid-cols-2 md:grid-cols-5 gap-6 bg-blue-dark-3 p-3 overflow-auto">
            {characters.map((character, ind) => (
              <CharacterBox
                key={ind}
                setOtherSide={setOtherSide}
                character={character}
                setDetailsData={setDetailsData}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
