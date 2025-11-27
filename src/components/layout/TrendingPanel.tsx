import React, { useMemo } from 'react';
import { TrendingUp, Clock, Users, Flame, Activity } from 'lucide-react';
import { useFrameMarketListings, useListing, formatPriceEther } from '@/hooks/useFrameMarket';
import { useNftMetadata } from '@/hooks/useNftMetadata';

const TrendingPanel: React.FC = () => {
    const { listingIds, isLoading } = useFrameMarketListings();

    // Get stats from blockchain data
    const stats = useMemo(() => {
        const activeListings = listingIds.length;
        return {
            totalListings: activeListings,
        };
    }, [listingIds]);

    // Get recent listings (last 5)
    const recentListingIds = useMemo(() => {
        return listingIds.slice(-5).reverse();
    }, [listingIds]);

    return (
        <div className="h-full overflow-y-auto scrollbar-modern p-6 space-y-6">
            {/* Header */}
            <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-primary/5 rounded-full mb-3">
                    <Activity size={20} className="text-primary" />
                    <h2 className="text-xl font-bold">Live Activity</h2>
                </div>
                <p className="text-muted-foreground text-sm font-medium">Real-time marketplace updates</p>
            </div>

            {/* Market Stats */}
            <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-lg">
                <div className="flex items-center gap-2 mb-5">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                        <Activity size={18} className="text-primary" />
                    </div>
                    <h3 className="font-bold text-lg">Market Stats</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
                        <p className="text-3xl font-bold text-primary mb-1">{stats.totalListings}</p>
                        <p className="text-muted-foreground text-xs font-medium">Active Listings</p>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
                        <p className="text-3xl font-bold text-primary mb-1">Base</p>
                        <p className="text-muted-foreground text-xs font-medium">Network</p>
                    </div>
                </div>
            </div>

            {/* Recent Listings */}
            <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-lg">
                <div className="flex items-center gap-2 mb-5">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                        <Clock size={18} className="text-primary" />
                    </div>
                    <h3 className="font-bold text-lg">Recent Listings</h3>
                </div>
                <div className="space-y-3">
                    {isLoading && (
                        <div className="text-center text-muted-foreground text-sm py-8 font-medium">
                            Loading...
                        </div>
                    )}
                    {!isLoading && recentListingIds.length === 0 && (
                        <div className="text-center text-muted-foreground text-sm py-8 font-medium">
                            No listings yet
                        </div>
                    )}
                    {!isLoading && recentListingIds.map((listingId) => (
                        <RecentListingItem key={Number(listingId)} listingId={listingId} />
                    ))}
                </div>
            </div>
        </div>
    );
};

// Component for individual recent listing
const RecentListingItem: React.FC<{ listingId: bigint }> = ({ listingId }) => {
    const listing = useListing(listingId);

    if (!listing.data || !(listing.data as any).active) return null;

    const data = listing.data as any;
    const price = data.price as bigint;
    const nftAddress = data.nft as string;
    const tokenId = BigInt(data.tokenId);
    const seller = data.seller as string;

    const { metadata } = useNftMetadata(nftAddress, tokenId);

    return (
        <div className="p-4 rounded-xl bg-gradient-to-br from-accent/30 to-accent/10 hover:from-accent/50 hover:to-accent/20 transition-all duration-300 border border-border/30 hover:border-primary/30 hover:shadow-md">
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                        <User size={14} className="text-primary" />
                    </div>
                    <p className="text-sm font-semibold truncate flex-1" title={seller}>
                        {seller.slice(0, 6)}...{seller.slice(-4)}
                    </p>
                </div>
                <span className="text-primary text-sm font-bold ml-2 whitespace-nowrap">
                    {formatPriceEther(price)}
                </span>
            </div>
            <p className="text-sm text-muted-foreground truncate pl-10">
                listed <span className="font-semibold text-foreground">{metadata.name || `Token #${tokenId}`}</span>
            </p>
            <p className="text-xs text-muted-foreground mt-2 pl-10 font-medium">Just now</p>
        </div>
    );
};

export default TrendingPanel;
