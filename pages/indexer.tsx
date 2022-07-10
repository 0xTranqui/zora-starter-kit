import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { ZDK, ZDKNetwork, ZDKChain } from "@zoralabs/zdk";
import { NFTPreview, MediaConfiguration } from '@zoralabs/nft-components';
import { Networks, Strategies } from "@zoralabs/nft-hooks"

import { useAccount } from 'wagmi'

import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
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

const zdk = new ZDK(zdkArgs) // All arguments are optional  

const zdkStrategyMainnet = new Strategies.ZDKFetchStrategy(
  Networks.MAINNET
)

// const keyChecker = (obj) => {

//   const keys = Object.keys(obj).length
//   console.log("keys: ", keys)
//   return keys

//   // if (!Object.keys) {
//   //   Object.keys = function (obj) {
//   //       var keys = [],
//   //           k;
//   //       for (k in obj) {
//   //           if (Object.prototype.hasOwnProperty.call(obj, k)) {
//   //               keys.push(k);
//   //           }
//   //       }
//   //       return keys;
//   //   };
//   // } 

// }

// const addressFilterer = (obj) => {

//   const uniqueAddresses = new Set() 
//   for (let i = 0; i < obj.length; i++) {
//     uniqueAddresses.add(obj[i].token.collectionAddress)
//   }
//   const arrayOfAddresses = Array.from(uniqueAddresses)


//   return arrayOfAddresses

//   // if (!Object.keys) {
//   //   Object.keys = function (obj) {
//   //       var keys = [],
//   //           k;
//   //       for (k in obj) {
//   //           if (Object.prototype.hasOwnProperty.call(obj, k)) {
//   //               keys.push(k);
//   //           }
//   //       }
//   //       return keys;
//   //   };
//   // } 

// }

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
    console.log("what is x: ", x.token[key])
        
    // Checking if there is any object in arr2
    // which contains the key value
      if(arr2.some((val)=>{ return val[key] == x.token[key] })){
          
        // If yes! then increase the count by 1
        arr2.forEach((k)=>{
          if(k[key] === x.token[key]){ 
            k["count"]++
          }
      })
          
      }else{
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

  console.log("sortedArray", sortedArray)
  return sortedArray
}

const Api: NextPage = () => {
  const [userNFTs, setUserNFTs] = useState({});
  const currentUserNFTs = userNFTs ? userNFTs: "nothing";

  const { address: account } = useAccount(); 
  const currentUserAddress = account ? account : ""
  console.log("currentUseraddress: ", currentUserAddress)

  const tokensResponse = async(args) => {
    const response = await (await zdk.tokens(args)).tokens.nodes
    console.log("response", response)
    console.log("nftCounter", nftCounter(response, "collectionAddress"))
    const myNFTs = nftCounter(response, "collectionAddress")
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
    tokensResponse(tokensArgs)
    },
    []
  )

  useEffect(() => {
    if(!!userNFTs) {
    tokensResponse(tokensArgs)
    }},
    [currentUserAddress]
  )


  return (
    <div className='flex flex-col justify-center h-screen min-h-screen'>
      <Header />
      <main className="w-full flex flex-row flex-wrap items-center">        
      <UserNFTs nfts={currentUserNFTs} />
      </main>
    </div>
  )
}

export default Api
