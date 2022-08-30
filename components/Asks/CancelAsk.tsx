import { useContractWrite } from "wagmi";
import * as asksAddresses from "@zoralabs/v3/dist/addresses/1.json"
import { abi } from "@zoralabs/v3/dist/artifacts/AsksV1_1.sol/AsksV1_1.json"
import { useState } from "react";

export const CancelAsk = (nft) => {

    interface cancelAskCall {
        tokenContract: any,
        tokenId: any
    }

    const [cancelAsk, setCancelAsk] = useState<cancelAskCall>({
        "tokenContract": nft.nft.nft.contractAddress,
        "tokenId": nft.nft.nft.tokenId,
    })
    
    const askTokenId = nft ? nft.nft.nft.tokenId : cancelAsk.tokenId
    const askContractAddress = nft ? nft.nft.nft.contractAddress : cancelAsk.tokenContract

    // AsksV1_1 cancelAsk Write
    const { data: cancelData, isError: cancelAskError, isLoading: cancelAskLoading, isSuccess: cancelAskSuccess, write: cancelAskWrite  } = useContractWrite({
        addressOrName: asksAddresses.AsksV1_1,
        contractInterface: abi,
        functionName: 'cancelAsk',
        args: [
            askContractAddress,
            askTokenId
        ],
        onError(error, variables, context) {
            console.log("error", error)
        },
        onSuccess(cancelData, variables, context) {
            console.log("Success!", cancelData)
        },
    })    

    const shortenedAddress = (address) => {
        let displayAddress = address?.substr(0,4) + "..." + address?.substr(-4)
        return displayAddress
    }
    
    return (
        <div className=" flex flex-row flex-wrap w-fit space-y-1">
            <div className="flex flex-row flex-wrap w-full justify-center">
                <div>
                    {"Contract Address: " + shortenedAddress(nft.nft.nft.contractAddress)}
                </div>                    
                <div className="ml-5 flex flex-row flex-wrap ">                    
                    {"Token Id: " + nft.nft.nft.tokenId}
                </div>                                       
            </div>                                                                     
            <button 
                type="button"
                onClick={() => cancelAskWrite()}
                className="border-2 border-white border-solid flex flex-row justify-center w-full px-2 hover:text-slate-900 hover:bg-[#33FF57]"
            >
                CANCEL ASK
            </button>
        </div>
    )
}