"use client";
import React from "react";
import MessageByBot from "@/components/course/chat/MessageByBot";
import MessageTextByUser from "@/components/course/chat/MessageTextByUser";
import UserInput from "@/components/course/chat/UserInput";
import { roboto } from "@/ui/Fonts";
import useLesson from "@/hooks/lesson";
import { useParams } from "next/navigation";

export default function page() {
  const { lesson_id } = useParams();
  const {
    sectionRef,
    isNextLoading,
    onNextByAnswer,
    handleContinue,
    chatData,
    currentId,
    setLastMsgHeight,
    isNextBtnReady,
  } = useLesson({ lesson_id: lesson_id as string });

  return (
    <section
      ref={sectionRef}
      className={`${roboto.className} text-gray-200 @container flex flex-col gap-12 pb-12`}
    >
      {chatData.map((msg) => {
        if (msg.type === "message") {
          return (
            <MessageByBot
              key={msg.id}
              {...msg}
              onNextByAnswer={onNextByAnswer}
              currentId={currentId}
              setLastMsgHeight={setLastMsgHeight}
            />
          );
        } else if (msg.type === "user") {
          return <MessageTextByUser />;
        }
      })}
      {isNextBtnReady && (
        <button
          className="py-2 px-4 w-fit mx-auto rounded-lg bg-blue-dark-4 hover:bg-blue-dark-5 animate-pulse"
          onClick={handleContinue}
        >
          Continue
        </button>
      )}
      {isNextLoading && <Loader />}
      <UserInput />
    </section>
  );
}

function Loader() {
  return (
    <div className="flex justify-center">
      <div className="loader">
        <div className="inner one"></div>
        <div className="inner two"></div>
        <div className="inner three"></div>
      </div>
    </div>
  );
}
