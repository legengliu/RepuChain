pragma solidity ^0.4.15;

import "./ReputationGraph.sol";

contract Reputation {

	address owner;
	ReputationGraph graph;

	function Reputation() {
		owner = msg.sender;
		graph = new ReputationGraph(this);
	}

	/*
	 * This function can be called by any public address to
	 * rate any other address.
	*/
	function rate(address toRate) public returns (bool) {
		require(toRate != 0x0);
		require(msg.sender != toRate);
		return graph.addRating(msg.sender, toRate);
	}
}
