import React from 'react';
import { Wallet, Copy, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import CopyToClipboard from 'react-copy-to-clipboard';
import { WalletService, type WalletState } from '@/lib/walletService';
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
        className="pill-button gradient-bg"
      >
        <Wallet size={16} className="mr-2" />
        {isConnecting ? 'Connecting...' : 'Connect Wallet'}
      </Button>
    );
  }
  return (
    <div className="flex items-center gap-3">
      <div className="bg-accent rounded-full px-3 py-1 text-sm font-medium">
        {formatAddress(account)}
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={disconnectWallet}
        className="text-muted-foreground hover:text-destructive"
      >
        Disconnect
      </Button>
    </div>
  );
};

export default WalletConnect;
