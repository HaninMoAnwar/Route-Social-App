import { Avatar } from '@heroui/react';
import { Users, Search, UserPlus } from 'lucide-react';

export default function RightSide() {
    const suggestions = [
        { id: 1, name: "Ahmed Abd Al-...", username: "@ahmedmutti", followers: "354 followers", avatar: "https://pravatar.cc" },
        { id: 2, name: "Alaa Ashraf", username: "@alaaaashraf", followers: "289 followers", avatar: "https://pravatar.cc" },
        { id: 3, name: "MrMo", username: "@mrmo", followers: "220 followers", avatar: "https://pravatar.cc" }
    ];

    return (
        <aside className="w-full bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col space-y-4">
            {/* Box Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Users size={18} className="text-slate-700" />
                    <h3 className="font-bold text-sm text-brand-dark-blue">Suggested Friends</h3>
                </div>
                <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-0.5 rounded-md">
                    {suggestions.length + 2} {/* Simulated count calculation matching UI placeholder */}
                </span>
            </div>

            {/* Search Box */}
            <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                    <Search size={16} />
                </span>
                <input
                    type="text"
                    placeholder="Search friends..."
                    className="w-full pl-9 pr-4 py-2 bg-[#f8fafc] border border-slate-200 rounded-xl text-xs placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-brandtext-brand-blue transition-all"
                />
            </div>

            {/* Suggestion Cards Container Stack */}
            <div className="flex flex-col space-y-3 pt-1">
                {suggestions.map((friend) => (
                    <div key={friend.id} className="flex items-center justify-between bg-white border border-slate-100 rounded-xl p-3 shadow-xs hover:shadow-sm transition-shadow">
                        <div className="flex items-center gap-2.5">
                            <Avatar>
                                <Avatar.Image src={friend.avatar} className="w-9 h-9 border border-slate-100" />
                            </Avatar>
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-slate-800 tracking-tight line-clamp-1">{friend.name}</span>
                                <span className="text-[10px] text-slate-400 font-medium">{friend.username}</span>
                                <span className="text-[10px] font-semibold text-brand-blue mt-1 bg-[#f4f7fc] px-1.5 py-0.5 rounded-sm w-max">{friend.followers}</span>
                            </div>
                        </div>
                        <button className="flex items-center gap-1 bg-[#e7f3ff] hover:bg-[#dbeafe] text-brand-blue px-3 py-1.5 rounded-lg text-[11px] font-bold transition-colors">
                            <UserPlus size={12} />
                            <span className='lg:hidden xl:block'>Follow</span>
                        </button>
                    </div>
                ))}
            </div>
        </aside>
    );
}
