import { Header } from "../Header";
import { useContractRead, useAccount } from "wagmi";
import * as mainnetZoraAddresses from "@zoralabs/v3/dist/addresses/1.json"
import { abi } from "@zoralabs/v3/dist/artifacts/OffersV1.sol/OffersV1.json"
import { useState, useEffect } from "react";
import { ReadContractResult } from "@wagmi/core";
import { BigNumber, utils } from "ethers";

export const GetExistingOffers = (nft) => {

    const [offerId, setOfferId] = useState("0")

    // OffersV1 offerForNFT read call
    const { data, isLoading, isSuccess, isFetching  } = useContractRead({
        addressOrName: "0x76744367AE5A056381868f716BDF0B13ae1aEaa3", //mainnetZoraAddresses.OffersV1,
        contractInterface: abi,
        functionName: 'offersForNFT',
        args: [
            nft.nft.nft.contractAddress,
            nft.nft.nft.tokenId,
            0 //hardcoded always looking for first offer
        ],
        watch: true,
        onError(error) {
            console.log("error: ", error)
        },
        onSuccess(data) {
            console.log("success! --> ", data)
            console.log("data converted", BigNumber.from(data).toString())
            setOfferId(BigNumber.from(data).toString())
        }  
    })

    // OffersV1 offers read call
    const { data: offersData, isLoading: offersLoading, isSuccess: offersSuccess, isFetching: offersFetching  } = useContractRead({
        addressOrName: "0x76744367AE5A056381868f716BDF0B13ae1aEaa3", //mainnetZoraAddresses.OffersV1,
        contractInterface: abi,
        functionName: 'offers',
        args: [
            nft.nft.nft.contractAddress,
            nft.nft.nft.tokenId,
            offerId
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

    const offerMaker = offersData ? offersData.maker : "0x0000000000000000000000000000000000000000"

    // const test = () => {
    //     if (data === undefined) {
    //         console.log("this shit was undefined")
    //     } else {
    //         console.log("this shit was not undefined")
    //     }
    // }

    // useEffect(() => {
    //     test(),
    //     [data]
    // })

    const offersCheck = () => {
        if (offerMaker === "0x0000000000000000000000000000000000000000") {
            return (
            <div>
                No Active Listing for current Address + token id
            </div>
            )
        } else {
            return (
                <div className="flex flex-row flex-wrap w-fit space-y-1">
                    <div className="flex flex-row flex-wrap w-full">                    
                        {"Contract Address: " + nft.nft.nft.contractAddress}
                    </div>                
                    <div className="flex flex-row flex-wrap w-full">                    
                        {"Token Id: " + offersData[0]}
                    </div>                
                    <div className="flex flex-row flex-wrap w-full">                    
                        {"Seller: " + offersData[1]}
                    </div>
                    <div className="flex flex-row flex-wrap w-full">                    
                        {"Funds Recipient: " + offersData[2]}
                    </div>
                    <div className="flex flex-row flex-wrap w-full">                    
                        {"Currency: " + offersData[3]}
                    </div>
                </div>
            )
        }
    }

    const currentReadData = data ? data : ""
    // const currentReadPrice = data ? `${utils.formatEther(BigNumber.from(currentReadData[4]).toString())}` + " ETH" : "undefined"
    // const currentFindersFee = data ? `${currentReadData[3] / 100 }` + " %" : "undefined"

    // const listingCheck = (sellerAddress) => {
    //     if (sellerAddress === "0x0000000000000000000000000000000000000000") {
    //         return (
    //             <div className="flex flex-row content-center ">
    //             No Active Listing for current address + token Id
    //             </div>
    //         )
    //     } else {
    //         return (
    //             <div className="flex flex-row flex-wrap w-fit space-y-1">
    //                 <div className="flex flex-row flex-wrap w-full">                    
    //                     {"Contract Address: " + nft.nft.nft.contractAddress}
    //                 </div>                
    //                 <div className="flex flex-row flex-wrap w-full">                    
    //                     {"Token Id: " + nft.nft.nft.tokenId}
    //                 </div>                
    //                 <div className="flex flex-row flex-wrap w-full">                    
    //                     {"Seller: " + currentReadData[0]}
    //                 </div>
    //                 <div className="flex flex-row flex-wrap w-full">                    
    //                     {"Funds Recipient: " + currentReadData[1]}
    //                 </div>
    //                 <div className="flex flex-row flex-wrap w-full">                    
    //                     {"Currency: " + currentReadData[2]}
    //                 </div>
    //                 <div className="flex flex-row flex-wrap w-full">                    
    //                     {"Finders Fee: " + currentFindersFee}
    //                 </div>
    //                 <div className="flex flex-row flex-wrap w-full">                    
    //                     {"Price: " + currentReadPrice}
    //                 </div>
    //             </div>
    //         )
    //     }
    // }
    
    return (
        <div className=" text-white text-sm h-full flex flex-col flex-wrap items-center justify-center">
            <main className=" w-full flex flex-row flex-wrap"> 
                {offersCheck()}
            </main>
        </div>
    )
}