import  { useState } from 'react';
import { Rss, FileText, Users, Bookmark } from 'lucide-react';

export default function LeftSide() {
  const [activeMenu, setActiveMenu] = useState<'feed' | 'my-posts' | 'community' | 'saved'>('feed');

  return (
    <aside className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col space-y-1">
      <button
        onClick={() => setActiveMenu('feed')}
        className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${
          activeMenu === 'feed'
            ? 'bg-[#e7f3ff] text-brand-blue'
            : 'text-slate-600 hover:bg-slate-50'
        }`}
      >
        <Rss size={18} className={activeMenu === 'feed' ? 'text-brand-blue' : 'text-slate-400'} />
        <span>Feed</span>
      </button>

      <button
        onClick={() => setActiveMenu('my-posts')}
        className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${
          activeMenu === 'my-posts'
            ? 'bg-[#e7f3ff] text-brand-blue'
            : 'text-slate-600 hover:bg-slate-50'
        }`}
      >
        <FileText size={18} className={activeMenu === 'my-posts' ? 'text-brand-blue' : 'text-slate-400'} />
        <span>My Posts</span>
      </button>

      <button
        onClick={() => setActiveMenu('community')}
        className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${
          activeMenu === 'community'
            ? 'bg-[#e7f3ff] text-brand-blue'
            : 'text-slate-600 hover:bg-slate-50'
        }`}
      >
        <Users size={18} className={activeMenu === 'community' ? 'text-brand-blue' : 'text-slate-400'} />
        <span>Community</span>
      </button>

      <button
        onClick={() => setActiveMenu('saved')}
        className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${
          activeMenu === 'saved'
            ? 'bg-[#e7f3ff] text-brand-blue'
            : 'text-slate-600 hover:bg-slate-50'
        }`}
      >
        <Bookmark size={18} className={activeMenu === 'saved' ? 'text-brand-blue' : 'text-slate-400'} />
        <span>Saved</span>
      </button>
    </aside>
  );
}
