module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			maxWidth: {
				default: "1440px",
			},
			colors: {
				background: "#F1F5FF",
				primary: {
					50: "#ecf2ff",
					100: "#dee6f7",
					200: "#ccd4ea",
					300: "#b7c2e1",
					400: "#6f85c3",
					500: "#204cca",
					600: "#17358c",
					700: "#293551",
					800: "#16203B",
					900: "#151b2c",
				},
				secondary: {
					50: "#FFC2C2",
					100: "#FF8585",
					200: "#FF7070",
					300: "#FF5151",
					400: "#FF3333",
					500: "#D72020",
					600: "#C31D1D",
					700: "#B11B1B",
					800: "#8E1515",
					900: "#8E1515",
				},
				tertiary: {
					300: "#F5D558",
					400: "#F3CB2B",
					500: "#FFCB00",
					600: "#E0B400",
					700: "#B89300",
				},
				grey: {
					offwhite: "#f5f5f5",
					silver: "#e0e0e0",
					metal: "#c9c9c9",
					steel: "#6f6f6f",
					shadow: "#4d4d4d",
					iron: "#444444",
					charcoal: "#333333",
					midnight: "#141414",
				},
			},
		},
	},
	plugins: [],
};
