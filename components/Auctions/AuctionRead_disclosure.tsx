import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'
import { AuctionForNFT } from './AuctionForNFT'


export default function AuctionRead_disclosure(nft) {

    return (
        <div className="ml w-full text-black">
            <div className=" w-full bg-white ">
            <Disclosure>
                {({ open }) => (
                <>
                <Disclosure.Button className="hover:bg-[#c3f53b] hover:text-black border-2 px-2 bg-black text-white border-white border-solid flex flex-row w-full justify-between py-2 text-left text-lg font-normal ">
                    <span>
                        {"auctionForNFT(address, tokenId)"}
                    </span>
                    {/* <ChevronUpIcon
                        className={`${
                        open ? 'rotate-180 transform' : ''
                        } h-5 w-5`}
                    /> */}
                </Disclosure.Button>
                <Disclosure.Panel className="bg-slate-900 border-white border-2 border-solid flex flex-row flex-wrap items-center p-2 text-lg w-full">
                    <div className="w-fit flex flex-row flex-wrap">
                        <AuctionForNFT nft={nft} />
                    </div>
                </Disclosure.Panel>
                </>
                )}
            </Disclosure>
            </div>
        </div>
    )
}
