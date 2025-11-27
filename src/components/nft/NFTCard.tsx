import React, { useState } from 'react';
import { Heart, Eye, Share2, User, Coins, Edit, X } from 'lucide-react';
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

    const purchase = usePurchaseListing(
        listingId ?? 0n,
        priceWei ?? 0n
    );

    const updatePrice = useUpdateListingPrice();
    const cancelListing = useCancelListing();

    const canPurchase = listingId !== undefined && priceWei !== undefined;

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
        <div className="modern-nft-card bg-card border border-border/40 overflow-hidden group shadow-lg hover:shadow-2xl transition-all duration-500">
            {/* Image Container */}
            <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 to-accent/10">
                <img
                    src={nft.image}
                    alt={nft.name}
                    className="w-full h-56 sm:h-64 md:h-72 object-cover modern-image-hover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 group-hover:from-black/80 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <Button variant="secondary" size="icon" className="rounded-full glass-effect shadow-xl hover:scale-110 transition-transform">
                            <Eye size={18} />
                        </Button>
                        <Button variant="secondary" size="icon" className="rounded-full glass-effect shadow-xl hover:scale-110 transition-transform">
                            <Share2 size={18} />
                        </Button>
                    </div>
                </div>

                {/* Collection Badge */}
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                    <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-background/95 backdrop-blur-md rounded-full text-xs sm:text-sm font-semibold text-foreground shadow-lg border border-border/50 truncate max-w-[150px]" title={nft.collection}>
                        {nft.collection.slice(0, 6)}...{nft.collection.slice(-4)}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-5 md:p-6 space-y-4">
                {/* Title and Actions */}
                <div className="flex items-start justify-between gap-3">
                    <h3 className="font-bold text-lg sm:text-xl truncate flex-1 leading-tight">{nft.name}</h3>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleLike}
                        className={`rounded-full transition-all h-9 w-9 sm:h-10 sm:w-10 hover:scale-110 ${isLiked ? 'text-destructive' : 'text-muted-foreground hover:text-destructive'}`}
                    >
                        <Heart size={18} className="sm:w-5 sm:h-5" fill={isLiked ? 'currentColor' : 'none'} />
                    </Button>
                </div>

                {/* Creator Info */}
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                        <User size={14} />
                    </div>
                    <span className="truncate font-medium">{nft.creator.slice(0, 6)}...{nft.creator.slice(-4)}</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 p-3 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border border-primary/20">
                    <Coins size={18} className="text-primary" />
                    <span className="font-bold text-xl text-primary">{nft.price}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                    {isOwner ? (
                        <>
                            <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="flex-1 text-sm h-10 rounded-xl font-semibold hover:bg-primary/10 hover:border-primary/50 transition-all"
                                        disabled={updatePrice.isPending}
                                    >
                                        <Edit size={16} className="mr-2" />
                                        Update Price
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
                                className="flex-1 text-sm h-10 rounded-xl font-semibold hover:scale-105 transition-transform"
                                onClick={handleCancelListing}
                                disabled={cancelListing.isPending}
                            >
                                <X size={16} className="mr-2" />
                                {cancelListing.isPending ? 'Canceling...' : 'Cancel Listing'}
                            </Button>
                        </>
                    ) : (
                        <Button
                            className="w-full h-11 rounded-xl font-bold text-base gradient-bg text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                            disabled={!canPurchase || purchase.isPending}
                            onClick={() => canPurchase && purchase.buy()}
                        >
                            {purchase.isPending ? 'Processing...' : '🚀 Buy Now'}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NFTCard;
