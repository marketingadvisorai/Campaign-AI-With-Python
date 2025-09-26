import '../styles/globals.css';
import LayoutShell from '@/components/layout/LayoutShell';

export const metadata = {
  title: 'Campaign AI Platform',
  description: 'Manage AI-driven marketing campaigns',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
