import { Header } from "./Header";
import { useContractRead, useAccount, useContractWrite } from "wagmi";
import { AsksV1_1Interface } from "@zoralabs/v3/dist/typechain/AsksV1_1"
import * as asksAddresses from "@zoralabs/v3/dist/addresses/1.json"
import { abi } from "@zoralabs/v3/dist/artifacts/AsksV1_1.sol/AsksV1_1.json"
import { useState, useEffect } from "react";
import { ReadContractResult } from "@wagmi/core";
import { BigNumber, utils } from "ethers";

export const CancelAsk = (nft, call) => {

    interface cancelAskCall {
        tokenContract: any,
        tokenId: any,
    }

    const [cancelAsk, setCancelAsk] = useState<cancelAskCall>({
        "tokenContract": nft.nft.nft.contractAddress,
        "tokenId": nft.nft.nft.tokenId,
    })

    // checking prop
    // console.log("what is write nft", nft)
    // console.log("what is the nft.call", nft.call)
    
    // get account hook
    const { address, connector, isConnecting, isConnected, status} = useAccount(); 
    const currentUserAddress = address ? address : ""


    // AsksV1_1 askForNFT read call

    const { data, isLoading, isSuccess, isFetching  } = useContractRead({
        addressOrName: asksAddresses.AsksV1_1,
        contractInterface: abi,
        functionName: 'askForNFT',
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

    const currentReadData = data ? data : ""
    const currentReadPrice = data ? `${utils.formatEther(BigNumber.from(currentReadData[4]).toString())}` + " ETH" : "undefined"
    const currentFindersFee = data ? `${currentReadData[3] / 100 }` + " %" : "undefined"


    // AsksV1_1 cancelAsk Write
    const { data: cancelData, isError: cancelAskError, isLoading: cancelAskLoading, isSuccess: cancelAskSuccess, write: cancelAskWrite  } = useContractWrite({
        addressOrName: asksAddresses.AsksV1_1,
        contractInterface: abi,
        functionName: 'cancelAsk',
        args: [
            cancelAsk.tokenContract,
            cancelAsk.tokenId,
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

    const listingCheck = (sellerAddress) => {
        console.log("selleraddress: ", sellerAddress)
        if (sellerAddress === "0x0000000000000000000000000000000000000000") {
            return (
                <div>
                No Active Listing for current address + token Id
                </div>
            )
        } else {
            return (
                <div className="flex flex-row flex-wrap w-fit space-y-1">
                    <div className="flex flex-row flex-wrap w-full">                    
                        {"Contract Address: " + nft.nft.nft.contractAddress}
                    </div>                
                    <div className="flex flex-row flex-wrap w-full">                    
                        {"Token Id: " + nft.nft.nft.tokenId}
                    </div>                
                    <div className="flex flex-row flex-wrap w-full">                    
                        {"Seller: " + currentReadData[0]}
                    </div>
                    <div className="flex flex-row flex-wrap w-full">                    
                        {"Funds Recipient: " + currentReadData[1]}
                    </div>
                    <div className="flex flex-row flex-wrap w-full">                    
                        {"Currency: " + currentReadData[2]}
                    </div>
                    <div className="flex flex-row flex-wrap w-full">                    
                        {"Finders Fee: " + currentFindersFee}
                    </div>
                    <div className="flex flex-row flex-wrap w-full">                    
                        {"Price: " + currentReadPrice}
                    </div>
                </div>
            )
        }
    }

    const callCheck = (functionCall) => {
        if (functionCall === "cancel" ) {
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
                    <div className="flex flex-row w-full">
                        <input
                            className="flex flex-row flex-wrap w-full text-black text-center bg-slate-200"
                            placeholder="PLACEHOLDER FOR SPACING"                       
                        >
                        </input>
                    </div>                                                                        
                    <button 
                        type="button"
                        onClick={() => cancelAskWrite()}
                        className="border-2 border-white border-solid flex flex-row justify-center w-full px-2 hover:bg-white hover:text-slate-900"
                    >
                        CANCEL ASK
                    </button>

                </div>
            )
        }
    }
    
    return (
        <div className=" text-white text-sm h-full flex flex-col flex-wrap items-center justify-center">
            <main className=" w-full flex flex-row flex-wrap ">        
                <div className=" flex flex-row flex-wrap">
                    {callCheck(nft.call)}
                </div>
            </main>
        </div>
    )
}