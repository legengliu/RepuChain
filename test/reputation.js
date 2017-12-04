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

/*
  it("...non owner cannot add rating", async function() {
    graph = await Graph.new({from: accounts[0]});

    await graph.addRating(accounts[1], accounts[2], {from: accounts[2]});
    await graph.addRating(accounts[1], accounts[3], {from: accounts[2]});
    await graph.addRating(accounts[1], accounts[4], {from: accounts[2]});

    await graph.addRating(accounts[3], accounts[7], {from: accounts[0]});

    let g_1 = await graph.getOutgoingRatings.call(accounts[1]);
    assert.equal(g_1.length, 0, "should have 0 outgoing ratings.");

    let g_3 = await graph.getOutgoingRatings.call(accounts[3]);
    assert.equal(g_3.length, 1, "should have 1 outgoing rating1.");
  })
*/

});
