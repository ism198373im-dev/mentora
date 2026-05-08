import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/lib/AuthProvider";

export const metadata = {
  title: "Mintara",
  description: "Modern Learning Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar">

      <body className="bg-white text-gray-900">

        <AuthProvider>

          <Navbar />

          {children}

        </AuthProvider>

      </body>

    </html>
  );
}