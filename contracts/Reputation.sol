pragma solidity ^0.4.15;

contract Reputation {

	address public owner;
	// a graph of outgoing ratings
	mapping (address => address[]) public graph;
	address[] public nodes;

	/*
	 * Events
	*/
	event RatingDeleted(address src, address target);
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
		require(toRate != 0x0);
		if (msg.sender == toRate) {
			RatingSuccessfullyAdded(false, 0x0, 0x0);
			return false;
		}

		for (uint i = 0; i < graph[msg.sender].length; i++) {
			if (graph[msg.sender][i] == toRate) {
				RatingSuccessfullyAdded(false, 0x0, 0x0);
				return false;
			}
		}
		graph[msg.sender].push(toRate);
		RatingSuccessfullyAdded(true, msg.sender, toRate);
		return true;
	}

	/*
	 * Internal function to add rating to grpah.
	
	function addRating(address src, address target) internal returns (bool) {

		graph[src].push(target);
		RatingAdded(src, target);
		// for (uint j = 0; j < nodes.length; j++) {
		// 	if (nodes[j] == src) {
		// 		return true;
		// 	}
		// }
		// nodes.push(src);
		return true;
	}
	*/ 


	/*
	 * Remove(revoke) SRC's rating of TARGET address.
	*/
	function removeRating(address src, address target) public returns(bool) {
		require(msg.sender == src);
		for (uint i = 0; i < graph[src].length; i++) {
			if (graph[src][i] == target) {
				delete graph[src][i];
				RatingDeleted(src, target);
				return true;
			}
		}
		return false;
	}

	/*
	 * Constant functions
	*/

	function getOutgoingRatings(address src) public constant returns(address[]) {
		return graph[src];
	}

	function getOwner() public constant returns(address) {
		return owner;
	}

	function numNodes() public constant returns(uint) {
		return nodes.length;
	}
}
