"use client";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { arbitrumSepolia } from "wagmi/chains";

// Configure RainbowKit
const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID;
if (!projectId) {
  throw new Error("NEXT_PUBLIC_REOWN_PROJECT_ID is required");
}

const config = getDefaultConfig({
  appName: "Random Lucky Mint",
  projectId,
  chains: [arbitrumSepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
});
const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}