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

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../core/Accessor","../../core/Evented","../../core/HandleOwner","../../core/Identifiable","../../core/Logger","../../core/Promise","../../core/accessorSupport/decorators"],(function(e,t,r,n,i,o,p,a,l,s,d){return function(e){function t(t){var r=e.call(this,t)||this;return r.layer=null,r.parent=null,r}return r(t,e),t.prototype.initialize=function(){var e=this;this.when().catch((function(t){if("layerview:create-error"!==t.name){var r=e.layer&&e.layer.id||"no id",n=e.layer&&e.layer.title||"no title";throw l.getLogger(e.declaredClass).error("#resolve()","Failed to resolve layer view (layer title: '"+n+"', id: '"+r+"')",t),t}}))},t.prototype.destroy=function(){this.layer=this.parent=null},Object.defineProperty(t.prototype,"fullOpacity",{get:function(){var e=function(e){return null==e?1:e};return e(this.get("layer.opacity"))*e(this.get("parent.fullOpacity"))},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"suspended",{get:function(){return!this.canResume()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"suspendInfo",{get:function(){return this.getSuspendInfo()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"updating",{get:function(){return!!(this.updatingHandles&&this.updatingHandles.updating||this.isUpdating())},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"visible",{get:function(){return!0===this.get("layer.visible")},set:function(e){void 0!==e?this._override("visible",e):this._clearOverride("visible")},enumerable:!0,configurable:!0}),t.prototype.canResume=function(){return!this.get("parent.suspended")&&this.get("view.ready")&&this.get("layer.loaded")&&this.visible||!1},t.prototype.getSuspendInfo=function(){var e=this.parent&&this.parent.suspended?this.parent.suspendInfo:{};return this.view&&this.view.ready||(e.viewNotReady=!0),this.layer&&this.layer.loaded||(e.layerNotLoaded=!0),this.visible||(e.layerInvisible=!0),e},t.prototype.isUpdating=function(){return!1},n([d.property({dependsOn:["layer.opacity","parent.fullOpacity"]})],t.prototype,"fullOpacity",null),n([d.property()],t.prototype,"layer",void 0),n([d.property()],t.prototype,"parent",void 0),n([d.property({readOnly:!0,dependsOn:["visible","layer.loaded","parent.suspended","view?.ready"]})],t.prototype,"suspended",null),n([d.property({readOnly:!0,dependsOn:["visible","layer.loaded","parent.suspended","view?.ready"]})],t.prototype,"suspendInfo",null),n([d.property({type:Boolean,dependsOn:["updatingHandles.updating"],readOnly:!0})],t.prototype,"updating",null),n([d.property({dependsOn:["layer.visible"]})],t.prototype,"visible",null),t=n([d.subclass("esri.views.layers.LayerView")],t)}(d.declared(p.HandleOwnerMixin(a.IdentifiableMixin(s.EsriPromiseMixin(o.EventedMixin(i))))))}));