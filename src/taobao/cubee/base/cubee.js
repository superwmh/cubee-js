/*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 3.0.0
build: 1549
*/
(function(){var I={},B=new Date().getTime(),A,E,H=function(){if(window.addEventListener){return function(M,L,K,J){M.addEventListener(L,K,(!!J));};}else{if(window.attachEvent){return function(L,K,J){L.attachEvent("on"+K,J);};}else{return function(){};}}}(),F=function(){if(window.removeEventListener){return function(M,L,K,J){M.removeEventListener(L,K,!!J);};}else{if(window.detachEvent){return function(L,K,J){L.detachEvent("on"+K,J);};}else{return function(){};}}}(),D=function(){YUI.Env.windowLoaded=true;YUI.Env.DOMReady=true;F(window,"load",D);},C={"io.xdrReady":1,"io.xdrResponse":1},G=Array.prototype.slice;if(typeof YUI==="undefined"||!YUI){YUI=function(O,N,M,L,J){var K=this,R=arguments,Q,P=R.length;if(!(K instanceof YUI)){return new YUI(O,N,M,L,J);}else{K._init();for(Q=0;Q<P;Q++){K._config(R[Q]);}K._setup();return K;}};}YUI.prototype={_config:function(N){N=N||{};var O=this.config,L,K,J,M;M=O.modules;for(L in N){if(M&&L=="modules"){J=N[L];for(K in J){if(J.hasOwnProperty(K)){M[K]=J[K];}}}else{if(L=="win"){O[L]=N[L].contentWindow||N[L];O.doc=O[L].document;}else{O[L]=N[L];}}}},_init:function(){var J="3.0.0",K=this;if(J.indexOf("@")>-1){J="test";}K.version=J;K.Env={mods:{},cdn:"http://yui.yahooapis.com/"+J+"/build/",bootstrapped:false,_idx:0,_used:{},_attached:{},_yidx:0,_uidx:0,_loaded:{}};K.Env._loaded[J]={};if(YUI.Env){K.Env._yidx=(++YUI.Env._yidx);K.Env._guidp=("yui_"+J+"-"+K.Env._yidx+"-"+B).replace(/\./g,"_");K.id=K.stamp(K);I[K.id]=K;}K.constructor=YUI;K.config={win:window||{},doc:document,debug:true,useBrowserConsole:true,throwFail:true,bootstrap:true,fetchCSS:true,base:function(){var L,M,O,N;M=document.getElementsByTagName("script");for(O=0;O<M.length;O=O+1){N=M[O].src.match(/^(.*)yui\/yui[\.\-].*js(\?.*)?$/);L=N&&N[1];if(L){break;}}return L||K.Env.cdn;}(),loaderPath:"loader/loader-min.js"};},_setup:function(J){this.use("yui-base");},applyTo:function(P,O,L){if(!(O in C)){this.log(O+": applyTo not allowed","warn","yui");return null;}var K=I[P],N,J,M;if(K){N=O.split(".");J=K;for(M=0;M<N.length;M=M+1){J=J[N[M]];if(!J){this.log("applyTo not found: "+O,"warn","yui");}}return J.apply(K,L);}return null;},add:function(K,M,J,L){YUI.Env.mods[K]={name:K,fn:M,version:J,details:L||{}};return this;},_attach:function(K,O){var T=YUI.Env.mods,L=this.Env._attached,Q,P=K.length,M,N,R,S,J;for(Q=0;Q<P;Q=Q+1){M=K[Q];N=T[M];if(!L[M]&&N){L[M]=true;R=N.details;S=R.requires;J=R.use;if(S){this._attach(this.Array(S));}if(N.fn){N.fn(this);}if(J){this._attach(this.Array(J));}}}},use:function(){if(this._loading){this._useQueue=this._useQueue||new this.Queue();this._useQueue.add(G.call(arguments,0));return this;}var K=this,U=G.call(arguments,0),Z=YUI.Env.mods,b=K.Env._used,V,O=U[0],M=false,X=U[U.length-1],W=K.config.bootstrap,P,R,N,Q=[],J=[],S=K.config.fetchCSS,T=function(d){if(b[d]){return;}var Y=Z[d],c,e,a;if(Y){b[d]=true;e=Y.details.requires;a=Y.details.use;}else{if(!YUI.Env._loaded[K.version][d]){Q.push(d);}else{b[d]=true;}}if(e){if(K.Lang.isString(e)){T(e);}else{for(c=0;c<e.length;c=c+1){T(e[c]);}}}J.push(d);},L;if(typeof X==="function"){U.pop();}else{X=null;}L=function(Y){Y=Y||{success:true,msg:"not dynamic"};if(X){X(K,Y);}if(K.fire){K.fire("yui:load",K,Y);}K._loading=false;if(K._useQueue&&K._useQueue.size()&&!K._loading){K.use.apply(K,K._useQueue.next());}};if(O==="*"){U=[];for(P in Z){if(Z.hasOwnProperty(P)){U.push(P);}}if(X){U.push(X);}return K.use.apply(K,U);}if(K.Loader){M=true;V=new K.Loader(K.config);V.require(U);V.ignoreRegistered=true;V.allowRollup=false;V.calculate(null,(S)?null:"js");U=V.sorted;}N=U.length;for(R=0;R<N;R=R+1){T(U[R]);}N=Q.length;if(N){Q=K.Object.keys(K.Array.hash(Q));}if(W&&N&&K.Loader){K._loading=true;V=new K.Loader(K.config);V.onSuccess=L;V.onFailure=L;V.onTimeout=L;V.context=K;V.attaching=U;V.require((S)?Q:U);V.insert(null,(S)?null:"js");}else{if(W&&N&&K.Get&&!K.Env.bootstrapped){K._loading=true;U=K.Array(arguments,0,true);K.Get.script('http://a.tbcdn.cn/app/dp/eb/js/cubee/base/loader-min.js',{onEnd:function(){K._loading=false;K.Env.bootstrapped=true;K._attach(["loader"]);K.use.apply(K,U);}});return K;}else{if(N){}K._attach(J);L();}}return K;},namespace:function(){var J=arguments,N=null,L,K,M;for(L=0;L<J.length;L=L+1){M=(""+J[L]).split(".");N=this;for(K=(M[0]=="YAHOO")?1:0;K<M.length;K=K+1){N[M[K]]=N[M[K]]||{};N=N[M[K]];}}return N;},log:function(){},error:function(K,J){if(this.config.throwFail){throw (J||new Error(K));}else{this.message(K,"error");}return this;},guid:function(J){var K=this.Env._guidp+(++this.Env._uidx);return(J)?(J+K):K;},stamp:function(L,M){if(!L){return L;}var J=(typeof L==="string")?L:L._yuid;if(!J){J=this.guid();if(!M){try{L._yuid=J;}catch(K){J=null;}}}return J;}};A=YUI.prototype;for(E in A){YUI[E]=A[E];}YUI._init();H(window,"load",D);YUI.Env.add=H;YUI.Env.remove=F;})();YUI.add("yui-base",function(B){function A(){this._init();this.add.apply(this,arguments);}A.prototype={_init:function(){this._q=[];},next:function(){return this._q.shift();},add:function(){B.Array.each(B.Array(arguments,0,true),function(C){this._q.push(C);},this);return this;},size:function(){return this._q.length;}};B.Queue=A;(function(){B.Lang=B.Lang||{};var R=B.Lang,G="array",I="boolean",D="date",M="error",S="function",H="number",K="null",F="object",O="regexp",N="string",C=Object.prototype.toString,P="undefined",E={"undefined":P,"number":H,"boolean":I,"string":N,"[object Function]":S,"[object RegExp]":O,"[object Array]":G,"[object Date]":D,"[object Error]":M},J=/^\s+|\s+$/g,Q="";R.isArray=function(L){return R.type(L)===G;};R.isBoolean=function(L){return typeof L===I;};R.isFunction=function(L){return R.type(L)===S;};R.isDate=function(L){return R.type(L)===D;};R.isNull=function(L){return L===null;};R.isNumber=function(L){return typeof L===H&&isFinite(L);};R.isObject=function(T,L){return(T&&(typeof T===F||(!L&&R.isFunction(T))))||false;};R.isString=function(L){return typeof L===N;};R.isUndefined=function(L){return typeof L===P;};R.trim=function(L){try{return L.replace(J,Q);}catch(T){return L;}};R.isValue=function(T){var L=R.type(T);
switch(L){case H:return isFinite(T);case K:case P:return false;default:return !!(L);}};R.type=function(L){return E[typeof L]||E[C.call(L)]||(L?F:K);};})();(function(){var C=B.Lang,D=Array.prototype,E=function(M,J,L){var I=(L)?2:B.Array.test(M),H,G,F;if(I){try{return D.slice.call(M,J||0);}catch(K){F=[];for(H=0,G=M.length;H<G;H=H+1){F.push(M[H]);}return F;}}else{return[M];}};B.Array=E;E.test=function(H){var F=0;if(C.isObject(H)){if(C.isArray(H)){F=1;}else{try{if("length" in H&&!("tagName" in H)&&!("alert" in H)&&(!B.Lang.isFunction(H.size)||H.size()>1)){F=2;}}catch(G){}}}return F;};E.each=(D.forEach)?function(F,G,H){D.forEach.call(F||[],G,H||B);return B;}:function(G,I,J){var F=(G&&G.length)||0,H;for(H=0;H<F;H=H+1){I.call(J||B,G[H],H,G);}return B;};E.hash=function(H,G){var K={},F=H.length,J=G&&G.length,I;for(I=0;I<F;I=I+1){K[H[I]]=(J&&J>I)?G[I]:true;}return K;};E.indexOf=(D.indexOf)?function(F,G){return D.indexOf.call(F,G);}:function(F,H){for(var G=0;G<F.length;G=G+1){if(F[G]===H){return G;}}return -1;};E.numericSort=function(G,F){return(G-F);};E.some=(D.some)?function(F,G,H){return D.some.call(F,G,H);}:function(G,I,J){var F=G.length,H;for(H=0;H<F;H=H+1){if(I.call(J,G[H],H,G)){return true;}}return false;};})();(function(){var D=B.Lang,C="__",E=function(H,G){var F=G.toString;if(D.isFunction(F)&&F!=Object.prototype.toString){H.toString=F;}};B.merge=function(){var G=arguments,I={},H,F=G.length;for(H=0;H<F;H=H+1){B.mix(I,G[H],true);}return I;};B.mix=function(F,O,H,N,L,M){if(!O||!F){return F||B;}if(L){switch(L){case 1:return B.mix(F.prototype,O.prototype,H,N,0,M);case 2:B.mix(F.prototype,O.prototype,H,N,0,M);break;case 3:return B.mix(F,O.prototype,H,N,0,M);case 4:return B.mix(F.prototype,O,H,N,0,M);default:}}var K=M&&D.isArray(F),J,I,G;if(N&&N.length){for(J=0,I=N.length;J<I;++J){G=N[J];if(G in O){if(M&&D.isObject(F[G],true)){B.mix(F[G],O[G]);}else{if(!K&&(H||!(G in F))){F[G]=O[G];}else{if(K){F.push(O[G]);}}}}}}else{for(J in O){if(M&&D.isObject(F[J],true)){B.mix(F[J],O[J]);}else{if(!K&&(H||!(J in F))){F[J]=O[J];}else{if(K){F.push(O[J]);}}}}if(B.UA.ie){E(F,O);}}return F;};B.cached=function(H,F,G){F=F||{};return function(L,K){var J=(K)?Array.prototype.join.call(arguments,C):L,I=F[J];if(!(J in F)||(G&&F[J]==G)){F[J]=H.apply(H,arguments);}return F[J];};};})();(function(){B.Object=function(H){var G=function(){};G.prototype=H;return new G();};var E=B.Object,D=undefined,C=function(J,I){var H=(I===2),F=(H)?0:[],G;for(G in J){if(H){F++;}else{if(J.hasOwnProperty(G)){F.push((I)?J[G]:G);}}}return F;};E.keys=function(F){return C(F);};E.values=function(F){return C(F,1);};E.size=function(F){return C(F,2);};E.hasKey=function(G,F){return(F in G);};E.hasValue=function(G,F){return(B.Array.indexOf(E.values(G),F)>-1);};E.owns=function(G,F){return(G.hasOwnProperty(F));};E.each=function(J,I,K,H){var G=K||B,F;for(F in J){if(H||J.hasOwnProperty(F)){I.call(G,J[F],F,J);}}return B;};E.getValue=function(J,I){var H=B.Array(I),F=H.length,G;for(G=0;J!==D&&G<F;G=G+1){J=J[H[G]];}return J;};E.setValue=function(L,J,K){var I=B.Array(J),H=I.length-1,F,G=L;if(H>=0){for(F=0;G!==D&&F<H;F=F+1){G=G[I[F]];}if(G!==D){G[I[F]]=K;}else{return D;}}return L;};})();B.UA=function(){var F=function(J){var K=0;return parseFloat(J.replace(/\./g,function(){return(K++==1)?"":".";}));},I=navigator,H={ie:0,opera:0,gecko:0,webkit:0,mobile:null,air:0,caja:I.cajaVersion,secure:false,os:null},E=I&&I.userAgent,G=B.config.win.location,D=G&&G.href,C;H.secure=D&&(D.toLowerCase().indexOf("https")===0);if(E){if((/windows|win32/i).test(E)){H.os="windows";}else{if((/macintosh/i).test(E)){H.os="macintosh";}}if((/KHTML/).test(E)){H.webkit=1;}C=E.match(/AppleWebKit\/([^\s]*)/);if(C&&C[1]){H.webkit=F(C[1]);if(/ Mobile\//.test(E)){H.mobile="Apple";}else{C=E.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/);if(C){H.mobile=C[0];}}C=E.match(/AdobeAIR\/([^\s]*)/);if(C){H.air=C[0];}}if(!H.webkit){C=E.match(/Opera[\s\/]([^\s]*)/);if(C&&C[1]){H.opera=F(C[1]);C=E.match(/Opera Mini[^;]*/);if(C){H.mobile=C[0];}}else{C=E.match(/MSIE\s([^;]*)/);if(C&&C[1]){H.ie=F(C[1]);}else{C=E.match(/Gecko\/([^\s]*)/);if(C){H.gecko=1;C=E.match(/rv:([^\s\)]*)/);if(C&&C[1]){H.gecko=F(C[1]);}}}}}}return H;}();(function(){var F=["yui-base"],D,I=B.config,H=YUI.Env.mods,G,E;B.use.apply(B,F);if(I.core){D=I.core;}else{D=[];G=["get","loader","yui-log","yui-later"];for(E=0;E<G.length;E++){if(H[G[E]]){D.push(G[E]);}}}B.use.apply(B,D);})();},"3.0.0");YUI.add("get",function(A){(function(){var C=A.UA,B=A.Lang,E="text/javascript",F="text/css",D="stylesheet";A.Get=function(){var M={},K=0,U=false,W=function(a,X,b){var Y=b||A.config.win,c=Y.document,e=c.createElement(a),Z;for(Z in X){if(X[Z]&&X.hasOwnProperty(Z)){e.setAttribute(Z,X[Z]);}}return e;},T=function(Y,Z,X){var a={id:A.guid(),type:F,rel:D,href:Y};if(X){A.mix(a,X);}return W("link",a,Z);},S=function(Y,Z,X){var a={id:A.guid(),type:E,src:Y};if(X){A.mix(a,X);}return W("script",a,Z);},N=function(c){var X=M[c],Y,a,g,e,j,b,Z,f;if(X){Y=X.nodes;a=Y.length;g=X.win.document;e=g.getElementsByTagName("head")[0];if(X.insertBefore){j=L(X.insertBefore,c);if(j){e=j.parentNode;}}for(b=0;b<a;b=b+1){Z=Y[b];if(Z.clearAttributes){Z.clearAttributes();}else{for(f in Z){delete Z[f];}}e.removeChild(Z);}}X.nodes=[];},P=function(Y,Z,X){return{tId:Y.tId,win:Y.win,data:Y.data,nodes:Y.nodes,msg:Z,statusText:X,purge:function(){N(this.tId);}};},O=function(b,a,X){var Y=M[b],Z;if(Y&&Y.onEnd){Z=Y.context||Y;Y.onEnd.call(Z,P(Y,a,X));}},V=function(a,Z){var X=M[a],Y;if(X.timer){clearTimeout(X.timer);}if(X.onFailure){Y=X.context||X;X.onFailure.call(Y,P(X,Z));}O(a,Z,"failure");},L=function(X,a){var Y=M[a],Z=(B.isString(X))?Y.win.document.getElementById(X):X;if(!Z){V(a,"target node not found: "+X);}return Z;},I=function(a){var X=M[a],Z,Y;if(X.timer){clearTimeout(X.timer);}X.finished=true;if(X.aborted){Z="transaction "+a+" was aborted";V(a,Z);return;}if(X.onSuccess){Y=X.context||X;X.onSuccess.call(Y,P(X));}O(a,Z,"OK");},Q=function(Z){var X=M[Z],Y;if(X.onTimeout){Y=X.context||X;X.onTimeout.call(Y,P(X));
}O(Z,"timeout","timeout");},H=function(Z,c){var Y=M[Z],b,g,f,e,a,X,i;if(Y.timer){clearTimeout(Y.timer);}if(Y.aborted){b="transaction "+Z+" was aborted";V(Z,b);return;}if(c){Y.url.shift();if(Y.varName){Y.varName.shift();}}else{Y.url=(B.isString(Y.url))?[Y.url]:Y.url;if(Y.varName){Y.varName=(B.isString(Y.varName))?[Y.varName]:Y.varName;}}g=Y.win;f=g.document;e=f.getElementsByTagName("head")[0];if(Y.url.length===0){I(Z);return;}X=Y.url[0];if(!X){Y.url.shift();return H(Z);}if(Y.timeout){Y.timer=setTimeout(function(){Q(Z);},Y.timeout);}if(Y.type==="script"){a=S(X,g,Y.attributes);}else{a=T(X,g,Y.attributes);}J(Y.type,a,Z,X,g,Y.url.length);Y.nodes.push(a);if(Y.insertBefore){i=L(Y.insertBefore,Z);if(i){i.parentNode.insertBefore(a,i);}}else{e.appendChild(a);}if((C.webkit||C.gecko)&&Y.type==="css"){H(Z,X);}},G=function(){if(U){return;}U=true;var X,Y;for(X in M){if(M.hasOwnProperty(X)){Y=M[X];if(Y.autopurge&&Y.finished){N(Y.tId);delete M[X];}}}U=false;},R=function(Y,X,Z){Z=Z||{};var c="q"+(K++),a,b=Z.purgethreshold||A.Get.PURGE_THRESH;if(K%b===0){G();}M[c]=A.merge(Z,{tId:c,type:Y,url:X,finished:false,nodes:[]});a=M[c];a.win=a.win||A.config.win;a.context=a.context||a;a.autopurge=("autopurge" in a)?a.autopurge:(Y==="script")?true:false;if(Z.charset){a.attributes=a.attributes||{};a.attributes.charset=Z.charset;}setTimeout(function(){H(c);},0);return{tId:c};},J=function(Z,e,d,Y,c,b,X){var a=X||H;if(C.ie){e.onreadystatechange=function(){var f=this.readyState;if("loaded"===f||"complete"===f){e.onreadystatechange=null;a(d,Y);}};}else{if(C.webkit){if(Z==="script"){e.addEventListener("load",function(){a(d,Y);});}}else{e.onload=function(){a(d,Y);};e.onerror=function(f){V(d,f+": "+Y);};}}};return{PURGE_THRESH:20,_finalize:function(X){setTimeout(function(){I(X);},0);},abort:function(Y){var Z=(B.isString(Y))?Y:Y.tId,X=M[Z];if(X){X.aborted=true;}},script:function(X,Y){return R("script",X,Y);},css:function(X,Y){return R("css",X,Y);}};}();})();},"3.0.0");YUI.add("yui-log",function(A){(function(){var D=A,F="yui:log",B="undefined",C={debug:1,info:1,warn:1,error:1},E;D.log=function(I,Q,G,O){var H=D,P=H.config,K=false,N,L,J,M;if(P.debug){if(G){N=P.logExclude;L=P.logInclude;if(L&&!(G in L)){K=1;}else{if(N&&(G in N)){K=1;}}}if(!K){if(P.useBrowserConsole){J=(G)?G+": "+I:I;if(typeof console!=B&&console.log){M=(Q&&console[Q]&&(Q in C))?Q:"log";console[M](J);}else{if(typeof opera!=B){opera.postError(J);}}}if(H.fire&&!O){if(!E){H.publish(F,{broadcast:2,emitFacade:1});E=1;}H.fire(F,{msg:I,cat:Q,src:G});}}}return H;};D.message=function(){return D.log.apply(D,arguments);};})();},"3.0.0",{requires:["yui-base"]});YUI.add("yui-later",function(A){(function(){var B=A.Lang,C=function(K,E,L,G,H){K=K||0;E=E||{};var F=L,J=A.Array(G),I,D;if(B.isString(L)){F=E[L];}if(!F){}I=function(){F.apply(E,J);};D=(H)?setInterval(I,K):setTimeout(I,K);return{id:D,interval:H,cancel:function(){if(this.interval){clearInterval(D);}else{clearTimeout(D);}}};};A.later=C;B.later=C;})();},"3.0.0",{requires:["yui-base"]});YUI.add("yui",function(A){},"3.0.0",{use:["yui-base","get","yui-log","yui-later"]});

