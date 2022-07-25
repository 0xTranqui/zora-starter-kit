import { Header } from "../Header";
import { useContractRead, useAccount, useContractWrite } from "wagmi";
import { AsksV1_1Interface } from "@zoralabs/v3/dist/typechain/AsksV1_1"
import * as mainnetZoraAddresses from "@zoralabs/v3/dist/addresses/1.json"
import { abi } from "@zoralabs/v3/dist/artifacts/ReserveAuctionFindersEth.sol/ReserveAuctionFindersEth.json"
import { useState, useEffect } from "react";
import { ReadContractResult } from "@wagmi/core";
import { BigNumber, ethers, utils } from "ethers";

export const CreateBid = (nft) => {

    interface createBidCall {
        tokenContract: any,
        tokenId: any,
        finder: any,
        bidPrice: any
    }

    const [createBid, setCreateBid] = useState<createBidCall>({
        "tokenContract": nft.nft.nft.contractAddress,
        "tokenId": nft.nft.nft.tokenId,
        "finder": "0x0000000000000000000000000000000000000000",
        "bidPrice": ""
    })

    const auctionContractAddress = nft ? nft.nft.nft.contractAddress : createBid.tokenContract    
    const auctionTokenId = nft ? nft.nft.nft.tokenId : createBid.tokenId

    const bidPrice = createBid.bidPrice ? ethers.utils.parseEther(createBid.bidPrice) : ""

    const { data: createBidData, isError: createBidError, isLoading: createBidLoading, isSuccess: createBidSuccess, write: createBidWrite  } = useContractWrite({
        addressOrName: mainnetZoraAddresses.ReserveAuctionFindersEth,
        contractInterface: abi,
        functionName: 'createBid',
        args: [
            auctionContractAddress,
            auctionTokenId,
            createBid.finder
        ],
        overrides: {
            value: bidPrice
        },
        onError(error, variables, context) {
            console.log("error", error)
        },
        onSuccess(createBidData, variables, context) {
            console.log("Success!", createBidData)
        },
    })

    const shortenedAddress = (address) => {
        let displayAddress = address?.substr(0,4) + "..." + address?.substr(-4)
        return displayAddress
    }
    
    return (
        <div className="flex flex-row flex-wrap w-fit space-y-1">
            <div className="flex flex-row flex-wrap w-full justify-center ">
                <div>
                    {"Contract Address: " + shortenedAddress(nft.nft.nft.contractAddress)}
                </div>                    
                <div className="ml-5 flex flex-row flex-wrap w-fit">                    
                    {"Token Id: " + nft.nft.nft.tokenId}
                </div>                                       
            </div>               

            <div className="flex flex-row w-full">
                <input
                    className="flex flex-row flex-wrap w-full text-black text-center bg-slate-200 hover:bg-slate-300"
                    placeholder="Finder (address)"
                    name="createBidFinder"
                    type="text"
                    value={createBid.finder}
                    onChange={(e) => {
                        e.preventDefault();
                        setCreateBid(current => {
                            return {
                            ...current,
                            finder: e.target.value
                            }
                        })
                    }}
                    required                              
                >
                </input>
            </div>

            <div className="flex flex-row w-full">
                <input
                    className="flex flex-row flex-wrap w-full text-black text-center bg-slate-200 hover:bg-slate-300"
                    placeholder="Bid Price (ETH)"
                    name="createBidPrice"
                    type="number"
                    value={createBid.bidPrice}
                    onChange={(e) => {
                        e.preventDefault();
                        setCreateBid(current => {
                            return {
                            ...current,
                            bidPrice: e.target.value
                            }
                        })
                    }}
                    required                              
                >
                </input>
            </div>                                                                           
        
            <button 
                type="button"
                onClick={() => createBidWrite()}
                className="border-2 border-white border-solid flex flex-row justify-center w-full px-2 hover:text-slate-900 hover:bg-[#33FF57]"
            >
                SUBMIT BID
            </button>
        </div>
    )
}