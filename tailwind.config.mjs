/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/widget/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                poppins: ["var(--font-poppins)", "sans-serif"],
            },
            colors: {
                primary: "#474848",
                secondary: "#E9EEF5",
                default: "#F9FBFF",
                paper: "#FFFFFF",
                warning_light: "#FF9458",
                warning_main: "#FF5E29",
                info_light: "#2A66FF",
                info_main: "#4665FF",
                info_dark: "#5685FF",
                info_deep: "#294DFF",
                info_footer: "#253053",
                success_main: "#0D4715",
                gary_700: "#E2E2E2",
                gray_600: "#EFF5F5",
                gray_500: "#EFF3F3",
                gray_300: "#E5F1FF",
            },
            fontSize: {
                xxs: ".5rem", // 8px         caption p
                xs: "0.75rem", //"12px",     body2  p
                sm: "0.875rem", //14px",     subtitle2   p
                base: "1rem", //"16px",      body1   p
                lg: "1.125rem", //"18px",    subtitle1    p
                xl: "1.25rem", //"20px",     H6
                "2xl": "1.5rem", //"24px",   H5
                "3xl": "1.625rem", // 26px    H4
                "4xl": "1.75rem", //"28px",  H3
                "5xl": "2rem", // "32px",    H2
                "6xl": "2.25rem", //"36px",  H1
            },
        },
    },

    plugins: [
        function ({ addComponents, theme }) {
            addComponents({
                ".text-H1": {
                    fontSize: theme("fontSize.3xl"),

                    "@screen md": {
                        fontSize: theme("fontSize.4xl"), // Large screen
                    },
                    "@screen 2xl": {
                        fontSize: theme("fontSize.6xl"), // Biggest screen
                    },
                },
                ".text-H2": {
                    fontSize: theme("fontSize.2xl"),

                    "@screen md": {
                        fontSize: theme("fontSize.3xl"), // Large screen
                    },
                    "@screen 2xl": {
                        fontSize: theme("fontSize.5xl"), // Biggest screen
                    },
                },
                ".text-H3": {
                    fontSize: theme("fontSize.xl"),

                    "@screen md": {
                        fontSize: theme("fontSize.2xl"), // Large screen
                    },
                    "@screen 2xl": {
                        fontSize: theme("fontSize.4xl"), // Biggest screen
                    },
                },
                ".text-H4": {
                    fontSize: theme("fontSize.lg"),

                    "@screen md": {
                        fontSize: theme("fontSize.xl"), // Large screen
                    },
                    "@screen 2xl": {
                        fontSize: theme("fontSize.3xl"), // Biggest screen
                    },
                },
                ".text-H5": {
                    fontSize: theme("fontSize.lg"),

                    "@screen md": {
                        fontSize: theme("fontSize.xl"), // Large screen
                    },
                    "@screen 2xl": {
                        fontSize: theme("fontSize.2xl"), // Biggest screen
                    },
                },
                ".text-H6": {
                    fontSize: theme("fontSize.sm"),

                    "@screen md": {
                        fontSize: theme("fontSize.xl"), // Large screen
                    },
                    "@screen 2xl": {
                        fontSize: theme("fontSize.xl"), // Biggest screen
                    },
                },
                ".text-subtitle1": {
                    fontSize: theme("fontSize.sm"),

                    "@screen md": {
                        fontSize: theme("fontSize.lg"), // Large screen
                    },
                    "@screen 2xl": {
                        fontSize: theme("fontSize.lg"), // Biggest screen
                    },
                },
                ".text-subtitle2": {
                    fontSize: theme("fontSize.xs"),

                    "@screen md": {
                        fontSize: theme("fontSize.sm"), // Large screen
                    },
                    "@screen 2xl": {
                        fontSize: theme("fontSize.sm"), // Biggest screen
                    },
                },
                ".text-body1": {
                    fontSize: theme("fontSize.xs"),

                    "@screen 2xl": {
                        fontSize: theme("fontSize.base"), // Biggest screen
                    },
                },
                ".text-body2": {
                    fontSize: theme("fontSize.xs"),
                    "@screen 2xl": {
                        fontSize: theme("fontSize.xs"), // Large screen
                    },
                },
                ".text-caption": {
                    fontSize: theme("fontSize.xxs"),
                    "@screen 2xl": {
                        fontSize: theme("fontSize.xs"), // Large screen
                    },
                },
            });
        },
    ],
};
