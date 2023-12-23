type LessonElementValueTypes = TextType | ImageType | VideoType | ListType;
type LessonElement = {
  id: string | number;
  type: "message" | "mcq" | "bcq" | "code" | "code-editor" | "user";
  types: ("text" | "image" | "video" | "list" | "code" | "code-editor")[];
  values: LessonElementValueTypes[];
  hasOptions: boolean;
  nextMessage: { [key: string]: string } | string | null;
  options?: {
    value: string;
    label: string;
  }[];
  action?: {
    type: "ask-ai";
    prompt: string;
  };
};
type TextType = {
  readonly type?: "text";
  id: string | number;
  text: string;
  style?: any;
  className?: string;
};

type ImageType = {
  readonly type?: "image";
  id: string | number;
  url: string;
  caption: string;
  style?: any;
  className?: string;
};

type VideoType = {
  readonly type?: "video";
  id: string | number;
  url: string;
  caption: string;
  style?: any;
  className?: string;
};

type ListType = {
  readonly type?: "list";
  id: string | number;
  text: string;
  lists: any[];
  style?: any;
  className?: string;
};

type Options = {
  value: string;
  label: string;
};

type MessageStructure = {
  id: string | number;
  types: string[]; // types sequences
  values: LessonElementValueTypes[]; // values sequences
  hasOptions?: boolean;
  options?: Options[];
  onNextByAnswer: Function;
  setLastMsgHeight: (lastMsgHeight: number) => void;
  action?: {
    type: "ask-ai";
    prompt: string;
  };
  currentId: string;
};

type LessonData = {
  id: number | string;
  type: "lesson";
  lesson_id: number | string;
  link: string;
  name: string;
  date: string;
  messages: LessonElement[];
};

type Character = {
  name: string;
  type: string;
  filter: string;
  role: string;
  age: number;
  gender: string;
  avatar: string;
  overview: string;
};

type Contents = {
  id: number;
  type: string;
  name: string;
  isOpen: boolean;
  date: string;
  modules: {
    id: number;
    type: string;
    name: string;
    isOpen: boolean;
    date: string;
    lessons: {
      id: number;
      type: string;
      name: string;
      link: string;
      date: string;
    }[];
  }[];
}[];
