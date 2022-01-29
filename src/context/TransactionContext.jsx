import React, { useState, useEffect } from "react"
import Web3 from "web3"
import { numberWithCommas, timeStampToSeconds } from "../utils"

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

  const getEthStats = async currentBlock => {
    try {
      if (!ethereum) {
        return alert("Please install Metamask")
      }
      if (!currentBlock) {
        console.log("No block object received")
      }
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
          const transactions = currentBlock.transactions
          //   const tps = transactionCount / timeTaken
          const timestamp = timeStampToSeconds(currentBlock.timestamp)

          setEthStats(ethStats => [
            ...ethStats,
            {
              currentBlockNumber: currentBlock.number,
              timestamp,
              transactionCount,
              miner,
              totalDifficulty,
              transactions,
              timeTaken,
            },
          ])
        }
      }
    } catch (error) {
      console.log(error)
      throw new Error("No ethereum object.")
    }
  }

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
