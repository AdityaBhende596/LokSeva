import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/components/auth-context';

export const metadata: Metadata = {
  title: 'LokSeva — Know Your Rights',
  description: 'AI-powered civic rights and guidance assistant.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
