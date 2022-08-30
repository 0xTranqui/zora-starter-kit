import { useContractWrite } from "wagmi";
import * as mainnetZoraAddresses from "@zoralabs/v3/dist/addresses/1.json"
import { abi } from "@zoralabs/v3/dist/artifacts/OffersV1.sol/OffersV1.json"
import { useState } from "react";
import { ethers } from "ethers";

export const SetOfferAmount = (nft) => {

    interface setOfferCall {
        tokenContract: any,
        tokenId: any,
        offerId: any,
        currency: any, 
        amount: any,
    }

    const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";   //To check if offer currency is ETH
    
    const [setOffer, setSetOffer] = useState<setOfferCall>({
        "tokenContract": nft.nft.nft.contractAddress,
        "tokenId": nft.nft.nft.tokenId,
        "offerId": "0",
        "currency": "0x0000000000000000000000000000000000000000",
        "amount": ""
    })

    const offerTokenId = nft ? nft.nft.nft.tokenId : setOffer.tokenId
    const offerContractAddress = nft ? nft.nft.nft.contractAddress : setOffer.tokenContract

    // OffersV1 offers read call
    const { data: offersData, isLoading: offersLoading, isSuccess: offersSuccess, isFetching: offersFetching } = useContractRead({
        addressOrName: mainnetZoraAddresses.OffersV1,
        contractInterface: abi,
        functionName: 'offers',
        args: [
            nft.nft.nft.contractAddress,
            nft.nft.nft.tokenId,
            setOffer.offerId
        ],
        watch: true,
        onError(error) {
            console.log("error: ", error)
        },
        onSuccess(data) {
            console.log("success! --> ", offersData)
            console.log("specific offer info", offersData)
        }
    })

    const currentReadData = offersData ? offersData : ""
    let existingOffer, ethValueToSend;
    if (currentReadData[1] === ZERO_ADDRESS) {      //Need to compute ETH value sent only if currency is ETH
        existingOffer = ethers.utils.formatEther(BigNumber.from(currentReadData[3]).toNumber())
        console.log(`Existing offer: ${existingOffer}`)
        console.log(`Update offer amount: ${setOffer.amount}`)
        const differenceToBePaid = setOffer.amount - existingOffer
        console.log(`Difference to be paid ${differenceToBePaid}`)
        ethValueToSend = setOffer.amount ? ethers.utils.parseEther((differenceToBePaid < 0? 0: differenceToBePaid).toString()) : ""
    } else {
        ethValueToSend = setOffer.amount ? ethers.utils.parseEther("0") : ""
    }

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
            value: ethValueToSend
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