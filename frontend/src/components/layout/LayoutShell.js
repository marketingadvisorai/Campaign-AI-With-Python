'use client';

import { useState } from 'react';
import Link from 'next/link';

const links = [
  { href: '/', label: 'Dashboard' },
  { href: '/dashboard/campaigns', label: 'Campaigns' },
  { href: '/dashboard/profile', label: 'Profile' },
];

export default function LayoutShell({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="app-shell">
      <aside className={`sidebar ${isMenuOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar__header">
          <span className="logo">Campaign AI</span>
          <button type="button" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle navigation">
            ☰
          </button>
        </div>
        <nav>
          <ul>
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={() => setIsMenuOpen(false)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="content">{children}</main>
      <style jsx>{`
        .app-shell {
          display: grid;
          grid-template-columns: 260px 1fr;
          min-height: 100vh;
          background: linear-gradient(135deg, #0f172a 0%, #020617 60%);
        }
        .sidebar {
          background: rgba(15, 23, 42, 0.9);
          backdrop-filter: blur(12px);
          border-right: 1px solid rgba(148, 163, 184, 0.2);
          padding: 2rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .sidebar__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .sidebar__header button {
          display: none;
          background: transparent;
          border: 0;
          font-size: 1.5rem;
          color: inherit;
        }
        .logo {
          font-weight: 700;
          font-size: 1.2rem;
        }
        nav ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin: 0;
          padding: 0;
        }
        nav a {
          color: #e2e8f0;
          font-weight: 500;
        }
        nav a:hover {
          color: #38bdf8;
        }
        .content {
          padding: 3rem;
        }
        @media (max-width: 900px) {
          .app-shell {
            display: flex;
            flex-direction: column;
          }
          .sidebar {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            width: min(280px, 80vw);
            transform: translateX(-110%);
            transition: transform 0.3s ease;
            z-index: 20;
          }
          .sidebar.sidebar--open {
            transform: translateX(0);
          }
          .sidebar__header button {
            display: inline-flex;
          }
          .content {
            padding: 1.5rem;
            margin-left: 0;
          }
        }
      `}</style>
    </div>
  );
}
