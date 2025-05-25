import type { Metadata } from 'next';
import { Poppins, Pacifico } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"; // Added Toaster

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-poppins',
});

const pacifico = Pacifico({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-pacifico',
});

export const metadata: Metadata = {
  title: 'Farewell Fiesta',
  description: 'A special farewell message from Raihan.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${pacifico.variable} font-sans antialiased flex flex-col min-h-screen`}>
        <main className="flex-grow">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
