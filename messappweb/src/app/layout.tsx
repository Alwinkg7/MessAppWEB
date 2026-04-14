import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/utils/theme-context";
import { AuthProvider } from "@/utils/auth-context";
import { Toaster } from "react-hot-toast";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter", 
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-space-grotesk", 
});

export const metadata: Metadata = {
  title: "MessApp | Smart Mess Management",
  description: "Modern, automated canteen and mess management system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <ThemeProvider>
          <AuthProvider>
            {children}
            <Toaster 
              position="top-right" 
              toastOptions={{ 
                duration: 3000,
                className: "brutal-card font-body font-bold !bg-theme-card !text-foreground !rounded-sm !border-3 !border-border-color !shadow-brutal-sm",
                success: {
                  iconTheme: {
                    primary: "var(--color-brutal-green)",
                    secondary: "var(--color-brutal-dark)",
                  },
                },
                error: {
                  iconTheme: {
                    primary: "var(--color-brutal-pink)",
                    secondary: "white",
                  },
                },
              }} 
            />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
