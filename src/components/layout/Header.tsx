import React, { useState } from 'react';
import { Search, Bell, Menu, Filter, X } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import WalletConnect from '../../components/wallet/WalletConnect';

interface HeaderProps {
    onSearch: (query: string) => void;
    onMobileMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch, onMobileMenuToggle }) => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);
        onSearch(value);
    };

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
        if (isSearchOpen) {
            setSearchValue('');
            onSearch('');
        }
    };

    return (
        <header className="sticky top-0 z-50 glass-effect border-b border-border/10 min-h-[64px] sm:h-16 px-3 sm:px-4 md:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
            {/* Left Section - Logo and Mobile Menu */}
            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                {/* Mobile Menu Button */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden rounded-full h-9 w-9"
                    onClick={onMobileMenuToggle}
                >
                    <Menu size={18} />
                </Button>
                {/* Logo - Show on all screens but smaller on mobile */}
                <div className="flex items-center">
                    <h1 className="text-base sm:text-lg md:text-xl font-bold gradient-text whitespace-nowrap">
                        <span className="hidden xs:inline">Frame</span>Market
                    </h1>
                </div>
            </div>

            {/* Center Section - Search Bar */}
            <div className={`flex-1 max-w-2xl transition-all duration-300 ${
                isSearchOpen ? 'mx-2' : 'mx-2 sm:mx-4'
            } ${isSearchOpen ? 'block' : 'hidden md:block'}`}>
                <div className="relative">
                    <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input
                        placeholder="Search NFTs..."
                        value={searchValue}
                        className="pl-9 sm:pl-12 pr-10 sm:pr-12 rounded-full h-9 sm:h-10 md:h-12 text-sm sm:text-base border-border/50 focus:border-primary/50"
                        onChange={handleSearchChange}
                    />
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 rounded-full h-7 w-7 sm:h-8 sm:w-8"
                    >
                        <Filter size={14} className="sm:w-4 sm:h-4" />
                    </Button>
                </div>
            </div>

            {/* Right Section - Actions and Wallet */}
            <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 flex-shrink-0">
                {/* Mobile Search Toggle */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden rounded-full h-9 w-9"
                    onClick={toggleSearch}
                >
                    {isSearchOpen ? <X size={18} /> : <Search size={18} />}
                </Button>

                {/* Notifications - Hide on very small screens */}
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="hidden sm:flex rounded-full h-9 w-9 sm:h-10 sm:w-10 relative"
                >
                    <Bell size={18} className="sm:w-5 sm:h-5" />
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-destructive rounded-full"></span>
                </Button>

                {/* Wallet Connect */}
                <WalletConnect />
            </div>

            {/* Mobile Search Overlay - Full width search when open */}
            {isSearchOpen && (
                <div className="absolute top-full left-0 right-0 bg-background border-b border-border/10 p-3 md:hidden z-40">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                        <Input
                            placeholder="Search NFTs, collections, or creators..."
                            value={searchValue}
                            className="pl-11 pr-11 rounded-full h-11 text-base border-border/50 focus:border-primary/50"
                            onChange={handleSearchChange}
                            autoFocus
                        />
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full"
                            onClick={toggleSearch}
                        >
                            <X size={18} />
                        </Button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;