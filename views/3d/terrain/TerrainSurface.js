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

define(["require","exports","../../../core/tsSupport/assignHelper","../../../core/tsSupport/declareExtendsHelper","../../../core/tsSupport/decorateHelper","../../../Color","../../../core/Accessor","../../../core/arrayUtils","../../../core/CollectionFlattener","../../../core/Evented","../../../core/Handles","../../../core/Logger","../../../core/mathUtils","../../../core/maybe","../../../core/ObjectPool","../../../core/PooledArray","../../../core/promiseUtils","../../../core/scheduling","../../../core/watchUtils","../../../core/accessorSupport/decorators","../../../core/libs/gl-matrix-2/mat4","../../../core/libs/gl-matrix-2/mat4f64","../../../core/libs/gl-matrix-2/vec3","../../../core/libs/gl-matrix-2/vec3f64","../../../core/libs/gl-matrix-2/vec4f64","../../../geometry/support/aaBoundingRect","../../../layers/support/LercWorker","../../../layers/support/TilemapCache","../layers/ElevationLayerView3D","../support/debugFlags","../support/geometryUtils","../support/projectionUtils","./ElevationBounds","./ElevationData","./ElevationTileAgent","./MapTileAgent","./OverlayManager","./PlanarPatch","./SphericalPatch","./SurfaceExtentHelper","./SurfaceTilingSchemeLogic","./TerrainConst","./TerrainRenderer","./terrainUtils","./Tile","./TilemapOnlyTile","./tileUtils","./tileUtils","./UpsampleInfo","../../support/Scheduler","@dojo/framework/shim/Promise"],(function(e,t,i,r,n,a,s,l,o,d,u,p,h,c,_,y,f,g,v,m,T,w,L,S,b,P,x,E,O,R,M,C,A,I,V,U,D,k,j,q,B,F,H,N,W,X,G,Z,Y,z){var K=p.getLogger("esri.views.3d.terrain.TerrainSurface"),J=function(t){function s(e){var i=t.call(this,e)||this;return i.defaultTileBackground=F.DEFAULT_TILE_BACKGROUND,i.hideSkirtsDistanceFromExtentMargin=$,i.hideSkirtsMinimumCameraTilt=ee,i.hideSkirtsMaximumCameraTilt=te,i._clippingExtent=null,i._dataExtent=null,i._elevationBounds=new A.ElevationBounds,i._rootExtent=P.create(),i._iteratorPool=new _(Z.IteratorPreorder),i._postorderIterator=new Z.IteratorPostorder,i._visible=!1,i._pendingUpdates=!1,i._asyncWorkItems=0,i._usedMemory=ie,i._isFrameProcessing=!1,i._viewChangeUpdateDirty=!1,i._overlayOpacity=1,i._eyePosRenderSR=S.vec3f64.create(),i._eyePosSurfaceSR=S.vec3f64.create(),i._splitLimits=new W.SplitLimits,i._snapLevel=1/0,i._frustum=M.frustum.create(),i._viewProjectionMatrix=w.mat4f64.create(),i._layerViews=[new Array,new Array],i._layerIndexByLayerViewId=[new Map,new Map],i._basemapLayerViewHandles=new Map,i._handles=new u,i._allTiles=new y,i._topLevelTilemapOnlyTiles=new Array,i._upsampleInfoPool=new _(Y),i._visibleLevels=new y({deallocator:null}),i._getElevationData={spatialReference:null,rootTiles:null},i.maxTextureScale=1.2,i.rootTiles=null,i.backgroundImage=F.DEFAULT_TILE_BACKGROUND,i.backgroundColor=null,i._scheduledLayerViewChangesHandle=null,i}return r(s,t),s.prototype.initialize=function(){var t=this;this._stage=this.view._stage,this._lercWorker=x.acquireInstance(this.view.resourceController.scheduler),this._tilePool="planar"===this.manifold?new _(k.PlanarPatch):new _(j.SphericalPatch),this._upsampleMapCache=this.view.resourceController.memoryController.getMemCache("esri.views.3d.terrain.upsample",(function(e){return e.unloadMapData()})),this._set("overlayManager",new D.OverlayManager({terrainSurface:this,view:this.view})),this._handles.add([this.watch("overlayManager.hasHighlights",(function(e){return t._renderer.setNeedsHighlight(e)})),this.watch("overlayManager.rendersOccluded",(function(e){return t._renderer.setRenderOccludedOverlay(e)}))],"overlayManager"),this._renderer=new H({manifold:this.manifold,overlayRenderer:this.overlayManager.renderer}),this._renderer.install(this.view._stage),this._handles.add([v.init(this,"baseOpacity",(function(e){return t._updateBaseOpacity(e)}),!0),v.init(this,"_background",(function(){return t._renderer.setTileBackground(t._background)}),!0),this.view.watch("pointsOfInterest",(function(e){return t._renderer.pointsOfInterest=e})),v.whenTrue(R,"TERRAIN_DEBUG_POPUP",(function(){new Promise((function(t,i){e(["./support/TerrainDebugPopupOpener"],t,i)})).then((function(e){var i=new e.TerrainDebugPopupOpener({surface:t});v.whenFalseOnce(R,"TERRAIN_DEBUG_POPUP",(function(){return i.destroy()}))}))}))]);var i={layers:this.view.map.allLayers,layerViews:this.view.allLayerViews,spatialReference:this.view.spatialReference};this.extentHelper="spherical"===this.manifold?new q.SurfaceExtentHelperGlobal(i):new q.SurfaceExtentHelperLocal(i),this._handles.add(v.init(this.extentHelper,"stencilEnabledExtents",(function(e){return t._renderer.setStencilEnabledLayerExtents(e)})),"extentHelper");var r=this.view.defaultsFromMap?new o({root:this.view.map,rootCollectionNames:this.view.defaultsFromMap.mapCollectionPaths,getChildrenFunction:function(e){return e.layers}}):this.view.map.allLayers,n=new B({layers:r,extentHelper:this.extentHelper,manifold:this.manifold,viewSpatialReference:this.view.spatialReference});this._set("tilingSchemeLogic",n),this._handles.add([this.tilingSchemeLogic.watch("tilingScheme",(function(){return t._updateTilingSchemeAndExtent()}),!0),this.tilingSchemeLogic.watch("extent",(function(){return t._updateTilingSchemeAndExtent()}),!0)],"tilingSchemeLogic"),this._updateTilingSchemeAndExtent(),this._elevationDataRequester=this.view.resourceController.createStreamDataRequester(0),this._mapDataRequester=this.view.resourceController.createStreamDataRequester(1);var a=this.view.resourceController.scheduler;this._handles.add(a.registerTask(z.Task.TERRAIN_SURFACE,(function(e){return t._frame(e)}),(function(){return t.updating}))),this.view.resourceController.memoryController.events.on("quality-changed",(function(){return t._viewChangeUpdate()})),this._handles.add([this.view.on("resize",(function(){return t._viewChangeUpdate()})),this.view.watch("state.camera",(function(){return t._viewChangeUpdate()}),!0),this.view.watch("qualitySettings.tiledSurface.lodBias",(function(){return t._viewChangeUpdate()})),v.init(this.view,"qualitySettings.tiledSurface.textureFadeDuration",(function(e){return t._renderer.textureFadingEnabled=e>0})),this.view.watch("lodSnapping",(function(){return t._viewChangeUpdate()})),this.view.watch("clippingArea",(function(){return t._clippingChanged()}))]),this._handles.add(this.view.allLayerViews.on("after-changes",(function(){return t._scheduleLayerViewChangesUpdate()}))),this._handleLayerViewChanges(),this._updateClippingExtent(),this.notifyChange("extent")},s.prototype.destroy=function(){var e=this;this._handles.destroy(),x.releaseInstance(this._lercWorker),this._lercWorker=null,this._removeAllTiles(),this._upsampleMapCache.destroy(),this._upsampleMapCache=null,this.tilingSchemeLogic.destroy(),this._set("tilingSchemeLogic",null),this.extentHelper.destroy(),this.extentHelper=null,this._basemapLayerViewHandles.forEach((function(t,i){return e._unregisterTiledLayerView(i)})),this._elevationDataRequester=null,this._mapDataRequester=null,this.overlayManager&&(this.overlayManager.destroy(),this._set("overlayManager",null)),this._tilePool.destroy(),this._tilePool=null,V.Pool.prune(0),U.Pool.prune(0),this._renderer.uninstall(this._stage),this._renderer.destroy(),this._renderer=null,this._iteratorPool.destroy(),this._iteratorPool=null,this._set("view",null),this._stage=null,this._upsampleInfoPool.destroy(),this._upsampleInfoPool=null},Object.defineProperty(s.prototype,"renderer",{get:function(){return this._renderer},enumerable:!0,configurable:!0}),Object.defineProperty(s.prototype,"frustum",{get:function(){return this._frustum},enumerable:!0,configurable:!0}),Object.defineProperty(s.prototype,"snapLevel",{get:function(){return Math.round(this._snapLevel)},enumerable:!0,configurable:!0}),Object.defineProperty(s.prototype,"upsampleInfoPool",{get:function(){return this._upsampleInfoPool},enumerable:!0,configurable:!0}),Object.defineProperty(s.prototype,"upsampleMapCache",{get:function(){return this._upsampleMapCache},enumerable:!0,configurable:!0}),Object.defineProperty(s.prototype,"cullBackFaces",{set:function(e){this._renderer.cullBackFaces=e,this._set("cullBackFaces",e)},enumerable:!0,configurable:!0}),Object.defineProperty(s.prototype,"extent",{get:function(){return this._clippingExtent||this._rootExtent},enumerable:!0,configurable:!0}),Object.defineProperty(s.prototype,"updating",{get:function(){return!(!(this._pendingUpdates||this._renderer.updating||this.overlayManager.updating||this._scheduledLayerViewChangesHandle)||!this.ready||this.suspended)},enumerable:!0,configurable:!0}),Object.defineProperty(s.prototype,"ready",{get:function(){return!!this.rootTiles},enumerable:!0,configurable:!0}),Object.defineProperty(s.prototype,"renderOrder",{set:function(e){this._renderer.renderOrder=e,this._set("renderOrder",e)},enumerable:!0,configurable:!0}),Object.defineProperty(s.prototype,"skirtScale",{set:function(e){this._renderer.skirtScale=e,this._set("skirtScale",e)},enumerable:!0,configurable:!0}),Object.defineProperty(s.prototype,"spatialReference",{get:function(){var e=this.tilingScheme&&this.tilingScheme.spatialReference||null;return this._getElevationData.spatialReference=e,e},enumerable:!0,configurable:!0}),Object.defineProperty(s.prototype,"_background",{get:function(){return null!=this.backgroundColor?this.backgroundColor:this.backgroundImage},enumerable:!0,configurable:!0}),Object.defineProperty(s.prototype,"slicePlaneEnabled",{set:function(e){this._renderer.slicePlane=e,this._set("slicePlaneEnabled",e)},enumerable:!0,configurable:!0}),Object.defineProperty(s.prototype,"velvetOverground",{set:function(e){e!==this.velvetOverground&&(this._renderer.velvetOverground=e),this._set("velvetOverground",e)},enumerable:!0,configurable:!0}),Object.defineProperty(s.prototype,"wireframe",{set:function(e){this._renderer.setWireframe(e),this._set("wireframe",e)},enumerable:!0,configurable:!0}),Object.defineProperty(s.prototype,"visible",{set:function(e){e!==this._visible&&(this._visible=e,this._renderer.setVisibility(e),this.suspended=!e)},enumerable:!0,configurable:!0}),s.prototype.isOpaque=function(){return this._renderer.opaque},Object.defineProperty(s.prototype,"suspended",{set:function(e){this._set("suspended",e),this._viewChangeUpdate()},enumerable:!0,configurable:!0}),Object.defineProperty(s.prototype,"lodSnapping",{get:function(){return this.view.qualitySettings.tiledSurface.reduceTileLevelDifferences?0:1},enumerable:!0,configurable:!0}),s.prototype.intersect=function(e,t,i,r){this._renderer.intersect(e,t,i,r)},s.prototype.getElevation=function(e,t,i,r){var n=this._getElevationData.rootTiles;if(!n||!n.length)return null;if(0===n[0].layerInfo[0].length)return null;var a=re;if(a[0]=e,a[1]=t,a[2]=i,!C.vectorToVector(a,r,a,this._getElevationData.spatialReference))return K.error("TerrainSurface.getElevation(): could not project given point to tiling scheme coordinate system"),null;for(var s=0,l=n;s<l.length;s++){var o=l[s];if(o.containsPoint(a)){for(;o&&!o.rendered&&!o.isLeaf;){var d=0;a[0]>.5*(o.extent[0]+o.extent[2])&&(d+=1),a[1]<.5*(o.extent[1]+o.extent[3])&&(d+=2),o=o.children[d]}var u=o.renderData,p=u&&u.geometryState?u.geometryState.samplerData:null;return p?I.ElevationData.sample(a[0],a[1],p):null}}return null},Object.defineProperty(s.prototype,"elevationBounds",{get:function(){return this._elevationBounds},enumerable:!0,configurable:!0}),s.prototype.getScale=function(e){if(this.tilingScheme){if(!C.pointToVector(e,re,this.spatialReference))return K.error("TerrainSurface.getElevation(): could not project given point to tiling scheme coordinate system"),null;var t=this.rootTiles;if(t)for(var i=0,r=t;i<r.length;i++){var n=r[i];if(n.containsPoint(re)){for(;null!=n.children[0];){var a=0;re[0]>n.children[0].extent[2]&&(a+=1),re[1]<n.children[0].extent[1]&&(a+=2),n=n.children[a]}return this._getLodBiasCorrectedScale(n.level)}}}return 1e100},s.prototype.queryVisibleScaleRange=function(e,t,i,r){var n=t?this.tilingScheme.levelAtScale(t):0,a=i?this.tilingScheme.levelAtScale(i):1/0,s=this.lodBias;this._renderer.queryVisibleLevelRange(e,n+s,a+s,r)},s.prototype._updateBaseOpacity=function(e){var t=this._renderer.opaque;this._renderer.opaque=e>=1;var i=t!==this._renderer.opaque;this._updateTileTextures(i)},s.prototype._updateTilingSchemeAndExtent=function(){var e=this.tilingSchemeLogic.extent,t=e&&!P.equals(e,this._dataExtent);t&&(this._dataExtent?P.set(this._dataExtent,e):this._dataExtent=P.create(e));var i=this.tilingSchemeLogic.tilingScheme,r=i!==this.tilingScheme;r&&(N.weakAssert(!!i,"tiling scheme cannot be reset to undefined"),this.tilingScheme&&this._removeAllTiles(),this._set("tilingScheme",i),this._updateClippingExtent(),i&&(this._updateTiledLayers(),this._renderer.setTileSize(i.pixelSize),this.overlayManager.setSpatialReference(i.spatialReference,"spherical"===this.manifold))),(t||r)&&this._updateRootTiles()},s.prototype._acquireTile=function(e,t,i,r){var n=this._tilePool.acquire();return ae[0]=e,ae[1]=t,ae[2]=i,n.init(ae,r,this),n},s.prototype._updateRootTiles=function(){var e=this,t=this._clippingExtent||this._dataExtent,i=this.tilingScheme;if(t&&i){var r=ne,n=i.rootTilesInExtent(t,r,5*F.MAX_ROOT_TILES),a=function(t){var i=e._acquireTile(0,t[1],t[2],null);return 2===i.shouldSplit(e._splitLimits,e._eyePosRenderSR,e.lodSnapping)&&i.setPendingUpdate(2),e._loadTile(i),i};if(this.rootTiles){if(n.length>F.MAX_ROOT_TILES)return void K.warn(F.TOO_MANY_ROOT_TILES_AFTER_CHANGE_ERROR);var s=this.rootTiles.map((function(e){return e.lij})),o=l.difference(s,n,Q);if(o.removed.length>0||o.added.length>0){var d=this.rootTiles.filter((function(t){return!(l.findIndex(o.removed,Q.bind(null,t.lij))>-1)||(e._purgeTile(t),!1)}));o.added.forEach((function(e){return d.push(a(e))})),this._setRootTiles(d)}}else n.length>F.MAX_ROOT_TILES&&(K.warn(F.TOO_MANY_ROOT_TILES_FOR_LAYER_ERROR),n=i.rootTilesInExtent(t,r,F.MAX_ROOT_TILES)),this._setRootTiles(n.map((function(e){return a(e)})));P.equals(r,this._rootExtent)||(this._rootExtent=P.create(r),this._hasFixedExtent()||this.notifyChange("extent")),this.visible=!0,this._viewChangeUpdate(),this.overlayManager.setOverlayPlacementDirty(),this.notifyChange("ready")}},s.prototype._setRootTiles=function(e){this._set("rootTiles",e),this._allTiles.clear(),e&&this._allTiles.pushArray(e),this._getElevationData.rootTiles=e,this._renderer.setRootTiles(this.rootTiles),this._updateTiles(e)},s.prototype._runViewChangeUpdateIfDirty=function(){this._viewChangeUpdateDirty&&(this._viewChangeUpdateDirty=!1,this._viewChangeUpdate())},s.prototype._viewChangeUpdate=function(){this._stage&&!this.suspended&&this.tilingScheme&&this._visible&&(this._isFrameProcessing?this._viewChangeUpdateDirty=!0:(this._viewChangeUpdateDirty=!1,this._updateViewDependentParameters(),this._updateSkirts(),this.updateOverlayOpacity(),this._updateTiles(this.rootTiles)))},s.prototype._updateClippingStatus=function(e){e.updateClippingStatus(this._clippingExtent)&&e.resetPendingUpdate(32)&&this._updateTileGeometry(e)},s.prototype._updateTiles=function(e){if(e){var t,i,r=this._iteratorPool.acquire();for(r.reset(e),G.hasVisibleSiblings(e)?(t=this._elevationBounds.min,i=this._elevationBounds.max):(t=1/0,i=-1/0);!r.done;){var n=r.next();if(this._updateClippingStatus(n),n.updateVisibility(),n.setPendingUpdate(16),n.visible){n.updateScreenDepth(this._viewProjectionMatrix),n.renderData&&(t=Math.min(n.elevationBounds[0],t),i=Math.max(n.elevationBounds[1],i));var a=n.shouldSplit(this._splitLimits,this._eyePosRenderSR,this.lodSnapping);if(2===a){n.resetPendingUpdate(8),n.isLeaf&&(n.setPendingUpdate(2),r.skipSubtree()),this._pendingUpdates=this._pendingUpdates||n.updating;continue}n.resetPendingUpdate(2)&&n.updateAgentSuspension(),4===a&&n.updateAgents(0)}if(r.skipSubtree(),!n.isLeaf){n.setPendingUpdate(8),n.resetPendingUpdate(2);var s=this._iteratorPool.acquire();for(s.resetOne(n);!s.done;){var l=s.next();this._updateClippingStatus(l),l.updateVisibility(),l.visible&&l.updateScreenDepth(this._viewProjectionMatrix)}this._iteratorPool.release(s)}this._pendingUpdates=this._pendingUpdates||n.updating}this._iteratorPool.release(r),isFinite(t)&&isFinite(i)&&(this._elevationBounds.min===t&&this._elevationBounds.max===i||(this._elevationBounds.min=t,this._elevationBounds.max=i,this.emit("elevation-bounds-change",null)))}},s.prototype._updateViewDependentParameters=function(){var e=this.view.state.camera,t=Math.tan(.5*e.fovX),i=Math.tan(.5*e.fovY),r=this.tilingScheme.pixelSize,n=Math.pow(2,-this.lodBias)*e.pixelRatio;this._splitLimits.aboveGround=e.aboveGround,this._splitLimits.fovX=t,this._splitLimits.fovY=i,this._splitLimits.relativeWidthLimit=r/e.width*this.maxTextureScale*n,this._splitLimits.relativeHeightLimit=r/e.height*this.maxTextureScale*n,this._splitLimits.maxLod=this.tilingScheme.getMaxLod(),this._splitLimits.angledSplitBias=this.view.qualitySettings.tiledSurface.angledSplitBias,M.frustum.copy(e.frustum,this._frustum),T.mat4.multiply(this._viewProjectionMatrix,e.projectionMatrix,e.viewMatrix),L.vec3.copy(this._eyePosRenderSR,e.eye),C.vectorToVector(this._eyePosRenderSR,this.view.renderSpatialReference,this._eyePosSurfaceSR,this.spatialReference)},s.prototype._updateSnapLevel=function(){if(1!==this.lodSnapping){var e=R.TESTS_DISABLE_UPDATE_THRESHOLDS?0:.1,t=this._findSnapLevel();if(!(Math.abs(this._snapLevel-t)<e)){var i=this.snapLevel;this._snapLevel=t,i!==this.snapLevel&&this._updateTiles(this.rootTiles)}}},s.prototype._findSnapLevel=function(){if(this._visibleLevels.length<=0)return this._snapLevel;var e=Math.abs(this.view.camera.tilt-90)/90*.4+.3,t=this._visibleLevels,i=Math.round(t.length*e);if(i>=t.length)return this._snapLevel;t.sort((function(e,t){return e-t}));for(var r=0,n=i;n<t.length;++n)r+=t.getItemAt(n);var a=t.getItemAt(Math.round(.95*t.length)-1),s=r/(t.length-i);return h.clamp(s,a-1,this._splitLimits.maxLod)},s.prototype._updateSkirts=function(){var e=this.view.state.camera,t=this.view.state.constraints.collision.enabled?0:1.11*e.near;N.autoUpdateSkirtsVisibility(this,this._eyePosSurfaceSR,this.spatialReference,t)},s.prototype._updateRender=function(e){e.rendered&&!e.shouldRender&&(!function e(t){if(t.isLeaf)return!1;return t.children[0].shouldRender||t.children[1].shouldRender||t.children[2].shouldRender||t.children[3].shouldRender||e(t.children[0])||e(t.children[1])||e(t.children[2])||e(t.children[3])}(e)?function(e){return e.isLeaf&&e.parent&&e.parent.shouldRender}(e)&&this._loadParent(e):this._loadChildren(e))},s.prototype._updateTileGeometry=function(e){e.updateVisibility(),this._renderer.updateTileGeometry(e),this._elevationUpdate(e),this._usedMemory=ie},s.prototype._elevationUpdate=function(e){le.spatialReference=this.spatialReference,le.tile=e,le.extent=e.extent,this.emit("elevation-change",le),P.containsPoint(e.extent,this._eyePosSurfaceSR)&&this._updateSkirts()},s.prototype._frame=function(e){var t=this;this._isFrameProcessing=!0,this._frameTraversal(e),e.run((function(){return t._processElevation(e)})),e.run((function(){return t._processTextures(e)})),0!==this._asyncWorkItems&&(this._pendingUpdates=!0),this._isFrameProcessing=!1,this._runViewChangeUpdateIfDirty(),this.notifyChange("updating")},s.prototype._frameTraversal=function(e){var t=this;if(!this.suspended&&this._pendingUpdates){var i=this._eyePosRenderSR,r=0,n=!1;this._pendingUpdates=!1,this._visibleLevels.clear();for(var a=function(){},s=0===this.lodSnapping?function(e){var r=e.shouldSplit(t._splitLimits,i,1);e.visible&&2!==r&&e.parent&&2===e.parent.shouldSplit(t._splitLimits,i,1)&&(1===r?t._visibleLevels.fill(e.level+1,4):t._visibleLevels.push(e.level))}:a;!e.done;){var l=!this._allTiles.some((function(i){return r+=i.usedMemory,s(i),i.resetPendingUpdate(8)?(t._mergeTile(i),n=!0,e.madeProgress()):i.resetPendingUpdate(2)&&(t._splitTile(i),n=!0,e.madeProgress()),i.resetPendingUpdate(16)&&(t._updateRender(i),e.madeProgress()),t._pendingUpdates=t._pendingUpdates||i.updating,e.done}));if(this._pendingUpdates=this._pendingUpdates||!l,l&&s!==a&&this._updateSnapLevel(),s=a,n)this._pendingUpdates=!0,n=!1,G.sortTiles(this._renderer.renderOrder,this._allTiles);else if(l){this._usedMemory=r;break}}this._visibleLevels.clear()}},s.prototype._processElevation=function(e){var t=this;return this._allTiles.some((function(i){return i.resetPendingUpdate(32)&&(t._updateTileGeometry(i),e.madeProgress()),e.done})),e.hasProgressed},s.prototype._processTextures=function(e){var t=this;return this._allTiles.some((function(i){return i.resetPendingUpdate(64)&&(t._renderer.updateTileTexture(i),t._usedMemory=ie,e.madeProgress()),e.done})),e.hasProgressed},s.prototype._updateClippingExtent=function(){if(!this.spatialReference)return!1;var e=P.create(),t=null;return C.extentToBoundingRect(this.view.clippingArea,e,this.spatialReference)&&(t=e),!P.equals(t,this._clippingExtent)&&(this._clippingExtent=t,this._renderer.clippingExtent=t,this.notifyChange("extent"),this.updateTileOverlayParams(),this.overlayManager.setOverlayPlacementDirty(),!0)},s.prototype._clippingChanged=function(){this._updateClippingExtent()&&this._updateRootTiles()},Object.defineProperty(s.prototype,"lodBias",{get:function(){var e=this.view.resourceController.memoryController.memoryFactor;return this.view.qualitySettings.tiledSurface.lodBias-(1-e)*F.MAX_MEMORY_LOD_BIAS},enumerable:!0,configurable:!0}),s.prototype._getLodBiasCorrectedScale=function(e){var t=this.tilingScheme.levels,i=h.clamp(e-this.lodBias,0,t.length-1),r=i-Math.floor(i);return t[Math.floor(i)].scale*(1-r)+t[Math.ceil(i)].scale*r},s.prototype._cancelTilemapRequests=function(e){for(var t=0,i=e.layerInfo;t<i.length;t++){var r=i[t];if(r)for(var n=0,a=r;n<a.length;n++){a[n].abortTilemapRequest()}}},s.prototype._removeAllTiles=function(){var e=this;this.rootTiles&&(this.rootTiles.forEach((function(t){return e._purgeTile(t)})),this._setRootTiles(null),this.notifyChange("ready")),this._allTiles.clear();for(var t=0,i=this._topLevelTilemapOnlyTiles;t<i.length;t++){var r=i[t];c.isSome(r)&&this._cancelTilemapRequests(r)}this.visible=!1},s.prototype._purgeChildTiles=function(e){if(e.isLeaf)return!1;var t=this._purgeTile(e.children[0]);return t=this._purgeTile(e.children[1])||t,t=this._purgeTile(e.children[2])||t,t=this._purgeTile(e.children[3])||t,e.unsetChildren(),t},s.prototype._purgeTile=function(e){var t=this._purgeChildTiles(e)||e.rendered;return this._allTiles.removeUnordered(e),e.unload(this._renderer),this._cancelTilemapRequests(e),this._tilePool.release(e),t},s.prototype._splitTile=function(e){N.weakAssert(e.isLeaf,"tile that is already split should not be split again!");var t=e.level+1,i=2*e.lij[1],r=2*e.lij[2];return e.setChildren(this._createTile(t,i,r,e),this._createTile(t,i,r+1,e),this._createTile(t,i+1,r,e),this._createTile(t,i+1,r+1,e)),e.setPendingUpdate(16),e.updateAgentSuspension(),this._allTiles.pushArray(e.children),this._pendingUpdates=!0,this._emitTileScaleChange(e,t),e.children[0].hasPendingUpdate(2)||e.children[1].hasPendingUpdate(2)||e.children[2].hasPendingUpdate(2)||e.children[3].hasPendingUpdate(2)},s.prototype._emitTileScaleChange=function(e,t){void 0===t&&(t=e.level),oe.spatialReference=this.spatialReference,oe.extent=e.extent,oe.scale=this._getLodBiasCorrectedScale(t),this.emit("scale-change",oe)},s.prototype._createTile=function(e,t,i,r){N.weakAssert(!!r,"_createTile sanity check");var n=this._acquireTile(e,t,i,r);return n.updateClippingStatus(this._clippingExtent),n.visible&&(n.updateScreenDepth(this._viewProjectionMatrix),2===n.shouldSplit(this._splitLimits,this._eyePosRenderSR,this.lodSnapping)&&n.setPendingUpdate(2)),n},s.prototype._mergeTile=function(e){N.weakAssert(!e.hasPendingUpdate(2),"_mergeTile sanity check"),this._purgeChildTiles(e)&&(N.weakAssert(!e.renderData,"_mergeTile sanity check"),this._loadTile(e)),this._pendingUpdates=!0,this._emitTileScaleChange(e)},s.prototype._loadChildren=function(e){N.weakAssert(e.rendered,"parent should be rendered"),e.unload(this._renderer),this._loadTile(e.children[0]),this._loadTile(e.children[1]),this._loadTile(e.children[2]),this._loadTile(e.children[3])},s.prototype._loadParent=function(e){var t=e.parent;this._unloadChildren(t),this._loadTile(t)},s.prototype._unloadChildren=function(e){e.isLeaf||(this._unloadChildren(e.children[0]),e.children[0].unload(this._renderer),this._unloadChildren(e.children[1]),e.children[1].unload(this._renderer),this._unloadChildren(e.children[2]),e.children[2].unload(this._renderer),this._unloadChildren(e.children[3]),e.children[3].unload(this._renderer))},s.prototype._loadTile=function(e){e.load(this._renderer),e.setPendingUpdate(16),this.overlayManager&&this.overlayManager.hasOverlays()&&this.overlayManager.setTileParameters(e,e.renderData,this._overlayOpacity),this._elevationUpdate(e)},s.prototype._elevationDataArrived=function(e,t,i){var r=new I.ElevationData(e.lij,e.extent,i);e.dataArrived(t,0,r);var n=[e],a=e.level,s=this._iteratorPool.acquire();for(s.reset(n);!s.done;){var l=s.next();l.findElevationBoundsForLayer(t,a),l.computeElevationBounds()}this._iteratorPool.release(s),this._updateTiles(n)},s.prototype._scheduleLayerViewChangesUpdate=function(){var e=this;this._scheduledLayerViewChangesHandle||(this._scheduledLayerViewChangesHandle=g.schedule((function(){return e._handleLayerViewChanges()})),this._handles.add(this._scheduledLayerViewChangesHandle,"scheduledLayerViewChangesHandle"))},s.prototype._handleLayerViewChanges=function(){var e=this;this._handles.remove("scheduledLayerViewChangesHandle"),this._scheduledLayerViewChangesHandle=null;for(var t=!1,i=new Set,r=-1,n=0,a=this.view.allLayerViews.items;n<a.length;n++){var s=a[n];if(i.add(s.uid),N.isSurfaceLayerView(s))if(this._basemapLayerViewHandles.has(s.uid)){var l=this.layerClassFromLayerView(s),o=this._layerIndexByLayerViewId[l].get(s.uid);o<r&&(t=!0),r=o}else this._registerTiledLayerView(s),s.layer.loaded&&(t=!0)}this._basemapLayerViewHandles.forEach((function(r,n){i.has(n)||(e._unregisterTiledLayerView(n),t=!0)})),this.overlayManager&&this.overlayManager.updateLayerViews(i),t&&this._updateTiledLayers()},s.prototype.layerClassFromLayerView=function(e){return N.isElevationLayerView(e)?0:1},s.prototype._registerTiledLayerView=function(e){var t=this,i=[],r=this.layerClassFromLayerView(e);i.push(e.watch("suspended",(function(){return t._updateTiledLayers()}))),i.push(e.watch("fullOpacity",(function(){return t._updateTileTextures(!1)}))),i.push(e.layer.watch("scaleRangeId",(function(){return t._restartAllAgents(r)}))),e.on("data-changed",(function(){var i=t._layerIndexByLayerViewId[r].get(e.uid);null!=i&&t._invalidateLayerData(i,r)})),this._basemapLayerViewHandles.set(e.uid,i)},s.prototype._unregisterTiledLayerView=function(e){var t=this._basemapLayerViewHandles.get(e);if(t){for(var i=0;i<t.length;i++)t[i].remove();this._basemapLayerViewHandles.delete(e)}},s.prototype._updateTiledLayers=function(){var e=this;if(this.tilingScheme&&!this.view.suspended){var t=this.view.allLayerViews,i=[[],[]],r=null,n=P.empty();t.forEach((function(t){var a=t.layer;if(a&&!t.suspended&&N.isSurfaceLayerView(t)){var s=t.fullExtent;if(s)if(e.tilingScheme.compatibleWith(t.tileInfo)){P.expand(n,s);var l=e.layerClassFromLayerView(t);if(1===l){var o=t.displayLevelRange;o.maxLevel!==1/0&&(null===r||o.maxLevel>r)&&(r=o.maxLevel)}i[l].push(t)}else K.warn("Terrain: tiling scheme of layer "+a.id+" is incompatible with other tiled layers, will not be drawn");else K.warn("Terrain: Map or elevation layer does not have fullExtent: "+a.id)}}));for(var a=0;a<2;a++){var s=this._layerViews[a],l=i[a];l.reverse();var o=l.length,d=s.length!==o,u=new Array(o),p=new Array(s.length);this._layerIndexByLayerViewId[a].clear();for(var h=0;h<o;h++){var _=l[h].uid;this._layerIndexByLayerViewId[a].set(_,h);var y=s.indexOf(l[h]);u[h]=y,h!==y&&(d=!0),y>-1&&(p[y]=h)}if(d){for(var f=0,g=this._topLevelTilemapOnlyTiles;f<g.length;f++){var v=g[f];c.isSome(v)&&v.modifyLayers(p,u,a)}var m=this._postorderIterator;for(m.reset(this.rootTiles);!m.done;)m.next().modifyLayers(p,u,a);this._layerViews[a]=l,this._restartAllAgents(a),this._updateTiles(this.rootTiles)}}this.tilingScheme.ensureMaxLod(r)&&this._viewChangeUpdate()}},s.prototype._restartAllAgents=function(e){var t=this._postorderIterator;for(t.reset(this.rootTiles);!t.done;){var i=t.next();i.restartAgents(e),0===e&&i.computeElevationBounds()}},s.prototype._hasFixedExtent=function(){return!!this._clippingExtent},s.prototype.layerViewByIndex=function(e,t){return this._layerViews[t][e]},s.prototype.numLayers=function(e){return this._layerViews[e].length},s.prototype._updateTileTextures=function(e){var t=this;this._allTiles.forEach((function(i){i.updateAgents(1),e?t.renderer.updateTileTexture(i):i.updateRenderData(1)}))},s.prototype._invalidateLayerData=function(e,t){this._allTiles.forEach((function(i){return i.removeLayerAgent(e,t)})),this._allTiles.forEach((function(i){return i.invalidateLayerData(e,t)}))},s.prototype.requestRender=function(e){void 0===e&&(e=1),this.renderer.setNeedsRender(e)},s.prototype.setPendingUpdates=function(){this._pendingUpdates||(this._pendingUpdates=!0,this.notifyChange("updating"))},s.prototype.requestTileData=function(e,t,i,r){var n=this,a=this.layerViewByIndex(t,i),s=a.layer;if(s.tilemapCache&&!N.isVectorTileLayerView(a)){var l=this.getTilemapTile(e),o=l.layerInfo[i][t];if(!o.tilemap)return o.tilemapRequestPromise||(o.tilemapRequestAbort=f.createAbortController(),o.tilemapRequestPromise=this.requestTilemap(l,t,i,a,s,{signal:o.tilemapRequestAbort.signal})),++this._asyncWorkItems,o.tilemapRequestPromise.catch((function(){})).then((function(){--n._asyncWorkItems,o.tilemapRequestPromise=null,o.tilemapRequestAbort=null,f.throwIfAborted(r);var t=n._layerIndexByLayerViewId[i].get(a.uid);if(null!=t)return l.hasDataAvailable(e,t,i)?n._requestTileData(e,i,a,r):(n._dataMissing(e,i,a,{notInTilemap:!0}),f.reject())}));if(!l.hasDataAvailable(e,t,i))return this._dataMissing(e,i,a,{notInTilemap:!0}),f.reject()}return this._requestTileData(e,i,a,r)},s.prototype._requestTileData=function(e,t,i,r){return 0===t?this._requestElevationTileData(e,i,r):this._requestMapTileData(e,i,r)},s.prototype._requestElevationTileData=function(e,t,i){var r=this;if(N.isElevationLayerView(t)){var n=function(n){if(--r._asyncWorkItems,!f.isAborted(i)){var a=r._layerIndexByLayerViewId[0].get(t.uid);null!=a?(r._usedMemory=ie,r._pendingUpdates=!0,r._elevationDataArrived(e,a,n)):K.warn("TerrainSurface: received data from unknown layer %d %s",0,e.lij.toString())}},a=function(i){--r._asyncWorkItems,f.isAbortError(i)||r._dataMissing(e,0,t,i)};if(++this._asyncWorkItems,N.useFetchTileForLayer(t.layer))return t.layer.fetchTile(e.lij[0],e.lij[1],e.lij[2],{noDataValue:F.ELEVATION_NODATA_VALUE,signal:i.signal}).then((function(e){if(f.isAborted(i))return K.warnOnce("A call to fetchTile resolved even though the request was aborted. fetchTile should not resolve if options.signal.aborted is true."),void a(f.createAbortError());n(e)}),a);var s=t.getTileUrl(e.lij[0],e.lij[1],e.lij[2]);return this._elevationDataRequester.request(s,"binary",i).then((function(e){return r._lercWorker.decode(e,{noDataValue:F.ELEVATION_NODATA_VALUE},i.signal)})).then((function(e){n({values:e.pixelData,width:e.width,height:e.height,noDataValue:e.noDataValue,minValue:e.minValue,maxValue:e.maxValue})}),a)}N.weakAssert(!1,"_requestElevationTileData can only be called for elevation layer views")},s.prototype._requestMapTileData=function(e,t,i){var r=this;if(t instanceof O)return f.reject();++this._asyncWorkItems;var n=function(n){--r._asyncWorkItems,f.isAborted(i)||r._dataArrived(e,1,t,n)},a=function(n){--r._asyncWorkItems,f.isAborted(i)||r._dataMissing(e,1,t,n)};if(N.isVectorTileLayerView(t)){var s=t.schemaHelper.getLevelRowColumn(e.lij);return t.tileHandler.getVectorTile(s[0],s[1],s[2],i).then(n,a)}if(N.useFetchTileForLayer(t.layer)&&N.isTileLayerView(t))return t.layer.fetchTile(e.lij[0],e.lij[1],e.lij[2],i).then((function(e){if(f.isAborted(i))return K.warnOnce("A call to fetchTile resolved even though the request was aborted. fetchTile should not resolve if options.signal.aborted is true."),void a(f.createAbortError());n(e)}),a);var l=t.getTileUrl(e.lij[0],e.lij[1],e.lij[2]);(function(e){return null!=e.refreshInterval})(t)&&t.refreshTimestamp&&(l+=(l.indexOf("?")>-1?"&":"?")+"_ts="+t.refreshTimestamp);var o=t.hasMixedImageFormats?"image+type":"image";return this._mapDataRequester.request(l,o,i).then(n,a)},s.prototype.requestTilemap=function(e,t,r,n,a,s){var l=this,o=e.lij[0]+E.TILEMAP_SIZE_EXP,d=Math.round(e.lij[1]*Math.pow(2,E.TILEMAP_SIZE_EXP)),u=Math.round(e.lij[2]*Math.pow(2,E.TILEMAP_SIZE_EXP));return a.tilemapCache.fetchTilemap(o,d,u,i({},s,{timeout:6e3})).then((function(i){null!=(t=l._layerIndexByLayerViewId[r].get(n.uid))&&(e.layerInfo[r][t].tilemap=i)})).catch((function(){}))},s.prototype.getTilemapTile=function(e){var t=e.level;if(t>E.TILEMAP_SIZE_EXP)return G.getTileNLevelsUp(e,E.TILEMAP_SIZE_EXP);var i=this._topLevelTilemapOnlyTiles[t];if(c.isSome(i))return i;var r=G.getRootTile(e),n=E.TILEMAP_SIZE_EXP-t+r.level,a=[t-E.TILEMAP_SIZE_EXP,r.lij[1]/Math.pow(2,n),r.lij[2]/Math.pow(2,n)];return i=new X(a,this._upsampleInfoPool,[this._layerViews[0].length,this._layerViews[1].length]),this._topLevelTilemapOnlyTiles[t]=i,i},s.prototype._dataArrived=function(e,t,i,r){var n=this._layerIndexByLayerViewId[t].get(i.uid);null!=n?e.dataArrived(n,t,r):K.warn("TerrainSurface: received data from unknown layer")},s.prototype._dataMissing=function(e,t,i,r){var n=this._layerIndexByLayerViewId[t].get(i.uid);null!=n?e.dataMissing(n,t,r):K.warn("TerrainSurface: received data from unknown layer")},s.prototype.updateTileOverlayParams=function(){var e=this;this.rootTiles&&(this._allTiles.forEach((function(t){t.renderData&&e.overlayManager&&e.overlayManager.setTileParameters(t,t.renderData,e._overlayOpacity)})),this._renderer.setNeedsRender())},s.prototype.updateOverlayOpacity=function(){if(this.overlayManager){var e=this._eyePosSurfaceSR[2],t=this.overlayManager.updateOpacity(e);isNaN(t)||t===this._overlayOpacity||(this._allTiles.forEach((function(e){return e.renderData&&(e.renderData.overlayOpacity=t)})),this._overlayOpacity=t,this._renderer.setNeedsRender())}},s.prototype.getStats=function(){var e={numNodes:this._allTiles.length,numLeaves:0,numVisible:0,numRendered:0,numRenderedPerLevel:new Array,numLoadedPerLevel:new Array};return this._allTiles.forEach((function(t){t.isLeaf&&e.numLeaves++;var i=t.level;t.renderData&&(e.numLoadedPerLevel[i]=(e.numLoadedPerLevel[i]||0)+1),t.visible&&(e.numVisible++,t.rendered&&(e.numRenderedPerLevel[i]=(e.numRenderedPerLevel[i]||0)+1,e.numRendered++))})),e},s.prototype.getUsedMemory=function(){var e=this;return this.tilingScheme?(this._usedMemory===ie&&(this._usedMemory=0,this._allTiles.forEach((function(t){return e._usedMemory+=t.usedMemory}))),this._usedMemory):0},s.prototype.getUsedMemoryForLayerView=function(e){var t=0,i=this.layerClassFromLayerView(e),r=this._layerIndexByLayerViewId[i].get(e.uid);return this._allTiles.forEach((function(e){return t+=e.getUsedMemoryForLayer(i,r)})),t},s.prototype.getTile=function(e){var t=e.split("/").map((function(e){return+e}));if(0===t[0])return l.find(this.rootTiles,(function(e){return e.lij[1]===t[1]&&e.lij[2]===t[2]}));var i,r=Math.pow(2,t[0]),n=Math.floor(t[1]/r),a=Math.floor(t[2]/r);if(this.rootTiles.some((function(e){return e.lij[1]===n&&e.lij[2]===a&&(i=e,!0)})),i){for(var s=1<<t[0]-1;i.lij[0]<t[0];){var o=t[1]&s?2:0;if((t[2]&s)>0&&o++,!i.children[o])return console.log("Tile "+e+" doesn't exist, smallest ancestor is "+G.tile2str(i)),null;i=i.children[o],s>>=1}return N.weakAssert(i.lij[0]===t[0]&&i.lij[1]===t[1]&&i.lij[2]===t[2],"not the right tile?"),i}return null},s.prototype.setBorders=function(e){this._renderer.renderPatchBorders=e},s.prototype.setDisableRendering=function(e){this._renderer.renderingDisabled=e},s.prototype.getRenderedTiles=function(){return se.clear(),this._allTiles.forEach((function(e){e.visible&&e.rendered&&se.push(e)})),G.sortTiles(this.renderOrder,se),se.toArray()},Object.defineProperty(s.prototype,"test",{get:function(){var e=this;return{renderer:this._renderer,lercWorker:this._lercWorker,mergeTile:function(t){return e._mergeTile(t)},updateTiles:function(t){return e._updateTiles(t)},getTiles:function(){return e._allTiles.toArray()}}},enumerable:!0,configurable:!0}),n([m.property()],s.prototype,"_renderer",void 0),n([m.property({constructOnly:!0})],s.prototype,"view",void 0),n([m.property({value:!1})],s.prototype,"cullBackFaces",null),n([m.property({readOnly:!0})],s.prototype,"extent",null),n([m.property({readOnly:!0,dependsOn:["ready","_renderer.updating","_scheduledLayerViewChangesHandle","overlayManager.updating"]})],s.prototype,"updating",null),n([m.property({aliasOf:"view.map.ground.opacity"})],s.prototype,"baseOpacity",void 0),n([m.property({readOnly:!0})],s.prototype,"overlayManager",void 0),n([m.property({constructOnly:!0})],s.prototype,"manifold",void 0),n([m.property()],s.prototype,"maxTextureScale",void 0),n([m.property({readOnly:!0})],s.prototype,"ready",null),n([m.property({value:1})],s.prototype,"renderOrder",null),n([m.property({readOnly:!0})],s.prototype,"rootTiles",void 0),n([m.property({value:!0})],s.prototype,"skirtScale",null),n([m.property({readOnly:!0,dependsOn:["tilingScheme.spatialReference"]})],s.prototype,"spatialReference",null),n([m.property()],s.prototype,"backgroundImage",void 0),n([m.property({type:a,aliasOf:"view.map.ground.surfaceColor"})],s.prototype,"backgroundColor",void 0),n([m.property({dependsOn:["backgroundColor","backgroundImage"]})],s.prototype,"_background",null),n([m.property({value:!1})],s.prototype,"slicePlaneEnabled",null),n([m.property({readOnly:!0})],s.prototype,"tilingScheme",void 0),n([m.property({readOnly:!0,aliasOf:"tilingSchemeLogic.tilingSchemeLocked"})],s.prototype,"tilingSchemeLocked",void 0),n([m.property({readOnly:!0,aliasOf:"tilingSchemeLogic.tilingSchemeDone"})],s.prototype,"tilingSchemeDone",void 0),n([m.property({readOnly:!0})],s.prototype,"tilingSchemeLogic",void 0),n([m.property({value:!0})],s.prototype,"velvetOverground",null),n([m.property({value:!1})],s.prototype,"wireframe",null),n([m.property({value:!1})],s.prototype,"suspended",null),n([m.property({readOnly:!0,dependsOn:["view.qualitySettings.tiledSurface.reduceTileLevelDifferences"]})],s.prototype,"lodSnapping",null),n([m.property({readOnly:!0,aliasOf:"view.qualitySettings.tiledSurface.textureFadeDuration"})],s.prototype,"textureFadeDuration",void 0),n([m.property()],s.prototype,"_scheduledLayerViewChangesHandle",void 0),s=n([m.subclass("esri.views.3d.terrain.TerrainSurface")],s)}(m.declared(d.EventedMixin(s)));function Q(e,t){return e[0]===t[0]&&e[1]===t[1]&&e[2]===t[2]}var $=1.2,ee=80/180*Math.PI,te=110/180*Math.PI,ie=-1,re=b.vec4f64.create(),ne=P.create(),ae=[0,0,0],se=new y,le={spatialReference:null,tile:null,extent:null,context:"ground"},oe={spatialReference:null,extent:null,scale:0};return J}));