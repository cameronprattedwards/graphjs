GraphJS
=======

A teeny tiny library for parsing raw payloads into an object graph.

### Installation

* Using Bower: `bower install graphjs`
* Using NPM: `npm install graphjs`

### Usage

GraphJS implements a [UMD pattern](https://github.com/umdjs/umd), so it works with RequireJS and CommonJS. You can also use it as a global if you don't want to use any kind of dependency injection.

We'll use globals in the examples.

When using globals, include `dist/Graph.js` somewhere on the page.

Then, define a JavaScript constructor as you normally would:

```javascript
function Person(name, age) {
	this.name = name;
	this.age = age;
}

Person.prototype = {
	speak: function () {
		console.log("Hi! My name is " + this.name);
	}
};
```

Then, add one additional static field - the **scheme**:

```javascript
Person.scheme = {
	name: String,
	age: Number,
	birthday: Date,
	kids: Collection(Person)
};
```

A scheme is just a  map of property names to data types. Data types are just plain ol' JavaScript constructors - in this case, String, Number, and Date. We also use a special mapping constructor called `Collection` - you get this for free with GraphJS. `Collection` tells GraphJS that you want `kids` to be an array of `Person`s. It's the equivalent of `List<Person>` in C# or Java.

Then you'll need to fetch some raw data, via AJAX or whatever. Let's use this raw data as an example:

```javascript
var daemian = { name: "Daemian", age: 2, kids: [] };
var genny = { name: "Genny", age: 30, kids: [daemian] };
var ellie = { name: "Ellie", age: 2, kids: [] };
var davejr = { name: "Dave", age: 28, kids: [ellie] };
var david = { name: "David", age: 54, kids: [davejr, genny] };
```

This is a good example because it's deeply recursive - it's a whole family tree! Here comes the fun part: parsing this data into a graph is a piece o' cake. Just do:

```javascript
var parsedDavid = Graph.parse(Person, david);
```

And bada-bing, bada-boom, you've got a tree of people. Run `console.log(parsedDavid)` to get a good look at your tree.

### With RequireJS

We recommend you use some kind of module loader, because debugging using non-optimized source files is a lot more fun. To use with RequireJS, just define the path to the GraphJS `src` directory, then pull in `Graph` and `Collection` whenever you need them.

Assuming you installed GraphJS using Bower, this is what you would do:

```javascript
requirejs.config({
	paths: {
		"graphjs": "bower_components/graphjs/src"
	}
})
```

Then, to use the `Graph` object:

```javascript
//main.js
require(["graphjs/Graph", "rawData", "Person"], function (Graph, rawData, Person) {
	var parsed = Graph.parse(Person, rawData);
});
```

To use the `Collection` object:

```javascript
//Person.js
define(["graphjs/Collection"], function (Collection) {
	function Person(name, age) {
		this.name = name;
		this.age = age;
	}

	Person.prototype = {
		speak: function () {
			console.log("Hi! My name is " + this.name);
		}
	};

	Person.scheme = {
		name: String,
		age: Number,
		birthday: Date,
		kids: Collection(Person)
	};

	return Person;
});
```

### CommonJS

Now that you know how to use GraphJS with RequireJS, using it with CommonJS should be pretty straightforward.





