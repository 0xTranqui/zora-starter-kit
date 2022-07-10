const UserNFTs = ({ nfts }) => {

    return (
        <>
            <div className="flex flex-row flex-wrap  justify-center text-center w-full ">
                <div className="text-white text-4xl pb-10">
                    My NFTs
                </div>
                <div className="flex flex-row flex-wrap  justify-center w-full">
                    <div className="border-2 border-solid border-red-500 text-white w-2/12">
                        Address
                    </div>                
                    <div className="border-2 border-solid border-red-500 text-white w-2/12">
                        My Balance
                    </div>
                    <div className="border-2 border-solid border-red-500 text-white w-5/12">
                        Name
                    </div>
                </div>

            </div>

            {
                nfts && nfts.length > 0
                ?
                nfts.map((nft, index) => {
                    while (index < nfts.length && index < 10 ) {
                        return (
                            <div key={nft.collectionAddress} className="text-center text-white w-full flex flex-row flex-wrap justify-center">
                                <a
                                href={`https://etherscan.io/address/${nft.collectionAddress}`}
                                className="border-2 border-solid border-red-500 w-2/12 underline hover:text-green-300"
                                >
                                    {"" + (nft.collectionAddress.substring(0, 4)) + "..." + (nft.collectionAddress.substring(nft.collectionAddress.length - 4))}
                                </a>
                                <div className="border-2 border-solid border-red-500 w-2/12 ">
                                    {"" + nft.count}    
                                </div>                                             
                                <div className="border-2 border-solid border-red-500 w-5/12">
                                    {"" + nft.name}    
                                </div>                     
                            </div>
                        )
                    }
                }
                ) : (
                <div className="text-center text-white w-full flex flex-row flex-wrap justify-center">
                    <div className="border-2 border-solid border-red-500 w-2/12 ">
                        n/a
                    </div>        
                    <div className="border-2 border-solid border-red-500 w-2/12 ">
                        0  
                    </div>                                             
                    <div className="border-2 border-solid border-red-500 w-5/12">
                        n/a
                    </div>                     
                </div>
                )
            }

            <div className="border-2 border-solid border-blue-500 mt-10 flex flex-row flex-wrap  justify-center text-center w-full ">
                
                <div className="text-white text-4xl pb-10">
                    Collection Lookup
                </div>
                <div className="flex flex-col flex-wrap content-center w-full">
                    <div className="border-2 border-solid border-red-500 text-white w-3/12">
                        Address
                    </div>                
                    <div className="border-2 border-solid border-red-500 text-white w-3/12">
                        Name
                    </div>
                    <div className="border-2 border-solid border-red-500 text-white w-3/12">
                        Current Supply
                    </div>
                    <div className="border-2 border-solid border-red-500 text-white w-3/12">
                        Owner Count
                    </div>
                    <div className="border-2 border-solid border-red-500 text-white w-3/12">
                        Sales Volume (ETH)
                    </div>
                </div>
            </div>

        </>
    )

}

export default UserNFTs

// query MyQuery {
//     collections(where: {collectionAddresses: "0x8427e46826a520b1264B55f31fCB5DDFDc31E349"}) {
//       nodes {
//         name
//         address
//       }
//     }
//     aggregateStat {
//       ownerCount(where: {collectionAddresses: "0x8427e46826a520b1264B55f31fCB5DDFDc31E349"})
//       nftCount(where: {collectionAddresses: "0x8427e46826a520b1264B55f31fCB5DDFDc31E349"})
//       salesVolume(where: {collectionAddresses: "0x8427e46826a520b1264B55f31fCB5DDFDc31E349"}) {
//         chainTokenPrice
//       }
//     }