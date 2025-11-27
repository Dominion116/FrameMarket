import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import Sidebar from './Sidebar';
import Header from './Header';
import NFTCard from '../nft/NFTCard';
import TrendingPanel from './TrendingPanel';
import { Sheet, SheetContent } from '../../components/ui/sheet';
import { useFrameMarketListings, useListing, formatPriceEther, ListingView } from '@/hooks/useFrameMarket';
import { useNftMetadata } from '@/hooks/useNftMetadata';

// Separate component to handle individual listing with hooks
const ListingCard: React.FC<{ listingId: bigint }> = ({ listingId }) => {
    const listing = useListing(listingId);
    const data = listing.data as ListingView | undefined;
    const { metadata } = useNftMetadata(
        data?.nft || '0x0' as `0x${string}`,
        data?.tokenId || 0n
    );
    
    if (!data || !data.active) return null;
    
    const price = data.price;
    const nftAddress = data.nft;

    const nft = {
        id: Number(listingId),
        name: metadata.name ?? `Token #${String(data.tokenId)}`,
        image: metadata.image ?? "https://via.placeholder.com/400x400?text=NFT",
        price: formatPriceEther(price),
        creator: data.seller as string,
        collection: nftAddress,
        likes: 0,
        isLiked: false,
        timeAgo: "Recently listed",
    };

    return (
        <NFTCard
            key={Number(listingId)}
            nft={nft}
            listingId={listingId}
            priceWei={price}
        />
    );
};

const MainLayout: React.FC = () => {
    const [activeView, setActiveView] = useState('home');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { listingIds, isLoading } = useFrameMarketListings();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleSearch = (_query: string) => {
        // Search functionality can be implemented here
    };

    return (
        <div className="h-screen flex flex-col bg-background">
            <Header
                onSearch={handleSearch}
                onMobileMenuToggle={() => setIsMobileMenuOpen(true)}
            />

            <div className="flex flex-1 overflow-hidden">
                {/* Desktop Sidebar */}
                <div className="hidden lg:block w-80 border-r border-border bg-sidebar-background">
                    <Sidebar activeView={activeView} onViewChange={setActiveView} />
                </div>

                {/* Mobile Menu Sheet */}
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                    <SheetContent side="left" className="w-80 p-0 mobile-menu border-r-0">
                        <Sidebar
                            activeView={activeView}
                            onViewChange={(view) => {
                                setActiveView(view);
                                setIsMobileMenuOpen(false);
                            }}
                        />
                    </SheetContent>
                </Sheet>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto scrollbar-modern px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-10">
                    <div className="max-w-7xl mx-auto">
                        {/* Header Section */}
                        <div className="mb-10 text-center animate-fade-in-up">
                            <div className="inline-block mb-4">
                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold gradient-text mb-3 px-2">
                                    Discover Amazing NFTs
                                </h1>
                                <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"></div>
                            </div>
                            <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-2 font-medium">
                                Explore unique digital assets from creators around the world
                            </p>
                        </div>

                        {/* NFT Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8">
                            {isLoading && (
                                <div className="col-span-full flex items-center justify-center py-20">
                                    <div className="text-center">
                                        <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                                        <p className="text-muted-foreground font-medium">Loading listings...</p>
                                    </div>
                                </div>
                            )}
                            {!isLoading && listingIds.length === 0 && (
                                <div className="col-span-full flex items-center justify-center py-20">
                                    <div className="text-center max-w-md">
                                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mx-auto mb-4">
                                            <Sparkles size={32} className="text-primary" />
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">No listings yet</h3>
                                        <p className="text-muted-foreground font-medium">Be the first to list an NFT on the marketplace!</p>
                                    </div>
                                </div>
                            )}
                            {!isLoading && listingIds.map((id) => (
                                <ListingCard key={Number(id)} listingId={id} />
                            ))}
                        </div>
                    </div>
                </main>

                {/* Trending Panel - Hidden on mobile, visible on desktop */}
                <div className="hidden xl:block w-96 border-l border-border bg-background">
                    <TrendingPanel />
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
