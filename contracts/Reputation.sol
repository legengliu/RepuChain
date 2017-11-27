pragma solidity ^0.4.15;

// TODO: import DB file

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
	}

	function checkAlreadyRated(address rater, address toRate) constant {
		// not sure if this would work
		return ratingNetwork[rater][toRate];
	}

	/*
	 * Anyone can check the reputation of anyone else. 
	*/
	function checkReputation(address toCheck) constant {
		return db.checkReputation(toCheck);
	}

}