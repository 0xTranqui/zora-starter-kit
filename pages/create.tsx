import { NextPage } from "next"
import { Header } from "../components/Header"
import { useState } from "react"
import { useContractWrite } from "wagmi"
import { utils } from "ethers"

const ZoraNFTCreatorProxy_ABI = require("../node_modules/@zoralabs/nft-drop-contracts/dist/artifacts/ZoraNFTCreatorV1.sol/ZoraNFTCreatorV1.json")

const Create: NextPage = () => {

  const [dropInputs, setDropInputs] = useState({
    contractName: "",
    contractSymbol: "",
    contractAdmin: "",
    contractMaxSupply: "",
    secondaryRoyalties: "",
    fundsRecipient: "",
    salesConfig: {
      priceEther: "0.001", // ETH
      perWalletMintCap: "",
      publicSaleStart: "",
      publicSaleEnd: "",
      presaleStart: "",
      presaleEnd: "",
      presaleMerkleRoot: ""
    },
    metadataURIBase: "",
    metadtaContractURI: "",
  })
  
  const { data, isError, isLoading, write } = useContractWrite({
    addressOrName: '0x2d2acD205bd6d9D0B3E79990e093768375AD3a30',
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
        utils.parseEther(dropInputs.salesConfig.priceEther),
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

  return (
    <div className="min-h-screen h-screen">
      <Header />
      <main className="border-red-500 border-2 border-solid text-white h-full flex flex-col flex-wrap">
        <div className="h-full border-2 border-solid border-blue-500 w-6/12 flex flex-row flex-wrap content-start">
          <div className="mt-10 flex flex-row justify-center h-fit w-full border-2 border-solid border-red-500 ">
            CREATE DROP
          </div>
          
          
          
          <div className="flex flex-row justify-center w-full h-fit border-2 border-red-500 border-solid">
            <div className="flex flex-row w-full justify-center grid grid-cols-3">
              <div className="text-center ">
                CONTRACT NAME:
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

          <div className="flex flex-row justify-center w-full h-fit border-2 border-red-500 border-solid">
            <div className="flex flex-row w-full justify-center grid grid-cols-3">
              <div className="text-center">
                CONTRACT SYMBOL:
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

          <div className="flex flex-row justify-center w-full h-fit border-2 border-red-500 border-solid">
            <div className="flex flex-row w-full justify-center grid grid-cols-3">
              <div className="text-center">
                CONTRACT ADMIN:
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

          <div className="flex flex-row justify-center w-full h-fit border-2 border-red-500 border-solid">
            <div className="flex flex-row w-full justify-center grid grid-cols-3">
              <div className="text-center">
                CONTRACT MAX SUPPLY:
              </div>
              <input
                className="text-black text-center bg-slate-200"
                placeholder="Input NFT Address"
                name="inputContract"
                type="text"
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
          
          <div className="flex flex-row justify-center w-full h-fit border-2 border-red-500 border-solid">
            <div className="flex flex-row w-full justify-center grid grid-cols-3">
              <div className="text-center">
                SECONDARY ROYALTIES:
              </div>
              <input
                className="text-black text-center bg-slate-200"
                placeholder="Input NFT Address"
                name="inputContract"
                type="text"
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

          <div className="flex flex-row justify-center w-full h-fit border-2 border-red-500 border-solid">
            <div className="flex flex-row w-full justify-center grid grid-cols-3">
              <div className="text-center">
                FUNDS RECIPIENT:
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

          <div className="flex flex-row justify-center w-full h-fit border-2 border-red-500 border-solid">
            <div className="flex flex-row w-full justify-center grid grid-cols-3">
              <div className="text-center">
                SALES CONFIG price:
              </div>
              <input
                className="text-black text-center bg-slate-200"
                placeholder="Input NFT Address"
                name="inputContract"
                type="text"
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

          <div className="flex flex-row justify-center w-full h-fit border-2 border-red-500 border-solid">
            <div className="flex flex-row w-full justify-center grid grid-cols-3">
              <div className="text-center">
                SALES CONFIG wallet cap:
              </div>
              <input
                className="text-black text-center bg-slate-200"
                placeholder="Input NFT Address"
                name="inputContract"
                type="text"
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

          <div className="flex flex-row justify-center w-full h-fit border-2 border-red-500 border-solid">
            <div className="flex flex-row w-full justify-center grid grid-cols-3">
              <div className="text-center">
                SALES CONFIG pubsale start:
              </div>
              <input
                className="text-black text-center bg-slate-200"
                placeholder="Input NFT Address"
                name="inputContract"
                type="text"
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

          <div className="flex flex-row justify-center w-full h-fit border-2 border-red-500 border-solid">
            <div className="flex flex-row w-full justify-center grid grid-cols-3">
              <div className="text-center">
                SALES CONFIG pubsale end:
              </div>
              <input
                className="text-black text-center bg-slate-200"
                placeholder="Input NFT Address"
                name="inputContract"
                type="text"
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

          <div className="flex flex-row justify-center w-full h-fit border-2 border-red-500 border-solid">
            <div className="flex flex-row w-full justify-center grid grid-cols-3">
              <div className="text-center">
                SALES CONFIG presale start:
              </div>
              <input
                className="text-black text-center bg-slate-200"
                placeholder="Input NFT Address"
                name="inputContract"
                type="text"
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

          <div className="flex flex-row justify-center w-full h-fit border-2 border-red-500 border-solid">
            <div className="flex flex-row w-full justify-center grid grid-cols-3">
              <div className="text-center">
                SALES CONFIG presale end:
              </div>
              <input
                className="text-black text-center bg-slate-200"
                placeholder="Input NFT Address"
                name="inputContract"
                type="text"
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

          <div className="flex flex-row justify-center w-full h-fit border-2 border-red-500 border-solid">
            <div className="flex flex-row w-full justify-center grid grid-cols-3">
              <div className="text-center">
                SALES CONFIG presale merkle:
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

          <div className="flex flex-row justify-center w-full h-fit border-2 border-red-500 border-solid">
            <div className="flex flex-row w-full justify-center grid grid-cols-3">
              <div className="text-center">
                URI BASE:
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

          <div className="flex flex-row justify-center w-full h-fit border-2 border-red-500 border-solid">
            <div className="flex flex-row w-full justify-center grid grid-cols-3">
              <div className="text-center">
                CONTRACT URI:
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
          
          <div className="flex flex-row justify-center w-full h-fit border-2 border-red-500 border-solid">
            <button
              className="flex flex-row w-full justify-center"
              onClick={() => write()}
            >
              SEND CREATE DROP TXN
            </button>            
          </div>                       
                                                                                                                                  

          <div className="text-white w-full">
            {"Contract Name: " + dropInputs.contractName}
          </div>
          <div className="text-white w-full">
            {"Contract Symbol: " + dropInputs.contractSymbol}
          </div>
          <div className="text-white w-full">
            {"Contract Admin: " + dropInputs.contractAdmin}
          </div>
          <div className="text-white w-full">
            {"Contract MaxSupply: " + dropInputs.contractMaxSupply}
          </div>          
          <div className="text-white w-full">
            {"Royalties: " + dropInputs.secondaryRoyalties}
          </div>
          <div className="text-white w-full">
            {"fundsRecipient: " + dropInputs.fundsRecipient}
          </div>
          <div className="text-white w-full">
            {"salesConfig Price Ether: " + utils.parseEther(dropInputs.salesConfig.priceEther)}
          </div>
          <div className="text-white w-full">
            {"salesConfig wallet cap: " + dropInputs.salesConfig.perWalletMintCap}
          </div>
          <div className="text-white w-full">
            {"salesConfig pub sale start: " + dropInputs.salesConfig.publicSaleStart}
          </div>
          <div className="text-white w-full">
            {"salesConfig pub sale end: " + dropInputs.salesConfig.publicSaleEnd}
          </div>
          <div className="text-white w-full">
            {"salesConfig presale start: " + dropInputs.salesConfig.presaleStart}
          </div>
          <div className="text-white w-full">
            {"salesConfig presale end: " + dropInputs.salesConfig.presaleEnd}
          </div>
          <div className="text-white w-full">
            {"salesConfig persale merkle root: " + dropInputs.salesConfig.presaleMerkleRoot}
          </div>                              


          <div className="text-white w-full">
            {"uriBase " + dropInputs.metadataURIBase}
          </div> 
          <div className="text-white w-full">
            {"contractURI " + dropInputs.metadtaContractURI}
          </div> 

        </div>
        <div className="h-full border-2 border-solid border-yellow-600 self-center w-6/12">
          <div className="mt-10 flex flex-row justify-center h-fit w-full border-2 border-solid border-red-500 ">
            CREATE EDITION
          </div>
        </div>
      </main>
    </div>
  )
}

export default Create




// import type { NextPage } from 'next'
// import { Header } from '../components/Header'
// import CreateDropForm from '../components/CreateDropForm'
// import { useState } from 'react';

// const Create: NextPage = () => {
//   let [dropForm, setDropForm] = useState(false);

//   const [minting, setMinting] = useState([]);
//   console.log(minting);
//   return (
//     <div className="pt-16 px-8">
//     <Header />


//       {dropForm && (
//         <CreateDropForm
//           minting={minting}
//           setDropForm={setDropForm}
//           dropForm={dropForm}
//           setMinting={setMinting}
//         />
//       )}
//       <button
//         className="bg-blue-600 text-white rounded-xl px-8 py-2 mt-4 hover:bg-blue-800"
//         onClick={() => setDropForm(true)}
//       >
//         + Add Track
//       </button>
//     </div>
//   );
// };

// export default Create
