"use client";

import { RngMintModal, StatusStep } from "@/components/rng-mint-modal";
import { RngMintABI, RngMintAddress } from "@/lib/rng-mint";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import { getContract, isAddress, parseEventLogs, publicActions } from "viem";
import { useAccount, useWalletClient } from "wagmi";

export function Mint() {
  const [showModal, setShowModal] = useState(false);
  const [statusSteps, setStatusSteps] = useState<StatusStep[]>([]);

  const [mintAddress, setMintAddress] = useState("");
  const [mintedAmount, setMintedAmount] = useState<bigint | null>(null);

  const { isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();

  const handleMint = async () => {
    // If the user is not connected, return
    if (!walletClient || !isAddress(mintAddress)) return;
    // Configure the wallet client to also be able to call public functions (like waiting for txn receipts)
    const extendedClient = walletClient.extend(publicActions);

    // Show the rngmint modal, enable animation, and reset the result to undefined
    setMintedAmount(null);
    setShowModal(true);

    // Initialize the rngmint contract
    const rngmint = getContract({
      abi: RngMintABI,
      address: RngMintAddress,
      client: walletClient,
    });

    // Add a status step to the status steps array
    setStatusSteps([
      {
        step: "Confirming transaction",
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);

    // Call the mintTo function on the rngmint contract
    const mintToTx = await rngmint.write.mintTo([mintAddress]);

    // Wait for the transaction to be mined
    const mintToReceipt = await extendedClient.waitForTransactionReceipt({
      hash: mintToTx,
    });

    // Add a status step to the status steps array
    setStatusSteps((prev) => [
      ...prev,
      { step: "Mint Requested", timestamp: new Date().toLocaleTimeString() },
    ]);

    // Extract the MintRequested log from the transaction receipt
    // so we know the nonce of the game
    const mintRequestedLog = parseEventLogs({
      abi: rngmint.abi,
      logs: mintToReceipt.logs,
    }).find((log) => log.eventName === "MintRequested")!;

    // Create an event watcher on the contract looking for the Minted event
    // with a matching nonce
    const unwatch = extendedClient.watchContractEvent({
      fromBlock: mintToReceipt.blockNumber,
      address: rngmint.address,
      abi: rngmint.abi,
      eventName: "Minted",
      onLogs: async (logs) => {
        for (const log of logs) {
          // If we see a MintRequested event for a different nonce, ignore and move on
          if (log.args.id !== mintRequestedLog.args.requestId) continue;

          // Add a status step to the status steps array
          setStatusSteps((prev) => [
            ...prev,
            {
              step: `Minted ${
                log.args.amount?.toString?.() ?? log.args.amount
              } tokens`,
              timestamp: new Date().toLocaleTimeString(),
            },
          ]);

          setMintedAmount(
            (log.args.amount as bigint) / BigInt(10) ** BigInt(18)
          );
          setStatusSteps([]);
          setShowModal(false);
          setMintAddress("");
          unwatch();
        }
      },
    });
  };

  const closeModal = () => {
    setShowModal(false);
    setStatusSteps([]);
  };

  return (
    <>
      <div className="flex flex-col gap-4 items-center">
        {isConnected ? (
          <div className="flex flex-col gap-3 items-center w-full max-w-xl">
            <input
              type="text"
              value={mintAddress}
              onChange={(e) => setMintAddress(e.target.value)}
              placeholder="Enter an address"
              className="w-full max-w-2xl rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              className="bg-blue-600 hover:bg-blue-700 transition-all font-medium text-white text-lg px-6 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!isAddress(mintAddress)}
              onClick={() =>
                handleMint().catch((err) => {
                  window.alert(err);
                  closeModal();
                })
              }
            >
              Lucky Mint!
            </button>
            {mintedAmount !== null && (
              <p className="text-sm text-gray-700">
                Minted amount: {mintedAmount.toString()}
              </p>
            )}
          </div>
        ) : (
          <ConnectButton />
        )}
      </div>

      <RngMintModal
        isOpen={showModal}
        statusSteps={statusSteps}
        onClose={closeModal}
      />
    </>
  );
}
