import { Header } from "../Header";
import { useContractRead, useAccount, useContractWrite } from "wagmi";
import { AsksV1_1Interface } from "@zoralabs/v3/dist/typechain/AsksV1_1"
import * as asksAddresses from "@zoralabs/v3/dist/addresses/1.json"
import { abi } from "@zoralabs/v3/dist/artifacts/AsksV1_1.sol/AsksV1_1.json"
import { useState, useEffect } from "react";
import { ReadContractResult } from "@wagmi/core";
import { BigNumber, utils } from "ethers";

export const SetAskPrice = (nft) => {

    interface updateAskCall {
        tokenContract: any,
        tokenId: any,
        askPrice: any, 
        askCurrency: any,
    }

    const [updateAsk, setUpdateAsk] = useState<updateAskCall>({
        "tokenContract": nft.nft.nft.contractAddress,
        "tokenId": nft.nft.nft.tokenId,
        "askPrice": "",
        "askCurrency": "0x0000000000000000000000000000000000000000"
    })

    // AsksV1_1 setAskPrice call
    const listingPrice = updateAsk.askPrice ? utils.parseEther(updateAsk.askPrice) : ""

    const { data: setAskData, isError: setAskError, isLoading: setAskLoading, isSuccess: setAskSuccess, write: setAskWrite  } = useContractWrite({
        addressOrName: asksAddresses.AsksV1_1,
        contractInterface: abi,
        functionName: 'setAskPrice',
        args: [
            updateAsk.tokenContract,
            updateAsk.tokenId,
            listingPrice,
            updateAsk.askCurrency
        ],
        onError(error, variables, context) {
            console.log("error", error)
        },
        onSuccess(setAskData, variables, context) {
            console.log("Success!", setAskData)
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
                    className="flex flex-row flex-wrap w-full text-black text-center bg-slate-200"
                    placeholder="Listing Price - ETH"
                    name="createAskListingPrice"
                    type="number"
                    value={updateAsk.askPrice}
                    onChange={(e) => {
                        e.preventDefault();
                        setUpdateAsk(current => {
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
                    value={updateAsk.askCurrency}
                    onChange={(e) => {
                        e.preventDefault();
                        setUpdateAsk(current => {
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
            
            <button 
                type="button"
                onClick={() => setAskWrite()}
                className="border-2 border-white border-solid px-2 w-full hover:bg-white hover:text-slate-900"
            >
                UPDATE ASK
            </button>

        </div>
    )
}