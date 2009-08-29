/*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 3.0.0b1
build: 1163
*/
YUI.add("loader",function(A){(function(){YUI.Env._loaderQueue=YUI.Env._loaderQueue||new A.Queue();var o=YUI.Env,v,h="base",S="css",u="js",J="cssreset",Q="cssfonts",w="cssgrids",B="cssbase",I=[J,Q,w,"cssreset-context","cssfonts-context","cssgrids-context"],U=["reset","fonts","grids",h],V=A.version,p=V+"/build/",Y="-context",d="anim-base",r="dd-drag",c="dom",D="dataschema-base",l="datasource-local",e="dom-base",K="dom-style",G="dump",T="get",E="event",j="event-custom",m="io-base",t="node",R="node-base",P="oop",F="selector-css2",g="substitute",O="widget",H="widget-position",n="yui-base",a="plugin",Z={version:V,root:p,base:"http://yui.yahooapis.com/"+p,comboBase:"http://yui.yahooapis.com/combo?",skin:{defaultSkin:"sam",base:"assets/skins/",path:"skin.css",after:I},modules:{dom:{requires:[P],submodules:{"dom-base":{requires:[P]},"dom-style":{requires:[e]},"dom-screen":{requires:[e,K]},"selector-native":{requires:[e]},"selector-css2":{requires:["selector-native"]},"selector":{requires:[e]}},plugins:{"selector-css3":{requires:[F]}}},node:{requires:[c,h],expound:E,submodules:{"node-base":{requires:[e,h,F]},"node-style":{requires:[K,R]},"node-screen":{requires:["dom-screen",R]}},plugins:{"node-event-simulate":{requires:[R,"event-simulate"]}}},anim:{requires:[h,t],submodules:{"anim-base":{requires:[h,"node-style"]},"anim-color":{requires:[d]},"anim-curve":{requires:["anim-xy"]},"anim-easing":{requires:[d]},"anim-scroll":{requires:[d]},"anim-xy":{requires:[d,"node-screen"]},"anim-node-plugin":{requires:[t,d]}}},attribute:{requires:[j]},base:{submodules:{"base-base":{requires:["attribute"]},"base-build":{requires:["base-base"]}}},cache:{requires:[a]},compat:{requires:[t,G,g]},classnamemanager:{requires:[n]},collection:{requires:[P]},console:{requires:[O,g],skinnable:true,plugins:{"console-filters":{requires:[a],skinnable:true}}},cookie:{requires:[n]},dataschema:{submodules:{"dataschema-base":{requires:[h]},"dataschema-array":{requires:[D]},"dataschema-json":{requires:[D,"json"]},"dataschema-text":{requires:[D]},"dataschema-xml":{requires:[D]}}},datasource:{submodules:{"datasource-local":{requires:[h]},"datasource-arrayschema":{requires:[l,a,"dataschema-array"]},"datasource-cache":{requires:[l,"cache"]},"datasource-function":{requires:[l]},"datasource-jsonschema":{requires:[l,a,"dataschema-json"]},"datasource-polling":{requires:[l]},"datasource-get":{requires:[l,T]},"datasource-textschema":{requires:[l,a,"dataschema-text"]},"datasource-io":{requires:[l,m]},"datasource-xmlschema":{requires:[l,a,"dataschema-xml"]}}},datatype:{submodules:{"datatype-date":{requires:[n]},"datatype-number":{requires:[n]},"datatype-xml":{requires:[n]}}},dd:{submodules:{"dd-ddm-base":{requires:[t,h]},"dd-ddm":{requires:["dd-ddm-base"]},"dd-ddm-drop":{requires:["dd-ddm"]},"dd-drag":{requires:["dd-ddm-base"]},"dd-drop":{requires:["dd-ddm-drop"]},"dd-proxy":{requires:[r]},"dd-constrain":{requires:[r]},"dd-scroll":{requires:[r]},"dd-plugin":{requires:[r],optional:["dd-constrain","dd-proxy"]},"dd-drop-plugin":{requires:["dd-drop"]}}},dump:{requires:[n]},event:{requires:[j,t]},"event-custom":{requires:[P]},"event-simulate":{requires:[E]},"node-focusmanager":{requires:[t,a]},get:{requires:[n]},history:{requires:[t]},imageloader:{requires:[t]},io:{submodules:{"io-base":{requires:[j]},"io-xdr":{requires:[m]},"io-form":{requires:[m,t]},"io-upload-iframe":{requires:[m,t]},"io-queue":{requires:[m,"queue-promote"]}}},json:{submodules:{"json-parse":{requires:[n]},"json-stringify":{requires:[n]}}},loader:{requires:[T]},"node-menunav":{requires:[t,"classnamemanager",a,"node-focusmanager"],skinnable:true},oop:{requires:[n]},overlay:{requires:[O,H,"widget-position-ext","widget-stack","widget-stdmod"],skinnable:true},plugin:{requires:[h]},profiler:{requires:[n]},queue:{submodules:{"queue-base":{requires:[n]},"queue-run":{requires:["queue-base",j]}},plugins:{"queue-promote":{}}},slider:{requires:[O,"dd-constrain"],skinnable:true},stylesheet:{requires:[n]},substitute:{optional:[G]},widget:{requires:[h,t,"classnamemanager"],plugins:{"widget-position":{},"widget-position-ext":{requires:[H]},"widget-stack":{skinnable:true},"widget-stdmod":{}},skinnable:true},yui:{supersedes:[n,T,"loader","queue-base"]},"yui-base":{},test:{requires:[g,t,"json","event-simulate"]}}},k=function(L,i,x){return L+"/"+i+"-min."+(x||S);},N=YUI.Env._loaderQueue,C=Z.modules,q,X,W,s,M=A.Lang,f="_provides",b="_supersedes";for(q=0;q<U.length;q=q+1){X=U[q];W=S+X;C[W]={type:S,path:k(W,X)};s=W+Y;X=X+Y;C[s]={type:S,path:k(W,X)};if(W==w){C[W].requires=[Q];C[W].optional=[J];C[s].requires=[Q+Y];C[s].optional=[J+Y];}else{if(W==B){C[W].after=I;C[s].after=I;}}}A.Env.meta=Z;v=o._loaded;A.Loader=function(y){this._internalCallback=null;this._useYahooListener=false;this.onSuccess=null;this.onFailure=null;this.onCSS=null;this.onProgress=null;this.onTimeout=null;this.context=A;this.data=null;this.insertBefore=null;this.charset=null;this.cssAttributes=null;this.jsAttributes=null;this.base=A.Env.meta.base;this.comboBase=A.Env.meta.comboBase;this.combine=(!(h in y));this.ignoreRegistered=false;this.root=A.Env.meta.root;this.timeout=0;this.ignore=null;this.force=null;this.forceMap={};this.allowRollup=true;this.filter=null;this.filters={};this.required={};this.moduleInfo={};this.skin=A.merge(A.Env.meta.skin);var x=A.Env.meta.modules,L;for(L in x){if(x.hasOwnProperty(L)){this._internal=true;this.addModule(x[L],L);this._internal=false;}}this.rollups=null;this.loadOptional=false;this.sorted=[];this.loaded=v[V];this.attaching=null;this.dirty=true;this.inserted={};this.skipped={};this._config(y);};A.Loader.prototype={FILTER_DEFS:{RAW:{"searchExp":"-min\\.js","replaceStr":".js"},DEBUG:{"searchExp":"-min\\.js","replaceStr":"-debug.js"}},SKIN_PREFIX:"skin-",_config:function(AA){var x,L,z,y;if(AA){for(x in AA){if(AA.hasOwnProperty(x)){z=AA[x];if(x=="require"){this.require(z);}else{if(x=="modules"){for(L in z){if(z.hasOwnProperty(L)){this.addModule(z[L],L);}}}else{this[x]=z;}}}}}y=this.filter;if(M.isString(y)){y=y.toUpperCase();
this.filterName=y;this.filter=this.FILTER_DEFS[y];}},formatSkin:function(x,L){var i=this.SKIN_PREFIX+x;if(L){i=i+"-"+L;}return i;},_addSkin:function(AD,AB,AC){var L=this.formatSkin(AD),y=this.moduleInfo,i=this.skin,x=y[AB]&&y[AB].ext,AA,z;if(AB){L=this.formatSkin(AD,AB);if(!y[L]){AA=y[AB];z=AA.pkg||AB;this.addModule({"name":L,"type":"css","after":i.after,"path":(AC||z)+"/"+i.base+AD+"/"+AB+".css","ext":x});}}return L;},addModule:function(y,x){x=x||y.name;y.name=x;if(!y||!y.name){return false;}if(!y.type){y.type=u;}if(!y.path&&!y.fullpath){y.path=k(x,x,y.type);}y.ext=("ext" in y)?y.ext:(this._internal)?false:true;y.requires=y.requires||[];this.moduleInfo[x]=y;var AB=y.submodules,AC,z,AD,AF,AE,AA,L;if(AB){AD=[];z=0;for(AC in AB){if(AB.hasOwnProperty(AC)){AF=AB[AC];AF.path=k(x,AC,y.type);this.addModule(AF,AC);AD.push(AC);if(y.skinnable){AE=this._addSkin(this.skin.defaultSkin,AC,x);AD.push(AE.name);}z++;}}y.supersedes=AD;y.rollup=Math.min(z-1,4);}AA=y.plugins;if(AA){for(AC in AA){if(AA.hasOwnProperty(AC)){L=AA[AC];L.path=k(x,AC,y.type);L.requires=L.requires||[];L.requires.push(x);this.addModule(L,AC);if(y.skinnable){this._addSkin(this.skin.defaultSkin,AC,x);}}}}this.dirty=true;return y;},require:function(i){var L=(typeof i==="string")?arguments:i;this.dirty=true;A.mix(this.required,A.Array.hash(L));},getRequires:function(AD){if(!AD){return[];}if(!this.dirty&&AD.expanded){return AD.expanded;}var AB,AC=[],L=AD.requires,x=AD.optional,y=this.moduleInfo,z,AA,AE;for(AB=0;AB<L.length;AB=AB+1){AC.push(L[AB]);z=this.getModule(L[AB]);AE=this.getRequires(z);for(AA=0;AA<AE.length;AA=AA+1){AC.push(AE[AA]);}}L=AD.supersedes;if(L){for(AB=0;AB<L.length;AB=AB+1){AC.push(L[AB]);z=this.getModule(L[AB]);AE=this.getRequires(z);for(AA=0;AA<AE.length;AA=AA+1){AC.push(AE[AA]);}}}if(x&&this.loadOptional){for(AB=0;AB<x.length;AB=AB+1){AC.push(x[AB]);AE=this.getRequires(y[x[AB]]);for(AA=0;AA<AE.length;AA=AA+1){AC.push(AE[AA]);}}}AD.expanded=A.Object.keys(A.Array.hash(AC));return AD.expanded;},getProvides:function(y,AD){var x=!(AD),L=(x)?f:b,AA=this.getModule(y),z={},AG,AB,AE,AC,AF=function(i){if(!AB[i]){AB[i]=true;A.mix(z,AE.getProvides(i));}};if(!AA){return z;}if(AA[L]){return AA[L];}AG=AA.supersedes;AB={};AE=this;if(AG){for(AC=0;AC<AG.length;AC=AC+1){AF(AG[AC]);}}AA[b]=z;AA[f]=A.merge(z);AA[f][y]=true;return AA[L];},calculate:function(L){if(L||this.dirty){this._config(L);this._setup();this._explode();if(this.allowRollup&&!this.combine){this._rollup();}this._reduce();this._sort();this.dirty=false;}},_setup:function(){var AC=this.moduleInfo,AA,AB,z,x,AD,y,L;for(AA in AC){if(AC.hasOwnProperty(AA)){x=AC[AA];if(x&&x.skinnable){AD=this.skin.overrides;if(AD&&AD[AA]){for(AB=0;AB<AD[AA].length;AB=AB+1){L=this._addSkin(AD[AA][AB],AA);}}else{L=this._addSkin(this.skin.defaultSkin,AA);}x.requires.push(L);}}}y=A.merge(this.inserted);if(!this.ignoreRegistered){A.mix(y,o.mods);}if(this.ignore){A.mix(y,A.Array.hash(this.ignore));}for(z in y){if(y.hasOwnProperty(z)){A.mix(y,this.getProvides(z));}}if(this.force){for(AB=0;AB<this.force.length;AB=AB+1){if(this.force[AB] in y){delete y[this.force[AB]];}}}A.mix(this.loaded,y);},_explode:function(){var AA=this.required,x,L,z,y=this,AB=function(i){L=y.getModule(i);var AC=L&&L.expound;if(L){if(AC){AA[AC]=y.getModule(AC);z=y.getRequires(AA[AC]);A.mix(AA,A.Array.hash(z));}z=y.getRequires(L);A.mix(AA,A.Array.hash(z));}};for(x in AA){if(AA.hasOwnProperty(x)){AB(x);}}},getModule:function(i){var L=this.moduleInfo[i];return L;},_rollup:function(){var AC,AB,AA,AF,AE={},L=this.required,y,z=this.moduleInfo,x,AD;if(this.dirty||!this.rollups){for(AC in z){if(z.hasOwnProperty(AC)){AA=this.getModule(AC);if(AA&&AA.rollup){AE[AC]=AA;}}}this.rollups=AE;this.forceMap=(this.force)?A.Array.hash(this.force):{};}for(;;){x=false;for(AC in AE){if(AE.hasOwnProperty(AC)){if(!L[AC]&&((!this.loaded[AC])||this.forceMap[AC])){AA=this.getModule(AC);AF=AA.supersedes||[];y=false;if(!AA.rollup){continue;}AD=0;for(AB=0;AB<AF.length;AB=AB+1){if(this.loaded[AF[AB]]&&!this.forceMap[AF[AB]]){y=false;break;}else{if(L[AF[AB]]){AD++;y=(AD>=AA.rollup);if(y){break;}}}}if(y){L[AC]=true;x=true;this.getRequires(AA);}}}}if(!x){break;}}},_reduce:function(){var y,x,z,L,AA=this.required;for(y in AA){if(AA.hasOwnProperty(y)){if(this.loaded[y]&&(!this.forceMap[y])&&!this.ignoreRegistered){delete AA[y];}else{L=this.getModule(y);z=L&&L.supersedes;if(z){for(x=0;x<z.length;x=x+1){if(z[x] in AA){delete AA[z[x]];}}}}}}},_attach:function(){if(this.attaching){A._attach(this.attaching);}else{A._attach(this.sorted);}},_finish:function(){N.running=false;this._continue();},_onSuccess:function(){this._attach();var L=this.skipped,x,y;for(x in L){if(L.hasOwnProperty(x)){delete this.inserted[x];}}this.skipped={};y=this.onSuccess;if(y){y.call(this.context,{msg:"success",data:this.data,success:true});}this._finish();},_onFailure:function(i){this._attach();var L=this.onFailure;if(L){L.call(this.context,{msg:"failure: "+i.msg,data:this.data,success:false});}this._finish();},_onTimeout:function(){this._attach();var L=this.onTimeout;if(L){L.call(this.context,{msg:"timeout",data:this.data,success:false});}this._finish();},_sort:function(){var AF=A.Object.keys(this.required),i=this.moduleInfo,AA=this.loaded,L,x,AD,AC,z,y,AB,AE=function(AK,AN){var AM=i[AK],AJ,AH,AL,AG,AI;if(AA[AN]||!AM){return false;}AH=AM.expanded;AL=AM.after;AG=i[AN];if(AH&&A.Array.indexOf(AH,AN)>-1){return true;}if(AL&&A.Array.indexOf(AL,AN)>-1){return true;}AI=i[AN]&&i[AN].supersedes;if(AI){for(AJ=0;AJ<AI.length;AJ=AJ+1){if(AE(AK,AI[AJ])){return true;}}}if(AM.ext&&AM.type==S&&!AG.ext&&AG.type==S){return true;}return false;};L=0;for(;;){x=AF.length;AB=false;for(z=L;z<x;z=z+1){AD=AF[z];for(y=z+1;y<x;y=y+1){if(AE(AD,AF[y])){AC=AF.splice(y,1);AF.splice(z,0,AC[0]);AB=true;break;}}if(AB){break;}else{L=L+1;}}if(!AB){break;}}this.sorted=AF;},_insert:function(x,y,i){if(x){this._config(x);}this.calculate(y);if(!i){var L=this;this._internalCallback=function(){var z=L.onCSS;if(z){z.call(L.context,A);}L._internalCallback=null;
L._insert(null,null,u);};this._insert(null,null,S);return;}this._loading=true;this._combineComplete={};this.loadType=i;this.loadNext();},_continue:function(){if(!(N.running)&&N.size()>0){N.running=true;N.next()();}},insert:function(x,i){var L=this,y;y=A.merge(this,true);delete y.require;delete y.dirty;N.add(function(){L._insert(y,x,i);});this._continue();},loadNext:function(AC){if(!this._loading){return;}var AI,AA,z,y,L,AH=this,AD=this.loadType,AE,x,AB,AF=function(AL){this._combineComplete[AD]=true;var AM=this._combining,AJ=AM.length,AK;for(AK=0;AK<AJ;AK=AK+1){this.inserted[AM[AK]]=true;}this.loadNext(AL.data);},AG=function(i){AH.loadNext(i.data);};if(this.combine&&(!this._combineComplete[AD])){this._combining=[];AI=this.sorted;AA=AI.length;L=this.comboBase;for(z=0;z<AA;z=z+1){y=this.getModule(AI[z]);if(y&&y.type===this.loadType&&!y.ext){L+=this.root+y.path;if(z<AA-1){L+="&";}this._combining.push(AI[z]);}}if(this._combining.length){if(this.loadType===S){AE=A.Get.css;AB=this.cssAttributes;}else{AE=A.Get.script;AB=this.jsAttributes;}AE(this._filter(L),{data:this._loading,onSuccess:AF,onFailure:this._onFailure,onTimeout:this._onTimeout,insertBefore:this.insertBefore,charset:this.charset,attributes:AB,timeout:this.timeout,autopurge:false,context:AH});return;}else{this._combineComplete[AD]=true;}}if(AC){if(AC!==this._loading){return;}this.inserted[AC]=true;this.loaded[AC]=true;if(this.onProgress){this.onProgress.call(this.context,{name:AC,data:this.data});}}AI=this.sorted;AA=AI.length;for(z=0;z<AA;z=z+1){if(AI[z] in this.inserted){continue;}if(AI[z]===this._loading){return;}y=this.getModule(AI[z]);if(!y){x="Undefined module "+AI[z]+" skipped";this.inserted[AI[z]]=true;this.skipped[AI[z]]=true;continue;}if(!AD||AD===y.type){this._loading=AI[z];if(y.type===S){AE=A.Get.css;AB=this.cssAttributes;}else{AE=A.Get.script;AB=this.jsAttributes;}L=(y.fullpath)?this._filter(y.fullpath,AI[z]):this._url(y.path,AI[z]);AE(L,{data:AI[z],onSuccess:AG,insertBefore:this.insertBefore,charset:this.charset,attributes:AB,onFailure:this._onFailure,onTimeout:this._onTimeout,timeout:this.timeout,autopurge:false,context:AH});return;}}this._loading=null;AE=this._internalCallback;if(AE){this._internalCallback=null;AE.call(this);}else{this._onSuccess();}},_filter:function(x,i){var z=this.filter,L=i&&(i in this.filters),y=L&&this.filters[i];if(x){if(L){z=(M.isString(y))?this.FILTER_DEFS[y.toUpperCase()]||null:y;}if(z){x=x.replace(new RegExp(z.searchExp,"g"),z.replaceStr);}}return x;},_url:function(i,L){return this._filter((this.base||"")+i,L);}};})();},"3.0.0b1",{requires:["queue-base"]});