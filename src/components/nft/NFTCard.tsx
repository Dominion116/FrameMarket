import React, { useState } from 'react';
import { Heart, Eye, Share2, Clock, User, Coins } from 'lucide-react';
import { Button } from '../../components/ui/button';

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
}

const NFTCard: React.FC<NFTCardProps> = ({ nft }) => {
    const [isLiked, setIsLiked] = useState(nft.isLiked);
    const [likesCount, setLikesCount] = useState(nft.likes);

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    };

    return (
        <div className="modern-nft-card bg-card border border-border/50 overflow-hidden group">
            {/* Image Container */}
            <div className="relative overflow-hidden">
                <img
                    src={nft.image}
                    alt={nft.name}
                    className="w-full h-64 object-cover modern-image-hover group-hover:scale-105"
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
                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-background/90 backdrop-blur-sm rounded-full text-xs font-medium text-foreground">
                        {nft.collection}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                {/* Title and Actions */}
                <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-lg truncate flex-1 mr-3">{nft.name}</h3>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleLike}
                        className={`rounded-full transition-all ${isLiked ? 'text-destructive' : 'text-muted-foreground hover:text-destructive'}`}
                    >
                        <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
                    </Button>
                </div>

                {/* Creator Info */}
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                    <User size={14} />
                    <span>{nft.creator}</span>
                </div>

                {/* Price and Likes */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Coins size={16} className="text-primary" />
                        <span className="font-bold text-lg text-primary">{nft.price}</span>
                    </div>
                    <span className="text-muted-foreground text-sm">{likesCount} likes</span>
                </div>

                {/* Time and Action Button */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground text-xs">
                        <Clock size={12} />
                        <span>{nft.timeAgo}</span>
                    </div>

                    <Button className="modern-pill gradient-bg text-primary-foreground font-semibold text-sm">
                        Buy Now
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default NFTCard;
