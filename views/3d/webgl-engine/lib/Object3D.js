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

define(["require","exports","../../../../core/tsSupport/extendsHelper","../../../../core/maybe","../../../../core/libs/gl-matrix-2/mat4","../../../../core/libs/gl-matrix-2/mat4f64","../../../../core/libs/gl-matrix-2/vec3","../../../../core/libs/gl-matrix-2/vec3f64","../../support/mathUtils","./ComponentUtils","./GeometryRecord","./IdGen","./Object3DStateSet","./Util"],(function(e,t,i,o,r,n,s,a,c,l,m,h,d,p){var b=function(){function e(t){void 0===t&&(t={}),this._objectTransformation=n.mat4f64.create(),this._bvObjectSpace=new f,this._bvWorldSpace=new f,this._bvDirty=!0,this._hasVolatileTransformation=!1,this._allComponentsHiddenDirty=!0,this._allComponentsVisibleDirty=!0,this.id=e._idGen.gen(t.idHint),this.castShadow=null==t.castShadow||t.castShadow,this.metadata=t.metadata,this.metadata&&this.metadata.isElevationSource&&(this.metadata.lastValidElevationBB=new u),this.objectTransformation=n.mat4f64.create(),this._initializeGeometryRecords(t.geometries,t.materials,t.transformations,t.origins)}return Object.defineProperty(e.prototype,"geometryRecords",{get:function(){return this._geometryRecords},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"geometries",{get:function(){return this._geometries},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"objectTransformation",{get:function(){return this._objectTransformation},set:function(e){r.mat4.copy(this._objectTransformation,e),this._invalidateBoundingVolume(),this._notifyDirty("objTransformation")},enumerable:!0,configurable:!0}),e.prototype.dispose=function(){for(var e=0,t=this._geometryRecords;e<t.length;e++){var i=t[e];m.pool.release(i)}this._geometryRecords=null,this._geometries=null},e.prototype._initializeGeometryRecords=function(e,t,i,o){if(!Array.isArray(e))return this._geometryRecords=[],void(this._geometries=[]);p.assert(t.length===e.length,"Object3D: materials don't match geometries"),p.assert(i.length===e.length,"Object3D: transformations don't match geometries"),this._geometryRecords=new Array(e.length),this._geometries=e.slice();for(var r=0;r<e.length;r++){this._geometryRecords[r]=m.pool.acquire(e[r],t[r],n.mat4f64.clone(i[r]),{},o&&o[r])}this._hasVolatileTransformation=!1},Object.defineProperty(e.prototype,"parentLayer",{get:function(){return this._parentLayer},set:function(e){p.assert(null==this._parentLayer||null==e,"Object3D can only be added to a single Layer"),this._parentLayer=e},enumerable:!0,configurable:!0}),e.prototype.getNumGeometryRecords=function(){return this._geometryRecords.length},e.prototype.findGeometryRecords=function(e){for(var t=[],i=0;i<this._geometries.length;i++)this._geometries[i]===e&&t.push(this._geometryRecords[i]);return t},e.prototype.getGeometryRecord=function(e){return p.assert(e>=0&&e<this._geometryRecords.length,"Object3d.getGeometryDataByIndex: index out of range"),this._geometryRecords[e]},e.prototype.addGeometry=function(e,t,i,o,r,s){i=i||n.mat4f64.IDENTITY,this._geometries.push(e);var a=m.pool.acquire(e,t,i,o||{},r,s);return this._geometryRecords.push(a),this._hasVolatileTransformation=this._geometryRecords.some((function(e){return!!e.shaderTransformation})),this._notifyDirty("objGeometryAdded",a),this._invalidateBoundingVolume(),this._allComponentsHiddenDirty=!0,this._allComponentsVisibleDirty=!0,a},e.prototype.removeGeometry=function(e){var t=this._geometryRecords.splice(e,1)[0];return m.pool.release(t),this._hasVolatileTransformation=this._geometryRecords.some((function(e){return!!e.shaderTransformation})),this._geometries.splice(e,1),this._notifyDirty("objGeometryRemoved",t),this._invalidateBoundingVolume(),this._allComponentsHiddenDirty=!0,this._allComponentsVisibleDirty=!0,t},e.prototype.removeAllGeometries=function(){for(;this.getNumGeometryRecords()>0;)this.removeGeometry(0)},e.prototype.geometryVertexAttrsUpdated=function(e){this._notifyDirty("vertexAttrsUpdated",this._geometryRecords[e]),this._invalidateBoundingVolume()},e.prototype.isHidden=function(){if(this._allComponentsHiddenDirty){this._allComponentsHiddenDirty=!1,this._allComponentsHidden=!0;for(var e=0,t=this._geometryRecords;e<t.length;e++){var i=t[e],o=i.instanceParameters.componentVisibilities,r=i.geometry.data.componentOffsets;if(!l.isAllHidden(o,r)){this._allComponentsHidden=!1;break}}}return this._allComponentsHidden},e.prototype.isVisible=function(){if(this._allComponentsVisibleDirty){this._allComponentsVisibleDirty=!1,this._allComponentsVisible=!0;for(var e=0,t=this._geometryRecords;e<t.length;e++){var i=t[e],o=i.instanceParameters.componentVisibilities,r=i.geometry.data.componentOffsets;if(!l.isAllVisible(o,r)){this._allComponentsVisible=!1;break}}}return this._allComponentsVisible},e.prototype.hide=function(){if(this._allComponentsHiddenDirty||!this._allComponentsHidden){for(var e=0,t=this._geometryRecords;e<t.length;e++){var i=t[e],o=i.instanceParameters.componentVisibilities,r=l.hideAllComponents(o);i.instanceParameters.componentVisibilities=r}this._notifyDirty("visibilityChanged"),this._allComponentsHiddenDirty=!1,this._allComponentsVisibleDirty=!1,this._allComponentsHidden=!0,this._allComponentsVisible=!1}},e.prototype.unhide=function(){if(this._allComponentsVisibleDirty||!this._allComponentsVisible){for(var e=0,t=this._geometryRecords;e<t.length;e++){var i=t[e],o=i.instanceParameters.componentVisibilities,r=l.unhideAllComponents(o);i.instanceParameters.componentVisibilities=r}this._notifyDirty("visibilityChanged"),this._allComponentsHiddenDirty=!1,this._allComponentsVisibleDirty=!1,this._allComponentsHidden=!1,this._allComponentsVisible=!0}},e.prototype.occlude=function(){for(var e=d.generateObject3DStateId(1),t=0,i=this._geometryRecords;t<i.length;t++){var o=i[t];o.instanceParameters.occludees=l.addOccludee(o.instanceParameters.occludees,e)}return this._notifyDirty("occlusionChanged"),e},e.prototype.removeOcclude=function(e){for(var t=0,i=this._geometryRecords;t<i.length;t++){var o=i[t];o.instanceParameters.occludees=l.removeOccludee(o.instanceParameters.occludees,e)}this._notifyDirty("occlusionChanged")},e.prototype.highlight=function(){for(var e=d.generateObject3DStateId(0),t=0,i=this._geometryRecords;t<i.length;t++){var o=i[t];o.instanceParameters.componentHighlights=l.addHighlight(o.instanceParameters.componentHighlights,null,e)}return this._notifyDirty("highlightChanged"),e},e.prototype.removeHighlight=function(e){for(var t=0,i=this._geometryRecords;t<i.length;t++){var o=i[t];o.instanceParameters.componentHighlights=l.removeHighlight(o.instanceParameters.componentHighlights,e)}this._notifyDirty("highlightChanged")},e.prototype.getComponentFromTriangleNr=function(e,t){p.assert(e>=0&&e<this._geometryRecords.length,"Object3d.getComponentFromTriangleNr: index out of range");var i=this._geometryRecords[e].geometry.data.componentOffsets;return l.componentFind(i,3*t)},e.prototype.setGeometryTransformation=function(e,t){p.assert(e>=0&&e<this._geometryRecords.length,"Object3d.setGeometryTransformation: index out of range");var i=this._geometryRecords[e];m.pool.release(i);var o=m.pool.acquire(i.geometry,i.material,n.mat4f64.clone(t),i.instanceParameters);this._geometryRecords[e]=o,this._notifyDirty("objGeometryReplaced",[i,o]),this._invalidateBoundingVolume()},e.prototype.getCombinedStaticTransformation=function(e,t){return r.mat4.multiply(o.unwrapOr(t,n.mat4f64.create()),this.objectTransformation,e.getStaticTransformation())},e.prototype.getCombinedShaderTransformation=function(e,t){return t=t||n.mat4f64.create(),r.mat4.multiply(t,this.objectTransformation,e.getShaderTransformation()),t},e.prototype.hasVolativeTransformation=function(){return this._hasVolatileTransformation},e.prototype.getBBMin=function(e){return this._validateBoundingVolume(),e?this._bvObjectSpace.bbMin:this._bvWorldSpace.bbMin},e.prototype.getBBMax=function(e){return this._validateBoundingVolume(),e?this._bvObjectSpace.bbMax:this._bvWorldSpace.bbMax},e.prototype.getCenter=function(e){return this._validateBoundingVolume(),e?this._bvObjectSpace.center:this._bvWorldSpace.center},e.prototype.getBSRadius=function(e){return this._validateBoundingVolume(),e?this._bvObjectSpace.bsRadius:this._bvWorldSpace.bsRadius},e.prototype._validateBoundingVolume=function(){if(this._bvDirty||this._hasVolatileTransformation){this._bvObjectSpace.init(),this._bvWorldSpace.init();for(var e=0;e<this._geometryRecords.length;++e){var t=this._geometries[e],i=this._geometryRecords[e],o=t.boundingInfo;this._calculateTransformedBoundingVolume(o,this._bvObjectSpace,i.getShaderTransformation()),this._calculateTransformedBoundingVolume(o,this._bvWorldSpace,this.getCombinedShaderTransformation(i))}s.vec3.lerp(this._bvObjectSpace.center,this._bvObjectSpace.bbMin,this._bvObjectSpace.bbMax,.5),s.vec3.lerp(this._bvWorldSpace.center,this._bvWorldSpace.bbMin,this._bvWorldSpace.bbMax,.5);var r=a.vec3f64.create(),n=a.vec3f64.create(),l=c.maxScale(this.objectTransformation);for(e=0;e<this._geometryRecords.length;++e){t=this._geometries[e];var m=this._geometryRecords[e].getShaderTransformation(),h=c.maxScale(m);o=t.boundingInfo;s.vec3.transformMat4(r,o.getCenter(),m);var d=s.vec3.distance(r,this._bvObjectSpace.center),p=o.getBSRadius()*h;this._bvObjectSpace.bsRadius=Math.max(this._bvObjectSpace.bsRadius,d+p),s.vec3.transformMat4(n,r,this.objectTransformation);var b=s.vec3.distance(n,this._bvWorldSpace.center),u=p*l;this._bvWorldSpace.bsRadius=Math.max(this._bvWorldSpace.bsRadius,b+u)}this._bvDirty=!1}},e.prototype._calculateTransformedBoundingVolume=function(e,t,i){var o=e.getBBMin(),r=e.getBBMax(),n=a.vec3f64.clone(o),c=a.vec3f64.clone(r);s.vec3.transformMat4(n,n,i),s.vec3.transformMat4(c,c,i);for(var l=0;l<3;++l)t.bbMin[l]=Math.min(t.bbMin[l],n[l],c[l]),t.bbMax[l]=Math.max(t.bbMax[l],n[l],c[l]);for(l=0;l<3;++l){s.vec3.copy(n,o),s.vec3.copy(c,r),n[l]=r[l],c[l]=o[l],s.vec3.transformMat4(n,n,i),s.vec3.transformMat4(c,c,i);for(var m=0;m<3;++m)t.bbMin[m]=Math.min(t.bbMin[m],n[m],c[m]),t.bbMax[m]=Math.max(t.bbMax[m],n[m],c[m])}},e.prototype._invalidateBoundingVolume=function(){this._bvDirty=!0,this._parentLayer&&this._parentLayer.notifyObjectBBChanged(this,{center:this._bvWorldSpace.center,radius:this._bvWorldSpace.bsRadius})},e.prototype._notifyDirty=function(e,t,i,o){if(this._parentLayer){i=i||1;var r=o||this;this._parentLayer.notifyDirty(e,t,i,r)}},Object.defineProperty(e.prototype,"test",{get:function(){var e=this;return{hasGeometry:function(t){return e._geometries.indexOf(t)>-1},getGeometryIndex:function(t){return e._geometries.indexOf(t)}}},enumerable:!0,configurable:!0}),e._idGen=new h.IdGen,e}(),u=function(){function e(){this.bbMin=a.vec3f64.fromValues(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE),this.bbMax=a.vec3f64.fromValues(-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE)}return e.prototype.isEmpty=function(){return this.bbMax[0]<this.bbMin[0]&&this.bbMax[1]<this.bbMin[1]&&this.bbMax[2]<this.bbMin[2]},e}(),f=function(e){function t(){var t=e.call(this)||this;return t.center=a.vec3f64.create(),t.bsRadius=0,t}return i(t,e),t.prototype.init=function(){s.vec3.set(this.bbMin,Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE),s.vec3.set(this.bbMax,-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE),s.vec3.set(this.center,0,0,0),this.bsRadius=0},t.prototype.getCenter=function(){return this.center},t.prototype.getBSRadius=function(){return this.bsRadius},t}(u);return b}));