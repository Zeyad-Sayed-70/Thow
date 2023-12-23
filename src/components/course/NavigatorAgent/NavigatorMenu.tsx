import React, { useState } from "react";
import Menu from "./Menu";
import Details from "./Details";

export default function NavigatorMenu() {
  const [otherSide, setOtherSide] = useState(false);
  const [detailsData, setDetailsData] = useState<Character>();
  return (
    <>
      <main>
        <div
          className={`w-full h-full bg-[#000000a3] fixed top-0 left-0 z-[15]`}
        ></div>
        <Menu
          otherSide={otherSide}
          setOtherSide={setOtherSide}
          setDetailsData={setDetailsData}
        />
        <Details
          otherSide={otherSide}
          setOtherSide={setOtherSide}
          detailsData={detailsData}
        />
      </main>
    </>
  );
}
