import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Apex Local & SEO Suite — Dominação de 3-Pack e Alta Conversão',
  description: 'SaaS Multi-Tenant de SEO Local, GBP Fast-Track, Core Web Vitals e GTM Automation.',
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    shortcut: ['/icon.svg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="text-slate-100 min-h-screen antialiased selection:bg-teal-400 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
