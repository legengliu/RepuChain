var Reputation = artifacts.require("./Reputation.sol");

contract('Reputation', function(accounts) {

  let rep;

  it("...set owner to caller", async function() {
    rep = await Reputation.deployed({from: accounts[0]});
    let owner = await rep.getOwner.call();
    assert.equal(owner, accounts[0], "owner should be accounts[0]");
  })

  it("...should initialize a graph", async function() {
    rep = await Reputation.deployed();
    let g = await rep.getNumRatings.call();
    assert.equal(g.toNumber(), 0, "outgoing links should be empty");
  })

  it("...should allow rate.", async function() {
    rep = await Reputation.deployed();
    let rated = await rep.rate(accounts[1], {from: accounts[0]});
    assert.equal(rated.logs[0].args.success, true, "Rate should return true");
  });

  it("...should not allow an address to rate itself", async function() {
    rep = await Reputation.deployed();
    let rated = await rep.rate(accounts[0], {from: accounts[0]});
    assert.equal(rated.logs[0].args.success, false, "Rate should return false");
  });

  it("...should add rating", async function() {
    rep = await Reputation.new();
    await rep.rate(accounts[2], {from: accounts[1]});
    await rep.rate(accounts[3], {from: accounts[1]});
    await rep.rate(accounts[7], {from: accounts[2]});
    await rep.rate(accounts[8], {from: accounts[5]});

    let g_1 = await rep.getNumRatings.call();
    console.log(g_1);
    assert.equal(g_1.toNumber(), 4, "should have 4 total ratings.");
  })

  it("...should return ratings as pairs of addresses", async function() {
    rep = await Reputation.new();
    await rep.rate(accounts[2], {from: accounts[0]});
    await rep.rate(accounts[3], {from: accounts[1]});
    await rep.rate(accounts[4], {from: accounts[2]});
    await rep.rate(accounts[5], {from: accounts[3]});

    let g_1 = await rep.getNumRatings.call();
    assert.equal(g_1.toNumber(), 4, "should have 4 total ratings.");

    for (let i = 0; i < g_1.toNumber(); i++) {
      let r = await rep.getRating(i);
      assert.equal(r[0], accounts[i]);
      assert.equal(r[1], accounts[i + 2]);
    }
  })
});
