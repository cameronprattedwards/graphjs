(function (root, factory) {
	if (typeof define == "function" && define.amd)
		define([], factory);
	else if (typeof exports == "object")
		module.exports = factory();
	else
		root.Graph = factory();
}(this, function () {
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
		parseFieldInScheme: function (Entity, rawData, x) {
			if (Entity.scheme[x].scheme) {
				return this.parseSchemedObject(Entity.scheme[x], rawData[x]);
			} else if (Entity.scheme[x] == Date) {
				return this.parseDate(Entity, rawData[x]);
			} else {
				return this.parseOther(Entity.scheme[x], rawData[x]);
			}
		},
		makeEntity: function (Entity, rawData) {
			if (Entity.context) {
				return Entity.context.get(rawData);
			} else {
				return new Entity();
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

				output = this.makeEntity(Entity, rawData);

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
