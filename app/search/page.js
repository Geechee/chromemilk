"use client";
import { useState } from "react";
import { Search, ExternalLink, ArrowLeft } from "lucide-react";

export default function SearchPage() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  async function doSearch(e) {
    e.preventDefault();
    if (!q.trim()) return;
    const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
    setResults(await res.json());
    setSearched(true);
  }

  return (
    <div>
      <a href="/" className="flex items-center gap-2 text-ink-400 hover:text-ink-100 text-sm mb-6 transition-colors">
        <ArrowLeft size={16} /> Back to Library
      </a>
      <form onSubmit={doSearch} className="flex gap-3 mb-8">
        <input value={q} onChange={e => setQ(e.target.value)}
          placeholder="Search your extracted knowledge..."
          className="flex-1 bg-ink-900 border border-ink-800 rounded-xl px-4 py-3 text-ink-100 placeholder:text-ink-600 focus:outline-none focus:border-milk-600 transition-colors"
          autoFocus />
        <button type="submit" className="px-6 py-3 bg-milk-600 hover:bg-milk-700 rounded-xl font-medium transition-colors flex items-center gap-2">
          <Search size={16} /> Search
        </button>
      </form>

      {searched && (
        results.length === 0 ? (
          <p className="text-ink-400 text-center py-12">No results for "{q}"</p>
        ) : (
          <div className="space-y-3">
            {results.map(p => (
              <a key={p.id} href={p.url} target="_blank" rel="noopener"
                className="block bg-ink-900 border border-ink-800 hover:border-milk-600/50 rounded-xl p-5 transition-all group">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="font-semibold group-hover:text-milk-500 transition-colors">{p.title}</h3>
                    {p.excerpt && <p className="text-ink-400 text-sm mt-1 line-clamp-2">{p.excerpt}</p>}
                    <span className="text-xs text-ink-500 mt-2 block">{p.domain}</span>
                  </div>
                  <ExternalLink size={16} className="text-ink-600 group-hover:text-milk-500 flex-shrink-0 mt-1 transition-colors" />
                </div>
              </a>
            ))}
          </div>
        )
      )}
    </div>
  );
}
