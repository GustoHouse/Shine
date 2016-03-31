/*! css.js 24-08-2015 */
!function(a){"use strict";var b=function(){this.cssImportStatements=[],this.cssKeyframeStatements=[],this.cssRegex=new RegExp("([\\s\\S]*?){([\\s\\S]*?)}","gi"),this.cssMediaQueryRegex="((@media [\\s\\S]*?){([\\s\\S]*?}\\s*?)})",this.cssKeyframeRegex="((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})",this.combinedCSSRegex="((\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})",this.cssCommentsRegex="(\\/\\*[\\s\\S]*?\\*\\/)",this.cssImportStatementRegex=new RegExp("@import .*?;","gi")};b.prototype.stripComments=function(a){var b=new RegExp(this.cssCommentsRegex,"gi");return a.replace(b,"")},b.prototype.parseCSS=function(a){if(void 0===a)return[];for(var b=[];;){var c=this.cssImportStatementRegex.exec(a);if(null===c)break;this.cssImportStatements.push(c[0]),b.push({selector:"@imports",type:"imports",styles:c[0]})}a=a.replace(this.cssImportStatementRegex,"");for(var d,e=new RegExp(this.cssKeyframeRegex,"gi");;){if(d=e.exec(a),null===d)break;b.push({selector:"@keyframes",type:"keyframes",styles:d[0]})}a=a.replace(e,"");for(var f=new RegExp(this.combinedCSSRegex,"gi");;){if(d=f.exec(a),null===d)break;var g="";g=void 0===d[2]?d[5].split("\r\n").join("\n").trim():d[2].split("\r\n").join("\n").trim();var h=new RegExp(this.cssCommentsRegex,"gi"),i=h.exec(g);if(null!==i&&(g=g.replace(h,"").trim()),-1!==g.indexOf("@media")){var j={selector:g,type:"media",subStyles:this.parseCSS(d[3]+"\n}")};null!==i&&(j.comments=i[0]),b.push(j)}else{var k=this.parseRules(d[6]),l={selector:g,rules:k};"@font-face"===g&&(l.type="font-face"),null!==i&&(l.comments=i[0]),b.push(l)}}return b},b.prototype.parseRules=function(a){a=a.split("\r\n").join("\n");var b=[];a=a.split(";");for(var c=0;c<a.length;c++){var d=a[c];if(d=d.trim(),-1!==d.indexOf(":")){d=d.split(":");var e=d[0].trim(),f=d.slice(1).join(":").trim();if(e.length<1||f.length<1)continue;b.push({directive:e,value:f})}else"base64,"==d.trim().substr(0,7)?b[b.length-1].value+=d.trim():d.length>0&&b.push({directive:"",value:d,defective:!0})}return b},b.prototype.findCorrespondingRule=function(a,b,c){void 0===c&&(c=!1);for(var d=!1,e=0;e<a.length&&(a[e].directive!=b||(d=a[e],c!==a[e].value));e++);return d},b.prototype.findBySelector=function(a,b,c){void 0===c&&(c=!1);for(var d=[],e=0;e<a.length;e++)c===!1?a[e].selector===b&&d.push(a[e]):-1!==a[e].selector.indexOf(b)&&d.push(a[e]);if(d.length<2)return d;var f=d[0];for(e=1;e<d.length;e++)this.intelligentCSSPush([f],d[e]);return[f]},b.prototype.deleteBySelector=function(a,b){for(var c=[],d=0;d<a.length;d++)a[d].selector!==b&&c.push(a[d]);return c},b.prototype.compressCSS=function(a){for(var b=[],c={},d=0;d<a.length;d++){var e=a[d];if(c[e.selector]!==!0){var f=this.findBySelector(a,e.selector);0!==f.length&&(b.push(f[0]),c[e.selector]=!0)}}return b},b.prototype.cssDiff=function(a,b){if(a.selector!==b.selector)return!1;if("media"===a.type||"media"===b.type)return!1;for(var c,d,e={selector:a.selector,rules:[]},f=0;f<a.rules.length;f++)c=a.rules[f],d=this.findCorrespondingRule(b.rules,c.directive,c.value),d===!1?e.rules.push(c):c.value!==d.value&&e.rules.push(c);for(var g=0;g<b.rules.length;g++)d=b.rules[g],c=this.findCorrespondingRule(a.rules,d.directive),c===!1&&(d.type="DELETED",e.rules.push(d));return 0===e.rules.length?!1:e},b.prototype.intelligentMerge=function(a,b,c){void 0===c&&(c=!1);for(var d=0;d<b.length;d++)this.intelligentCSSPush(a,b[d],c);for(d=0;d<a.length;d++){var e=a[d];"media"!==e.type&&"keyframes"!==e.type&&(e.rules=this.compactRules(e.rules))}},b.prototype.intelligentCSSPush=function(a,b,c){var d=(b.selector,!1);if(void 0===c&&(c=!1),c===!1){for(var e=0;e<a.length;e++)if(a[e].selector===b.selector){d=a[e];break}}else for(var f=a.length-1;f>-1;f--)if(a[f].selector===b.selector){d=a[f];break}if(d===!1)a.push(b);else if("media"!==b.type)for(var g=0;g<b.rules.length;g++){var h=b.rules[g],i=this.findCorrespondingRule(d.rules,h.directive);i===!1?d.rules.push(h):"DELETED"==h.type?i.type="DELETED":i.value=h.value}else d.subStyles=b.subStyles},b.prototype.compactRules=function(a){for(var b=[],c=0;c<a.length;c++)"DELETED"!==a[c].type&&b.push(a[c]);return b},b.prototype.getCSSForEditor=function(a,b){void 0===b&&(b=0);var c="";void 0===a&&(a=this.css);for(var d=0;d<a.length;d++)"imports"==a[d].type&&(c+=a[d].styles+"\n\n");for(d=0;d<a.length;d++){var e=a[d];if(void 0!==e.selector){var f="";void 0!==e.comments&&(f=e.comments+"\n"),"media"==e.type?(c+=f+e.selector+"{\n",c+=this.getCSSForEditor(e.subStyles,b+1),c+="}\n\n"):"keyframes"!==e.type&&"imports"!==e.type&&(c+=this.getSpaces(b)+f+e.selector+" {\n",c+=this.getCSSOfRules(e.rules,b+1),c+=this.getSpaces(b)+"}\n\n")}}for(d=0;d<a.length;d++)"keyframes"==a[d].type&&(c+=a[d].styles+"\n\n");return c},b.prototype.getImports=function(a){for(var b=[],c=0;c<a.length;c++)"imports"==a[c].type&&b.push(a[c].styles);return b},b.prototype.getCSSOfRules=function(a,b){for(var c="",d=0;d<a.length;d++)void 0!==a[d]&&(c+=void 0===a[d].defective?this.getSpaces(b)+a[d].directive+" : "+a[d].value+";\n":this.getSpaces(b)+a[d].value+";\n");return c||"\n"},b.prototype.getSpaces=function(a){for(var b="",c=0;4*a>c;c++)b+=" ";return b},b.prototype.applyNamespacing=function(a,b){var c=a,d="."+this.cssPreviewNamespace;void 0!==b&&(d=b),"string"==typeof a&&(c=this.parseCSS(a));for(var e=0;e<c.length;e++){var f=c[e];if(!(f.selector.indexOf("@font-face")>-1||f.selector.indexOf("keyframes")>-1||f.selector.indexOf("@import")>-1||f.selector.indexOf(".form-all")>-1||f.selector.indexOf("#stage")>-1))if("media"!==f.type){for(var g=f.selector.split(","),h=[],i=0;i<g.length;i++)-1===g[i].indexOf(".supernova")?h.push(d+" "+g[i]):h.push(g[i]);f.selector=h.join(",")}else f.subStyles=this.applyNamespacing(f.subStyles,b)}return c},b.prototype.clearNamespacing=function(a,b){void 0===b&&(b=!1);var c=a,d="."+this.cssPreviewNamespace;"string"==typeof a&&(c=this.parseCSS(a));for(var e=0;e<c.length;e++){var f=c[e];if("media"!==f.type){for(var g=f.selector.split(","),h=[],i=0;i<g.length;i++)h.push(g[i].split(d+" ").join(""));f.selector=h.join(",")}else f.subStyles=this.clearNamespacing(f.subStyles,!0)}return b===!1?this.getCSSForEditor(c):c},b.prototype.createStyleElement=function(a,b,c){if(void 0===c&&(c=!1),this.testMode===!1&&"nonamespace"!==c&&(b=this.applyNamespacing(b)),"string"!=typeof b&&(b=this.getCSSForEditor(b)),c===!0&&(b=this.getCSSForEditor(this.parseCSS(b))),this.testMode!==!1)return this.testMode("create style #"+a,b);var d=document.getElementById(a);d&&d.parentNode.removeChild(d);var e=document.head||document.getElementsByTagName("head")[0],f=document.createElement("style");f.id=a,f.type="text/css",e.appendChild(f),f.styleSheet&&!f.sheet?f.styleSheet.cssText=b:f.appendChild(document.createTextNode(b))},a.cssjs=b}(this);