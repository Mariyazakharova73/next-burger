import type { Metadata } from "next";
import { PageWrapper } from './PageWrapper';
import { StoreProvider } from './StoreProvider';
import "./globals.css";

export const metadata: Metadata = {
  title: "Next burger",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body id="root" 
        >
          <PageWrapper>{children}</PageWrapper>
        </body>
        <div id="modals"></div>
      </html>
    </StoreProvider>
  );
}