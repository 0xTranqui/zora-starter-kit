import { Header } from "../Header";
import { useContractRead, useAccount } from "wagmi";
import { AsksV1_1Interface } from "@zoralabs/v3/dist/typechain/AsksV1_1"
import * as mainnetZoraAddresses from "@zoralabs/v3/dist/addresses/1.json"
import { abi } from "@zoralabs/v3/dist/artifacts/AsksV1_1.sol/AsksV1_1.json"
import { useState, useEffect } from "react";
import { ReadContractResult } from "@wagmi/core";
import { BigNumber, utils } from "ethers";

export const AuctionForNFT = (nft) => {

    // AsksV1_1 askForNFT read call
    const { data, isLoading, isSuccess, isFetching  } = useContractRead({
        addressOrName: mainnetZoraAddresses.ReserveAuctionFindersEth,
        contractInterface: abi,
        functionName: 'auctionForNFT',
        args: [
            nft.nft.nft.contractAddress,
            nft.nft.nft.tokenId
        ],
        watch: true,
        onError(error) {
            console.log("error: ", error)
        },
        onSuccess(data) {
            console.log("success! --> ", data)
        }  
    })

    const auctionMaker = data ? data.seller : "0x0000000000000000000000000000000000000000"

    const auctionsCheck = () => {
        if (auctionMaker === "0x0000000000000000000000000000000000000000") {
            return (
            <div>
                No Active Listing for current Address + token id
            </div>
            )
        } else {
            return (
                <div className="flex flex-row flex-wrap w-fit space-y-1">
                    <div className="flex flex-row flex-wrap w-full">                    
                        {"Contract Address: " + nft.nft.nft.contractAddress}
                    </div>                
                    <div className="flex flex-row flex-wrap w-full">                    
                        {"Token Id: " + nft.nft.nft.contractAddress}
                    </div>                
                    <div className="flex flex-row flex-wrap w-full">                    
                        {"Seller: " + data[0]}
                    </div>
                    <div className="flex flex-row flex-wrap w-full">                    
                        {"Reserve Price: " + data[1]}
                    </div>
                    <div className="flex flex-row flex-wrap w-full">                    
                        {"Highest Bid: " + data[3]}
                    </div>
                    <div className="flex flex-row flex-wrap w-full">                    
                        {"Highest Bidder: " + data[4]}
                    </div>
                    <div className="flex flex-row flex-wrap w-full">                    
                        {"Auction Duration: " + data[5]}
                    </div>
                </div>
            )
        }
    }
    
    return (
        <div className=" text-white text-sm h-full flex flex-col flex-wrap items-center justify-center">
            <main className=" w-full flex flex-row flex-wrap">        
                {auctionsCheck()}
            </main>
        </div>
    )
}