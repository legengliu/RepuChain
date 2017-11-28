var Reputation = artifacts.require("./Reputation.sol");

contract('Reputation', function(accounts) {

  let rep;

  it("...should allow rate.", async function() {
    rep = await Reputation.deployed();
    let rated = await rep.rate(accounts[1], {from: accounts[0]});
    assert.equal(rated.logs[0].args.rateSuccess, true, "Rate should return true");
  });

  it("...should not allow an address to rate itself", async function() {
    rep = await Reputation.deployed();
    let rated = await rep.rate(accounts[0], {from: accounts[0]});
    assert.equal(rated.logs[0].args.rateSuccess, false, "Rate should return false");
  });

});
