# cubee的文件结构 #
  1. cubee本质上只包含一个cubee.js文件,他包括yui.js和cubee构造器
  1. 一个完整可用的cubee种子应当依次包含yui.js、t-cubee.js、t-mojos.js，其中t-mojos.js是模块依赖树
  1. 所有基于yui3（或者基于cubee）的组件分为基础组件（base）和应用组件（tbwidget），基础组件应当放在cubee/base中，应用组件应当放在cubee/tbwidget中
cubee所包含的文件列表:
|文件名  	| 描述|
|:-----|:--|
|cubee/base/t-cubee.js |	cubee主文件，包含对yui3的启动入口的封装|
|cubee/base/t-base.js| 	T.base的宿主，taobao的通用函数库|
|cubee/base/t-base-io.js |	T.base的子模块，关于ajax的封装(待扩展)|
|cubee/base/t-base-templet.js |	T.base的子模块，关于templete的封装(待扩展)|
|cubee/base/t-mojos.js |	模块之间的依赖关系定义|
|cubee/cubee-info.js |	cubee的版本信息|
|cubee/cssbase/base.css |	通用样式库(待扩展)|
|cubee/cssbase/grid.css |	通用表格库(待扩展)|
|cubee/cssbase/layout.css |	通用布局库(待扩展)|
|cubee/tbwidget/modulename/**.js**|	T.tbwidget的宿主，众多组件的js文件|
|cubee/tbwidget/modulename/**.** |	组件的css和img资源文件|

# 引用种子及其配置 #
种子的引用应当在页面的全局引用，即每个页面都应当包含这个全局种子的引用，引用的种子文件应当是yui.js、t-cubee.js、t- mojos.js三个文件的合并后的文件。如果这三个文件修改频繁的话，则可以将t-cubee.js和t-mojos.js拆开来，引用三个js文件,t-cubee.js是被剥离yui.js后的cubee包装器，在生产环境中，由于yui.js和t-cubee.js不会修改频繁，因此在淘宝的build版本中将两者合并成了一个cubee.js文件。

  * 不支持combine的全局引用方法参照：http://code.google.com/p/cubee-js/wiki/simpleuseage
  * 支持combine的全局引用方法：
```
<script charset="gb18030" type="text/javascript" src="http://a.tbcdn.cn/combo?app/dp/eb/js/cubee/base/cubee.js&app/dp/eb/js/cubee/base/t-mojos.js">
	var cubeeInfo = {
		path:'app/dp/eb/js/cubee/cubee-info.js',
		tbmojo:true
	};
	var yuiCfg = {
		base:'http://a.tbcdn.cn/yui/3.0.0/build/', 
		charset:'gb18030',
		root:"yui/3.0.0/build/",  
		comboBase:"http://a.tbcdn.cn/combo", 
		combine:true,
		loadOptional:true
	};
</script>
```
# 全局变量 #
种子加载成功后会带出如下变量:
|**全局变量**|**描述**|
|:-------|:-----|
|YUI     |YUI静态对象|
|T       | 	Taobao的根对象|
|Cubee   |	Cubee构造器|
|TBloader |	页面主逻辑的抽象，是Cubee的实例|

# 程序的入口 #
程序的入口是TBloader的回调函数，例如：
```
TBloader.addmojo({
    't-framework-hack':{
   fullpath:'http://taobao-wd.ns1.name/jayli/cubee/demo/js/t-framework-hack.js',
   requires:['node','event','t-framework']
    }
});
TBloader.require('t-framework-hack').onReady(function(){
    T.DP.framework.init();//框架启动
    TBproject.start();//应用的入口
});
```
这个例子中的t-framework-hack是需要工程师定义的模块，属于页面逻辑，定义模块的方式和yui3的模块定义方式一样。
# 页面程序的调用顺序 #
如果一个页面比较复杂，包含框架、应用、子应用等等，则需要有多个coding区域来分别写各自的代码，各断代码之间的调用顺序应当是框架-》应用-》子应用，例如在某个页面中，框架的启动代码应当如下：
```
TBloader.addmojo({
    't-framework-hack':{
   fullpath:'http://taobao-wd.ns1.name/jayli/cubee/demo/js/t-framework-hack.js',
   requires:['node','event','t-framework']
    }
}).require('*').onReady(function(){
    T.DP.framework.init();//全局逻辑启动
    if(TBproject)TBproject.start();//应用逻辑的入口
});
```
这里框架调用完成之后应当调用应用的逻辑，应用的逻辑：
```
var TBproject = new Cubee().addmojo({
    't-project':{
   fullpath:'http://taobao-wd.ns1.name/jayli/cubee/demo/js/t-project.js',
   requires:['node','event','msg','yahoo-loader','slider','base']
    },
    't-project2':{
   fullpath:'http://taobao-wd.ns1.name/jayli/cubee/demo/js/t-project2.js'
    }
}).require('*'/*,'t-project','t-project2'*/).onReady(function(){
    T.DP.projectname.init();//应用逻辑1
    T.DP.projectname2.init();//应用逻辑2
    TBsubproject.start();//子应用的入口
});
```
其中，应用的代码和框架的代码在页面中的位置先后和执行顺序无关。 同样，子应用的代码和应用的代码类似，并以此类推。
```
var TBproject = new Cubee().addmojo({some modules}).require('*').onReady(function(){
    T.DP.subproject.init();//子应用逻辑
});
```