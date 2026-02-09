import type { Metadata } from "next";
import "./globals.css";
import MainLayout from "@/components/layouts/MainLayout";

export const metadata: Metadata = {
  title: "四叶草事务所",
  description: "Seabed 粉丝网站",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
