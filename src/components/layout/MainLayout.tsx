import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import NFTCard from '../nft/NFTCard';
import TrendingPanel from './TrendingPanel';
import { Sheet, SheetContent } from '../../components/ui/sheet';

const MainLayout: React.FC = () => {
    const [activeView, setActiveView] = useState('home');
    const [searchQuery, setSearchQuery] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Mock NFT data
    const mockNFTs = [
        {
            id: 1,
            name: "Cosmic Explorer #123",
            image: "https://images.pexels.com/photos/414860/pexels-photo-414860.jpeg",
            price: "1.5 ETH",
            creator: "0x1234...5678",
            collection: "Cosmic Explorers",
            likes: 42,
            isLiked: false,
            timeAgo: "2h ago"
        },
        {
            id: 2,
            name: "Digital Dreams #456",
            image: "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg",
            price: "2.3 ETH",
            creator: "0xabcd...efgh",
            collection: "Digital Dreams",
            likes: 89,
            isLiked: true,
            timeAgo: "5h ago"
        },
        {
            id: 3,
            name: "Neon Genesis #789",
            image: "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg",
            price: "0.8 ETH",
            creator: "0xneon...genesis",
            collection: "Neon Genesis",
            likes: 156,
            isLiked: false,
            timeAgo: "1d ago"
        },
        {
            id: 4,
            name: "Abstract Vision #012",
            image: "https://images.pexels.com/photos/1021876/pexels-photo-1021876.jpeg",
            price: "3.2 ETH",
            creator: "0xart...vision",
            collection: "Abstract Visions",
            likes: 231,
            isLiked: false,
            timeAgo: "3h ago"
        },
        {
            id: 5,
            name: "Future Tech #345",
            image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
            price: "1.9 ETH",
            creator: "0xfuture...tech",
            collection: "Future Tech",
            likes: 78,
            isLiked: true,
            timeAgo: "6h ago"
        },
        {
            id: 6,
            name: "Nature's Beauty #678",
            image: "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg",
            price: "2.1 ETH",
            creator: "0xnature...beauty",
            collection: "Nature's Beauty",
            likes: 145,
            isLiked: false,
            timeAgo: "8h ago"
        }
    ];
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                            {mockNFTs.map((nft) => (
                                <NFTCard key={nft.id} nft={nft} />
                            ))}
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
