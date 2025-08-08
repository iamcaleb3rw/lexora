// app/fonts/sf-pro.ts
import localFont from "next/font/local";

export const sfPro = localFont({
  src: [
    {
      path: "./SFProDisplay-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./SFProDisplay-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./SFProDisplay-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./SFProDisplay-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-sf-pro",
  display: "swap",
});
