import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Dispatch, useState, useEffect } from 'react'
import { ZDK, ZDKNetwork, ZDKChain } from "@zoralabs/zdk";
import { NFTPreview, MediaConfiguration } from '@zoralabs/nft-components';
import { Networks, Strategies } from "@zoralabs/nft-hooks"
import mainnetZoraAddresses from "@zoralabs/v3/dist/addresses/1.json"
import asksABI from "@zoralabs/v3/dist/artifacts/AsksV1_1.sol/AsksV1_1.json"
import zmmABI from "@zoralabs/v3/dist/artifacts/ZoraModuleManager.sol/ZoraModuleManager.json"

import erc721abi from 'erc-token-abis/abis/ERC721Full.json'

import { erc721ABI, useAccount, useContractRead, useContractWrite } from 'wagmi'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import AskRead_disclosure from "../components/Asks/AskRead_disclosure"
import AskWrite_disclosure from '../components/Asks/AskWrite_disclosure';
import OffersRead_disclosure from "../components/Offers/OffersRead_disclosure"
import OffersWrite_disclosure from '../components/Offers/OffersWrite_disclosure';
import AuctionRead_disclosure from "../components/Auctions/AuctionRead_disclosure"
import AuctionWrite_disclosure from '../components/Auctions/AuctionWrite_disclosure'

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

  interface nftInfo {
    contractAddress: string,
    tokenId: string
  }

  interface nftABIInfo {
    nftABI: any
  }

  const [ asksNFT, setAsksNFT] = useState<nftInfo>({
    "contractAddress": "0x7e6663E45Ae5689b313e6498D22B041f4283c88A",
    "tokenId": "1"
  })

  const [ offersNFT, setOffersNFT] = useState<nftInfo>({
    "contractAddress": "0x7e6663E45Ae5689b313e6498D22B041f4283c88A",
    "tokenId": "2"
  })

  const [ auctionsNFT, setAuctionsNFT] = useState<nftInfo>({
    "contractAddress": "0x7e6663E45Ae5689b313e6498D22B041f4283c88A",
    "tokenId": "3"
  })

  // get account hook
  const { address, connector, isConnecting, isConnected, status} = useAccount(); 
  const currentUserAddress = address ? address : ""

  // const [asksNFTABI, setAsksNFTABI] = useState<nftABIInfo>({
  //   "nftABI": ""
  // })

  // // const getNFTABI = (nftAddress) => {
  // //   const etherActorURL = `https://ether.actor/${asksNFT.contractAddress}.json`
  // //   console.log("url: ", etherActorURL)
  // //   fetch(etherActorURL)
  // //     .then(result => result.json())
  // //     .then((output) => {
  // //       console.log("Output: ", output.abi);
  // //       setAsksNFTABI(output.abi)
  // //     }).catch(err => console.error(err));
  // // }

  // ASKS: check if owner has approved ERC721 transfer helper for specific NFT
  const { data: asksRead, isError: asksError, isLoading: asksLoading, isSuccess: asksSuccess, isFetching: asksFetching  } = useContractRead({
    addressOrName: asksNFT.contractAddress,
    contractInterface: erc721abi,
    functionName: 'isApprovedForAll',
    args: [
      currentUserAddress, //owner
      mainnetZoraAddresses.ERC721TransferHelper // transferhelper
    ],
    watch: false,
    onError(error) {
      console.log("error: ", asksError)
    },
    onSuccess(data) {
      console.log("Asks ERC721TransferHelper Approved? --> ", asksRead)
    }  
  })

  const transferHelperDataBoolAsks = () => {
    return Boolean(asksRead);
  }

  // ASKS: Apporve ERC721TransferHelper as an operator of the specific NFT
  const { data: asksTransferHelperData, isError: asksTransferHelperError, isLoading: asksTransferHelperLoading, isSuccess: asksTransferHelperSuccess, write: asksTransferHelperWrite } = useContractWrite({
    addressOrName: asksNFT.contractAddress,
    contractInterface: erc721ABI,
    functionName: 'setApprovalForAll',
    args: [
        mainnetZoraAddresses.ERC721TransferHelper,
        true,
    ],
    onError(error, variables, context) {
        console.log("error", error)
    },
    onSuccess(cancelData, variables, context) {
        console.log("Success!", asksTransferHelperData)
    },
  })    

  // check if owner has approved Asks Module V1.1
  const { data: zmmAsksBool, isError: zmmAsksError, isLoading: zmmAsksLoading, isSuccess: zmmAsksSuccess, isFetching: zmmAsksFetching  } = useContractRead({
    addressOrName: mainnetZoraAddresses.ZoraModuleManager,
    contractInterface: zmmABI.abi,
    functionName: 'isModuleApproved',
    args: [
      currentUserAddress, //owner
      mainnetZoraAddresses.AsksV1_1 // AsksV1.1 address
    ],
    watch: false,
    onError(error) {
        console.log("error: ", zmmAsksError)
    },
    onSuccess(data) {
        console.log("AsksV1.1 Module Approved? --> ", zmmAsksBool)
    }  
  })  

  const zmmAsksApprovalCheck = () => {
    return Boolean(zmmAsksBool);
  }

  // ASKS: approve Asks Module
  const { data: asksZMMApproval, isError: asksZMMErrror, isLoading: asksZMMLoading, isSuccess: asksZMMSuccess, write: asksZMMWrite } = useContractWrite({
    addressOrName: mainnetZoraAddresses.ZoraModuleManager,
    contractInterface: zmmABI.abi,
    functionName: 'setApprovalForModule',
    args: [
        mainnetZoraAddresses.AsksV1_1,
        true,
    ],
    onError(error, variables, context) {
        console.log("error", error)
    },
    onSuccess(asksZMMApproval, variables, context) {
        console.log("Success!", asksZMMApproval)
    },
  })      


  // OFFERS: check if owner has approved ERC721 transfer helper for specific NFT
  const { data: offersData, isError: offersError, isLoading: offersLoading, isSuccess: offersSuccess, isFetching: offersFetching  } = useContractRead({
    addressOrName: offersNFT.contractAddress,
    contractInterface: erc721abi,
    functionName: 'isApprovedForAll',
    args: [
      currentUserAddress, //owner
      mainnetZoraAddresses.ERC721TransferHelper // transferhelper
    ],
    watch: false,
    onError(error) {
      console.log("error: ", offersError)
    },
    onSuccess(data) {
      console.log("Offers ERC721TransferHelper Approved? --> ", offersData)
    }  
  })

  const transferHelperDataBoolOffers = () => {
    return Boolean(offersData);
  }

    // OFFERS: Apporve ERC721TransferHelper as an operator of the specific NFT
    const { data: offersTransferHelperData, isError: offersTransferHelperError, isLoading: offersTransferHelperLoading, isSuccess: offersTransferHelperSuccess, write: offersTransferHelperWrite } = useContractWrite({
      addressOrName: asksNFT.contractAddress,
      contractInterface: erc721ABI,
      functionName: 'setApprovalForAll',
      args: [
          mainnetZoraAddresses.ERC721TransferHelper,
          true,
      ],
      onError(error, variables, context) {
          console.log("error", error)
      },
      onSuccess(cancelData, variables, context) {
          console.log("Success!", offersTransferHelperData)
      },
  })    

  // check if owner has approved OffersV1 Module
  const { data: zmmOffersBool, isLoading: zmmOffersLoading, isSuccess: zmmOffersSuccess, isFetching: zmmOffersFetching  } = useContractRead({
    addressOrName: mainnetZoraAddresses.ZoraModuleManager,
    contractInterface: zmmABI.abi,
    functionName: 'isModuleApproved',
    args: [
      currentUserAddress, //owner
      mainnetZoraAddresses.OffersV1 // OffersV1 address
    ],
    watch: false,
    onError(error) {
        console.log("error: ", error)
    },
    onSuccess(data) {
        console.log("OffersV1 Module Approved? --> ", data)
    }  
  })  

  const zmmOffersApprovalCheck = () => {
    return Boolean(zmmOffersBool);
  }

  // offers: approve Offers Module
  const { data: offersZMMApproval, isError: offersZMMErrror, isLoading: offersZMMLoading, isSuccess: offersZMMSuccess, write: offersZMMWrite } = useContractWrite({
    addressOrName: mainnetZoraAddresses.ZoraModuleManager,
    contractInterface: zmmABI.abi,
    functionName: 'setApprovalForModule',
    args: [
        mainnetZoraAddresses.OffersV1,
        true,
    ],
    onError(error, variables, context) {
        console.log("error", error)
    },
    onSuccess(offersZMMApproval, variables, context) {
        console.log("Success!", offersZMMApproval)
    },
  })        

  // auctions: check if owner has approved ERC721 transfer helper for specific NFT
  const { data: auctionsData, isError: auctionsError, isLoading: auctionsLoading, isSuccess: auctionsSuccess, isFetching: auctionsFetching  } = useContractRead({
    addressOrName: auctionsNFT.contractAddress,
    contractInterface: erc721abi,
    functionName: 'isApprovedForAll',
    args: [
      currentUserAddress, //owner
      mainnetZoraAddresses.ERC721TransferHelper // transferhelper
    ],
    watch: false,
    onError(error) {
      console.log("error: ", auctionsError)
    },
    onSuccess(data) {
      console.log("Auctions ERC721TransferHelper Approved? --> ", auctionsData)
    }  
  })

  const transferHelperDataBoolAuctions = () => {
    return Boolean(auctionsData);
  }

  // auctions: Apporve ERC721TransferHelper as an operator of the specific NFT
  const { data: auctionsTransferHelperData, isError: auctionsTransferHelperError, isLoading: auctionsTransferHelperLoading, isSuccess: auctionsTransferHelperSuccess, write: auctionsTransferHelperWrite } = useContractWrite({
    addressOrName: asksNFT.contractAddress,
    contractInterface: erc721ABI,
    functionName: 'setApprovalForAll',
    args: [
        mainnetZoraAddresses.ERC721TransferHelper,
        true,
    ],
    onError(error, variables, context) {
        console.log("error", error)
    },
    onSuccess(cancelData, variables, context) {
        console.log("Success!", auctionsTransferHelperData)
    },
  })    

  // check if owner has approved AuctionFindersEth Module
  const { data: zmmAuctionFindersEthBool, isLoading: zmmAuctionFindersEthLoading, isSuccess: zmmAuctionFindersEthSuccess, isFetching: zmmAuctionFindersEthFetching  } = useContractRead({
    addressOrName: mainnetZoraAddresses.ZoraModuleManager,
    contractInterface: zmmABI.abi,
    functionName: 'isModuleApproved',
    args: [
      currentUserAddress, //owner
      mainnetZoraAddresses.ReserveAuctionFindersEth // AuctionFindersEth address
    ],
    watch: false,
    onError(error) {
        console.log("error: ", error)
    },
    onSuccess(data) {
        console.log("AuctionFindersEth Module Approved? --> ", data)
    }  
  })  

  const zmmAuctionFindersEthApprovalCheck = () => {
    return Boolean(zmmAuctionFindersEthBool);
  }  

  // offers: approve Auctions Module
  const { data: auctionsZMMApproval, isError: auctionsZMMErrror, isLoading: auctionsZMMLoading, isSuccess: auctionsZMMSuccess, write: auctionsZMMWrite } = useContractWrite({
    addressOrName: mainnetZoraAddresses.ZoraModuleManager,
    contractInterface: zmmABI.abi,
    functionName: 'setApprovalForModule',
    args: [
        mainnetZoraAddresses.ReserveAuctionFindersEth,
        true,
    ],
    onError(error, variables, context) {
        console.log("error", error)
    },
    onSuccess(auctionsZMMApproval, variables, context) {
        console.log("Success!", auctionsZMMApproval)
    },
  })         
  

  // useEffect(() => {
  //   getNFTABI(asksNFT.contractAddress);
  // },
  // [asksNFT.contractAddress]
  // )

  return (
    <div className='flex flex-col justify-center h-full min-h-screen'>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="border-l-2 border-r-2 border-t-2 border-white border-solid text-white grid  grid-rows-3 sm:grid-cols-3 h-fit">        
        
        {/* ASKS MODULE */}
        {/* ASKS MODULE */}
        {/* ASKS MODULE */}

        <div className='mt-24 sm:mt-10 flex flex-row flex-wrap content-start'>
          <div className='h-fit content-start flex flex-row flex-wrap w-full'>
            <div className="text-2xl h-fit w-full flex flex-row justify-center">            
              ASKS MODULE
            </div>
            <div className=" justify-center border-2 border-white border-solid flex flex-row h-fit w-full">
              LIST AND BUY NFTs FOR A SPECIFIC PRICE
            </div>
            <div className="grid grid-cols-2 border-2 boreder-yellow-500 border-solid w-full" >
              <a
                href="https://github.com/0xTranqui/zora-starter-kit"
                className=" hover:cursor-pointer hover:text-[#f53bc3] text-center"
              >
                REPO
              </a>
              <a 
                href="https://etherscan.io/address/0x6170B3C3A54C3d8c854934cBC314eD479b2B29A3"
                className="hover:text-[#f53bc3] text-center"
              >
              ETHERSCAN
              </a>
            </div>
          </div>

          {/* NFT RENDERING + CONTRACT INPUTS */}
          <div className="mt-2  w-full h-fit flex flex-row flex-wrap justify-center "> 
            <MediaConfiguration
              networkId="1"                        
              strategy={zdkStrategyMainnet}
              strings={{
                CARD_OWNED_BY: "",
                CARD_CREATED_BY: "",                           
              }}
              style={{
                theme: {
                  previewCard: {
                    background: "black",
                    height: "200px",
                    width: "200px"                                    
                  },
                  defaultBorderRadius: 0,
                  lineSpacing: 0,
                  textBlockPadding: "0"                
                },              
              }}
            >
              <NFTPreview
                contract={asksNFT.contractAddress}
                id={asksNFT.tokenId}
                showBids={false}
                showPerpetual={false}
              />
            </MediaConfiguration> 
            <div className="w-full flex flex-row flex-wrap justify-center">
              <div className="justify-center flex flex-row w-full">
                <div className="align-center">
                  CONTRACT ADDRESS
                </div>
                <input
                  className="border-[1px] border-solid border-black ml-2 text-black text-center bg-slate-200"
                  placeholder="Input NFT Address"
                  name="inputContract"
                  type="text"
                  value={asksNFT.contractAddress}
                  onChange={(e) => {
                      e.preventDefault();
                      setAsksNFT(current => {
                        return {
                          ...current,
                          contractAddress: e.target.value
                        }
                      })
                  }}
                  required                    
                >
                </input>
              </div>
              <div className="justify-center flex flex-row w-full">
                <div className=" mt-1 self-center">
                  TOKEN ID
                </div>
                <input
                  className="border-l-[1px] border-r-[1px] border-b-[1px] border-solid border-black ml-2 mt-2 flex flex-row align-center text-black text-center bg-slate-200"
                  placeholder="Input Token Id "
                  name="inputContract"
                  type="text"
                  value={asksNFT.tokenId}
                  onChange={(e) => {
                      e.preventDefault();
                      setAsksNFT(current => {
                        return {
                          ...current,
                          tokenId: e.target.value
                        }
                      })
                  }}
                  required                    
                >
                </input>
              </div>
              
              <div className="flex flex-row flex-wrap w-full justify-center">
                {zmmAsksApprovalCheck() === false ? (
                <div className="mt-2 flex w-full justify-center">
                  <button
                    onClick={() => asksZMMWrite()}
                    className="w-fit hover:bg-white hover:text-black border-2 border-white border-solid p-1 mt-1"
                  >
                    APPROVE ASKS MODULE
                  </button>
                </div>
                ) : (
                <div className="mt-2 flex w-full justify-center">
                  <button disabled={true}  className="w-fit border-2 border-slate-600 text-slate-400 border-solid p-1 mt-1">
                    ASK MODULE APPROVED ✅
                  </button>
                </div>                
                )}
                {transferHelperDataBoolAsks() === false ? (
                <div className="mt-2 flex w-full justify-center">
                  <button 
                    onClick={() => asksTransferHelperWrite()}
                    className="w-fit hover:bg-white hover:text-black border-2 border-white border-solid p-1 mt-1"
                  >
                    APPROVE TRANSFER HELPER
                  </button>
                </div>
                ) : (
                <div className="mt-2 flex w-full justify-center">
                  <button disabled={true}  className="w-fit border-2 border-slate-600 text-slate-400 border-solid p-1 mt-1">
                    TRANSFER HELPER APPROVED ✅
                  </button>
                </div>  
                )}
              </div>

            </div>                   
          </div>
          <div className="mt-8 flex flex-row flex-wrap w-full ">
            <div className="w-full">
              <div className="ml-2 mb-2 text-xl">
                ASK MODULE READS
              </div>
              <AskRead_disclosure nft={asksNFT} />
              {/* <AskForNFT_READ nft={asksNFT} /> */}
            </div>
          </div>
          <div className="mt-5 flex flex-row flex-wrap w-full ">
            <div className="flex flex-row flex-wrap w-full">
              <div className="ml-2 mb-2 text-xl">
                ASK MODULE WRITES
              </div>
              <AskWrite_disclosure nft={asksNFT} />
            </div>
          </div>
        </div>

        {/* OFFERS MODULE */}
        {/* OFFERS MODULE */}
        {/* OFFERS MODULE */}

        <div className='sm:mt-10 '>
          <div className='h-fit content-start flex flex-row flex-wrap w-full'>
            <div className="text-2xl h-fit w-full flex flex-row justify-center">            
              OFFERS MODULE
            </div>
            <div className=" justify-center border-2 border-white border-solid flex flex-row h-fit w-full">
              MAKE AND RECIEVE OFFERS ON NFTs
            </div>
            <div className="grid grid-cols-2 border-2 boreder-yellow-500 border-solid w-full" >
            <a
                href="https://github.com/0xTranqui/zora-starter-kit"
                className=" hover:cursor-pointer hover:text-[#f53bc3] text-center"
              >
                REPO
              </a>
              <a 
                href="https://etherscan.io/address/0x76744367ae5a056381868f716bdf0b13ae1aeaa3"
                className="hover:text-[#f53bc3] text-center"
              >
              ETHERSCAN
              </a>
            </div>
          </div>

          {/* NFT RENDERING + CONTRACT INPUTS */}
          <div className="mt-2  border-l-2 border-r-2 border-b-2 border-solid border-white w-full h-fit flex flex-row flex-wrap justify-center "> 
            <MediaConfiguration
              networkId="1"                        
              strategy={zdkStrategyMainnet}
              strings={{
                CARD_OWNED_BY: "",
                CARD_CREATED_BY: "",                           
              }}
              style={{
                theme: {
                  previewCard: {
                    background: "black",
                    height: "200px",
                    width: "200px"                                    
                  },
                  defaultBorderRadius: 0,
                  lineSpacing: 0,
                  textBlockPadding: "0"                
                },              
              }}
            >
              <NFTPreview
                contract={offersNFT.contractAddress}
                id={offersNFT.tokenId}
                showBids={false}
                showPerpetual={false}
              />
            </MediaConfiguration> 
            <div className="w-full flex flex-row flex-wrap justify-center">
            <div className="justify-center flex flex-row w-full">
                <div className="align-center">
                  CONTRACT ADDRESS
                </div>
                <input
                  className="border-[1px] border-solid border-black ml-2 text-black text-center bg-slate-200"
                  placeholder="Input NFT Address"
                  name="inputContract"
                  type="text"
                  value={offersNFT.contractAddress}
                  onChange={(e) => {
                      e.preventDefault();
                      setOffersNFT(current => {
                        return {
                          ...current,
                          contractAddress: e.target.value
                        }
                      })
                  }}
                  required                    
                >
                </input>
              </div>
              <div className="justify-center flex flex-row w-full">
                <div className=" mt-1 self-center">
                  TOKEN ID
                </div>
                <input
                  className="border-l-[1px] border-r-[1px] border-b-[1px] border-solid border-black ml-2 mt-2 flex flex-row align-center text-black text-center bg-slate-200"
                  placeholder="Input Token Id "
                  name="inputContract"
                  type="text"
                  value={offersNFT.tokenId}
                  onChange={(e) => {
                      e.preventDefault();
                      setOffersNFT(current => {
                        return {
                          ...current,
                          tokenId: e.target.value
                        }
                      })
                  }}
                  required                    
                >
                </input>
              </div>
              <div className="flex flex-row flex-wrap w-full justify-center">
                {zmmOffersApprovalCheck() === false ? (
                <div className="mt-2 flex w-full justify-center">
                  <button
                    onClick={() => offersZMMWrite()}
                    className="w-fit hover:bg-white hover:text-black border-2 border-white border-solid p-1 mt-1"
                  >
                    APPROVE OFFERS MODULE
                  </button>
                </div>
                ) : (
                <div className="mt-2 flex w-full justify-center">
                  <button disabled={true}  className="w-fit border-2 border-slate-600 text-slate-400 border-solid p-1 mt-1">
                    OFFERS MODULE APPROVED ✅
                  </button>
                </div>                
                )}
                {transferHelperDataBoolOffers() === false ? (
                <div className="mt-2 flex w-full justify-center">
                  <button
                    onClick={() => offersTransferHelperWrite()}
                    className="w-fit hover:bg-white hover:text-black border-2 border-white border-solid p-1 mt-1"
                  >
                    APPROVE TRANSFER HELPER
                  </button>
                </div>
                ) : (
                <div className="mt-2 flex w-full justify-center">
                  <button disabled={true}  className="w-fit border-2 border-slate-600 text-slate-400 border-solid p-1 mt-1">
                    TRANSFER HELPER APPROVED ✅
                  </button>
                </div>  
                )}
              </div>
              <div className="mt-8 flex flex-row flex-wrap w-full ">
                <div className="w-full">
                  <div className="ml-2 mb-2 text-xl">
                    OFFERS MODULE READS
                  </div>
                  <OffersRead_disclosure nft={offersNFT} />
                  {/* <AskForNFT_READ nft={asksNFT} /> */}
                </div>
              </div>
              <div className="mt-5 flex flex-row flex-wrap w-full ">
                <div className="flex flex-row flex-wrap w-full">
                  <div className="ml-2 mb-2 text-xl">
                    OFFERS MODULE WRITES
                  </div>
                  <OffersWrite_disclosure nft={offersNFT} />
                </div>
              </div>              

            </div>                    
          </div>
        </div>

        {/* AUCTION MODULE */}
        {/* AUCTION MODULE */}
        {/* AUCTION MODULE */}

        <div className='sm:mt-10 '>
          <div className='h-fit content-start flex flex-row flex-wrap w-full'>
            <div className="text-2xl h-fit w-full flex flex-row justify-center">            
              AUCTIONS MODULE
            </div>
            <div className=" justify-center border-2 border-white border-solid flex flex-row h-fit w-full">
              RUN AND BID ON AUCTIONS FOR NFTs
            </div>
            <div className="grid grid-cols-2 border-2 boreder-yellow-500 border-solid w-full" >
              <a
                href="https://github.com/0xTranqui/zora-starter-kit"
                className=" hover:cursor-pointer hover:text-[#f53bc3] text-center"
              >
                REPO
              </a>
              <a 
                href="https://etherscan.io/address/0x9458E29713B98BF452ee9B2C099289f533A5F377"
                className="hover:text-[#f53bc3] text-center"
              >
              ETHERSCAN
              </a>
            </div>
          </div>

          {/* NFT RENDERING + CONTRACT INPUTS */}              
          <div className="mt-2 w-full h-fit flex flex-row flex-wrap justify-center "> 
            <MediaConfiguration
              networkId="1"                        
              strategy={zdkStrategyMainnet}
              strings={{
                CARD_OWNED_BY: "",
                CARD_CREATED_BY: "",                           
              }}
              style={{
                theme: {
                  previewCard: {
                    background: "black",
                    height: "200px",
                    width: "200px"                                    
                  },
                  defaultBorderRadius: 0,
                  lineSpacing: 0,
                  textBlockPadding: "0"                
                },              
              }}
            >
              <NFTPreview
                contract={auctionsNFT.contractAddress}
                id={auctionsNFT.tokenId}
                showBids={false}
                showPerpetual={false}
              />
            </MediaConfiguration> 
            <div className="w-full flex flex-row flex-wrap justify-center">
              <div className="justify-center flex flex-row w-full">
                <div className="align-center">
                  CONTRACT ADDRESS
                </div>
                <input
                  className="border-[1px] border-solid border-black ml-2 text-black text-center bg-slate-200"
                  placeholder="Input NFT Address"
                  name="inputContract"
                  type="text"
                  value={auctionsNFT.contractAddress}
                  onChange={(e) => {
                      e.preventDefault();
                      setAuctionsNFT(current => {
                        return {
                          ...current,
                          contractAddress: e.target.value
                        }
                      })
                  }}
                  required                    
                >
                </input>
              </div>
              <div className="justify-center flex flex-row w-full">
                <div className=" mt-1 self-center">
                  TOKEN ID
                </div>
                <input
                  className="border-l-[1px] border-r-[1px] border-b-[1px] border-solid border-black ml-2 mt-2 flex flex-row align-center text-black text-center bg-slate-200"
                  placeholder="Input Token Id "
                  name="inputContract"
                  type="text"
                  value={auctionsNFT.tokenId}
                  onChange={(e) => {
                      e.preventDefault();
                      setAuctionsNFT(current => {
                        return {
                          ...current,
                          tokenId: e.target.value
                        }
                      })
                  }}
                  required                    
                >
                </input>
              </div>
              <div className="flex flex-row flex-wrap w-full justify-center">
                {zmmAuctionFindersEthApprovalCheck() === false ? (
                <div className="mt-2 flex w-full justify-center">
                  <button
                    onClick={() => auctionsZMMWrite()}
                    className="w-fit hover:bg-white hover:text-black border-2 border-white border-solid p-1 mt-1"
                  >
                    APPROVE AUCTION MODULE
                  </button>
                </div>
                ) : (
                <div className="mt-2 flex w-full justify-center">
                  <button disabled={true}  className="w-fit border-2 border-slate-600 text-slate-400 border-solid p-1 mt-1">
                    AUCTION MODULE APPROVED ✅
                  </button>
                </div>                
                )}
                {transferHelperDataBoolAuctions() === false ? (
                <div className="mt-2 flex w-full justify-center">
                  <button 
                    onClick={() => auctionsTransferHelperWrite()}
                    className="w-fit hover:bg-white hover:text-black border-2 border-white border-solid p-1 mt-1"
                  >
                    APPROVE TRANSFER HELPER
                  </button>
                </div>
                ) : (
                <div className="mt-2 flex w-full justify-center">
                  <button disabled={true}  className="w-fit border-2 border-slate-600 text-slate-400 border-solid p-1 mt-1">
                    TRANSFER HELPER APPROVED ✅
                  </button>
                </div>  
                )}
              </div>
            </div>                   
          </div>              
          <div className="mt-8 flex flex-row flex-wrap w-full ">
            <div className="w-full">
              <div className="ml-2 mb-2 text-xl">
                AUCTION MODULE READS
              </div>
              <AuctionRead_disclosure nft={auctionsNFT} />
            </div>
          </div>
          <div className="mt-5 flex flex-row flex-wrap w-full ">
            <div className="flex flex-row flex-wrap w-full">
              <div className="ml-2 mb-2 text-xl">
                AUCTION MODULE WRITES
              </div>
              <AuctionWrite_disclosure nft={auctionsNFT} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Protocol






// const Protocol: NextPage = () => {
//   const [userNFTs, setUserNFTs] = useState({});
//   const currentUserNFTs = userNFTs ? userNFTs: "nothing";

//   const { address: account } = useAccount(); 
//   const currentUserAddress = account ? account : ""
//   console.log("currentUseraddress: ", currentUserAddress)

//   const tokensResponse = async(args) => {
//     const response = Object.entries(await (await zdk.tokens(args)).tokens.nodes)
//     console.log("response", response)
//     console.log("userNFTs: ", userNFTs)
//     setUserNFTs(response)
//   }

//   const tokensArgs = {
//     where: {
//       ownerAddresses: [currentUserAddress]
//     },
//     pagination: {
//       limit: 10
//     },
//     includeFullDetails: false
//   }

//   useEffect(() => {
//     tokensResponse(tokensArgs)
//     },
//     []
//   )

//   useEffect(() => {
//     if(!!userNFTs) {
//     tokensResponse(tokensArgs)
//     }},
//     [currentUserAddress]
//   )


//   return (
//     <div className='flex flex-col justify-center h-screen min-h-screen'>
//       <Header />
//       <main className="flex flex-col items-center">        
//         <h1 className="text-white">
//           {`<<< ${currentUserNFTs} >>>`}
//         </h1>
//         <NFTCard nfts={currentUserNFTs} />
//         {/* <NFTCard nfts={currentUserNFTs} /> */}
//         {/* <NFTPreview
//           contract=`${userNFTs[0].token.collectionAddress}`
//           id=`${userNFTs[0].token.tokenId}`
//         /> */}
//       </main>
//     </div>
//   )
// }

// export default Protocol
