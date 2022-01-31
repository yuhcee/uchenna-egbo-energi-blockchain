import React from "react"
import StickyHeadTable from "./table"
import { latestBlockHeaders, latestTransactionsHeaders } from "../utils/data"
import { TransactionContext } from "../context/TransactionContext"

const TransactionTable = () => {
  const { ethStats } = React.useContext(TransactionContext)

  const getAllTransactions = () => {
    let allTransactions = []
    if (ethStats.length) {
      for (let { transactions } of ethStats) {
        if (transactions.length) {
          allTransactions = [...allTransactions, ...transactions]
          allTransactions.sort((a, b) => (b.gasPrice > a.gasPrice ? 1 : -1))
        }
      }
    }
    return allTransactions
  }
  //
  const latestTransactions = getAllTransactions()

  return (
    <>
      <StickyHeadTable
        tableTitle={"Latest Blocks"}
        tableHead={latestBlockHeaders}
        tableData={ethStats}
      />

      <StickyHeadTable
        tableTitle={"Latest Transactions"}
        tableHead={latestTransactionsHeaders}
        tableData={latestTransactions}
      />
    </>
  )
}

export default TransactionTable
