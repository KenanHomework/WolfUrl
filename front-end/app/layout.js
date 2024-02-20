import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "@/components/layouts/layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "URL Shortener | Wolf Url",
  description: "Short your URLs | URL Shortener",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/*<Providers>*/}
        <Layout>{children}</Layout>
        {/*</Providers>*/}
      </body>
    </html>
  );
}
