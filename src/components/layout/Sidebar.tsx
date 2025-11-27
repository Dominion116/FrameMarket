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
        <div className="h-full bg-sidebar-background p-6 flex flex-col">
            {/* Logo */}
            <div className="mb-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <Sparkles size={24} className="text-primary" />
                    <h1 className="text-2xl font-bold gradient-text">FrameMarket</h1>
                </div>
                <p className="text-muted-foreground text-sm">NFT Marketplace</p>
            </div>

            {/* Navigation */}
            <nav className="space-y-1 flex-1">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <button
                            key={item.id}
                            onClick={() => onViewChange(item.id)}
                            className={cn(
                                "modern-sidebar-item w-full flex items-center gap-3 text-left transition-all duration-200",
                                activeView === item.id && "active"
                            )}
                        >
                            <Icon size={20} />
                            <span className="font-medium">{item.label}</span>
                        </button>
                    );
                })}
            </nav>
            {/* Create Button */}
            <ListNFTDialog 
                trigger={
                    <Button className="modern-pill gradient-bg text-primary-foreground font-semibold mt-6 w-full">
                        <Plus size={18} className="mr-2" />
                        List NFT
                    </Button>
                }
            />

            {/* Market Stats Section */}
            <div className="mt-8 p-5 bg-accent/50 rounded-2xl border border-border/20">
                <div className="flex items-center gap-2 mb-4">
                    <Activity size={18} className="text-primary" />
                    <span className="font-semibold text-sm">Market Overview</span>
                </div>
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Active Listings</span>
                        <span className="text-primary text-sm font-semibold">
                            {isLoading ? '...' : listingIds.length}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Network</span>
                        <span className="text-primary text-sm font-semibold">Base</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;