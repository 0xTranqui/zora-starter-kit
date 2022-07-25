import { Header } from "../Header";
import { useContractRead, useAccount, useContractWrite } from "wagmi";
import { AsksV1_1Interface } from "@zoralabs/v3/dist/typechain/AsksV1_1"
import * as mainnetZoraAddresses from "@zoralabs/v3/dist/addresses/1.json"
import { abi } from "@zoralabs/v3/dist/artifacts/OffersV1.sol/OffersV1.json"
import { useState, useEffect } from "react";
import { ReadContractResult } from "@wagmi/core";
import { BigNumber, ethers, utils } from "ethers";

export const SetOfferAmount = (nft) => {

    interface setOfferCall {
        tokenContract: any,
        tokenId: any,
        offerId: any,
        currency: any, 
        amount: any,
    }
    
    const [setOffer, setSetOffer] = useState<setOfferCall>({
        "tokenContract": nft.nft.nft.contractAddress,
        "tokenId": nft.nft.nft.tokenId,
        "offerId": "",
        "currency": "0x0000000000000000000000000000000000000000",
        "amount": ""
    })

    const offerTokenId = nft ? nft.nft.nft.tokenId : setOffer.tokenId
    const offerContractAddress = nft ? nft.nft.nft.contractAddress : setOffer.tokenContract

    // OffersV1 setOfferAmount call
    const offerPrice = setOffer.amount ? ethers.utils.parseEther(setOffer.amount) : ""

    const { data: setOfferData, isError: setOfferError, isLoading: setOfferLoading, isSuccess: setOfferSuccess, write: setOfferWrite  } = useContractWrite({
        addressOrName: mainnetZoraAddresses.OffersV1,
        contractInterface: abi,
        functionName: 'setOfferAmount',
        args: [
            offerContractAddress,
            offerTokenId,
            setOffer.offerId,
            setOffer.currency,
            offerPrice,
        ],
        overrides: {
            value: offerPrice
        },
        onError(error, variables, context) {
            console.log("error", error)
        },
        onSuccess(setOfferData, variables, context) {
            console.log("Success!", setOfferData)
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
                    placeholder="Offer Id"
                    name="setOfferId"
                    type="number"
                    value={setOffer.offerId}
                    onChange={(e) => {
                        e.preventDefault();
                        setSetOffer(current => {
                            return {
                            ...current,
                            offerId: e.target.value
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
                    placeholder="Offer Currency"
                    name="setOfferCurrency"
                    type="text"
                    value={setOffer.currency}
                    onChange={(e) => {
                        e.preventDefault();
                        setSetOffer(current => {
                            return {
                            ...current,
                            currency: e.target.value
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
                    placeholder="Offer Price (ETH)"
                    name="createOfferPrice"
                    type="number"
                    value={setOffer.amount}
                    onChange={(e) => {
                        e.preventDefault();
                        setSetOffer(current => {
                            return {
                            ...current,
                            amount: e.target.value
                            }
                        })
                    }}
                    required                              
                >
                </input>
            </div>            

            <button 
                type="button"
                onClick={() => setOfferWrite()}
                className="border-2 border-white border-solid w-full px-2 hover:bg-[#33FF57] hover:text-slate-900"
            >
                UPDATE OFFER
            </button>
        </div>
    )
}