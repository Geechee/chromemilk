import './globals.css'

export const metadata = { title: 'ChromeMilk — Your Knowledge, Structured' }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-ink-950 text-ink-100 antialiased">
        <nav className="border-b border-ink-800 px-6 py-4 flex items-center justify-between">
          <a href="/" className="text-lg font-bold tracking-tight">🥛 <span className="text-milk-500">ChromeMilk</span></a>
          <div className="flex gap-4 text-sm text-ink-400">
            <a href="/" className="hover:text-ink-100 transition-colors">Library</a>
            <a href="/search" className="hover:text-ink-100 transition-colors">Search</a>
          </div>
        </nav>
        <main className="max-w-4xl mx-auto px-6 py-8">{children}</main>
      </body>
    </html>
  )
}
