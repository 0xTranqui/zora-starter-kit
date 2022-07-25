import { Header } from "../Header";
import { useContractRead, useAccount, useContractWrite } from "wagmi";
import { AsksV1_1Interface } from "@zoralabs/v3/dist/typechain/AsksV1_1"
import * as mainnetZoraAddresses from "@zoralabs/v3/dist/addresses/1.json"
import { abi } from "@zoralabs/v3/dist/artifacts/ReserveAuctionFindersEth.sol/ReserveAuctionFindersEth.json"
import { useState, useEffect } from "react";
import { ReadContractResult } from "@wagmi/core";
import { BigNumber, ethers, utils } from "ethers";

export const CreateAuction = (nft) => {

    // this file is integrated with the ReserveAuctionFindersEth module
    // so no currency is specified (since it only works for ETH)

    interface createAuctionCall {
        tokenContract: any,
        tokenId: any,
        duration: any,
        reservePrice: any,
        sellerFundsRecipient: any,
        startTime: any,
        findersFeeBps: any
    }

    const [createAuction, setCreateAuction] = useState<createAuctionCall>({
        "tokenContract": nft.nft.nft.contractAddress,
        "tokenId": nft.nft.nft.tokenId,
        "duration": "",
        "reservePrice": "",
        "sellerFundsRecipient": "",
        "startTime": "",
        "findersFeeBps": ""
    })

    const auctionContractAddress = nft ? nft.nft.nft.contractAddress : createAuction.tokenContract    
    const auctionTokenId = nft ? nft.nft.nft.tokenId : createAuction.tokenId    

    // ReserveAuctionFindersEth createAuction call
    const reservePrice = createAuction.reservePrice ? ethers.utils.parseEther(createAuction.reservePrice) : ""

    const { data: createAuctionData, isError: createAuctionError, isLoading: createAuctionLoading, isSuccess: createAuctionSuccess, write: createAuctionWrite  } = useContractWrite({
        addressOrName: mainnetZoraAddresses.ReserveAuctionFindersEth,
        contractInterface: abi,
        functionName: 'createAuction',
        args: [
            auctionContractAddress,
            auctionTokenId,
            createAuction.duration,
            reservePrice,
            createAuction.sellerFundsRecipient,
            createAuction.startTime,
            createAuction.findersFeeBps
        ],
        onError(error, variables, context) {
            console.log("error", error)
        },
        onSuccess(createAuctionData, variables, context) {
            console.log("Success!", createAuctionData)
        },
    })

    const shortenedAddress = (address) => {
        let displayAddress = address?.substr(0,4) + "..." + address?.substr(-4)
        return displayAddress
    }
    
    return (
        <div className="flex flex-row flex-wrap w-fit space-y-1">
            <div className="flex flex-row flex-wrap w-full justify-center  border-solid ">
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
                    placeholder="Auction Duration"
                    name="createAuctionDuration"
                    type="number"
                    value={createAuction.duration}
                    onChange={(e) => {
                        e.preventDefault();
                        setCreateAuction(current => {
                            return {
                            ...current,
                            duration: e.target.value
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
                    placeholder="Reserve Price (ETH)"
                    name="createAuctionReservePrice"
                    type="number"
                    value={createAuction.reservePrice}
                    onChange={(e) => {
                        e.preventDefault();
                        setCreateAuction(current => {
                            return {
                            ...current,
                            reservePrice: e.target.value
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
                    placeholder="Seller Funds Recipient (address)"
                    name="createAuctionSellerFundsRecipient"
                    type="text"
                    value={createAuction.sellerFundsRecipient}
                    onChange={(e) => {
                        e.preventDefault();
                        setCreateAuction(current => {
                            return {
                            ...current,
                            sellerFundsRecipient: e.target.value
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
                    placeholder="Start Time (unix)"
                    name="createAuctionStartTime"
                    type="number"
                    value={createAuction.startTime}
                    onChange={(e) => {
                        e.preventDefault();
                        setCreateAuction(current => {
                            return {
                            ...current,
                            startTime: e.target.value
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
                    placeholder="Finders Fee Bps"
                    name="createAuctionFindersFeeBps"
                    type="number"
                    value={createAuction.findersFeeBps}
                    onChange={(e) => {
                        e.preventDefault();
                        setCreateAuction(current => {
                            return {
                            ...current,
                            findersFeeBps: e.target.value
                            }
                        })
                    }}
                    required                              
                >
                </input>
            </div>                                                                             
        
            <button 
                type="button"
                onClick={() => createAuctionWrite()}
                className="border-2 border-white border-solid w-full px-2 hover:bg-[#33FF57] hover:text-slate-900"
            >
                CREATE AUCTION
            </button>
        </div>
    )
}