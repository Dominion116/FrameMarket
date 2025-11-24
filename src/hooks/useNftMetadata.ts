import { useEffect, useState } from 'react';
import { useReadContract } from 'wagmi';
import { erc721Abi } from 'viem';

interface NftMetadata {
  name?: string;
  description?: string;
  image?: string;
}

export function useNftMetadata(nft: `0x${string}` | string, tokenId: bigint) {
  const [metadata, setMetadata] = useState<NftMetadata>({});
  const [isLoadingMeta, setIsLoadingMeta] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const tokenUriRead = useReadContract({
    address: nft as `0x${string}`,
    abi: erc721Abi,
    functionName: 'tokenURI',
    args: [tokenId],
  });

  useEffect(() => {
    const uri = tokenUriRead.data as string | undefined;
    if (!uri) return;

    let cancelled = false;
    const load = async () => {
      try {
        setIsLoadingMeta(true);
        const url = uri.startsWith('ipfs://')
          ? `https://ipfs.io/ipfs/${uri.replace('ipfs://', '')}`
          : uri;
        const res = await fetch(url);
        const json = (await res.json()) as any;
        if (!cancelled) {
          setMetadata({
            name: json.name,
            description: json.description,
            image: json.image,
          });
        }
      } catch (e: any) {
        if (!cancelled) setError(e);
      } finally {
        if (!cancelled) setIsLoadingMeta(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [tokenUriRead.data]);

  return {
    metadata,
    isLoading: tokenUriRead.isLoading || isLoadingMeta,
    error: tokenUriRead.error || error,
  };
}
