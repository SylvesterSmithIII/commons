import localFont from "next/font/local";
import "./globals.css";

export const Stardom = localFont({
  src: [
    {
      path: "../public/Stardom.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-stardom",
});

export const Parf = localFont({
  src: [
    {
      path: "../public/parf.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-parf",
});

export const metadata = {
  title: "The Commons",
  description: "Learn with us at the Commons Learning Hub!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` ${Stardom.variable} ${Parf.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
