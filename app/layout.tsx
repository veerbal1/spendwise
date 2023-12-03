import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SpendWise: Your Smart Expense Tracker',
  description:
    "SpendWise is the ultimate expense tracker app designed to bring simplicity and insight into your daily financial management. With an intuitive interface, SpendWise makes it easy for you to track your daily expenses, edit entries, and delete mistakes effortlessly. But that's not all - SpendWise is a collaborative tool too! You can add family members or friends to your account, enabling them to contribute to the expense tracking process.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
