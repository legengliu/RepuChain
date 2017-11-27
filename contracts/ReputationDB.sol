pragma solidity ^0.4.15;

/*
 * Database contract
*/
contract ReputationDB {

	address _owner;
	mapping (address => uint) private reputations;

	/*
	 * Modifiers
	 */
	modifier ownerOnly() {
		require(msg.sender == _owner);
		_;
	}

	function ReputationDB(address owner) {
		_owner = owner;
	}

	/*
	 * The owner Reputation contract can update reputations.
	*/
	function updateReputation(address target, uint rep) ownerOnly {
		reputations[target] = rep;
	}

	function getAllReputaions() ownerOnly {
		return reputations;
	}

	function getReputation(address target) constant {
		return reputations[target];
	}
}