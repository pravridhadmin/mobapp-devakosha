/** @type {import('tailwindcss').Config} */
import { themeColors } from "./src/themes/defaultTheme.ts";
const colors = require("./src/themes/colors.json")
const spacing = require("./src/themes/spacing.json")
const radius = require("./src/themes/radius.json")
const typography = require("./src/themes/typography.json")
const shadows = require("./src/themes/shadows.json")

module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: colors.light.primary,

        accent: {
          DEFAULT: colors.light.accent,
          dark: colors.dark.accent
        },

        secondary: {
          DEFAULT: colors.light.secondary,
          dark: colors.dark.secondary
        },

        success: {
          DEFAULT: colors.light.success,
          dark: colors.dark.success
        },

        warning: {
          DEFAULT: colors.light.warning,
          dark: colors.dark.warning
        },

        background: {
          DEFAULT: colors.light.background,
          dark: colors.dark.background
        },

        surface: {
          DEFAULT: colors.light.surface,
          dark: colors.dark.surface
        },

        text: {
          primary: {
            DEFAULT: colors.light.text.primary,
            dark: colors.dark.text.primary
          }
        },
        placeholder: {
          DEFAULT: colors.light.placeholder,
          dark: colors.dark.placeholder
        }
      },

      spacing: spacing,

      borderRadius: radius,

      fontSize: typography.fontSize,

      fontWeight: typography.fontWeight,

      lineHeight: typography.lineHeight,

      boxShadow: {
        sm: `${shadows.light.sm.shadowOffset.height}px ${shadows.light.sm.shadowRadius}px rgba(0,0,0,${shadows.light.sm.shadowOpacity})`,
        md: `${shadows.light.md.shadowOffset.height}px ${shadows.light.md.shadowRadius}px rgba(0,0,0,${shadows.light.md.shadowOpacity})`,
        lg: `${shadows.light.lg.shadowOffset.height}px ${shadows.light.lg.shadowRadius}px rgba(0,0,0,${shadows.light.lg.shadowOpacity})`
      }

    },
  },
  plugins: [],
  darkMode: 'media',
};