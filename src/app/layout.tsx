import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chatbot",
  description: "Next.js + Prisma + OpenAI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
