pragma solidity ^0.4.15;

import "./ReputationGraph.sol";

contract Reputation {

	address owner;
	ReputationGraph graph;

	event ratingAdded(bool rateSuccess);

	function Reputation() {
		owner = msg.sender;
		graph = new ReputationGraph();
	}

	/*
	 * This function can be called by any public address to
	 * rate any other address.
	*/
	function rate(address toRate) public returns (bool) {
		require(toRate != 0x0);
		if (msg.sender == toRate) {
			ratingAdded(false);
			return false;
		}

		bool added = graph.addRating(msg.sender, toRate);
		ratingAdded(added);
		return added;
	}
}
