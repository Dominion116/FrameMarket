import { useMemo } from 'react';
import { formatEther, parseEther } from 'viem';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { frameMarketContract } from '@/lib/frameMarketContract';
import { useToast } from '@/components/ui/use-toast';
import { erc721Abi } from 'viem';

export interface ListingView {
  id: bigint;
  seller: `0x${string}`;
  nft: `0x${string}`;
  tokenId: bigint;
  price: bigint;
  active: boolean;
}

export function useNextListingId() {
  return useReadContract({
    ...frameMarketContract,
    functionName: 'nextListingId',
  });
}

export function useListing(id: bigint) {
  return useReadContract({
    ...frameMarketContract,
    functionName: 'getListing',
    args: [id],
  });
}

export function useFrameMarketListings() {
  const next = useNextListingId();

  const listingsIds = useMemo(() => {
    if (!next.data) return [] as bigint[];
    const max = next.data as bigint;
    const ids: bigint[] = [];
    for (let i = 0n; i < max; i++) ids.push(i);
    return ids;
  }, [next.data]);

  // NOTE: For simplicity we only return ids here; the UI will call useListing per-card.
  return {
    listingIds: listingsIds,
    isLoading: next.isLoading,
    isError: next.isError,
  };
}

export function usePurchaseListing(listingId: bigint, price: bigint) {
  const { toast } = useToast();
  const { address } = useAccount();
  const write = useWriteContract();

  const hash = write.data;
  const wait = useWaitForTransactionReceipt({
    hash,
    query: { enabled: !!hash },
  });

  const buy = () => {
    if (!address) {
      toast({ title: 'Connect wallet', description: 'Please connect your wallet to buy this NFT.' });
      return;
    }
    write.writeContract({
      ...frameMarketContract,
      functionName: 'purchase',
      args: [listingId],
      value: price,
    });
  };

  return {
    buy,
    hash,
    isPending: write.isPending || wait.isLoading,
    isSuccess: wait.isSuccess,
    isError: write.isError || wait.isError,
  };
}

export function formatPriceEther(price: bigint): string {
  try {
    return `${formatEther(price)} ETH`;
  } catch {
    return '0 ETH';
  }
}

export function parsePriceEther(input: string): bigint {
  return parseEther(input || '0');
}

// Hook to list an NFT
export function useListNFT() {
  const { toast } = useToast();
  const { address } = useAccount();
  const write = useWriteContract();

  const hash = write.data;
  const wait = useWaitForTransactionReceipt({
    hash,
    query: { enabled: !!hash },
  });

  const list = (nftAddress: `0x${string}`, tokenId: bigint, price: bigint) => {
    if (!address) {
      toast({ title: 'Connect wallet', description: 'Please connect your wallet to list an NFT.' });
      return;
    }
    write.writeContract({
      ...frameMarketContract,
      functionName: 'list',
      args: [nftAddress, tokenId, price],
    });
  };

  return {
    list,
    hash,
    isPending: write.isPending || wait.isLoading,
    isSuccess: wait.isSuccess,
    isError: write.isError || wait.isError,
    error: write.error || wait.error,
  };
}

// Hook to update listing price
export function useUpdateListingPrice() {
  const { toast } = useToast();
  const { address } = useAccount();
  const write = useWriteContract();

  const hash = write.data;
  const wait = useWaitForTransactionReceipt({
    hash,
    query: { enabled: !!hash },
  });

  const updatePrice = (listingId: bigint, newPrice: bigint) => {
    if (!address) {
      toast({ title: 'Connect wallet', description: 'Please connect your wallet to update price.' });
      return;
    }
    write.writeContract({
      ...frameMarketContract,
      functionName: 'updatePrice',
      args: [listingId, newPrice],
    });
  };

  return {
    updatePrice,
    hash,
    isPending: write.isPending || wait.isLoading,
    isSuccess: wait.isSuccess,
    isError: write.isError || wait.isError,
    error: write.error || wait.error,
  };
}

// Hook to cancel listing
export function useCancelListing() {
  const { toast } = useToast();
  const { address } = useAccount();
  const write = useWriteContract();

  const hash = write.data;
  const wait = useWaitForTransactionReceipt({
    hash,
    query: { enabled: !!hash },
  });

  const cancel = (listingId: bigint) => {
    if (!address) {
      toast({ title: 'Connect wallet', description: 'Please connect your wallet to cancel listing.' });
      return;
    }
    write.writeContract({
      ...frameMarketContract,
      functionName: 'cancel',
      args: [listingId],
    });
  };

  return {
    cancel,
    hash,
    isPending: write.isPending || wait.isLoading,
    isSuccess: wait.isSuccess,
    isError: write.isError || wait.isError,
    error: write.error || wait.error,
  };
}

// Hook to approve NFT for marketplace
export function useApproveNFT(nftAddress: `0x${string}`) {
  const { toast } = useToast();
  const { address } = useAccount();
  const write = useWriteContract();

  const hash = write.data;
  const wait = useWaitForTransactionReceipt({
    hash,
    query: { enabled: !!hash },
  });

  const approve = (tokenId: bigint) => {
    if (!address) {
      toast({ title: 'Connect wallet', description: 'Please connect your wallet to approve NFT.' });
      return;
    }
    write.writeContract({
      address: nftAddress,
      abi: erc721Abi,
      functionName: 'approve',
      args: [frameMarketContract.address, tokenId],
    });
  };

  return {
    approve,
    hash,
    isPending: write.isPending || wait.isLoading,
    isSuccess: wait.isSuccess,
    isError: write.isError || wait.isError,
    error: write.error || wait.error,
  };
}

// Hook to check if marketplace is approved
export function useIsApproved(nftAddress: `0x${string}`, tokenId: bigint) {
  const { data: approvedAddress } = useReadContract({
    address: nftAddress,
    abi: erc721Abi,
    functionName: 'getApproved',
    args: [tokenId],
  });

  return {
    isApproved: approvedAddress === frameMarketContract.address,
    approvedAddress,
  };
}
