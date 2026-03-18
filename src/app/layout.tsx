import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "ระบบการเงิน โรงเรียนวัดบ้านดอน",
  description: "ระบบจัดการการเงินโรงเรียนวัดบ้านดอน",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={cn("font-sans", geist.variable)}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
