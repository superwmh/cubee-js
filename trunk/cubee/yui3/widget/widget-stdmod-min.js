/*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 3.0.0b1
build: 1163
*/
YUI.add("widget-stdmod",function(A){var D=A.Lang,O=A.Node,U=A.UA,C=A.Widget,B="",g="hd",e="bd",H="ft",b="header",i="body",h="footer",m="fillHeight",K="stdmod",p="px",R="Node",f="Content",k="innerHTML",a="firstChild",G="childNodes",S="contentBox",l="boundingBox",W="height",d="offsetHeight",V="auto",J="headerContentChange",Z="bodyContentChange",M="footerContentChange",P="fillHeightChange",Q="HeightChange",n="contentUpdate",T="renderUI",c="bindUI",E="syncUI";function o(L){this._stdModNode=this.get(S);A.after(this._renderUIStdMod,this,T);A.after(this._bindUIStdMod,this,c);A.after(this._syncUIStdMod,this,E);}o.HEADER=b;o.BODY=i;o.FOOTER=h;o.AFTER="after";o.BEFORE="before";o.REPLACE="replace";var I=o.HEADER,X=o.BODY,N=o.FOOTER,j=o.AFTER,F=o.BEFORE;o.ATTRS={headerContent:{getter:function(Y){var L=this._getStdModContent(I);return(L===null)?Y:L;}},footerContent:{getter:function(Y){var L=this._getStdModContent(N);return(L===null)?Y:L;}},bodyContent:{getter:function(Y){var L=this._getStdModContent(X);return(L===null)?Y:L;}},fillHeight:{value:o.BODY,validator:function(L){return this._validateFillHeight(L);}}};o.HTML_PARSER={headerContent:function(L){return this._parseStdModHTML(I);},bodyContent:function(L){return this._parseStdModHTML(X);},footerContent:function(L){return this._parseStdModHTML(N);}};o.SECTION_CLASS_NAMES={header:C.getClassName(g),body:C.getClassName(e),footer:C.getClassName(H)};o.TEMPLATES={header:'<div class="'+o.SECTION_CLASS_NAMES[I]+'"></div>',body:'<div class="'+o.SECTION_CLASS_NAMES[X]+'"></div>',footer:'<div class="'+o.SECTION_CLASS_NAMES[N]+'"></div>'};o._TEMPLATES={};o.prototype={_syncUIStdMod:function(){this._uiSetStdMod(I,this.get(I+f));this._uiSetStdMod(X,this.get(X+f));this._uiSetStdMod(N,this.get(N+f));this._uiSetFillHeight(this.get(m));},_renderUIStdMod:function(){this._stdModNode.addClass(C.getClassName(K));},_bindUIStdMod:function(){this.after(J,this._afterHeaderChange);this.after(Z,this._afterBodyChange);this.after(M,this._afterFooterChange);this.after(P,this._afterFillHeightChange);this.after(Q,this._fillHeight);this.after(n,this._fillHeight);},_afterHeaderChange:function(L){this._uiSetStdMod(I,L.newVal,L.stdModPosition);},_afterBodyChange:function(L){this._uiSetStdMod(X,L.newVal,L.stdModPosition);},_afterFooterChange:function(L){this._uiSetStdMod(N,L.newVal,L.stdModPosition);},_afterFillHeightChange:function(L){this._uiSetFillHeight(L.newVal);},_validateFillHeight:function(L){return !L||L==o.BODY||L==o.HEADER||L==o.FOOTER;},_uiSetFillHeight:function(q){var Y=this.getStdModNode(q);var L=this._currFillNode;if(L&&Y!==L){L.setStyle(W,B);}if(Y){this._currFillNode=Y;}this._fillHeight();},_fillHeight:function(){if(this.get(m)){var L=this.get(W);if(L!=B&&L!=V){this.fillHeight(this._currFillNode);}}},_uiSetStdMod:function(r,q,L){if(q){var Y=this.getStdModNode(r)||this._renderStdMod(r);if(q instanceof O){this._addNodeRef(Y,q,L);}else{this._addNodeHTML(Y,q,L);}this.fire(n);}},_renderStdMod:function(q){var L=this.get(S),Y=this._findStdModSection(q);if(!Y){Y=this._getStdModTemplate(q);}this._insertStdModSection(L,q,Y);this[q+R]=Y;return this[q+R];},_insertStdModSection:function(L,r,q){var Y=L.get(a);if(r===N||!Y){L.appendChild(q);}else{if(r===I){L.insertBefore(q,Y);}else{var s=this[N+R];if(s){L.insertBefore(q,s);}else{L.appendChild(q);}}}},_getStdModTemplate:function(Y){var L=o._TEMPLATES[Y];if(!L){o._TEMPLATES[Y]=L=O.create(o.TEMPLATES[Y]);}return L.cloneNode(true);},_addNodeHTML:function(q,Y,L){if(L==j){q.set(k,q.get(k)+Y);}else{if(L==F){q.set(k,Y+q.get(k));}else{q.set(k,Y);}}},_addNodeRef:function(u,r,Y){var L=true,q,t;if(Y==F){var v=u.get(a);if(v){if(r instanceof A.NodeList){for(q=r.size()-1;q>=0;--q){u.insertBefore(r.item(q),v);}}else{u.insertBefore(r,v);}L=false;}}else{if(Y!=j){u.set(k,B);}}if(L){if(r instanceof A.NodeList){for(q=0,t=r.size();q<t;++q){u.appendChild(r.item(q));}}else{u.appendChild(r);}}},_getPreciseHeight:function(q){var L=(q)?q.get(d):0,r="getBoundingClientRect";if(q&&q.hasMethod(r)){var Y=q.invoke(r);if(Y){L=Y.bottom-Y.top;}}return L;},_findStdModSection:function(L){return this.get(S).query("> ."+o.SECTION_CLASS_NAMES[L]);},_parseStdModHTML:function(Y){var L=this._findStdModSection(Y);return(L)?L.get(k):"";},_getStdModContent:function(L){return(this[L+R])?this[L+R].get(G):null;},setStdModContent:function(q,Y,L){this.set(q+f,Y,{stdModPosition:L});},getStdModNode:function(L){return this[L+R]||null;},fillHeight:function(q){if(q){var u=this.get(l),w=[this.headerNode,this.bodyNode,this.footerNode],Y,x=0,y=0,t=0,s=false;for(var v=0,r=w.length;v<r;v++){Y=w[v];if(Y){if(Y!==q){y+=this._getPreciseHeight(Y);}else{s=true;}}}if(s){if(U.ie||U.opera){q.setStyle(W,0+p);}x=parseInt(u.getComputedStyle(W),10);if(D.isNumber(x)){t=x-y;if(t>=0){q.setStyle(W,t+p);}var L=this.get(S).get(d);if(L!=x){t=t-(L-x);q.setStyle(W,t+p);}}}}}};A.WidgetStdMod=o;},"3.0.0b1",{requires:["widget"]});