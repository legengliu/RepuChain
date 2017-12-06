# RepuChain: A case study in decentralized citizen reputation systems on blockchain

## Overview
Global citizen reputation systems in which everyone can give a rating to someone else has been explored in dystopian science fiction (Black Mirror), social media (Peeple app), and even by states (China's proposed "social credit" system). Additionally, many companies and websites often have internal rating systems for their users, customers, and vendors (Amazon, Yelp, StackOverflow, etc.).

However, current existing reputation/ranking systems are mostly centralized, and data is collected (and can be manipulated and/or censored) by the owners of the system.

For this final project, I will build a prototype of a decentralized reputation system on the Ethereum blockchain in which any address can rate any other address. 

I recognize the potential negative impact of any such reputation system, such as bullying, harassment, censorship, control, and ranking manipulation, and this project is done simply as a case study to explore those potential downsides.


## Functionality
This project is split into two components: 

### Backend

First, an on-chain smart contract, written in Solidity, keeps track of the reputations associated with each Ethereum address and allow any address to send a boolean rating to any other address.


### Frontend
A simple frontend UI, built with React, will allow easy interaction with the core backend. 

Through the web browser interface, anyone can send a rating to the core Ethereum contract, see all the ratings, as well as check the "PageRank" score of each Ethereum address. 

The bottom line is that a high-ranking address's ranking of another address will carry more weight than that of a low-ranking address. Small fees associated with Ethereum smart contract transactions will disincentivize bad actors from spamming and manipulating the system.

## Check it out

This has not been deployed, so to check it out locally, clone the repo and run:

```
$ npm install
```

First, in a new terminal window, make sure testrpc is running:

```
$ testrpc
```

Compile and migrate the contracts:

```
$ truffle compile
$ truffle migrate
```


To check out the frontend on localhost:

```
$ npm run start
```


To run tests (optional):

```
$ truffle test
```

