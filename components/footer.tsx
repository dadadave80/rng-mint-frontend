import { RngMintAddress } from "@/lib/rng-mint";
import Link from "next/link";

export function Footer() {
  return (
    <div className="max-w-7xl w-full mx-auto flex items-center justify-between h-16">
      <p className="text-sm text-gray-400">
        Learn how to build this on{" "}
        <Link
          href="https://learnweb3.io/courses/arbitrum-stylus-course"
          target="_blank"
          className="text-blue-600 hover:text-blue-500"
        >
          LearnWeb3 x Arbitrum Stylus
        </Link>
      </p>
      <Link
        href={`https://sepolia.arbiscan.io/address/${RngMintAddress}`}
        target="_blank"
        className="text-sm text-gray-400 hover:text-blue-500"
      >
        View RngMint on Arbiscan
      </Link>
    </div>
  );
}