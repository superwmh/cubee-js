
/******************************cubee.js*****************************************/
/*************************************************************************
 * Copyright (c):	2009, ued@Taobao All rights reserved.
 * Filename:		cubee.js
 * FrameworkName:	Cubee
 * Infomation:		cubee对yui3的封装
 * YUI version: 	3.0.0b1
 * Build: 			trunk
 * Created:			08/28/2009
 * Author:			Jay Li (Engineer), jay.li@alibaba-inc.com
 * Company:			Taobao
 * 
**************************************************************************/

/*
 * get param from htmlpage
 */
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

/*************************************************************************
开始包装yui3
**************************************************************************/
var cubeeBase = cubeeBase || 'http://taobao-wd.ns1.name/jayli/cubee/cubee/';

/**
 * Cubee构造器,用于构造一个cubee对象
 * @class Cubee
 * @constructor Cubee
 */	
var Cubee = Cubee || function(){
	this.init.apply(this, arguments);
};
Cubee._INFOPATH = cubeeBase+'cubee-info.js';//常用的全局定义
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
		this.cubeeInfoPath = Cubee._INFOPATH;
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
		fd.modules.info = fd.modules.Cubee || {//cubeeinfo
			fullpath:fd.cubeeInfoPath,
			requries:[]
		};
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

/********************t-global.js****************************/
var T = T || YUI();
TBloader = new Cubee();

onDOMContentLoaded(function(){
	YUI({modules:TBloader.modules}).use('info',function(Y){
		Y.mix(T,Y);
		TBloader.start(this,arguments);
	});
});

