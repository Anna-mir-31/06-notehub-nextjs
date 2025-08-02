import './globals.css';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'A modern note-taking app',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>{children}</TanStackProvider>
      </body>
    </html>
  );
}
}
