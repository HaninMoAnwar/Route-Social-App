import { Card, Chip,  Avatar } from '@heroui/react';
import {Users} from 'lucide-react';

import PostListing from '../../posts/PostListing/PostListing';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../contexts/AuthContext';
import { getUserProfile } from '../../services/profile.service';
import type { User } from '../../interfaces/user';

export default function MyProfileInfo() {

    const { userToken } = useAuth();
    const { userId } = useParams();

    const { data } = useQuery({
        queryKey: ['profile', userId],
        queryFn: () => getUserProfile(userToken!, userId!)
    });
    const user: User = data?.data.data.user;
    
    return (
        <>
            <div className="min-h-screen bg-light-gray pb-12 font-sans">

                {/* 1. Profile Hero & Banner Header */}
                <div className="w-full h-48 md:h-64 bg-linear-to-r from-[#1e3c72] to-[#2a5298] shadow-inner">
                    {user?.cover && <img className='overflow-hidden w-full h-full' src={user?.cover} alt="user Cover" />}
                </div>


                {/* Main Container Layout */}
                <div className="max-w-6xl mx-auto px-4 -mt-16 sm:-mt-20 flex flex-col space-y-6 relative z-10">

                    {/* 2. User Master Details Card Block */}
                    <Card className="rounded-3xl p-2 shadow-sm border border-gray-100/50 bg-white">
                        <Card.Content className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 overflow-visible">
                            {/* Avatar and Primary Identity Info */}
                            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
                                <Avatar className=' w-24 h-24 rounded-full'>

                                    <Avatar.Image src={user?.photo}
                                        className="rounded-full border-4 border-white shadow-md bg-light-blue" />


                                </Avatar>
                                <div className="sm:pt-3">
                                    <h1 className="text-2xl md:text-3xl font-black text-brand-dark-blue tracking-tight">
                                        {user?.name}
                                    </h1>
                                    <p className="text-sm font-semibold text-slate-400 mt-0.5">
                                        {user?.username}
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
                        </Card.Content>
                    </Card>
                    <PostListing isFeed={false} isCurrentUser={false} userId={userId} />

                </div>
            </div>
        </>
    );
}