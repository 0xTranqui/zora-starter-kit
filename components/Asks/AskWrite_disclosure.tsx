import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'
import { CreateAsk } from './CreateAsk'
import { SetAskPrice } from './SetAskPrice'
import { CancelAsk } from './CancelAsk'
import { FillAsk } from './FillAsk'

interface nftInfo {
    nft: {
        contractAddress: string,
        tokenId: string
    }
}

export default function AskWrite_disclosure(nft) {

    return (
        <div className=" w-full flex flex-row flex-wrap mtext-black">
            <div className=" w-full flex flex-row flex-wrap bg-white ">
                <Disclosure>
                    {({ open }) => (
                    <>
                    <Disclosure.Button className="hover:bg-[#c3f53b] hover:text-black border-2 px-2 bg-black text-white border-white border-solid flex flex-row w-full justify-between py-2 text-left text-lg font-normal ">
                        <span>
                            {"createAsk(tokenContract, tokenId, askPrice, askCurrency, sellerFundsRecipient, findersFeeBps)"}
                        </span>
                        {/* <ChevronUpIcon
                            className={`${
                            open ? 'rotate-180 transform' : ''
                            } h-5 w-5`}
                        /> */}
                    </Disclosure.Button>
                    <Disclosure.Panel className="bg-slate-900 border-white border-2 border-solid flex flex-row flex-wrap p-2 text-lg w-full">
                        <div className="w-fit flex flex-row flex-wrap">
                            <CreateAsk nft={nft} />
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
                            {"setAskPrice(tokenContract, tokenId, askPrice, askCurrency)"}
                        </span>
                        {/* <ChevronUpIcon
                            className={`${
                            open ? 'rotate-180 transform' : ''
                            } h-5 w-5`}
                        /> */}
                    </Disclosure.Button>
                    <Disclosure.Panel className="bg-slate-900 border-white border-2 border-solid flex flex-row flex-wrap p-2 text-lg w-full">
                        <div className="w-fit flex flex-row flex-wrap">
                            <SetAskPrice nft={nft} />
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
                            {"cancelAsk(tokenContract, tokenId)"}
                        </span>
                        {/* <ChevronUpIcon
                            className={`${
                            open ? 'rotate-180 transform' : ''
                            } h-5 w-5`}
                        /> */}
                    </Disclosure.Button>
                    <Disclosure.Panel className="bg-slate-900 border-white border-2 border-solid flex flex-row flex-wrap p-2 text-lg w-full">
                        <div className=" w-fit flex flex-row flex-wrap">
                            <CancelAsk nft={nft} />
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
                            {"fillAsk(tokenContract, tokenId, fillCurrency, fillAmount, finder)"}
                        </span>
                        {/* <ChevronUpIcon
                            className={`${
                            open ? 'rotate-180 transform' : ''
                            } h-5 w-5`}
                        /> */}
                    </Disclosure.Button>
                    <Disclosure.Panel className="bg-slate-900 border-white border-2 border-solid flex flex-row flex-wrap p-2 text-lg w-full">
                        <div className="w-fit flex flex-row flex-wrap">
                            <FillAsk nft={nft} />
                        </div>
                    </Disclosure.Panel>
                    </>
                    )}
                </Disclosure>                                                         
            </div>
        </div>
    )
}