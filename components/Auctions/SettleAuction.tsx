import { Header } from "../Header";
import { useContractRead, useAccount, useContractWrite } from "wagmi";
import { AsksV1_1Interface } from "@zoralabs/v3/dist/typechain/AsksV1_1"
import * as mainnetZoraAddresses from "@zoralabs/v3/dist/addresses/1.json"
import { abi } from "@zoralabs/v3/dist/artifacts/ReserveAuctionFindersEth.sol/ReserveAuctionFindersEth.json"
import { useState, useEffect } from "react";
import { ReadContractResult } from "@wagmi/core";
import { BigNumber, ethers, utils } from "ethers";

export const SettleAuction = (nft) => {

    interface settleAuctionCall {
        tokenContract: any,
        tokenId: any,
    }

    const [settleAuction, setSettleAuction] = useState<settleAuctionCall>({
        "tokenContract": nft.nft.nft.contractAddress,
        "tokenId": nft.nft.nft.tokenId,
    })

    const auctionContractAddress = nft ? nft.nft.nft.contractAddress : settleAuction.tokenContract    
    const auctionTokenId = nft ? nft.nft.nft.tokenId : settleAuction.tokenId
    
    const { data: settleAuctionData, isError: settleAuctionError, isLoading: settleAuctionLoading, isSuccess: settleAuctionSuccess, write: settleAuctionWrite  } = useContractWrite({
        addressOrName: mainnetZoraAddresses.ReserveAuctionCoreEth,
        contractInterface: abi,
        functionName: 'settleAuction',
        args: [
            auctionContractAddress,
            auctionTokenId,
        ],
        onError(error, variables, context) {
            console.log("error", error)
        },
        onSuccess(settleAuctionData, variables, context) {
            console.log("Success!", settleAuctionData)
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
        
            <button 
                type="button"
                onClick={() => settleAuctionWrite()}
                className="border-2 border-white border-solid flex flex-row justify-center w-full px-2 hover:text-slate-900 hover:bg-[#33FF57]"
            >
                SETTLE AUCTION
            </button>
        </div>
    )
}