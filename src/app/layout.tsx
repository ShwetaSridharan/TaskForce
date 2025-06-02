// app/layout.tsx
import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0B1120] text-white flex flex-col">
        {/* Header */}
        <header className="p-4 bg-[#0B1120] border-b border-gray-700 text-center">
          <h1 className="text-2xl text-[#bdd9f4]">TaskForce</h1>
          <p className="text-sm text-gray-400">Turning Chaos into Constellations</p>
        </header>

        {/* Main Content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="p-4 text-center text-sm text-gray-500 border-t border-gray-700 bg-[#0B1120]">
          <p>Made with ❤️ by Judy Hopps</p>
          <p>© {new Date().getFullYear()} All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
