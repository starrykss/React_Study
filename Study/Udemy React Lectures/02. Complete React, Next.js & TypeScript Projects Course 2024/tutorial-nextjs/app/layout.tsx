import './globals.css';

import type { Metadata } from 'next';
import { Inter, Inconsolata, Roboto } from 'next/font/google';

import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] }); // google fonts
const inconsolata = Inconsolata({ subsets: ['latin'] }); // google fonts
const roboto = Roboto({ subsets: ['latin'], weight: ['400'] }); // google fonts

// 메타 데이터
export const metadata: Metadata = {
  title: 'Next.js Project',
  description: 'A Next.js project with TypeScript and TailwindCSS.',
  keywords: 'Next.js, Typescript, TailwindCSS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Navbar />
        <main className="max-w-3xl mx-auto py-10">{children}</main>
      </body>
    </html>
  );
}
