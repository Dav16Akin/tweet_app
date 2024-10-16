import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../../styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Topbar from "../components/shared/Topbar";
import LeftSidebar from "../components/shared/LeftSidebar";
import RightSidebar from "../components/shared/RightSidebar";
import Bottombar from "../components/shared/Bottombar";
import { ThemeProvider } from "../components/theme-provider";


const inter = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Tweet: Share your views and insights, Inspire others",
  description: "A Nextjs meta application for Tweets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system">
            <Topbar />
            <main className="flex flex-row">
              <LeftSidebar />
              <section className="flex min-h-screen flex-1 flex-col items-center px-6 pb-10 pt-28 max-md:pb-32 sm:px-10">
                <div className="w-full max-w-4xl">{children}</div>
              </section>
              <RightSidebar />
            </main>
            <Bottombar />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
