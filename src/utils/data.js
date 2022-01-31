export const latestBlockHeaders = [
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
]

export const latestTransactionsHeaders = [
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
    format: value => value.toLocaleString("en-US"),
  },
  {
    id: "to",
    label: "To",
    minWidth: 100,
    align: "center",
  },
  {
    id: "r",
    label: "R",
    minWidth: 100,
    align: "center",
  },
  {
    id: "s",
    label: "S",
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
]