//==================================cubee.js=====================================
/*
  Copyright (c):	2009, ued@Taobao All rights reserved.
  Filename:			t-cubee.js
  FrameworkName:	Cubee
  Infomation:		cubee对yui3的封装
  YUI version: 		3.0.0b1
  Build: 			trunk
  Created:			08/28/2009
  Author:			Jay Li (Engineer), jay.li@alibaba-inc.com
  Company:			Taobao
  
*/

//get param from htmlpage
var scripts = document.getElementsByTagName("script");
eval(scripts[ scripts.length - 1 ].innerHTML);


/** 
 * 对yui3的namespace的hack，yui3的namespace存在严重bug 
 * @param { string } o[必填] 参数同yui.namespace的参数 
 */  
YUI.namespace = YUI.prototype.namespace = function() {
	var a=arguments, o=null, i, j, d;
	for (i=0; i<a.length; i=i+1) {
		d = ("" + a[i]).split(".");
		o = this;
		for (j=(d[0] == "YAHOO") ? 1 : 0; j<d.length; j=j+1) {
			o[d[j]] = o[d[j]] || {};
			//added by jay
			try{var _o=(_o?(_o[d[j]]=_o[d[j]]||{}):(eval(d[j]+"="+d[j]+"||{}")))}catch(e){_o=eval(d[j]+"={}")}
			o = o[d[j]];
		}
	}
	return o;
};

