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

define(["require","exports","../../core/tsSupport/assignHelper","../../core/arrayUtils","../../core/Logger","../../core/unitUtils","../../intl/date","./numberUtils","../visualVariables/support/ColorStop"],(function(e,t,n,a,r,i,l,o,s){Object.defineProperty(t,"__esModule",{value:!0});var u=r.getLogger("esri.renderers.support.utils"),m="<",d=">",f="%",c="–",p={millisecond:0,second:1,minute:2,hour:3,day:4,month:5,year:6},v={millisecond:"long-month-day-year-long-time",second:"long-month-day-year-long-time",minute:"long-month-day-year-short-time",hour:"long-month-day-year-short-time",day:"long-month-day-year",month:"long-month-day-year",year:"year"};function h(e,t,n){var a="";return 0===t?a=m+" ":t===n&&(a=d+" "),a+e}function y(e){var t=e.minValue,n=e.maxValue,a=e.isFirstBreak?"":d+" ",r="percent-of-total"===e.normalizationType?f:"";return t=null==t?"":o.format(t),n=null==n?"":o.format(n),a+t+r+" "+c+" "+n+r}function g(e,t){return"normalizationField"in e&&e.normalizationField?(n=e.field,a=e.normalizationField,{type:"normalized-field",field:n,normalizationField:a}):"field"in e&&e.field?b(e.field):"valueExpression"in e&&e.valueExpression?(r=e.valueExpression,i=e.valueExpressionTitle,{type:"expression",expression:r,title:i,returnType:t}):null;var n,a,r,i}function b(e){return{type:"field",field:e}}t.meterIn={inches:i.convertUnit(1,"meters","inches"),feet:i.convertUnit(1,"meters","feet"),"us-feet":i.convertUnit(1,"meters","us-feet"),yards:i.convertUnit(1,"meters","yards"),miles:i.convertUnit(1,"meters","miles"),"nautical-miles":i.convertUnit(1,"meters","nautical-miles"),millimeters:i.convertUnit(1,"meters","millimeters"),centimeters:i.convertUnit(1,"meters","centimeters"),decimeters:i.convertUnit(1,"meters","decimeters"),meters:i.convertUnit(1,"meters","meters"),kilometers:i.convertUnit(1,"meters","kilometers"),"decimal-degrees":1/i.lengthToDegrees(1,"meters")},t.timelineDateFormatOptions=l.convertDateFormatToIntlOptions("short-date"),t.createColorStops=function(e){var t=e.values,n=e.colors,a=e.labelIndexes,r=e.isDate,i=e.dateFormatOptions;return t.map((function(e,u){var m=null;if(!a||a.indexOf(u)>-1){var d=void 0;(d=r?l.formatDate(e,i):o.format(e))&&(m=h(d,u,t.length-1))}return new s({value:e,color:n[u],label:m})}))},t.updateColorStops=function(e){for(var t=e.stops,n=e.changes,a=e.isDate,r=e.dateFormatOptions,i=t.map((function(e){return e.value})),s=[],u=0,m=n;u<m.length;u++){var d=m[u];s.push(d.index),i[d.index]=d.value}var f=o.round(i,{indexes:s});t.forEach((function(e,n){if(e.value=i[n],null!=e.label){var s=void 0,u=null;(s=a?l.formatDate(f[n],r):o.format(f[n]))&&(u=h(s,n,t.length-1)),e.label=u}}))},t.createClassBreakLabel=y,t.setLabelsForClassBreaks=function(e){var t=e.classBreakInfos,n=e.normalizationType,a=[];if(t&&t.length)if("standard-deviation"!==e.classificationMethod)if(e.round){a.push(t[0].minValue);for(var r=0,i=t;r<i.length;r++){var l=i[r];a.push(l.maxValue)}a=o.round(a),t.forEach((function(e,t){e.label=y({minValue:0===t?a[0]:a[t],maxValue:a[t+1],isFirstBreak:0===t,normalizationType:n})}))}else t.forEach((function(e,t){e.label=y({minValue:e.minValue,maxValue:e.maxValue,isFirstBreak:0===t,normalizationType:n})}));else u.warn("setLabelsForClassBreaks","cannot set labels for class breaks generated using 'standard-deviation' method.")},t.updateClassBreak=function(e){if("standard-deviation"!==e.classificationMethod){var t=e.classBreaks,n=e.change,a=n.index,r=n.value,i=t.length,l=-1,o=-1;0===a?l=a:a===i?o=a-1:(o=a-1,l=a);var s=e.normalizationType,m=null;l>-1&&l<i&&((m=t[l]).minValue=r,m.label=y({minValue:m.minValue,maxValue:m.maxValue,isFirstBreak:0===l,normalizationType:s})),o>-1&&o<i&&((m=t[o]).maxValue=r,m.label=y({minValue:m.minValue,maxValue:m.maxValue,isFirstBreak:0===o,normalizationType:s}))}else u.warn("updateClassBreak","cannot update labels for class breaks generated using 'standard-deviation' method.")},t.calculateDateFormatInterval=function(e){for(var t=e.map((function(e){return new Date(e)})),n=t.length,a=1/0,r=null,i=0;i<n-1;i++){for(var l=t[i],o=[],s=1/0,u=null,m=i+1;m<n;m++){var d=t[m],f=(l.getFullYear()!==d.getFullYear()?"year":l.getMonth()!==d.getMonth()&&"month")||l.getDate()!==d.getDate()&&"day"||l.getHours()!==d.getHours()&&"hour"||l.getMinutes()!==d.getMinutes()&&"minute"||l.getSeconds()!==d.getSeconds()&&"second"||"millisecond",c=p[f];c<s&&(s=c,u=f),o.push(f)}s<a&&(a=s,r=u)}return r},t.createUniqueValueLabel=function(e){var t=e.value,n=e.domain,a=e.fieldInfo,r=e.dateFormatInterval,i=String(t),s=n&&"codedValues"in n&&n.codedValues?n.getName(t):null;return s?i=s:"number"==typeof t&&(i=a&&"date"===a.type?l.formatDate(t,r&&l.convertDateFormatToIntlOptions(v[r])):o.format(t)),i},t.getAttributes=function(e,t){var n=[];if("class-breaks"===e.type||"heatmap"===e.type)n.push(g(e,"number"));else if("unique-value"===e.type){var r=e.uniqueValueInfos[0],i=null;if(r&&r.value){var l=typeof e.uniqueValueInfos[0].value;"string"!==l&&"number"!==l||(i=l)}n.push(g(e,i)),[e.field2,e.field3].forEach((function(e){return e&&n.push(b(e))}))}else"dot-density"===e.type&&e.attributes.forEach((function(e){return n.push(g(e,"number"))}));var o=t?t(e):"visualVariables"in e?e.visualVariables:null;return o&&o.forEach((function(e){return n.push(g(e,"number"))})),a.unique(n.filter(Boolean),(function(e,t){return"field"===e.type&&"field"===t.type?e.field===t.field:"normalized-field"===e.type&&"normalized-field"===t.type?e.field===t.field&&e.normalizationField===t.normalizationField:"expression"===e.type&&"expression"===t.type&&e.expression===t.expression}))}}));