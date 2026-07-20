"use client";
import { useEffect, useState } from "react";
import { Search, ExternalLink, Clock, FileText } from "lucide-react";

export default function Home() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetch("/api/pages").then(r => r.json()).then(setPages).finally(() => setLoading(false)); }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Knowledge Library</h1>
          <p className="text-ink-400 text-sm mt-1">{pages.length} pages extracted</p>
        </div>
        <a href="/search" className="flex items-center gap-2 px-4 py-2 bg-milk-600 hover:bg-milk-700 rounded-lg text-sm font-medium transition-colors">
          <Search size={16} /> Search
        </a>
      </div>

      {loading ? (
        <div className="text-center text-ink-400 py-20">Loading your knowledge...</div>
      ) : pages.length === 0 ? (
        <div className="text-center py-20">
          <FileText size={48} className="mx-auto text-ink-600 mb-4" />
          <h2 className="text-lg font-semibold mb-2">No pages yet</h2>
          <p className="text-ink-400 text-sm max-w-md mx-auto">
            Install the ChromeMilk extension and click "Extract Knowledge" on any webpage to start building your library.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {pages.map((page) => (
            <a key={page.id} href={page.url} target="_blank" rel="noopener"
              className="block bg-ink-900 border border-ink-800 hover:border-milk-600/50 rounded-xl p-5 transition-all group">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="font-semibold text-ink-100 group-hover:text-milk-500 transition-colors truncate">{page.title}</h3>
                  {page.excerpt && <p className="text-ink-400 text-sm mt-1 line-clamp-2">{page.excerpt}</p>}
                  <div className="flex items-center gap-4 mt-2 text-xs text-ink-500">
                    <span className="flex items-center gap-1"><Clock size={12} />{new Date(page.extractedAt).toLocaleDateString()}</span>
                    {page.domain && <span>{page.domain}</span>}
                    {page.wordCount && <span>{page.wordCount} words</span>}
                  </div>
                </div>
                <ExternalLink size={16} className="text-ink-600 group-hover:text-milk-500 flex-shrink-0 mt-1 transition-colors" />
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
