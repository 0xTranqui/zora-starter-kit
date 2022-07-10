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
import NFTCard from '../components/NFTCard';


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

const Protocol: NextPage = () => {
  const [userNFTs, setUserNFTs] = useState({});
  const currentUserNFTs = userNFTs ? userNFTs: "nothing";

  const { address: account } = useAccount(); 
  const currentUserAddress = account ? account : ""
  console.log("currentUseraddress: ", currentUserAddress)

  const tokensResponse = async(args) => {
    const response = Object.entries(await (await zdk.tokens(args)).tokens.nodes)
    console.log("response", response)
    console.log("userNFTs: ", userNFTs)
    setUserNFTs(response)
  }

  const tokensArgs = {
    where: {
      ownerAddresses: [currentUserAddress]
    },
    pagination: {
      limit: 10
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
      <main className="flex flex-col items-center">        
        <h1 className="text-white">
          {`<<< ${currentUserNFTs} >>>`}
        </h1>
        <NFTCard nfts={currentUserNFTs} />
        {/* <NFTCard nfts={currentUserNFTs} /> */}
        {/* <NFTPreview
          contract=`${userNFTs[0].token.collectionAddress}`
          id=`${userNFTs[0].token.tokenId}`
        /> */}
      </main>
    </div>
  )
}

export default Protocol
