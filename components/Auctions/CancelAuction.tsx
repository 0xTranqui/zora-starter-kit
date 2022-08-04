import { useContractWrite } from "wagmi";
import * as mainnetZoraAddresses from "@zoralabs/v3/dist/addresses/1.json"
import { abi } from "@zoralabs/v3/dist/artifacts/ReserveAuctionFindersEth.sol/ReserveAuctionFindersEth.json"
import { useState } from "react";

export const CancelAuction = (nft) => {

    interface cancelAuctionCall {
        tokenContract: any,
        tokenId: any,
    }

    const [cancelAuction, setCancelAuction] = useState<cancelAuctionCall>({
        "tokenContract": nft.nft.nft.contractAddress,
        "tokenId": nft.nft.nft.tokenId,
    })

    const auctionContractAddress = nft ? nft.nft.nft.contractAddress : cancelAuction.tokenContract    
    const auctionTokenId = nft ? nft.nft.nft.tokenId : cancelAuction.tokenId

    const { data: cancelAuctionData, isError: cancelAuctionError, isLoading: cancelAuctionLoading, isSuccess: cancelAuctionSuccess, write: cancelAuctionWrite  } = useContractWrite({
        addressOrName: mainnetZoraAddresses.ReserveAuctionFindersEth,
        contractInterface: abi,
        functionName: 'cancelAuction',
        args: [
            auctionContractAddress,
            auctionTokenId,
        ],
        onError(error, variables, context) {
            console.log("error", error)
        },
        onSuccess(cancelAuctionData, variables, context) {
            console.log("Success!", cancelAuctionData)
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
                onClick={() => cancelAuctionWrite()}
                className="border-2 border-white border-solid flex flex-row justify-center w-full px-2 hover:text-slate-900 hover:bg-[#33FF57]"
            >
                CANCEL AUCTION
            </button>
        </div>
    )
}