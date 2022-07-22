import { NextPage } from "next"
import { Header } from "../components/Header"
import { useState, useEffect } from "react"
import { useContractWrite, useSwitchNetwork, useNetwork, useAccount, useConnect } from "wagmi"
import { InjectedConnector } from 'wagmi/connectors/injected'
import { utils } from "ethers"

const ZoraNFTCreatorProxy_ABI = require("../node_modules/@zoralabs/nft-drop-contracts/dist/artifacts/ZoraNFTCreatorV1.sol/ZoraNFTCreatorV1.json")

const ZoraNFTCreatorProxy_ADDRESS_RINKEBY = "0x2d2acD205bd6d9D0B3E79990e093768375AD3a30"
const ZoraNFTCreatorProxy_ADDRESS_MAINNET = "0xF74B146ce44CC162b601deC3BE331784DB111DC1"

const Create: NextPage = () => {

  const [dropInputs, setDropInputs] = useState({
    contractName: "Example Drop",
    contractSymbol: "DROP",
    contractAdmin: "0x153D2A196dc8f1F6b9Aa87241864B3e4d4FEc170",
    contractMaxSupply: "100",
    secondaryRoyalties: "500",
    fundsRecipient: "0x153D2A196dc8f1F6b9Aa87241864B3e4d4FEc170",
    salesConfig: {
      priceEther: "0.001",
      perWalletMintCap: "5",
      publicSaleStart: "0", // makes it so edition will be live to start 
      publicSaleEnd: "50000000000", // makes it so edition will be live to start
      presaleStart: "0",
      presaleEnd: "0",
      presaleMerkleRoot: "0x0000000000000000000000000000000000000000000000000000000000000000"
    },
    metadataURIBase: "uribase/",
    metadtaContractURI: "contracturi/",
  })

  const [editionInputs, setEditionInputs] = useState({
    contractName: "Example Edition",
    contractSymbol: "EDTN",
    contractMaxSupply: "100",
    secondaryRoyalties: "500",
    fundsRecipient: "0x153D2A196dc8f1F6b9Aa87241864B3e4d4FEc170",
    contractAdmin: "0x153D2A196dc8f1F6b9Aa87241864B3e4d4FEc170",
    salesConfig: {
      priceEther: "0.001",
      perWalletMintCap: "5",
      publicSaleStart: "0", // makes it so edition will be live to start
      publicSaleEnd: "50000000000", // makes it so edition will be live to start
      presaleStart: "0",
      presaleEnd: "0",
      presaleMerkleRoot: "0x0000000000000000000000000000000000000000000000000000000000000000"
    },
    editionDescription: "description",
    metadataAnimationURI: "animationURI/",
    metadataImageURI: "imageURI/",
  })  

  const { chain } = useNetwork()





  // connect to network and call create drop flow (for when no wallet previously connected)
  const { connectAsync: connectToRinkeby } = useConnect({
    connector: new InjectedConnector,
    chainId: 4,
    onSettled(data, error, variables, context) {
      console.log("connect to mainnet settled: ", data)
    },
  })

  const { connectAsync: connectToMainnet } = useConnect({
    connector: new InjectedConnector,
    chainId: 1,
    onSettled(data, error, variables, context) {
      console.log("connect to mainnet settled: ", data)
    },
  })

  const connectToRinkebyAndDrop = async () => {
    await connectToRinkeby()
    rinkebyDropWrite()
  }
  
  const connectToMainnetAndDrop = async () => {
    await connectToMainnet()
    mainnetDropWrite()
  }

  // switch network and call create drop flow (for when wallet already connected but to incorrect network)
  const { data: rinkebyChainData, switchNetworkAsync: switchToRinkeby } = useSwitchNetwork({
    chainId: 4,
    onSuccess(rinkebyChainData) {
      console.log("Success", rinkebyChainData)
    }
  })

  const { data: mainnetChainData, switchNetworkAsync: switchToMainnet } = useSwitchNetwork({
    chainId: 1,
    onSuccess(mainnetChainData) {
      console.log("Success", mainnetChainData)
    }
  })

  const switchToRinkebyAndDrop = async () => {
    await switchToRinkeby()
    rinkebyDropWrite()
  }

  const switchToMainnetAndDrop = async () => {
    await switchToMainnet()
    mainnetDropWrite()
  }  

  // createDrop function used in button
  const createDropRinkeby = () => {
    if (!chain ) {
      connectToRinkebyAndDrop()
      return
    } else if (chain && chain.id !== 4) {
      switchToRinkebyAndDrop()
      return
    }
    rinkebyDropWrite()
  }

  const createDropMainnet = () => {
    if (!chain ) {
      connectToMainnetAndDrop()
      return
    } else if (chain && chain.id !== 1) {
      switchToMainnetAndDrop()
      return
    }
    mainnetDropWrite()
  }


  // connect to network and call create edition flow (for when no wallet previously connected)
  const connectToRinkebyAndEdition = async () => {
    await connectToRinkeby()
    rinkebyDropWrite()
  }

  const connectToMainnetAndEdition = async () => {
    await connectToMainnet()
    mainnetDropWrite()
  }

  // switch network and call edition drop flow (for when wallet already connected but to incorrect network)
  const switchToRinkebyAndEdition = async () => {
    await switchToRinkeby()
    rinkebyDropWrite()
  }

  const switchToMainnetAndEdition = async () => {
    await switchToMainnet()
    mainnetDropWrite()
  }

  // createEdition function used in button  
  const createEditionRinkeby = () => {
    if (!chain ) {
      connectToRinkebyAndEdition()
      return
    } else if (chain && chain.id !== 4) {
      switchToRinkebyAndEdition()
      return
    }
    rinkebyEditionWrite()
  }

  const createEditionMainnet = () => {
    if (!chain ) {
      connectToMainnetAndEdition()
      return
    } else if (chain && chain.id !== 1) {
      switchToMainnetAndEdition()
      return
    }
    mainnetEditionWrite()
  }




  const dealWithEther = (price) => {
    if (price === "") {
      return 0
    }
    return utils.parseEther(price)
  }

  // createDrop functions

  const { data: rinkebyDropData, isError: rinkebyDropError, isLoading: rinkebyDropLoading, write: rinkebyDropWrite } = useContractWrite({
    addressOrName: ZoraNFTCreatorProxy_ADDRESS_RINKEBY,
    contractInterface: ZoraNFTCreatorProxy_ABI.abi,
    functionName: 'createDrop',
    args: [
      dropInputs.contractName,
      dropInputs.contractSymbol,
      dropInputs.contractAdmin,
      dropInputs.contractMaxSupply,
      dropInputs.secondaryRoyalties,
      dropInputs.fundsRecipient,
      [
        dealWithEther(dropInputs.salesConfig.priceEther),
        dropInputs.salesConfig.perWalletMintCap,
        dropInputs.salesConfig.publicSaleStart,
        dropInputs.salesConfig.publicSaleEnd,
        dropInputs.salesConfig.presaleStart,
        dropInputs.salesConfig.presaleEnd,
        dropInputs.salesConfig.presaleMerkleRoot
      ],
      dropInputs.metadataURIBase,
      dropInputs.metadtaContractURI,
    ]
  })

  const { data: mainnetDropData, isError: mainnetDropError, isLoading: mainnetDropLoading, write: mainnetDropWrite } = useContractWrite({
    addressOrName: ZoraNFTCreatorProxy_ADDRESS_MAINNET,
    contractInterface: ZoraNFTCreatorProxy_ABI.abi,
    functionName: 'createDrop',
    args: [
      dropInputs.contractName,
      dropInputs.contractSymbol,
      dropInputs.contractAdmin,
      dropInputs.contractMaxSupply,
      dropInputs.secondaryRoyalties,
      dropInputs.fundsRecipient,
      [
        dealWithEther(dropInputs.salesConfig.priceEther),
        dropInputs.salesConfig.perWalletMintCap,
        dropInputs.salesConfig.publicSaleStart,
        dropInputs.salesConfig.publicSaleEnd,
        dropInputs.salesConfig.presaleStart,
        dropInputs.salesConfig.presaleEnd,
        dropInputs.salesConfig.presaleMerkleRoot
      ],
      dropInputs.metadataURIBase,
      dropInputs.metadtaContractURI,
    ]
  })

  // createEdition functions

  const { data: rinkebyEditionData, isError: rinkebyEditionError, isLoading: rinkebyEditionLoading, write: rinkebyEditionWrite } = useContractWrite({
    addressOrName: ZoraNFTCreatorProxy_ADDRESS_RINKEBY,
    contractInterface: ZoraNFTCreatorProxy_ABI.abi,
    functionName: 'createEdition',
    args: [
      editionInputs.contractName,
      editionInputs.contractSymbol,
      editionInputs.contractMaxSupply,
      editionInputs.secondaryRoyalties,
      editionInputs.fundsRecipient,
      editionInputs.contractAdmin,
      [
        dealWithEther(editionInputs.salesConfig.priceEther),
        editionInputs.salesConfig.perWalletMintCap,
        editionInputs.salesConfig.publicSaleStart,
        editionInputs.salesConfig.publicSaleEnd,
        editionInputs.salesConfig.presaleStart,
        editionInputs.salesConfig.presaleEnd,
        editionInputs.salesConfig.presaleMerkleRoot
      ],
      editionInputs.editionDescription,
      editionInputs.metadataAnimationURI,
      editionInputs.metadataImageURI
    ]
  })

  const { data: mainnetEditionData, isError: mainnetEditionError, isLoading: mainnetEditionLoading, write: mainnetEditionWrite } = useContractWrite({
    addressOrName: ZoraNFTCreatorProxy_ADDRESS_MAINNET,
    contractInterface: ZoraNFTCreatorProxy_ABI.abi,
    functionName: 'createEdition',
    args: [
      editionInputs.contractName,
      editionInputs.contractSymbol,
      editionInputs.contractMaxSupply,
      editionInputs.secondaryRoyalties,
      editionInputs.fundsRecipient,
      editionInputs.contractAdmin,
      [
        dealWithEther(editionInputs.salesConfig.priceEther),
        editionInputs.salesConfig.perWalletMintCap,
        editionInputs.salesConfig.publicSaleStart,
        editionInputs.salesConfig.publicSaleEnd,
        editionInputs.salesConfig.presaleStart,
        editionInputs.salesConfig.presaleEnd,
        editionInputs.salesConfig.presaleMerkleRoot
      ],
      editionInputs.editionDescription,
      editionInputs.metadataAnimationURI,
      editionInputs.metadataImageURI
    ]
  })  

  useEffect(() => {
    if(!chain) {
      console.log("no wallet connected")
    } else {
      console.log("chain ID =", chain.id)
    }},
    [chain]
  )


  return (
    <div className="mt-2 sm:0 min-h-screen h-screen">
      <Header />
      <main className="text-white h-full flex sm:flex-col flex-row flex-wrap">

        <div className=" sm:w-6/12 sm:h-full w-full h-6/12 flex flex-row flex-wrap content-start">
          <div className="mt-20 sm:mt-10 flex flex-row justify-center h-fit w-full border-2 border-solid border-red-500 ">
            CREATE DROP
          </div>
          
          
          
          <div className="flex flex-row justify-center w-full h-fit border-2 border-white border-solid">
            <div className="flex flex-row w-full justify-center grid grid-cols-3">
              <div className="text-center ">
                CONTRACT NAME
              </div>
              <input
                className="text-black text-center bg-slate-200"
                placeholder="Input NFT Address"
                name="inputContract"
                type="text"
                value={dropInputs.contractName}
                onChange={(e) => {
                    e.preventDefault();
                    setDropInputs(current => {
                      return {
                        ...current,
                        contractName: e.target.value
                      }
                    })
                }}
                required                    
              >
              </input>
              <button>
                HOVER FOR INFO
              </button>
            </div>            
          </div>

          <div className="flex flex-row justify-center w-full h-fit border-2 border-white border-solid">
            <div className="flex flex-row w-full justify-center grid grid-cols-3">
              <div className="text-center">
                CONTRACT SYMBOL
              </div>
              <input
                className="text-black text-center bg-slate-200"
                placeholder="Input NFT Address"
                name="inputContract"
                type="text"
                value={dropInputs.contractSymbol}
                onChange={(e) => {
                    e.preventDefault();
                    setDropInputs(current => {
                      return {
                        ...current,
                        contractSymbol: e.target.value
                      }
                    })
                }}
                required                    
              >
              </input>
              <button>
                HOVER FOR INFO
              </button>
            </div>            
          </div>

          <div className="flex flex-row justify-center w-full h-fit border-2 border-white border-solid">
            <div className="flex flex-row w-full justify-center grid grid-cols-3">
              <div className="text-center">
                CONTRACT ADMIN
              </div>
              <input
                className="text-black text-center bg-slate-200"
                placeholder="Input NFT Address"
                name="inputContract"
                type="text"
                value={dropInputs.contractAdmin}
                onChange={(e) => {
                    e.preventDefault();
                    setDropInputs(current => {
                      return {
                        ...current,
                        contractAdmin: e.target.value
                      }
                    })
                }}
                required                    
              >
              </input>
              <button>
                HOVER FOR INFO
              </button>
            </div>            
          </div>

          <div className="flex flex-row justify-center w-full h-fit border-2 border-white border-solid">
            <div className="flex flex-row w-full justify-center grid grid-cols-3">
              <div className="text-center">
                CONTRACT MAX SUPPLY
              </div>
              <input
                className="text-black text-center bg-slate-200"
                placeholder="Input NFT Address"
                name="inputContract"
                type="number"
                value={dropInputs.contractMaxSupply}
                onChange={(e) => {
                    e.preventDefault();
                    setDropInputs(current => {
                      return {
                        ...current,
                        contractMaxSupply: e.target.value
                      }
                    })
                }}
                required                    
              >
              </input>
              <button>
                HOVER FOR INFO
              </button>
            </div>            
          </div>          
          
          <div className="flex flex-row justify-center w-full h-fit border-2 border-white border-solid">
            <div className="flex flex-row w-full justify-center grid grid-cols-3">
              <div className="text-center">
                SECONDARY ROYALTIES
              </div>
              <input
                className="text-black text-center bg-slate-200"
                placeholder="Input NFT Address"
                name="inputContract"
                type="number"
                value={dropInputs.secondaryRoyalties}
                onChange={(e) => {
                    e.preventDefault();
                    setDropInputs(current => {
                      return {
                        ...current,
                        secondaryRoyalties: e.target.value
                      }
                    })
                }}
                required                    
              >
              </input>
              <button>
                HOVER FOR INFO
              </button>
            </div>            
          </div>

          <div className="flex flex-row justify-center w-full h-fit border-2 border-white border-solid">
            <div className="flex flex-row w-full justify-center grid grid-cols-3">
              <div className="text-center">
                FUNDS RECIPIENT
              </div>
              <input
                className="text-black text-center bg-slate-200"
                placeholder="Input NFT Address"
                name="inputContract"
                type="text"
                value={dropInputs.fundsRecipient}
                onChange={(e) => {
                    e.preventDefault();
                    setDropInputs(current => {
                      return {
                        ...current,
                        fundsRecipient: e.target.value
                      }
                    })
                }}
                required                    
              >
              </input>
              <button>
                HOVER FOR INFO
              </button>
            </div>            
          </div>

          <div className="flex flex-row justify-center w-full h-fit border-2 border-white border-solid">
            <div className="flex flex-row w-full justify-center grid grid-cols-3">
              <div className="text-center">
                PRICE PER MINT
              </div>
              <input
                className="text-black text-center bg-slate-200"
                placeholder="Input NFT Address"
                name="inputContract"
                type="number"
                value={dropInputs.salesConfig.priceEther}
                onChange={(e) => {
                    e.preventDefault();
                    setDropInputs(current => {
                      return {
                        ...current,
                        salesConfig: {
                          ...current.salesConfig,
                          priceEther: e.target.value
                        }                        
                      }
                    })
                }}
                required                    
              >
              </input>
              <button>
                HOVER FOR INFO
              </button>
            </div>            
          </div>

          <div className="flex flex-row justify-center w-full h-fit border-2 border-white border-solid">
            <div className="flex flex-row w-full justify-center grid grid-cols-3">
              <div className="text-center">
                MINT CAP PER WALLET
              </div>
              <input
                className="text-black text-center bg-slate-200"
                placeholder="Input NFT Address"
                name="inputContract"
                type="number"
                value={dropInputs.salesConfig.perWalletMintCap}
                onChange={(e) => {
                    e.preventDefault();
                    setDropInputs(current => {
                      return {
                        ...current,
                        salesConfig: {
                          ...current.salesConfig,
                          perWalletMintCap: e.target.value
                        }                        
                      }
                    })
                }}
                required                    
              >
              </input>
              <button>
                HOVER FOR INFO
              </button>
            </div>            
          </div>

          <div className="flex flex-row justify-center w-full h-fit border-2 border-white border-solid">
            <div className="flex flex-row w-full justify-center grid grid-cols-3">
              <div className="text-center">
                PUBLIC SALE START
              </div>
              <input
                className="text-black text-center bg-slate-200"
                placeholder="Input NFT Address"
                name="inputContract"
                type="number"
                value={dropInputs.salesConfig.publicSaleStart}
                onChange={(e) => {
                    e.preventDefault();
                    setDropInputs(current => {
                      return {
                        ...current,
                        salesConfig: {
                          ...current.salesConfig,
                          publicSaleStart: e.target.value
                        }                        
                      }
                    })
                }}
                required                    
              >
              </input>
              <button>
                HOVER FOR INFO
              </button>
            </div>            
          </div>

          <div className="flex flex-row justify-center w-full h-fit border-2 border-white border-solid">
            <div className="flex flex-row w-full justify-center grid grid-cols-3">
              <div className="text-center">
                PUBLIC SALE END
              </div>
              <input
                className="text-black text-center bg-slate-200"
                placeholder="Input NFT Address"
                name="inputContract"
                type="number"
                value={dropInputs.salesConfig.publicSaleEnd}
                onChange={(e) => {
                    e.preventDefault();
                    setDropInputs(current => {
                      return {
                        ...current,
                        salesConfig: {
                          ...current.salesConfig,
                          publicSaleEnd: e.target.value
                        }                        
                      }
                    })
                }}
                required                    
              >
              </input>
              <button>
                HOVER FOR INFO
              </button>
            </div>            
          </div>

          <div className="flex flex-row justify-center w-full h-fit border-2 border-white border-solid">
            <div className="flex flex-row w-full justify-center grid grid-cols-3">
              <div className="text-center">
                PRESALE START
              </div>
              <input
                className="text-black text-center bg-slate-200"
                placeholder="Input NFT Address"
                name="inputContract"
                type="number"
                value={dropInputs.salesConfig.presaleStart}
                onChange={(e) => {
                    e.preventDefault();
                    setDropInputs(current => {
                      return {
                        ...current,
                        salesConfig: {
                          ...current.salesConfig,
                          presaleStart: e.target.value
                        }                        
                      }
                    })
                }}
                required                    
              >
              </input>
              <button>
                HOVER FOR INFO
              </button>
            </div>            
          </div>                 

          <div className="flex flex-row justify-center w-full h-fit border-2 border-white border-solid">
            <div className="flex flex-row w-full justify-center grid grid-cols-3">
              <div className="text-center">
                PRESALE END
              </div>
              <input
                className="text-black text-center bg-slate-200"
                placeholder="Input NFT Address"
                name="inputContract"
                type="number"
                value={dropInputs.salesConfig.presaleEnd}
                onChange={(e) => {
                    e.preventDefault();
                    setDropInputs(current => {
                      return {
                        ...current,
                        salesConfig: {
                          ...current.salesConfig,
                          presaleEnd: e.target.value
                        }                        
                      }
                    })
                }}
                required                    
              >
              </input>
              <button>
                HOVER FOR INFO
              </button>
            </div>            
          </div>

          <div className="flex flex-row justify-center w-full h-fit border-2 border-white border-solid">
            <div className="flex flex-row w-full justify-center grid grid-cols-3">
              <div className="text-center">
                PRESALE MERKLE ROOT
              </div>
              <input
                className="text-black text-center bg-slate-200"
                placeholder="Input NFT Address"
                name="inputContract"
                type="text"
                value={dropInputs.salesConfig.presaleMerkleRoot}
                onChange={(e) => {
                    e.preventDefault();
                    setDropInputs(current => {
                      return {
                        ...current,
                        salesConfig: {
                          ...current.salesConfig,
                          presaleMerkleRoot: e.target.value
                        }                        
                      }
                    })
                }}
                required                    
              >
              </input>
              <button>
                HOVER FOR INFO
              </button>
            </div>            
          </div>                                                                                                                     

          <div className="flex flex-row justify-center w-full h-fit border-2 border-white border-solid">
            <div className="flex flex-row w-full justify-center grid grid-cols-3">
              <div className="text-center">
                URI BASE
              </div>
              <input
                className="text-black text-center bg-slate-200"
                placeholder="Input NFT Address"
                name="inputContract"
                type="text"
                value={dropInputs.metadataURIBase}
                onChange={(e) => {
                    e.preventDefault();
                    setDropInputs(current => {
                      return {
                        ...current,
                        metadataURIBase: e.target.value
                      }
                    })
                }}
                required                    
              >
              </input>
              <button>
                HOVER FOR INFO
              </button>
            </div>            
          </div>

          <div className="flex flex-row justify-center w-full h-fit border-2 border-white border-solid">
            <div className="flex flex-row w-full justify-center grid grid-cols-3">
              <div className="text-center">
                CONTRACT URI
              </div>
              <input
                className="text-black text-center bg-slate-200"
                placeholder="Input NFT Address"
                name="inputContract"
                type="text"
                value={dropInputs.metadtaContractURI}
                onChange={(e) => {
                    e.preventDefault();
                    setDropInputs(current => {
                      return {
                        ...current,
                        metadtaContractURI: e.target.value
                      }
                    })
                }}
                required                    
              >
              </input>
              <button>
                HOVER FOR INFO
              </button>
            </div>            
          </div>

          <div className="flex flex-row justify-center w-full h-fit border-2 border-white border-solid">
            <div className=" grid grid-cols-3">
              <div className=" text-center col-start-2 col-end-3">
              {"symmetricality issues"}
              </div>
            </div>
          </div>          
          
          <div className="flex flex-row justify-center w-full h-fit border-2 border-red-500 border-solid">
            <button
              className="border-2 hover:bg-white hover:text-black border-solid border-red-500 py-1 flex flex-row w-full justify-center"
              onClick={() => createDropRinkeby()}
            >
              DEPLOY TO RINKEBY
            </button>
            <button
              className="border-2 border-l-0 hover:bg-white hover:text-black border-solid border-red-500 py-1  flex flex-row w-full justify-center"
              onClick={() => createDropMainnet()}
            >
              DEPLOY TO MAINNET
            </button>              
          </div>                   

          {/* <div className="text-sm text-white w-full">
            {"Contract Name: " + dropInputs.contractName}
          </div>
          <div className="text-sm text-white w-full">
            {"Contract Symbol: " + dropInputs.contractSymbol}
          </div>
          <div className="text-sm text-white w-full">
            {"Contract Admin: " + dropInputs.contractAdmin}
          </div>
          <div className="text-sm text-white w-full">
            {"Contract MaxSupply: " + dropInputs.contractMaxSupply}
          </div>          
          <div className="text-sm text-white w-full">
            {"Royalties: " + dropInputs.secondaryRoyalties}
          </div>
          <div className="text-sm text-white w-full">
            {"fundsRecipient: " + dropInputs.fundsRecipient}
          </div>
          <div className="text-sm text-white w-full">
            {"salesConfig Price Ether (in wei): " + dealWithEther(dropInputs.salesConfig.priceEther)}
          </div>
          <div className="text-sm text-white w-full">
            {"salesConfig wallet cap: " + dropInputs.salesConfig.perWalletMintCap}
          </div>
          <div className="text-sm text-white w-full">
            {"salesConfig pub sale start: " + dropInputs.salesConfig.publicSaleStart}
          </div>
          <div className="text-sm text-white w-full">
            {"salesConfig pub sale end: " + dropInputs.salesConfig.publicSaleEnd}
          </div>
          <div className="text-sm text-white w-full">
            {"salesConfig presale start: " + dropInputs.salesConfig.presaleStart}
          </div>
          <div className="text-sm text-white w-full">
            {"salesConfig presale end: " + dropInputs.salesConfig.presaleEnd}
          </div>
          <div className="text-sm text-white w-full">
            {"salesConfig persale merkle root: " + dropInputs.salesConfig.presaleMerkleRoot}
          </div>                              
          <div className="text-sm text-white w-full">
            {"uriBase " + dropInputs.metadataURIBase}
          </div> 
          <div className="text-sm text-white w-full">
            {"contractURI " + dropInputs.metadtaContractURI}
          </div>  */}

        </div>
        <div className=" sm:w-6/12 sm:h-full w-full h-6/12 flex flex-row flex-wrap content-start">
          <div className="mt-20 sm:mt-10 flex flex-row justify-center h-fit w-full border-2 border-solid border-blue-500 ">
            CREATE EDITION
          </div>
          <div className="flex flex-row justify-center w-full h-fit border-2 border-white border-solid">
            <div className="flex flex-row w-full justify-center grid grid-cols-3">
              <div className="text-center ">
                CONTRACT NAME
              </div>
              <input
                className="text-black text-center bg-slate-200"
                placeholder="Input NFT Address"
                name="inputContract"
                type="text"
                value={editionInputs.contractName}
                onChange={(e) => {
                    e.preventDefault();
                    setEditionInputs(current => {
                      return {
                        ...current,
                        contractName: e.target.value
                      }
                    })
                }}
                required                    
              >
              </input>
              <button>
                HOVER FOR INFO
              </button>
            </div>            
          </div>

          <div className="flex flex-row justify-center w-full h-fit border-2 border-white border-solid">
            <div className="flex flex-row w-full justify-center grid grid-cols-3">
              <div className="text-center">
                CONTRACT SYMBOL
              </div>
              <input
                className="text-black text-center bg-slate-200"
                placeholder="Input NFT Address"
                name="inputContract"
                type="text"
                value={editionInputs.contractSymbol}
                onChange={(e) => {
                    e.preventDefault();
                    setEditionInputs(current => {
                      return {
                        ...current,
                        contractSymbol: e.target.value
                      }
                    })
                }}
                required                    
              >
              </input>
              <button>
                HOVER FOR INFO
              </button>
            </div>            
          </div>

          <div className="flex flex-row justify-center w-full h-fit border-2 border-white border-solid">
            <div className="flex flex-row w-full justify-center grid grid-cols-3">
              <div className="text-center">
                CONTRACT MAX SUPPLY
              </div>
              <input
                className="text-black text-center bg-slate-200"
                placeholder="Input NFT Address"
                name="inputContract"
                type="number"
                value={editionInputs.contractMaxSupply}
                onChange={(e) => {
                    e.preventDefault();
                    setEditionInputs(current => {
                      return {
                        ...current,
                        contractMaxSupply: e.target.value
                      }
                    })
                }}
                required                    
              >
              </input>
              <button>
                HOVER FOR INFO
              </button>
            </div>            
          </div>                

          <div className="flex flex-row justify-center w-full h-fit border-2 border-white border-solid">
            <div className="flex flex-row w-full justify-center grid grid-cols-3">
              <div className="text-center">
                SECONDARY ROYALTIES
              </div>
              <input
                className="text-black text-center bg-slate-200"
                placeholder="Input NFT Address"
                name="inputContract"
                type="number"
                value={editionInputs.secondaryRoyalties}
                onChange={(e) => {
                    e.preventDefault();
                    setEditionInputs(current => {
                      return {
                        ...current,
                        secondaryRoyalties: e.target.value
                      }
                    })
                }}
                required                    
              >
              </input>
              <button>
                HOVER FOR INFO
              </button>
            </div>            
          </div>

          <div className="flex flex-row justify-center w-full h-fit border-2 border-white border-solid">
            <div className="flex flex-row w-full justify-center grid grid-cols-3">
              <div className="text-center">
                FUNDS RECIPIENT
              </div>
              <input
                className="text-black text-center bg-slate-200"
                placeholder="Input NFT Address"
                name="inputContract"
                type="text"
                value={editionInputs.fundsRecipient}
                onChange={(e) => {
                    e.preventDefault();
                    setEditionInputs(current => {
                      return {
                        ...current,
                        fundsRecipient: e.target.value
                      }
                    })
                }}
                required                    
              >
              </input>
              <button>
                HOVER FOR INFO
              </button>
            </div>            
          </div>

          <div className="flex flex-row justify-center w-full h-fit border-2 border-white border-solid">
            <div className="flex flex-row w-full justify-center grid grid-cols-3">
              <div className="text-center">
                CONTRACT ADMIN
              </div>
              <input
                className="text-black text-center bg-slate-200"
                placeholder="Input NFT Address"
                name="inputContract"
                type="text"
                value={editionInputs.contractAdmin}
                onChange={(e) => {
                    e.preventDefault();
                    setEditionInputs(current => {
                      return {
                        ...current,
                        contractAdmin: e.target.value
                      }
                    })
                }}
                required                    
              >
              </input>
              <button>
                HOVER FOR INFO
              </button>
            </div>            
          </div>          

          <div className="flex flex-row justify-center w-full h-fit border-2 border-white border-solid">
            <div className="flex flex-row w-full justify-center grid grid-cols-3">
              <div className="text-center">
                PRICE PER MINT
              </div>
              <input
                className="text-black text-center bg-slate-200"
                placeholder="Input NFT Address"
                name="inputContract"
                type="number"
                value={editionInputs.salesConfig.priceEther}
                onChange={(e) => {
                    e.preventDefault();
                    setEditionInputs(current => {
                      return {
                        ...current,
                        salesConfig: {
                          ...current.salesConfig,
                          priceEther: e.target.value
                        }                        
                      }
                    })
                }}
                required                    
              >
              </input>
              <button>
                HOVER FOR INFO
              </button>
            </div>            
          </div>

          <div className="flex flex-row justify-center w-full h-fit border-2 border-white border-solid">
            <div className="flex flex-row w-full justify-center grid grid-cols-3">
              <div className="text-center">
                MINT CAP PER WALLET
              </div>
              <input
                className="text-black text-center bg-slate-200"
                placeholder="Input NFT Address"
                name="inputContract"
                type="number"
                value={editionInputs.salesConfig.perWalletMintCap}
                onChange={(e) => {
                    e.preventDefault();
                    setEditionInputs(current => {
                      return {
                        ...current,
                        salesConfig: {
                          ...current.salesConfig,
                          perWalletMintCap: e.target.value
                        }                        
                      }
                    })
                }}
                required                    
              >
              </input>
              <button>
                HOVER FOR INFO
              </button>
            </div>            
          </div>

          <div className="flex flex-row justify-center w-full h-fit border-2 border-white border-solid">
            <div className="flex flex-row w-full justify-center grid grid-cols-3">
              <div className="text-center">
                PUBLIC SALE START
              </div>
              <input
                className="text-black text-center bg-slate-200"
                placeholder="Input NFT Address"
                name="inputContract"
                type="number"
                value={editionInputs.salesConfig.publicSaleStart}
                onChange={(e) => {
                    e.preventDefault();
                    setEditionInputs(current => {
                      return {
                        ...current,
                        salesConfig: {
                          ...current.salesConfig,
                          publicSaleStart: e.target.value
                        }                        
                      }
                    })
                }}
                required                    
              >
              </input>
              <button>
                HOVER FOR INFO
              </button>
            </div>            
          </div>

          <div className="flex flex-row justify-center w-full h-fit border-2 border-white border-solid">
            <div className="flex flex-row w-full justify-center grid grid-cols-3">
              <div className="text-center">
                PUBLIC SALE END
              </div>
              <input
                className="text-black text-center bg-slate-200"
                placeholder="Input NFT Address"
                name="inputContract"
                type="number"
                value={editionInputs.salesConfig.publicSaleEnd}
                onChange={(e) => {
                    e.preventDefault();
                    setEditionInputs(current => {
                      return {
                        ...current,
                        salesConfig: {
                          ...current.salesConfig,
                          publicSaleEnd: e.target.value
                        }                        
                      }
                    })
                }}
                required                    
              >
              </input>
              <button>
                HOVER FOR INFO
              </button>
            </div>            
          </div>

          <div className="flex flex-row justify-center w-full h-fit border-2 border-white border-solid">
            <div className="flex flex-row w-full justify-center grid grid-cols-3">
              <div className="text-center">
                PRESALE START
              </div>
              <input
                className="text-black text-center bg-slate-200"
                placeholder="Input NFT Address"
                name="inputContract"
                type="number"
                value={editionInputs.salesConfig.presaleStart}
                onChange={(e) => {
                    e.preventDefault();
                    setEditionInputs(current => {
                      return {
                        ...current,
                        salesConfig: {
                          ...current.salesConfig,
                          presaleStart: e.target.value
                        }                        
                      }
                    })
                }}
                required                    
              >
              </input>
              <button>
                HOVER FOR INFO
              </button>
            </div>            
          </div>                 

          <div className="flex flex-row justify-center w-full h-fit border-2 border-white border-solid">
            <div className="flex flex-row w-full justify-center grid grid-cols-3">
              <div className="text-center">
                PRESALE END
              </div>
              <input
                className="text-black text-center bg-slate-200"
                placeholder="Input NFT Address"
                name="inputContract"
                type="number"
                value={editionInputs.salesConfig.presaleEnd}
                onChange={(e) => {
                    e.preventDefault();
                    setEditionInputs(current => {
                      return {
                        ...current,
                        salesConfig: {
                          ...current.salesConfig,
                          presaleEnd: e.target.value
                        }                        
                      }
                    })
                }}
                required                    
              >
              </input>
              <button>
                HOVER FOR INFO
              </button>
            </div>            
          </div>

          <div className="flex flex-row justify-center w-full h-fit border-2 border-white border-solid">
            <div className="flex flex-row w-full justify-center grid grid-cols-3">
              <div className="text-center">
                PRESALE MERKLE ROOT
              </div>
              <input
                className="text-black text-center bg-slate-200"
                placeholder="Input NFT Address"
                name="inputContract"
                type="text"
                value={editionInputs.salesConfig.presaleMerkleRoot}
                onChange={(e) => {
                    e.preventDefault();
                    setEditionInputs(current => {
                      return {
                        ...current,
                        salesConfig: {
                          ...current.salesConfig,
                          presaleMerkleRoot: e.target.value
                        }                        
                      }
                    })
                }}
                required                    
              >
              </input>
              <button>
                HOVER FOR INFO
              </button>
            </div>            
          </div>                                                                                                                     

          <div className="flex flex-row justify-center w-full h-fit border-2 border-white border-solid">
            <div className="flex flex-row w-full justify-center grid grid-cols-3">
              <div className="text-center">
                EDITION DESCRIPTION
              </div>
              <input
                className="text-black text-center bg-slate-200"
                placeholder="Input NFT Address"
                name="inputContract"
                type="text"
                value={editionInputs.editionDescription}
                onChange={(e) => {
                    e.preventDefault();
                    setEditionInputs(current => {
                      return {
                        ...current,
                        editionDescription: e.target.value
                      }
                    })
                }}
                required                    
              >
              </input>
              <button>
                HOVER FOR INFO
              </button>
            </div>            
          </div>

          <div className="flex flex-row justify-center w-full h-fit border-2 border-white border-solid">
            <div className="flex flex-row w-full justify-center grid grid-cols-3">
              <div className="text-center">
                ANIMATION URI
              </div>
              <input
                className="text-black text-center bg-slate-200"
                placeholder="Input NFT Address"
                name="inputContract"
                type="text"
                value={editionInputs.metadataAnimationURI}
                onChange={(e) => {
                    e.preventDefault();
                    setEditionInputs(current => {
                      return {
                        ...current,
                        metadataAnimationURI: e.target.value
                      }
                    })
                }}
                required                    
              >
              </input>
              <button>
                HOVER FOR INFO
              </button>
            </div>            
          </div>

          <div className="flex flex-row justify-center w-full h-fit border-2 border-white border-solid">
            <div className="flex flex-row w-full justify-center grid grid-cols-3">
              <div className="text-center">
                IMAGE URI
              </div>
              <input
                className="text-black text-center bg-slate-200"
                placeholder="Input NFT Address"
                name="inputContract"
                type="text"
                value={editionInputs.metadataImageURI}
                onChange={(e) => {
                    e.preventDefault();
                    setEditionInputs(current => {
                      return {
                        ...current,
                        metadataImageURI: e.target.value
                      }
                    })
                }}
                required                    
              >
              </input>
              <button>
                HOVER FOR INFO
              </button>
            </div>            
          </div>          
          
          <div className="flex flex-row justify-center w-full h-fit border-2 border-blue-500 border-solid">
            <button
              className="border-2 hover:bg-white hover:text-black border-solid border-blue-500 py-1 flex flex-row w-full justify-center"
              onClick={() => createEditionRinkeby()}
            >
              DEPLOY TO RINKEBY
            </button>
            <button
              className="border-2 border-l-0 hover:bg-white hover:text-black border-solid border-blue-500 py-1  flex flex-row w-full justify-center"
              onClick={() => createEditionMainnet()}
            >
              DEPLOY TO MAINNET
            </button>              
          </div>                       
                                                                                  
          {/* <div className="text-sm text-white w-full">
            {"Contract Name: " + editionInputs.contractName}
          </div>
          <div className="text-sm  text-white w-full">
            {"Contract Symbol: " + editionInputs.contractSymbol}
          </div>
          <div className="text-sm  text-white w-full">
            {"Contract MaxSupply: " + editionInputs.contractMaxSupply}
          </div>        
          <div className="text-sm  text-white w-full">
            {"Royalties: " + editionInputs.secondaryRoyalties}
          </div>
          <div className="text-sm  text-white w-full">
            {"fundsRecipient: " + editionInputs.fundsRecipient}
          </div>
          <div className="text-sm  text-white w-full">
            {"Contract Admin: " + editionInputs.contractAdmin}
          </div>          
          <div className="text-sm  text-white w-full">
            {"salesConfig Price Ether (in wei): " + dealWithEther(editionInputs.salesConfig.priceEther)}
          </div>
          <div className="text-sm  text-white w-full">
            {"salesConfig wallet cap: " + editionInputs.salesConfig.perWalletMintCap}
          </div>
          <div className="text-sm text-white w-full">
            {"salesConfig pub sale start: " + editionInputs.salesConfig.publicSaleStart}
          </div>
          <div className="text-sm text-white w-full">
            {"salesConfig pub sale end: " + editionInputs.salesConfig.publicSaleEnd}
          </div>
          <div className="text-sm text-white w-full">
            {"salesConfig presale start: " + editionInputs.salesConfig.presaleStart}
          </div>
          <div className="text-sm text-white w-full">
            {"salesConfig presale end: " + editionInputs.salesConfig.presaleEnd}
          </div>
          <div className="text-sm text-white w-full">
            {"salesConfig persale merkle root: " + editionInputs.salesConfig.presaleMerkleRoot}
          </div>                              
          <div className="text-sm text-white w-full">
            {"Edition Description " + editionInputs.editionDescription}
          </div> 
          <div className="text-sm text-white w-full">
            {"Animation URI " + editionInputs.metadataAnimationURI}
          </div> 
          <div className="text-sm text-white w-full">
            {"Image URI URI " + editionInputs.metadataImageURI}
          </div> */}

        </div>
      </main>
    </div>
  )
}

export default Create
