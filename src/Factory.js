(function (root, factory) {
	if (typeof define == "function" && define.amd)
		define([], factory);
	else if (typeof exports == "object")
		module.exports = factory();
	else
		root.EntityFactory = factory();
}(this, function () {
	return function (Entity) {
		var output = new Entity();

		for (var x in Entity.scheme) {
			output[x] = null;
		}

		return output;
	}
}));