import { NFTPreview, MediaConfiguration } from "@zoralabs/nft-components";
import { Networks, Strategies } from "@zoralabs/nft-hooks"

const zdkStrategyMainnet = new Strategies.ZDKFetchStrategy(
    Networks.MAINNET
)

const NFTCard = ({ nfts }) => {

    return (
        <>
            {
                nfts && nfts.length > 0
                ?
                nfts.map((nft, index) => {
                    const key = nft[1].token.collectionAddress + "/" + nft[1].token.tokenId
                    console.log("whats my key = ", key)
                    return (
                        <div key={nft.tokenId} className="flex flex-row flex-wrap justify-content">
                            <MediaConfiguration
                                networkId="1"                        
                                strategy={zdkStrategyMainnet}
                            >
                                <NFTPreview
                                    contract={nft[1].token.collectionAddress}
                                    id={nft[1].token.tokenId}                         
                                />
                            </MediaConfiguration>
                        </div>
                    )
                }
                ) : (
                    <div>
                        {"::: NO RESULTS :::"}
                    </div>
                )
            }
        </>
    )

}

export default NFTCard