const UserNFTs = ({ nfts }) => {

    return (
        <>
            <div className="flex flex-row flex-wrap  justify-center text-center w-full ">
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

            {
                nfts && nfts.length > 0
                ?
                nfts.map((nft, index) => {
                    while (index < nfts.length && index < 10 ) {
                        return (
                            <div key={nft.collectionAddress} className="text-center text-white w-full flex flex-row flex-wrap justify-center">
                                <a
                                href={`https://etherscan.io/address/${nft}`}
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
                    <div className="text-white">
                    </div>
                )
            }
        </>
    )

}

export default UserNFTs