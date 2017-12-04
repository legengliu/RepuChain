pragma solidity ^0.4.15;

contract Reputation {

	address public owner;
	// keep track of whether one addr has already rated another addr
	mapping(address => mapping(address => bool)) public outgoingRatings;
	Rating[] public ratings;
	struct Rating{
	    address from;
	    address to;
	}

	/*
	 * Events
	*/
	event RatingSuccessfullyAdded(bool success, address src, address target);

	modifier ownerOnly() {
		if (msg.sender == owner) {
			_;
		}
	}

	function Reputation() {
		owner = msg.sender;
	}

	/*
	 * This function can be called by any public address to
	 * rate any other address.
	*/
	function rate(address toRate) public returns (bool) {
		require(toRate != address(0));
		if (msg.sender == toRate) {
			RatingSuccessfullyAdded(false, address(0), address(0));
			return false;
		}

		if (outgoingRatings[msg.sender][toRate] != true) {
			outgoingRatings[msg.sender][toRate] = true;

			Rating memory newRating;
	        newRating.from = msg.sender;
	        newRating.to = toRate;
	        ratings.push(newRating);
	        RatingSuccessfullyAdded(true, msg.sender, toRate);
	        return true;
		}

		RatingSuccessfullyAdded(false, address(0), address(0));
		return false;
	}

	/*
	 * Constant getter functions
	*/
	function getNumRatings() public constant returns(uint) {
		return ratings.length;
	}

	function getRating(uint index) public constant returns(address, address) {
		return (ratings[index].from, ratings[index].to);
	}

	function getOwner() public constant returns(address) {
		return owner;
	}
}
