import React from 'react';
import { Wallet, X } from 'lucide-react';
import { Button } from '../ui/button';
import { useAccount, useDisconnect, useBalance } from 'wagmi';
import { useAppKit } from '@reown/appkit/react';

const WalletConnect: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { open } = useAppKit();
  const { data: balance } = useBalance({
    address: address,
  });

  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (!isConnected || !address) {
    return (
      <Button
        onClick={() => open()}
        className="pill-button gradient-bg text-xs sm:text-sm px-2 sm:px-4 h-8 sm:h-9"
      >
        <Wallet size={14} className="sm:w-4 sm:h-4 mr-1 sm:mr-2" />
        <span className="hidden xs:inline">Connect</span>
        <span className="xs:hidden">Connect</span>
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
      <div className="bg-accent rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium">
        <div className="whitespace-nowrap">{formatAddress(address)}</div>
        {balance && (
          <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">
            {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
          </div>
        )}
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => disconnect()}
        className="text-muted-foreground hover:text-destructive h-8 w-8 sm:h-9 sm:w-auto sm:px-3 p-0 sm:p-2"
        title="Disconnect"
      >
        <span className="hidden sm:inline">Disconnect</span>
        <X className="sm:hidden" size={16} />
      </Button>
    </div>
  );
};

export default WalletConnect;