/** 
 * 注册浏览器的DOMContentLoaded事件 
 * @param { function } onready [必填]在DOMContentLoaded事件触发时需要执行的函数 
 * @param { object } config [可选]配置项 
 */  
var onDOMContentLoaded = function(onready,config){  
	var Browser = YUI().UA;
     this.conf = {enableMozDOMReady:true};  
     if( config )  
     for( var p in config)  
         this.conf[p] = config[p];  
   
     var isReady = false;  
     function doReady(){  
         if( isReady ) return;  
         isReady = true;  
         onready();  
     }  
     /*IE*/  
     if( Browser.ie ){  
		if (self !== self.top) {
			document.onreadystatechange = function() {
				if (document.readyState == 'complete') {
					document.onreadystatechange = null;
					doReady();
				}
			};
		} else {
			(function(){  
				if ( isReady ) return;  
				try {  
					document.documentElement.doScroll("left");  
				} catch( error ) {  
					setTimeout( arguments.callee, 0 );  
					return;  
				}  
				doReady();  
			})();  

		}//else over
		window.attachEvent('onload',doReady);  

     }  
     /*Webkit*/  
     else if (Browser.webkit && Browser.version < 525){  
         (function(){  
             if( isReady ) return;  
             if (/loaded|complete/.test(document.readyState))  
                 doReady();  
             else  
                 setTimeout( arguments.callee, 0 );  
         })();  
         window.addEventListener('load',doReady,false);  
     }  
     /*FF Opera 高版webkit 其他*/  
     else{  
         if( !Browser.ff || Browser.version != 2 || this.conf.enableMozDOMReady)  
             document.addEventListener( "DOMContentLoaded", function(){  
                 document.removeEventListener( "DOMContentLoaded", arguments.callee, false );  
                 doReady();  
             }, false );  
         window.addEventListener('load',doReady,false);  
     }  
 };  

