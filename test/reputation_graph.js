var Graph = artifacts.require("./ReputationGraph.sol");

contract('ReputationGraph', function(accounts) {

  let graph;

  it("...should initialize a graph", async function() {
    graph = await Graph.deployed({from: accounts[0]});
    let g = await graph.getOutgoingRatings.call(accounts[0]);
    assert.equal(g.length, 0, "outgoing links should be empty");
  })

  it("...set owner to caller", async function() {
    graph = await Graph.deployed({from: accounts[0]});
    let g = await graph.getOwner.call();
    assert.equal(g, accounts[0], "owner should be accounts[0]");
  })

  it("...should add rating", async function() {
    graph = await Graph.deployed({from: accounts[0]});
    await graph.addRating(accounts[1], accounts[2], {from: accounts[0]});
    await graph.addRating(accounts[1], accounts[3], {from: accounts[0]});
    await graph.addRating(accounts[2], accounts[7], {from: accounts[0]});

    let g_1 = await graph.getOutgoingRatings.call(accounts[1]);
    assert.equal(g_1.length, 2, "should have 2 outgoing ratings.");

    let g_2 = await graph.getOutgoingRatings.call(accounts[2]);
    assert.equal(g_2.length, 1, "should have 1 outgoing rating.");

    let g_3 = await graph.getOutgoingRatings.call(accounts[3]);
    assert.equal(g_3.length, 0, "should have 0 outgoing ratings.");
  })

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
});
