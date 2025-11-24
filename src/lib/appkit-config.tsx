import React from 'react'
import { createAppKit } from '@reown/appkit/react'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { defineChain } from 'viem'

// Define Base mainnet
const baseMainnet = defineChain({
  id: 8453,
  name: 'Base',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://mainnet.base.org'],
    },
  },
  blockExplorers: {
    default: {
      name: 'BaseScan',
      url: 'https://basescan.org',
    },
  },
})

const projectId = 'c4d1073b614dbe0020ac5f6d9366f228'

// Create metadata object
const metadata = {
  name: 'FrameMarket',
  description: 'NFT Marketplace on Celo',
  url: typeof window !== 'undefined' ? window.location.origin : 'https://framemarket.com',
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

// Set the networks (Base mainnet only)
const networks = [baseMainnet]

// Setup queryClient
const queryClient = new QueryClient()

// Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true
})

// Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true
  }
})

export function AppKitProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}

export { wagmiAdapter }

