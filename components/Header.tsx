import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const Header = () => {

  return (
    <div className="bg-black text-white flex flex-row justify-center">
      <div className="fixed top-0 right-0">
        <ConnectButton 
          accountStatus="address" 
          showBalance={false}
        />
      </div>
      <div className="z-10 bg-black fixed top-12 sm:top-0 px-4 py-w border-2 border-solid border-white flex flex-row w-fit space-x-4">
        <Link
          href="/"
        >
          <a className="hover:text-[#f53bc3]">
          HOME
          </a>
        </Link>
        <Link
          href="/indexer"
        >
          <a className="hover:text-[#f53bc3]">
            API
          </a>
        </Link>
        <Link
          href="/create"
        >
          <a className="hover:text-[#f53bc3]">
            CREATE
          </a>
        </Link>
        <Link
          href="/protocol"
        >
          <a className="hover:text-[#f53bc3]">
            PROTOCOL
          </a>
        </Link>
      </div>
    </div>
  )

};