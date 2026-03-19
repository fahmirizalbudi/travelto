import type { Metadata } from "next";
import { Outfit, Work_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Travelto - Let's travel the world",
  description: "Enjoy the breathtaking view of nature. Relax and cherish your dreams to the fullest.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${workSans.variable} font-body antialiased text-text bg-white relative tracking-tight`}
      >
        {children}
      </body>
    </html>
  );
}
