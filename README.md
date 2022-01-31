# The Energi BlockChain Explorer

A simple React web application built with Gatsby, Material UI that connects to Ethereum blockchain using Web3 library, and displays the latest:

- Block number,
- Number of transactions,
- Miner (address that mined the block),
- Total difficulty,
- Lists all the latest transactions...

## Thoughts

This was a fun project to build as it afforded me the opportunity to extensively work and interact with Ethereum Blockchain APIs using web3Js, React and Metamask. However, I encountered some unique runtime or development bugs relating to either Metamask, web3 and/or Ethereum blockchain that is not so intuitively solved, and any solutions could harldy be found anywhere online.
<br>

## What I hope to improve 
 - Make displayed data more descriptive.
 - Truncate long hashes - expand on click.
 - Display more information when a transaction is clicked.
 - etc...

# How to run project

## Install dependencies:

```
 yarn install
```

## Build project

This sample uses the Gatsby framework to produce JavaScript that runs in modern browsers.

To build the JavaScript version of your component:

```
yarn build
```

## Dev Server

To run the dev server and open the project in a new browser tab:

```
yarn start
```

Navigate to your browser tab where a development HTML file located at `/index.html` will open. You can view at http://localhost:8000/.

## Testing

Tests can be run with the `test` script:

```
yarn test
```
