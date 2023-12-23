import { LESSONS_CONTENT } from "@/constants/dummyLesson";
import React, { useEffect, useRef, useState } from "react";

export default function useLesson({ lesson_id }: { lesson_id: string }) {
  const [isNextBtnReady, setIsNextBtnReady] = useState(false);
  const [isNextLoading, setIsNextLoading] = useState(true);
  const [lessonData, setLessonData] = useState<LessonData | null>(null);
  const [chatData, setChatData] = useState<LessonElement[]>([]);
  const [nextMsgId, setNextMsgId] = useState<string>("");
  const [currentId, setCurrentId] = useState<string>("");
  const sectionRef = useRef<HTMLDivElement>(null);
  const [lastMsgHeight, setLastMsgHeight] = useState<number>(0);

  function handleContinue() {
    if (nextMsgId === "") return;

    fetchNextMsgById(nextMsgId);
  }

  function checkContinueBtnReady(el: LessonElement) {
    if (el.hasOptions) setIsNextBtnReady(false);
    else setIsNextBtnReady(true);
  }

  function checkNextId(el: LessonElement) {
    if (el.nextMessage === null) {
      return console.log("the lesson stoped...");
    }

    if (!el.hasOptions) {
      // set the next message id
      setNextMsgId(el.nextMessage as string);
    } else setNextMsgId("");
  }

  function fetchNextMsgById(id: string) {
    if (!lessonData || typeof id !== "string") return;

    // turn on the loader
    setIsNextLoading(true);

    // fetch next message
    setTimeout(() => {
      const nextMsg = lessonData.elements.find(
        (el) => el.id == id
      ) as LessonElement;
      // console.log(id, nextMsg);
      checkContinueBtnReady(nextMsg);

      // add the new message to the chat
      setChatData([...chatData, nextMsg]);

      // update current_id
      setCurrentId(nextMsg.id.toString());

      // store next id in the state
      checkNextId(nextMsg);

      // turn off the loader
      setIsNextLoading(false);

      setTimeout(() => {
        // scroll to most bottom
        const targetEl = sectionRef.current?.parentElement?.parentElement;
        targetEl?.scrollBy({
          behavior: "smooth",
          top: lastMsgHeight + 70,
        });
      }, 10);
    }, 400);
  }

  function onNextByAnswer(answer: string) {
    if (!lessonData) return;
    const ele = lessonData.elements.find(
      (el) => el.id == currentId
    ) as LessonElement;

    if (typeof ele.nextMessage !== "object" && ele.nextMessage === null) return;
    const nextId = (ele.nextMessage as any)[answer];

    fetchNextMsgById(nextId);
  }

  useEffect(() => {
    if (lessonData !== null) {
      // display first message
      const firstMsgId = "0";
      fetchNextMsgById(firstMsgId);
    }
  }, [lessonData]);

  useEffect(() => {
    const target = LESSONS_CONTENT.find((lesson) => lesson.id == lesson_id);
    setLessonData(target as LessonData);
  }, []);

  useEffect(() => {
    if (nextMsgId === "") return;
  }, [nextMsgId]);

  return {
    sectionRef,
    isNextLoading,
    onNextByAnswer,
    handleContinue,
    chatData,
    currentId,
    setLastMsgHeight,
    isNextBtnReady,
  };
}
