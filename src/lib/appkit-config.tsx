import React from 'react'
import { createAppKit } from '@reown/appkit/react'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { defineChain } from 'viem'

// Define Celo networks
const celoMainnet = defineChain({
  id: 42220,
  name: 'Celo',
  nativeCurrency: {
    name: 'CELO',
    symbol: 'CELO',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://forno.celo.org'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Celo Explorer',
      url: 'https://explorer.celo.org',
    },
  },
})

const celoAlfajores = defineChain({
  id: 44787, // Celo Alfajores testnet
  name: 'Celo Alfajores',
  nativeCurrency: {
    name: 'CELO',
    symbol: 'CELO',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://alfajores-forno.celo-testnet.org'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Celo Alfajores Explorer',
      url: 'https://alfajores.celoscan.io',
    },
  },
})

// Get projectId from environment or use provided one
const projectId = 'c4d1073b614dbe0020ac5f6d9366f228'

// Create metadata object
const metadata = {
  name: 'FrameMarket',
  description: 'NFT Marketplace on Celo',
  url: typeof window !== 'undefined' ? window.location.origin : 'https://framemarket.com',
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

// Set the networks
const networks = [celoMainnet, celoAlfajores]

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