//开始包装yui3

var cubeeBase = cubeeBase || 'http://taobao-wd.ns1.name/jayli/cubee/cubee/';

/**
 * Cubee构造器,用于构造一个cubee对象
 * @class Cubee
 * @constructor Cubee
 */	
var Cubee = Cubee || function(){
	this.init.apply(this, arguments);
};

Cubee._INFO = cubeeInfo || {
	fullpath:cubeeBase+'cubee-info.js',
	requires:[]
};
Cubee._GM = {};//global Modules
Cubee._GR = [];//global Requires
Cubee._AGR = [];//all global Requires
Cubee.prototype = {
	init:function(){
		//构造Cubee
		this.modules = Cubee._GM;
		this.addedMojo = [];
		this.requiredMojo = Cubee._GR;
		this.allRequiredMojo = Cubee._AGR;
		this.cubeeInfo = Cubee._INFO;//cubeeinfo模块的定义
		this.start = new Function;
		this.addmodule = this.addmojo;
	},
	/**
	 * 添加一个模块的声明
	 * @param { object } 要添加模块的格式化对象，和yui3的添加模块格式一致
	 * @method addmojo 或者 addmodule
	 * @member Cubee
	 */	
	addmojo:function(modules){
		var fd = this;
		for(var i in modules){
			fd.modules[i] = modules[i];
			fd.addedMojo.push(i);
		}
		fd.modules.info = fd.modules.Cubee || fd.cubeeInfo;//cubeeinfo
		fd.addedMojo = fd.distinct(fd.addedMojo);
		return fd;
	},
	/**
	 * 模块添加完毕的成功回调
	 * @param { function } 回调函数
	 * @method onReady
	 * @member Cubee
	 */	
	onReady:function(foo){
		var fd = this;
		fd.start = foo;
		return this;
	},
	/**
	 * 模块添加完毕的失败回调
	 * @param { function } 回调函数
	 * @method onReady
	 * @member Cubee
	 */	
	onFailure:function(o){},
	configure:function(o){},
	/**
	 * 添加对定义好的模块的引用
	 * @param { string } 要引用的模块的名字，如果要引用改逻辑下辖所有的模块，使用"*" 
	 * @method require
	 * @member Cubee
	 */	
	require:function(){
		var fd = this;
		fd.requiredMojo = fd.requiredMojo || [];
		if(arguments[0] == '*'){
			//debugger;
			for(var i = 0;i<fd.addedMojo.length;i++){
				fd.requiredMojo.push(fd.addedMojo[i]);
			}
		}else{
			for(var i = 0;i<arguments.length;i++){
				fd.requiredMojo.push(arguments[i]);
			}
		}
		fd.requiredMojo = fd.distinct(fd.requiredMojo);
		fd.modules.info.requires = fd.requiredMojo;
		return fd;
	},
	/** 
	 * 给数组去重
	 * @method  distinct  
	 * @param { array } 需要执行去重操作的数组
	 * @return { array } 返回去重后的数组
	 * @member Cubee
	 */  
	distinct:function(A){
		if((typeof A).toLowerCase() != 'array')return A;
		var a=[],b=[];
		for(var prop in A){
			var d = A[prop];
			if (d===a[prop]) continue; //防止循环到prototype
			if (b[d]!=1){
				a.push(d);
				b[d]=1;
			}
		}
		return a;
	},
	/**
	* 判断数值是否存在数组中
	* @param { value } v : 要匹配的数值
	* @param { array } a : 存在的数组
	* @member Cubee
	*/
	inArray : function(v, a){
		var o = false;
		for(var i=0,m=a.length; i<m; i++){
			if(a[i] == v){
				o = true;
				break;
			}
		}
		return o;
	}
};

//Cubee over

//======================t-global.js==========================
var T = T || YUI();
var yuiCfg = yuiCfg || {};
var TBloader = new Cubee();

onDOMContentLoaded(function(){
	T.mix(yuiCfg,{modules:TBloader.modules});
	YUI(yuiCfg).use('info',function(Y){
		Y.mix(T,Y);
		TBloader.start.apply(this,arguments);
	});
});

YUI.namespace('T.J');

