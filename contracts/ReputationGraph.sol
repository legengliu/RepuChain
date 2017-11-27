pragma solidity ^0.4.15;

/*
 * Database contract
*/
contract ReputationGraph {

	address _owner;
	// a graph of outgoing ratings
	mapping (address => address[]) graph;

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
	function addRating(address src, address target) ownerOnly returns (bool) {
		for (uint i = 0; i < graph[src].length; i++) {
			if (graph[src][i] == target) {
				return false;
			}
		}
		graph[src].append(target);
		return true;
	}

	/*
	 * Remove(revoke) SRC's rating of TARGET address.
	*/
	function removeRating(address src, address target) ownerOnly returns (bool) {
		for (uint i = 0; i < graph[src].length; i++) {
			if (graph[src][i] == target) {
				delete graph[src][i];
				return true;
			}
		}
		return false;
	}

	function getAllReputaions() constant ownerOnly {
		return graph;
	}

	function getOutgoingRatings(address src) constant ownerOnly {
		return graph[src];
	}
}
