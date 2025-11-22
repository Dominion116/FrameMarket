import React from 'react';
import { Search, Bell, Menu, Filter } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import WalletConnect from '../../components/wallet/WalletConnect';

interface HeaderProps {
    onSearch: (query: string) => void;
    onMobileMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch, onMobileMenuToggle }) => {
    return (
        <header className="sticky top-0 z-50 glass-effect border-b border-border/10 h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            {/* Left Section - Logo and Mobile Menu */}
            <div className="flex items-center gap-4">
                {/* Mobile Menu Button */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden rounded-full"
                    onClick={onMobileMenuToggle}
                >
                    <Menu size={20} />
                </Button>
                {/* Logo */}
                <div className="hidden sm:block">
                    <h1 className="text-xl font-bold gradient-text">FrameMarket</h1>
                </div>
            </div>

            {/* Center Section - Search Bar */}
            <div className="flex-1 max-w-2xl mx-4 relative">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                    <Input
                        placeholder="Search NFTs, collections, or creators..."
                        className="pl-12 pr-12 rounded-full h-12 border-border/50 focus:border-primary/50"
                        onChange={(e) => onSearch(e.target.value)}
                    />
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full"
                    >
                        <Filter size={18} />
                    </Button>
                </div>
            </div>
            {/* Right Section - Actions and Wallet */}
            <div className="flex items-center gap-3">
                {/* Notifications */}
                <Button variant="ghost" size="icon" className="rounded-full relative">
                    <Bell size={20} />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full"></span>
                </Button>

                {/* Wallet Connect */}
                <WalletConnect />
            </div>
        </header>
    );
};

export default Header;