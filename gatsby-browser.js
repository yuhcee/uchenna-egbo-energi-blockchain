import React from "react"

import { TransactionProvider } from "./src/context/TransactionContext"

export const wrapRootElement = ({ element }) => (
  <TransactionProvider>{element}</TransactionProvider>
)
