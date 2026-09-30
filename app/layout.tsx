import type { ReactNode } from "react";
import "@fontsource-variable/inter";
import "./globals.css";
import "@/styles/theme.css";
import "@/styles/redesign-integration.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var saved=localStorage.getItem('flytek-theme');var dark=saved?saved==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.dataset.theme=dark?'dark':'light';document.documentElement.style.colorScheme=dark?'dark':'light'}catch(e){}})()` }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
