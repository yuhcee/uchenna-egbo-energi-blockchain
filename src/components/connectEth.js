import React, { useEffect, useState } from "react"
import Web3 from "web3"

import { TransactionContext } from "../context/TransactionContext"
import { shortenAddress } from "../utils"
import { useInterval } from "../hooks/useInterval"

import ButtonComp from "./button"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"

import AddCircleIcon from "@mui/icons-material/AddCircle"
import SendIcon from "@mui/icons-material/Send"
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled"

const { ethereum } = window
const web3Instance = new Web3(Web3.givenProvider || ethereum)

const ConnectEth = () => {
  const { connectWallet, connectedAccount, getEthStats } =
    React.useContext(TransactionContext)
  const [currentBlock, setCurrentBlock] = useState({})
  const [isRequesting, setIsRequesting] = useState(true)
  let [delay, setDelay] = useState(5000)

  useInterval(
    async () => {
      let block = await web3Instance.eth.getBlock("latest", true)
      if (block.number !== currentBlock.number) {
        return setCurrentBlock(block)
      }
    },
    isRequesting ? delay : null
  )

  useEffect(() => {
    getEthStats(currentBlock)
  }, [currentBlock])

  return (
    <div style={{ width: "100%", marginTop: `20px` }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: 0,
          m: 0,
          bgcolor: "background.red",
          borderRadius: 1,
        }}
      >
        {!connectedAccount && (
          <ButtonComp
            variant={"contained"}
            startIcon={<AddCircleIcon />}
            handleClick={() => connectWallet()}
            buttonText={"Connect Wallet"}
          />
        )}
        {
          <ButtonComp
            variant={"contained"}
            endIcon={!isRequesting ? <SendIcon /> : <PauseCircleFilledIcon />}
            handleClick={() => {
              setIsRequesting(prev => !prev)
              setDelay(5000)
            }}
            buttonText={!isRequesting ? "Resume Requests" : "Pause Requests"}
          />
        }

        {connectedAccount && (
          <Paper elevation={2} style={{ padding: `7px 4px` }}>
            <strong>Connected Account : </strong>
            {shortenAddress(connectedAccount)}
          </Paper>
        )}
      </Box>
    </div>
  )
}

export default ConnectEth
