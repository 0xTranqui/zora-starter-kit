import type { NextPage } from 'next'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { ZDK, ZDKNetwork, ZDKChain } from "@zoralabs/zdk";
import { Networks, Strategies } from "@zoralabs/nft-hooks"
import { useAccount } from 'wagmi'
import { Header } from '../components/Header'
import UserNFTs from '../components/UserNFTs';

const networkInfo = {
  network: ZDKNetwork.Ethereum,
  chain: ZDKChain.Mainnet,
}

const API_ENDPOINT = "https://api.zora.co/graphql";
const zdkArgs = { 
  endPoint: API_ENDPOINT, 
  networks: [networkInfo], 
} 

const zdk = new ZDK(zdkArgs) 


const appendContractName = (arr, address) => {
  
  // runs a check for ENS NFTs which return a name of null unless cleaned
  const ensAddress = "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85"
  if ( address === ensAddress ) {
    const contractName = "ENS"
    return contractName
  } else {
    const contractName = arr.token.tokenContract["name"]
    return contractName
  }
}

const nftCounter = (arr, key) => {
  let arr2 = [];
    
  arr.forEach((x)=>{
        
    // Checking if there is any object in arr2
    // which contains the key value
      if (arr2.some((val)=>{ return val[key] == x.token[key] })) {
      
        // If yes! then increase the count by 1
        arr2.forEach((k)=>{
          if(k[key] === x.token[key]){ 
            k["count"]++
          }
      })
          
      } else {

        // If not! Then create a new object initialize 
        // it with the present iteration key's value and 
        // set the count to 1
        let a = {}
        a[key] = x.token[key]
        a["name"] = appendContractName(x, x.token.collectionAddress)
        a["count"] = 1        
        arr2.push(a);
      }
  })
    
  const sortedArray = arr2.sort((a, b) => {
    return b.count - a.count
  })

  return sortedArray
}

const Api: NextPage = () => {

  // =========== get current wallet address functionality
  const { address: account } = useAccount(); 
  const currentUserAddress = account ? account : "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" // vitalik.eth
  console.log("currentUseraddress: ", currentUserAddress)


  // ========== check user wallet functionality
  const [userNFTs, setUserNFTs] = useState({});
  const currentUserNFTs = userNFTs ? userNFTs: "nothing";

  const tokensResponse = async (args) => {
    const zdkResponseTokens = await (await zdk.tokens(args)).tokens.nodes
    const myNFTs = nftCounter(zdkResponseTokens, "collectionAddress")
    setUserNFTs(myNFTs)
  }

  const tokensArgs = {
    where: {
      ownerAddresses: [currentUserAddress]
    },
    pagination: {
      limit: 200
    },
    includeFullDetails: false
  }

  useEffect(() => {
    if(!!userNFTs) {
      tokensResponse(tokensArgs)
    }},
    [currentUserAddress]
  )

// ========== check specific collection functionality
interface ICollectionNFTs {
  address: any
  description: any
  name?: any
  symbol?: any
  totalSupply?: any
  networkInfo: any
  floorPrice?: any
  ownerCount: any
  nftCount: any
  salesVolume: any
}

const [collectionForm, setCollectionForm] = useState("0xCa21d4228cDCc68D4e23807E5e370C07577Dd152")
  const [collectionNFTs, setCollectionNFTs] = useState<ICollectionNFTs>({
    "address": "0xca21d4228cdcc68d4e23807e5e370c07577dd152",
    "description": "",
    "name": "Zorbs",
    "symbol": "ZORB",
    "totalSupply": 56741,
    "networkInfo": {
        "chain": "MAINNET",
        "network": "ETHEREUM"
    },
    "floorPrice": 0.02,
    "ownerCount": 33729,
    "nftCount": 56741,
    "salesVolume": {
        "chainTokenPrice": 654.2453815022026,
        "usdcPrice": 1661775.679886936,
        "totalCount": 11934
    }
})

  const currentCollectionNFTs = collectionNFTs ? collectionNFTs : ""

  const collectionArgs = {
    where: {
      collectionAddresses: [collectionForm]
    },
    includeFullDetails: false
  }

  const aggStatArgs = {
      collectionAddress: collectionForm // collectionForm
  }

  const collectionAggregateResponse = async (collArgs, aggArgs) => {
    const zdkResponseCollection = await (await zdk.collections(collArgs)).collections.nodes[0]
    const zdkResponseAggStat = await (await zdk.collectionStatsAggregate(aggArgs)).aggregateStat
    const mergedResponse = {
      ...zdkResponseAggStat,
      ...zdkResponseCollection
 
    }
    console.log("mergedResponse ", mergedResponse )
    setCollectionNFTs(mergedResponse)
  }

  useEffect(() => {
    if(!!collectionNFTs) {
      collectionAggregateResponse( collectionArgs, aggStatArgs)
    }},
    [collectionForm]
  )

  return (
    <div className='flex flex-col justify-center h-screen min-h-screen'>
      <Header />
      <main className="w-full flex flex-row flex-wrap justify-center self-center items-center">        
      <UserNFTs userAddress={currentUserAddress} nfts={currentUserNFTs} collectionInfo={currentCollectionNFTs} setCollectionCB={setCollectionForm} />
      </main>
    </div>
  )
}

export default Api
