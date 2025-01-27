import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({ children }) {
  return (
    
    <html lang="en">
      <title>Teleios - Leap Nights</title>
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      > 
        <div className="relative min-h-screen flex flex-col">
          <video
            autoPlay
            loop
            muted
            className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
          >
            <source src="/assets/video/dome.webm" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute top-0 left-0 w-full h-full bg-[#07251c] bg-opacity-80 z-0"></div>
          <div className="relative z-10 flex flex-col flex-grow text-white">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer className="mt-auto" /> 
          </div>
        </div>
      </body>
    </html>
  );
}
