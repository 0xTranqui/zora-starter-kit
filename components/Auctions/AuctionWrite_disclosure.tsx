import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'
import { CreateAuction } from './CreateAuction'
import { SetAuctionReservePrice } from './SetAuctionReservePrice'
import { CancelAuction } from './CancelAuction'
import { SettleAuction } from './SettleAuction'
import { CreateBid } from './CreateBid'
import { Dispatch, useState, SetStateAction } from 'react'

interface nftInfo {
    nft: {
        contractAddress: string,
        tokenId: string
    }
}

export default function AuctionWrite_disclosure(nft) {

    return (
        <div className=" w-full flex flex-row flex-wrap text-white">
            <div className=" w-full flex flex-row flex-wrap bg-white ">
                <Disclosure>
                    {({ open }) => (
                    <>
                    <Disclosure.Button className="hover:bg-[#c3f53b] hover:text-black border-2 px-2 bg-black text-white border-white border-solid flex flex-row w-full justify-between py-2 text-left text-lg font-normal ">
                        <span>
                            {"createAuction(tokenContract, tokenId, duration, reservePrice, sellerFundsRecipient, startTime, findersFeeBps)"}
                        </span>
                        {/* <ChevronUpIcon
                            className={`${
                            open ? 'rotate-180 transform' : ''
                            } h-5 w-5`}
                        /> */}
                    </Disclosure.Button>
                    <Disclosure.Panel className="bg-slate-900 border-white border-2 border-solid flex flex-row flex-wrap p-2 text-lg w-full">
                        <div className=" w-fit flex flex-row flex-wrap">
                            <CreateAuction nft={nft} />
                        </div>
                    </Disclosure.Panel>
                    </>
                    )}
                </Disclosure>
                <Disclosure>
                    {({ open }) => (
                    <>
                    <Disclosure.Button className="hover:bg-[#c3f53b] hover:text-black border-2 px-2 bg-black text-white border-white border-solid flex flex-row w-full justify-between py-2 text-left text-lg font-normal ">
                        <span>
                            {"setAuctionReservePrice(tokenContract, tokenId, reservePrice)"}
                        </span>
                        {/* <ChevronUpIcon
                            className={`${
                            open ? 'rotate-180 transform' : ''
                            } h-5 w-5`}
                        /> */}
                    </Disclosure.Button>
                    <Disclosure.Panel className="bg-slate-900 border-white border-2 border-solid flex flex-row flex-wrap p-2 text-lg w-full">
                        <div className="w-fit flex flex-row flex-wrap">
                            <SetAuctionReservePrice nft={nft} />
                        </div>
                    </Disclosure.Panel>
                    </>
                    )}
                </Disclosure>
                <Disclosure>
                    {({ open }) => (
                    <>
                    <Disclosure.Button className="hover:bg-[#c3f53b] hover:text-black border-2 px-2 bg-black text-white border-white border-solid flex flex-row flex-wrap w-full justify-between py-2 text-left text-lg font-normal ">
                        <span>
                            {"cancelAuction(tokenContract, tokenId)"}
                        </span>
                        {/* <ChevronUpIcon
                            className={`${
                            open ? 'rotate-180 transform' : ''
                            } h-5 w-5`}
                        /> */}
                    </Disclosure.Button>
                    <Disclosure.Panel className="bg-slate-900 border-white border-2 border-solid flex flex-row flex-wrap p-2 text-lg w-full">
                        <div className=" w-fit flex flex-row flex-wrap">
                            <CancelAuction nft={nft} />
                        </div>
                    </Disclosure.Panel>
                    </>
                    )}
                </Disclosure>
                <Disclosure>
                    {({ open }) => (
                    <>
                    <Disclosure.Button className="hover:bg-[#c3f53b] hover:text-black border-2 px-2 bg-black text-white border-white border-solid flex flex-row flex-wrap w-full justify-between py-2 text-left text-lg font-normal ">
                        <span>
                            {"settleAuction(tokenContract, tokenId)"}
                        </span>
                        {/* <ChevronUpIcon
                            className={`${
                            open ? 'rotate-180 transform' : ''
                            } h-5 w-5`}
                        /> */}
                    </Disclosure.Button>
                    <Disclosure.Panel className="bg-slate-900 border-white border-2 border-solid flex flex-row flex-wrap p-2 text-lg w-full">
                        <div className=" w-fit flex flex-row flex-wrap">
                            <SettleAuction nft={nft} />
                        </div>
                    </Disclosure.Panel>
                    </>
                    )}
                </Disclosure>                
                <Disclosure>
                    {({ open }) => (
                    <>
                    <Disclosure.Button className="hover:bg-[#c3f53b] hover:text-black border-2 px-2 bg-black text-white border-white border-solid flex flex-row w-full justify-between py-2 text-left text-lg font-normal ">
                        <span>
                            {"createBid(payableAmount, tokenContract, tokenId, finder)"}
                        </span>
                        {/* <ChevronUpIcon
                            className={`${
                            open ? 'rotate-180 transform' : ''
                            } h-5 w-5`}
                        /> */}
                    </Disclosure.Button>
                    <Disclosure.Panel className="bg-slate-900 border-white border-2 border-solid flex flex-row flex-wrap p-2 text-lg w-full">
                        <div className="w-fit flex flex-row flex-wrap">
                            <CreateBid nft={nft} />
                        </div>
                    </Disclosure.Panel>
                    </>
                    )}
                </Disclosure>                                                         
            </div>
        </div>
    )
}

// return (
//     <div className=" ml-2 w-full text-black">
//         <div className=" w-full max-w-md bg-white ">
//         <Disclosure>
//             {({ open }) => (
//             <>
//             <Disclosure.Button className="hover:bg-white hover:text-black border-2 px-2 bg-black text-white border-white border-solid flex flex-row w-full justify-between py-2 text-left text-lg font-normal ">
//                 <span>
//                     {"askForNFT(address, tokenId)"}
//                 </span>
//                 {/* <ChevronUpIcon
//                     className={`${
//                     open ? 'rotate-180 transform' : ''
//                     } h-5 w-5`}
//                 /> */}
//             </Disclosure.Button>
//             <Disclosure.Panel className="bg-[#FFAFC2] px-4 pt-4 pb-2 text-lg">
//                 <div>
//                     <input
//                         className="ml-5 text-black text-center bg-slate-200"
//                         placeholder="contractAddress"
//                         name="askForNFT_contractAddress"
//                         type="text"
//                         value={nft.nft.contractAddress}
//                         onChange={(e) => {
//                             e.preventDefault();
//                             setAsksCB(current => {
//                                 return {
//                                 ...current,
//                                 nft: {
//                                 ...current.nft,
//                                 tokenId: e.target.value
//                                 }}
//                             })
//                         }}
//                         required                              
//                     >
//                     </input>
//                     <input
//                         className="ml-5 text-black text-center bg-slate-200"
//                         placeholder="tokenId"
//                         name="askForNFT_tokenId"
//                         type="text"
//                         value={nft.nft.tokenId}
//                         onChange={(e) => {
//                             e.preventDefault();
//                             setAsksCB(current => {
//                                 return {
//                                 ...current,
//                                 tokenId: e.target.value
//                                 }
//                             })
//                         }}
//                         required                              
//                     >
//                     </input>
//                     <AskForNFT_READ nft={nft} />
//                 </div>
//             </Disclosure.Panel>
//             </>
//             )}
//         </Disclosure>
//         </div>
//     </div>
// )