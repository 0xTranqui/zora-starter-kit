import { Header } from "../Header";
import { useContractRead, useAccount, useContractWrite } from "wagmi";
import { AsksV1_1Interface } from "@zoralabs/v3/dist/typechain/AsksV1_1"
import * as mainnetZoraAddresses from "@zoralabs/v3/dist/addresses/1.json"
import { abi } from "@zoralabs/v3/dist/artifacts/OffersV1.sol/OffersV1.json"
import { useState, useEffect } from "react";
import { ReadContractResult } from "@wagmi/core";
import { BigNumber, ethers, utils } from "ethers";

export const CancelOffer = (nft) => {

    interface cancelOfferCall {
        tokenContract: any,
        tokenId: any,
        offerId: any, 
    }
    
    const [cancelOffer, setCancelOffer] = useState<cancelOfferCall>({
        "tokenContract": nft.nft.nft.contractAddress,
        "tokenId": nft.nft.nft.tokenId,
        "offerId": "",
    })

    const offerTokenId = nft ? nft.nft.nft.tokenId : cancelOffer.tokenId
    const offerContractAddress = nft ? nft.nft.nft.contractAddress : cancelOffer.tokenContract

    // OffersV1 camcelOffer call

    const { data: cancelOfferData, isError: cancelOfferError, isLoading: cancelOfferLoading, isSuccess: cancelOfferSuccess, write: cancelOfferWrite  } = useContractWrite({
        addressOrName: mainnetZoraAddresses.OffersV1,
        contractInterface: abi,
        functionName: 'cancelOffer',
        args: [
            offerContractAddress,
            offerTokenId,
            cancelOffer.offerId,
        ],
        onError(error, variables, context) {
            console.log("error", error)
        },
        onSuccess(cancelOfferData, variables, context) {
            console.log("Success!", cancelOfferData)
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
                    name="cancelOfferId"
                    type="number"
                    value={cancelOffer.offerId}
                    onChange={(e) => {
                        e.preventDefault();
                        setCancelOffer(current => {
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
            <button 
                type="button"
                onClick={() => cancelOfferWrite()}
                className="border-2 border-white border-solid w-full px-2 hover:bg-[#33FF57] hover:text-slate-900"
            >
                CANCEL OFFER
            </button>
        </div>
    )
}