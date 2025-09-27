import './globals.css';

export const metadata = {
  title: 'Campaign AI Studio',
  description: 'AI-powered marketing campaign platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
