import React, { useState } from 'react';
import { Heart, Eye, Share2, Clock, User, Coins, Edit, X } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { usePurchaseListing, useUpdateListingPrice, useCancelListing } from '@/hooks/useFrameMarket';
import { useAccount } from 'wagmi';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface NFT {
    id: number;
    name: string;
    image: string;
    price: string;
    creator: string;
    collection: string;
    likes: number;
    isLiked: boolean;
    timeAgo: string;
}

interface NFTCardProps {
    nft: NFT;
    listingId?: bigint;
    priceWei?: bigint;
}

const NFTCard: React.FC<NFTCardProps> = ({ nft, listingId, priceWei }) => {
    const [isLiked, setIsLiked] = useState(nft.isLiked);
    const [likesCount, setLikesCount] = useState(nft.likes);
    const [newPrice, setNewPrice] = useState('');
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

    const { address } = useAccount();
    const isOwner = address && nft.creator.toLowerCase() === address.toLowerCase();

    const purchase = listingId !== undefined && priceWei !== undefined
        ? usePurchaseListing(listingId, priceWei)
        : undefined;

    const updatePrice = useUpdateListingPrice();
    const cancelListing = useCancelListing();

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    };

    const handleUpdatePrice = () => {
        if (!listingId || !newPrice) return;
        const priceInWei = BigInt(parseFloat(newPrice) * 1e18);
        updatePrice.updatePrice(listingId, priceInWei);
        setIsUpdateDialogOpen(false);
        setNewPrice('');
    };

    const handleCancelListing = () => {
        if (!listingId) return;
        if (window.confirm('Are you sure you want to cancel this listing?')) {
            cancelListing.cancel(listingId);
        }
    };

    return (
        <div className="modern-nft-card bg-card border border-border/50 overflow-hidden group">
            {/* Image Container */}
            <div className="relative overflow-hidden">
                <img
                    src={nft.image}
                    alt={nft.name}
                    className="w-full h-48 sm:h-56 md:h-64 object-cover modern-image-hover group-hover:scale-105"
                />

                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-3">
                        <Button variant="secondary" size="icon" className="rounded-full glass-effect">
                            <Eye size={18} />
                        </Button>
                        <Button variant="secondary" size="icon" className="rounded-full glass-effect">
                            <Share2 size={18} />
                        </Button>
                    </div>
                </div>

                {/* Collection Badge */}
                <div className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4">
                    <span className="px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 bg-background/90 backdrop-blur-sm rounded-full text-[10px] sm:text-xs font-medium text-foreground truncate max-w-[150px]" title={nft.collection}>
                        {nft.collection.slice(0, 6)}...{nft.collection.slice(-4)}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-3 sm:p-4 md:p-5">
                {/* Title and Actions */}
                <div className="flex items-start justify-between mb-2 sm:mb-3">
                    <h3 className="font-semibold text-base sm:text-lg truncate flex-1 mr-2 sm:mr-3">{nft.name}</h3>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleLike}
                        className={`rounded-full transition-all h-8 w-8 sm:h-9 sm:w-9 ${isLiked ? 'text-destructive' : 'text-muted-foreground hover:text-destructive'}`}
                    >
                        <Heart size={16} className="sm:w-[18px] sm:h-[18px]" fill={isLiked ? 'currentColor' : 'none'} />
                    </Button>
                </div>

                {/* Creator Info */}
                <div className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4">
                    <User size={12} className="sm:w-3.5 sm:h-3.5" />
                    <span className="truncate">{nft.creator.slice(0, 6)}...{nft.creator.slice(-4)}</span>
                </div>

                {/* Price and Likes */}
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                        <Coins size={14} className="sm:w-4 sm:h-4 text-primary" />
                        <span className="font-bold text-base sm:text-lg text-primary">{nft.price}</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                    {isOwner ? (
                        <>
                            <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="flex-1 text-xs sm:text-sm h-8 sm:h-9"
                                        disabled={updatePrice.isPending}
                                    >
                                        <Edit size={14} className="mr-1" />
                                        Update
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Update Listing Price</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4 py-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="newPrice">New Price (ETH)</Label>
                                            <Input
                                                id="newPrice"
                                                type="number"
                                                step="0.001"
                                                placeholder="0.1"
                                                value={newPrice}
                                                onChange={(e) => setNewPrice(e.target.value)}
                                            />
                                        </div>
                                        <Button
                                            onClick={handleUpdatePrice}
                                            disabled={!newPrice || updatePrice.isPending}
                                            className="w-full"
                                        >
                                            {updatePrice.isPending ? 'Updating...' : 'Update Price'}
                                        </Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                            <Button
                                variant="destructive"
                                className="flex-1 text-xs sm:text-sm h-8 sm:h-9"
                                onClick={handleCancelListing}
                                disabled={cancelListing.isPending}
                            >
                                <X size={14} className="mr-1" />
                                {cancelListing.isPending ? 'Canceling...' : 'Cancel'}
                            </Button>
                        </>
                    ) : (
                        <Button
                            className="modern-pill gradient-bg text-primary-foreground font-semibold text-xs sm:text-sm w-full h-8 sm:h-9"
                            disabled={!purchase || purchase.isPending}
                            onClick={() => purchase?.buy()}
                        >
                            {purchase?.isPending ? 'Processing...' : 'Buy Now'}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NFTCard;
