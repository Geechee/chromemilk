// ChromeMilk — Popup logic
const API = 'http://localhost:3456/api';
const btn = document.getElementById('extractBtn');
const status = document.getElementById('status');
const preview = document.getElementById('preview');
const toast = document.getElementById('toast');

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

async function extract() {
  btn.disabled = true;
  btn.textContent = 'Extracting...';
  status.textContent = 'Analyzing page structure...';
  
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // Inject content script + Readability
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: extractPageContent,
    });
    
    const data = results[0].result;
    if (!data || !data.title) {
      throw new Error('Could not extract content from this page.');
    }
    
    // Show preview
    document.getElementById('previewTitle').textContent = data.title;
    document.getElementById('previewMeta').textContent = 
      `${data.wordCount || 0} words · ${data.domain || ''}`;
    document.getElementById('previewSnippet').textContent = 
      (data.text || '').substring(0, 300) + '...';
    preview.classList.add('show');
    
    // Save to API
    status.textContent = 'Saving to ChromeMilk...';
    const res = await fetch(`${API}/pages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: tab.url,
        title: data.title,
        text: data.text,
        excerpt: (data.text || '').substring(0, 500),
        domain: data.domain,
        wordCount: data.wordCount,
        extractedAt: new Date().toISOString(),
      }),
    });
    
    if (!res.ok) throw new Error('API save failed');
    
    status.textContent = '✓ Extracted & saved.';
    showToast('Knowledge extracted 🥛');
    
  } catch (err) {
    status.textContent = '✗ ' + err.message;
    preview.classList.remove('show');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Extract Knowledge';
  }
}

function extractPageContent() {
  const doc = document;
  const title = doc.title || '';
  const url = doc.location.href;
  const domain = doc.location.hostname;
  
  // Clone the entire body
  const clone = doc.body.cloneNode(true);
  // Only remove truly non-content elements
  const removals = clone.querySelectorAll('script, style, noscript, iframe, svg, [aria-hidden="true"]');
  removals.forEach(el => el.remove());
  
  const text = (clone.textContent || '')
    .replace(/[\t ]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/\n /g, '\n')
    .trim();
  
  const wordCount = text.split(/\s+/).filter(w => w.length > 1).length;
  
  return { title, url, domain, text, wordCount, headings: [] };
}

// Search button opens dashboard
document.getElementById('searchBtn').addEventListener('click', () => {
  chrome.tabs.create({ url: 'http://localhost:3456' });
});

btn.addEventListener('click', extract);
