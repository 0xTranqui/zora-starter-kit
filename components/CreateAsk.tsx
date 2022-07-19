import { Header } from "./Header";
import { useContractRead, useAccount, useContractWrite } from "wagmi";
import { AsksV1_1Interface } from "@zoralabs/v3/dist/typechain/AsksV1_1"
import * as asksAddresses from "@zoralabs/v3/dist/addresses/1.json"
import { abi } from "@zoralabs/v3/dist/artifacts/AsksV1_1.sol/AsksV1_1.json"
import { useState, useEffect } from "react";
import { ReadContractResult } from "@wagmi/core";
import { BigNumber, utils } from "ethers";

export const CreateAsk = (nft, call) => {

    interface createAskCall {
        tokenContract: any,
        tokenId: any,
        askPrice: any, 
        askCurrency: any,
        sellerFundsRecipient: any,
        findersFeeBps: any
    }

    interface updateAskCall {
        tokenContract: any,
        tokenId: any,
        askPrice: any, 
        askCurrency: any,
    }

    interface cancelAskCall {
        tokenContract: any,
        tokenId: any,
    }

    interface fillAskCall {
        tokenContract: any,
        tokenId: any,
        fillCurrency: any,
        fillAmount: any,
        finder: any
    }
    
    const [createAsk, setCreateAsk] = useState<createAskCall>({
        "tokenContract": nft.nft.nft.contractAddress,
        "tokenId": nft.nft.nft.tokenId,
        "askPrice": "",
        "askCurrency": "",
        "sellerFundsRecipient": "",
        "findersFeeBps": ""
    })

    const [updateAsk, setUpdateAsk] = useState<updateAskCall>({
        "tokenContract": "",
        "tokenId": "",
        "askPrice": "",
        "askCurrency": ""
    })

    const [cancelAsk, setCancelAsk] = useState<cancelAskCall>({
        "tokenContract": "",
        "tokenId": ""
    })

    const [fillAsk, setFillAsk] = useState<fillAskCall>({
        "tokenContract": "",
        "tokenId": "",
        "fillCurrency": "",
        "fillAmount": "",
        "finder": "",
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

    // AsksV1_1 createAsk Write
    const { data: createAskData, isError: createAskError, isLoading: createAskLoading, isSuccess: createAskSuccess, write: createAskWrite  } = useContractWrite({
        addressOrName: asksAddresses.AsksV1_1,
        contractInterface: abi,
        functionName: 'createAsk',
        args: [
            createAsk.tokenContract,
            createAsk.tokenId,
            createAsk.askPrice,
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

    // AsksV1_1 setAskPrice Write
    const { data: setAskData, isError: setAskError, isLoading: setAskLoading, isSuccess: setAskSuccess, write: setAskWrite  } = useContractWrite({
        addressOrName: asksAddresses.AsksV1_1,
        contractInterface: abi,
        functionName: 'setAskPrice',
        args: [
            createAsk.tokenContract,
            createAsk.tokenId,
            createAsk.askPrice,
            createAsk.askCurrency
        ],
        onError(error, variables, context) {
            console.log("error", error)
        },
        onSuccess(createAskData, variables, context) {
            console.log("Success!", setAskData)
        },
    })    

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
        if (functionCall === "create" ) {
            return (
                <div className="flex flex-row flex-wrap w-fit space-y-1">
                    <div className="flex flex-row flex-wrap w-full">                    
                        {"Contract Address: " + nft.nft.nft.contractAddress}
                    </div>                
                    <div className="flex flex-row flex-wrap w-full">                    
                        {"Token Id: " + nft.nft.nft.tokenId}
                    </div>               
                    
                    <div className="flex flex-row w-full">
                        <input
                            className="flex flex-row flex-wrap w-fit ml-5 text-black text-center bg-slate-200"
                            placeholder="Listing Price"
                            name="createAskListingPrice"
                            type="text"
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
                            className="flex flex-row flex-wrap w-fit ml-5 text-black text-center bg-slate-200"
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
                            className="flex flex-row flex-wrap w-fit ml-5 text-black text-center bg-slate-200"
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
                            className="flex flex-row flex-wrap w-fit ml-5 text-black text-center bg-slate-200"
                            placeholder="Finders Fee Bps"
                            name="createAskFindersFeeBps"
                            type="text"
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
                        className="border-2 border-white border-solid px-2 hover:bg-white hover:text-slate-900"
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
                <div className="w-6/12">
                    {JSON.stringify(createAsk)}
                </div>    
            </main>
        </div>
    )
}