import React, { createContext, useContext, useState, useEffect } from "react";

interface CourseType {
  sideBararOpen: boolean;
  aiDialogOpen: boolean;
  setSideBarOpen: (sideBararOpen: boolean) => void;
  setAiDialogOpen: (aiDialogOpen: boolean) => void;
  isNavigatorMenuOpen: boolean;
  setIsNavigatorMenuOpen: (isNavigatorMenuOpen: boolean) => void;
}

const initialData: CourseType = {
  sideBararOpen: false,
  aiDialogOpen: false,
  isNavigatorMenuOpen: false,
  setSideBarOpen: (value: boolean) => {},
  setAiDialogOpen: (value: boolean) => {},
  setIsNavigatorMenuOpen: (value: boolean) => {},
};

export const _CourseContext = createContext(initialData);

export default function CourseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sideBararOpen, setSideBarOpen] = useState<boolean>(false);
  const [aiDialogOpen, setAiDialogOpen] = useState<boolean>(false);
  const [isNavigatorMenuOpen, setIsNavigatorMenuOpen] =
    useState<boolean>(false);

  return (
    <_CourseContext.Provider
      value={{
        sideBararOpen,
        aiDialogOpen,
        setSideBarOpen,
        setAiDialogOpen,
        isNavigatorMenuOpen,
        setIsNavigatorMenuOpen,
      }}
    >
      {children}
    </_CourseContext.Provider>
  );
}

export const CourseContext = () => useContext(_CourseContext);
