import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        // Electric Orange Brand Colors
        primary: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#FF5C00", // Primary electric orange
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
          950: "#431407",
        },
        secondary: {
          50: "#fff8f1",
          100: "#feecdc",
          200: "#fcd9bd",
          300: "#fdba74",
          400: "#fb923c",
          500: "#FF8A00", // Secondary orange
          600: "#f97316",
          700: "#ea580c",
          800: "#c2410c",
          900: "#9a3412",
          950: "#7c2d12",
        },
        // Electric accent colors
        electric: {
          orange: "#FF5C00",
          amber: "#FF8A00",
          yellow: "#FFB800",
          red: "#FF3D00",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "pulse-glow": {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(255, 92, 0, 0.3)",
            transform: "scale(1)",
          },
          "50%": {
            boxShadow: "0 0 40px rgba(255, 92, 0, 0.6)",
            transform: "scale(1.02)",
          },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "slide-in-left": "slide-in-left 0.6s ease-out",
        "slide-in-right": "slide-in-right 0.6s ease-out",
        "scale-in": "scale-in 0.4s ease-out",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "gradient-shift": "gradient-shift 3s ease infinite",
        float: "float 3s ease-in-out infinite",
        "bounce-subtle": "bounce-subtle 2s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-electric": "linear-gradient(90deg, #FF5C00, #FF8A00)",
        "gradient-electric-vertical": "linear-gradient(180deg, #FF5C00, #FF8A00)",
        "gradient-electric-radial": 'radial-  "linear-gradient(180deg, #FF5C00, #FF8A00)',
        "gradient-electric-radial": "radial-gradient(circle, #FF5C00, #FF8A00)",
        "gradient-mesh": "conic-gradient(from 0deg, #FF5C00, #FF8A00, #FFB800, #FF5C00)",
      },
      boxShadow: {
        glow: "0 0 20px rgba(255, 92, 0, 0.3)",
        "glow-lg": "0 0 40px rgba(255, 92, 0, 0.4)",
        "glow-xl": "0 0 60px rgba(255, 92, 0, 0.5)",
        "inner-glow": "inset 0 0 20px rgba(255, 92, 0, 0.2)",
        electric: "0 0 30px rgba(255, 92, 0, 0.4), 0 0 60px rgba(255, 138, 0, 0.2)",
      },
      backdropBlur: {
        xs: "2px",
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
