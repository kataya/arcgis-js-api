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

define(["require","exports","../../../core/tsSupport/generatorHelper","../../../core/tsSupport/awaiterHelper","../../../core/Logger","../../../core/promiseUtils","../../../core/libs/gl-matrix-2/mat4","../../../core/libs/gl-matrix-2/mat4f64","./SimpleAtmosphereTechnique","./resources/SimpleAtmosphereTexture","../support/imageUtils","../support/buffer/glUtil","../support/buffer/InterleavedLayout","../webgl-engine/lib/DefaultVertexAttributeLocations","../webgl-engine/lib/GeometryUtil","../webgl-engine/lib/Util","../../webgl/BufferObject","../../webgl/Texture","../../webgl/Util","../../webgl/VertexArrayObject"],(function(e,t,r,i,o,n,s,a,l,u,h,c,p,m,f,g,y,d,b,x){var _=o.getLogger("esri.views.3d.environment.PanoramicAtmosphere"),v=function(){function e(e,t){this.slot=14,this._readyResolver=n.createResolver(),this._readyController=n.createAbortController(),this.view=e,this._techniqueRepository=t,this._atmosphereTechniqueConfig=new l.SimpleAtmosphereTechniqueConfiguration}return Object.defineProperty(e.prototype,"canRender",{get:function(){return null!=this._texture},enumerable:!0,configurable:!0}),e.prototype.destroy=function(){this._readyResolver.reject(),this._texture&&(this._texture.dispose(),this._texture=null),this._readyController&&(this._readyController.abort(),this._readyController=null)},e.prototype.when=function(){return this._readyResolver.promise},e.prototype.initializeRenderContext=function(e){var t=this,r=e.rctx;this._atmosphereTechniqueConfig.geometry=1,this._atmosphereTechnique=this._techniqueRepository.acquireAndReleaseExisting(l.SimpleAtmosphereTechnique,this._atmosphereTechniqueConfig,this._atmosphereTechnique),this._vao=this._createVertexArrayObject(r),this._vaoCount=b.vertexCount(this._vao,"geometry"),h.requestImage(u,{signal:this._readyController.signal}).then((function(r){t._texture=new d(e.rctx,{pixelFormat:6408,dataType:5121,wrapMode:33071,samplingMode:9729,flipped:!0},r),e.requestRender(),t._readyController=null,t._readyResolver.resolve()})).catch((function(e){n.isAbortError(e)||_.error("Unable to initialize atmosphere: image request failed",e),t._readyResolver.reject()}))},e.prototype.uninitializeRenderContext=function(){this.destroy()},e.prototype.render=function(e){if(e.slot!==this.slot||0!==e.pass)return!1;var t,r,i=e.rctx,o=this._atmosphereTechnique.program;return i.bindProgram(o),this._atmosphereTechnique.bindPipelineState(i),i.bindTexture(this._texture),o.setUniform1i("tex",0),o.setUniformMatrix4fv("proj",e.camera.projectionMatrix),t=w,r=e.camera.viewMatrix,s.mat4.copy(t,r),t[12]=0,t[13]=0,t[14]=0,t[15]=1,o.setUniformMatrix4fv("view",w),o.setUniform4f("color",1,1,1,1),e.scenelightingData.setLightDirectionUniform(o),i.bindVAO(this._vao),o.assertCompatibleVertexAttributeLocations(this._vao),i.drawArrays(4,0,this._vaoCount),!0},e.prototype._createVertexArrayObject=function(e){for(var t=f.createPolySphereGeometry(1,2,!1),r=t.indices[g.VertexAttrConstants.POSITION],i=0;i<r.length;i+=3){var o=r[i];r[i]=r[i+2],r[i+2]=o}var n=t.vertexAttributes[g.VertexAttrConstants.POSITION].data,s=C.createBuffer(r.length),a=s.position;for(i=0;i<r.length;++i){var l=3*r[i];a.set(i,0,n[l]),a.set(i,1,n[l+1]),a.set(i,2,n[l+2])}return new x(e,m.Default3D,{geometry:c.glLayout(C)},{geometry:y.createVertex(e,35044,s.buffer)})},e}();var w=a.mat4f64.create(),C=p.newLayout().vec3f("position");return v}));