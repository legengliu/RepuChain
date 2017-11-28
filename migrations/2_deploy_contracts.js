var Reputation = artifacts.require("./Reputation.sol");

module.exports = function(deployer) {
  deployer.deploy(Reputation);
};
