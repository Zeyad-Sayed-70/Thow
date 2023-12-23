import { Roboto, Roboto_Condensed, Roboto_Mono } from "next/font/google";

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const roboto_condensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});
