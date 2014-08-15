(function (root, factory) {
	if (typeof define == "function" && define.amd)
		define(["graphjs/constructWithArgs"], factory);
	else if (typeof exports == "object")
		module.exports = factory(require("graphjs/constructWithArgs"));
	else
		root.Graph = factory(root.constructWithArgs);
}(this, function (constructWithArgs) {
	var Graph = {
		parseArray: function (Entity, rawData) {
			var _self = this;
			return rawData.map(function (entry) {
				return _self.parse(Entity, entry);
			});
		},
		parseDate: function (Entity, rawData) {
			return new Date(Date.parse(rawData));
		},
		parseOther: function (Type, rawData) {
			return new Type(rawData).valueOf();
		},
		parseSchemedObject: function (Type, rawData) {
			return Graph.parse(Entity, rawData);
		},
		parseFieldInScheme: function (Entity, rawData, x, parsedProperties) {
			if (Entity.scheme[x].scheme) {
				parsedProperties[x] = this.parseSchemedObject(Entity.scheme[x], rawData[x]);
			} else if (Entity.scheme[x] == Date) {
				parsedProperties[x] = this.parseData(rawData[x]);
			} else {
				parsedProperties[x] = this.parseOther(Entity.scheme[x], rawData[x]);
			}
		},
		parse: function (Entity, rawData) {
			var output,
				parsedProperties;

			if (rawData instanceof Array) {
				// Parse this mofo into an array
				return this.parseArray(Entity, rawData);
			} else if (Entity.scheme) {
				// Entity implements the metadata interface
				parsedProperties = {};

				for (var x in rawData) {
					if (Entity.scheme[x]) {
						parsedProperties[x] = this.parseFieldInScheme(Entity, rawData, x, parsedProperties);
					} else {
						parsedProperties[x] = rawData[x];
					}
				}

				output = constructWithArgs(parsedProperties, getArgs(Entity), Entity);

				for (var x in parsedProperties) {
					output[x] = parsedProperties[x];
				}

				return output;
			} else {
				// Entity is probably String or Number or something
				return this.parseOther(Entity, rawData);
			}
		}
	}

	return Graph;
}));