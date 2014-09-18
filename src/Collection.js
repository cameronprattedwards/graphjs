(function (root, factory) {
	if (typeof define == "function" && define.amd)
		define(["object-graph-js/Graph"], factory);
	else if (typeof exports == "object")
		module.exports = factory(require("object-graph-js/Graph"));
	else
		root.Collection = factory(root.Graph);
}(this, function (Graph) {
	return function Collection(Generic) {
		return function(array) {
			return array ? array.map(function (entry) {
				return Graph.parse(Generic, entry);
			}) : [];
		}
	};
}));