import React from 'react';
import { Home, Compass, Library, User, Settings, Plus, Activity, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useFrameMarketListings } from '@/hooks/useFrameMarket';
import ListNFTDialog from '../nft/ListNFTDialog';

interface SidebarProps {
    activeView: string;
    onViewChange: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
    const { listingIds, isLoading } = useFrameMarketListings();

    const menuItems = [
        { id: 'home', label: 'Home', icon: Home },
        { id: 'explore', label: 'Explore', icon: Compass },
        { id: 'collections', label: 'Collections', icon: Library },
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'settings', label: 'Settings', icon: Settings }
    ];

    return (
        <div className="h-full bg-sidebar-background p-6 flex flex-col border-r border-border/50">
            {/* Logo */}
            <div className="mb-10 text-center">
                <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-lg">
                        <Sparkles size={24} className="text-white" />
                    </div>
                    <h1 className="text-2xl font-bold gradient-text">FrameMarket</h1>
                </div>
                <p className="text-muted-foreground text-sm font-medium">NFT Marketplace on Base</p>
            </div>

            {/* Navigation */}
            <nav className="space-y-2 flex-1">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <button
                            key={item.id}
                            onClick={() => onViewChange(item.id)}
                            className={cn(
                                "modern-sidebar-item w-full flex items-center gap-4 text-left transition-all duration-200 text-base font-medium",
                                activeView === item.id && "active"
                            )}
                        >
                            <Icon size={22} />
                            <span>{item.label}</span>
                        </button>
                    );
                })}
            </nav>
            {/* Create Button */}
            <ListNFTDialog 
                trigger={
                    <Button className="modern-pill gradient-bg text-primary-foreground font-bold mt-6 w-full h-12 text-base shadow-lg hover:shadow-xl">
                        <Plus size={20} className="mr-2" />
                        List Your NFT
                    </Button>
                }
            />

            {/* Market Stats Section */}
            <div className="mt-6 p-5 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20 shadow-inner">
                <div className="flex items-center gap-2 mb-4">
                    <Activity size={20} className="text-primary" />
                    <span className="font-bold text-base">Market Overview</span>
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-muted-foreground">Active Listings</span>
                        <span className="text-primary text-lg font-bold">
                            {isLoading ? '...' : listingIds.length}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-muted-foreground">Network</span>
                        <span className="text-primary text-lg font-bold">Base</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;