var Reputation = artifacts.require("./Reputation.sol");
var ReputationGraph = artifacts.require("./ReputationGraph.sol");

module.exports = function(deployer) {
  deployer.deploy(Reputation);
  deployer.deploy(ReputationGraph);
};
