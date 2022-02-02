import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
// import Web3 from "web3"

import { TransactionContext } from "../context/TransactionContext"
import { shortenAddress } from "../utils"
import { useInterval } from "../hooks/useInterval"

import ButtonComp from "./button"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"

import AddCircleIcon from "@mui/icons-material/AddCircle"
import SendIcon from "@mui/icons-material/Send"
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled"

const ConnectEth = () => {
  const txContext = React.useContext(TransactionContext)
  const [currentBlock, setCurrentBlock] = useState({})
  const [isRequesting, setIsRequesting] = useState(true)
  const [br, setBr] = useState(false)
  let [delay, setDelay] = useState(5000)

  const getBlockNumber = async () => {
    const { ethereum } = window
    const web3Instance = new window.Web3(window.Web3.givenProvider || ethereum)
    let block = await web3Instance.eth.getBlock("latest", true)
    if (block.number !== currentBlock.number) {
      return setCurrentBlock(block)
    }
  }

  useEffect(() => {
    const isBrowser = typeof window !== "undefined"
    setBr(isBrowser)
  }, [])

  useInterval(
    () => {
      if (br) getBlockNumber()
    },
    isRequesting ? delay : null
  )

  useEffect(() => {
    br && txContext?.getEthStats(currentBlock)
  }, [currentBlock])

  return (
    <div style={{ width: "100%", marginTop: `20px` }}>
      <Helmet>
        <script
          type="text/javascript"
          src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"
        />
      </Helmet>
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
        {br && (
          <>
            {!txContext?.connectedAccount && (
              <ButtonComp
                variant={"contained"}
                startIcon={<AddCircleIcon />}
                handleClick={() => txContext?.connectWallet()}
                buttonText={"Connect Wallet"}
              />
            )}
            {
              <ButtonComp
                variant={"contained"}
                endIcon={
                  !isRequesting ? <SendIcon /> : <PauseCircleFilledIcon />
                }
                handleClick={() => {
                  setIsRequesting(prev => !prev)
                  setDelay(5000)
                }}
                buttonText={
                  !isRequesting ? "Resume Requests" : "Pause Requests"
                }
              />
            }

            {txContext?.connectedAccount && (
              <Paper elevation={2} style={{ padding: `7px 4px` }}>
                <strong>Connected Account : </strong>
                {shortenAddress(txContext?.connectedAccount)}
              </Paper>
            )}
          </>
        )}
      </Box>
    </div>
  )
}

export default ConnectEth
