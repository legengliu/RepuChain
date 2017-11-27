pragma solidity ^0.4.15;

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
	 * Public functions
	*/
	function updateReputation(address target, uint rep) ownerOnly {
		reputations[target] = rep;
	}

	function checkReputation(address target) constant {
		// TODO: check that target is in reputations
		return reputations[target];
	}
}