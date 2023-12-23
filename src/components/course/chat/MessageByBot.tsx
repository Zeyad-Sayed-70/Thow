"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function MessageByBot({
  id,
  types,
  values,
  hasOptions = true,
  options,
  onNextByAnswer,
  currentId,
  setLastMsgHeight,
}: MessageStructure) {
  const lastMsgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lastMsgRef.current) {
      setLastMsgHeight(lastMsgRef.current.getBoundingClientRect().y);
    }
  }, []);

  function handleClick(value: string) {
    onNextByAnswer(value);
  }
  return (
    <>
      <div
        ref={lastMsgRef}
        className="bg-blue-dark-3 p-6 py-8 rounded-lg slide-bottom"
      >
        <div className="flex flex-wrap @xl:flex-nowrap gap-4 relative">
          <div className="min-w-[40px] h-[40px] absolute left-[50%] -top-8 translate-x-[-50%] translate-y-[-50%] @xl:static @xl:translate-x-0 @xl:translate-y-0 rounded-full bg-purple-dark-5"></div>
          <div className="flex  flex-col gap-12">
            {types.map((type, index) => {
              const value: any = values[index];
              if (type === "text")
                return <TextComponent key={index} value={value} />;
              else if (type === "image")
                return <ImageComponent key={index} value={value} />;
              else if (type === "video")
                return <VideoComponent key={index} value={value} />;
              else if (type === "list")
                return <ListComponent key={index} value={value} />;
            })}
          </div>
        </div>

        {hasOptions && (
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {options?.map((opt, ind) => (
              <button
                key={ind}
                onClick={() => handleClick(opt.label)}
                className="py-1.5 px-4 rounded-lg bg-blue-dark-4 hover:bg-blue-dark-5 disabled:text-gray-500 capitalize"
                disabled={id != currentId}
              >
                {opt.value}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function TextComponent({ value }: { value: TextType }) {
  return <p className="text-xl whitespace-pre-wrap max-w-full">{value.text}</p>;
}

function ImageComponent({ value }: { value: ImageType }) {
  return (
    <div className={`${value.className}`} style={value.style}>
      <Image
        alt={`photo`}
        src={value.url}
        width={500}
        height={500}
        className="w-full"
      />
      <p className="text-sm text-gray-500">{value.caption}</p>
    </div>
  );
}

function VideoComponent({ value }: { value: ImageType }) {
  return (
    <div className={`${value.className}`} style={value.style}>
      {/* Handle the iframe of the videoo here... */}
      <p className="text-sm text-gray-500">{value.caption}</p>
    </div>
  );
}

function ListComponent({ value }: { value: ListType }) {
  return (
    <div className={`${value.className}`} style={value.style}>
      <ul className="list-[upper-roman] list-inside marker:text-yellow-400 text-lg">
        <h2 className="mb-6">{value.text}</h2>
        {value.lists.map((item, ind) => (
          <li key={ind} className="mb-3">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
