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
		// addNodeToNodes(msg.sender);
		return true;
	}

	function addNodeToNodes(address n) internal returns (bool) {
		// add msg.sender to a list of raters
		for (uint j = 0; j < nodes.length; j++) {
			if (nodes[j] == n) {
				return false;
			}
		}
		nodes.push(n);
		return true;
	}

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
	 * Constant getter functions
	*/

	function getOutgoingRating(address src, uint i) public constant returns(address) {
		return graph[src][i];
	}

	function getOwner() public constant returns(address) {
		return owner;
	}

	function numNodes() public constant returns(uint) {
		return nodes.length;
	}

	function numOutgoingRatings(address src) public constant returns(uint) {
		uint l = graph[src].length;
		return l;
	}
}
