import React from 'react';
import { Wallet, Copy, CheckCircle, AlertCircle, X } from 'lucide-react';
import { Button } from '../ui/button';
import { useToast } from '../../hooks/use-toast';
import CopyToClipboard from 'react-copy-to-clipboard';
import { WalletService, type WalletState } from '../../lib/walletService';
import { useEffect, useRef, useState } from 'react';

const WalletConnect: React.FC = () => {
  const { toast } = useToast();
  const walletServiceRef = useRef<WalletService | null>(null);
  const [walletState, setWalletState] = useState<WalletState>({
    account: '',
    currentNetwork: '',
    isConnecting: false,
    balance: '',
    isLoadingBalance: false
  });

  useEffect(() => {
    const walletService = new WalletService({
      onToast: (title: string, description: string) => {
        toast({ title, description });
      }
    });

    walletService.onStateUpdate(setWalletState);
    walletServiceRef.current = walletService;

    return () => {
      walletService.destroy();
    };
  }, [toast]);
  const connectWallet = () => {
    walletServiceRef.current?.connectWallet();
  };

  const disconnectWallet = () => {
    walletServiceRef.current?.disconnectWallet();
  };

  const formatAddress = (address: string) => {
    return walletServiceRef.current?.formatAddress(address) || '';
  };

  const { account, isConnecting } = walletState;

  if (!account) {
    return (
      <Button
        onClick={connectWallet}
        disabled={isConnecting}
        className="pill-button gradient-bg text-xs sm:text-sm px-2 sm:px-4 h-8 sm:h-9"
      >
        <Wallet size={14} className="sm:w-4 sm:h-4 mr-1 sm:mr-2" />
        <span className="hidden xs:inline">{isConnecting ? 'Connecting...' : 'Connect'}</span>
        <span className="xs:hidden">{isConnecting ? '...' : 'Connect'}</span>
      </Button>
    );
  }
  return (
    <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
      <div className="bg-accent rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium whitespace-nowrap">
        {formatAddress(account)}
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={disconnectWallet}
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
