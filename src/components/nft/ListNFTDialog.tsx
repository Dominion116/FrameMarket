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
                    <Button className="modern-pill gradient-bg text-primary-foreground font-semibold">
                        <Plus size={18} className="mr-2" />
                        List NFT
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {step === 'input' && 'List Your NFT'}
                        {step === 'approve' && 'Approve NFT'}
                        {step === 'list' && 'Create Listing'}
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    {step === 'input' && (
                        <>
                            <div className="space-y-2">
                                <Label htmlFor="nftAddress">NFT Contract Address</Label>
                                <Input
                                    id="nftAddress"
                                    placeholder="0x..."
                                    value={nftAddress}
                                    onChange={(e) => setNftAddress(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="tokenId">Token ID</Label>
                                <Input
                                    id="tokenId"
                                    type="number"
                                    placeholder="1"
                                    value={tokenId}
                                    onChange={(e) => setTokenId(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="price">Price (ETH)</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    step="0.001"
                                    placeholder="0.1"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <Button
                                onClick={handleNext}
                                className="w-full"
                                disabled={!nftAddress || !tokenId || !price}
                            >
                                Next
                            </Button>
                        </>
                    )}

                    {step === 'approve' && (
                        <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                You need to approve the marketplace to transfer your NFT. This is a one-time transaction.
                            </p>
                            <Button
                                onClick={handleApprove}
                                className="w-full"
                                disabled={!approveNFT || approveNFT.isPending}
                            >
                                {approveNFT?.isPending ? 'Approving...' : 'Approve NFT'}
                            </Button>
                        </div>
                    )}

                    {step === 'list' && (
                        <div className="space-y-4">
                            <div className="rounded-lg bg-accent/50 p-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">NFT Address:</span>
                                    <span className="font-mono">{nftAddress.slice(0, 6)}...{nftAddress.slice(-4)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Token ID:</span>
                                    <span className="font-mono">{tokenId}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Price:</span>
                                    <span className="font-semibold text-primary">{price} ETH</span>
                                </div>
                            </div>
                            <Button
                                onClick={handleList}
                                className="w-full"
                                disabled={listNFT.isPending}
                            >
                                {listNFT.isPending ? 'Creating Listing...' : 'Create Listing'}
                            </Button>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ListNFTDialog;
