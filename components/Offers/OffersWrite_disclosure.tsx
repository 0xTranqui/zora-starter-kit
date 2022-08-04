import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'
import { CreateOffer } from './CreateOffer'
import { SetOfferAmount } from './SetOfferAmount'
import { CancelOffer } from './CancelOffer'
import { FillOffer } from './FillOffer' 

export default function OffersWrite_disclosure(nft) {

    return (
        <div className=" w-full flex flex-row flex-wrap mtext-black">
            <div className=" w-full flex flex-row flex-wrap bg-white ">
                <Disclosure>
                    {({ open }) => (
                    <>
                    <Disclosure.Button className="hover:bg-[#c3f53b] hover:text-black border-2 px-2 bg-black text-white border-white border-solid flex flex-row w-full justify-between py-2 text-left text-lg font-normal ">
                        <span>
                            {"createOffer(tokenContract, tokenId, currency, amount, findersFeeBps)"}
                        </span>
                        {/* <ChevronUpIcon
                            className={`${
                            open ? 'rotate-180 transform' : ''
                            } h-5 w-5`}
                        /> */}
                    </Disclosure.Button>
                    <Disclosure.Panel className="bg-slate-900 border-white border-2 border-solid flex flex-row flex-wrap p-2 text-lg w-full">
                        <div className="w-fit flex flex-row flex-wrap">
                            <CreateOffer nft={nft} />
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
                            {"setOfferAmount(tokenContract, tokenId, offerId, currency, amount)"}
                        </span>
                        {/* <ChevronUpIcon
                            className={`${
                            open ? 'rotate-180 transform' : ''
                            } h-5 w-5`}
                        /> */}
                    </Disclosure.Button>
                    <Disclosure.Panel className="bg-slate-900 border-white border-2 border-solid flex flex-row flex-wrap p-2 text-lg w-full">
                        <div className="w-fit flex flex-row flex-wrap">
                            <SetOfferAmount nft={nft} />
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
                            {"cancelOffer(tokenContract, tokenId, offerId)"}
                        </span>
                        {/* <ChevronUpIcon
                            className={`${
                            open ? 'rotate-180 transform' : ''
                            } h-5 w-5`}
                        /> */}
                    </Disclosure.Button>
                    <Disclosure.Panel className="bg-slate-900 border-white border-2 border-solid flex flex-row flex-wrap p-2 text-lg w-full">
                        <div className=" w-fit flex flex-row flex-wrap">
                            <CancelOffer nft={nft} />
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
                            {"fillOffer(tokenContract, tokenId, offerId, currency, amount, finder)"}
                        </span>
                        {/* <ChevronUpIcon
                            className={`${
                            open ? 'rotate-180 transform' : ''
                            } h-5 w-5`}
                        /> */}
                    </Disclosure.Button>
                    <Disclosure.Panel className="bg-slate-900 border-white border-2 border-solid flex flex-row flex-wrap p-2 text-lg w-full">
                        <div className="w-fit flex flex-row flex-wrap">
                            <FillOffer nft={nft} />
                        </div>
                    </Disclosure.Panel>
                    </>
                    )}
                </Disclosure>                                                         
            </div>
        </div>
    )
}