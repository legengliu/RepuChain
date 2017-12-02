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
      console.log(repInstance)

      let rated = await repInstance.rate(dst, {from: src});
      return rated;
    }

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

    rate(accounts[6], accounts[9])
    .then(res => console.log(res.logs[0].args.success));

    getRatings(accounts[6])
    .then(res => console.log(res));
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
        </nav>
        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Good to Go!</h1>
              <p>Your Truffle Box is installed and ready.</p>
              <h2>Smart Contract Example</h2>
              <p>If your contracts compiled and migrated successfully, below will show a stored value of 5 (by default).</p>
              <p>Try changing the value stored on <strong>line 59</strong> of App.js.</p>
              <p>The stored value is: {this.state.storageValue}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
