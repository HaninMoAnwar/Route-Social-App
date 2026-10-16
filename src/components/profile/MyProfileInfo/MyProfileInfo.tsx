import { useState } from 'react';
import { Card,  Chip, Tabs,  Avatar} from '@heroui/react';
import {
    Users,
    Mail,
    Activity,
    FileText,
    Bookmark,
} from 'lucide-react';

import { useAuth } from '../../contexts/AuthContext';
import PostListing from '../../posts/PostListing/PostListing';

export default function MyProfileInfo() {
    const [activeTab, setActiveTab] = useState<string>('my-posts');
    const { currentUserInfo } = useAuth();
    
    return (
        <>
            <div className="min-h-screen bg-light-gray pb-12 font-sans">

                {/* 1. Profile Hero & Banner Header */}
                <div className="w-full h-48 md:h-64 bg-linear-to-r from-[#1e3c72] to-[#2a5298] shadow-inner">
                    {currentUserInfo?.cover && <img className='overflow-hidden w-full h-full' src={currentUserInfo?.cover} alt="user Cover" />}
                </div>


                {/* Main Container Layout */}
                <div className="max-w-6xl mx-auto px-4 -mt-16 sm:-mt-20 flex flex-col space-y-6 relative z-10">

                    {/* 2. User Master Details Card Block */}
                    <Card className="rounded-3xl p-2 shadow-sm border border-gray-100/50 bg-white">
                        <Card.Content className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 overflow-visible">
                            {/* Avatar and Primary Identity Info */}
                            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
                                <Avatar className='w-24 h-24 rounded-full'>

                                    <Avatar.Image src={currentUserInfo?.photo}
                                        className="rounded-full border-4 border-white shadow-md bg-light-blue" />


                                </Avatar>
                                <div className="sm:pt-3">
                                    <h1 className="text-2xl md:text-3xl font-black text-brand-dark-blue tracking-tight">
                                        {currentUserInfo?.name}
                                    </h1>
                                    <p className="text-sm font-semibold text-slate-400 mt-0.5">
                                        {currentUserInfo?.username}
                                    </p>
                                    <Chip
                                        className="bg-[#f4f7fc] border border-blue-100 text-brand-blue text-[11px] font-bold uppercase tracking-wide mt-3 h-7"
                                        variant="primary"
                                    >
                                        <Users size={12} className="text-brand-blue" />
                                        Route Posts member
                                    </Chip>
                                </div>
                            </div>

                            {/* Core Metric Counts Panels */}
                            <div className="grid grid-cols-3 gap-3 w-full md:w-auto max-w-md mx-auto md:mx-0">
                                <Card className="border border-slate-100 p-2 rounded-2xl text-center min-W-25 bg-white">
                                    <Card.Content className="p-2 flex flex-col justify-center items-center">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Followers</span>
                                        <span className="text-2xl font-black text-brand-dark-blue mt-1">{currentUserInfo?.followersCount}</span>
                                    </Card.Content>
                                </Card>
                                <Card className="border border-slate-100 p-2 rounded-2xl text-center min-W-25 bg-white">
                                    <Card.Content className="p-2 flex flex-col justify-center items-center">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Following</span>
                                        <span className="text-2xl font-black text-brand-dark-blue mt-1">{currentUserInfo?.followingCount}</span>
                                    </Card.Content>
                                </Card>
                                <Card className="border border-slate-100 p-2 rounded-2xl text-center min-W-25 bg-white">
                                    <Card.Content className="p-2 flex flex-col justify-center items-center">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Bookmarks</span>
                                        <span className="text-2xl font-black text-brand-dark-blue mt-1">{currentUserInfo?.bookmarksCount}</span>
                                    </Card.Content>
                                </Card>
                            </div>
                        </Card.Content>
                    </Card>

                    {/* 3. Secondary Meta Context Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">

                        {/* Left Column: About Card & Mini Stats Summary Widgets */}
                        <div className="md:col-span-1 flex flex-col space-y-4">
                            {/* About Descriptive Card */}
                            <Card className="rounded-2xl p-1 shadow-sm border border-gray-100/50 bg-white">
                                <Card.Content className="p-4">
                                    <h3 className="text-xs font-black text-brand-dark-blue uppercase tracking-wider mb-4">
                                        About
                                    </h3>
                                    <div className="flex flex-col space-y-3.5 text-slate-600 font-medium text-sm">
                                        <div className="flex items-center gap-3">
                                            <Mail size={16} className="text-slate-400" />
                                            <span className="truncate">{currentUserInfo?.email}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Activity size={16} className="text-slate-400" />
                                            <span>Active on Route Posts</span>
                                        </div>
                                    </div>
                                </Card.Content>
                            </Card>


                            {/* Total Saved Posts Metric Widget Card */}
                            <Card className="rounded-2xl p-1 shadow-sm border border-gray-100/50 bg-white">
                                <Card.Content className="p-4">
                                    <h4 className="text-[11px] font-black text-brand-blue uppercase tracking-wider">
                                        Saved Posts
                                    </h4>
                                    <span className="text-2xl font-black text-brand-dark-blue mt-1.5 block">
                                        0
                                    </span>
                                </Card.Content>
                            </Card>
                        </div>

                        {/* Right Column: Timeline Control Filters & Feed Listing Row */}
                        <div className="md:col-span-2 flex flex-col space-y-4">

                            {/* Horizontal Dynamic Tab Header Selector Filter Row */}
                            <Card className="rounded-2xl p-1 shadow-sm border border-gray-100/50 bg-white">
                                <Card.Content className="p-3 flex flex-row items-center justify-between overflow-visible">
                                    <Tabs className="w-full max-w-sm" onSelectionChange={(key) => setActiveTab(key as string)}>
                                        <Tabs.ListContainer className="rounded-none bg-transparent">
                                            <Tabs.List aria-label="Billing cycle" className="">
                                                <Tabs.Tab id="allPosts">
                                                    <FileText size={14} />
                                                    <span>My Posts</span>
                                                    <Tabs.Indicator />
                                                </Tabs.Tab>
                                                <Tabs.Tab id="savedPosts">
                                                    <Bookmark size={14} />
                                                    <span>Saved</span>
                                                    <Tabs.Indicator />
                                                </Tabs.Tab>
                                            </Tabs.List>
                                        </Tabs.ListContainer>

                                        <Tabs.Panel className="pt-3 text-sm text-muted" id="saved">
                                            No Saved Posts
                                        </Tabs.Panel>
                                    </Tabs>
                                </Card.Content>
                                <div className='p-2'>
                                    {activeTab === "allPosts" && <PostListing isFeed={false} isCurrentUser={true} />}
                                </div>
                            </Card>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}