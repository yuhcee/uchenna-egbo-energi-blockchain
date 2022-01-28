import React, { useState, useEffect } from "react"
import Web3 from "web3"
import { numberWithCommas, timeStampToSeconds } from "../utils"
// import { timeStampToSeconds } from '../utils/formatToSeconds'

export const TransactionContext = React.createContext()
const { ethereum } = window
const web3Instance = new Web3(Web3.givenProvider || ethereum)

export const TransactionProvider = ({ children }) => {
  const [connectedAccount, setConnectedAccount] = useState("")
  const [ethStats, setEthStats] = useState([])

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) {
        return alert("Please install Metamask")
      }

      const accounts = await ethereum.request({ method: "eth_accounts" })

      if (accounts.length) {
        setConnectedAccount(accounts[0])
      } else {
        console.log("No accounts found.")
      }
    } catch (error) {
      console.log(error)
      throw new Error("No ethereum object.")
    }
  }

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        return alert("Please install Metamask")
      }

      const [account] = await ethereum.request({
        method: "eth_requestAccounts",
      })
      setConnectedAccount(account)
    } catch (error) {
      console.log(error)
      throw new Error("No ethereum object.")
    }
  }

  const getEthStats = async () => {
    try {
      if (!ethereum) {
        return alert("Please install Metamask")
      }

      const currentBlock = await web3Instance.eth.getBlock("latest", true)
      //   console.log(currentBlock)

      if (currentBlock.number !== null) {
        //only when block is mined not pending
        const previousBlock = await web3Instance.eth.getBlock(
          currentBlock.parentHash
        )
        if (previousBlock.number !== null) {
          const timeTaken = currentBlock.timestamp - previousBlock.timestamp
          const miner = currentBlock.miner
          const totalDifficulty = numberWithCommas(currentBlock.totalDifficulty)
          const transactionCount = currentBlock.transactions.length
          const tps = transactionCount / timeTaken
          const timestamp = timeStampToSeconds(currentBlock.timestamp)

          setEthStats(ethStats => [
            ...ethStats,
            {
              currentBlockNumber: currentBlock.number,
              timestamp,
              transactionCount,
              miner,
              totalDifficulty,
              timeTaken,
              tps,
            },
          ])
        }
      }

    } catch (error) {
      console.log(error)
      throw new Error("No ethereum object.")
    }
  }

  //   const printStats = async () => {
  //     const stats = await getEthStats()
  //     if (stats !== null) {
  //       const {
  //         currentBlockNumber,
  //         timestamp,
  //         transactionCount,
  //         timeTaken,
  //         tps,
  //         totalDifficulty,
  //       } = stats
  //       console.log(
  //         `Current Block (#${currentBlockNumber}) : ${timestamp} seconds ago:
  //         ${transactionCount} txns in ${timeTaken} seconds at the rate of ${tps} transactions/seconds.
  //         Total Difficulty of ${totalDifficulty}`
  //       )
  //     }
  //   }
  //   printStats()

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  return (
    <TransactionContext.Provider
      value={{ connectWallet, connectedAccount, getEthStats, ethStats }}
    >
      {children}
    </TransactionContext.Provider>
  )
}
