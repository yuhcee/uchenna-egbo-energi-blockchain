import React from "react"
import PropTypes from "prop-types"
import { TransactionContext } from "../context/TransactionContext"

import Header from "./header"
import "./layout.css"
import ConnectEth from "./connectEth"
import StickyHeadTable from "./table"

const Layout = ({ children }) => {
  const { ethStats } = React.useContext(TransactionContext)

  const getAllTransactions = () => {
    let allTransactions = []
    if (ethStats.length) {
      for (let { transactions } of ethStats) {
        if (transactions.length) {
          allTransactions = [...allTransactions, ...transactions]
          allTransactions.sort((a, b) => b.gasPrice - a.gasPrice)
        }
      }
    }
    return allTransactions
  }

  const latestTrasactions = getAllTransactions()

  return (
    <>
      <Header siteTitle={`Energi`} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 1080,
          height: `100vh`,
        }}
      >
        <main>
          {children}
          {<ConnectEth />}
          <StickyHeadTable
            tableTitle={"Latest Blocks"}
            tableHead={[
              {
                id: "currentBlockNumber",
                label: "Block Number",
                minWidth: 170,
              },
              { id: "miner", label: "Miner", minWidth: 170 },
              {
                id: "transactionCount",
                label: "Number Of Transactions",
                minWidth: 170,
                align: "center",
              },
              {
                id: "totalDifficulty",
                label: "Total Difficulty",
                minWidth: 170,
                align: "right",
                format: value => value.toLocaleString("en-US"),
              },
            ]}
            tableData={ethStats}
          />

          <StickyHeadTable
            tableTitle={"Latest Transactions"}
            tableHead={[
              { id: "blockNumber", label: "Block Number", minWidth: 100 },
              { id: "blockHash", label: "Block Hash", minWidth: 50 },
              {
                id: "from",
                label: "From",
                minWidth: 100,
                align: "center",
              },
              {
                id: "gasPrice",
                label: "Gas Price",
                minWidth: 100,
                align: "center",
              },
              {
                id: "to",
                label: "To",
                minWidth: 100,
                align: "center",
              },
              {
                id: "r",
                label: "r",
                minWidth: 100,
                align: "center",
              },
              {
                id: "s",
                label: "s",
                minWidth: 100,
                align: "center",
              },
              {
                id: "gas",
                label: "Gas",
                minWidth: 100,
                align: "center",
                format: value => value.toLocaleString("en-US"),
              },
              {
                id: "hash",
                label: "Hash",
                minWidth: 100,
                align: "center",
              },
            ]}
            tableData={latestTrasactions}
          />
        </main>
        <footer
          style={{
            marginTop: `2rem`,
            marginBottom: `2rem`,
          }}
        >
          © {new Date().getFullYear()}, Built with ❤️
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a> by {""}
          <a href="https://www.github.com/yuhcee">yuhcee</a>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
