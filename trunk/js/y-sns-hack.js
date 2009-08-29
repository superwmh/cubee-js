
/******************************cubee.js*****************************************/
/*************************************************************************
 * Copyright (c):	2009, Yahoo! CN. All rights reserved.
 * Filename:		cubee.js
 * FrameworkName:	Cubee
 * Infomation:		cubee对yui3的封装
 * YUI version: 	3.0.0b1
 * Build: 			trunk
 * Created:			08/28/2009
 * Author:			Jay Li (Engineer), jay.li@alibaba-inc.com
 * Company:			Yahoo! CN
 * 
**************************************************************************/
/*
 * hack for yui3
 */

YUI.prototype.namespace = function() {
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


/* 
 * 注册浏览器的DOMContentLoaded事件 
 * @param { Function } onready [必填]在DOMContentLoaded事件触发时需要执行的函数 
 * @param { Object } config [可选]配置项 
 */  
var onDOMContentLoaded = function(onready,config){  
    //浏览器检测相关对象，在此为节省代码未实现，实际使用时需要实现。  
    //var Browser = {};  
	var Browser = YUI().UA;
    //设置是否在FF下使用DOMContentLoaded（在FF2下的特定场景有Bug）  
     this.conf = {enableMozDOMReady:true};  
     if( config )  
     for( var p in config)  
         this.conf[p] = config[p];  
   
     var isReady = false;  
     function doReady(){  
         if( isReady ) return;  
         //确保onready只执行一次  
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

var Cubee = Cubee || function(){
	this.init.apply(this, arguments);
};
Cubee._CONFIG = 'http://10.32.22.154/tb_yui3hack/cobee-config.js';//常用的全局定义
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
		this.configpath = Cubee._CONFIG;
		this.start = new Function;
	},
	addmojo:function(modules){
		var fd = this;
		for(var i in modules){
			fd.modules[i] = modules[i];
			fd.addedMojo.push(i);
		}
		fd.modules.config = fd.modules.Cubee || {//config
			fullpath:fd.configpath,
			requries:[]
		};
		fd.addedMojo = fd.distinct(fd.addedMojo);
		return fd;
	},
	onReady:function(foo){
		var fd = this;
		fd.start = foo;
		return this;
	},
	onFailure:function(o){},
	configure:function(o){},
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
		fd.modules.config.requires = fd.requiredMojo;
		return fd;
	},
	/* 
	 * 数组去重
	 * @return Array 返回去重后的数组
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
	*判断数值是否存在数组中
	*v : 要匹配的数值
	*a : 存在的数组
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

/********************project-global.js****************************/
var T = T || YUI();
TBloader = new Cubee();

onDOMContentLoaded(function(){
	YUI({modules:TBloader.modules}).use('config',function(Y){
		Y.mix(T,Y);
		TBloader.start(this,arguments);
	});
});

