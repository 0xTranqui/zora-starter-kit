import { Header } from "../Header";
import { useContractRead, useAccount, useContractWrite } from "wagmi";
import { AsksV1_1Interface } from "@zoralabs/v3/dist/typechain/AsksV1_1"
import * as mainnetZoraAddresses from "@zoralabs/v3/dist/addresses/1.json"
import { abi } from "@zoralabs/v3/dist/artifacts/ReserveAuctionFindersEth.sol/ReserveAuctionFindersEth.json"
import { useState, useEffect } from "react";
import { ReadContractResult } from "@wagmi/core";
import { BigNumber, ethers, utils } from "ethers";

export const SetAuctionReservePrice = (nft) => {


    // this file is integrated with the ReserveAuctionFindersEth module
    // so no currency is specified (since it only works for ETH)

    interface setAuctionCall {
        tokenContract: any,
        tokenId: any,
        reservePrice: any,
    }

    const [setAuction, setSetAuction] = useState<setAuctionCall>({
        "tokenContract": nft.nft.nft.contractAddress,
        "tokenId": nft.nft.nft.tokenId,
        "reservePrice": "",
    })

    const auctionContractAddress = nft ? nft.nft.nft.contractAddress : setAuction.tokenContract    
    const auctionTokenId = nft ? nft.nft.nft.tokenId : setAuction.tokenId

    // ReserveAuctionFindersEth createAuction call
    const reservePrice = setAuction.reservePrice ? ethers.utils.parseEther(setAuction.reservePrice) : ""

    const { data: setAuctionData, isError: setAuctionError, isLoading: setAuctionLoading, isSuccess: setAuctionSuccess, write: setAuctionWrite  } = useContractWrite({
        addressOrName: mainnetZoraAddresses.ReserveAuctionFindersEth,
        contractInterface: abi,
        functionName: 'setAuctionReservePrice',
        args: [
            auctionContractAddress,
            auctionTokenId,
            reservePrice,
        ],
        onError(error, variables, context) {
            console.log("error", error)
        },
        onSuccess(setAuctionData, variables, context) {
            console.log("Success!", setAuctionData)
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
                    placeholder="Reserve Price (ETH)"
                    name="setAuctionReservePrice"
                    type="number"
                    value={setAuction.reservePrice}
                    onChange={(e) => {
                        e.preventDefault();
                        setSetAuction(current => {
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
        
            <button 
                type="button"
                onClick={() => setAuctionWrite()}
                className="border-2 border-white border-solid w-full px-2 hover:bg-[#33FF57] hover:text-slate-900"
            >
                UPDATE AUCTION
            </button>
        </div>
    )
}