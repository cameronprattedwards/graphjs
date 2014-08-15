(function () {
	if (typeof define == "function" && define.amd)
		define([], factory);
	else if (typeof exports == "object")
		module.exports = factory();
	else
		root.constructWithArgs = factory();
}(this, function () {
	function getArgs(fn) {
		var regex = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
		var toStr = fn.toString();
		return toStr.match(regex)[1].trim().split(/,\s+/);
	}

	function map(entry) {
		return typeof entry == "string" ? "'" + entry + "'" : entry;
	}

	function constructWithArgs(rawData, fn) {
		var myArgs = [],
			fnArgs = getArgs(fn),
			argName,
			i,
			str;

		for (i = 0; i < fnArgs.length; i++) {
			argName = fnArgs[i];
			if (rawData.hasOwnProperty(argName))
				myArgs.push(rawData[argName]);
			else
				break;
		}

		str = "new fn("+ myArgs.map(map).join(",") +")";

		return eval(str);
	}

	return constructWithArgs;
}));
