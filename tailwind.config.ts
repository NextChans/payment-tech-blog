import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "70ch",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
