import Image from "next/image";

export default function CharacterBox({
  setOtherSide,
  character,
  setDetailsData,
}: {
  character: Character;
  setDetailsData: (detailsData: Character) => void;
  setOtherSide: (otherSide: boolean) => void;
}) {
  return (
    <div
      onClick={() => {
        setDetailsData(character);
        setOtherSide(true);
      }}
      className="cursor-pointer"
    >
      <div className="h-[150px] bg-purple-900 p-3">
        {/* <Image alt="avatar" src={""} width={100} height={100} /> */}
      </div>
      <h2 className="capitalize text-sm bg-blue-dark-1 p-2 px-3">
        {character.name}
      </h2>
    </div>
  );
}
