import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  title: "DinhDinh Cake - Tiệm bánh ngọt ngào",
  description: "Khám phá thế giới bánh kem ngọt ngào tại DinhDinh Cake. Đa dạng mẫu mã, hương vị tuyệt hảo cho mọi dịp đặc biệt.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${poppins.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
