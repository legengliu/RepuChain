import React, { Component } from 'react'
import contract from 'truffle-contract'
import RepContract from '../build/contracts/Reputation.json'
import getWeb3 from './utils/getWeb3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    let web3 = this.state.web3;
    this.state.web3.eth.defaultAccount = this.state.web3.eth.accounts[0];

    const Reputation = contract(RepContract)
    Reputation.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions
    let repInstance

    // debugging
    // console.log("web3 object: ")
    // console.log(this.state.web3)
    // console.log("Accounts: ")
    // console.log(this.state.web3.eth.accounts)

    let accounts = this.state.web3.eth.accounts;

    async function rate(src, dst) {
      let repInstance = await Reputation.deployed();
      console.log(repInstance);
      console.log('Rating address ' + dst + ' from address ' + src);
      let rated = await repInstance.rate(dst, {from: src, gas: 1000000});
      return rated;
    }

    async function getNodeAtIndex(index) {
      let repInstance = await Reputation.deployed();
      let n = await repInstance.getNodeAtIndex(index);
      return n;
    }
    
    rate(accounts[0], accounts[1])
    .then(res => console.log(res.logs[0].args.success));

    // getNodeAtIndex(0)
    // .then(res => console.log(web3.toHex(res)));

  /*
   async function getRatings(addr) {
      console.log(typeof addr);
      console.log(addr);
      let repInstance = await Reputation.deployed();
      console.log(repInstance);
      let rating = await repInstance.getOutgoingRatings(addr);
      console.log(typeof rating);
      console.log(rating);
      return rating
    }
    */


    // Reputation.deployed().then((instance) => {
    //   repInstance = instance;
    //   return repInstance.getOutgoingRating.call(accounts[6], 0);
    // }).then((result) => {
    //    console.log(web3.toHex(result));
    // });

    // let numNodes = await repInstance.numNodes({from: accounts[4]});
    //   console.log(web3.toHex(numNodes));
    //   let OutgoingRatings = await repInstance.getOutgoingRatings(src);
    //   console.log(OutgoingRatings);


    // getRatings(accounts[6])
    // .then(res => console.log(res));
  }

  render() {
    return (
      <div className="App">
        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>RepuChain</h1>
              <p>case study in a decentralized reputation system</p>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
