import { Poppins } from "next/font/google";
import "../../../styles/globals.css";
export const metadata = {
  title: "Tweet | Sign up",
  description: "Sign up on tweet",
};

const inter = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
