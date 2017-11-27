pragma solidity ^0.4.15;

/*
 * Database contract
*/
contract ReputationGraph {

	address _owner;
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
		require(msg.sender == _owner);
		_;
	}

	function ReputationGraph(address owner) {
		_owner = owner;
	}

	/*
	 * Add outgoing rating from SRC to TARGET.
	*/
	function addRating(address src, address target) ownerOnly public returns (bool) {
		for (uint i = 0; i < graph[src].length; i++) {
			if (graph[src][i] == target) {
				return false;
			}
		}
		graph[src].push(target);
		RatingAdded(src, target);
		return true;
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
}
