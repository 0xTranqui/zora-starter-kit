import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";


export const Header = () => {

  return (
    <div className="text-white flex flex-row justify-center">
      <div className="fixed top-0 right-0">
        <ConnectButton 
          accountStatus="address" 
          showBalance={false}
        />
      </div>
      <div className="fixed top-0 px-4 py-4 flex flex-row w-fit space-x-4">
        <Link
          href="/"
        >
          <a className="hover:underline">
          HOME
          </a>
        </Link>
        <Link
          href="/indexer"
        >
          <a className="hover:underline">
            API
          </a>
        </Link>
        <Link
          href="/create"
        >
          <a className="hover:underline">
            CREATE
          </a>
        </Link>
        <Link
          href="/protocol"
        >
          <a className="hover:underline">
            PROTOCOL
          </a>
        </Link>
      </div>
    </div>
  )

};