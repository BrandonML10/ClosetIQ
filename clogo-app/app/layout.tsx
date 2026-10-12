import type { Metadata } from "next";
import localFont from "next/font/local";
import "./global.css";

const romantic = localFont({
    src: "./fonts/ROMANTIC.ttf",
    variable: "--font-romantic",
    display: "swap",
});

const lostar = localFont({
    src: "./fonts/Lostar.ttf",
    variable: "--font-lostar",
    display: "swap",
});

export const metadata: Metadata = {
    title: "CLOGO",
    description: "Tu siguiente outfit personalizado",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="es" className={`${romantic.variable} ${lostar.variable}`}>
        <body className="bg-[#FDEC9C] text-white font-sans overflow-x-hidden">
        {children}
        </body>
        </html>
    );
}