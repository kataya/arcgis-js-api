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

define(["require","exports","../../core/tsSupport/assignHelper","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../core/tsSupport/generatorHelper","../../core/tsSupport/awaiterHelper","../../geometry","../../Graphic","../../rasterRenderers","../../request","../../core/Error","../../core/jsonMap","../../core/lang","../../core/Logger","../../core/maybe","../../core/promiseUtils","../../core/urlUtils","../../core/accessorSupport/decorators","../../core/accessorSupport/ensureType","../support/commonProperties","../support/DimensionalDefinition","../support/ExportImageServiceParameters","../support/Field","../support/FieldsIndex","../support/imageryRendererUtils","../support/MosaicRule","../support/PixelBlock","../support/RasterFunction","../support/RasterInfo","../support/RasterJobHandler","../support/rasterFormats/RasterCodec","../../renderers/support/RasterSymbolizer","../../tasks/ImageServiceIdentifyTask","../../tasks/QueryTask","../../tasks/support/FeatureSet","../../tasks/support/ImageServiceIdentifyParameters","../../tasks/support/Query"],(function(e,t,r,i,n,a,o,s,l,u,p,c,f,d,h,m,y,g,v,R,b,x,I,S,w,_,O,P,N,F,T,J,D,C,j,V,M,z){Object.defineProperty(t,"__esModule",{value:!0});var q=h.getLogger("esri.layers.mixins.ArcGISImageService"),A=f.strict()({RSP_NearestNeighbor:"nearest",RSP_BilinearInterpolation:"bilinear",RSP_CubicConvolution:"cubic",RSP_Majority:"majority"}),E=f.strict()({esriNoDataMatchAny:"any",esriNoDataMatchAll:"all"}),U=f.strict()({U1:"u1",U2:"u2",U4:"u4",U8:"u8",S8:"s8",U16:"u16",S16:"s16",U32:"u32",S32:"s32",F32:"f32",F64:"f64",C64:"c64",C128:"c128",UNKNOWN:"unknown"});t.ArcGISImageService=function(e){return function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t._functionRasterInfos={},t._rasterJobHandler={instance:null,refCount:0,connectionPromise:null},t._symbolizer=null,t._defaultServiceMosaicRule=null,t.rasterAttributeTableFieldPrefix="Raster.",t.adjustAspectRatio=null,t.bandCount=null,t.bandIds=void 0,t.capabilities=null,t.compressionQuality=void 0,t.compressionTolerance=.01,t.copyright=null,t.definitionExpression=null,t.exportImageServiceParameters=null,t.rasterInfo=null,t.fields=null,t.fullExtent=null,t.hasMultidimensions=!1,t.imageMaxHeight=4100,t.imageMaxWidth=4100,t.interpolation=void 0,t.multidimensionalInfo=null,t.noData=null,t.noDataInterpretation=void 0,t.objectIdField=null,t.pixelSizeX=null,t.pixelSizeY=null,t.pixelFilter=null,t.raster=void 0,t.viewId=void 0,t.renderer=null,t.rasterAttributeTable=null,t.rasterFunctionInfos=null,t.serviceDataType=null,t.spatialReference=null,t.pixelType=null,t.serviceRasterInfo=null,t.sourceJSON=null,t.url=null,t.version=null,t}return i(t,e),t.prototype.initialize=function(){this._set("exportImageServiceParameters",new I.ExportImageServiceParameters({layer:this}))},t.prototype.readDefaultServiceMosaicRule=function(e,t){return O.fromJSON(t)},Object.defineProperty(t.prototype,"rasterFunctionNamesIndex",{get:function(){var e=new Map;return!this.rasterFunctionInfos||this.rasterFunctionInfos.length<1?e:(this.rasterFunctionInfos.forEach((function(t){e.set(t.name.toLowerCase().replace(/ /gi,"_"),t.name)})),e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"queryTask",{get:function(){return new j({url:this.url})},enumerable:!0,configurable:!0}),t.prototype.readCapabilities=function(e){return e&&e.split(",").map((function(e){return e.trim()}))},t.prototype.writeCompressionQuality=function(e,t,r){null!=e&&"lerc"!==this.format&&(t[r]=e)},t.prototype.writeCompressionTolerance=function(e,t,r){"lerc"===this.format&&null!=e&&(t[r]=e)},Object.defineProperty(t.prototype,"fieldsIndex",{get:function(){return this.fields?new w(this.fields):null},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"format",{get:function(){return this._get("format")||(null!=this.pixelFilter?"lerc":"jpgpng")},set:function(e){e&&["png","png8","png24","png32","jpg","bmp","jpgpng","lerc","tiff"].indexOf(e.toLowerCase())>-1&&this._set("format",e.toLowerCase())},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"mosaicRule",{set:function(e){var t=e;t&&t.mosaicMethod&&(t=O.fromJSON(r({},t.toJSON(),{mosaicMethod:t.mosaicMethod,mosaicOperation:t.mosaicOperation}))),this._set("mosaicRule",t)},enumerable:!0,configurable:!0}),t.prototype.readMosaicRule=function(e,t){return O.fromJSON(e||t.mosaicRule||t)},t.prototype.writeMosaicRule=function(e,t,r){var i=this.mosaicRule,n=this.definitionExpression;i?n&&n!==i.where&&((i=i.clone()).where=n):n&&(i=new O({where:n})),this._isValidCustomizedMosaicRule(i)&&(t[r]=i.toJSON())},t.prototype.writeNoData=function(e,t,r){null!=e&&"number"==typeof e&&(t[r]=e)},t.prototype.readObjectIdField=function(e,t){if(!e){var r=t.fields.filter((function(e){return"esriFieldTypeOID"===e.type||"oid"===e.type}));e=r&&r[0]&&r[0].name}return e},Object.defineProperty(t.prototype,"parsedUrl",{get:function(){return this.url?g.urlToObject(this.url):null},enumerable:!0,configurable:!0}),t.prototype.readRenderer=function(e,t,r){var i=t&&t.layerDefinition&&t.layerDefinition.drawingInfo&&t.layerDefinition.drawingInfo.renderer,n=u.read(i,r)||void 0;if(null!=n)return _.isSupportedRendererType(n)||q.warn("ArcGISImageService","Imagery layer doesn't support given renderer type."),n},Object.defineProperty(t.prototype,"rasterFields",{get:function(){var e=this.rasterAttributeTableFieldPrefix||"Raster.",t=new S({name:"Raster.ItemPixelValue",alias:"Item Pixel Value",domain:null,editable:!1,length:50,type:"string"}),r=new S({name:"Raster.ServicePixelValue",alias:"Service Pixel Value",domain:null,editable:!1,length:50,type:"string"}),i=new S({name:"Raster.ServicePixelValue.Raw",alias:"Raw Service Pixel Value",domain:null,editable:!1,length:50,type:"string"}),n=this.fields?d.clone(this.fields):[];n.push(r),this.capabilities&&this.capabilities.some((function(e){return"catalog"===e.toLowerCase()}))&&this.fields&&this.fields.length>0&&n.push(t),this.version>=10.4&&this.rasterFunctionInfos&&this.rasterFunctionInfos.some((function(e){return"none"===e.name.toLowerCase()}))&&n.push(i),this.rasterFunctionInfos&&this.rasterFunctionInfos.filter((function(e){return"none"!==e.name.toLowerCase()})).forEach((function(e){n.push(new S({name:"Raster.ServicePixelValue."+e.name,alias:e.name,domain:null,editable:!1,length:50,type:"string"}))})),null==this.pixelFilter||"esriImageServiceDataTypeVector-UV"!==this.serviceDataType&&"esriImageServiceDataTypeVector-MagDir"!==this.serviceDataType||(n.push(new S({name:"Raster.Magnitude",alias:"Magnitude",domain:null,editable:!1,type:"double"})),n.push(new S({name:"Raster.Direction",alias:"Direction",domain:null,editable:!1,type:"double"})));var a=this.rasterInfo.attributeTable&&this.rasterInfo.attributeTable.fields||null;if(a&&a.length>0){var o=a.filter((function(e){return"esriFieldTypeOID"!==e.type&&"value"!==e.name.toLowerCase()})).map((function(t){var r=d.clone(t);return r.name=e+t.name,r}));n=n.concat(o)}return n},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"renderingRule",{set:function(e){var t=e;t&&t.rasterFunction&&(t=N.fromJSON(r({},t.toJSON(),{rasterFunction:t.rasterFunction,rasterFunctionArguments:t.rasterFunctionArguments}))),this._set("renderingRule",t)},enumerable:!0,configurable:!0}),t.prototype.readRenderingRule=function(e,t){var r=t.rasterFunctionInfos;return t.renderingRule||r&&r.length&&"None"!==r[0].name?N.fromJSON(t.renderingRule||{rasterFunctionInfos:t.rasterFunctionInfos}):null},t.prototype.writeRenderingRule=function(e,t,r){this._isRFTJson(e)||(t[r]=e.toJSON())},t.prototype.readSpatialReference=function(e,t){var r=e||t.extent.spatialReference;return r?s.SpatialReference.fromJSON(r):null},t.prototype.readPixelType=function(e){return U.fromJSON(e)||e},t.prototype.writePixelType=function(e,t,r){(m.isNone(this.serviceRasterInfo)||this.pixelType!==this.serviceRasterInfo.pixelType)&&(t[r]=U.toJSON(e))},t.prototype.readVersion=function(e,t){var r=t.currentVersion;return r||(r=t.hasOwnProperty("fields")||t.hasOwnProperty("timeInfo")?10:9.3),r},t.prototype.applyFilter=function(e){var t=e;return this.pixelFilter&&(t=this._clonePixelData(e),this.pixelFilter(t)),t},t.prototype.applyRenderer=function(e,t){return o(this,void 0,void 0,(function(){var r,i,n,o;return a(this,(function(a){switch(a.label){case 0:return r=e,this._isPicture()||!this.renderer||!this._symbolizer||this.pixelFilter?[3,5]:(i=JSON.stringify(this._cachedRendererJson)!==JSON.stringify(this.renderer.toJSON()),(n=this._rasterJobHandler.instance)?i?(this._symbolizer.bind(),[4,n.updateSymbolizer(this._symbolizer,t)]):[3,2]:[3,4]);case 1:a.sent(),this._cachedRendererJson=this.renderer.toJSON(),a.label=2;case 2:return[4,n.symbolize(e.pixelBlock,t)];case 3:return o=a.sent(),r={extent:e.extent,pixelBlock:o},[3,5];case 4:r={extent:e.extent,pixelBlock:this._symbolizer.symbolize(e.pixelBlock)},a.label=5;case 5:return[2,r]}}))}))},t.prototype.destroy=function(){this._shutdownJobHandler()},t.prototype.increaseRasterJobHandlerUsage=function(){this._rasterJobHandler.refCount++},t.prototype.decreaseRasterJobHandlerUsage=function(){this._rasterJobHandler.refCount--,this._rasterJobHandler.refCount<=0&&this._shutdownJobHandler()},t.prototype.fetchImage=function(e,t,r,i){var n=this;if(void 0===i&&(i={}),null==e||null==t||null==r)return y.reject(new c("imagery-layer:fetch-image","Insufficient parameters for requesting an image. A valid extent, width and height values are required."));var a=this.renderer||this._symbolizer?this.generateRasterInfo(this.renderingRule,{signal:i.signal}):null;return y.when(a).then((function(a){a&&(n.rasterInfo=a);var o={imageServiceParameters:n.getExportImageServiceParameters(e,t,r,i.timeExtent),imageProps:{extent:e,width:t,height:r,format:n.format},requestAsImageElement:i.requestAsImageElement&&!n.pixelFilter||!1,signal:i.signal};return n._requestArrayBuffer(o)}))},t.prototype.fetchKeyProperties=function(e){var t=e&&e.renderingRule&&e.renderingRule.toJSON();return p(this.parsedUrl.path+"/keyProperties",{query:this._getQueryParams({renderingRule:this.version>=10.3&&t?JSON.stringify(t):null})}).then((function(e){return e.data}))},t.prototype.fetchRasterAttributeTable=function(e){var t=e&&e.renderingRule&&e.renderingRule.toJSON();return this.version<10.1?y.reject(new c("#fetchRasterAttributeTable()","Failed to get rasterAttributeTable")):p(this.parsedUrl.path+"/rasterAttributeTable",{query:this._getQueryParams({renderingRule:this.version>=10.3&&t?JSON.stringify(t):null})}).then((function(e){return V.fromJSON(e.data)}))},t.prototype.getCatalogItemRasterInfo=function(e,t){return o(this,void 0,void 0,(function(){var i,n,o,l,u;return a(this,(function(a){switch(a.label){case 0:return i=p(this.parsedUrl.path+"/"+e+"/info",r({query:this._getQueryParams(),responseType:"json"},t)).then((function(e){return e.data})),n=p(this.parsedUrl.path+"/"+e+"/info/keyProperties",r({query:this._getQueryParams(),responseType:"json"},t)).then((function(e){return e.data})).catch((function(){})),[4,y.all([i,n])];case 1:return(o=a.sent())[0]?(l=s.Extent.fromJSON(o[0].extent),u=o[0].statistics?o[0].statistics.map((function(e){return{min:e[0],max:e[1],avg:e[2],stddev:e[3]}})):null,[2,new F({bandCount:o[0].bandCount,extent:l,spatialReference:l.sr,pixelSize:new s.Point({x:o[0].pixelSizeX,y:o[0].pixelSizeY,spatialReference:l.sr}),pixelType:o[0].pixelType.toLowerCase(),statistics:u,histograms:o[0].histograms,keyProperties:o[1]})]):[2,void 0]}}))}))},t.prototype.getCatalogItemICSInfo=function(e,t){return o(this,void 0,void 0,(function(){var i,n,o,l,u,c,f,d,h,m,g,v,R,b,x,I,S,w,_,O,P,N,F,T,J,D,C,j,V;return a(this,(function(a){switch(a.label){case 0:return[4,p(this.parsedUrl.path+"/"+e+"/info/ics",r({query:this._getQueryParams(),responseType:"json"},t))];case 1:if(i=a.sent().data,!(n=i&&i.ics))return[2,void 0];if(o=this.version>=10.7?p(this.parsedUrl.path+"/"+e+"/info/icstopixel",r({query:this._getQueryParams(),responseType:"json"},t)).then((function(e){return e.data})).catch((function(){return{}})):{},!(l=n.extent.spatialReference))for(u in n.geodataXform)n.geodataXform[u].spatialReference&&(l=n.geodataXform[u].spatialReference);for(c={geometries:JSON.stringify({geometryType:"esriGeometryEnvelope",geometries:[n.extent]}),inSR:l.wkid||l,outSR:"0:"+e},f=p(this.parsedUrl.path+"/project",r({query:this._getQueryParams(c),responseType:"json"},t)).then((function(e){return e.data})),d=5,h=(n.extent.xmin+n.extent.xmax)/2,m=(n.extent.ymax-n.extent.ymin)/(d+1),g=n.extent.ymin+m,v=[],J=0;J<d;J++)v.push({x:h,y:g+m*J});return R={geometries:JSON.stringify({geometryType:"esriGeometryPoint",geometries:v}),inSR:l.wkid||l,outSR:"0:"+e},b=p(this.parsedUrl.path+"/project",r({query:this._getQueryParams(R),responseType:"json"},t)).then((function(e){return e.data})),[4,y.all([o,f,b])];case 2:for(x=a.sent(),null==(I=x[0].ipxf)&&(S=n.geodataXform&&n.geodataXform.xf_0)&&"topup"===S.name.toLowerCase()&&(I={affine:{name:"ics [sensor: Frame] to pixel (column, row) transformation",coefficients:S.coefficients,cellsizeRatio:0,type:"GeometricXform"}}),(w=s.Extent.fromJSON(x[1]&&x[1].geometries&&x[1].geometries[0]))&&(w.spatialReference=new s.SpatialReference({wkid:0,imageCoordinateSystem:n})),_=x[2].geometries.filter((function(e){return null!=e})),O=_.length,P=0,N=0,F=0,T=0,J=0;J<O;J++)P+=_[J].x,N+=_[J].y,F+=_[J].x*_[J].x,T+=_[J].x*_[J].y;return D=(O*T-P*N)/(O*F-P*P),C=0,j=_[d-1].x>_[0].x,V=_[d-1].y>_[0].y,D===1/0?C=V?90:270:0===D?C=j?0:180:D>0?C=j?180*Math.atan(D)/Math.PI:180*Math.atan(D)/Math.PI+180:D<0&&(C=V?180+180*Math.atan(D)/Math.PI:360+180*Math.atan(D)/Math.PI),[2,{ics:n,icsToPixelTransform:I,icsExtent:w,northDirection:C}]}}))}))},t.prototype.generateRasterInfo=function(e,t){return o(this,void 0,void 0,(function(){var r,i;return a(this,(function(n){switch(n.label){case 0:if((!e||"none"===e.functionName.toLowerCase())&&m.isSome(this.serviceRasterInfo))return[2,this.serviceRasterInfo];if(r=function(e){return e?JSON.stringify(e).match(/"rasterFunction":"(.*?")/gi).map((function(e){return e.replace('"rasterFunction":"',"").replace('"',"")})).join("/"):null}(e),this._functionRasterInfos[r])return[2,this._functionRasterInfos[r]];i=this._generateRasterInfo(e,t),this._functionRasterInfos[r]=i,n.label=1;case 1:return n.trys.push([1,3,,4]),[4,i];case 2:return[2,n.sent()];case 3:return n.sent(),this._functionRasterInfos[r]=null,[2,null];case 4:return[2]}}))}))},t.prototype.getExportImageServiceParameters=function(e,t,i,n){var a,o=(e=e.clone().shiftCentralMeridian()).spatialReference;if(o.imageCoordinateSystem){var s=o.imageCoordinateSystem,l=s.id,u=s.referenceServiceName;a=null!=l?u?this.parsedUrl.path.toLowerCase().indexOf("/"+u.toLowerCase()+"/")>-1?"0:"+l:JSON.stringify({icsid:l,icsns:u}):"0:"+l:JSON.stringify({ics:o.imageCoordinateSystem})}else a=o.wkid||JSON.stringify(o.toJSON());m.isSome(this.serviceRasterInfo)&&this.pixelType!==this.serviceRasterInfo.pixelType&&(this.exportImageServiceParameters.pixelType=this.pixelType);var p=this.exportImageServiceParameters.toJSON(),c=p.bandIds,f=p.noData,d=p.mosaicRule,h=p.renderingRule;c instanceof Array&&c.length>0&&(p.bandIds=c.join(",")),f instanceof Array&&f.length>0&&(p.noData=f.join(","));var y=this.timeInfo;d&&d.multidimensionalDefinition&&n&&y&&y.startField&&(d.multidimensionalDefinition=d.multidimensionalDefinition.filter((function(e){return e.dimensionName!==y.startField}))),p.mosaicRule=d&&JSON.stringify(d),p.renderingRule=h&&JSON.stringify(h);var g={};if(n){var v=n.toJSON(),R=v.start,b=v.end;R&&b&&R===b?g.time=""+R:null==R&&null==b||(g.time=(null==R?"null":R)+","+(null==b?"null":b))}return r({bbox:e.xmin+","+e.ymin+","+e.xmax+","+e.ymax,bboxSR:a,imageSR:a,size:t+","+i},p,g)},t.prototype.queryRasters=function(e){return this.queryTask.execute(e)},t.prototype.queryVisibleRasters=function(e,t){var r=this;if(!e)return y.reject(new c("imagery-layer: query-visible-rasters","missing query parameter"));var i=t||{pixelSize:null,returnDomainValues:!1,returnTopmostRaster:!1,showNoDataRecords:!1},n=i.pixelSize,a=i.returnDomainValues,o=i.returnTopmostRaster,l=i.showNoDataRecords,u=!1,p=null,f=null,d=this.rasterFunctionNamesIndex;if(e.outFields&&this.version>=10.4){var h=e.outFields.filter((function(e){return e.toLowerCase().indexOf("raster.servicepixelvalue")>-1&&e.length>"raster.servicepixelvalue".length})).map((function(e){var t=e.slice("raster.servicepixelvalue".length+1);return[r._updateRenderingRulesFunctionName(t,d),t]}));p=h.map((function(e){return new N({functionName:e[0]})})),f=h.map((function(e){return e[1]})),u=e.outFields.some((function(e){return-1===e.toLowerCase().indexOf("raster.servicepixelvalue")})),0===p.length?this.renderingRule?(p.push(this.renderingRule),f.push(this.renderingRule.functionName)):p=null:this.renderingRule&&!p.some((function(e){return e.functionName===r.renderingRule.functionName}))&&(p.push(this.renderingRule),f.push(this.renderingRule.functionName))}var m=!e.outSpatialReference||e.outSpatialReference.equals(this.spatialReference),g=this._getQueryParams({geometry:e.geometry,timeExtent:e.timeExtent,mosaicRule:this.exportImageServiceParameters.mosaicRule,renderingRule:this.version<10.4?this.renderingRule:null,renderingRules:p,pixelSize:n,returnCatalogItems:u,returnGeometry:m,maxItemCount:o?1:null});delete g.f;var v=new M(g),R=new C({url:this.url}),b=this.generateRasterInfo(this.renderingRule);return y.create((function(t){b.then((function(){R.execute(v).then((function(i){var n=e.outFields;if(u&&!m&&i.catalogItems&&i.catalogItems.features&&i.catalogItems.features.length>0){var o=r.objectIdField||"ObjectId",p=i.catalogItems.features,d=p.map((function(e){return e.attributes&&e.attributes[o]})),h=new z({objectIds:d,returnGeometry:!0,outSpatialReference:e.outSpatialReference,outFields:[o]});return r.queryRasters(h).then((function(u){u&&u.features&&u.features.length>0&&u.features.forEach((function(t){p.forEach((function(r){r.attributes[o]===t.attributes[o]&&(r.geometry=new s.Polygon(t.geometry),r.geometry.spatialReference=e.outSpatialReference)}))})),t(r._processVisibleRastersResponse(i,{returnDomainValues:a,templateRRFunctionNames:f,showNoDataRecords:l,templateFields:n}))})).catch((function(){throw new c("imagery-layer:query-visible-rasters","encountered error when querying visible rasters geometry")}))}t(r._processVisibleRastersResponse(i,{returnDomainValues:a,templateRRFunctionNames:f,showNoDataRecords:l,templateFields:n}))})).catch((function(){throw new c("imagery-layer:query-visible-rasters","encountered error when querying visible rasters")}))}))}))},t.prototype._fetchService=function(e){return o(this,void 0,void 0,(function(){var t,r,i,n,o,s,l=this;return a(this,(function(a){switch(a.label){case 0:return(t=this.sourceJSON)?[3,2]:[4,p(this.parsedUrl.path,{query:this._getQueryParams(),responseType:"json",signal:e})];case 1:r=a.sent(),i=r.data,n=r.ssl,t=i,this.sourceJSON=t,n&&(this.url=this.url.replace(/^http:/i,"https:")),a.label=2;case 2:return this.read(t,{origin:"service",url:this.parsedUrl}),m.isSome(this.serviceRasterInfo)&&!this.rasterInfo&&(this.rasterInfo=this.serviceRasterInfo),o=m.isSome(this.serviceRasterInfo)?y.resolve(this.serviceRasterInfo):this._fetchAuxiliaryRasterInfo({serviceInfo:t,signal:e}).then((function(e){return l._set("serviceRasterInfo",e),e})),s=this.renderingRule&&"none"!==this.renderingRule.functionName.toLowerCase()?this.generateRasterInfo(this.renderingRule,{signal:e}):null,[2,y.all([o,s]).then((function(e){e[1]?l._set("rasterInfo",e[1]):l._set("rasterInfo",e[0]),l._configDefaultRenderer(),l.watch("renderer",(function(){return l._configDefaultRenderer()})),l.watch("renderingRule",(function(e){(l.renderer||l._symbolizer||l.popupEnabled&&l.popupTemplate)&&l.generateRasterInfo(e).then((function(e){e&&(l.rasterInfo=e)}))}));var t=m.isSome(l.serviceRasterInfo)&&l.serviceRasterInfo.multidimensionalInfo;t&&l._updateMultidimensionalDefinition(t)}))]}}))}))},t.prototype._initJobHandler=function(){return o(this,void 0,void 0,(function(){var e,t=this;return a(this,(function(r){switch(r.label){case 0:return null!=this._rasterJobHandler.connectionPromise?[2,this._rasterJobHandler.connectionPromise]:(e=new T,this._rasterJobHandler.connectionPromise=e.initialize().then((function(){t._rasterJobHandler.instance=e}),(function(){return null})),[4,this._rasterJobHandler.connectionPromise]);case 1:return r.sent(),[2]}}))}))},t.prototype._shutdownJobHandler=function(){this._rasterJobHandler.instance&&this._rasterJobHandler.instance.destroy(),this._rasterJobHandler.instance=null,this._rasterJobHandler.connectionPromise=null,this._rasterJobHandler.refCount=0},t.prototype._isPicture=function(){return!this.format||this.format.indexOf("jpg")>-1||this.format.indexOf("png")>-1},t.prototype._configDefaultRenderer=function(){if(!this._isPicture()&&!this.pixelFilter){if(!this.bandIds&&this.rasterInfo.bandCount>=3){var e=_.getDefaultBandCombination(this.rasterInfo);!e||3===this.rasterInfo.bandCount&&0===e[0]&&1===e[1]&&2===e[2]||(this.bandIds=e)}this.renderer||(this.renderer=_.createDefaultRenderer(this.rasterInfo,this.bandIds)),this._symbolizer?(this._symbolizer.renderer=this.renderer,this._symbolizer.rasterInfo=this.rasterInfo):this._symbolizer=new D({renderer:this.renderer,rasterInfo:this.rasterInfo}),this._symbolizer.bind()||(this._symbolizer=null)}},t.prototype._clonePixelData=function(e){return null==e?e:{extent:e.extent&&e.extent.clone(),pixelBlock:e.pixelBlock&&e.pixelBlock.clone()}},t.prototype._getQueryParams=function(e){var t=this.raster,i=this.viewId;return r({raster:t,viewId:i,f:"json"},e)},t.prototype._decodePixelBlock=function(e,t,r){return this._rasterJobHandler.instance?this._rasterJobHandler.instance.decode({data:e,options:t}):J.decode(e,t,r)},t.prototype._fetchAuxiliaryRasterInfo=function(e){var t=e&&e.serviceInfo;if(!t)return y.reject(new c("imagery-layer:fetch-metadata","valid serviceInfo is required"));var r=e.renderingRule?JSON.stringify(e.renderingRule.toJSON()):null,i=e.signal,n=!!(t.hasRasterAttributeTable&&this.version>=10.1)&&p(this.parsedUrl.path+"/rasterAttributeTable",{query:this._getQueryParams({renderingRule:this.version>=10.1?r:null}),signal:i}).then((function(e){return V.fromJSON(e.data)})).catch((function(){return null})),a=!!(t.hasColormap&&this.version>=10.1)&&p(this.parsedUrl.path+"/colormap",{query:this._getQueryParams({renderingRule:this.version>=10.6?r:null}),signal:i}).then((function(e){return e.data&&e.data.colormap})),o=!!(t.hasHistograms&&this.version>=10.1)&&p(this.parsedUrl.path+"/histograms",{query:this._getQueryParams({renderingRule:this.version>=10.1?r:null}),signal:i}).then((function(e){return e.data&&e.data.histograms})),l=this.version>=10.3&&p(this.parsedUrl.path+"/keyProperties",{query:this._getQueryParams({renderingRule:r}),signal:i}).then((function(e){return e.data})).catch((function(){})),u=!!(t.hasMultidimensions&&this.version>=10.3)&&p(this.parsedUrl.path+"/multidimensionalInfo",{query:this._getQueryParams(),signal:i}).then((function(e){return e.data&&e.data.multidimensionalInfo}));return y.all([n,a,o,l,u]).then((function(e){var r=null;if(t.minValues&&t.minValues.length===t.bandCount){r=[];for(var i=0;i<t.minValues.length;i++)r.push({min:t.minValues[i],max:t.maxValues[i],avg:t.meanValues[i],stddev:t.stdvValues[i]})}var n=Math.ceil((t.extent.xmax-t.extent.xmin)/t.pixelSizeX-.1),a=Math.ceil((t.extent.ymax-t.extent.ymin)/t.pixelSizeY-.1),o=s.SpatialReference.fromJSON(t.spatialReference||t.extent.spatialReference);return new F({width:n,height:a,bandCount:t.bandCount,extent:s.Extent.fromJSON(t.extent),spatialReference:o,pixelSize:new s.Point({x:t.pixelSizeX,y:t.pixelSizeY,spatialReference:o}),pixelType:t.pixelType.toLowerCase(),statistics:r,attributeTable:e[0]||null,colormap:e[1]||null,histograms:e[2]||null,keyProperties:e[3]||null,multidimensionalInfo:e[4]||null})}))},t.prototype._requestArrayBuffer=function(e){var t=this,i=e.imageProps,n=e.requestAsImageElement,a=e.signal;if(n&&!this.pixelFilter&&i.format&&i.format.indexOf("png")>-1)return p(this.parsedUrl.path+"/exportImage",{responseType:"image",query:this._getQueryParams(r({f:"image"},e.imageServiceParameters)),signal:a}).then((function(e){return{imageElement:e.data,params:i}}));var o=this._initJobHandler(),s=p(this.parsedUrl.path+"/exportImage",{responseType:"array-buffer",query:this._getQueryParams(r({f:"image"},e.imageServiceParameters)),signal:a});return y.all([s,o]).then((function(e){var n=e[0].data,o=i.format||"jpgpng",s=o;if("bsq"!==s&&"bip"!==s&&(s=J.getFormat(n)),!s)throw new c("imagery-layer:fetch-image","unsupported format signature "+String.fromCharCode.apply(null,new Uint8Array(n)));var l=o.indexOf("png")>-1&&("png"===s||"jpg"===s),u={signal:a};return l?J.decode(n,r({useCanvas:!0},i),u).then((function(e){return{pixelData:{pixelBlock:e,extent:i.extent},params:i}})):t._decodePixelBlock(n,{width:i.width,height:i.height,planes:null,pixelType:null,noDataValue:null,format:o},u).then((function(e){return{pixelData:{pixelBlock:e,extent:i.extent},params:i}}))}))},t.prototype._generateRasterInfo=function(e,t){return o(this,void 0,void 0,(function(){var i;return a(this,(function(n){switch(n.label){case 0:return[4,p(this.parsedUrl.path,r({query:this._getQueryParams({renderingRule:e}),responseType:"json"},t))];case 1:return i=n.sent().data,[4,this._fetchAuxiliaryRasterInfo(r({serviceInfo:i,renderingRule:e},t))];case 2:return[2,n.sent()]}}))}))},t.prototype._isValidCustomizedMosaicRule=function(e){return e&&JSON.stringify(e.toJSON())!==JSON.stringify(this._defaultServiceMosaicRule&&this._defaultServiceMosaicRule.toJSON())},t.prototype._updateMultidimensionalDefinition=function(e){if(!this._isValidCustomizedMosaicRule(this.mosaicRule)){var t=e.variables[0].dimensions,r=[];for(var i in t)if(t.hasOwnProperty(i)){var n=t[i],a=n.extent,o=!0,s=[a[0]];n.hasRanges&&!0===n.hasRanges?(o=!1,s=[n.values[0]]):"stdz"===n.name.toLowerCase()&&Math.abs(a[1])<=Math.abs(a[0])&&(s=[a[1]]),r.push(new x({variableName:"",dimensionName:t[i].name,isSlice:o,values:s}))}if(r.length>0){this.mosaicRule=this.mosaicRule||new O;var l=this.mosaicRule.multidimensionalDefinition;(!l||l&&l.length<=0)&&(this.mosaicRule.multidimensionalDefinition=r)}}},t.prototype._formatAttributeValue=function(e,t){if("string"==typeof e){var r=this.popupTemplate&&this.popupTemplate.fieldInfos,i=this._getFieldInfo(r,t),n=i&&i.format;if(n){var a=void 0,o=void 0;return e.trim().indexOf(",")>-1?(o=(a=",")+" ",this._formatDelimitedString(e,a,o,n)):e.trim().indexOf(" ")>-1?(a=o=" ",this._formatDelimitedString(e,a,o,n)):this._formatNumberFromString(e,n)}}return e},t.prototype._getFieldInfo=function(e,t){if(e&&e.length&&t){var r=t.toLowerCase(),i=void 0;return e.some((function(e){return!(!e.fieldName||e.fieldName.toLowerCase()!==r&&e.fieldName.toLowerCase()!==r.replace(/ /g,"_"))&&(i=e,!0)})),i}},t.prototype._formatDelimitedString=function(e,t,r,i){var n=this;return e&&t&&r&&i?e.trim().split(t).map((function(e){return n._formatNumberFromString(e,i)})).join(r):e},t.prototype._formatNumberFromString=function(e,t){if(!e||!t)return e;var r=Number(e);return isNaN(r)?e:t.format(r)},t.prototype._processVisibleRastersResponse=function(e,t){t=t||{};var r,i,n,a=e.value,o=t.templateRRFunctionNames,s=t.showNoDataRecords,u=t.returnDomainValues,p=t.templateFields,c=e.processedValues,f=e.catalogItems&&e.catalogItems.features,d=e.properties&&e.properties.Values&&e.properties.Values.map((function(e){return e.replace(/ /gi,", ")}))||[],h=this.objectIdField||"ObjectId",y="string"==typeof a&&a.toLowerCase().indexOf("nodata")>-1,g=[];if(a&&!f&&!y){var v={};v[h]=0,d=[a],f=[new l(this.fullExtent,null,v)]}if(!f)return[];this._updateResponseFieldNames(f,p);for(var R=0;R<f.length;R++){if(r=f[R],null!=a&&!y){if(i=d[R],n=this.renderingRule&&c&&c.length>0&&o&&o.length>0&&o.indexOf(this.renderingRule.functionName)>-1?c[o.indexOf(this.renderingRule.functionName)]:a,"nodata"===i.toLowerCase()&&!s)continue;r.attributes["Raster.ItemPixelValue"]=this._formatAttributeValue(i,"Raster.ItemPixelValue"),r.attributes["Raster.ServicePixelValue"]=this._formatAttributeValue(n,"Raster.ServicePixelValue"),this._updateFeatureWithMagDirValues(r,i);var b=this.fields&&this.fields.length>0,x=this.renderingRule&&m.isSome(this.serviceRasterInfo)&&this.serviceRasterInfo.attributeTable?b?i:a:n;this.renderingRule||(x=b?i:a),this._updateFeatureWithRasterAttributeTableValues(r,x)}if(r.sourceLayer=this,u&&this._updateFeatureWithDomainValues(r),o&&c&&o.length===c.length)for(var I=0;I<o.length;I++){var S="Raster.ServicePixelValue."+o[I];r.attributes[S]=this._formatAttributeValue(c[I],S)}g.push(f[R])}return g},t.prototype._updateFeatureWithRasterAttributeTableValues=function(e,t){var r=this,i=this.rasterInfo&&this.rasterInfo.attributeTable||m.isSome(this.serviceRasterInfo)&&this.serviceRasterInfo.attributeTable,n=i&&i.features;if(n){var a=i.fields,o=a.map((function(e){return e.name})).filter((function(e){return"value"===e.toLowerCase()})),s=o&&o[0];if(s){var l=n.filter((function(e){return e.attributes[s]===(null!=t?parseInt(t,10):null)}));l&&l[0]&&a.forEach((function(t){var i=r.rasterAttributeTableFieldPrefix+t.name;e.attributes[i]=r._formatAttributeValue(l[0].attributes[t.name],i)}))}}},t.prototype._updateFeatureWithMagDirValues=function(e,t){if(this.pixelFilter&&("esriImageServiceDataTypeVector-UV"===this.serviceDataType||"esriImageServiceDataTypeVector-MagDir"===this.serviceDataType)){var r=t.replace(" ",",").split(",").map((function(e){return parseFloat(e)})),i=r.map((function(e){return[e]})),n=r.map((function(e){return{minValue:e,maxValue:e,noDataValue:null}})),a=new P({height:1,width:1,pixelType:"f32",pixels:i,statistics:n});this.pixelFilter({pixelBlock:a,extent:new s.Extent(0,0,0,0,this.spatialReference)}),e.attributes["Raster.Magnitude"]=a.pixels[0][0],e.attributes["Raster.Direction"]=a.pixels[1][0]}},t.prototype._updateFeatureWithDomainValues=function(e){var t=this.fields&&this.fields.filter((function(e){return e.domain&&"coded-value"===e.domain.type}));null!=t&&t.forEach((function(t){var r=e.attributes[t.name];if(null!=r){var i=t.domain.codedValues.filter((function(e){return e.code===r}))[0];i&&(e.attributes[t.name]=i.name)}}))},t.prototype._updateResponseFieldNames=function(e,t){if(t&&!(t.length<1)){var r=this.fieldsIndex;r&&e.forEach((function(e){if(e&&e.attributes)for(var i=0,n=t;i<n.length;i++){var a=n[i];if(r.has(a)){var o=r.get(a).name;o!==a&&(e.attributes[a]=e.attributes[o],delete e.attributes[o])}}}))}},t.prototype._updateRenderingRulesFunctionName=function(e,t){if(e&&!(e.length<1)){if("Raw"===e)return e.replace("Raw","None");var r=e.toLowerCase().replace(/ /gi,"_");return t.has(r)?t.get(r):e}},t.prototype._isRFTJson=function(e){return e.name&&e.arguments&&e.function&&e.hasOwnProperty("functionType")},n([v.property()],t.prototype,"_functionRasterInfos",void 0),n([v.property()],t.prototype,"_rasterJobHandler",void 0),n([v.property()],t.prototype,"_symbolizer",void 0),n([v.property()],t.prototype,"_defaultServiceMosaicRule",void 0),n([v.reader("_defaultServiceMosaicRule",["defaultMosaicMethod"])],t.prototype,"readDefaultServiceMosaicRule",null),n([v.property()],t.prototype,"_cachedRendererJson",void 0),n([v.property()],t.prototype,"rasterAttributeTableFieldPrefix",void 0),n([v.property({readOnly:!0,dependsOn:["rasterFunctionInfos"]})],t.prototype,"rasterFunctionNamesIndex",null),n([v.property({readOnly:!0,dependsOn:["url"]})],t.prototype,"queryTask",null),n([v.property()],t.prototype,"adjustAspectRatio",void 0),n([v.property({readOnly:!0}),v.aliasOf("serviceRasterInfo.bandCount")],t.prototype,"bandCount",void 0),n([v.property({type:[R.Integer],json:{write:!0}})],t.prototype,"bandIds",void 0),n([v.property({readOnly:!0})],t.prototype,"capabilities",void 0),n([v.reader("capabilities")],t.prototype,"readCapabilities",null),n([v.property({type:Number})],t.prototype,"compressionQuality",void 0),n([v.writer("compressionQuality")],t.prototype,"writeCompressionQuality",null),n([v.property({type:Number})],t.prototype,"compressionTolerance",void 0),n([v.writer("compressionTolerance")],t.prototype,"writeCompressionTolerance",null),n([v.property({json:{read:{source:"copyrightText"}}})],t.prototype,"copyright",void 0),n([v.property({type:String,json:{read:{source:"layerDefinition.definitionExpression"},write:{target:"layerDefinition.definitionExpression"}}})],t.prototype,"definitionExpression",void 0),n([v.property({readOnly:!0,constructOnly:!0})],t.prototype,"exportImageServiceParameters",void 0),n([v.property()],t.prototype,"rasterInfo",void 0),n([v.property({readOnly:!0,type:[S]})],t.prototype,"fields",void 0),n([v.property({readOnly:!0,dependsOn:["fields"]})],t.prototype,"fieldsIndex",null),n([v.property({type:String,json:{write:!0}})],t.prototype,"format",null),n([v.property({type:s.Extent})],t.prototype,"fullExtent",void 0),n([v.property({readOnly:!0})],t.prototype,"hasMultidimensions",void 0),n([v.property({json:{read:{source:"maxImageHeight"}}})],t.prototype,"imageMaxHeight",void 0),n([v.property({json:{read:{source:"maxImageWidth"}}})],t.prototype,"imageMaxWidth",void 0),n([v.property({type:String,json:{read:{reader:A.read},write:{writer:A.write}}})],t.prototype,"interpolation",void 0),n([v.property({type:O})],t.prototype,"mosaicRule",null),n([v.reader("mosaicRule",["mosaicRule","defaultMosaicMethod"])],t.prototype,"readMosaicRule",null),n([v.writer("mosaicRule")],t.prototype,"writeMosaicRule",null),n([v.property({readOnly:!0}),v.aliasOf("serviceRasterInfo.multidimensionalInfo")],t.prototype,"multidimensionalInfo",void 0),n([v.property()],t.prototype,"noData",void 0),n([v.writer("noData")],t.prototype,"writeNoData",null),n([v.property({type:String,json:{read:{reader:E.read},write:{writer:E.write}}})],t.prototype,"noDataInterpretation",void 0),n([v.property({type:String,readOnly:!0,json:{read:{source:["fields"]}}})],t.prototype,"objectIdField",void 0),n([v.reader("objectIdField")],t.prototype,"readObjectIdField",null),n([v.property({readOnly:!0,dependsOn:["url"]})],t.prototype,"parsedUrl",null),n([v.property({readOnly:!0}),v.aliasOf("serviceRasterInfo.pixelSize.x")],t.prototype,"pixelSizeX",void 0),n([v.property({readOnly:!0}),v.aliasOf("serviceRasterInfo.pixelSize.y")],t.prototype,"pixelSizeY",void 0),n([v.property({type:Function})],t.prototype,"pixelFilter",void 0),n([v.property()],t.prototype,"raster",void 0),n([v.property()],t.prototype,"viewId",void 0),n([v.property({types:u.rasterRendererTypes,json:{read:{source:"layerDefinition.drawingInfo.renderer"},write:{target:"layerDefinition.drawingInfo.renderer"}}})],t.prototype,"renderer",void 0),n([v.reader("renderer")],t.prototype,"readRenderer",null),n([v.property(b.opacityDrawingInfo)],t.prototype,"opacity",void 0),n([v.property({readOnly:!0}),v.aliasOf("serviceRasterInfo.attributeTable")],t.prototype,"rasterAttributeTable",void 0),n([v.property({readOnly:!0,dependsOn:["fields","rasterInfo"]})],t.prototype,"rasterFields",null),n([v.property({readOnly:!0})],t.prototype,"rasterFunctionInfos",void 0),n([v.property({type:N})],t.prototype,"renderingRule",null),n([v.reader("renderingRule",["renderingRule","rasterFunctionInfos"])],t.prototype,"readRenderingRule",null),n([v.writer("renderingRule")],t.prototype,"writeRenderingRule",null),n([v.property()],t.prototype,"serviceDataType",void 0),n([v.property({readOnly:!0,type:s.SpatialReference})],t.prototype,"spatialReference",void 0),n([v.reader("spatialReference",["spatialReference","extent"])],t.prototype,"readSpatialReference",null),n([v.property()],t.prototype,"pixelType",void 0),n([v.reader("pixelType")],t.prototype,"readPixelType",null),n([v.writer("pixelType")],t.prototype,"writePixelType",null),n([v.property({constructOnly:!0,type:F})],t.prototype,"serviceRasterInfo",void 0),n([v.property()],t.prototype,"sourceJSON",void 0),n([v.property(b.url)],t.prototype,"url",void 0),n([v.property({readOnly:!0})],t.prototype,"version",void 0),n([v.reader("version",["currentVersion","fields","timeInfo"])],t.prototype,"readVersion",null),t=n([v.subclass("esri.layers.mixins.ArcGISImageService")],t)}(v.declared(e))}}));