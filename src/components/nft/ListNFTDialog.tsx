import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Plus } from 'lucide-react';
import { useListNFT, useApproveNFT, useIsApproved } from '@/hooks/useFrameMarket';
import { useToast } from '../ui/use-toast';

interface ListNFTDialogProps {
    trigger?: React.ReactNode;
}

const ListNFTDialog: React.FC<ListNFTDialogProps> = ({ trigger }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [nftAddress, setNftAddress] = useState('');
    const [tokenId, setTokenId] = useState('');
    const [price, setPrice] = useState('');
    const [step, setStep] = useState<'input' | 'approve' | 'list'>('input');

    const { toast } = useToast();
    const listNFT = useListNFT();
    const approveNFT = nftAddress ? useApproveNFT(nftAddress as `0x${string}`) : null;
    const { isApproved } = nftAddress && tokenId 
        ? useIsApproved(nftAddress as `0x${string}`, BigInt(tokenId))
        : { isApproved: false };

    useEffect(() => {
        if (approveNFT?.isSuccess) {
            toast({ title: 'Approved!', description: 'NFT approved for listing' });
            setStep('list');
        }
    }, [approveNFT?.isSuccess, toast]);

    useEffect(() => {
        if (listNFT.isSuccess) {
            toast({ title: 'Success!', description: 'NFT listed successfully' });
            handleReset();
            setIsOpen(false);
        }
    }, [listNFT.isSuccess, toast]);

    const handleReset = () => {
        setNftAddress('');
        setTokenId('');
        setPrice('');
        setStep('input');
    };

    const handleNext = () => {
        if (!nftAddress || !tokenId || !price) {
            toast({ title: 'Error', description: 'Please fill in all fields', variant: 'destructive' });
            return;
        }

        // Check if already approved
        if (isApproved) {
            setStep('list');
        } else {
            setStep('approve');
        }
    };

    const handleApprove = () => {
        if (!approveNFT || !tokenId) return;
        approveNFT.approve(BigInt(tokenId));
    };

    const handleList = () => {
        if (!nftAddress || !tokenId || !price) return;
        const priceInWei = BigInt(parseFloat(price) * 1e18);
        listNFT.list(nftAddress as `0x${string}`, BigInt(tokenId), priceInWei);
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) handleReset();
        }}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button className="modern-pill gradient-bg text-primary-foreground font-bold shadow-lg hover:shadow-xl">
                        <Plus size={20} className="mr-2" />
                        List Your NFT
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] rounded-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                        {step === 'input' && '🎨 List Your NFT'}
                        {step === 'approve' && '✅ Approve NFT'}
                        {step === 'list' && '🚀 Create Listing'}
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-5 py-6">
                    {step === 'input' && (
                        <>
                            <div className="space-y-2">
                                <Label htmlFor="nftAddress" className="text-sm font-semibold">NFT Contract Address</Label>
                                <Input
                                    id="nftAddress"
                                    placeholder="0x..."
                                    value={nftAddress}
                                    onChange={(e) => setNftAddress(e.target.value)}
                                    className="h-11 rounded-xl font-mono text-sm"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="tokenId" className="text-sm font-semibold">Token ID</Label>
                                <Input
                                    id="tokenId"
                                    type="number"
                                    placeholder="1"
                                    value={tokenId}
                                    onChange={(e) => setTokenId(e.target.value)}
                                    className="h-11 rounded-xl"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="price" className="text-sm font-semibold">Price (ETH)</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    step="0.001"
                                    placeholder="0.1"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="h-11 rounded-xl"
                                />
                            </div>
                            <Button
                                onClick={handleNext}
                                className="w-full h-12 rounded-xl font-bold text-base gradient-bg shadow-lg hover:shadow-xl"
                                disabled={!nftAddress || !tokenId || !price}
                            >
                                Next Step →
                            </Button>
                        </>
                    )}

                    {step === 'approve' && (
                        <div className="space-y-5">
                            <div className="p-5 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                                <p className="text-sm text-foreground font-medium leading-relaxed">
                                    You need to approve the marketplace to transfer your NFT. This is a one-time transaction per NFT collection.
                                </p>
                            </div>
                            <Button
                                onClick={handleApprove}
                                className="w-full h-12 rounded-xl font-bold text-base gradient-bg shadow-lg hover:shadow-xl"
                                disabled={!approveNFT || approveNFT.isPending}
                            >
                                {approveNFT?.isPending ? 'Approving...' : 'Approve NFT ✓'}
                            </Button>
                        </div>
                    )}

                    {step === 'list' && (
                        <div className="space-y-5">
                            <div className="rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 p-6 space-y-4 border border-primary/20">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground font-medium">NFT Address</span>
                                    <span className="font-mono font-semibold text-sm">{nftAddress.slice(0, 6)}...{nftAddress.slice(-4)}</span>
                                </div>
                                <div className="h-px bg-border/50"></div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground font-medium">Token ID</span>
                                    <span className="font-mono font-semibold text-sm">#{tokenId}</span>
                                </div>
                                <div className="h-px bg-border/50"></div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground font-medium">Listing Price</span>
                                    <span className="font-bold text-lg text-primary">{price} ETH</span>
                                </div>
                            </div>
                            <Button
                                onClick={handleList}
                                className="w-full h-12 rounded-xl font-bold text-base gradient-bg shadow-lg hover:shadow-xl"
                                disabled={listNFT.isPending}
                            >
                                {listNFT.isPending ? 'Creating Listing...' : '🚀 Create Listing'}
                            </Button>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ListNFTDialog;
