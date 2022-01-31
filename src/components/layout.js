import React from "react"
import PropTypes from "prop-types"

import Header from "./header"
import "./layout.css"
import ConnectEth from "./connectEth"
import TransactionTable from "./TransactionsTable"

const Layout = ({ children }) => {
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
          <ConnectEth />
          <TransactionTable />
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
