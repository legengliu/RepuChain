let graph = require('pagerank.js');
/*
 * input ratings is an array of tuples representing each outward directed edge
 */
function Rank(ratings) {
	let results = [];
	graph.reset();
	for (let i = 0; i < ratings.length; i++) {
		let src = ratings[i][0];
		let dst = ratings[i][1];
		graph.link(src, dst, 1.0);		
	}
	graph.rank(0.85, 0.000001, (node, rank) => {
		results.push([node, rank]);
		console.log('Address ' + node + " has rank of " + rank);
	});
	return results;
}

export default Rank;
