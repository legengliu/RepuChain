import React, { Component } from 'react'
import contract from 'truffle-contract'
import RepContract from '../build/contracts/Reputation.json'
import getWeb3 from './utils/getWeb3'
import Rank from './Ranking'

import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      formValue1: '',
      formValue2: '',
      allRatings: [],
      prRankings: [],
      web3: null,
      accounts: [],
      ReputationContract: null
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

    const Reputation = contract(RepContract);
    Reputation.setProvider(this.state.web3.currentProvider);

    // debugging
    // console.log("web3 object: ")
    // console.log(this.state.web3)
    // console.log("Accounts: ")
    // console.log(this.state.web3.eth.accounts)
    console.log(web3.eth.accounts);

    this.setState({
      accounts: web3.eth.accounts,
      ReputationContract: Reputation
    })
  }

  async getRating(index) {
    let repInstance = await this.state.ReputationContract.deployed();
    let n = await repInstance.getRating(index);
    return n;
  }

  async getNumRatings() {
    let repInstance = await this.state.ReputationContract.deployed();
    let n = await repInstance.getNumRatings();
    return n;
  }

  async rate(src, dst) {
    let repInstance = await this.state.ReputationContract.deployed();
    console.log(repInstance);
    console.log('Rating: from: ' + src + ' to: ' + dst);
    let rated = await repInstance.rate(dst, {from: src, gas: 1000000});
    return rated;
  }

  handleChange1(event) {
    let addr = event.target.value.trim();
    this.setState({formValue1: addr});
  }

  handleChange2(event) {
    let addr = event.target.value.trim();
    this.setState({formValue2: addr});
  }

  submitRating(event) {
    event.preventDefault();
    
    if (this.checkValidAddress()) {
      this.rate(this.state.formValue1, this.state.formValue2)
      .then(res => {
        if (res.logs[0].args.success) {
          alert('Rating successful.');
        }
      });
    }
  }

  checkValidAddress() {
    if (!this.state.web3.isAddress(this.state.formValue1)) {
      alert(this.state.formValue1 + ' is not a valid Ethereum address.');
      return false;
    }
    if (!this.state.web3.isAddress(this.state.formValue2)) {
      alert(this.state.formValue2 + ' is not a valid Ethereum address.');
      return false;
    }
    return true;
  }

  async getRatings() {
    let num = await this.getNumRatings();
    let tempAll = [];
    for (let i = 0; i < num; i++) {
      let rating = await this.getRating(i);
      tempAll.push(rating);
    }
    this.setState({allRatings: tempAll});
  }

  rankRatings() {
    let ratings = this.state.allRatings;
    let PRResults = Rank(ratings);
    // sort by descending PR score
    PRResults.sort((a, b) => {
      return b[1] - a[1];
    });
    this.setState({prRankings: PRResults});
  }

  renderAllRatings() {
      const listItems = this.state.allRatings.map((rating, index) => 
        <li key={index}> From: {rating[0]} To: {rating[1]} </li>
      );
      return (
        <div >
          {listItems}
        </div>
      );
  }

  renderPRRankings() {
    const prItems = this.state.prRankings.map((ranking, index) => 
        <li key={index}> Address: {ranking[0]} Ranking: {ranking[1]} </li>
      );
      return (
        <div >
        {prItems}
        </div>
      );
  }

  render() {
    return (
      <div className="App">
              <h1>RepuChain</h1>
              <p className="subtitle">case study in a decentralized reputation system</p>
            <div >
              Submit a rating for an Ethereum address:
            </div>
            <form onSubmit={e => this.submitRating(e)}>
              <div>
                <label> From:&nbsp;
                  <input type="text" value={this.state.formValue1} onChange={e => this.handleChange1(e)} placeholder="address" />
                </label>
              </div>
              <div>
              <label> To:&nbsp;
                <input type="text" value={this.state.formValue2} onChange={e => this.handleChange2(e)} placeholder="address" />
              </label>
              </div>
              <input type="submit" value="Rate!" />
              
            </form>
            <div className="allRatings">
              <button className="getRatings" onClick={() => this.getRatings()}> Get all ratings </button>
              <button className="rankRatings" onClick={() => this.rankRatings()}>
               Rank all addresses </button>
                {this.renderAllRatings()}
                {this.renderPRRankings()}
            </div>
      </div>
    );
  }
}

export default App
