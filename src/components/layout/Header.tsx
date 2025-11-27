import React, { useState } from 'react';
import { Search, Bell, Menu, Filter, X, Moon, Sun, Sparkles } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import WalletConnect from '../../components/wallet/WalletConnect';
import { useTheme } from '../../hooks/use-theme';

interface HeaderProps {
    onSearch: (query: string) => void;
    onMobileMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch, onMobileMenuToggle }) => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const { theme, toggleTheme } = useTheme();

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
        <header className="sticky top-0 z-50 glass-effect border-b border-border/20 backdrop-blur-xl min-h-[64px] sm:h-16 px-3 sm:px-4 md:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4 shadow-sm">
            {/* Left Section - Logo and Mobile Menu */}
            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                {/* Mobile Menu Button */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden rounded-full h-10 w-10 hover:bg-primary/10"
                    onClick={onMobileMenuToggle}
                >
                    <Menu size={20} />
                </Button>
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-md hidden sm:flex">
                        <Sparkles size={18} className="text-white" />
                    </div>
                    <h1 className="text-lg sm:text-xl md:text-2xl font-bold gradient-text whitespace-nowrap">
                        FrameMarket
                    </h1>
                </div>
            </div>

            {/* Center Section - Search Bar */}
            <div className={`flex-1 max-w-2xl transition-all duration-300 ${
                isSearchOpen ? 'mx-2' : 'mx-2 sm:mx-4'
            } ${isSearchOpen ? 'block' : 'hidden md:block'}`}>
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                    <Input
                        placeholder="Search NFTs, collections..."
                        value={searchValue}
                        className="pl-12 pr-12 rounded-full h-11 text-sm border-border/50 focus:border-primary/50 bg-background/50 backdrop-blur-sm font-medium shadow-sm"
                        onChange={handleSearchChange}
                    />
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full h-8 w-8 hover:bg-primary/10"
                    >
                        <Filter size={16} />
                    </Button>
                </div>
            </div>

            {/* Right Section - Actions and Wallet */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                {/* Mobile Search Toggle */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden rounded-full h-10 w-10 hover:bg-primary/10"
                    onClick={toggleSearch}
                >
                    {isSearchOpen ? <X size={20} /> : <Search size={20} />}
                </Button>

                {/* Theme Toggle */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full h-10 w-10 hover:bg-primary/10"
                    onClick={toggleTheme}
                    title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                    {theme === 'dark' ? (
                        <Sun size={20} />
                    ) : (
                        <Moon size={20} />
                    )}
                </Button>

                {/* Notifications */}
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="hidden sm:flex rounded-full h-10 w-10 relative hover:bg-primary/10"
                >
                    <Bell size={20} />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full ring-2 ring-background"></span>
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