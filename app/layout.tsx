import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Mentora",
  description: "Learning + Quran + Tutors Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>

        <Navbar />

        {children}

      </body>
    </html>
  );
}