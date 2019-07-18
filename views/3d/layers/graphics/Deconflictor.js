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

define(["require","exports","../../../../core/tsSupport/declareExtendsHelper","../../../../core/tsSupport/generatorHelper","../../../../core/tsSupport/decorateHelper","../../../../core/Accessor","../../../../core/Handles","../../../../core/PooledArray","../../../../core/watchUtils","../../../../core/accessorSupport/decorators","../../../../core/libs/gl-matrix-2/vec2f64","../../../../core/libs/gl-matrix-2/vec3","../../../../core/libs/gl-matrix-2/vec3f64","../../../../core/libs/gl-matrix-2/vec4f64","../../../../geometry/support/aaBoundingRect","./deconflictorDebug","../../support/debugFlags","../../support/earthUtils","../../support/geometryUtils","../../support/mathUtils","../../support/geometryUtils/sphere","../../webgl-engine/lib/screenSizePerspectiveUtils","../../webgl-engine/lib/Util","../../webgl-engine/materials/HUDMaterial","../../webgl-engine/materials/internal/MaterialUtil"],function(e,i,t,r,a,s,n,o,c,h,l,p,u,f,d,v,g,y,b,m,G,x,w,D,S){function M(e){var i,t,a,s;return r(this,function(r){switch(r.label){case 0:i=[];for(t in e)i.push(t);a=0,r.label=1;case 1:return a<i.length?(s=i[a],[4,e[s]]):[3,4];case 2:r.sent(),r.label=3;case 3:return a++,[3,1];case 4:return[2]}})}Object.defineProperty(i,"__esModule",{value:!0});var V=f.vec4f64.create(),C=f.vec4f64.create(),P=f.vec4f64.create(),B=f.vec4f64.create(),E=b.sphere.create(),I=b.ray.create(),F=u.vec3f64.create(),A=d.create(),R=d.create(),O=function(){function e(){this.xMin=0,this.xMax=0,this.yMin=0,this.yMax=0,this.posView=0,this.culled=!1,this.visible=!1,this.pooled=!1}return e}(),T=function(){function e(e,i,t){void 0===t&&(t={}),this.graphics3DGraphic=e,this.slicePlaneEnabled=i,this.info=t}return e}(),U=function(){function e(e,i){void 0===i&&(i=new Map),this.graphics3DCore=e,this.graphics=i}return e}(),N=function(e){function i(){var i=null!==e&&e.apply(this,arguments)||this;return i.handles=new n,i.dirty=!1,i.state=0,i.contexts=[],i.graphics=null,i.iterators=null,i.accBinsNumX=15,i.accBinsNumY=20,i.accBinsSizeX=0,i.accBinsSizeY=0,i.accBins=null,i.accNumTests=0,i._iconMarginFactor=-.1,i.slicePlaneViewSpace=null,i}return t(i,e),Object.defineProperty(i.prototype,"iconMarginFactor",{get:function(){return this._iconMarginFactor},set:function(e){this._iconMarginFactor=e,this.setDirty()},enumerable:!0,configurable:!0}),i.prototype.initialize=function(){var e,i,t=this;this.graphics=(e={},e[0]={active:{},visible:new o,remove:new o},e[1]={active:{},visible:new o,remove:new o},e),this.iterators=(i={},i[0]={active:null,visible:null,remove:null,sort:null},i[1]={active:null,visible:null,remove:null,sort:null},i),this.handles.add([this.view.watch("state.camera",function(){t.updateSlicePlane(),t.setDirtyUrgent()}),this.view.watch("map.ground.opacity",function(e,i){1!==e&&1!==i||t.setDirtyUrgent()}),c.init(this.view,"slicePlane",function(){return t.updateSlicePlane()})]),this.frameWorker=this.view.resourceController.scheduler.registerTask(12,function(e){return t.run(e)},function(){return t.needsUpdate()})},i.prototype.updateSlicePlane=function(){var e=this.view&&this.view.slicePlane;if(!e)return void(this.slicePlaneViewSpace&&(this.slicePlaneViewSpace=null,this.slicePlaneChanged()));this.slicePlaneViewSpace||(this.slicePlaneViewSpace=b.boundedPlane.create());var i=this.view.state.camera,t=i.viewMatrix;b.boundedPlane.transform(e,t,this.slicePlaneViewSpace),this.slicePlaneChanged()},i.prototype.slicePlaneChanged=function(){for(var e=0,i=this.contexts;e<i.length;e++){if(i[e].graphics3DCore.symbolCreationContext.slicePlaneEnabled){this.setDirty();break}}},i.prototype.destroy=function(){this.handles.destroy(),this.handles=null,this.frameWorker&&(this.frameWorker.remove(),this.frameWorker=null),this.graphics[0].active=null,this.graphics[0].visible.clear(),this.graphics[0].remove.clear(),this.graphics[1].active=null,this.graphics[1].visible.clear(),this.graphics[1].remove.clear(),this.graphics=null,this.iterators=null},i.prototype.addGraphicsOwner=function(e){var i,t=this,r=this.findDeconflictionContext(e);return-1!==r?i=this.contexts[r]:(i=new U(e),this.contexts.push(i),this.setDirtyUrgent()),{addGraphic:function(e){return t.addGraphic(i,e)},removeGraphic:function(e){return t.removeGraphic(i,e)},labelingInfoChange:function(){return t.globalLabelingInfoChanged(i)},visibilityInfoChange:function(){},featureReductionChange:function(){return t.globalFeatureReductionChanged(i)},slicePlaneEnabledChange:function(){return t.globalSlicePlaneEnabledChanged(i)},clear:function(){return i.graphics.forEach(function(e){return t.removeGraphic(i,e.graphics3DGraphic)})}}},i.prototype.removeGraphicsOwner=function(e){var i=this,t=this.findDeconflictionContext(e);if(-1!==t){var r=this.contexts.splice(t,1)[0];r.graphics.forEach(function(e){return i.removeGraphic(r,e.graphics3DGraphic)}),this.setDirtyUrgent()}},i.prototype.setInitialIconVisibilityFlag=function(e,i){var t=!(this.graphicSupportsDeconfliction(i)&&this.isFeatureReductionEnabled(e));i.setVisibilityFlag(3,t,0)},i.prototype.setDirtyUrgent=function(){!this.dirty&&this.contexts.length>0&&(this.dirty=!0,this.notifyChange("updating")),this.frameWorker.priority=2},i.prototype.setDirty=function(){!this.dirty&&this.contexts.length>0&&(this.dirty=!0,this.notifyChange("updating"),this.frameWorker.priority=12)},Object.defineProperty(i.prototype,"updating",{get:function(){return 0!==this.state||this.dirty},enumerable:!0,configurable:!0}),i.prototype.needsUpdate=function(){return this.view.ready&&null!=this.view.state&&this.updating},i.prototype.run=function(e){switch(this.state){case 0:v.prepare(this.view),this.dirty=!1,this.camera=this.view.state.camera;var i=this.camera.fullWidth,t=this.camera.fullHeight;this.initBins(i,t),this.resetIterators(),e.madeProgress();case 1:if(this.state=1,!this.processActiveGraphics(0,e))return;case 3:if(this.state=3,!this.cleanVisibleGraphics(0,e))return;case 5:if(this.state=5,!this.sortVisibleGraphics(0,e))return;case 7:if(this.state=7,!this.deconflictVisibleGraphics(0,e))return;v.drawAccelerationStruct(this,this.graphics[0].visible);case 2:if(this.state=2,!this.processActiveGraphics(1,e))return;case 4:if(this.state=4,!this.cleanVisibleGraphics(1,e))return;case 6:if(this.state=6,!this.sortVisibleGraphics(1,e))return;case 8:if(this.state=8,!this.deconflictVisibleGraphics(1,e))return;v.drawAccelerationStruct(this,this.graphics[1].visible);default:this.state=0,this.notifyChange("updating")}},i.prototype.findDeconflictionContext=function(e){for(var i=0;i<this.contexts.length;i++)if(this.contexts[i].graphics3DCore===e)return i;return-1},i.prototype.globalFeatureReductionChanged=function(e){var i=this.isFeatureReductionEnabled(e.graphics3DCore);i||this.clearVisibilityFlags(e),this.modifyGraphics(e,i,0)},i.prototype.globalLabelingInfoChanged=function(e){var i=this.isLabelDeconflictionEnabled(e.graphics3DCore);this.modifyGraphics(e,i,1)},i.prototype.globalSlicePlaneEnabledChanged=function(e){var i=e.graphics3DCore.symbolCreationContext.slicePlaneEnabled;e.graphics.forEach(function(e){e.slicePlaneEnabled=i}),this.setDirtyUrgent()},i.prototype.modifyGraphics=function(e,i,t){var r=this;i?e.graphics.forEach(function(e){return r.addToActiveGraphics(e,t)}):e.graphics.forEach(function(e){return r.removeFromActiveGraphics(e,t)}),this.setDirtyUrgent()},i.prototype.graphicSupportsDeconfliction=function(e){var i=e._graphics;if(!i||!i.length)return!1;if(e.isDraped())return!1;for(var t=0,r=i;t<r.length;t++){var a=r[t];if(this.graphics3DGraphicsLayerSupportsDeconfliction(a))return!0}return!1},i.prototype.graphics3DGraphicsLayerSupportsDeconfliction=function(e){if(!e||"object3d"!==e.type)return!1;var i=e.stageObject;return 1===(i?i.getNumGeometryRecords():0)&&i.getGeometryRecord(0).material instanceof D},i.prototype.addGraphic=function(e,i){var t=i.graphic.uid,r=new T(i,e.graphics3DCore.symbolCreationContext.slicePlaneEnabled);e.graphics.set(t,r),this.isFeatureReductionEnabled(e.graphics3DCore)&&this.addToActiveGraphics(r,0),this.isLabelDeconflictionEnabled(e.graphics3DCore)&&this.addToActiveGraphics(r,1),this.setDirty()},i.prototype.removeGraphic=function(e,i){var t=i.graphic.uid,r=e.graphics.get(t);r&&(this.removeFromActiveGraphics(r,0),this.removeFromActiveGraphics(r,1),e.graphics.delete(t),this.setDirty())},i.prototype.addToActiveGraphics=function(e,i){e.info[i]=new O;var t=e.graphics3DGraphic.graphic.uid;this.graphics[i].active[t]=e},i.prototype.removeFromActiveGraphics=function(e,i){this.removeFromVisibleGraphics(e,i),this.clearGraphicVisibility(e,i),delete e.info[i];var t=e.graphics3DGraphic.graphic.uid;delete this.graphics[i].active[t]},i.prototype.addToVisibleGraphics=function(e,i){var t=e.info[i];t&&!t.pooled&&(this.graphics[i].visible.push(e),t.pooled=!0)},i.prototype.removeFromVisibleGraphics=function(e,i){var t=e.info[i];t&&t.pooled&&(this.graphics[i].remove.push(e),t.pooled=!1)},i.prototype.processActiveGraphics=function(e,i){for(var t=this.getOrCreateActiveGraphicsIterator(e),r="global"===this.view.viewingMode&&1===this.view.map.ground.opacity&&this.camera&&this.camera.relativeElevation>0;!i.done;){i.madeProgress();var a=t.next();if(a.done)return this.resetActiveGraphicsIterator(e),!0;var s=a.value,n=s&&s.info[e];n&&(this.collectGraphics3DGraphics(s,e,r),n.culled?this.removeFromVisibleGraphics(s,e):this.addToVisibleGraphics(s,e))}return!1},i.prototype.cleanVisibleGraphics=function(e,i){for(var t=this.graphics[e],r=this.ensureRemoveGraphicsIterator(e,i);!i.done;){var a=r.next();if(i.madeProgress(),a.done)return t.remove.clear(),this.resetRemoveGraphicsIterator(e),!0}return!1},i.prototype.sortVisibleGraphics=function(e,i){for(var t=this.ensureSortGraphicsIterator(e,function(i,t){return i.info[e]&&t.info[e]?t.info[e].posView-i.info[e].posView:Number.MAX_VALUE},i);!i.done;){var r=t.next();if(i.madeProgress(),r.done)return this.resetSortGraphicsIterator(e),!0}return!1},i.prototype.deconflictVisibleGraphics=function(e,i){for(var t=this.getOrCreateVisibleGraphicsIterator(e),r=1===e;!i.done;){i.madeProgress();var a=t.next();if(a.done)return this.resetVisibleGraphicsIterator(e),!0;var s=a.value,n=s.info[e];if(n&&!n.culled){var o=s.graphics3DGraphic,c=r&&!o.isVisible(),h=!c&&!this.doesIntersectExistingPoly(s,e);n.visible=h,h&&this.addToBins(s,e),this.setGraphicVisibility(s,e,h),h&&v.drawPoly(n,h?"green":"red")}}return!1},i.prototype.resetIterators=function(){this.iterators[0].active=null,this.iterators[0].visible=null,this.iterators[0].remove=null,this.iterators[0].sort=null,this.iterators[1].active=null,this.iterators[1].visible=null,this.iterators[1].remove=null,this.iterators[1].sort=null},i.prototype.getOrCreateActiveGraphicsIterator=function(e){var i=this.graphics[e],t=this.iterators[e];return t.active||(t.active=M(i.active)),t.active},i.prototype.resetActiveGraphicsIterator=function(e){this.iterators[e].active=null},i.prototype.getOrCreateVisibleGraphicsIterator=function(e){var i=this.graphics[e],t=this.iterators[e];return t.visible||(t.visible=i.visible.iterableForEach()),t.visible},i.prototype.resetVisibleGraphicsIterator=function(e){this.iterators[e].visible=null},i.prototype.ensureRemoveGraphicsIterator=function(e,i){var t=this.graphics[e],r=this.iterators[e];return r.remove||(r.remove=t.visible.iterableRemoveMany(t.remove.data,function(){return i.done})),r.remove},i.prototype.resetRemoveGraphicsIterator=function(e){this.iterators[e].remove=null},i.prototype.ensureSortGraphicsIterator=function(e,i,t){var r=this.graphics[e],a=this.iterators[e];return a.sort||(a.sort=r.visible.iterableSort(i,function(){return t.done})),a.sort},i.prototype.resetSortGraphicsIterator=function(e){this.iterators[e].sort=null},i.prototype.collectGraphics3DGraphics=function(e,i,t){var r=e.graphics3DGraphic;if(!r.destroyed){var a=1===i,s=a?r._labelGraphics:r._graphics,n=a?0:this.iconMarginFactor,o=e.info[i];if(!r.isVisible(0,3))return void(o.culled=!0);for(var c,h,l=d.empty(A),f=0,v=s;f<v.length;f++){var D=v[f];if(this.graphics3DGraphicsLayerSupportsDeconfliction(D)){var M=D.stageObject,O=M.getGeometryRecord(0),T=O.material,U=this.camera,N=O.geometry.data,X=N.getVertexAttr();if(t&&(E.radius=y.earthRadius,p.vec3.sub(I.direction,M.getCenter(),this.camera.eye),p.vec3.copy(I.origin,this.camera.eye),G.intersectRay(E,I,F))){var Y=Math.abs(Math.tan(p.vec3.angle(M.getCenter(),I.direction))),_=1-Y/this.view.width,W=Math.pow(_,4),j=p.vec3.sqrDist(this.camera.eye,F);if(W*p.vec3.sqrDist(this.camera.eye,M.getCenter())>j)return void(o.culled=!0)}if(!h){var k=M.getCenter(),H=O.origin.vec3;S.transformToWorld(k,H,V),S.transformToView(V,H,U.viewMatrix,C);var q=X[w.VertexAttrConstants.NORMAL].data;if(T.applyVerticalOffsetTransformation(C,q,M.objectTransformation,U,z),e.slicePlaneEnabled&&this.slicePlaneViewSpace&&b.boundedPlane.extrusionContainsPoint(this.slicePlaneViewSpace,C))return void(o.culled=!0);var Z=X[w.VertexAttrConstants.AUXPOS1].data,J="screen"!==T.getParameters().centerOffsetUnits,K=J?Z:u.vec3f64.ZEROS;S.transformToProjection(C,U.projectionMatrix,K,P),h=S.transformToNDC(P,B),J||(h[0]+=Z[0]/U.fullWidth*2,h[1]+=Z[1]/U.fullHeight*2);if(h[0]<-1||h[1]<-1||h[2]<-1||h[0]>=1||h[1]>=1)break;c=C[2],!g.DISABLE_DECONFLICTOR_VISIBILITY_OFFSET&&o.visible&&(c*=.7)}var Q=D.getScreenSize(L);Q[0]*=U.pixelRatio,Q[1]*=U.pixelRatio,x.applyPrecomputedScaleFactorVec2(Q,z.factor,Q);var $=d.offset(T.calculateRelativeScreenBounds(Q,z.factorAlignment.scale,R),m.lerp(0,U.fullWidth,.5+.5*h[0]),m.lerp(0,U.fullHeight,.5+.5*h[1]));if(0!==n){var ee=n*Math.min(d.width($),d.height($));$[0]-=ee,$[1]-=ee,$[2]+=ee,$[3]+=ee}d.expand(l,$)}}null==c?o.culled=!0:(o.xMin=l[0],o.yMin=l[1],o.xMax=l[2],o.yMax=l[3],o.posView=c,o.culled=!1)}},i.prototype.doesIntersectExistingPoly=function(e,i){for(var t=e.graphics3DGraphic.graphic.uid,r=e.info[i],a=Math.floor(r.xMin/this.accBinsSizeX);a<=Math.floor(r.xMax/this.accBinsSizeX);a++)if(!(a<0||a>=this.accBinsNumX))for(var s=Math.floor(r.yMin/this.accBinsSizeY);s<=Math.floor(r.yMax/this.accBinsSizeY);s++)if(!(s<0||s>=this.accBinsNumY))for(var n=this.accBins[a][s],o=0;o<n.length;o++){var c=n.data[o],h=c.info[i];if(h&&h.visible&&(c.graphics3DGraphic.graphic.uid!==t&&(this.accNumTests++,!(h.xMin>r.xMax||h.xMax<r.xMin||h.yMin>r.yMax||h.yMax<r.yMin))))return!0}return!1},i.prototype.initBins=function(e,i){if(null==this.accBins){this.accBins=[];for(var t=0;t<this.accBinsNumX;t++){this.accBins.push([]);for(var r=this.accBins[this.accBins.length-1],a=0;a<this.accBinsNumY;a++)r.push(new o)}}for(var t=0;t<this.accBinsNumX;t++)for(var a=0;a<this.accBinsNumY;a++)this.accBins[t][a].clear();this.accBinsSizeX=e/this.accBinsNumX,this.accBinsSizeY=i/this.accBinsNumY,this.accNumTests=0},i.prototype.addToBins=function(e,i){for(var t=e.info[i],r=Math.floor(t.xMin/this.accBinsSizeX);r<=Math.floor(t.xMax/this.accBinsSizeX);r++)if(!(r<0||r>=this.accBinsNumX))for(var a=Math.floor(t.yMin/this.accBinsSizeY);a<=Math.floor(t.yMax/this.accBinsSizeY);a++)a<0||a>=this.accBinsNumY||this.accBins[r][a].push(e)},i.prototype.isFeatureReductionEnabled=function(e){var i=e.layer;return!(!i||!i.featureReduction||"selection"!==i.featureReduction.type)},i.prototype.isLabelDeconflictionEnabled=function(e){return e.labelsEnabled},i.prototype.clearVisibilityFlags=function(e){var i=e.graphics3DCore.graphics3DGraphics;i&&i.forEach(function(e){return e.clearVisibilityFlag(3)})},i.prototype.setGraphicVisibility=function(e,i,t){var r=e.graphics3DGraphic;r.destroyed||(r.setVisibilityFlag(3,t,i),1===i&&this.view.labeler.setLabelGraphicVisibility(r,t))},i.prototype.clearGraphicVisibility=function(e,i){var t=e.graphics3DGraphic;t.destroyed||t.clearVisibilityFlag(3,i)},a([h.property({constructOnly:!0})],i.prototype,"view",void 0),a([h.property({type:Boolean,readOnly:!0})],i.prototype,"updating",null),i=a([h.subclass("esri.views.3d.layers.graphics.Deconflictor")],i)}(h.declared(s));i.Deconflictor=N;var z={factor:{scale:0,factor:0,minPixelSize:0,paddingPixels:0},factorAlignment:{scale:0,factor:0,minPixelSize:0,paddingPixels:0}},L=l.vec2f64.create()});