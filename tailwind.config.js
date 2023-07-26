import { _ } from "lodash"
import plugin from "tailwindcss/plugin"
import defaultTheme from "tailwindcss/defaultTheme"

function font_size(min, max) {
	const scale = ((max - 16) / 1792) * 100

	return `clamp(${min / 16}rem, calc(1rem + ${scale}vw), ${max / 16}rem)`
}

/** @type {import('tailwindcss').Config} */
export default {
	content: ["index.html", "./src/*.{css, js, txt}"],
	theme: {
		fontSize: {
			xs: "0.75rem", // 12
			sm: "0.875rem", // 14
			base: "1rem", // 16
			lg: "1.125rem", // 18
			xl: "1.25rem", // 20
			"2xl": "1.5rem", // 24
			"3xl": "2rem", // 32
			"4xl": "2.5rem", // 40
			"5xl": "3rem", // 48
			"6xl": "4", // 64
			"7xl": "4.5rem", // 72
			"8xl": "6rem", // 96
			"9xl": "8rem", // 128
		},
		letterSpacing: {
			tight: "-0.01em",
		},
		screens: {
			xs: "360px",
			sm: "520px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
			"2xl": "1600px",
			"3xl": "1920px",

			// Max
			"max-xs": { max: "359px" },
			"max-sm": { max: "479px" },
			"max-md": { max: "767px" },
			"max-lg": { max: "1023px" },
			"max-xl": { max: "1279px" },
			"max-2xl": { max: "1599px" },
			"max-3xl": { max: "1919px" },
		},
		transitionDuration: {
			DEFAULT: "300ms",
			150: "150ms",
			200: "200ms",
			500: "500ms",
			1000: "1000ms",
		},
		transitionTimingFunction: {
			DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
			linear: "linear",
			in: "cubic-bezier(0.4, 0, 1, 1)",
			out: "cubic-bezier(0, 0, 0.2, 1)",
			"in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
		},
		extend: {
			borderWidth: {
				3: "3px",
			},
			colors: {
				transparent: "transparent",
				current: "currentColor",
				white: "#ffffff",
				black: "#1e1e1e",
				brand: {
					dark: "#041f4a",
					main: "#052962",
					pastel: "#506991",
				},
				news: {
					dark: "#ab0613",
					main: "#c70000",
					bright: "#ff4e36",
					pastel: "#ffbac8",
					faded: "#fff4f2",
				},
				opinion: {
					dark: "#bd5318",
					main: "#e05e00",
					bright: "#ff7f0f",
					pastel: "#f9b376",
					faded: "#fef9f5",
				},
				sport: {
					dark: "#005689",
					main: "#0084c6",
					bright: "#00b2ff",
					pastel: "#90dcff",
					faded: "#f1f8fc",
				},
				culture: {
					dark: "#6b5840",
					main: "#a1845c",
					bright: "#eacca0",
					pastel: "#e7d4b9",
					faded: "#fbf6ef",
				},
				lifestyle: {
					dark: "#7d0068",
					main: "#bb3b80",
					bright: "#ffabdb",
					pastel: "#fec8d3",
					faded: "#feeef7",
				},
			},
			fontFamily: {
				sans: ["Inter", ...defaultTheme.fontFamily.sans],
				serif: ["Noticia Text", ...defaultTheme.fontFamily.serif],
			},
			lineHeight: {
				0: "0",
			},
			spacing: {
				120: "30rem",
				144: "36rem",
				"-px": "-1px",
			},
		},
	},
	corePlugins: {
		container: false,
		clear: false,
		float: false,
		outline: false,
	},
	plugins: [
		require("@tailwindcss/forms")(),

		// Hocus
		plugin(function ({ addVariant, e }) {
			addVariant("hocus", ["&:hover", "&:focus"])
			addVariant("group-hocus", [".group:hover &", ".group:focus &"])
		}),

		/*
			Responsive type
			@min: @max * .666666 (rems)
			@val: @max / 1792 * 100 (viewport widths)
			@max: scale value (rems)
		*/
		plugin(function ({ addUtilities }) {
			const typeUtilities = {
				".type-2xs": {
					fontSize: font_size(10, 12), // Small Tag
				},

				".type-xs": {
					fontSize: font_size(12, 14), // Tiny
				},

				".type-sm": {
					fontSize: font_size(14, 16), // Small
				},

				".type-base": {
					fontSize: font_size(14, 18), // P2
				},

				".type-lg": {
					fontSize: font_size(16, 24), // P1
				},

				".type-xl": {
					fontSize: font_size(20, 32), // H4
				},

				".type-2xl": {
					fontSize: font_size(24, 40), // H3
				},

				".type-3xl": {
					fontSize: font_size(32, 48), // H2
				},

				".type-4xl": {
					fontSize: font_size(42, 64), // H1
				},

				".type-5xl": {
					fontSize: font_size(48, 72),
				},

				".type-6xl": {
					fontSize: font_size(64, 96),
				},

				".type-7xl": {
					fontSize: font_size(74, 112),
				},

				".type-9xl": {
					fontSize: font_size(84, 144),
				},
			}

			addUtilities(typeUtilities, ["responsive"])
		}),
	],
}
