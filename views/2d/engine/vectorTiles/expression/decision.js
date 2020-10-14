// COPYRIGHT © 2020 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.17/esri/copyright.txt for details.

define(["require","exports","tslib","./expression"],(function(t,r,e,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.Match=r.Coalesce=r.Case=r.NONE=r.ANY=r.ALL=r.NOT=r.GE=r.GT=r.LE=r.LT=r.NE=r.EQ=void 0;var u=function(){function t(t,r,e){this.lhs=t,this.rhs=r,this.compare=e}return t.parse=function(r,e){if(3!==r.length&&4!==r.length)throw new Error('"'+r[0]+'" expects 2 or 3 arguments');if(4===r.length)throw new Error('"'+r[0]+'" collator not supported');return new t(n.createExpression(r[1]),n.createExpression(r[2]),e)},t.prototype.evaluate=function(t,r){return this.compare(this.lhs.evaluate(t,r),this.rhs.evaluate(t,r))},t}(),a=function(t){function r(){return null!==t&&t.apply(this,arguments)||this}return e.__extends(r,t),r.parse=function(t){return u.parse(t,(function(t,r){return t===r}))},r}(u);r.EQ=a;var s=function(t){function r(){return null!==t&&t.apply(this,arguments)||this}return e.__extends(r,t),r.parse=function(t){return u.parse(t,(function(t,r){return t!==r}))},r}(u);r.NE=s;var o=function(t){function r(){return null!==t&&t.apply(this,arguments)||this}return e.__extends(r,t),r.parse=function(t){return u.parse(t,(function(t,r){return t<r}))},r}(u);r.LT=o;var i=function(t){function r(){return null!==t&&t.apply(this,arguments)||this}return e.__extends(r,t),r.parse=function(t){return u.parse(t,(function(t,r){return t<=r}))},r}(u);r.LE=i;var c=function(t){function r(){return null!==t&&t.apply(this,arguments)||this}return e.__extends(r,t),r.parse=function(t){return u.parse(t,(function(t,r){return t>r}))},r}(u);r.GT=c;var l=function(t){function r(){return null!==t&&t.apply(this,arguments)||this}return e.__extends(r,t),r.parse=function(t){return u.parse(t,(function(t,r){return t>=r}))},r}(u);r.GE=l;var f=function(){function t(t){this.arg=t}return t.parse=function(r){if(2!==r.length)throw new Error('"!" expects 1 argument');return new t(n.createExpression(r[1]))},t.prototype.evaluate=function(t,r){return!this.arg.evaluate(t,r)},t}();r.NOT=f;var h=function(){function t(t){this.args=t}return t.parse=function(r){for(var e=[],u=1;u<r.length;u++)e.push(n.createExpression(r[u]));return new t(e)},t.prototype.evaluate=function(t,r){for(var e=0,n=this.args;e<n.length;e++){if(!n[e].evaluate(t,r))return!1}return!0},t}();r.ALL=h;var p=function(){function t(t){this.args=t}return t.parse=function(r){for(var e=[],u=1;u<r.length;u++)e.push(n.createExpression(r[u]));return new t(e)},t.prototype.evaluate=function(t,r){for(var e=0,n=this.args;e<n.length;e++){if(n[e].evaluate(t,r))return!0}return!1},t}();r.ANY=p;var v=function(){function t(t){this.args=t}return t.parse=function(r){for(var e=[],u=1;u<r.length;u++)e.push(n.createExpression(r[u]));return new t(e)},t.prototype.evaluate=function(t,r){for(var e=0,n=this.args;e<n.length;e++){if(n[e].evaluate(t,r))return!1}return!0},t}();r.NONE=v;var g=function(){function t(t,r){this.args=t,this.fallback=r}return t.parse=function(r){if(r.length<4)throw new Error('"case" expects at least 3 arguments');if(r.length%2==1)throw new Error('"case" expects an odd number of arguments');for(var e=[],u=1;u<r.length-1;u+=2)e.push({condition:n.createExpression(r[u]),output:n.createExpression(r[u+1])});return new t(e,n.createExpression(r[r.length-1]))},t.prototype.evaluate=function(t,r){for(var e=0,n=this.args;e<n.length;e++){var u=n[e];if(u.condition.evaluate(t,r))return u.output.evaluate(t,r)}return this.fallback.evaluate(t,r)},t}();r.Case=g;var E=function(){function t(t){this.args=t}return t.parse=function(r){if(r.length<2)throw new Error('"coalesce" expects at least 1 argument');for(var e=[],u=1;u<r.length;u++)e.push(n.createExpression(r[u]));return new t(e)},t.prototype.evaluate=function(t,r){for(var e=0,n=this.args;e<n.length;e++){var u=n[e].evaluate(t,r);if(null!==u)return u}return null},t}();r.Coalesce=E;var w=function(){function t(t,r,e,n){this.input=t,this.labels=r,this.outputs=e,this.fallback=n}return t.parse=function(r){if(r.length<3)throw new Error('"match" expects at least 3 arguments');if(r.length%2==0)throw new Error('"case" expects an even number of arguments');for(var e,u=n.createExpression(r[1]),a=[],s={},o=2;o<r.length-1;o+=2){var i=r[o];Array.isArray(i)||(i=[i]);for(var c=0,l=i;c<l.length;c++){var f=l[c],h=typeof f;if("string"!==h&&"number"!==h)throw new Error('"match" requires string or number literal as labels');if(e){if(h!==e)throw new Error('"match" requires labels to have the same type')}else e=h;s[f]=a.length}a.push(n.createExpression(r[o+1]))}return new t(u,s,a,n.createExpression(r[r.length-1]))},t.prototype.evaluate=function(t,r){var e=this.input.evaluate(t,r);return(this.outputs[this.labels[e]]||this.fallback).evaluate(t,r)},t}();r.Match=w}));