import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6A0DAD",
        "primary-dark": "#4D0A8A",
        white: "#FFFFFF",
        black: "#000000",
        success: "#4CAF50",
        warn: "#E2A52F",
        danger: "#E83B24",
        "white-v": "#F5F5F5",
        "black-v": "#333333",
        "gray-1": "#909090",
        "purple-dark-1": "#110512",
        "purple-dark-2": "#240B26",
        "purple-dark-3": "#331136",
        "purple-dark-4": "#350F39",
        "purple-dark-5": "#4E1653",
        "purple-dark-6": "#6A2070",
        "blue-dark-1": "#050F19",
        "blue-dark-2": "#06121E",
        "blue-dark-3": "#091C2E",
        "blue-dark-4": "#0E2944",
        "blue-dark-5": "#123559",
      },
      fontSize: {
        xl2: "24px",
        xl3: "26px",
        xl4: "28px",
        xl5: "32px",
        xl6: "34px",
      },
    },
  },
  extend: {},
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/container-queries"),
  ],
};

export default config;
