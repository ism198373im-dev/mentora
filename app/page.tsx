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
    <html lang="ar" suppressHydrationWarning>

      <body className="bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">

        <AuthProvider>

          <Navbar />

          {children}

        </AuthProvider>

      </body>

    </html>
  );
}