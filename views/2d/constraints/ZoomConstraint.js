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

define(["require","exports","../../../core/tsSupport/declareExtendsHelper","../../../core/tsSupport/decorateHelper","../../../core/Accessor","../../../core/accessorSupport/decorators","../../../layers/support/LOD"],(function(e,t,o,i,r,a,s){return function(e){function t(t){var o=e.call(this,t)||this;return o._lodByScale={},o._scales=[],o.effectiveLODs=null,o.effectiveMinZoom=-1,o.effectiveMaxZoom=-1,o.effectiveMinScale=0,o.effectiveMaxScale=0,o.lods=null,o.minZoom=-1,o.maxZoom=-1,o.minScale=0,o.maxScale=0,o.snapToZoom=!0,o}var r;return o(t,e),r=t,t.prototype.initialize=function(){var e,t,o,i=this,r=this,a=r.lods,s=r.minScale,c=r.maxScale,n=r.minZoom,l=r.maxZoom,f=-1,p=-1,h=!1,v=!1;if(0!==s&&0!==c&&s<c&&(s=(e=[c,s])[0],c=e[1]),!a||!a.length)return this._set("effectiveMinScale",s),void this._set("effectiveMaxScale",c);(a=a.map((function(e){return e.clone()}))).sort((function(e,t){return t.scale-e.scale})),a.forEach((function(e,t){return e.level=t}));for(var m=0,u=a;m<u.length;m++){var y=u[m];!h&&s>0&&s>=y.scale&&(f=y.level,h=!0),!v&&c>0&&c>=y.scale&&(p=o?o.level:-1,v=!0),o=y}-1===n&&(n=0===s?0:f),-1===l&&(l=0===c?a.length-1:p),n=Math.max(n,0),n=Math.min(n,a.length-1),l=Math.max(l,0),n>(l=Math.min(l,a.length-1))&&(n=(t=[l,n])[0],l=t[1]),s=a[n].scale,c=a[l].scale,a.splice(0,n),a.splice(l-n+1,a.length),a.forEach((function(e,t){i._lodByScale[e.scale]=e,i._scales[t]=e.scale})),this._set("effectiveLODs",a),this._set("effectiveMinZoom",n),this._set("effectiveMaxZoom",l),this._set("effectiveMinScale",s),this._set("effectiveMaxScale",c)},t.prototype.constrain=function(e,t){if(t&&e.scale===t.scale)return e;var o=this.effectiveMinScale,i=this.effectiveMaxScale,r=e.targetGeometry,a=t&&t.targetGeometry,s=0!==i&&e.scale<i,c=0!==o&&e.scale>o;if(s||c){var n=c?o:i;if(a){var l=(n-t.scale)/(e.scale-t.scale);r.x=a.x+(r.x-a.x)*l,r.y=a.y+(r.y-a.y)*l}e.scale=n}return this.snapToZoom&&this.effectiveLODs&&(e.scale=this._getClosestScale(e.scale)),e},t.prototype.fit=function(e){if(!this.effectiveLODs||!this.snapToZoom)return this.constrain(e,null);var t=this.scaleToZoom(e.scale),o=Math.abs(t-Math.floor(t));return e.scale=this.zoomToScale(o>.99?Math.round(t):Math.floor(t)),e},t.prototype.zoomToScale=function(e){if(!this.effectiveLODs)return 0;e-=this.effectiveMinZoom,e=Math.max(0,e);var t=this._scales;if(e<=0)return t[0];if(e>=t.length)return t[t.length-1];var o=Math.round(e-.5),i=Math.round(e);return t[i]+(i-e)*(t[o]-t[i])},t.prototype.scaleToZoom=function(e){if(!this.effectiveLODs)return-1;var t,o,i=this._scales;if(e>=i[0])return this.effectiveMinZoom;if(e<=i[i.length-1])return this.effectiveMaxZoom;for(var r=0;r<i.length-1;r++){if(t=i[r],(o=i[r+1])===e)return r+this.effectiveMinZoom+1;if(t>e&&o<e)return r+this.effectiveMinZoom+1-(e-o)/(t-o)}},t.prototype.snapToClosestScale=function(e){if(!this.effectiveLODs)return e;var t=this.scaleToZoom(e);return this.zoomToScale(Math.round(t))},t.prototype.snapToNextScale=function(e,t){if(void 0===t&&(t=.5),!this.effectiveLODs)return e*t;var o=Math.round(this.scaleToZoom(e));return this.zoomToScale(o+1)},t.prototype.snapToPreviousScale=function(e,t){if(void 0===t&&(t=2),!this.effectiveLODs)return e*t;var o=Math.round(this.scaleToZoom(e));return this.zoomToScale(o-1)},t.prototype.clone=function(){return new r({lods:this.lods,minZoom:this.minZoom,maxZoom:this.maxZoom,minScale:this.minScale,maxScale:this.maxScale})},t.prototype._getClosestScale=function(e){return this._lodByScale[e]?this._lodByScale[e].scale:(e=this._scales.reduce((function(t,o){return Math.abs(o-e)<=Math.abs(t-e)?o:t}),this._scales[0]),this._lodByScale[e].scale)},i([a.property({readOnly:!0})],t.prototype,"effectiveLODs",void 0),i([a.property({readOnly:!0})],t.prototype,"effectiveMinZoom",void 0),i([a.property({readOnly:!0})],t.prototype,"effectiveMaxZoom",void 0),i([a.property({readOnly:!0})],t.prototype,"effectiveMinScale",void 0),i([a.property({readOnly:!0})],t.prototype,"effectiveMaxScale",void 0),i([a.property({type:[s]})],t.prototype,"lods",void 0),i([a.property()],t.prototype,"minZoom",void 0),i([a.property()],t.prototype,"maxZoom",void 0),i([a.property()],t.prototype,"minScale",void 0),i([a.property()],t.prototype,"maxScale",void 0),i([a.property()],t.prototype,"snapToZoom",void 0),t=r=i([a.subclass("esri.views.2d.constraints.ZoomConstraint")],t)}(a.declared(r))}));