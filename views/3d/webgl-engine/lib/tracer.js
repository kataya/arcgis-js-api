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
// See http://js.arcgis.com/4.15/esri/copyright.txt for details.

define(["require","exports","./webgl-debug","../../../webgl/capabilities/isWebGL2Context"],(function(e,n,t,u){Object.defineProperty(n,"__esModule",{value:!0});var l=null,o=[];n.enabled=!1,n.setEnabled=function(e){n.enabled=e},n.begin=function(){n.enabled&&(l=[])},n.trace=function(e){n.enabled&&null!=l&&l.push(e)},n.end=function(){if(n.enabled){var e=l;return l=null,e&&(o.forEach((function(n){return n(e)})),o.length=0),e}return null},n.instrumentContext=function(e){return n.enabled?u.default(e)?(console.warn("WebGL tracer is not supported on a WebGL2 Context"),e):t.makeDebugContext(e,void 0,(function(e,u){n.enabled&&l&&l.push("gl."+e+"("+t.glFunctionArgsToString(e,u)+")")})):e},n.request=function(e){o.push(e)}}));