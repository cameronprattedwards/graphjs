!function(e,t){"function"==typeof define&&define.amd?define(["graphjs/Graph"],t):"object"==typeof exports?module.exports=t(require("graphjs/Graph")):e.Collection=t(e.Graph)}(this,function(e){return function(t){return function(r){return r.map(function(r){return e.parse(t,r)})}}}),function(e,t){"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?module.exports=t():e.Graph=t()}(this,function(){var e={parseArray:function(e,t){var r=this;return t.map(function(t){return r.parse(e,t)})},parseDate:function(e,t){return new Date(Date.parse(t))},parseOther:function(e,t){return new e(t).valueOf()},parseSchemedObject:function(t,r){return e.parse(Entity,r)},parseFieldInScheme:function(e,t,r){return e.scheme[r].scheme?this.parseSchemedObject(e.scheme[r],t[r]):e.scheme[r]==Date?this.parseData(t[r]):this.parseOther(e.scheme[r],t[r])},makeEntity:function(e,t){return e.context?e.context.get(t):new e},parse:function(e,t){var r,n;if(t instanceof Array)return this.parseArray(e,t);if(e.scheme){n={};for(var i in t)n[i]=e.scheme[i]?this.parseFieldInScheme(e,t,i,n):t[i];r=this.makeEntity(e,t);for(var i in n)r[i]=n[i];return r}return this.parseOther(e,t)}};return e});