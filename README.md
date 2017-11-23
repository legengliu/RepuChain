# RepuChain: A case study in decentralized citizen reputation systems on blockchain

## Overview
Global citizen reputation systems in which everyone can give a rating to someone else has been explored in dystopian science fiction (Black Mirror), social media (Peeple app), and even by states (China's proposed "social credit" system). Additionally, many companies and websites often have internal rating systems for their users, customers, and vendors (Amazon, Yelp, StackOverflow, etc.).

However, current existing reputation/ranking systems are mostly centralized, and data is collected (and can be manipulated and/or censored) by the owners of the system.

For this final project, I will build a prototype of a decentralized reputation system on the Ethereum blockchain in which any address can rate any other address. 

I recognize the potential negative impact of any such reputation system, such as bullying, harassment, censorship, control, and ranking manipulation, and this project is done simply as a case study to explore those potential downsides.


## Functionality

### Backend

The core of this project is split into two components: 

First, on-chain smart contract(s) will keep track of the reputations associated with each Ethereum address and allow any address to check and rate the reputation of any other address. The smart contract(s) will call the off-chain algorithm to compute the resulting reputations.

Second, an off-chain ranking algorithm will do the actual computation to find the reputation of each address. This algorithm will utilize existing libraries, or will be based on open-source implementations of website-ranking algorithms or other peer-to-peer ranking algorithms (TBD). 

The bottom line is that a high-ranking address's ranking of another address will carry more weight than that of a low-ranking address. Small fees associated with Ethereum smart contract transactions will disincentivize bad actors from spamming and manipulating the system.

### Frontend
A simple frontend UI, built with React, will allow easy interaction with the core backend.

