pragma solidity ^0.4.15;

/*
 * Database contract
*/
contract ReputationGraph {

	address public owner;
	// a graph of outgoing ratings
	mapping (address => address[]) public graph;

	/*
	 * Events
	*/
	event RatingAdded(address src, address target);
	event RatingDeleted(address src, address target);
	/*
	 * Modifiers
	*/
	modifier ownerOnly() {
		if (msg.sender == owner) {
			_;
		}
	}

	function ReputationGraph() {
		owner = msg.sender;
	}

	/*
	 * Add outgoing rating from SRC to TARGET.
	*/
	function addRating(address src, address target) public returns (bool) {
		if (msg.sender == owner) {
			for (uint i = 0; i < graph[src].length; i++) {
				if (graph[src][i] == target) {
					return false;
				}
			}
			graph[src].push(target);
			RatingAdded(src, target);
			return true;
		}
		return false;
	}

	/*
	 * Remove(revoke) SRC's rating of TARGET address.
	*/
	function removeRating(address src, address target) ownerOnly public returns(bool) {
		for (uint i = 0; i < graph[src].length; i++) {
			if (graph[src][i] == target) {
				delete graph[src][i];
				RatingDeleted(src, target);
				return true;
			}
		}
		return false;
	}

	// function getAllReputaions() constant returns(mapping (address => address[])) {
	// 	return graph;
	// }

	function getOutgoingRatings(address src) external constant returns(address[]) {
		return graph[src];
	}

	function getOwner() public constant returns(address) {
		return owner;
	}
}
