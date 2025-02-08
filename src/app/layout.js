import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Head from "next/head";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Carbo",
  description: "Next-gen Carbon Tracking",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body className={inter.className}>
          <Header /> 
          <main>{children}</main> 
          <Footer /> 
        </body>
      </html>
    </ClerkProvider>
  );
}
