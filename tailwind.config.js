import { brandConfig } from "./src/config/brand.js";

const { theme: brandTheme, typography } = brandConfig;

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: brandTheme.primary,
        secondary: brandTheme.secondary,
        accent: brandTheme.accent,
        surface: brandTheme.background,
        ink: brandTheme.textOnLight,
        nink: brandTheme.textOnDark, //negative ink, for dark backgrounds
        muted: brandTheme.textMuted
      },
      fontFamily: {
        heading: [typography.heading],
        body: [typography.body]
      },
      boxShadow: {
        card: "0 1px 2px rgba(0, 98, 155, 0.06), 0 8px 24px -12px rgba(0, 98, 155, 0.18)",
        cardHover: "0 2px 4px rgba(0, 98, 155, 0.08), 0 16px 32px -16px rgba(0, 98, 155, 0.28)",
        floating: "0 24px 48px -24px rgba(0, 98, 155, 0.35)"
      },
      borderRadius: {
        "2xl": "1rem"
      }
    }
  },
  plugins: []
};
