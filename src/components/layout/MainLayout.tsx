import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import NFTCard from '../nft/NFTCard';
import TrendingPanel from './TrendingPanel';
import { Sheet, SheetContent } from '../../components/ui/sheet';
import { useFrameMarketListings, useListing, formatPriceEther } from '@/hooks/useFrameMarket';

const MainLayout: React.FC = () => {
    const [activeView, setActiveView] = useState('home');
    const [searchQuery, setSearchQuery] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { listingIds, isLoading } = useFrameMarketListings();
    const handleSearch = (query: string) => {
        setSearchQuery(query);
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
                <main className="flex-1 overflow-y-auto scrollbar-modern px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6">
                    <div className="max-w-7xl mx-auto">
                        {/* Header Section */}
                        <div className="mb-6 sm:mb-8 text-center animate-fade-in-up">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-2 sm:mb-4 px-2">
                                Discover Amazing NFTs
                            </h1>
                            <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
                                Explore unique digital assets from creators around the world
                            </p>
                        </div>

                        {/* NFT Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                            {isLoading && <div>Loading listings...</div>}
                            {!isLoading && listingIds.length === 0 && (
                                <div className="text-muted-foreground">No listings yet.</div>
                            )}
                            {!isLoading && listingIds.map((id) => {
                                const listing = useListing(id);
                                if (!listing.data || !(listing.data as any).active) return null;
                                const data = listing.data as any;
                                const price = data.price as bigint;

                                const nft = {
                                    id: Number(id),
                                    name: `Token #${String(data.tokenId)}`,
                                    image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
                                    price: formatPriceEther(price),
                                    creator: data.seller as string,
                                    collection: (data.nft as string) ?? 'Collection',
                                    likes: 0,
                                    isLiked: false,
                                    timeAgo: "Just now",
                                };

                                return (
                                    <NFTCard
                                        key={Number(id)}
                                        nft={nft}
                                        listingId={id}
                                        priceWei={price}
                                    />
                                );
                            })}
                        </div>

                        {/* Load More Button */}
                        <div className="text-center mt-8 sm:mt-12">
                            <button className="modern-pill gradient-bg text-primary-foreground font-semibold text-sm sm:text-base px-4 sm:px-8 py-2 sm:py-3">
                                Load More NFTs
                            </button>
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
