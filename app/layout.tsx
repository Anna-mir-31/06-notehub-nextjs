import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'Multi-page app with notes',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>
          {/* Тут ваш хедер */}
        </header>
        <TanStackProvider>{children}</TanStackProvider>
        <footer>
          {/* Тут ваш футер */}
        </footer>
      </body>
    </html>
  );
}
