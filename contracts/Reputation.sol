pragma solidity ^0.4.15;

import "./ReputationDB.sol";

contract Reputation {

	address owner;
	// keeps an array of addresses that one has rated
	mapping (address => mapping (address => bool)) ratingNetwork;

	function Reputation() {
		owner = msg.sender;
		db = new ReputationDB(this);
	}

	function rate(address toRate) public {
		require(toRate != 0x0);
		require(!checkAlreadyRated(msg.sender, toRate));
		// TODO
		/* 
		Considerations:
		1. What happens if an unrated address wants to rate another address
		2. What happens in the beginning when all addresses are unrated?
		should we give addresses an initial non-zero rating?
		3. How to call off-chain algorithm
		*/

	}

	/*
	 * Only allows rating an address one time, for now.
	*/
	function checkAlreadyRated(address rater, address toRate) constant {
		// not sure if this would work
		return ratingNetwork[rater][toRate];
	}

	/*
	 * Anyone can check the reputation of anyone else. 
	*/
	function checkReputation(address toCheck) constant {
		return db.getReputation(toCheck);
	}

}