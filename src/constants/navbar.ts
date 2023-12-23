import {
  AcademicCapIcon,
  NewspaperIcon,
  MegaphoneIcon,
  InformationCircleIcon,
  HomeIcon,
  ArrowRightOnRectangleIcon,
  HeartIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";

export const solutions = [
  {
    name: "Home",
    description: "Move to the Base.",
    href: "/",
    icon: HomeIcon,
  },
  {
    name: "Courses",
    description: "Explore many useful courses.",
    href: "/courses",
    icon: AcademicCapIcon,
  },
  {
    name: "Articles",
    description: "Broud your knoladge by reading many exciting articles.",
    href: "/articles",
    icon: NewspaperIcon,
  },
  {
    name: "About Us",
    description: "Know more about us and our goals.",
    href: "/about-us",
    icon: MegaphoneIcon,
  },
  {
    name: "Support",
    description: "Get help about any issues you face.",
    href: "/support",
    icon: InformationCircleIcon,
  },
];

export const callsToAction = [
  { name: "sign in", href: "/login", icon: ArrowRightOnRectangleIcon },
  { name: "profile", href: "/profile", icon: UserCircleIcon },
  { name: "donate", href: "/donate", icon: HeartIcon },
];
