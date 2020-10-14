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

define(["require","exports","tslib","../../../../TimeExtent","../../../../core/has","../../../../core/maybe","../../../../core/promiseUtils","../../../../core/accessorSupport/diffUtils","../../../../tasks/support/Query","../../engine/webgl/definitions","./sources/createSource","./support/UpdateToken"],(function(e,t,i,r,s,n,o,u,a,c,d,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Source2D=void 0;var p=0,h=function(){function e(e,t){this.didSend=!1,this.dataTileCount=0,this.update=l.UpdateToken.all(),this._abortController=new AbortController,this.invalid=!1,this.displayTile=e,this._pixelBuffer=t,this.partitions=y(e,t)}return e.prototype.setUpdate=function(e,t){this.update=e,this.dataTileCount=0,t!==this._pixelBuffer&&(this._pixelBuffer=t,this.partitions=y(this.displayTile,t)),e.mesh&&(this.didSend=!1)},Object.defineProperty(e.prototype,"signal",{get:function(){return this._abortController.signal},enumerable:!1,configurable:!0}),e.prototype.abort=function(){this._abortController.abort()},e}(),f=function(){function e(e,t,i){this.resolved=!1,this.tile=t,this.offset=e,this.extent=i}return e.prototype.reset=function(){this.resolved=!1},e}();function y(e,t){var i=[];if(i.push(new f([0,0],e,null)),0===t)return i;var r=Math.min(t,c.TILE_SIZE),n=c.TILE_SIZE;return s("esri-2d-debug")&&r!==t&&console.debug("Clamping pixelBuffer to max size of "+c.TILE_SIZE+"px"),i.push(new f([-n,-n],e.neighbor(-1,-1),[n-r,n-r,n,n])),i.push(new f([0,-n],e.neighbor(0,-1),[0,n-r,n,n])),i.push(new f([n,-n],e.neighbor(1,-1),[0,n-r,r,n])),i.push(new f([-n,0],e.neighbor(-1,0),[n-r,0,n,n])),i.push(new f([n,0],e.neighbor(1,0),[0,0,r,n])),i.push(new f([-n,n],e.neighbor(-1,1),[n-r,0,n,r])),i.push(new f([0,n],e.neighbor(0,1),[0,0,n,r])),i.push(new f([n,n],e.neighbor(1,1),[0,0,r,r])),i}var _=function(){function e(e,t,i){var r=this;this.type="remote",this._pendingEdits=new Set,this._queryInfo=null,this._subscriptions={display:new Map},this._invalid={outFields:!1,queryFilterParameters:!1};var s=this._onDataTileRequest.bind(this);this._source=d.createSource(e,t,i,s,(function(){return r.canAcceptPatch()})),this._serviceInfo=e,this._geometryType=e.geometryType,this._outSR=t}return e.prototype.destroy=function(){var e=this;this._getSubscriptions().map((function(t){var i=t.displayTile;return e.unsubscribe(i)})),this._source.destroy()},Object.defineProperty(e.prototype,"updating",{get:function(){return this._source.updating||this._getSubscriptions().some((function(e){return!e.didSend}))},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"isStream",{get:function(){return"geoevent"===this._source.type},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"sourceEvents",{get:function(){return"geoevent"===this._source.type?{type:"geoevent",events:this._source.events}:{type:"feature",events:this._source.events}},enumerable:!1,configurable:!0}),e.prototype.enableEvent=function(e,t){this._source.enableEvent(e,t)},e.prototype.setViewState=function(e){this._source.setViewState(e)},e.prototype.update=function(e,t){var n,o,a,c,d=this._serviceInfo.fields.length,l=null!==(o=null===(n=this._schema)||void 0===n?void 0:n.outFields)&&void 0!==o?o:[],p=null!==(c=null===(a=this._schema)||void 0===a?void 0:a.pixelBuffer)&&void 0!==c?c:0,h=t.outFields.filter((function(e){return-1===l.indexOf(e)})),f=i.__spreadArrays(l,h),y=0===t.pixelBuffer?0:Math.max(t.pixelBuffer,p);t.pixelBuffer=y,t.outFields=f.length>=.75*d?["*"]:f,t.outFields.sort();var _=u.diff(this._schema,t);if(this._subscriptions.display.forEach((function(t){t.invalid&&(e.queryFilter=!0)})),_){var b=this._schema&&u.hasDiff(_,"outFields"),v=this._schema&&u.hasDiff(_,"pixelBuffer"),g=this._schema&&u.hasDiffAny(_,["definitionExpression","gdbVersion","historicMoment"]);s("esri-2d-update-debug")&&console.debug("Applying Update - Source:",_);var m={returnCentroid:"esriGeometryPolygon"===this._geometryType,returnGeometry:!0,outFields:t.outFields,outSpatialReference:this._outSR,orderByFields:[this._serviceInfo.objectIdField+" ASC"],where:t.definitionExpression||"1=1",gdbVersion:t.gdbVersion,historicMoment:t.historicMoment?new Date(t.historicMoment):null,timeExtent:r.fromJSON(t.timeExtent)};e.source=!0,v&&(e.why.mesh.push("Pixel buffer changed"),e.mesh=!0),g&&(e.why.mesh.push("Layer filter changed"),e.why.source.push("Layer filter changed"),e.mesh=!0,e.queryFilter=!0,this._invalid.queryFilterParameters=!0),b&&(e.why.source.push("Layer required fields changed"),this._invalid.outFields=!0),this._schema=t,this._source.update(m),this._queryInfo=m}},e.prototype.subscribe=function(e){this._subscriptions.display.has(e.id)?s("esri-2d-debug")&&console.debug("A subscription already exists for the target displayTile"):this._subscribeDisplayTile(e)},e.prototype.unsubscribe=function(e){if(this._subscriptions.display.has(e.id)){var t=this._subscriptions.display.get(e.id);this._subscriptions.display.delete(e.id),this._source.unsubscribe(e),t.abort()}else s("esri-2d-debug")&&console.debug("A subscription does not exist for the target displayTile")},e.prototype.forEachRequest=function(e,t){this._source.forEachRequest(e,t)},e.prototype.query=function(e){return this._source.query(e)},e.prototype.createQuery=function(){return new a(i.__assign({},this._queryInfo))},e.prototype.createTileQuery=function(e){if("stream"===this._serviceInfo.type)throw new Error("Service does not support tile  queries");var t=this.createQuery();return t.quantizationParameters=e.getQuantizationParameters(),t.resultType="tile",t.geometry=e.extent,"esriGeometryPolyline"===this._serviceInfo.geometryType&&(t.maxAllowableOffset=e.resolution),this._serviceInfo.capabilities.query.supportsQuantization||(t.quantizationParameters=null,t.maxAllowableOffset=e.resolution),t},e.prototype.invalidate=function(){this._subscriptions.display.forEach((function(e){return e.invalid=!0}))},e.prototype.forEachPendingEdit=function(e){this._getSubscriptions().some((function(e){return e.invalid}))?this._pendingEdits.forEach(e):this._pendingEdits.clear()},e.prototype.onEdits=function(e){return i.__awaiter(this,void 0,void 0,(function(){var t,r,s,n,u,a,c,d=this;return i.__generator(this,(function(h){switch(h.label){case 0:return t=e.addedFeatures.filter((function(e){return!e.error})).map((function(e){return e.objectId})),r=e.updatedFeatures.filter((function(e){return!e.error})).map((function(e){return e.objectId})),s=e.deletedFeatures.filter((function(e){return!e.error})).map((function(e){return e.objectId})),n=i.__spreadArrays(t,r),s.forEach((function(e){d._pendingEdits.has(e)&&d._pendingEdits.delete(e)})),n.forEach((function(e){return d._pendingEdits.add(e)})),u=this._getSubscriptions().map((function(e){return e.displayTile})),a=u.map((function(e){var t=d.createTileQuery(e);return t.objectIds=n,{tile:e,query:t}})),c=a.map((function(e){var t=e.tile,r=e.query;return i.__awaiter(d,void 0,void 0,(function(){var e;return i.__generator(this,(function(i){switch(i.label){case 0:return e={tile:t},[4,this._source.query(r)];case 1:return[2,(e.result=i.sent(),e)]}}))}))})),[4,o.all(c)];case 1:return h.sent().forEach((function(e){var t=e.tile,n=e.result,o=d._subscriptions.display.get(t.key.id);if(o){var u=o.signal,a=l.UpdateToken.all();d.onDisplayTilePatch({type:"update",id:t.key.id,version:p++,update:a,addOrUpdate:n,remove:i.__spreadArrays(r,s),end:!0,noData:!1},{signal:u})}})),this.invalidate(),[2]}}))}))},e.prototype.resubscribe=function(e,t){return void 0===t&&(t=!1),i.__awaiter(this,void 0,void 0,(function(){var r,s,n,o=this;return i.__generator(this,(function(i){switch(i.label){case 0:return r=this._schema.pixelBuffer,this._subscriptions.display.forEach((function(t){return t.setUpdate(e,r)})),!1,s=!1,this._subscriptions.display.forEach((function(e){e.invalid&&(s=!0)})),this._invalid.outFields&&(this._invalid.outFields=!1),t||this._invalid.queryFilterParameters||s?((n=this._getSubscriptions().map((function(e){return e.displayTile}))).forEach((function(e){return o.unsubscribe(e)})),n.forEach((function(e){return o.subscribe(e)})),this._source.resume(),this._invalid.queryFilterParameters=!1,[3,5]):[3,1];case 1:return e.mesh?[4,this._source.resend({dataTileOnly:!1})]:[3,3];case 2:return i.sent(),[3,5];case 3:return[4,this._source.resend({dataTileOnly:!0})];case 4:i.sent(),i.label=5;case 5:return[2]}}))}))},e.prototype.pause=function(){this._source.pause()},e.prototype.resume=function(){this._source.resume()},e.prototype._getSubscriptions=function(){var e=[];return this._subscriptions.display.forEach((function(t){e.push(t)})),e},e.prototype._subscribeDisplayTile=function(e){var t=new h(e,this._schema.pixelBuffer);this._subscriptions.display.set(e.id,t),this._source.subscribe(e);for(var i=0,r=t.partitions;i<r.length;i++){var s=r[i],o=s.tile,u=this._source.get(o.id);if(n.isSome(u))for(var a=0,c=u.requests.done;a<c.length;a++){var d=c[a];this._onPartitionMessage(e.id,s,d.request,"new")}}},e.prototype._onDataTileRequest=function(e,t,i){var r=this,s=this._subscriptions.display.get(e.id);if(i&&i.dataTileOnly)for(var n=0,o=s.partitions;n<o.length;n++){if((c=o[n]).tile.id===e.id){this._onPartitionMessage(e.id,c,e,t);break}}else{for(var u=0,a=s.partitions;u<a.length;u++){var c;if((c=a[u]).tile.id===e.id){this._onPartitionMessage(e.id,c,e,t);break}}this._subscriptions.display.forEach((function(i,s){if(s!==e.id)for(var n=0,o=i.partitions;n<o.length;n++){var u=o[n];if(u.tile.id===e.id){r._onPartitionMessage(s,u,e,t);break}}}))}},e.prototype._onPartitionMessage=function(e,t,i,r){var s=n.andThen(i.features,(function(e){return function(e,t){if(n.isNone(t.extent))return e;var i=t.offset,r=t.extent,s=r[0],o=r[1],u=r[2],a=r[3],c=i[0],d=i[1];return e.extent(s,o,u,a).transform(c,d)}(e,t)})),o=this._subscriptions.display.get(e),u=o.signal;o.didSend||(r="replace");var a=!1;i.end&&(t.resolved=!0,a=e===t.tile.id),o.didSend=!0,this.onDisplayTilePatch({type:r,id:e,version:p++,update:o.update,addOrUpdate:s,remove:i.remove||[],noData:i.noData,end:a},{signal:u})},e}();t.Source2D=_}));