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
                <h2 className="text-xl font-bold gradient-text mb-2">Live Activity</h2>
                <p className="text-muted-foreground text-sm">Real-time marketplace updates</p>
            </div>

            {/* Market Stats */}
            <div className="bg-card rounded-2xl p-5 border border-border/50">
                <div className="flex items-center gap-2 mb-4">
                    <Activity size={20} className="text-primary" />
                    <h3 className="font-semibold">Market Stats</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 rounded-xl bg-accent/30">
                        <p className="text-2xl font-bold text-primary">{stats.totalListings}</p>
                        <p className="text-muted-foreground text-xs">Active Listings</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-accent/30">
                        <p className="text-2xl font-bold text-primary">Base</p>
                        <p className="text-muted-foreground text-xs">Network</p>
                    </div>
                </div>
            </div>

            {/* Recent Listings */}
            <div className="bg-card rounded-2xl p-5 border border-border/50">
                <div className="flex items-center gap-2 mb-4">
                    <Clock size={20} className="text-primary" />
                    <h3 className="font-semibold">Recent Listings</h3>
                </div>
                <div className="space-y-4">
                    {isLoading && (
                        <div className="text-center text-muted-foreground text-sm py-4">
                            Loading...
                        </div>
                    )}
                    {!isLoading && recentListingIds.length === 0 && (
                        <div className="text-center text-muted-foreground text-sm py-4">
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
        <div className="p-3 rounded-xl bg-accent/30 hover:bg-accent/50 transition-colors">
            <div className="flex items-start justify-between mb-2">
                <p className="text-sm font-medium truncate flex-1" title={seller}>
                    {seller.slice(0, 6)}...{seller.slice(-4)}
                </p>
                <span className="text-primary text-sm font-semibold ml-2">
                    {formatPriceEther(price)}
                </span>
            </div>
            <p className="text-sm text-muted-foreground truncate">
                listed <span className="font-medium">{metadata.name || `Token #${tokenId}`}</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">Just now</p>
        </div>
    );
};

export default TrendingPanel;
