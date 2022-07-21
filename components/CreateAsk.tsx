import { Header } from "./Header";
import { useContractRead, useAccount, useContractWrite } from "wagmi";
import { AsksV1_1Interface } from "@zoralabs/v3/dist/typechain/AsksV1_1"
import * as asksAddresses from "@zoralabs/v3/dist/addresses/1.json"
import { abi } from "@zoralabs/v3/dist/artifacts/AsksV1_1.sol/AsksV1_1.json"
import { useState, useEffect } from "react";
import { ReadContractResult } from "@wagmi/core";
import { BigNumber, ethers, utils } from "ethers";

export const CreateAsk = (nft, call) => {

    interface createAskCall {
        tokenContract: any,
        tokenId: any,
        askPrice: any, 
        askCurrency: any,
        sellerFundsRecipient: any,
        findersFeeBps: any
    }
    
    const [createAsk, setCreateAsk] = useState<createAskCall>({
        "tokenContract": nft.nft.nft.contractAddress,
        "tokenId": nft.nft.nft.tokenId,
        "askPrice": "",
        "askCurrency": "0x0000000000000000000000000000000000000000",
        "sellerFundsRecipient": "",
        "findersFeeBps": ""
    })

    // checking prop
    // console.log("what is write nft", nft)

    // console.log("what is the nft.call", nft.call)
    
    // get account hook
    const { address, connector, isConnecting, isConnected, status} = useAccount(); 
    const currentUserAddress = address ? address : ""


    // AsksV1_1 createAsk Write
    const listingPrice = createAsk.askPrice ? ethers.utils.parseEther(createAsk.askPrice) : ""

    const { data: createAskData, isError: createAskError, isLoading: createAskLoading, isSuccess: createAskSuccess, write: createAskWrite  } = useContractWrite({
        addressOrName: asksAddresses.AsksV1_1,
        contractInterface: abi,
        functionName: 'createAsk',
        args: [
            createAsk.tokenContract,
            createAsk.tokenId,
            listingPrice,
            createAsk.askCurrency,
            createAsk.sellerFundsRecipient,
            createAsk.findersFeeBps
        ],
        onError(error, variables, context) {
            console.log("error", error)
        },
        onSuccess(createAskData, variables, context) {
            console.log("Success!", createAskData)
        },
    })

    const shortenedAddress = (address) => {
        let displayAddress = address?.substr(0,4) + "..." + address?.substr(-4)
        return displayAddress
    }

    const callCheck = (functionCall) => {
        if (functionCall === "create" ) {
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
                            className="flex flex-row flex-wrap w-full text-black text-center bg-slate-200"
                            placeholder="Listing Price - ETH"
                            name="createAskListingPrice"
                            type="number"
                            value={createAsk.askPrice}
                            onChange={(e) => {
                                e.preventDefault();
                                setCreateAsk(current => {
                                    return {
                                    ...current,
                                    askPrice: e.target.value
                                    }
                                })
                            }}
                            required                              
                        >
                        </input>
                    </div>                     
                    
                    <div className="flex flex-row w-full">                
                        <input
                            className="flex flex-row flex-wrap w-full text-black text-center bg-slate-200"
                            placeholder="Listing Currency"
                            name="createAskListingCurrency"
                            type="text"
                            value={createAsk.askCurrency}
                            onChange={(e) => {
                                e.preventDefault();
                                setCreateAsk(current => {
                                    return {
                                    ...current,
                                    askCurrency: e.target.value
                                    }
                                })
                            }}
                            required                              
                        >
                        </input>
                    </div>
                    
                    <div className="flex flex-row w-full">                          
                        <input
                            className="flex flex-row flex-wrap w-full text-black text-center bg-slate-200"
                            placeholder="Sale Funds Recipient"
                            name="createAskSaleFundsRecipient"
                            type="text"
                            value={createAsk.sellerFundsRecipient}
                            onChange={(e) => {
                                e.preventDefault();
                                setCreateAsk(current => {
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
                            className="flex flex-row flex-wrap w-full text-black text-center bg-slate-200"
                            placeholder="Finders Fee Bps"
                            name="createAskFindersFeeBps"
                            type="number"
                            value={createAsk.findersFeeBps}
                            onChange={(e) => {
                                e.preventDefault();
                                setCreateAsk(current => {
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
                        onClick={() => createAskWrite()}
                        className="border-2 border-white border-solid w-full px-2 hover:bg-white hover:text-slate-900"
                    >
                        CREATE ASK
                    </button>

                </div>
            )
        }
    }

    
    return (
        <div className=" text-white text-sm h-full flex flex-col flex-wrap items-center justify-center">
            <main className=" w-full flex flex-row flex-wrap">        
                <div>
                    {callCheck(nft.call)}
                </div>  
            </main>
        </div>
    )
}