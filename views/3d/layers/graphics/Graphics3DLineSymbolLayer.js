// COPYRIGHT © 2018 Esri
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
// See http://js.arcgis.com/4.12/esri/copyright.txt for details.

define(["require","exports","../../../../core/tsSupport/extendsHelper","../../../../core/tsSupport/generatorHelper","../../../../core/tsSupport/awaiterHelper","../../../../core/Error","../../../../core/lang","../../../../core/maybe","../../../../core/screenUtils","../../../../core/libs/gl-matrix-2/mat4","../../../../core/libs/gl-matrix-2/mat4f64","../../../../core/libs/gl-matrix-2/vec3","../../../../core/libs/gl-matrix-2/vec3f64","../../../../core/libs/gl-matrix-2/vec4f32","../../../../geometry/Polygon","../../../../geometry/support/aaBoundingBox","./ElevationAligners","./Graphics3DDrapedGraphicLayer","./Graphics3DObject3DGraphicLayer","./Graphics3DSymbolCommonCode","./Graphics3DSymbolLayer","./lineUtils","../support/FastSymbolUpdates","../../../../views/3d/support/mathUtils","../../webgl-engine/Stage","../../webgl-engine/lib/Geometry","../../webgl-engine/lib/Object3D","../../webgl-engine/lib/RenderGeometry","../../webgl-engine/materials/RibbonLineMaterial","../../webgl-engine/shaders/RibbonLinePrograms"],function(t,e,r,a,i,n,s,o,l,p,c,d,h,u,y,g,f,v,m,b,_,x,A,E,C,D,I,S,U,O){Object.defineProperty(e,"__esModule",{value:!0});var T=function(t){function e(e,r,a,i){var n=t.call(this,e,r,a,i)||this;return n._lineWidthLOD=1,n}return r(e,t),e.prototype.doLoad=function(){return i(this,void 0,void 0,function(){var t,e,r,i;return a(this,function(a){if(this._vvConvertOptions={modelSize:[1,1,1],symbolSize:[1,1,1],unitInMeters:1,transformation:{anchor:[0,0,0],scale:[1,1,1],rotation:[0,0,0]},supportedTypes:{size:!0,color:!0,opacity:!0,rotation:!1}},this._context.renderer&&this._context.renderer.visualVariables&&this._context.renderer.visualVariables.length>0?this._fastUpdates=A.initFastSymbolUpdatesState(this._context.renderer,this._vvConvertOptions):this._fastUpdates={enabled:!1},t=this._getCombinedOpacityAndColor(o.get(this.symbolLayer,"material","color")),e=t[3],r={width:1,color:t,polygonOffset:!0,join:this.symbolLayer.join||"miter",cap:this.symbolLayer.cap||"butt",transparent:e<1||this._isPropertyDriven("opacity"),slicePlaneEnabled:this._context.slicePlaneEnabled},this._isPropertyDriven("size"))this._fastUpdates.enabled&&this._fastUpdates.visualVariables.size&&(r.width=l.pt2px(1));else{if((i=null!=this.symbolLayer.size?this.symbolLayer.size:l.px2pt(1))<0)throw new n("graphics3dlinesymbollayer:invalid-size","Symbol sizes may not be negative values");r.width=l.pt2px(i),"round"===r.join&&(this._lineWidthLOD=1.863798+-2.0062872/Math.pow(1+i/18.2313,.8856294))}return this._fastUpdates&&this._fastUpdates.visualVariables&&s.mixin(r,this._fastUpdates.materialParameters,{}),this._material=new U(r,this._getStageIdHint()+"_ribbonlinemat"),this._context.stage.add(C.ModelContentType.MATERIAL,this._material),[2]})})},e.prototype.destroy=function(){t.prototype.destroy.call(this),this._material&&(this._context.stage.remove(C.ModelContentType.MATERIAL,this._material.id),this._material=null)},e.prototype.getDrivenSize=function(t){var e=new Float32Array(1);return this._isPropertyDriven("size")&&t.size?e[0]=l.pt2px(b.getSingleSizeDriver(t.size)):e[0]=1,e},e.prototype.getSizeFeatureAttribute=function(t){var e=new Float32Array(1);return e[0]=_.getAttributeValue(this._fastUpdates.visualVariables.size.field,t),e},e.prototype.getDrivenColor=function(t,e){var r=u.vec4f32.fromValues(1,1,1,1);return this._isPropertyDriven("color")&&t.color&&(r[0]=t.color[0],r[1]=t.color[1],r[2]=t.color[2],t.color.length>0&&(r[3]=t.color[3])),this._isPropertyDriven("opacity")&&t.opacity&&(r[3]=t.opacity),r},e.prototype.getColorFeatureAttribute=function(t){var e=new Float32Array(1);return e[0]=_.getAttributeValue(this._fastUpdates.visualVariables.color.field,t),e},e.prototype.getOpacityFeatureAttribute=function(t){var e=new Float32Array(1);return e[0]=_.getAttributeValue(this._fastUpdates.visualVariables.opacity.field,t),e},e.prototype.createGraphics3DGraphic=function(t){var e=t.graphic,r=e.geometry;if("polyline"!==r.type&&"polygon"!==r.type&&"extent"!==r.type)return this.logger.warn("unsupported geometry type for line symbol: "+r.type),null;if(!this._validateGeometry(r))return null;var a="polygon"===r.type||"extent"===r.type?"rings":"paths",i="graphic"+e.uid,n=this.getGraphicElevationContext(e);return"on-the-ground"===n.mode?this._createAsOverlay(t,a,n,i,this._context.layer.uid):this._createAs3DShape(t,a,n,i,e.uid)},e.prototype.applyRendererDiff=function(t,e){for(var r in t.diff)switch(r){case"visualVariables":if(!A.updateFastSymbolUpdatesState(this._fastUpdates,e,this._vvConvertOptions))return!1;this._material.setParameterValues(this._fastUpdates.materialParameters);break;default:return!1}return!0},e.prototype.layerOpacityChanged=function(){var t=this._material.getColor(),e=o.get(this.symbolLayer,"material","color"),r=this._getCombinedOpacity(e),a=r<1||this._isPropertyDriven("opacity"),i=[t[0],t[1],t[2],r],n={color:i,transparent:a};return this._material.setParameterValues(n),!0},e.prototype.layerElevationInfoChanged=function(t,e,r){var a=this._elevationContext.mode;if(null==r||null==a)return!1;if("on-the-ground"===r&&"on-the-ground"===a)return!0;if(r!==a&&("on-the-ground"===r||"on-the-ground"===a))return!1;var i=b.needsElevationUpdates2D(a);return this.updateGraphics3DGraphicElevationInfo(t,e,function(){return i})},e.prototype.slicePlaneEnabledChanged=function(t,e){var r={slicePlaneEnabled:this._context.slicePlaneEnabled};return this._material.setParameterValues(r),!0},e.prototype.pixelRatioChanged=function(t,e){return!0},e.prototype._getOutlineGeometry=function(t,e){return e},e.prototype._getGeometry=function(t){var e=t.geometry;return"extent"===e.type&&(e=y.fromExtent(e)),e},e.prototype._createAs3DShape=function(t,e,r,a,i){var n=t.graphic,s=this._getGeometry(n),o=s[e],l=this._getOutlineGeometry(s,o),d=[],u=[],y=[],g=h.vec3f64.create(),v=new Array(6),_=b.getGeometryVertexData3D(l,s.hasZ,s.spatialReference,this._context.renderSpatialReference,this._context.elevationProvider,this._context.renderCoordsHelper,r);if(this._logGeometryCreationWarnings(_,o,e,"LineSymbol3DLayer"),l.length>0){for(var x=_.geometryData.outlines,A=_.eleVertexData,E=_.vertexData,C=0;C<x.length;++C){var S=x[C];if(!(S.count<=1)){var U=S.index,O=S.count;if(!this._context.clippingExtent||(b.computeBoundingBox(A,U,O,v),!b.boundingBoxClipped(v,this._context.clippingExtent))){b.applyOrigin(E,U,O,g);var T=new Float64Array(A.buffer,3*U*A.BYTES_PER_ELEMENT,3*O),V=new Float64Array(E.buffer,3*U*E.BYTES_PER_ELEMENT,3*O),w=this._createGeometryData(t,V,T,"rings"===e),P=new D(w,a+"path"+C);P.singleUse=!0,d.push(P),u.push(this._material);var L=c.mat4f64.create();p.mat4.translate(L,L,g),y.push(L)}}}if(d.length>0){var R=new I({geometries:d,materials:u,transformations:y,castShadow:!1,metadata:{layerUid:this._context.layer.uid,graphicUid:i},idHint:a}),G=f.perVertexElevationAligner,z=new m(this,R,d,null,null,G,r);return z.alignedTerrainElevation=_.terrainElevation,z.needsElevationUpdates=b.needsElevationUpdates2D(r.mode),z}}return null},e.prototype._createGeometryData=function(t,e,r,a){var i=x.createPolylineGeometryData(e,r,a);if("round"===this._material.getParameters().join){var n=i.vertexAttributes[O.VertexAttrConstants.POSITION].data,s=n.length/3,o=new Float32Array(s),l=V,p=w;d.vec3.set(l,0,0,0);for(var c=0;c<s-1;++c){var h=c+1;d.vec3.set(p,n[3*h+0]-n[3*c+0],n[3*h+1]-n[3*c+1],n[3*h+2]-n[3*c+2]),d.vec3.normalize(p,p);var u=Math.PI-E.acos(d.vec3.dot(l,p)),y=u*P,g=1*y*this._lineWidthLOD;o[c]=Math.max(Math.floor(g),0),d.vec3.scale(l,p,-1)}i.vertexAttributes[O.VertexAttrConstants.SUBDIVISIONS]={size:1,data:o,offsetIdx:0,strideIdx:1},i.indices[O.VertexAttrConstants.SUBDIVISIONS]=i.indices[O.VertexAttrConstants.POSITION]}var f=new Uint32Array(i.vertexAttributes[O.VertexAttrConstants.POSITION].data.length);return i.indices[O.VertexAttrConstants.SIZE]=f,this._fastUpdates.enabled&&this._fastUpdates.visualVariables.size?(i.vertexAttributes[O.VertexAttrConstants.SIZEFEATUREATTRIBUTE]={size:1,data:this.getSizeFeatureAttribute(t.graphic),offsetIdx:0,strideIdx:1},i.indices[O.VertexAttrConstants.SIZEFEATUREATTRIBUTE]=f):(i.vertexAttributes[O.VertexAttrConstants.SIZE]={size:1,data:this.getDrivenSize(t.renderingInfo),offsetIdx:0,strideIdx:1},i.indices[O.VertexAttrConstants.SIZE]=f),this._fastUpdates.enabled&&this._fastUpdates.visualVariables.color?(i.vertexAttributes[O.VertexAttrConstants.COLORFEATUREATTRIBUTE]={size:1,data:this.getColorFeatureAttribute(t.graphic),offsetIdx:0,strideIdx:1},i.indices[O.VertexAttrConstants.COLORFEATUREATTRIBUTE]=f):(i.vertexAttributes[O.VertexAttrConstants.COLOR]={size:4,data:this.getDrivenColor(t.renderingInfo,t.graphic),offsetIdx:0,strideIdx:4},i.indices[O.VertexAttrConstants.COLOR]=f),this._fastUpdates.enabled&&this._fastUpdates.visualVariables.opacity&&(i.vertexAttributes[O.VertexAttrConstants.OPACITYFEATUREATTRIBUTE]={size:1,data:this.getOpacityFeatureAttribute(t.graphic),offsetIdx:0,strideIdx:1},i.indices[O.VertexAttrConstants.OPACITYFEATUREATTRIBUTE]=f),i},e.prototype._createAsOverlay=function(t,e,r,a,i){var n=t.graphic,s=this._getGeometry(n);this._material.renderPriority=this._symbolLayerOrder;var o=s[e],l=this._getOutlineGeometry(s,o),d=[],u=new Array(6),y=g.empty(),f=h.vec3f64.create(),m=b.getGeometryVertexDataDraped(l,s.spatialReference,this._context.overlaySR);if(this._logGeometryCreationWarnings(m,o,e,"LineSymbol3DLayer"),l.length>0){for(var _=m.vertexData,x=m.geometryData.outlines,A=0;A<x.length;++A){var E=x[A],C=E.index,D=E.count;if(b.computeBoundingBox(_,C,D,u),!b.boundingBoxClipped(u,this._context.clippingExtent)){g.expand(y,u),b.applyOrigin(_,C,D,f),b.setZ(_,C,D,this._getDrapedZ());var I=new Float64Array(_.buffer,3*C*_.BYTES_PER_ELEMENT,3*D),U=c.mat4f64.create();p.mat4.translate(U,U,f);var O=this._createGeometryData(t,I,null,"rings"===e),T=new S(O);T.data.layerUid=i,T.data.graphicUid=n.uid,T.material=this._material,T.center=[.5*(u[0]+u[3]),.5*(u[1]+u[4]),0],T.bsRadius=.5*Math.sqrt((u[3]-u[0])*(u[3]-u[0])+(u[4]-u[1])*(u[4]-u[1])),T.transformation=U,T.name=a,T.uniqueName=a+"#"+O.id,d.push(T)}}return new v(this,d,y)}return null},e}(_.Graphics3DSymbolLayer);e.Graphics3DLineSymbolLayer=T;var V=h.vec3f64.create(),w=h.vec3f64.create(),P=4/Math.PI;e.default=T});